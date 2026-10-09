export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 sm:flex-row sm:px-7 sm:py-9 lg:px-9">
        <p className="text-sm font-medium text-[var(--foreground)]">
          বাজার দর - প্রয়োজনীয় পন্যের দাম এক নজরে
        </p>

        <p className="text-xs text-[var(--muted)]">
          সকল দাম সম্ভাব্য বাজার অবস্থার উপর নির্ভর করে পরিবরতিত হয়
        </p>
      </div>
    </footer>
  );
}