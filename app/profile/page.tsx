"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  User,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { user, loading, refreshSession } = useAuth();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin";
    }
  }, [loading, user]);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
    }
  }, [user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccess("");
    setError("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length < 2) {
      setError("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    if (trimmedName.length > 100) {
      setError("নাম ১০০ অক্ষরের মধ্যে রাখুন।");
      return;
    }

    if (trimmedName === user?.name) {
      setSuccess("আপনার প্রোফাইলে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        throw new Error(
          result.error.message || "প্রোফাইল আপডেট করা যায়নি।"
        );
      }

      await refreshSession();
      setSuccess("আপনার নাম সফলভাবে আপডেট হয়েছে!");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <Loader2
          size={30}
          className="animate-spin text-[var(--accent)]"
        />
      </main>
    );
  }

  if (!user) {
    return <main className="min-h-[70vh]" />;
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
              আমার প্রোফাইল
            </h1>
            <p className="mt-3 text-sm text-[var(--muted)]">
              আপনার অ্যাকাউন্টের তথ্য দেখুন ও নাম আপডেট করুন।
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-dark)]">
                <User size={34} />
              </div>

              <div className="min-w-0">
                <h2 className="text-2xl font-black">
                  {user.name || "ব্যবহারকারী"}
                </h2>
                <p className="mt-1 break-all text-sm text-[var(--muted)]">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
                <p className="text-xs font-semibold text-[var(--muted)]">
                  বর্তমান নাম
                </p>
                <p className="mt-2 break-words font-bold">
                  {user.name || "নাম দেওয়া হয়নি"}
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

            <div className="mt-8 border-t border-[var(--border)] pt-8">
              <h3 className="text-xl font-black">
                প্রোফাইল আপডেট
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                নিচের ফর্ম থেকে আপনার নাম পরিবর্তন করতে পারবেন।
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="profile-name"
                    className="mb-2 block text-sm font-bold"
                  >
                    আপনার নাম
                  </label>

                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    maxLength={100}
                    autoComplete="name"
                    required
                    disabled={saving}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <p className="mt-2 text-xs text-[var(--muted)]">
                    নাম ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে।
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="profile-email"
                    className="mb-2 block text-sm font-bold"
                  >
                    ইমেইল
                  </label>

                  <input
                    id="profile-email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-[var(--border)] bg-gray-50 px-4 py-3 text-gray-500 outline-none"
                  />

                  <p className="mt-2 text-xs text-[var(--muted)]">
                    এই ফর্ম থেকে ইমেইল পরিবর্তন করা যাবে না।
                  </p>
                </div>

                {success && (
                  <div
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                    <span>{success}</span>
                  </div>
                )}

                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={saving || !name.trim()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {saving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      আপডেট হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      পরিবর্তন সংরক্ষণ করুন
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}