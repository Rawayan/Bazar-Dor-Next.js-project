"use client";

const tickerItems = [
{
name: "মিনিকেট চাল",
price: "৮৫ টাকা/kg",
change: "▲ ২.১%",
direction: "up",
},
{
name: "আলু",
price: "৪৫ টাকা/kg",
change: "▼ ২.৯%",
direction: "down",
},
{
name: "পেঁয়াজ",
price: "৭০ টাকা/kg",
change: "▲ ১.৪%",
direction: "up",
},
{
name: "সয়াবিন তেল",
price: "১৭৫ টাকা/L",
change: "— ০.০%",
direction: "flat",
},
{
name: "ডিম",
price: "১৪৫ টাকা/ডজন",
change: "▼ ১.৮%",
direction: "down",
},
];

export default function PriceTicker() {
const items = [...tickerItems, ...tickerItems];

return ( <div className="overflow-hidden border-b border-[var(--border)] bg-[var(--accent-soft)]"> <div className="flex min-h-10 items-center"> <div className="shrink-0 border-r border-[var(--border)] px-4 text-xs font-bold text-[var(--accent-dark)] sm:px-6">
আজকের দর </div>

    <div className="ticker-track flex min-w-max items-center">
      {items.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className="flex items-center gap-2 px-5 text-xs sm:px-7 sm:text-sm"
        >
          <span className="font-semibold">
            {item.name}
          </span>

          <span className="text-[var(--muted)]">
            {item.price}
          </span>

          <span
            className={
              item.direction === "up"
                ? "font-semibold"
                : item.direction === "down"
                  ? "font-semibold"
                  : "font-semibold text-[var(--muted)]"
            }
          >
            {item.change}
          </span>

          <span className="text-[var(--border)]">•</span>
        </div>
      ))}
    </div>
  </div>
</div>

);
}
