import Link from "next/link";
import { getAllProducts } from "@/lib/mock-data";
import { CATEGORIES, VENDORS } from "@/lib/config";
import { formatPrice } from "@/lib/format";

export default function ProductsAdmin() {
  const products = getAllProducts();
  const grouped: Record<string, typeof products> = {};
  for (const p of products) {
    grouped[p.category] = grouped[p.category] || [];
    grouped[p.category].push(p);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">📦 ניהול מוצרים</h1>
        <p className="text-slate-500">{products.length} מוצרים ב-{Object.keys(grouped).length} קטגוריות</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
        💡 <strong>הערה:</strong> כרגע המוצרים נטענים מקובץ סטטי שמתעדכן כל יום ע&quot;י הסקריפט.
        תכונת עריכה ידנית של מוצרים תגיע בעדכון הבא (דורש Supabase).
      </div>

      {Object.entries(grouped).map(([cat, items]) => {
        const catInfo = CATEGORIES.find((c) => c.slug === cat);
        return (
          <section key={cat}>
            <h2 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">
              {catInfo?.icon} {catInfo?.name ?? cat} <span className="text-sm font-normal text-slate-500">({items.length})</span>
            </h2>
            <div className="space-y-2">
              {items.map((p) => {
                const cheapest = [...p.offers]
                  .filter((o) => o.inStock)
                  .sort((a, b) => a.price + a.shippingPrice - (b.price + b.shippingPrice))[0];
                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 text-sm truncate">{p.title}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        {p.offers.map((o) => (
                          <span key={o.vendor} title={VENDORS[o.vendor].name}>
                            {VENDORS[o.vendor].countryFlag}
                          </span>
                        ))}
                        <span>·</span>
                        <span>{p.offers.length} הצעות</span>
                      </div>
                    </div>
                    {cheapest && (
                      <div className="text-left">
                        <div className="font-bold text-blue-600 numeric">
                          {formatPrice(cheapest.price + cheapest.shippingPrice)}
                        </div>
                        <div className="text-xs text-slate-500">{VENDORS[cheapest.vendor].name}</div>
                      </div>
                    )}
                    <Link
                      href={`/product/${p.slug}`}
                      target="_blank"
                      className="shrink-0 text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 px-2 py-1 rounded"
                    >
                      ↗
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
