import Link from "next/link";
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
  "smartphones",
  "headphones",
];

export default function Header() {
  const headerCats = HEADER_CATS.map((slug) =>
    CATEGORIES.find((c) => c.slug === slug),
  ).filter((c): c is (typeof CATEGORIES)[number] => Boolean(c));

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          <CategoryDropdown />
          {headerCats.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="shrink-0 px-3 py-1.5 text-sm bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-full whitespace-nowrap"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
          <Link
            href="/about"
            className="shrink-0 px-3 py-1.5 text-sm text-slate-500 hover:text-blue-600 mr-auto"
          >
            אודות
          </Link>
        </div>
      </div>
    </header>
  );
}
