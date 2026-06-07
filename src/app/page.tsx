import Link from "next/link";
import { getAllProducts } from "@/lib/mock-data";
import { CATEGORIES, POPULAR_CATEGORIES } from "@/lib/config";
import ProductCard from "@/components/ProductCard";
import VendorFilterClient from "@/components/VendorFilterClient";

export default function HomePage() {
  const products = getAllProducts();
  const popularCats = POPULAR_CATEGORIES.map((slug) =>
    CATEGORIES.find((c) => c.slug === slug),
  ).filter((c): c is (typeof CATEGORIES)[number] => Boolean(c));

  return (
    <>
      <section className="bg-gradient-to-l from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            תפסיקי לשלם יותר מדי
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-2">
            אופנה, יופי, אקססוריז, אלקטרוניקה - השוואת מחירים בלחיצה אחת
          </p>
          <p className="text-blue-200">
            KSP · אמזון · אליאקספרס · שיין · מעודכן יומית · חינמי לחלוטין
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">קטגוריות פופולריות</h2>
            <Link href="/categories" className="text-sm text-blue-600 hover:underline">
              כל הקטגוריות ({CATEGORIES.length}) ←
            </Link>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {popularCats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-blue-50 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs text-center text-slate-700 group-hover:text-blue-600 leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            המוצרים הכי מבוקשים
          </h2>
        </div>
        <VendorFilterClient products={products} />
      </section>

      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            למה להשתמש בנו?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-lg mb-2">חוסכים לך כסף</h3>
              <p className="text-slate-600 text-sm">
                משווים מחירים בין 4 חנויות בלחיצה אחת. חוסכים בממוצע 30% על כל קנייה.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2">מהיר ופשוט</h3>
              <p className="text-slate-600 text-sm">
                מצא את המחיר הזול ביותר תוך שניות. ללא רישום, ללא טפסים, ללא ספאם.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-bold text-lg mb-2">מעודכן בזמן אמת</h3>
              <p className="text-slate-600 text-sm">
                המחירים שלנו מתעדכנים כל יום. תמיד תדעו אם יש מבצע או ירידת מחיר.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
