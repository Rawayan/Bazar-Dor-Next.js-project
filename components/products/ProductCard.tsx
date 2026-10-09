
"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from "lucide-react";

import type { Product } from "@/types/product";
import {
  formatPercentage,
  formatPrice,
} from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

function getPrice(product: Product): number | string | undefined {
  if (product.price !== undefined) {
    return product.price;
  }

  if (product.prices && product.prices.length > 0) {
    return product.prices[0]?.price;
  }

  return undefined;
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

function getChangeStyles(change: number) {
  if (change > 0) {
    return {
      label: "বাড়ছে",
      className:
        "bg-emerald-50 text-emerald-700",
      icon: <ArrowUpRight size={14} />,
    };
  }

  if (change < 0) {
    return {
      label: "কমছে",
      className:
        "bg-red-50 text-red-700",
      icon: <ArrowDownRight size={14} />,
    };
  }

  return {
    label: "অপরিবর্তিত",
    className:
      "bg-slate-100 text-slate-600",
    icon: <Minus size={14} />,
  };
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const price = getPrice(product);
  const change = getChange(product);
  const changeStyles = getChangeStyles(change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block h-full"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-lg">
        {/* Product Visual */}
        <div className="relative flex min-h-48 items-center justify-center bg-[var(--accent-soft)] p-6">
          {/* Change Badge */}
          <div
            className={`absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${changeStyles.className}`}
          >
            {changeStyles.icon}

            <span>
              {change > 0 ? "+" : ""}
              {formatPercentage(change)}
            </span>
          </div>

          {/* Image */}
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-32 w-32 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span
              className="text-7xl transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              {product.emoji || "🛒"}
            </span>
          )}
        </div>

        {/* Product Information */}
        <div className="flex flex-1 flex-col p-5">
          {/* Category */}
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
            {product.category || "পণ্য"}
          </p>

          {/* Name */}
          <h3 className="mt-1 line-clamp-2 text-lg font-bold leading-7 text-[var(--foreground)] transition-colors group-hover:text-[var(--accent-dark)]">
            {product.name}
          </h3>

          {/* Unit */}
          <p className="mt-1 text-sm text-[var(--muted)]">
            প্রতি {product.unit || "ইউনিট"}
          </p>

          {/* Price */}
          <div className="mt-auto pt-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-[var(--muted)]">
                  আজকের দাম
                </p>

                <p className="mt-1 text-2xl font-black tracking-tight text-[var(--foreground)]">
                  {formatPrice(price)}
                </p>
              </div>

              {/* Change */}
              <div className="text-right">
                <p className="text-xs text-[var(--muted)]">
                  পরিবর্তন
                </p>

                <p
                  className={`mt-1 text-sm font-bold ${
                    change > 0
                      ? "text-emerald-700"
                      : change < 0
                        ? "text-red-700"
                        : "text-[var(--muted)]"
                  }`}
                >
                  {change > 0 ? "+" : ""}
                  {formatPercentage(change)}
                </p>
              </div>
            </div>
          </div>

          {/* View Details */}
          <div className="mt-5 border-t border-[var(--border)] pt-4">
            <span className="text-sm font-bold text-[var(--accent-dark)] transition-all group-hover:tracking-wide">
              বিস্তারিত দেখুন →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}