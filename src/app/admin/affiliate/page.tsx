import Link from "next/link";

export default function AffiliatePage() {
  const affiliates = [
    {
      name: "KSP Express Promotion",
      id: "F15240AX",
      status: "active",
      commission: "5-7%",
      dashboard: "https://ksp.co.il/af/",
      flag: "🇮🇱",
    },
    {
      name: "AliExpress Affiliate",
      id: "App: 535876",
      status: "active",
      commission: "3-9%",
      dashboard: "https://portals.aliexpress.com/",
      flag: "🇨🇳",
    },
    {
      name: "Amazon Associates",
      id: "hashveli-20",
      status: "provisional",
      commission: "1-10%",
      dashboard: "https://affiliate-program.amazon.com/home",
      flag: "🇺🇸",
      note: "תקופת מבחן 180 ימים - דרושות 3 מכירות עד 8 בדצמבר 2026",
    },
    {
      name: "Box.co.il Affiliate",
      id: "aff=270",
      status: "active",
      commission: "?",
      dashboard: "https://members.box.co.il/",
      flag: "🇮🇱",
      note: "לא מחובר כרגע לאתר (B2B / hosting)",
    },
    {
      name: "Shein Affiliate",
      id: "—",
      status: "pending",
      commission: "10-20%",
      dashboard: "https://www.awin.com/become-a-publisher",
      flag: "🇨🇳",
      note: "להגיש דרך Awin",
    },
    {
      name: "Awin (1000+ מותגים)",
      id: "—",
      status: "not-started",
      commission: "משתנה",
      dashboard: "https://www.awin.com/become-a-publisher",
      flag: "🌍",
      note: "$5 דמי הרשמה (מוחזרים)",
    },
    {
      name: "Google AdSense",
      id: "—",
      status: "not-started",
      commission: "CPC/CPM",
      dashboard: "https://www.google.com/adsense/start/",
      flag: "💰",
      note: "להגיש אחרי 30+ עמודים ותנועה ראשונית",
    },
  ];

  const statusColors = {
    active: "bg-green-100 text-green-700",
    provisional: "bg-amber-100 text-amber-700",
    pending: "bg-blue-100 text-blue-700",
    "not-started": "bg-slate-100 text-slate-600",
  };
  const statusLabels = {
    active: "פעיל",
    provisional: "תנאי",
    pending: "ממתין",
    "not-started": "לא הוגש",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">💰 תוכניות שותפים</h1>
        <p className="text-slate-500">סטטוס של כל תוכניות האפיליאט</p>
      </div>

      <div className="space-y-3">
        {affiliates.map((a) => (
          <div
            key={a.name}
            className="border-2 border-slate-200 rounded-xl p-4 hover:border-blue-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{a.flag}</span>
                  <h3 className="font-bold text-slate-900">{a.name}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${statusColors[a.status as keyof typeof statusColors]}`}
                  >
                    {statusLabels[a.status as keyof typeof statusLabels]}
                  </span>
                </div>
                <div className="text-sm text-slate-600 grid md:grid-cols-3 gap-x-4 gap-y-1">
                  <div>
                    <span className="text-slate-400">ID:</span> <code className="text-xs">{a.id}</code>
                  </div>
                  <div>
                    <span className="text-slate-400">עמלה:</span> {a.commission}
                  </div>
                  <Link
                    href={a.dashboard}
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    דשבורד ↗
                  </Link>
                </div>
                {a.note && (
                  <div className="mt-2 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded">
                    💡 {a.note}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
        <h2 className="font-bold text-blue-900 mb-2">📚 משאבים</h2>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li><Link href="/affiliate-disclosure" target="_blank" className="hover:underline">עמוד גילוי שותפים באתר</Link></li>
          <li>תוכניות עתידיות לבדיקה: Rakuten, Impact, ShareASale</li>
          <li>כדאי גם: תוכניות שותפים של מותגים ספציפיים (Apple, Sephora ישירות)</li>
        </ul>
      </section>
    </div>
  );
}
