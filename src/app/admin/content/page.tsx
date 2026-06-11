"use client";

import { useState, useEffect } from "react";

const DEFAULT_CONTENT = {
  siteName: "השווה לי",
  heroTitle: "תפסיקי לשלם יותר מדי",
  heroSubtitle: "אופנה, יופי, אקססוריז, אלקטרוניקה - השוואת מחירים בלחיצה אחת",
  heroTagline: "KSP · אמזון · אליאקספרס · שיין · מעודכן יומית · חינמי לחלוטין",
  footerSlogan: "משווה המחירים המוביל בישראל - השוואה בין KSP, אמזון, אליאקספרס ושיין.",
  aboutMission:
    "אנחנו אתר השוואת מחירים עצמאי, שמטרתו היחידה לחסוך לכם כסף.",
  contactEmail: "motiva8891@gmail.com",
};

export default function ContentPage() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin_content");
    if (stored) {
      try {
        setContent({ ...DEFAULT_CONTENT, ...JSON.parse(stored) });
      } catch {}
    }
  }, []);

  function save() {
    localStorage.setItem("admin_content", JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function field<K extends keyof typeof content>(
    key: K,
    label: string,
    placeholder?: string,
    multiline = false,
  ) {
    return (
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
        {multiline ? (
          <textarea
            value={content[key] as string}
            onChange={(e) => setContent((c) => ({ ...c, [key]: e.target.value }))}
            placeholder={placeholder}
            rows={3}
            className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        ) : (
          <input
            type="text"
            value={content[key] as string}
            onChange={(e) => setContent((c) => ({ ...c, [key]: e.target.value }))}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">✏️ עריכת תוכן</h1>
        <p className="text-slate-500">שינוי טקסטים שמופיעים באתר</p>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-sm text-amber-900">
        ⚠️ <strong>הערה:</strong> השינויים נשמרים כרגע רק בדפדפן (תצוגה מקדימה).
        להחלת השינויים על האתר החי, דרושה הגדרת <strong>Vercel KV</strong> (יוסף בהמשך).
      </div>

      <section className="border-2 border-slate-200 rounded-xl p-5 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">🏠 דף הבית</h2>
        {field("siteName", "שם האתר")}
        {field("heroTitle", "כותרת ראשית (Hero)")}
        {field("heroSubtitle", "כותרת משנית", "", true)}
        {field("heroTagline", "Tagline (השורה הקטנה)")}
      </section>

      <section className="border-2 border-slate-200 rounded-xl p-5 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">📄 אודות + Footer</h2>
        {field("footerSlogan", "סלוגן ב-Footer", "", true)}
        {field("aboutMission", "משימת האתר (בעמוד אודות)", "", true)}
      </section>

      <section className="border-2 border-slate-200 rounded-xl p-5 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">📧 פרטי קשר</h2>
        {field("contactEmail", "אימייל ליצירת קשר")}
      </section>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={save}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl"
        >
          💾 שמירה
        </button>
        {saved && <span className="text-green-600 font-medium">✓ נשמר בהצלחה</span>}
      </div>
    </div>
  );
}
