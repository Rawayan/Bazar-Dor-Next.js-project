"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import BanglaDate from "@/components/layout/BanglaDate";
import { useAuth } from "@/providers/AuthProvider";

const categories = [
  {
    label: "সব পণ্য",
    href: "/#সব-পণ্য",
  },
  {
    label: "🍚চাল",
    href: "/category/chal",
  },
  {
    label: "🍲ডাল",
    href: "/category/dal",
  },
  {
    label: "🫙তেল",
    href: "/category/tel",
  },
  {
    label: "🐟মাছ",
    href: "/category/mach",
  },
  {
    label: "🍗মাংস",
    href: "/category/mangsho",
  },
  {
    label: "🥬সবজি",
    href: "/category/shobji",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const pathname = usePathname();

  const {
    user,
    loading,
    signOut,
  } = useAuth();

  async function handleSignOut() {
    try {
      await signOut();

      setMobileOpen(false);

      toast.success(
        "সফলভাবে সাইন আউট হয়েছে।"
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.error(
        "Sign out error:",
        error
      );

      toast.error(
        "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।"
      );
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-10 sm:px-10 lg:px-10">
        {/* Top row: Logo + Auth */}
        <div className="flex min-h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            </span>

            <div className="hidden sm:block">
              <p className="text-lg font-bold tracking-tight">
                বাজার দর
              </p>

              <BanglaDate />
            </div>
          </Link>

          {/* Desktop Right */}
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            {loading ? (
              <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-2 transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-dark)]">
                    <User size={15} />
                  </span>

                  <span className="max-w-28 truncate text-sm font-semibold">
                    {user.name || user.email}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={17} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                    pathname === "/signin"
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
                  }`}
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                    pathname === "/signup"
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
                  }`}
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={
              mobileOpen
                ? "মেনু বন্ধ করুন"
                : "মেনু খুলুন"
            }
            aria-expanded={mobileOpen}
            onClick={() =>
              setMobileOpen((value) => !value)
            }
            className="rounded-lg p-2 text-[var(--foreground)] hover:bg-[var(--accent-soft)] lg:hidden"
          >
            {mobileOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Desktop Navigation - below top row */}
        <nav className="hidden items-center gap-1 border-t border-[var(--border)] py-3 lg:flex">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
            >
              {category.label}
            </Link>
          ))}
        </nav>
        </div>

        {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--border)] px-4 pb-5 pt-3 lg:hidden">
          

          <nav className="flex flex-col gap-1">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                onClick={() =>
                  setMobileOpen(false)
                }
                className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
              >
                {category.label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 border-t border-[var(--border)] pt-3">
            {loading ? (
              <div className="h-12 animate-pulse rounded-xl bg-slate-200" />
            ) : user ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white p-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-dark)]">
                    <User size={17} />
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      {user.name || "ব্যবহারকারী"}
                    </p>

                    <p className="truncate text-xs text-[var(--muted)]">
                      {user.email}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600"
                >
                  <LogOut size={17} />
                  সাইন আউট
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={`rounded-lg border px-4 py-3 text-center text-sm font-semibold transition ${
                    pathname === "/signin"
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                  }`}
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={`rounded-lg border px-4 py-3 text-center text-sm font-semibold transition ${
                    pathname === "/signup"
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                  }`}
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
