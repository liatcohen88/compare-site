import type { Metadata } from "next";
import promosData from "@/lib/aliexpress-promos.json";

export const metadata: Metadata = {
  title: "מבצעים וקופונים פעילים - Mid-Year Sale באליאקספרס",
  description:
    "כל המבצעים החמים באליאקספרס כרגע: רבי-מכר, הנחות ענק, מותגי-על וAliExpress Choice. עד 70% הנחה, משלוח לישראל.",
  alternates: { canonical: "/promotions" },
};

type Product = {
  id: string;
  title: string;
  image: string;
  salePrice: number;
  originalPrice: number;
  discount: string;
  url: string;
  rating?: string;
  orders?: number;
};

type Campaign = { name: string; label: string; products: Product[] };

const data = promosData as { generatedAt: string; campaigns: Campaign[] };

function PromoCard({ p }: { p: Product }) {
  const off = Math.round(((p.originalPrice - p.salePrice) / p.originalPrice) * 100);
  const imgProxy = `https://images.weserv.nl/?url=${encodeURIComponent(p.image.replace(/^https?:\/\//, ""))}&w=400&h=400&fit=cover&output=webp&q=85`;

  return (
    <a
      href={p.url}
      target="_blank"
      rel="sponsored noopener"
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-red-300 transition-all flex flex-col"
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgProxy} alt={p.title} loading="lazy" className="w-full aspect-square object-cover" />
        {off > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-sm font-extrabold px-2.5 py-1 rounded-full shadow-md">
            -{off}%
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3 className="text-xs text-slate-700 line-clamp-2 leading-tight min-h-[2.5rem]">
          {p.title}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-extrabold text-red-600 numeric">₪{p.salePrice}</span>
          <span className="text-xs text-slate-400 line-through numeric">₪{p.originalPrice}</span>
        </div>
        {p.orders && p.orders > 0 && (
          <div className="text-[10px] text-slate-500 mt-auto">🔥 {p.orders} נמכרו</div>
        )}
        <span className="mt-2 text-center text-xs font-bold text-white bg-red-600 group-hover:bg-red-700 rounded-full py-1.5">
          לקנייה ←
        </span>
      </div>
    </a>
  );
}

export default function PromotionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">
          🔥 מבצעים פעילים כרגע
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          קופוני-על אמיתיים מ-AliExpress דרך תוכנית השותפים שלנו. עד 70% הנחה, משלוח לישראל.
        </p>
        <p className="text-xs text-slate-400 mt-2">עודכן: {data.generatedAt}</p>
      </div>

      {data.campaigns.map((c) =>
        c.products.length === 0 ? null : (
          <section key={c.name} className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 border-b-2 border-red-100 pb-2">
              {c.label}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {c.products.map((p) => (
                <PromoCard key={`${c.name}-${p.id}`} p={p} />
              ))}
            </div>
          </section>
        ),
      )}

      <div className="mt-12 bg-red-50 border border-red-200 rounded-2xl p-6 text-sm text-slate-700">
        <p className="font-semibold text-red-900 mb-2">💡 איך זה עובד</p>
        <p>
          המבצעים האלה מתעדכנים אוטומטית מ-AliExpress דרך תוכנית השותפים שלנו. אנחנו
          מקבלים עמלה קטנה כשאת קונה דרך הקישורים — בלי תוספת מחיר עבורך. ההנחה
          תוחל אוטומטית בקופה.
        </p>
      </div>
    </div>
  );
}
