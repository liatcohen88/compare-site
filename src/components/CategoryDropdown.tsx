"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { CATEGORIES, CATEGORY_GROUPS } from "@/lib/config";

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>📋 קטגוריות</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full mt-2 right-0 w-[min(95vw,800px)] bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 z-50"
          role="menu"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORY_GROUPS.map((group) => {
              const cats = CATEGORIES.filter((c) => c.group === group);
              if (cats.length === 0) return null;
              return (
                <div key={group}>
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2 border-b border-slate-200 pb-1">
                    {group}
                  </h3>
                  <ul className="space-y-1">
                    {cats.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/category/${cat.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md px-2 py-1"
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-200 text-center">
            <Link
              href="/categories"
              onClick={() => setOpen(false)}
              className="text-sm text-blue-600 hover:underline font-semibold"
            >
              לדף הקטגוריות המלא ({CATEGORIES.length}) ←
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
