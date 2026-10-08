import Link from "next/link";
import { ArrowDown, ArrowUpRight, ShoppingBasket } from "lucide-react";

export default function Hero() {
return ( <section className="relative overflow-hidden border-b border-[var(--border)]">
{/* Decorative background elements */} <div
     aria-hidden="true"
     className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--accent-soft)] blur-3xl"
   />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[var(--accent-soft)] blur-3xl"
  />

  <div className="relative mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
    {/* Content */}
    <div className="max-w-2xl">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--accent-dark)] shadow-sm">
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
        প্রতিদিনের বাজারের আপডেট
      </div>

      <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-7xl">
        আজকের বাজারের
        <span className="block text-[var(--accent)]">
          দাম জানুন এক নজরে।
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)] sm:text-lg">
        চাল, ডাল, তেল, মাছ, মাংস ও নিত্যপ্রয়োজনীয়
        পণ্যের আজকের দাম এবং দামের পরিবর্তন সহজেই
        দেখে নিন।
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="#সব-পণ্য"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[var(--accent-dark)] hover:shadow-xl"
        >
          সব পণ্যের দাম দেখুন
          <ArrowDown size={17} />
        </Link>

        <Link
          href="/signin"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-white px-6 py-3.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent-dark)]"
        >
          সাইন ইন করুন
          <ArrowUpRight size={17} />
        </Link>
      </div>

      {/* Small trust indicators */}
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[var(--muted)] sm:text-sm">
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)]">
            <ShoppingBasket size={14} />
          </span>
          দৈনিক আপডেট
        </span>

        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          বাজারভিত্তিক তথ্য
        </span>

        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          সহজ তুলনা
        </span>
      </div>
    </div>

    {/* Hero Visual */}
    <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
      {/* Main card */}
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-2xl sm:p-7">
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--accent-dark)]">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          আজকের বাজার
        </div>

        <div className="flex min-h-[370px] flex-col justify-between rounded-[1.5rem] bg-[var(--accent-soft)] p-6 sm:p-8">
          <div>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
              🛒
            </div>

            <p className="text-sm font-semibold text-[var(--muted)]">
              জনপ্রিয় পণ্য
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              মিনিকেট চাল
            </h2>

            <p className="mt-2 text-sm text-[var(--muted)]">
              প্রতি কেজির বর্তমান বাজারদর
            </p>
          </div>

          <div className="mt-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[var(--muted)]">
                আজকের দাম
              </p>
              <p className="mt-1 text-3xl font-black sm:text-4xl">
                ৮৫ টাকা
              </p>
            </div>

            <div className="rounded-xl bg-white px-3 py-2 text-right shadow-sm">
              <p className="text-xs text-[var(--muted)]">
                পরিবর্তন
              </p>
              <p className="mt-0.5 text-sm font-bold text-[var(--accent-dark)]">
                ▲ ২.১%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating card */}
      <div className="absolute -bottom-5 -left-3 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-xl sm:-left-8 sm:p-5">
        <p className="text-xs font-medium text-[var(--muted)]">
          আজকের পরিবর্তন
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-xl font-black">
            +২.১%
          </span>

          <span className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-xs font-bold text-[var(--accent-dark)]">
            বাড়ছে
          </span>
        </div>
      </div>

      {/* Decorative floating element */}
      <div className="absolute -right-3 -top-5 hidden rounded-2xl border border-[var(--border)] bg-white p-4 shadow-xl sm:block">
        <p className="text-2xl">📈</p>
        <p className="mt-1 text-xs font-bold">
          দামের ট্রেন্ড
        </p>
      </div>
    </div>
  </div>
</section>

);
}
