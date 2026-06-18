/**
 * Fetches real KSP prices + product URLs via their internal API
 * (m_action/api/category/0?search=X) and writes ksp-products.json.
 *
 * KSP product URL pattern: https://ksp.co.il/web/item/<uin>
 * (verified: returns HTTP 200, real product page).
 *
 * Affiliate code is appended as ?af=F15240AX (KSP affiliate tracking).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, "..", "src", "lib", "ksp-products.json");
const KSP_AFFILIATE = "F15240AX";

const API_BASE = "https://ksp.co.il/m_action/api/category/0";
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36",
  Accept: "application/json",
  Referer: "https://ksp.co.il/web/",
};

async function searchKsp(query) {
  const url = `${API_BASE}?search=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return [];
  const json = await res.json();
  return json?.result?.items ?? [];
}

// Fetches the real selling price (min_price) from the item detail endpoint.
// Search endpoint returns the listed price - not the active sale price.
async function getRealPrice(uin) {
  try {
    const res = await fetch(`https://ksp.co.il/m_action/api/item/${uin}`, {
      headers: HEADERS,
    });
    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.result?.data;
    if (!data) return null;
    // min_price is the active sale price; price is the listed/original.
    return {
      price: Number(data.min_price) || Number(data.price) || null,
      original: Number(data.price) || null,
    };
  } catch {
    return null;
  }
}

// MOCK_PRODUCTS we want to enrich with real KSP data.
// Each entry: { id, queries } - queries tried in order until a match is found.
// IDs must EXACTLY match MOCK_PRODUCTS ids in src/lib/mock-data.ts
const TARGETS = [
  { id: "apple-airpods-pro-2", queries: ["AirPods Pro 2", "AirPods Pro USB-C"] },
  { id: "samsung-galaxy-s24-ultra", queries: ["Galaxy S24 Ultra"] },
  { id: "macbook-air-m3", queries: ["MacBook Air M3 13"] },
  { id: "iphone-15-pro", queries: ["iPhone 15 Pro 128"] },
  { id: "sony-wh1000xm5", queries: ["Sony WH-1000XM5"] },
  { id: "apple-watch-s9", queries: ["Apple Watch Series 9"] },
  { id: "airpods-pro-2-usbc", queries: ["AirPods Pro USB-C"] },
  { id: "airpods-4", queries: ["AirPods 4"] },
  { id: "apple-watch-s10", queries: ["Apple Watch Series 10"] },
  { id: "ipad-pro-m4", queries: ["iPad Pro M4 11"] },
  { id: "samsung-buds-3-pro", queries: ["Galaxy Buds 3 Pro", "Galaxy Buds3"] },
  { id: "bose-quietcomfort-ultra", queries: ["Bose QuietComfort Ultra"] },
  { id: "jbl-flip-6", queries: ["JBL Flip 6", "JBL FLIP 7"] },
  { id: "anker-soundcore-liberty-4", queries: ["Soundcore Liberty 4"] },
  { id: "logitech-mx-master-3s", queries: ["MX Master 3S"] },
  { id: "stanley-quencher-tumbler", queries: ["Stanley Quencher"] },
  { id: "ninja-air-fryer-af101", queries: ["Ninja Air Fryer AF101", "Ninja Air Fryer"] },
  { id: "kindle-paperwhite-11", queries: ["Kindle Paperwhite"] },
  { id: "dyson-v15-detect", queries: ["Dyson V15"] },
  { id: "philips-sonicare-diamondclean", queries: ["Philips Sonicare DiamondClean", "Philips Sonicare"] },
  { id: "garmin-forerunner-265", queries: ["Garmin Forerunner 265"] },
  { id: "fitbit-charge-6", queries: ["Fitbit Charge 6"] },
  { id: "gopro-hero-12", queries: ["GoPro Hero 12", "GoPro HERO12"] },
  { id: "echo-dot-5", queries: ["Echo Dot"] },
];

// Accessory/case/cover keywords - reject these matches (we want the real product)
const ACCESSORY_BLOCKLIST = [
  "מגן מסך", "מגן עורפי", "כיסוי", "ארנק", "מוט הארכה", "אקדח", "כבל",
  "מטען", "מעמד", "תיק נשיאה", "סטנד", "מקלדת", "פילם", "סוללה חיצונית",
  "case", "cover", "protector", "screen guard", "charger cable", "stand",
  "extension", "wallet", "holder", "mount", "skin", "sleeve",
];

function isAccessory(name) {
  const lower = name.toLowerCase();
  return ACCESSORY_BLOCKLIST.some((kw) => lower.includes(kw.toLowerCase()));
}

function pickBestMatch(items, query) {
  if (!items.length) return null;
  const q = query.toLowerCase();
  const queryWords = q.split(/\s+/).filter((w) => w.length >= 2);

  const scored = items
    .filter((it) => !it.outOfStock && it.price > 0)
    .filter((it) => !isAccessory(String(it.name || "")))
    .map((it) => {
      const name = String(it.name || "").toLowerCase();
      let matched = 0;
      let score = 0;
      for (const word of queryWords) {
        if (name.includes(word)) {
          matched++;
          score += word.length;
        }
      }
      return { it, score, matched };
    })
    // Require AT LEAST half of query words to match (avoids brand-only matches)
    .filter((s) => s.matched >= Math.max(2, Math.ceil(queryWords.length / 2)))
    .sort((a, b) => b.score - a.score);

  return scored[0]?.it ?? null;
}

const results = {};
let found = 0;
let missing = 0;

for (const target of TARGETS) {
  let match = null;
  for (const q of target.queries) {
    const items = await searchKsp(q);
    match = pickBestMatch(items, q);
    if (match) break;
    await new Promise((r) => setTimeout(r, 250));
  }

  if (match) {
    const real = await getRealPrice(match.uin);
    const finalPrice = real?.price ?? match.price;
    const orig = real?.original && real.original !== finalPrice ? real.original : null;
    results[target.id] = {
      uin: match.uin,
      name: match.name,
      price: finalPrice,
      originalPrice: orig,
      img: match.img,
      url: `https://ksp.co.il/web/item/${match.uin}?af=${KSP_AFFILIATE}`,
    };
    found++;
    const tag = orig ? `₪${finalPrice} (was ₪${orig})` : `₪${finalPrice}`;
    console.log(`✓ ${target.id} → ${match.uin} | ${tag} | ${match.name.slice(0, 55)}`);
    await new Promise((r) => setTimeout(r, 200));
  } else {
    missing++;
    console.log(`✗ ${target.id} (no match)`);
  }
  await new Promise((r) => setTimeout(r, 350));
}

fs.writeFileSync(OUTPUT, JSON.stringify(results, null, 2), "utf8");
console.log(`\n✅ Found ${found}/${TARGETS.length} (missing: ${missing})`);
console.log(`💾 Wrote ${OUTPUT}`);
