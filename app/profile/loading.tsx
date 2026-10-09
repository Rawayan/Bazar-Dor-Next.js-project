export default function ProfileLoading() {
return ( <main className="min-h-screen bg-[var(--background)]"> <section className="border-b border-[var(--border)] bg-white"> <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14"> <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

      <div className="mt-8 h-10 w-40 animate-pulse rounded bg-slate-200" />
    </div>
  </section>

  <section>
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 animate-pulse rounded-full bg-slate-200" />

          <div>
            <div className="h-7 w-40 animate-pulse rounded bg-slate-200" />

            <div className="mt-2 h-4 w-52 animate-pulse rounded bg-slate-200" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="h-24 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-24 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  </section>
</main>

);
}
