import Link from "next/link";
import { SITE_NAME, CATEGORIES } from "@/lib/config";
import CategoryDropdown from "./CategoryDropdown";

const QUICK_CATS = ["fashion", "beauty", "kitchen", "kids"];

export default function Header() {
  const quickCats = QUICK_CATS.map((slug) =>
    CATEGORIES.find((c) => c.slug === slug),
  ).filter((c): c is (typeof CATEGORIES)[number] => Boolean(c));

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-2xl">💰</span>
            <span className="text-xl font-bold text-slate-900 group-hover:text-blue-600">
              {SITE_NAME}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
            <CategoryDropdown />
            {quickCats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/about"
            className="hidden md:inline-block text-sm text-slate-600 hover:text-blue-600 shrink-0"
          >
            אודות
          </Link>
        </div>

        <div className="md:hidden pb-3 flex gap-2 overflow-x-auto items-center">
          <Link
            href="/categories"
            className="shrink-0 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-full font-semibold"
          >
            📋 קטגוריות
          </Link>
          {quickCats.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="shrink-0 px-3 py-1.5 text-sm bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-full"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
