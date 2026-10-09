"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { Product } from "@/types/product";
import { getProductChange, getProductImage, getProductPrice } from "@/lib/product-data";
import { formatPercentage, formatPrice } from "@/lib/format";

interface ProductCardProps { product: Product; }

export default function ProductCard({ product }: ProductCardProps) {
  const price = getProductPrice(product);
  const image = getProductImage(product);
  const change = getProductChange(product);
  const [imageFailed, setImageFailed] = useState(false);
  const positive = change > 0;
  const negative = change < 0;
  const badgeClass = positive ? "text-[#c9413b]" : negative ? "text-[var(--accent)]" : "text-[var(--muted)]";
  const emoji = product.emoji || "🛒";

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <article className="flex min-h-[132px] h-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[#b8d3bd] hover:shadow-sm sm:p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef]">
            {image && !imageFailed ? <img src={image} alt={product.name} onError={() => setImageFailed(true)} className="h-9 w-9 object-contain" loading="lazy" /> : <span className="text-2xl" aria-hidden="true">{emoji}</span>}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold leading-6 group-hover:text-[var(--accent-dark)]">{product.name}</h3>
            <p className="text-xs text-[var(--muted)]">প্রতি {product.unit || "ইউনিট"}</p>
          </div>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-[var(--muted)]">আজকের দাম</p>
            <p className="mt-1 text-lg font-black">{price === undefined ? "দাম নেই" : formatPrice(price)}</p>
          </div>
          <span className={`inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f4ef] px-2 py-1 text-[11px] font-bold ${badgeClass}`}>
            {positive ? <ArrowUpRight size={12} /> : negative ? <ArrowDownRight size={12} /> : <Minus size={12} />}
            {formatPercentage(Math.abs(change))}
          </span>
        </div>
      </article>
    </Link>
  );
}
