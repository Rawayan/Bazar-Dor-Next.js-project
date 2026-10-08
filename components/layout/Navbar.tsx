"use client";

import Link from "next/link";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { useState } from "react";
import BanglaDate from "@/components/layout/BanglaDate";

const categories = [
  { label: "সব পণ্য", href: "/#সব-পণ্য" },
  { label: "চাল", href: "/category/chal" },
  { label: "ডাল", href: "/category/dal" },
  { label: "তেল", href: "/category/tel" },
  { label: "মাছ", href: "/category/mach" },
  { label: "মাংস", href: "/category/mangsho" },
  { label: "সবজি", href: "/category/shobji" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center gap-3"
          aria-label="বাজার দর হোমপেজ"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white shadow-sm">
            <ShoppingBasket size={21} strokeWidth={2.2} />
          </span>

          <div className="hidden sm:block">
            <p className="text-lg font-bold leading-tight tracking-tight text-[var(--foreground)]">
              বাজার দর
            </p>

            <p className="mt-0.5 text-xs text-[var(--muted)]">
              আজকের বাজারের খবর
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="প্রধান নেভিগেশন"
          className="hidden items-center gap-1 lg:flex"
        >
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
            >
              {category.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <BanglaDate />

          <div className="h-6 w-px bg-[var(--border)]" />

          <Link
            href="/signin"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--accent-dark)]"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--accent-dark)]"
          >
            সাইন আপ
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((value) => !value)}
          className="rounded-lg p-2 text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)] lg:hidden"
        >
          {mobileOpen ? (
            <X size={24} strokeWidth={2} />
          ) : (
            <Menu size={24} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[var(--border)] bg-[var(--background)] px-4 pb-5 pt-3 lg:hidden"
        >
          {/* Mobile Date */}
          <div className="mb-3 border-b border-[var(--border)] pb-3">
            <BanglaDate />
          </div>

          {/* Categories */}
          <nav
            aria-label="মোবাইল নেভিগেশন"
            className="flex flex-col gap-1"
          >
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
              >
                {category.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border)] pt-3">
            <Link
              href="/signin"
              onClick={closeMobileMenu}
              className="rounded-lg border border-[var(--border)] px-4 py-3 text-center text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-dark)]"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              onClick={closeMobileMenu}
              className="rounded-lg bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
            >
              সাইন আপ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
