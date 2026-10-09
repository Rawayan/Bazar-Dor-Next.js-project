"use client";

import Link from "next/link";
import {
  LogOut,
  Menu,
  ShoppingBasket,
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
    label: "চাল",
    href: "/category/chal",
  },
  {
    label: "ডাল",
    href: "/category/dal",
  },
  {
    label: "তেল",
    href: "/category/tel",
  },
  {
    label: "মাছ",
    href: "/category/mach",
  },
  {
    label: "মাংস",
    href: "/category/mangsho",
  },
  {
    label: "সবজি",
    href: "/category/shobji",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

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

      window.location.href = "/";
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
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
            <ShoppingBasket size={21} />
          </span>

          <div className="hidden sm:block">
            <p className="text-lg font-bold tracking-tight">
              বাজার দর
            </p>

            <p className="text-xs text-[var(--muted)]">
              আজকের বাজারের খবর
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
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

        {/* Desktop Right */}
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <BanglaDate />

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
                className="rounded-lg px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--accent-dark)]"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-dark)]"
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--border)] px-4 pb-5 pt-3 lg:hidden">
          <div className="mb-3 border-b border-[var(--border)] pb-3">
            <BanglaDate />
          </div>

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
                  className="rounded-lg border border-[var(--border)] px-4 py-3 text-center text-sm font-semibold"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="rounded-lg bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-white"
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
