"use client";

import { useEffect, useState } from "react";

interface Settings {
  fontScale: number;
  highContrast: boolean;
  reduceMotion: boolean;
  underlineLinks: boolean;
  dyslexicFont: boolean;
}

const DEFAULTS: Settings = {
  fontScale: 1,
  highContrast: false,
  reduceMotion: false,
  underlineLinks: false,
  dyslexicFont: false,
};

const STORAGE_KEY = "hashveli_a11y";

function applySettings(s: Settings) {
  const root = document.documentElement;
  root.style.fontSize = `${16 * s.fontScale}px`;
  root.classList.toggle("a11y-high-contrast", s.highContrast);
  root.classList.toggle("a11y-reduce-motion", s.reduceMotion);
  root.classList.toggle("a11y-underline-links", s.underlineLinks);
  root.classList.toggle("a11y-dyslexic-font", s.dyslexicFont);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = { ...DEFAULTS, ...JSON.parse(saved) };
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch {}
  }, []);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    applySettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  function reset() {
    setSettings(DEFAULTS);
    applySettings(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-40 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        aria-label="פתח תפריט נגישות"
        title="נגישות"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-9 h-9"
          aria-hidden="true"
        >
          {/* Head */}
          <circle cx="42" cy="14" r="5" fill="#fbbf24" />
          {/* Body leaning forward + arm pushing wheel */}
          <path
            d="M 41 22 Q 39 30 33 33 L 24 30 Q 21 30 21 33 Q 21 36 24 36 L 32 39 Q 36 39 38 36 L 41 30 Z"
            fill="#fbbf24"
          />
          {/* Trailing arm/body curve to wheel */}
          <path
            d="M 39 23 Q 47 30 45 42"
            stroke="#fbbf24"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Wheel - outer circle */}
          <circle
            cx="32"
            cy="48"
            r="11"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3.5"
          />
          {/* Wheel - inner dot for spoke center */}
          <circle cx="32" cy="48" r="2" fill="#fbbf24" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center md:justify-end p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-title"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full md:max-w-md p-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <h2 id="a11y-title" className="text-xl font-bold text-slate-900">
                ♿ אפשרויות נגישות
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-slate-100 text-2xl"
                aria-label="סגור"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Font size */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  גודל גופן: {Math.round(settings.fontScale * 100)}%
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      update("fontScale", Math.max(0.8, settings.fontScale - 0.1))
                    }
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold"
                    aria-label="הקטן גופן"
                  >
                    א-
                  </button>
                  <input
                    type="range"
                    min={0.8}
                    max={1.6}
                    step={0.1}
                    value={settings.fontScale}
                    onChange={(e) => update("fontScale", Number(e.target.value))}
                    className="flex-1 accent-blue-600"
                    aria-label="התאמת גודל גופן"
                  />
                  <button
                    onClick={() =>
                      update("fontScale", Math.min(1.6, settings.fontScale + 0.1))
                    }
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold"
                    aria-label="הגדל גופן"
                  >
                    א+
                  </button>
                </div>
              </div>

              {/* High contrast */}
              <button
                onClick={() => update("highContrast", !settings.highContrast)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 ${
                  settings.highContrast
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200"
                }`}
                aria-pressed={settings.highContrast}
              >
                <span className="font-semibold">🌓 ניגודיות גבוהה</span>
                <span className="text-2xl">
                  {settings.highContrast ? "✅" : "⚪"}
                </span>
              </button>

              {/* Reduce motion */}
              <button
                onClick={() => update("reduceMotion", !settings.reduceMotion)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 ${
                  settings.reduceMotion
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200"
                }`}
                aria-pressed={settings.reduceMotion}
              >
                <span className="font-semibold">⏸️ הפחת אנימציות</span>
                <span className="text-2xl">
                  {settings.reduceMotion ? "✅" : "⚪"}
                </span>
              </button>

              {/* Underline links */}
              <button
                onClick={() => update("underlineLinks", !settings.underlineLinks)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 ${
                  settings.underlineLinks
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200"
                }`}
                aria-pressed={settings.underlineLinks}
              >
                <span className="font-semibold">🔗 הדגשת קישורים</span>
                <span className="text-2xl">
                  {settings.underlineLinks ? "✅" : "⚪"}
                </span>
              </button>

              {/* Dyslexic font */}
              <button
                onClick={() => update("dyslexicFont", !settings.dyslexicFont)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 ${
                  settings.dyslexicFont
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200"
                }`}
                aria-pressed={settings.dyslexicFont}
              >
                <span className="font-semibold">📖 גופן ידידותי לדיסלקסיה</span>
                <span className="text-2xl">
                  {settings.dyslexicFont ? "✅" : "⚪"}
                </span>
              </button>

              <button
                onClick={reset}
                className="w-full p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-semibold"
              >
                🔄 אפס הכל
              </button>

              <div className="text-center pt-3 border-t border-slate-200">
                <a
                  href="/accessibility"
                  className="text-sm text-blue-600 hover:underline"
                >
                  להצהרת הנגישות המלאה ←
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
