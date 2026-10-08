import { apiFetch } from "@/services/api";
import type { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export async function getCategory(slug: string): Promise<Category> {
  return apiFetch<Category>(`/categories/${slug}`);
}
