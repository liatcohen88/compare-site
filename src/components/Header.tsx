import Link from "next/link";
import CategoryDropdown from "./CategoryDropdown";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <CategoryDropdown />

          <nav className="flex items-center gap-2">
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-semibold bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full"
            >
              📚 בלוגים
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
            >
              ℹ️ אודות
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
