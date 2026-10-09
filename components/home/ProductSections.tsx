"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import { getProducts } from "@/services/products";
import type { Product } from "@/types/product";

import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

const SKELETON_COUNT = 6;

function getProductChange(product: Product): number {
  if (product.change !== undefined) {
    return Number(product.change) || 0;
  }

  if (product.prices && product.prices.length > 0) {
    return Number(product.prices[0]?.change) || 0;
  }

  return 0;
}

export default function ProductSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load products:", err);

      setError(
        "পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const topRisers = useMemo(() => {
    return [...products]
      .filter((product) => getProductChange(product) > 0)
      .sort(
        (a, b) =>
          getProductChange(b) -
          getProductChange(a)
      )
      .slice(0, 6);
  }, [products]);

  const topFallers = useMemo(() => {
    return [...products]
      .filter((product) => getProductChange(product) < 0)
      .sort(
        (a, b) =>
          getProductChange(a) -
          getProductChange(b)
      )
      .slice(0, 6);
  }, [products]);

  return (
    <section
      id="সব-পণ্য"
      className="border-t border-[var(--border)] bg-[var(--background)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-[var(--accent)]">
            আজকের বাজার
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            পণ্যের বর্তমান বাজারদর
          </h2>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)] sm:text-base">
            আজকের বাজারে কোন পণ্যের দাম বাড়ছে, কোনটির
            দাম কমছে এবং সব পণ্যের বর্তমান দর এক নজরে
            দেখে নিন।
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: SKELETON_COUNT }).map(
              (_, index) => (
                <ProductCardSkeleton key={index} />
              )
            )}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-bold text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={loadProducts}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <RefreshCw size={16} />
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[var(--border)] bg-white p-10 text-center">
            <div className="text-5xl">🛒</div>

            <h3 className="mt-4 text-xl font-bold">
              কোনো পণ্য পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-sm text-[var(--muted)]">
              বর্তমানে দেখানোর মতো কোনো পণ্য নেই।
            </p>
          </div>
        )}

        {/* Price Risers */}
        {!loading &&
          !error &&
          topRisers.length > 0 && (
            <ProductSection
              eyebrow="দাম বাড়ছে"
              title="আজকের শীর্ষ মূল্যবৃদ্ধি"
              description="যেসব পণ্যের দাম তুলনামূলকভাবে বেশি বেড়েছে।"
              products={topRisers}
            />
          )}

        {/* Price Fallers */}
        {!loading &&
          !error &&
          topFallers.length > 0 && (
            <ProductSection
              eyebrow="দাম কমছে"
              title="আজকের শীর্ষ মূল্যহ্রাস"
              description="যেসব পণ্যের দাম তুলনামূলকভাবে কমেছে।"
              products={topFallers}
            />
          )}

        {/* All Products */}
        {!loading &&
          !error &&
          products.length > 0 && (
            <ProductSection
              eyebrow="সব পণ্য"
              title="সম্পূর্ণ পণ্য তালিকা"
              description="বাজারে থাকা সব পণ্যের বর্তমান দাম দেখুন।"
              products={products}
              id="all-products"
            />
          )}
      </div>
    </section>
  );
}

interface ProductSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
  id?: string;
}

function ProductSection({
  eyebrow,
  title,
  description,
  products,
  id,
}: ProductSectionProps) {
  return (
    <section
      id={id}
      className="mt-16 first:mt-10 sm:mt-20"
    >
      <div className="mb-7">
        <p className="text-sm font-bold text-[var(--accent)]">
          {eyebrow}
        </p>

        <h3 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
          {title}
        </h3>

        <p className="mt-2 text-sm text-[var(--muted)]">
          {description}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}