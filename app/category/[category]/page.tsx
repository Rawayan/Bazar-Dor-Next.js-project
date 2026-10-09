"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, RefreshCw } from "lucide-react";

import { getProductsByCategory } from "@/services/products";
import type { Product } from "@/types/product";
import type { SortOrder } from "@/types";

import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const categoryNames: Record<string, string> = {
  chal: "চাল",
  dal: "ডাল",
  tel: "তেল",
  mach: "মাছ",
  mangsho: "মাংস",
  shobji: "সবজি",
};

function getProductPrice(product: Product): number {
  if (product.price !== undefined) {
    return Number(product.price) || 0;
  }

  if (product.prices && product.prices.length > 0) {
    return Number(product.prices[0]?.price) || 0;
  }

  return 0;
}

function getCategoryName(category: string): string {
  return (
    categoryNames[category.toLowerCase()] ||
    category
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      )
  );
}

export default function CategoryPage({
  params,
}: CategoryPageProps) {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] =
    useState<SortOrder>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategory() {
      try {
        setLoading(true);
        setError("");

        const resolvedParams = await params;
        const categorySlug = resolvedParams.category;

        setCategory(categorySlug);

        const data =
          await getProductsByCategory(categorySlug);

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(
          "Failed to load category products:",
          err
        );

        setError(
          "এই ক্যাটাগরির পণ্য লোড করা যায়নি। আবার চেষ্টা করুন।"
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [params]);

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortOrder === "price-asc") {
      return result.sort(
        (a, b) =>
          getProductPrice(a) -
          getProductPrice(b)
      );
    }

    if (sortOrder === "price-desc") {
      return result.sort(
        (a, b) =>
          getProductPrice(b) -
          getProductPrice(a)
      );
    }

    return result;
  }, [products, sortOrder]);

  const categoryName = getCategoryName(category);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-bold text-[var(--accent)]">
            পণ্য ক্যাটাগরি
          </p>

          <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                {categoryName}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                {categoryName} ক্যাটাগরির সব পণ্যের
                বর্তমান বাজারদর একসাথে দেখুন।
              </p>
            </div>

            {/* Sorting */}
            {!loading && !error && products.length > 0 && (
              <div className="flex shrink-0 items-center gap-2">
                <ArrowDownUp
                  size={17}
                  className="text-[var(--muted)]"
                />

                <label
                  htmlFor="price-sort"
                  className="sr-only"
                >
                  পণ্য সাজানোর পদ্ধতি
                </label>

                <select
                  id="price-sort"
                  value={sortOrder}
                  onChange={(event) =>
                    setSortOrder(
                      event.target.value as SortOrder
                    )
                  }
                  className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
                >
                  <option value="default">
                    ডিফল্ট
                  </option>

                  <option value="price-asc">
                    দাম: কম থেকে বেশি
                  </option>

                  <option value="price-desc">
                    দাম: বেশি থেকে কম
                  </option>
                </select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {/* Loading */}
          {loading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map(
                (_, index) => (
                  <ProductCardSkeleton key={index} />
                )
              )}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="font-bold text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={() => {
                  window.location.reload();
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <RefreshCw size={16} />
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            sortedProducts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white p-12 text-center">
                <div className="text-5xl">🛒</div>

                <h2 className="mt-4 text-xl font-black">
                  এই ক্যাটাগরিতে কোনো পণ্য নেই
                </h2>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  বর্তমানে এই ক্যাটাগরির কোনো পণ্য
                  পাওয়া যাচ্ছে না।
                </p>
              </div>
            )}

          {/* Product Grid */}
          {!loading &&
            !error &&
            sortedProducts.length > 0 && (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-[var(--muted)]">
                    মোট{" "}
                    <span className="font-bold text-[var(--foreground)]">
                      {sortedProducts.length}
                    </span>{" "}
                    টি পণ্য
                  </p>

                  {sortOrder !== "default" && (
                    <button
                      type="button"
                      onClick={() =>
                        setSortOrder("default")
                      }
                      className="text-sm font-semibold text-[var(--accent-dark)] hover:underline"
                    >
                      সাজানো বন্ধ করুন
                    </button>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </>
            )}
        </div>
      </section>
    </main>
  );
}