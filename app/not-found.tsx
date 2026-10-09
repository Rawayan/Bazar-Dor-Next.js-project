
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh]">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-dark)]">
          <SearchX size={42} strokeWidth={1.8} />
        </div>

        <p className="mt-7 text-sm font-bold text-[var(--accent)]">
          ৪০৪ — পেজ পাওয়া যায়নি
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          এই পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)] sm:text-base">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
          URL পরিবর্তন হয়েছে অথবা ঠিকানাটি ভুল হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--accent-dark)]"
        >
          <ArrowLeft size={17} />
          হোমপেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}