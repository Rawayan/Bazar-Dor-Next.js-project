import Hero from "@/components/home/Hero";

export default function HomePage() {
return ( <main> <Hero />

  <section
    id="সব-পণ্য"
    className="mx-auto min-h-[300px] max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
  >
    <div className="rounded-3xl border border-dashed border-[var(--border)] p-10 text-center">
      <p className="text-sm font-semibold text-[var(--muted)]">
        সব পণ্য
      </p>

      <h2 className="mt-2 text-2xl font-black">
        পণ্য তালিকা এখানে আসবে
      </h2>

      <p className="mt-2 text-sm text-[var(--muted)]">
        এই section STEP 07-এ সম্পূর্ণ করা হবে।
      </p>
    </div>
  </section>
</main>

);
}
