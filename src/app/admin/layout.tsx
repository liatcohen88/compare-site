import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ניהול",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "📊 דשבורד" },
  { href: "/admin/stats", label: "📈 סטטיסטיקה" },
  { href: "/admin/products", label: "📦 מוצרים" },
  { href: "/admin/content", label: "✏️ עריכת תוכן" },
  { href: "/admin/branding", label: "🎨 לוגו ועיצוב" },
  { href: "/admin/affiliate", label: "💰 אפיליאטים" },
  { href: "/admin/seo", label: "🔍 SEO" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <div className="font-bold">פאנל ניהול - השווה לי</div>
              <div className="text-xs text-slate-400">מצב מנהל</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-slate-300 hover:text-white"
              target="_blank"
            >
              ↗ פתח אתר
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg"
              >
                התנתקות
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[220px_1fr] gap-6">
        <aside className="space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-sm text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </aside>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[60vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
