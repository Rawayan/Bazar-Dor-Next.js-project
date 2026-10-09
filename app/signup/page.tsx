"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {

  Loader2,
  UserPlus,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<string | null>(null);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (!email.trim()) {
      toast.error("আপনার ইমেইল লিখুন।");
      return;
    }

    if (password.length < 8) {
      toast.error(
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।"
      );
      return;
    }

    try {
      setLoading(true);

      const { data, error } =
        await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        });

      if (error) {
        toast.error(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        return;
      }

      if (data) {
        toast.success(
          "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।"
        );

        window.location.href = "/";
      }
    } catch (error) {
      console.error("Sign up error:", error);

      toast.error(
        "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।"
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
            `${provider} দিয়ে সাইন আপ করা যায়নি।`
        );
      }
    } catch (error) {
      console.error(
        `${provider} sign up error:`,
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
              <UserPlus size={25} />
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight">
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              বাজার দর-এর সাথে যুক্ত হতে নতুন অ্যাকাউন্ট
              তৈরি করুন।
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
                   <span className="text-base font-black">G</span>
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
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  নাম
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="আপনার নাম"
                  disabled={loading}
                  className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)]"
                />
              </div>

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
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="কমপক্ষে ৮ অক্ষর"
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

                অ্যাকাউন্ট তৈরি করুন
              </button>
            </form>

            {/* Sign In */}
            <p className="mt-6 text-center text-sm text-[var(--muted)]">
              ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/signin"
                className="font-bold text-[var(--accent-dark)] hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}