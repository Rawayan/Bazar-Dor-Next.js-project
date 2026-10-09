
import type { Product, ProductPrice } from "@/types/product";

type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : undefined;
}

function numeric(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(
      value
        .replace(/[০-৯]/g, (digit) =>
          String("০১২৩৪৫৬৭৮৯".indexOf(digit))
        )
        .replace(/,/g, "")
    );

    if (Number.isFinite(parsed)) return parsed;
  }

  return undefined;
}

/** Supports documented API fields and common naming variants. */
export function getProductPrice(product: Product): number | undefined {
  const item = product as Product & UnknownRecord;

  for (const key of [
    "price",
    "currentPrice",
    "current_price",
    "latestPrice",
    "latest_price",
    "amount",
    "value",
  ]) {
    const value = numeric(item[key]);
    if (value !== undefined) return value;
  }

  const rawPrices =
    item.prices ?? item.marketPrices ?? item.market_prices;

  const prices = Array.isArray(rawPrices) ? rawPrices : [];
  const firstPrice = record(prices[0]);

  if (firstPrice) {
    for (const key of [
      "price",
      "currentPrice",
      "current_price",
      "amount",
    ]) {
      const value = numeric(firstPrice[key]);
      if (value !== undefined) return value;
    }
  }

  return undefined;
}

export function getProductChange(product: Product): number {
  const item = product as Product & UnknownRecord;

  for (const key of [
    "change",
    "priceChange",
    "price_change",
    "changePercent",
    "change_percent",
  ]) {
    const value = numeric(item[key]);
    if (value !== undefined) return value;
  }

  const rawPrices =
    item.prices ?? item.marketPrices ?? item.market_prices;

  const prices = Array.isArray(rawPrices) ? rawPrices : [];
  const firstPrice = record(prices[0]);

  if (firstPrice) {
    for (const key of [
      "change",
      "priceChange",
      "price_change",
      "changePercent",
      "change_percent",
    ]) {
      const value = numeric(firstPrice[key]);
      if (value !== undefined) return value;
    }
  }

  return 0;
}

export function getProductImage(product: Product): string | undefined {
  const item = product as Product & UnknownRecord;

  for (const key of [
    "image",
    "imageUrl",
    "image_url",
    "photo",
    "photoUrl",
    "photo_url",
  ]) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

export function getMarketPrices(product: Product): ProductPrice[] {
  const item = product as Product & UnknownRecord;

  const prices =
    item.prices ?? item.marketPrices ?? item.market_prices;

  return Array.isArray(prices) ? (prices as ProductPrice[]) : [];
}
