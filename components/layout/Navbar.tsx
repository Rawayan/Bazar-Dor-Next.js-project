"use client";

import Link from "next/link";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { useState } from "react";

import { getBanglaDate } from "@/lib/date";
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

return ( <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur"> <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
{/* Brand */}
<Link
href="/"
className="flex shrink-0 items-center gap-3"
onClick={() => setMobileOpen(false)}
> <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white"> <ShoppingBasket size={21} /> </span>

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

    {/* Desktop Auth */}
    <div className="hidden shrink-0 items-center gap-2 sm:flex">
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

    {/* Mobile Menu Button */}
    <button
      type="button"
      aria-label={mobileOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
      aria-expanded={mobileOpen}
      onClick={() => setMobileOpen((value) => !value)}
      className="rounded-lg p-2 text-[var(--foreground)] hover:bg-[var(--accent-soft)] lg:hidden"
    >
      {mobileOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </div>

  {/* Mobile Navigation */}
  {mobileOpen && (
    <div className="border-t border-[var(--border)] px-4 pb-5 pt-3 lg:hidden">
      <nav className="flex flex-col gap-1">
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            onClick={() => setMobileOpen(false)}
            className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
          >
            {category.label}
          </Link>
        ))}
      </nav>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border)] pt-3">
        <Link
          href="/signin"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg border border-[var(--border)] px-4 py-3 text-center text-sm font-semibold"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-white"
        >
          সাইন আপ
        </Link>
      </div>
    </div>
  )}
</header>
);
}
