"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  slug?: string;
}

const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  fashion: "👗",
  lingerie: "👙",
  shoes: "👠",
  "men-fashion": "👔",
  "kids-fashion": "👶",
  swimwear: "🩱",
  beauty: "💄",
  haircare: "💇‍♀️",
  perfume: "🌸",
  skincare: "✨",
  jewelry: "💍",
  accessories: "👜",
  sunglasses: "🕶️",
  watches: "⌚",
  home: "🏠",
  kitchen: "🍳",
  bedding: "🛏️",
  decor: "🖼️",
  lighting: "💡",
  garden: "🪴",
  kids: "🧸",
  baby: "🍼",
  school: "🎒",
  sports: "🏋️",
  outdoor: "⛺",
  pets: "🐶",
  books: "📚",
  smartphones: "📲",
  laptops: "💻",
  headphones: "🎧",
  smartwatches: "⌚",
  "phone-accessories": "📱",
  gaming: "🎮",
  "smart-home": "🤖",
  car: "🚗",
  tools: "🔧",
  office: "📎",
};

// Real stock image for each category using Picsum with consistent seed
function getCategoryStockImage(category: string, seed: string): string {
  // Use picsum.photos which returns real photos (random but stable per seed)
  return `https://picsum.photos/seed/${encodeURIComponent(category + "-" + seed)}/600/600`;
}

export default function ProductImage({ src, alt, className, category, slug }: Props) {
  const [errorLevel, setErrorLevel] = useState(0);
  const emoji = category ? CATEGORY_PLACEHOLDERS[category] : "🛍️";

  // Level 0: original src (if valid)
  // Level 1: Picsum fallback (real photo, stable)
  // Level 2: emoji only (last resort)

  const initialSrc = !src || src === "" ? null : src;

  if (errorLevel >= 2 || (errorLevel === 0 && !initialSrc)) {
    if (initialSrc === null && category) {
      // No source - go directly to picsum
      return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={getCategoryStockImage(category, slug || alt)}
          alt={alt}
          className={className}
          loading="lazy"
          onError={() => setErrorLevel(2)}
        />
      );
    }
    return (
      <div
        className={`${className ?? ""} bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center`}
      >
        <span className="text-6xl opacity-60">{emoji}</span>
      </div>
    );
  }

  const currentSrc =
    errorLevel === 0
      ? initialSrc
      : getCategoryStockImage(category || "product", slug || alt);

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={currentSrc!}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setErrorLevel((l) => l + 1)}
      referrerPolicy="no-referrer"
    />
  );
}
