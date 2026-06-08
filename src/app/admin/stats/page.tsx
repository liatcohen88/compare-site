import Link from "next/link";

export default function StatsPage() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const hasAnalytics = !!gaId;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">📈 סטטיסטיקה</h1>
        <p className="text-slate-500">נתוני תנועה ומכירות באתר</p>
      </div>

      {/* Vercel Analytics */}
      <section className="border-2 border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">⚡ Vercel Analytics</h2>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            פעיל ✓
          </span>
        </div>
        <p className="text-slate-600 text-sm mb-3">
          נתונים בזמן אמת על מבקרים, דפים פופולריים, ומקורות תנועה.
          המידע מתחיל להיאסף ברגע שהאתר עלה לאוויר.
        </p>
        <Link
          href="https://vercel.com/motiva8891-4777s-projects/compare-site/analytics"
          target="_blank"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          פתח דשבורד Vercel ↗
        </Link>
      </section>

      {/* Google Analytics */}
      <section className="border-2 border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">📊 Google Analytics</h2>
          <span className={`text-xs px-2 py-1 rounded-full ${hasAnalytics ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
            {hasAnalytics ? "פעיל ✓" : "לא מוגדר"}
          </span>
        </div>

        {hasAnalytics ? (
          <>
            <p className="text-slate-600 text-sm mb-3">
              מזהה GA: <code className="bg-slate-100 px-2 py-0.5 rounded">{gaId}</code>
            </p>
            <Link
              href="https://analytics.google.com/analytics/web/"
              target="_blank"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              פתח Google Analytics ↗
            </Link>
          </>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
            <p className="font-semibold text-amber-900 mb-2">להפעלת Google Analytics:</p>
            <ol className="list-decimal list-inside text-amber-800 space-y-1">
              <li>היכנסי ל-<Link href="https://analytics.google.com" target="_blank" className="text-blue-600 hover:underline">analytics.google.com</Link></li>
              <li>צרי Property חדש לאתר hashveli.co.il</li>
              <li>העתיקי את ה-Measurement ID (פורמט: G-XXXXXXXXXX)</li>
              <li>הוסיפי ב-Vercel: <code>NEXT_PUBLIC_GA_ID</code> = הערך</li>
              <li>הגדירי דוחות אוטומטיים: Settings → Insights → Email reports</li>
            </ol>
          </div>
        )}
      </section>

      {/* Speed Insights */}
      <section className="border-2 border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">🚀 Speed Insights</h2>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            פעיל ✓
          </span>
        </div>
        <p className="text-slate-600 text-sm mb-3">
          ביצועי האתר: זמן טעינה, Core Web Vitals, חוויית משתמש.
        </p>
        <Link
          href="https://vercel.com/motiva8891-4777s-projects/compare-site/speed-insights"
          target="_blank"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          פתח Speed Insights ↗
        </Link>
      </section>

      {/* Daily Email Report */}
      <section className="border-2 border-dashed border-amber-300 rounded-xl p-5 bg-amber-50">
        <h2 className="text-xl font-bold text-slate-900 mb-2">📧 דוח יומי באימייל (23:00)</h2>
        <p className="text-slate-700 text-sm mb-3">
          מערכת הדוח היומי מוכנה. דורש הגדרה:
        </p>
        <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1 mb-3">
          <li>חשבון <Link href="https://resend.com" target="_blank" className="text-blue-600 hover:underline">Resend.com</Link> (חינמי עד 3000 מייל בחודש)</li>
          <li>API key מוסיפים ל-Vercel: <code>RESEND_API_KEY</code></li>
          <li>אימייל למשלוח: <code>ADMIN_EMAIL</code> (= האימייל שלך)</li>
          <li>ה-Cron job כבר מוגדר ב-vercel.json לרוץ ב-23:00 IST יומי</li>
        </ol>
        <Link
          href="/admin/affiliate"
          className="inline-block bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          הגדרות אפיליאט →
        </Link>
      </section>
    </div>
  );
}
