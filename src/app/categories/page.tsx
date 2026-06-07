import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES, CATEGORY_GROUPS } from "@/lib/config";
import { getAllProducts } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "כל הקטגוריות",
  description: "כל קטגוריות המוצרים באתר השוואת המחירים - אופנה, יופי, אקססוריז, בית, ילדים, טכנולוגיה ועוד.",
};

export default function CategoriesPage() {
  const products = getAllProducts();

  const groupedCats = CATEGORY_GROUPS.map((g) => ({
    group: g,
    cats: CATEGORIES.filter((c) => c.group === g).map((c) => ({
      ...c,
      count: products.filter((p) => p.category === c.slug).length,
    })),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          כל הקטגוריות
        </h1>
        <p className="text-slate-600">
          {CATEGORIES.length} קטגוריות מסודרות לפי תחום - בחר נישה ומצא את המחיר הזול
        </p>
      </header>

      <div className="space-y-10">
        {groupedCats.map(({ group, cats }) => (
          <section key={group}>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
              {group}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {cats.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md group text-center"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <div className="font-semibold text-slate-900 text-sm group-hover:text-blue-600">
                    {cat.name}
                  </div>
                  {cat.count > 0 && (
                    <div className="text-xs text-slate-500 mt-1">
                      {cat.count} מוצרים
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
