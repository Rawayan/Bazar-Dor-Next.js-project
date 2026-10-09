export default function ProductDetailsLoading() {
  return (
    <main>
      {/* Back Link Skeleton */}
      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />
        </div>
      </section>

      {/* Product Skeleton */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          {/* Image */}
          <div className="flex min-h-[360px] items-center justify-center rounded-3xl bg-[var(--accent-soft)]">
            <div className="h-52 w-52 animate-pulse rounded-full bg-white/70" />
          </div>

          {/* Information */}
          <div className="flex flex-col justify-center">
            <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200" />

            <div className="mt-5 h-12 w-3/4 animate-pulse rounded bg-slate-200" />

            <div className="mt-4 h-5 w-32 animate-pulse rounded bg-slate-200" />

            <div className="mt-7 rounded-2xl border border-[var(--border)] bg-white p-6">
              <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

              <div className="mt-3 h-12 w-48 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[var(--border)] p-5"
              >
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

                <div className="mt-3 h-8 w-32 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}