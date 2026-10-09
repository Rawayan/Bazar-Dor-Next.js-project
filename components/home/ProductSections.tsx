"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getProducts } from "@/services/products";
import type { Product } from "@/types/product";
import { getProductChange } from "@/lib/product-data";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

const SKELETON_COUNT = 6;

export default function ProductSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true); setError("");
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
    } finally { setLoading(false); }
  }

  useEffect(() => { void loadProducts(); }, []);

  const topRisers = useMemo(() => [...products].filter(p => getProductChange(p) > 0).sort((a,b) => getProductChange(b)-getProductChange(a)).slice(0,6), [products]);
  const topFallers = useMemo(() => [...products].filter(p => getProductChange(p) < 0).sort((a,b) => getProductChange(a)-getProductChange(b)).slice(0,6), [products]);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      {loading && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({length:SKELETON_COUNT}).map((_,i)=><ProductCardSkeleton key={i}/>)}</div>}
      {!loading && error && <div className="rounded-2xl border border-red-200 bg-white p-7 text-center"><p className="font-semibold text-red-700">{error}</p><button onClick={loadProducts} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white"><RefreshCw size={15}/> আবার চেষ্টা করুন</button></div>}
      {!loading && !error && products.length===0 && <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-8 text-center">কোনো পণ্য পাওয়া যায়নি।</div>}
      {!loading && !error && topRisers.length>0 && <ProductSection title="আজ দাম বেড়েছে" icon="▲" iconClass="text-[#c9413b]" products={topRisers}/>}
      {!loading && !error && topFallers.length>0 && <ProductSection title="আজ দাম কমেছে" icon="▼" iconClass="text-[var(--accent)]" products={topFallers}/>}
      {!loading && !error && products.length>0 && <ProductSection title="সব পণ্য" icon="•" iconClass="text-[var(--accent)]" products={products} id="সব-পণ্য"/>}
    </section>
  );
}

function ProductSection({title,icon,iconClass,products,id}:{title:string;icon:string;iconClass:string;products:Product[];id?:string}) {
  return <section id={id} style={id?{scrollMarginTop:"8rem"}:undefined} className="mt-8 first:mt-0 sm:mt-10">
    <h2 className="mb-4 flex items-center gap-2 text-xl font-black tracking-tight sm:text-2xl"><span className={iconClass}>{icon}</span>{title}</h2>
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">{products.map(product=><ProductCard key={product.id} product={product}/>)}</div>
  </section>;
}
