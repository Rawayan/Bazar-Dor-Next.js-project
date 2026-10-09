export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
      <div className="h-48 animate-pulse bg-[var(--accent-soft)]" />

      <div className="space-y-3 p-5">
        <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />

        <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />

        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />

        <div className="pt-4">
          <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

          <div className="mt-2 h-8 w-32 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="mt-4 border-t border-[var(--border)] pt-4">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}