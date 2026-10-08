import { apiFetch } from "@/services/api";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products");
}

export async function getProduct(slug: string): Promise<Product> {
  return apiFetch<Product>(`/products/${slug}`);
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  return apiFetch<Product[]>(
    `/products?category=${encodeURIComponent(category)}`,
  );
}
