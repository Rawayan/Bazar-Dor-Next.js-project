"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  User,
} from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";

export default function ProfilePage() {
  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin";
    }
  }, [loading, user]);

  if (loading) {
    return (
      <main className="min-h-[70vh]">
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader2
            size={30}
            className="animate-spin text-[var(--accent)]"
          />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-[70vh]" />
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--accent-dark)]"
          >
            <ArrowLeft size={16} />
            হোমে ফিরে যান
          </Link>

          <div className="mt-8">
            <p className="text-sm font-bold text-[var(--accent)]">
              আপনার অ্যাকাউন্ট
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              প্রোফাইল
            </h1>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-dark)]">
                <User size={34} />
              </div>

              <div>
                <p className="text-2xl font-black">
                  {user.name || "ব্যবহারকারী"}
                </p>

                <p className="mt-1 text-sm text-[var(--muted)]">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
                <p className="text-xs font-semibold text-[var(--muted)]">
                  নাম
                </p>

                <p className="mt-2 font-bold">
                  {user.name || "নাম দেওয়া হয়নি"}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
                <p className="text-xs font-semibold text-[var(--muted)]">
                  ইমেইল
                </p>

                <p className="mt-2 break-all font-bold">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[var(--accent-soft)] p-5">
              <p className="text-sm font-bold text-[var(--accent-dark)]">
                পরবর্তী ধাপ
              </p>

              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                আপনার নাম, ইমেইল এবং অন্যান্য profile
                information update করার functionality
                STEP 13-এ যোগ করা হবে।
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}