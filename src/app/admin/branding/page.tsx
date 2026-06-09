"use client";

import { useState, useEffect } from "react";

const DEFAULT_BRANDING = {
  logoEmoji: "💰",
  logoUrl: "",
  logoSize: 64, // px height
  faviconUrl: "",
  primaryColor: "#0066ff",
  accentColor: "#ff6b9d",
};

export default function BrandingPage() {
  const [branding, setBranding] = useState(DEFAULT_BRANDING);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin_branding");
    if (stored) {
      try {
        setBranding({ ...DEFAULT_BRANDING, ...JSON.parse(stored) });
      } catch {}
    }
  }, []);

  function save() {
    localStorage.setItem("admin_branding", JSON.stringify(branding));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function update<K extends keyof typeof branding>(key: K, value: (typeof branding)[K]) {
    setBranding((b) => ({ ...b, [key]: value }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">🎨 לוגו ועיצוב</h1>
        <p className="text-slate-500">שינוי לוגו, אייקון וצבעים של האתר</p>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-sm text-amber-900">
        ⚠️ <strong>הערה חשובה:</strong> כרגע השינויים נשמרים רק בדפדפן הנוכחי (למטרת תצוגה מקדימה).
        להחלת השינויים על האתר החי - דרושה הפעלת <strong>Vercel Blob</strong> או <strong>Supabase Storage</strong>.
        זה יהיה זמין בעדכון הבא.
      </div>

      {/* Logo */}
      <section className="border-2 border-slate-200 rounded-xl p-5 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">🖼️ לוגו</h2>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            סוג לוגו: אימוג&apos;י (מהיר ופשוט)
          </label>
          <input
            type="text"
            value={branding.logoEmoji}
            onChange={(e) => update("logoEmoji", e.target.value)}
            maxLength={2}
            className="w-24 px-4 py-3 text-3xl text-center border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
          <p className="text-xs text-slate-500 mt-1">דוגמאות: 💰 🛍️ 🎯 ✨ 🌟 💎</p>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            גודל לוגו (גובה בפיקסלים): {branding.logoSize}px
          </label>
          <input
            type="range"
            min={32}
            max={120}
            value={branding.logoSize}
            onChange={(e) => update("logoSize", Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>קטן (32)</span>
            <span>בינוני (64)</span>
            <span>גדול (120)</span>
          </div>
          <div className="mt-3 p-4 bg-slate-50 rounded-lg flex items-center justify-center">
            {branding.logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={branding.logoUrl}
                alt="preview"
                style={{ height: branding.logoSize }}
                className="w-auto"
              />
            ) : (
              <div
                className="bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold"
                style={{ height: branding.logoSize, padding: "0 1rem" }}
              >
                השווה לי
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            או: URL ללוגו (PNG/SVG)
          </label>
          <input
            type="url"
            value={branding.logoUrl}
            onChange={(e) => update("logoUrl", e.target.value)}
            placeholder="https://example.com/logo.png"
            className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
          <p className="text-xs text-slate-500 mt-1">
            העלי תמונה ל-<a href="https://imgur.com/upload" target="_blank" className="text-blue-600 hover:underline">imgur.com</a> או <a href="https://postimages.org" target="_blank" className="text-blue-600 hover:underline">postimages.org</a> והעתיקי את ה-URL הישיר.
          </p>
          {branding.logoUrl && (
            <div className="mt-3 p-3 bg-slate-50 rounded-lg inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={branding.logoUrl} alt="logo preview" className="h-12" />
            </div>
          )}
        </div>
      </section>

      {/* Favicon */}
      <section className="border-2 border-slate-200 rounded-xl p-5 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">🔖 Favicon (אייקון טאב)</h2>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">URL לאייקון 32x32 או 64x64</label>
          <input
            type="url"
            value={branding.faviconUrl}
            onChange={(e) => update("faviconUrl", e.target.value)}
            placeholder="https://example.com/favicon.ico"
            className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
          <p className="text-xs text-slate-500 mt-1">
            מומלץ ליצור ב-<a href="https://favicon.io" target="_blank" className="text-blue-600 hover:underline">favicon.io</a> או להוריד מ-<a href="https://www.flaticon.com" target="_blank" className="text-blue-600 hover:underline">flaticon.com</a>
          </p>
          {branding.faviconUrl && (
            <div className="mt-3 p-3 bg-slate-50 rounded-lg inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={branding.faviconUrl} alt="favicon preview" className="w-8 h-8" />
            </div>
          )}
        </div>
      </section>

      {/* Colors */}
      <section className="border-2 border-slate-200 rounded-xl p-5 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">🎨 צבעים</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">צבע ראשי (Brand)</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={branding.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
                className="h-12 w-16 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={branding.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-xl font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">צבע משני (Accent)</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={branding.accentColor}
                onChange={(e) => update("accentColor", e.target.value)}
                className="h-12 w-16 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={branding.accentColor}
                onChange={(e) => update("accentColor", e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-xl font-mono"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={save}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl"
        >
          💾 שמירה
        </button>
        {saved && (
          <span className="text-green-600 font-medium">✓ נשמר בהצלחה</span>
        )}
      </div>
    </div>
  );
}
