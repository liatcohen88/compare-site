import Link from "next/link";
import { getAllProducts } from "@/lib/mock-data";
import { CATEGORIES, VENDORS } from "@/lib/config";

export default function AdminDashboard() {
  const products = getAllProducts();
  const totalOffers = products.reduce((sum, p) => sum + p.offers.length, 0);

  const byVendor: Record<string, number> = { ksp: 0, amazon: 0, aliexpress: 0, shein: 0 };
  for (const p of products) {
    for (const o of p.offers) {
      if (o.inStock) byVendor[o.vendor]++;
    }
  }

  const byCategory: Record<string, number> = {};
  for (const p of products) {
    byCategory[p.category] = (byCategory[p.category] ?? 0) + 1;
  }

  const stats = [
    { label: "סך מוצרים", value: products.length, icon: "📦", color: "blue" },
    { label: "סך קטגוריות", value: CATEGORIES.length, icon: "📂", color: "purple" },
    { label: "סך הצעות מחיר", value: totalOffers, icon: "🏷️", color: "green" },
    { label: "ממוצע חנויות למוצר", value: (totalOffers / products.length).toFixed(1), icon: "🛒", color: "amber" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          ברוכה הבאה, ליאת 👋
        </h1>
        <p className="text-slate-500">סקירה כללית של האתר שלך</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-slate-50 border border-slate-200 rounded-xl p-4"
          >
            <div className="text-3xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold text-slate-900 numeric">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">חלוקה לפי חנות</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(byVendor).map(([id, count]) => {
            const v = VENDORS[id as keyof typeof VENDORS];
            return (
              <div key={id} className="border border-slate-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{v.countryFlag}</div>
                <div className="font-bold text-slate-900">{v.name}</div>
                <div className="text-2xl font-bold text-blue-600 numeric">{count}</div>
                <div className="text-xs text-slate-500">מוצרים פעילים</div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">פעולות מהירות</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <Link
            href="/admin/products"
            className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-4"
          >
            <div className="font-semibold text-blue-900">📦 צפייה בכל המוצרים</div>
            <div className="text-sm text-blue-700">{products.length} מוצרים</div>
          </Link>
          <Link
            href="/admin/stats"
            className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-4"
          >
            <div className="font-semibold text-green-900">📈 סטטיסטיקה ותנועה</div>
            <div className="text-sm text-green-700">מבקרים, קליקים, המרות</div>
          </Link>
          <Link
            href="/admin/branding"
            className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl p-4"
          >
            <div className="font-semibold text-purple-900">🎨 שינוי לוגו ועיצוב</div>
            <div className="text-sm text-purple-700">לוגו, favicon, צבעים</div>
          </Link>
          <Link
            href="/admin/content"
            className="bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl p-4"
          >
            <div className="font-semibold text-amber-900">✏️ עריכת טקסטים</div>
            <div className="text-sm text-amber-700">כותרת ראשית, אודות, footer</div>
          </Link>
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
        <div className="font-semibold text-amber-900 mb-1">⚠️ הגדרות שצריך להשלים</div>
        <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
          {!process.env.NEXT_PUBLIC_GA_ID && <li>חיבור Google Analytics (משתנה: <code>NEXT_PUBLIC_GA_ID</code>)</li>}
          {!process.env.RESEND_API_KEY && <li>הגדרת Resend API לדוחות יומיים (משתנה: <code>RESEND_API_KEY</code>)</li>}
          {!process.env.ADMIN_PASSWORD && <li>הגדרת סיסמת מנהל (משתנה: <code>ADMIN_PASSWORD</code>) - כרגע ברירת מחדל!</li>}
          {!process.env.BLOB_READ_WRITE_TOKEN && <li>הפעלת Vercel Blob לטעינת תמונות</li>}
        </ul>
      </div>
    </div>
  );
}
