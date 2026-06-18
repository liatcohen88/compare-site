import Link from "next/link";
import Image from "next/image";
import CategoryDropdown from "./CategoryDropdown";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          {/* Logo: icon + text */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group"
            aria-label="Hashveli - השוואת מחירים"
          >
            <Image
              src="/logo-icon.svg"
              alt=""
              width={48}
              height={48}
              priority
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600">
                Hashveli
              </span>
              <span className="text-[10px] md:text-xs text-slate-500 font-medium">
                השוואת מחירים בלחיצה
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <CategoryDropdown />
            <Link
              href="/stores"
              className="hidden sm:inline-block px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full"
            >
              🏬 חנויות
            </Link>
            <Link
              href="/blog"
              className="hidden sm:inline-block px-4 py-2 text-sm font-semibold bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full"
            >
              📚 בלוגים
            </Link>
            <Link
              href="/about"
              className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
            >
              ℹ️ אודות
            </Link>
          </div>
        </div>

        {/* Mobile-only nav */}
        <div className="sm:hidden flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
          <Link
            href="/stores"
            className="shrink-0 px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full"
          >
            🏬 חנויות
          </Link>
          <Link
            href="/blog"
            className="shrink-0 px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full"
          >
            📚 בלוגים
          </Link>
          <Link
            href="/about"
            className="shrink-0 px-3 py-1 text-xs font-semibold text-slate-600 rounded-full"
          >
            ℹ️ אודות
          </Link>
        </div>
      </div>
    </header>
  );
}
