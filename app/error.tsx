
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh]">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle
            size={42}
            strokeWidth={1.8}
          />
        </div>

        <p className="mt-7 text-sm font-bold text-red-600">
          একটি সমস্যা হয়েছে
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          পেজটি লোড করা যায়নি
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)] sm:text-base">
          সাময়িক কোনো সমস্যা হওয়ার কারণে এই পেজটি
          সঠিকভাবে লোড করা সম্ভব হয়নি। আবার চেষ্টা করুন।
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--accent-dark)]"
          >
            <RefreshCw size={17} />
            আবার চেষ্টা করুন
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent-dark)]"
          >
            হোমপেজে যান
          </Link>
        </div>
      </div>
    </main>
  );
}