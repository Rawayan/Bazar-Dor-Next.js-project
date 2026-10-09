import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

export default function CategoryLoading() {
return ( <main className="min-h-screen bg-[var(--background)]">
{/* Header Skeleton */} <section className="border-b border-[var(--border)] bg-white"> <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"> <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

      <div className="mt-4 h-10 w-40 animate-pulse rounded bg-slate-200" />

      <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded bg-slate-200" />
    </div>
  </section>

  {/* Product Skeletons */}
  <section>
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </section>
</main>

);
}
