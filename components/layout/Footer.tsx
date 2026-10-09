import Link from "next/link";
import {
  ShoppingBasket,
  ArrowUpRight,
  Mail,
} from "lucide-react";

const categories = [
  { label: "চাল", href: "/category/chal" },
  { label: "ডাল", href: "/category/dal" },
  { label: "তেল", href: "/category/tel" },
  { label: "মাছ", href: "/category/mach" },
  { label: "মাংস", href: "/category/mangsho" },
  { label: "সবজি", href: "/category/shobji" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                <ShoppingBasket size={23} />
              </span>

              <span>
                <span className="block text-xl font-black tracking-tight">
                  বাজার দর
                </span>
                <span className="block text-xs text-[var(--muted)]">
                  প্রয়োজনীয় পণ্যের দাম এক নজরে
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--muted)]">
              নিত্যপ্রয়োজনীয় পণ্যের দাম ও বাজারসংক্রান্ত
              তথ্য সহজে খুঁজে পেতে আপনার পাশে বাজার দর।
            </p>

            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-dark)] transition hover:gap-3"
            >
              হোম পেজ দেখুন
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-black">ক্যাটাগরি</h2>

            <ul className="mt-4 space-y-3">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-sm text-[var(--muted)] transition hover:text-[var(--accent-dark)]"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-black">অ্যাকাউন্ট</h2>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/signin"
                  className="text-sm text-[var(--muted)] transition hover:text-[var(--accent-dark)]"
                >
                  সাইন ইন
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-sm text-[var(--muted)] transition hover:text-[var(--accent-dark)]"
                >
                  নতুন অ্যাকাউন্ট
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-sm text-[var(--muted)] transition hover:text-[var(--accent-dark)]"
                >
                  আমার প্রোফাইল
                </Link>
              </li>
            </ul>

            <div className="mt-6 flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
              <Mail size={15} className="mt-0.5 shrink-0" />
              <span>সহজে বাজারদরের তথ্য খুঁজুন।</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <Link
            href="/"
            className="font-semibold transition hover:text-[var(--accent-dark)]"
          >
            বিশ্বস্ত বাজার তথ্যের জন্য
          </Link>
        </div>
      </div>
    </footer>
  );
}