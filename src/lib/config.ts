export const SITE_NAME = "השוואת מחירים";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://compare-site.local";

export const KSP_AFFILIATE_ID = process.env.KSP_AFFILIATE_ID ?? "F15240AX";

export const VENDORS = {
  ksp: {
    id: "ksp" as const,
    name: "KSP",
    nameEn: "KSP",
    logo: "/vendors/ksp.svg",
    shippingDays: "1-3",
    countryFlag: "🇮🇱",
    color: "#003a80",
  },
  amazon: {
    id: "amazon" as const,
    name: "אמזון",
    nameEn: "Amazon",
    logo: "/vendors/amazon.svg",
    shippingDays: "7-14",
    countryFlag: "🇺🇸",
    color: "#ff9900",
  },
  aliexpress: {
    id: "aliexpress" as const,
    name: "אליאקספרס",
    nameEn: "AliExpress",
    logo: "/vendors/aliexpress.svg",
    shippingDays: "14-30",
    countryFlag: "🇨🇳",
    color: "#e62e04",
  },
  shein: {
    id: "shein" as const,
    name: "שיין",
    nameEn: "Shein",
    logo: "/vendors/shein.svg",
    shippingDays: "10-21",
    countryFlag: "🇨🇳",
    color: "#000000",
  },
} as const;

export type VendorId = keyof typeof VENDORS;

export const CATEGORIES = [
  // נשים
  { slug: "fashion", name: "אופנת נשים", icon: "👗", group: "אופנה" },
  { slug: "lingerie", name: "הלבשה תחתונה", icon: "👙", group: "אופנה" },
  { slug: "shoes", name: "נעליים", icon: "👠", group: "אופנה" },
  { slug: "men-fashion", name: "אופנת גברים", icon: "👔", group: "אופנה" },
  { slug: "kids-fashion", name: "אופנת ילדים", icon: "👶", group: "אופנה" },
  { slug: "swimwear", name: "בגדי ים", icon: "👗", group: "אופנה" },

  // יופי
  { slug: "beauty", name: "יופי וטיפוח", icon: "💄", group: "יופי" },
  { slug: "haircare", name: "שיער וציפורניים", icon: "💇‍♀️", group: "יופי" },
  { slug: "perfume", name: "בשמים", icon: "🌸", group: "יופי" },
  { slug: "skincare", name: "טיפוח עור", icon: "✨", group: "יופי" },

  // אקססוריז
  { slug: "jewelry", name: "תכשיטים", icon: "💍", group: "אקססוריז" },
  { slug: "accessories", name: "תיקים וארנקים", icon: "👜", group: "אקססוריז" },
  { slug: "sunglasses", name: "משקפי שמש", icon: "🕶️", group: "אקססוריז" },
  { slug: "watches", name: "שעונים", icon: "⌚", group: "אקססוריז" },

  // בית וסביבה
  { slug: "home", name: "מוצרי בית", icon: "🏠", group: "בית" },
  { slug: "kitchen", name: "מטבח", icon: "🍳", group: "בית" },
  { slug: "bedding", name: "מצעים וסדינים", icon: "🛏️", group: "בית" },
  { slug: "decor", name: "עיצוב הבית", icon: "🖼️", group: "בית" },
  { slug: "lighting", name: "תאורה", icon: "💡", group: "בית" },
  { slug: "garden", name: "גינה וחצר", icon: "🪴", group: "בית" },

  // ילדים ותינוקות
  { slug: "kids", name: "צעצועים", icon: "🧸", group: "ילדים" },
  { slug: "baby", name: "תינוקות", icon: "🍼", group: "ילדים" },
  { slug: "school", name: "ציוד לבית הספר", icon: "🎒", group: "ילדים" },

  // ספורט ופנאי
  { slug: "sports", name: "ספורט וכושר", icon: "🏋️", group: "פנאי" },
  { slug: "outdoor", name: "קמפינג וטיולים", icon: "⛺", group: "פנאי" },
  { slug: "pets", name: "חיות מחמד", icon: "🐶", group: "פנאי" },
  { slug: "books", name: "ספרים", icon: "📚", group: "פנאי" },

  // טכנולוגיה
  { slug: "smartphones", name: "סמארטפונים", icon: "📲", group: "טכנולוגיה" },
  { slug: "laptops", name: "מחשבים ניידים", icon: "💻", group: "טכנולוגיה" },
  { slug: "headphones", name: "אוזניות", icon: "🎧", group: "טכנולוגיה" },
  { slug: "smartwatches", name: "שעונים חכמים", icon: "⌚", group: "טכנולוגיה" },
  { slug: "phone-accessories", name: "אקססוריז לפלאפון", icon: "📱", group: "טכנולוגיה" },
  { slug: "gaming", name: "גיימינג", icon: "🎮", group: "טכנולוגיה" },
  { slug: "smart-home", name: "בית חכם", icon: "🤖", group: "טכנולוגיה" },

  // רכב ועבודה
  { slug: "car", name: "אביזרי רכב", icon: "🚗", group: "אחר" },
  { slug: "tools", name: "כלי עבודה", icon: "🔧", group: "אחר" },
  { slug: "office", name: "ציוד משרדי", icon: "📎", group: "אחר" },
] as const;

export const CATEGORY_GROUPS = [
  "אופנה",
  "יופי",
  "אקססוריז",
  "בית",
  "ילדים",
  "פנאי",
  "טכנולוגיה",
  "אחר",
] as const;

// 10 קטגוריות בולטות לדף הבית - לא להעמיס
export const POPULAR_CATEGORIES = [
  "fashion",
  "beauty",
  "jewelry",
  "haircare",
  "accessories",
  "kitchen",
  "kids",
  "smartphones",
  "headphones",
  "smart-home",
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
