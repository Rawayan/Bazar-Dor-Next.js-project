import { getProducts } from "@/services/products";

/**
 * Get all unique division (বিভাগ) values from the product markets.
 * Falls back to extracting from product markets across all products.
 */
export async function getDivisions(): Promise<string[]> {
  const products = await getProducts();

  const divisionSet = new Set<string>();

  for (const product of products) {
    for (const market of product.markets ?? []) {
      if (market.division) {
        divisionSet.add(market.division);
      }
      if (market.district) {
        divisionSet.add(market.district);
      }
      if (market.location) {
        divisionSet.add(market.location);
      }
    }
  }

  return Array.from(divisionSet).sort((a, b) =>
    a.localeCompare(b, "bn-BD"),
  );
}