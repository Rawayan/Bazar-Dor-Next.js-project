import { apiFetch, buildQuery } from "@/services/api";
import type { Category, RawCategory } from "@/types/category";

type CategoryListResponse =
  | RawCategory[]
  | {
      products?: unknown;
      items?: unknown;
      results?: unknown;
      categories?: unknown;
      data?: unknown;
    };

function normalizeCategory(item: RawCategory): Category {
  return {
    id: item.id,
    slug: item.slug,
    name: item.nameBn || item.name || "নাম পাওয়া যায়নি",
    nameBn: item.nameBn,
    icon: item.icon,
    description: item.description,
  };
}

function normalizeCategoryList(response: CategoryListResponse): Category[] {
  let items: unknown = response;

  if (!Array.isArray(items) && items && typeof items === "object") {
    const result = items as Record<string, unknown>;
    items =
      result.products ??
      result.items ??
      result.results ??
      result.categories ??
      result.data;

    if (!Array.isArray(items) && items && typeof items === "object") {
      const nested = items as { products?: unknown; categories?: unknown };
      items = nested.products ?? nested.categories;
    }
  }

  // Tolerate array-wrapped single (`?slug=` style returns an array).
  if (!Array.isArray(items)) {
    if (items && typeof items === "object") {
      return [normalizeCategory(items as RawCategory)];
    }
    throw new Error("The API response does not contain a category list.");
  }

  return (items as RawCategory[]).map(normalizeCategory);
}

function normalizeSingleCategory(response: unknown): Category {
  if (Array.isArray(response)) {
    if (response.length === 0) {
      throw new Error("Category not found.");
    }
    return normalizeCategory(response[0] as RawCategory);
  }

  if (response && typeof response === "object") {
    const result = response as Record<string, unknown>;
    const nested =
      result.data ?? result.category ?? result.item ?? result.result;
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      return normalizeCategory(nested as RawCategory);
    }
    // Unwrap single-key wrappers like `{ categories: [...] }` just in case.
    if (Array.isArray(nested) && nested.length > 0) {
      return normalizeCategory(nested[0] as RawCategory);
    }
    return normalizeCategory(response as RawCategory);
  }

  throw new Error("The API response does not contain a category.");
}

export async function getCategories(): Promise<Category[]> {
  const response =
    await apiFetch<CategoryListResponse>("/categories");
  return normalizeCategoryList(response);
}

export async function getCategory(slug: string): Promise<Category> {
  const decoded = decodeURIComponent(slug);
  try {
    const response = await apiFetch<unknown>(
      `/categories/${encodeURIComponent(decoded)}`,
    );
    return normalizeSingleCategory(response);
  } catch {
    // Fallback to server filter (`GET /categories?slug=...` returns an array).
    const filtered = await apiFetch<unknown>(
      `/categories${buildQuery({ slug: decoded })}`,
    );
    return normalizeSingleCategory(filtered);
  }
}
