import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/services/products";
import type { Product, ProductMarket } from "@/types/product";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPrice(value: number): string {
  return `${formatNumber(value)} টাকা`;
}

function getMarketAverage(market: ProductMarket): number {
  return (market.min + market.max) / 2;
}

function getPriceStats(product: Product) {
  const markets = product.markets ?? [];

  const marketMins = markets
    .map((market) => market.min)
    .filter(Number.isFinite);

  const marketMaxes = markets
    .map((market) => market.max)
    .filter(Number.isFinite);

  const marketAverages = markets
    .map(getMarketAverage)
    .filter(Number.isFinite);

  const currentPrice = Number(product.price ?? 0);

  return {
    min: marketMins.length
      ? Math.min(...marketMins)
      : currentPrice,
    max: marketMaxes.length
      ? Math.max(...marketMaxes)
      : currentPrice,
    average: marketAverages.length
      ? marketAverages.reduce((sum, price) => sum + price, 0) /
        marketAverages.length
      : currentPrice,
  };
}

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  let product: Product;

  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  const markets = product.markets ?? [];
  const stats = getPriceStats(product);
  const change = product.change ?? 0;
  const isUp = change > 0;
  const isDown = change < 0;

  return (
    <main className="min-h-screen bg-[#f1f5f0] text-[#252c26]">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#737b73]"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link href="/#সব-পণ্য" className="hover:text-green-700">
            সব পণ্য
          </Link>
          <span>›</span>
          <span className="text-[#424a42]">
            {product.name}
          </span>
        </nav>

        {/* Product summary */}
        <section className="flex flex-col gap-5 rounded-xl border border-[#e1e8df] bg-[#fbfcfa] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ee] text-3xl">
              {product.emoji || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-extrabold sm:text-2xl">
                {product.name}
              </h1>

              <p className="mt-1 text-xs text-[#7a8279]">
                প্রতি {product.unit || "কেজি"} · {product.category}
              </p>

              <p className="mt-2 text-xs text-[#50584f]">
                {isUp
                  ? "গতকালের তুলনায় আজ দাম বেড়েছে"
                  : isDown
                    ? "গতকালের তুলনায় আজ দাম কমেছে"
                    : "গতকালের তুলনায় দাম অপরিবর্তিত"}
                {" · "}
                {Math.abs(change).toLocaleString("bn-BD", {
                  maximumFractionDigits: 2,
                })}
                %
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-5 rounded-xl bg-[#f0f4ee] px-5 py-3 sm:min-w-[125px] sm:flex-col sm:gap-1 sm:text-center">
            <div>
              <p className="text-[11px] text-[#737b73]">
                আজকের দাম
              </p>
              <p className="text-2xl font-black">
                {formatNumber(Number(product.price ?? stats.average))}
              </p>
              <p className="text-[11px] text-[#737b73]">
                টাকা / {product.unit || "কেজি"}
              </p>
            </div>

            <p
              className={`text-xs font-bold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-700"
                    : "text-[#777]"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {Math.abs(change).toLocaleString("bn-BD", {
                maximumFractionDigits: 2,
              })}
              %
            </p>
          </div>
        </section>

        {/* Price overview */}
        <section className="mt-4 rounded-xl border border-[#e1e8df] bg-[#fbfcfa] p-4 sm:p-5">
          <h2 className="text-sm font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PriceStat
              label="সর্বনিম্ন দাম"
              value={stats.min}
              color="green"
              unit={product.unit}
            />

            <PriceStat
              label="সর্বোচ্চ দাম"
              value={stats.max}
              color="red"
              unit={product.unit}
            />

            <PriceStat
              label="গড় দাম"
              value={stats.average}
              color="green"
              unit={product.unit}
            />
          </div>

          {/* Market price table */}
          <div className="mt-5">
            <h2 className="text-sm font-bold">
              বাজারভিত্তিক আজকের দাম
            </h2>

            {markets.length > 0 ? (
              <div className="mt-3 overflow-x-auto rounded-xl border border-[#e2e8df]">
                <table className="w-full min-w-[650px] border-collapse text-left text-xs">
                  <thead className="bg-[#f8faf7] text-[#747c73]">
                    <tr>
                      <th className="px-4 py-3 font-medium">বাজার</th>
                      <th className="px-4 py-3 font-medium">জেলা</th>
                      <th className="px-4 py-3 text-right font-medium">
                        সর্বনিম্ন
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        সর্বোচ্চ
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                        className={
                          index % 2 === 0
                            ? "border-t border-[#e1e7df] bg-[#fbfcfa]"
                            : "border-t border-[#e1e7df] bg-[#f0f4ee]"
                        }
                      >
                        <td className="px-4 py-3 font-medium">
                          {market.market}
                        </td>
                        <td className="px-4 py-3 text-[#666f65]">
                          {market.district || market.location || "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {formatPrice(market.min)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {formatPrice(market.max)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold">
                          {formatPrice(getMarketAverage(market))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-dashed border-[#dce4da] p-6 text-center">
                <p className="text-sm font-semibold">
                  বাজারভিত্তিক তথ্য পাওয়া যায়নি
                </p>
                <p className="mt-1 text-xs text-[#737b73]">
                  এই পণ্যের জন্য API-তে বাজারের তথ্য নেই।
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

interface PriceStatProps {
  label: string;
  value: number;
  color: "green" | "red";
  unit: string;
}

function PriceStat({
  label,
  value,
  color,
  unit,
}: PriceStatProps) {
  const valueColor =
    color === "red" ? "text-red-600" : "text-green-700";

  return (
    <div className="rounded-xl border border-[#e3e9e1] bg-[#fbfcfa] p-4">
      <p className="text-[11px] text-[#737b73]">{label}</p>

      <p className={`mt-1 text-xl font-extrabold ${valueColor}`}>
        {formatNumber(value)}
        <span className="ml-1 text-xs font-semibold">
          টাকা
        </span>
      </p>

      <p className="mt-1 text-[10px] text-[#737b73]">
        প্রতি {unit || "কেজি"} বাজারদর
      </p>
    </div>
  );
}