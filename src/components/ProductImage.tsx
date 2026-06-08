"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  category?: string;
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

export default function ProductImage({ src, alt, className, category }: Props) {
  const [hasError, setHasError] = useState(!src || src === "");
  const emoji = category ? CATEGORY_PLACEHOLDERS[category] : null;

  if (hasError || !src) {
    return (
      <div
        className={`${className ?? ""} bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center`}
      >
        <span className="text-6xl opacity-60">{emoji ?? "🛍️"}</span>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
    />
  );
}
