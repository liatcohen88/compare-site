"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/types";
import { VENDORS, type VendorId } from "@/lib/config";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const VENDOR_IDS: VendorId[] = ["ksp", "amazon", "aliexpress", "shein"];

export default function VendorFilterClient({ products }: Props) {
  const [selected, setSelected] = useState<Set<VendorId>>(new Set());

  const toggleVendor = (vendor: VendorId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(vendor)) next.delete(vendor);
      else next.add(vendor);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (selected.size === 0) return products;
    return products.filter((p) =>
      p.offers.some((o) => o.inStock && selected.has(o.vendor)),
    );
  }, [products, selected]);

  const counts = useMemo(() => {
    const c: Record<VendorId, number> = { ksp: 0, amazon: 0, aliexpress: 0, shein: 0 };
    for (const p of products) {
      for (const o of p.offers) {
        if (o.inStock) c[o.vendor]++;
      }
    }
    return c;
  }, [products]);

  return (
    <>
      <div className="mb-6 bg-slate-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-700">
            סנן לפי חנות:
          </span>
          {selected.size > 0 && (
            <button
              onClick={() => setSelected(new Set())}
              className="text-xs text-blue-600 hover:underline"
            >
              ניקוי סינון
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {VENDOR_IDS.map((id) => {
            const v = VENDORS[id];
            const active = selected.has(id);
            return (
              <button
                key={id}
                onClick={() => toggleVendor(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                  active
                    ? "border-blue-500 bg-blue-500 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.logo} alt="" className="w-4 h-4 rounded-sm" />
                <span>{v.name}</span>
                <span className={`text-xs ${active ? "text-blue-100" : "text-slate-400"}`}>
                  ({counts[id]})
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {selected.size === 0
            ? "מציג מוצרים מכל החנויות"
            : `מציג ${filtered.length} מוצרים שזמינים ב-${[...selected].map((id) => VENDORS[id].name).join(", ")}`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-slate-600">לא נמצאו מוצרים עם הסינון הזה</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
