import { apiFetch } from "@/services/api";
import type { Product, ProductMarket } from "@/types/product";

type ApiProduct = {
  id: number | string;
  slug: string;
  nameBn?: string;
  name?: string;
  category?: string;
  categoryNameBn?: string;
  unit?: string;
  image?: string;
  description?: string;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: {
    dir?: "up" | "down" | "flat";
    pct?: number;
  };
  markets?: Array<{
    market: string;
    district?: string;
    division?: string;
    location?: string;
    min: number;
    max: number;
  }>;
};

type ProductListResponse =
  | ApiProduct[]
  | {
      products?: ApiProduct[];
      items?: ApiProduct[];
      results?: ApiProduct[];
      data?: ApiProduct[] | { products?: ApiProduct[] };
    };

/**
 * Normalize a raw API product into the application's Product type.
 */
function normalizeProduct(item: ApiProduct): Product {
  const percentage = Number(item.change?.pct ?? 0);

  const signedChange =
    item.change?.dir === "down"
      ? -Math.abs(percentage)
      : item.change?.dir === "up"
        ? Math.abs(percentage)
        : item.change?.dir === "flat"
          ? 0
          : percentage;

  const markets: ProductMarket[] = (item.markets ?? []).map(
    (market) => ({
      market: market.market,
      division: market.division || market.district,
      district: market.division || market.district,
      location: market.location,
      min: Number(market.min) || 0,
      max: Number(market.max) || 0,
    }),
  );

  return {
    id: item.id,
    slug: item.slug,
    name: item.nameBn || item.name || "নাম পাওয়া যায়নি",
    category: item.categoryNameBn || item.category || "অন্যান্য",
    categoryName: item.categoryNameBn,
    unit: item.unit || "কেজি",
    description: item.description,
    emoji: item.image || "🛒",
    price:
      typeof item.today === "number" ? item.today : undefined,
    change: signedChange,
    yesterday: item.yesterday,
    lastWeek: item.lastWeek,
    lastMonth: item.lastMonth,
    markets,
  };
}

/**
 * Handle different API response formats.
 */
function normalizeProductList(
  response: ProductListResponse,
): Product[] {
  let items: unknown = response;

  if (!Array.isArray(items) && items && typeof items === "object") {
    const result = items as {
      products?: unknown;
      items?: unknown;
      results?: unknown;
      data?: unknown;
    };

    items =
      result.products ??
      result.items ??
      result.results ??
      result.data;

    // Also support: { data: { products: [...] } }
    if (!Array.isArray(items) && items && typeof items === "object") {
      items = (items as { products?: unknown }).products;
    }
  }

  if (!Array.isArray(items)) {
    throw new Error(
      "The API response does not contain a product list.",
    );
  }

  return items.map((item) =>
    normalizeProduct(item as ApiProduct),
  );
}

/**
 * Get all products.
 */
export async function getProducts(): Promise<Product[]> {
  const response =
    await apiFetch<ProductListResponse>("/products");

  return normalizeProductList(response);
}

/**
 * Get a product by its slug.
 */
export async function getProduct(
  slug: string,
): Promise<Product> {
  const products = await getProducts();
  const decodedSlug = decodeURIComponent(slug);

  const product = products.find(
    (item) => item.slug === decodedSlug,
  );

  if (!product) {
    throw new Error(
      `Product not found for slug: ${decodedSlug}`,
    );
  }

  return product;
}

/**
 * Normalize category strings for comparison.
 */
function normalizeCategory(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

/**
 * Category aliases.
 * These cover common Bengali labels, English names, and URL slugs.
 */
const CATEGORY_ALIASES: Record<string, string[]> = {
  chal: ["চাল", "rice", "chal"],
  rice: ["চাল", "rice", "chal"],

  dal: ["ডাল", "lentils", "pulses", "dal"],

  tel: ["তেল", "oil", "cooking-oil", "tel"],
  oil: ["তেল", "oil", "cooking-oil", "tel"],

  mach: ["মাছ", "fish", "mach"],
  fish: ["মাছ", "fish", "mach"],

  mangsho: ["মাংস", "meat", "mangsho"],
  meat: ["মাংস", "meat", "mangsho"],

  shobji: [
    "সবজি",
    "সব্জি",
    "vegetable",
    "vegetables",
    "shobji",
  ],
  sobji: [
    "সবজি",
    "সব্জি",
    "vegetable",
    "vegetables",
    "sobji",
  ],
  vegetables: [
    "সবজি",
    "সব্জি",
    "vegetable",
    "vegetables",
    "shobji",
    "sobji",
  ],
};

/**
 * Get products belonging to a category.
 *
 * Fetches the full list and filters locally to avoid depending on
 * the API's category query format.
 */
export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const products = await getProducts();
  const requestedCategory = normalizeCategory(category);

  const aliases =
    CATEGORY_ALIASES[requestedCategory] ?? [category];

  const acceptedCategories = new Set(
    [category, ...aliases].map(normalizeCategory),
  );

  return products.filter((product) => {
    const productCategory = normalizeCategory(product.category);
    const productCategoryName = normalizeCategory(
      product.categoryName ?? "",
    );

    return (
      acceptedCategories.has(productCategory) ||
      acceptedCategories.has(productCategoryName)
    );
  });
}