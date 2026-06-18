"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  slug?: string;
  brand?: string;
}

const CATEGORY_INFO: Record<string, { emoji: string; gradient: [string, string] }> = {
  fashion: { emoji: "👗", gradient: ["#ec4899", "#be185d"] },
  lingerie: { emoji: "👙", gradient: ["#f9a8d4", "#db2777"] },
  shoes: { emoji: "👠", gradient: ["#fb7185", "#e11d48"] },
  "men-fashion": { emoji: "👔", gradient: ["#1e3a8a", "#1e40af"] },
  "kids-fashion": { emoji: "👶", gradient: ["#fde68a", "#f59e0b"] },
  swimwear: { emoji: "🩱", gradient: ["#22d3ee", "#0891b2"] },
  beauty: { emoji: "💄", gradient: ["#f472b6", "#db2777"] },
  haircare: { emoji: "💇‍♀️", gradient: ["#a78bfa", "#7c3aed"] },
  perfume: { emoji: "🌸", gradient: ["#fbcfe8", "#ec4899"] },
  skincare: { emoji: "✨", gradient: ["#fef3c7", "#f59e0b"] },
  jewelry: { emoji: "💍", gradient: ["#fde68a", "#d97706"] },
  accessories: { emoji: "👜", gradient: ["#c4b5fd", "#7c3aed"] },
  sunglasses: { emoji: "🕶️", gradient: ["#1f2937", "#111827"] },
  watches: { emoji: "⌚", gradient: ["#9ca3af", "#4b5563"] },
  home: { emoji: "🏠", gradient: ["#fed7aa", "#ea580c"] },
  kitchen: { emoji: "🍳", gradient: ["#fde68a", "#d97706"] },
  bedding: { emoji: "🛏️", gradient: ["#c7d2fe", "#4338ca"] },
  decor: { emoji: "🖼️", gradient: ["#fecaca", "#dc2626"] },
  lighting: { emoji: "💡", gradient: ["#fef08a", "#ca8a04"] },
  garden: { emoji: "🪴", gradient: ["#86efac", "#16a34a"] },
  kids: { emoji: "🧸", gradient: ["#fcd34d", "#d97706"] },
  baby: { emoji: "🍼", gradient: ["#bae6fd", "#0284c7"] },
  school: { emoji: "🎒", gradient: ["#fde047", "#ca8a04"] },
  sports: { emoji: "🏋️", gradient: ["#4ade80", "#16a34a"] },
  outdoor: { emoji: "⛺", gradient: ["#86efac", "#15803d"] },
  pets: { emoji: "🐶", gradient: ["#fbbf24", "#d97706"] },
  books: { emoji: "📚", gradient: ["#fdba74", "#c2410c"] },
  smartphones: { emoji: "📱", gradient: ["#60a5fa", "#1d4ed8"] },
  laptops: { emoji: "💻", gradient: ["#94a3b8", "#334155"] },
  headphones: { emoji: "🎧", gradient: ["#a78bfa", "#6d28d9"] },
  smartwatches: { emoji: "⌚", gradient: ["#fb7185", "#be123c"] },
  "phone-accessories": { emoji: "📱", gradient: ["#7dd3fc", "#0369a1"] },
  gaming: { emoji: "🎮", gradient: ["#a855f7", "#6b21a8"] },
  "smart-home": { emoji: "🤖", gradient: ["#67e8f9", "#0891b2"] },
  car: { emoji: "🚗", gradient: ["#f87171", "#b91c1c"] },
  tools: { emoji: "🔧", gradient: ["#fbbf24", "#92400e"] },
  office: { emoji: "📎", gradient: ["#cbd5e1", "#475569"] },
};

const DEFAULT = { emoji: "🛍️", gradient: ["#93c5fd", "#1d4ed8"] as [string, string] };

/**
 * Use images.weserv.nl as a free CDN/proxy.
 * This bypasses hotlinking restrictions on AliExpress, Amazon, etc.
 * by fetching server-side and re-serving the image.
 */
function proxyImage(src: string): string {
  // Strip the protocol since weserv expects "domain.com/path"
  const clean = src.replace(/^https?:\/\//, "");
  return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}&w=600&h=600&fit=cover&output=webp&q=85`;
}

function BrandedPlaceholder({
  category,
  brand,
  className,
}: {
  category?: string;
  brand?: string;
  className?: string;
}) {
  const info = (category && CATEGORY_INFO[category]) || DEFAULT;
  const [from, to] = info.gradient;

  return (
    <div
      className={`${className ?? ""} relative flex items-center justify-center overflow-hidden`}
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
      role="img"
      aria-label={brand || "product"}
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full" />
      <span className="text-7xl md:text-8xl drop-shadow-lg relative z-10" aria-hidden="true">
        {info.emoji}
      </span>
      {brand && brand !== "Generic" && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {brand}
        </div>
      )}
    </div>
  );
}

export default function ProductImage({
  src,
  alt,
  className,
  category,
  brand,
}: Props) {
  // Try proxy first → direct URL → placeholder
  const [stage, setStage] = useState<"proxy" | "direct" | "fail">(
    !src || src === "" ? "fail" : "proxy",
  );

  if (stage === "fail" || !src) {
    return <BrandedPlaceholder category={category} brand={brand} className={className} />;
  }

  const finalSrc = stage === "proxy" ? proxyImage(src) : src;

  const handleError = () => {
    if (stage === "proxy") setStage("direct");
    else setStage("fail");
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth < 50 || img.naturalHeight < 50) handleError();
  };

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
      onLoad={handleLoad}
      referrerPolicy="no-referrer"
    />
  );
}
