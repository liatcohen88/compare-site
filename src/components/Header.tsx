import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/config";
import CategoryDropdown from "./CategoryDropdown";

const HEADER_CATS = [
  "fashion",
  "beauty",
  "jewelry",
  "accessories",
  "haircare",
  "kitchen",
  "kids",
  "home",
];

export default function Header() {
  const headerCats = HEADER_CATS.map((slug) =>
    CATEGORIES.find((c) => c.slug === slug),
  ).filter((c): c is (typeof CATEGORIES)[number] => Boolean(c));

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* שורה עליונה - מובייל: לוגו במרכז + אודות בצד */}
        <div className="flex items-center justify-center md:justify-between h-20 md:h-24 relative">
          <Link href="/about" className="hidden md:block text-sm text-slate-600 hover:text-blue-600 shrink-0 order-3">
            אודות
          </Link>

          <Link href="/" className="flex items-center group" aria-label="השווה לי">
            <Image
              src="/logo.png"
              alt="השווה לי"
              width={280}
              height={80}
              priority
              className="h-14 md:h-16 w-auto"
            />
          </Link>

          {/* אודות במובייל - בפינה ימנית מוחלטת */}
          <Link href="/about" className="md:hidden absolute right-0 text-xs text-slate-500 hover:text-blue-600">
            אודות
          </Link>

          {/* תפריט קטגוריות בדסקטופ */}
          <nav className="hidden md:flex items-center gap-1 order-2">
            <CategoryDropdown />
            {headerCats.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-2 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* שורה תחתונה - כל הקטגוריות בגלילה אופקית */}
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 items-center scrollbar-hide">
          <Link
            href="/categories"
            className="shrink-0 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-full font-semibold flex items-center gap-1"
          >
            📋 כל הקטגוריות
          </Link>
          {headerCats.map((cat) => (
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
