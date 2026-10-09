import Link from "next/link";
import {
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  Store,
} from "lucide-react";

import { getProduct } from "@/services/products";
import type { Product } from "@/types/product";

import {
  formatPercentage,
  formatPrice,
} from "@/lib/format";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getPrice(product: Product): number {
  if (product.price !== undefined) {
    return Number(product.price) || 0;
  }

  if (product.prices && product.prices.length > 0) {
    return Number(product.prices[0]?.price) || 0;
  }

  return 0;
}

function getChange(product: Product): number {
  if (product.change !== undefined) {
    return Number(product.change) || 0;
  }

  if (product.prices && product.prices.length > 0) {
    return Number(product.prices[0]?.change) || 0;
  }

  return 0;
}

function getChangeInfo(change: number) {
  if (change > 0) {
    return {
      label: "দাম বাড়ছে",
      className: "bg-emerald-50 text-emerald-700",
      icon: <ArrowUpRight size={18} />,
    };
  }

  if (change < 0) {
    return {
      label: "দাম কমছে",
      className: "bg-red-50 text-red-700",
      icon: <ArrowDownRight size={18} />,
    };
  }

  return {
    label: "দাম অপরিবর্তিত",
    className: "bg-slate-100 text-slate-600",
    icon: <Minus size={18} />,
  };
}

function getMarketPrices(product: Product) {
  return product.prices ?? [];
}

function getPriceStats(product: Product) {
  const prices = getMarketPrices(product)
    .map((item) => Number(item.price))
    .filter((price) => Number.isFinite(price));

  if (prices.length === 0) {
    const currentPrice = getPrice(product);

    return {
      min: currentPrice,
      max: currentPrice,
      average: currentPrice,
    };
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const average =
    prices.reduce((total, price) => total + price, 0) /
    prices.length;

  return {
    min,
    max,
    average,
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  let product: Product | null = null;

  try {
    product = await getProduct(slug);
  } catch (error) {
    console.error("Failed to load product:", error);
  }

  if (!product) {
    return (
      <main className="min-h-[70vh]">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent-soft)] text-4xl">
            🛒
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight">
            পণ্যটি পাওয়া যায়নি
          </h1>

          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">
            আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি অথবা
            বর্তমানে এই পণ্যটি উপলভ্য নেই।
          </p>

          <Link
            href="/#সব-পণ্য"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--accent-dark)]"
          >
            <ArrowLeft size={17} />
            সব পণ্যে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const currentPrice = getPrice(product);
  const change = getChange(product);
  const changeInfo = getChangeInfo(change);
  const stats = getPriceStats(product);
  const marketPrices = getMarketPrices(product);

  return (
    <main>
      {/* Breadcrumb / Back */}
      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/#সব-পণ্য"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--accent-dark)]"
          >
            <ArrowLeft size={16} />
            সব পণ্যে ফিরে যান
          </Link>
        </div>
      </section>

      {/* Product Hero */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-16">
          {/* Product Visual */}
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--accent-soft)] p-8">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/70 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/60 blur-3xl"
            />

            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="relative h-64 w-64 object-contain drop-shadow-lg sm:h-72 sm:w-72"
              />
            ) : (
              <span
                className="relative text-9xl drop-shadow-sm"
                aria-hidden="true"
              >
                {product.emoji || "🛒"}
              </span>
            )}
          </div>

          {/* Product Information */}
          <div>
            <div className="inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--accent-dark)]">
              {product.category || "পণ্য"}
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-3 text-base text-[var(--muted)]">
              প্রতি {product.unit || "ইউনিট"}
            </p>

            {product.description && (
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                {product.description}
              </p>
            )}

            {/* Current Price */}
            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-medium text-[var(--muted)]">
                আজকের বাজারদর
              </p>

              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <p className="text-4xl font-black tracking-tight sm:text-5xl">
                  {formatPrice(currentPrice)}
                </p>

                <div
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold ${changeInfo.className}`}
                >
                  {changeInfo.icon}

                  <span>
                    {change > 0 ? "+" : ""}
                    {formatPercentage(change)}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-xs text-[var(--muted)]">
                {changeInfo.label}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Statistics */}
      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-[var(--accent)]">
              মূল্য বিশ্লেষণ
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
              বাজারদরের সংক্ষিপ্ত চিত্র
            </h2>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <PriceStat
              label="সর্বনিম্ন দাম"
              value={stats.min}
            />

            <PriceStat
              label="সর্বোচ্চ দাম"
              value={stats.max}
            />

            <PriceStat
              label="গড় দাম"
              value={stats.average}
            />
          </div>
        </div>
      </section>

      {/* Market Prices */}
      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-[var(--accent)]">
              বাজারভিত্তিক দাম
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
              বিভিন্ন বাজারের বর্তমান দর
            </h2>

            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              বিভিন্ন বাজারে এই পণ্যের বর্তমান মূল্য তুলনা
              করে দেখুন।
            </p>
          </div>

          {marketPrices.length > 0 ? (
            <div className="mt-7 overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
              <div className="hidden grid-cols-[1fr_180px_160px] border-b border-[var(--border)] bg-[var(--accent-soft)] px-5 py-4 text-xs font-bold text-[var(--muted)] sm:grid">
                <span>বাজার</span>
                <span>দাম</span>
                <span>পরিবর্তন</span>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {marketPrices.map((market, index) => {
                  const marketChange =
                    Number(market.change) || 0;

                  return (
                    <div
                      key={`${market.market}-${index}`}
                      className="grid gap-3 px-5 py-5 sm:grid-cols-[1fr_180px_160px] sm:items-center"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-dark)]">
                          <Store size={18} />
                        </span>

                        <div>
                          <p className="text-xs font-medium text-[var(--muted)] sm:hidden">
                            বাজার
                          </p>

                          <p className="font-bold">
                            {market.market}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-[var(--muted)] sm:hidden">
                          দাম
                        </p>

                        <p className="font-black">
                          {formatPrice(market.price)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-[var(--muted)] sm:hidden">
                          পরিবর্তন
                        </p>

                        <p
                          className={`inline-flex items-center gap-1 text-sm font-bold ${
                            marketChange > 0
                              ? "text-emerald-700"
                              : marketChange < 0
                                ? "text-red-700"
                                : "text-[var(--muted)]"
                          }`}
                        >
                          {marketChange > 0 ? (
                            <ArrowUpRight size={15} />
                          ) : marketChange < 0 ? (
                            <ArrowDownRight size={15} />
                          ) : (
                            <Minus size={15} />
                          )}

                          {marketChange > 0 ? "+" : ""}
                          {formatPercentage(marketChange)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mt-7 rounded-2xl border border-dashed border-[var(--border)] bg-white p-10 text-center">
              <div className="text-4xl">🏪</div>

              <p className="mt-3 font-bold">
                বাজারভিত্তিক তথ্য পাওয়া যায়নি
              </p>

              <p className="mt-1 text-sm text-[var(--muted)]">
                এই পণ্যের জন্য বর্তমানে কোনো বাজার তথ্য
                নেই।
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

interface PriceStatProps {
  label: string;
  value: number;
}

function PriceStat({
  label,
  value,
}: PriceStatProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
      <p className="text-sm font-medium text-[var(--muted)]">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black tracking-tight">
        {formatPrice(value)}
      </p>
    </div>
  );
}