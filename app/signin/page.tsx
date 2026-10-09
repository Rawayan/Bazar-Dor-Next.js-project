"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  
  Loader2,
  LogIn,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<string | null>(null);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("আপনার ইমেইল লিখুন।");
      return;
    }

    if (!password) {
      toast.error("আপনার পাসওয়ার্ড লিখুন।");
      return;
    }

    try {
      setLoading(true);

      const { data, error } =
        await authClient.signIn.email({
          email: email.trim(),
          password,
        });

      if (error) {
        toast.error(
          error.message ||
            "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে।");

        window.location.href = "/";
      }
    } catch (error) {
      console.error("Sign in error:", error);

      toast.error(
        "সাইন ইন করতে সমস্যা হয়েছে।"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(
    provider: "google" | "github"
  ) {
    try {
      setSocialLoading(provider);

      const { error } =
        await authClient.signIn.social({
          provider,
          callbackURL: "/",
        });

      if (error) {
        toast.error(
          error.message ||
            `${provider} দিয়ে সাইন ইন করা যায়নি।`
        );
      }
    } catch (error) {
      console.error(
        `${provider} sign in error:`,
        error
      );

      toast.error(
        "Social authentication শুরু করা যায়নি।"
      );
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <main className="min-h-[calc(100vh-120px)] bg-[var(--background)]">
      <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-md items-center px-4 py-12 sm:px-6">
        <div className="w-full">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
              <LogIn size={25} />
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight">
              স্বাগতম
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              আপনার বাজার দর অ্যাকাউন্টে সাইন ইন করুন।
            </p>
          </div>

          {/* Card */}
          <div className="mt-8 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
            {/* Social */}
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={socialLoading !== null}
                onClick={() =>
                  handleSocialSignIn("google")
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-bold transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {socialLoading === "google" ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <span className="text-base font-black">
                    G
                  </span>
                )}
                Google
              </button>

              <button
                type="button"
                disabled={socialLoading !== null}
                onClick={() =>
                  handleSocialSignIn("github")
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-bold transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {socialLoading === "github" ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <span aria-hidden="true" className="text-lg"> ◇ </span>
                )}
                GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--border)]" />

              <span className="text-xs font-medium text-[var(--muted)]">
                অথবা ইমেইল দিয়ে
              </span>

              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  ইমেইল
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  disabled={loading}
                  className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  পাসওয়ার্ড
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="আপনার পাসওয়ার্ড"
                  disabled={loading}
                  className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                )}

                সাইন ইন করুন
              </button>
            </form>

            {/* Sign Up */}
            <p className="mt-6 text-center text-sm text-[var(--muted)]">
              নতুন ব্যবহারকারী?{" "}
              <Link
                href="/signup"
                className="font-bold text-[var(--accent-dark)] hover:underline"
              >
                অ্যাকাউন্ট তৈরি করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}