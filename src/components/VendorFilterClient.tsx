"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/types";
import { VENDORS, type VendorId, CATEGORIES } from "@/lib/config";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const VENDOR_IDS: VendorId[] = ["ksp", "amazon", "aliexpress", "shein"];

const PRICE_RANGES = [
  { id: "all", label: "כל המחירים", min: 0, max: Infinity },
  { id: "lt100", label: "עד ₪100", min: 0, max: 100 },
  { id: "100-500", label: "₪100-500", min: 100, max: 500 },
  { id: "500-1500", label: "₪500-1,500", min: 500, max: 1500 },
  { id: "1500-5000", label: "₪1,500-5,000", min: 1500, max: 5000 },
  { id: "gt5000", label: "מעל ₪5,000", min: 5000, max: Infinity },
] as const;

const SORT_OPTIONS = [
  { id: "popular", label: "🔥 פופולריים" },
  { id: "cheap", label: "💰 הזול ביותר" },
  { id: "expensive", label: "💎 היקר ביותר" },
  { id: "discount", label: "🎯 חיסכון הכי גבוה" },
  { id: "rating", label: "⭐ הכי מדורגים" },
] as const;

function cheapestPrice(p: Product): number {
  const inStock = p.offers.filter((o) => o.inStock);
  if (inStock.length === 0) return Infinity;
  return Math.min(...inStock.map((o) => o.price + o.shippingPrice));
}

function highestPrice(p: Product): number {
  const inStock = p.offers.filter((o) => o.inStock);
  if (inStock.length === 0) return 0;
  return Math.max(...inStock.map((o) => o.price + o.shippingPrice));
}

function discountPercent(p: Product): number {
  const cheap = cheapestPrice(p);
  const high = highestPrice(p);
  if (high === 0 || !isFinite(cheap)) return 0;
  return Math.round(((high - cheap) / high) * 100);
}

export default function VendorFilterClient({ products }: Props) {
  const [selectedVendors, setSelectedVendors] = useState<Set<VendorId>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sort, setSort] = useState<string>("popular");
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = products;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.titleEn?.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Vendor
    if (selectedVendors.size > 0) {
      result = result.filter((p) =>
        p.offers.some((o) => o.inStock && selectedVendors.has(o.vendor)),
      );
    }

    // Price
    const range = PRICE_RANGES.find((r) => r.id === priceRange);
    if (range && range.id !== "all") {
      result = result.filter((p) => {
        const price = cheapestPrice(p);
        return price >= range.min && price <= range.max;
      });
    }

    // Sort
    const sorted = [...result];
    if (sort === "cheap") sorted.sort((a, b) => cheapestPrice(a) - cheapestPrice(b));
    else if (sort === "expensive") sorted.sort((a, b) => cheapestPrice(b) - cheapestPrice(a));
    else if (sort === "discount") sorted.sort((a, b) => discountPercent(b) - discountPercent(a));
    else if (sort === "rating") sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    return sorted;
  }, [products, search, selectedCategory, selectedVendors, priceRange, sort]);

  const counts = useMemo(() => {
    const c: Record<VendorId, number> = { ksp: 0, amazon: 0, aliexpress: 0, shein: 0 };
    for (const p of products) {
      for (const o of p.offers) {
        if (o.inStock) c[o.vendor]++;
      }
    }
    return c;
  }, [products]);

  const toggleVendor = (vendor: VendorId) => {
    setSelectedVendors((prev) => {
      const next = new Set(prev);
      if (next.has(vendor)) next.delete(vendor);
      else next.add(vendor);
      return next;
    });
  };

  const clearAll = () => {
    setSelectedVendors(new Set());
    setSelectedCategory("");
    setPriceRange("all");
    setSearch("");
    setSort("popular");
  };

  const hasActiveFilters =
    selectedVendors.size > 0 ||
    selectedCategory !== "" ||
    priceRange !== "all" ||
    search.trim() !== "";

  return (
    <>
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חפש מוצר... (לדוגמה: airpods, שמלה, אייפון)"
            className="w-full px-12 py-4 text-base border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none bg-white shadow-sm"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
            🔍
          </span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-2xl"
              aria-label="נקה חיפוש"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Filters - Collapsible */}
      <div className="mb-6 bg-slate-50 rounded-2xl overflow-hidden">
        {/* Header toggle */}
        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-100"
          aria-expanded={filtersOpen}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🎛️</span>
            <span className="font-bold text-slate-900">סינון</span>
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                פעיל
              </span>
            )}
            <span className="text-sm text-slate-500">
              · מציג <strong>{filtered.length}</strong> מתוך {products.length}
            </span>
          </div>
          <svg
            className={`w-5 h-5 text-slate-600 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Body */}
        {filtersOpen && (
          <div className="p-4 pt-2 space-y-4 border-t border-slate-200">
            {/* Sort */}
            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">מיון לפי:</div>
              <div className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSort(opt.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      sort === opt.id
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">טווח מחירים:</div>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setPriceRange(range.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      priceRange === range.id
                        ? "bg-green-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-green-300"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vendor Filter */}
            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">חנות:</div>
              <div className="flex flex-wrap gap-2">
                {VENDOR_IDS.map((id) => {
                  const v = VENDORS[id];
                  const active = selectedVendors.has(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleVendor(id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-sm font-medium ${
                        active
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.logo} alt="" className="w-4 h-4 rounded-sm" />
                      <span>{v.name}</span>
                      <span className={`text-xs ${active ? "text-blue-100" : "text-slate-400"}`}>
                        ({counts[id]})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">קטגוריה:</div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-auto px-4 py-2 rounded-xl border-2 border-slate-200 bg-white text-slate-700 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">כל הקטגוריות</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <div className="flex justify-end border-t border-slate-200 pt-3">
                <button
                  onClick={clearAll}
                  className="text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  ✕ נקה את כל הסינונים
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-slate-600">לא נמצאו מוצרים שמתאימים לסינון</p>
          <button
            onClick={clearAll}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            נקה סינונים
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
