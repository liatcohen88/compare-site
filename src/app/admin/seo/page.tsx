import Link from "next/link";
import { getAllProducts } from "@/lib/mock-data";
import { CATEGORIES, SITE_URL } from "@/lib/config";

export default function SeoPage() {
  const products = getAllProducts();
  const totalPages = products.length + CATEGORIES.length + 8;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">🔍 SEO</h1>
        <p className="text-slate-500">קידום אורגני וקריאות גוגל</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat icon="📄" label="עמודי מוצר" value={products.length} />
        <Stat icon="📂" label="עמודי קטגוריה" value={CATEGORIES.length} />
        <Stat icon="📑" label="עמודי תוכן" value={8} />
        <Stat icon="🌐" label="סה&quot;כ עמודים" value={totalPages} />
      </div>

      <section className="border-2 border-slate-200 rounded-xl p-5">
        <h2 className="text-xl font-bold text-slate-900 mb-3">🔗 קבצי SEO</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href={`${SITE_URL}/sitemap.xml`} target="_blank" className="text-blue-600 hover:underline">
              sitemap.xml ↗
            </Link>
            <span className="text-slate-500"> - מפת אתר אוטומטית (כל המוצרים, קטגוריות, עמודי תוכן)</span>
          </li>
          <li>
            <Link href={`${SITE_URL}/robots.txt`} target="_blank" className="text-blue-600 hover:underline">
              robots.txt ↗
            </Link>
            <span className="text-slate-500"> - הנחיות לרובוטים של גוגל</span>
          </li>
        </ul>
      </section>

      <section className="border-2 border-amber-300 bg-amber-50 rounded-xl p-5">
        <h2 className="text-xl font-bold text-amber-900 mb-3">🚨 שלבי קידום נדרשים</h2>
        <ol className="list-decimal list-inside text-sm text-amber-800 space-y-2">
          <li>
            <strong>Google Search Console</strong> - <Link href="https://search.google.com/search-console" target="_blank" className="text-blue-600 hover:underline">להירשם</Link>
            <div className="text-xs ml-5 mt-1">להוסיף את hashveli.co.il כ-Property, לאמת באמצעות tag, ולהגיש את sitemap.xml</div>
          </li>
          <li>
            <strong>Google Analytics 4</strong> - חיבור ע&quot;י הוספת <code>NEXT_PUBLIC_GA_ID</code> ל-Vercel
          </li>
          <li>
            <strong>Bing Webmaster Tools</strong> - <Link href="https://www.bing.com/webmasters" target="_blank" className="text-blue-600 hover:underline">להירשם</Link>
            <div className="text-xs ml-5 mt-1">Bing קל לאישור ונותן 5-10% תנועה נוספת</div>
          </li>
          <li>
            <strong>Indexing API</strong> - לבקש מגוגל לסרוק עמודים חדשים מהר
          </li>
        </ol>
      </section>

      <section className="border-2 border-green-200 bg-green-50 rounded-xl p-5">
        <h2 className="text-xl font-bold text-green-900 mb-2">✅ מה כבר עשוי</h2>
        <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
          <li>RTL מלא + lang=&quot;he&quot;</li>
          <li>OpenGraph + meta descriptions לכל עמוד</li>
          <li>Structured data (Schema.org) לכל מוצר</li>
          <li>Sitemap דינמי</li>
          <li>HTTPS עם SSL</li>
          <li>Fast loading (Static Site Generation)</li>
          <li>Mobile-friendly</li>
        </ul>
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-slate-900 numeric">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
