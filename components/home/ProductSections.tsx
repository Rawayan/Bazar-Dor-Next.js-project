"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/services/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";

function getProductChange(product: Product): number {
  return Number(product.change ?? 0);
}

export default function ProductSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (active) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to load products:", err);

        if (active) {
          setError(
            "পণ্যের তথ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const topRisers = [...products]
    .filter((product) => getProductChange(product) > 0)
    .sort((a, b) => getProductChange(b) - getProductChange(a))
    .slice(0, 6);

  const topFallers = [...products]
    .filter((product) => getProductChange(product) < 0)
    .sort((a, b) => getProductChange(a) - getProductChange(b))
    .slice(0, 6);

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-10 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-44 animate-pulse rounded-2xl border border-gray-200 bg-white"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto w-full max-w-7xl px-10 py-8">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="mx-auto w-full max-w-7xl px-10 py-8">
        <p className="rounded-xl bg-white p-6 text-center text-gray-600">
          কোনো পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      </section>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 px-10 py-8">
      {/* Today's price increases */}
      <section aria-labelledby="price-risers-heading">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2
            id="price-risers-heading"
            className="text-2xl font-bold text-gray-900"
          >
            <span className="mr-2 text-red-600">▲</span>
            আজ দাম বেড়েছে
          </h2>
        </div>

        {topRisers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topRisers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-gray-600">
            আজ দাম বৃদ্ধির তথ্য নেই।
          </p>
        )}
      </section>

      {/* Today's price decreases */}
      <section aria-labelledby="price-fallers-heading">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2
            id="price-fallers-heading"
            className="text-2xl font-bold text-gray-900"
          >
            <span className="mr-2 text-green-600">▼</span>
            আজ দাম কমেছে
          </h2>
        </div>

        {topFallers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topFallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-gray-600">
            আজ দাম কমার তথ্য নেই।
          </p>
        )}
      </section>

      {/* All products */}
      <section id="সব-পণ্য" aria-labelledby="all-products-heading">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2
            id="all-products-heading"
            className="text-2xl font-bold text-gray-900"
          >
            সব পণ্য
          </h2>

          <span className="text-sm text-gray-500">
            মোট {products.length}টি পণ্য
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}