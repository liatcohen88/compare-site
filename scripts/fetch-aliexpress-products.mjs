/**
 * Fetches popular products from AliExpress API and outputs as TypeScript data file.
 * Run: node scripts/fetch-aliexpress-products.mjs
 *
 * Output: src/lib/generated-products.ts
 *
 * Requires env vars (or defaults from config):
 *   ALIEXPRESS_APP_KEY
 *   ALIEXPRESS_APP_SECRET
 *   ALIEXPRESS_TRACKING_ID
 *   KSP_AFFILIATE_ID
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Load .env.local manually (no dotenv dep)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const APP_KEY = process.env.ALIEXPRESS_APP_KEY || "535876";
const APP_SECRET =
  process.env.ALIEXPRESS_APP_SECRET ||
  "wErmcBZZ2y3HYUF5467dictZJAtJ3nss";
const TRACKING_ID = process.env.ALIEXPRESS_TRACKING_ID || "default";
const KSP_AFFILIATE_ID = process.env.KSP_AFFILIATE_ID || "F15240AX";

const API_URL = "https://api-sg.aliexpress.com/sync";

// AliExpress category IDs → our category slugs
const CATEGORY_MAP = [
  { aliCatId: "200000343", ourCat: "fashion", keywords: "women dress" },
  { aliCatId: "200000345", ourCat: "shoes", keywords: "women sneakers" },
  { aliCatId: "200000347", ourCat: "men-fashion", keywords: "men shirt" },
  { aliCatId: "200000762", ourCat: "lingerie", keywords: "lingerie set" },
  { aliCatId: "66", ourCat: "beauty", keywords: "makeup lipstick" },
  { aliCatId: "200001075", ourCat: "skincare", keywords: "vitamin c serum" },
  { aliCatId: "200001037", ourCat: "perfume", keywords: "perfume women" },
  { aliCatId: "200001154", ourCat: "haircare", keywords: "hair curler" },
  { aliCatId: "1509", ourCat: "jewelry", keywords: "silver earrings" },
  { aliCatId: "200000801", ourCat: "accessories", keywords: "tote bag women" },
  { aliCatId: "200000297", ourCat: "sunglasses", keywords: "sunglasses women" },
  { aliCatId: "1511", ourCat: "watches", keywords: "watch women minimalist" },
  { aliCatId: "100008827", ourCat: "phone-accessories", keywords: "iphone case" },
  { aliCatId: "509", ourCat: "smartphones", keywords: "smartphone" },
  { aliCatId: "44", ourCat: "headphones", keywords: "wireless earphones" },
  { aliCatId: "200000297", ourCat: "smartwatches", keywords: "smart watch" },
  { aliCatId: "1420", ourCat: "kitchen", keywords: "kitchen gadget" },
  { aliCatId: "1503", ourCat: "home", keywords: "home decor" },
  { aliCatId: "200002025", ourCat: "bedding", keywords: "bed sheets" },
  { aliCatId: "200000867", ourCat: "decor", keywords: "wall art" },
  { aliCatId: "200000874", ourCat: "lighting", keywords: "led lamp" },
  { aliCatId: "1430", ourCat: "garden", keywords: "garden tools" },
  { aliCatId: "1501", ourCat: "kids", keywords: "kids toys" },
  { aliCatId: "1501", ourCat: "baby", keywords: "baby product" },
  { aliCatId: "1525", ourCat: "sports", keywords: "yoga mat" },
  { aliCatId: "1503", ourCat: "outdoor", keywords: "camping" },
  { aliCatId: "1500", ourCat: "pets", keywords: "pet supplies" },
  { aliCatId: "34", ourCat: "car", keywords: "car phone holder" },
  { aliCatId: "1525", ourCat: "smart-home", keywords: "smart bulb" },
];

const PRODUCTS_PER_CATEGORY = 4;

function sign(params) {
  const sorted = Object.keys(params).sort();
  let base = "";
  for (const key of sorted) {
    base += key + params[key];
  }
  return crypto
    .createHmac("sha256", APP_SECRET)
    .update(base, "utf8")
    .digest("hex")
    .toUpperCase();
}

async function callAli(method, params) {
  const full = {
    app_key: APP_KEY,
    method,
    sign_method: "sha256",
    timestamp: Date.now().toString(),
    format: "json",
    v: "2.0",
    ...params,
  };
  full.sign = sign(full);

  const qs = new URLSearchParams(
    Object.entries(full).map(([k, v]) => [k, String(v)]),
  );
  const res = await fetch(`${API_URL}?${qs.toString()}`, { method: "GET" });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return await res.json();
}

async function fetchCategory(aliCatId, keywords, ourCat, count) {
  try {
    const result = await callAli("aliexpress.affiliate.product.query", {
      tracking_id: TRACKING_ID,
      target_currency: "ILS",
      target_language: "HE",
      ship_to_country: "IL",
      page_no: 1,
      page_size: count,
      keywords,
      min_sale_price: 30,
      sort: "LAST_VOLUME_DESC",
    });

    const products =
      result?.aliexpress_affiliate_product_query_response?.resp_result?.result
        ?.products?.product ?? [];

    if (products.length === 0 && process.env.DEBUG) {
      console.log("\n  Raw response:", JSON.stringify(result, null, 2).slice(0, 500));
    }
    return products.slice(0, count);
  } catch (err) {
    console.error(`  ❌ ${ourCat}: ${err.message}`);
    return [];
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w֐-׿\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function kspSearchLink(query) {
  return `https://ksp.co.il/item/${KSP_AFFILIATE_ID}?search=${encodeURIComponent(query)}`;
}

function amazonSearchLink(query) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=hashveli-20`;
}

function sheinSearchLink(query) {
  return `https://shein.com/pdsearch/${encodeURIComponent(query)}?ref=hashveli`;
}

function convertProduct(ali, ourCat) {
  const title = ali.product_title?.slice(0, 100) || "מוצר";
  const slug = `${slugify(title)}-${ali.product_id}`;
  const salePrice = parseFloat(ali.target_sale_price || ali.sale_price || "0");
  const originalPrice = parseFloat(
    ali.target_original_price || ali.original_price || `${salePrice * 1.3}`,
  );

  // KSP estimated price: usually 2-4x AliExpress for tech, 3-5x for fashion/beauty
  const isElectronics = ["smartphones", "laptops", "headphones", "smartwatches", "gaming"].includes(
    ourCat,
  );
  const kspMultiplier = isElectronics ? 2.2 : 3.5;
  const amazonMultiplier = isElectronics ? 1.4 : 2.0;
  const sheinMultiplier = 1.5;

  const offers = [
    {
      vendor: "aliexpress",
      price: Math.round(salePrice),
      shippingPrice: 0,
      inStock: true,
      url: ali.promotion_link || `https://aliexpress.com/item/${ali.product_id}.html?aff=${TRACKING_ID}`,
      lastUpdated: "2026-06-08T00:00:00Z",
    },
  ];

  // Add KSP for relevant categories
  if (
    !["lingerie", "swimwear", "perfume"].includes(ourCat) ||
    isElectronics
  ) {
    offers.push({
      vendor: "ksp",
      price: Math.round(salePrice * kspMultiplier),
      shippingPrice: 0,
      inStock: true,
      url: kspSearchLink(title),
      lastUpdated: "2026-06-08T00:00:00Z",
    });
  }

  // Amazon for everything
  offers.push({
    vendor: "amazon",
    price: Math.round(salePrice * amazonMultiplier),
    shippingPrice: 40,
    inStock: true,
    url: amazonSearchLink(title),
    lastUpdated: "2026-06-08T00:00:00Z",
  });

  // Shein for fashion/beauty
  if (
    [
      "fashion",
      "shoes",
      "men-fashion",
      "kids-fashion",
      "swimwear",
      "lingerie",
      "accessories",
      "beauty",
      "haircare",
      "skincare",
      "jewelry",
      "sunglasses",
    ].includes(ourCat)
  ) {
    offers.push({
      vendor: "shein",
      price: Math.round(salePrice * sheinMultiplier),
      shippingPrice: 25,
      inStock: true,
      url: sheinSearchLink(title),
      lastUpdated: "2026-06-08T00:00:00Z",
    });
  }

  return {
    id: String(ali.product_id),
    slug,
    title,
    description:
      `${title}. מוצר איכותי בעל ביקוש גבוה. מחיר אטרקטיבי במיוחד מאליאקספרס.`.slice(
        0,
        250,
      ),
    category: ourCat,
    brand: ali.shop_url ? extractBrand(ali) : "Generic",
    imageUrl: ali.product_main_image_url || "",
    specs: {},
    offers,
    rating: parseFloat(ali.evaluate_rate || "4.5"),
    reviewCount: parseInt(ali.lastest_volume || "1000", 10),
    createdAt: "2026-06-08T00:00:00Z",
  };
}

function extractBrand(ali) {
  if (ali.first_level_category_name) {
    const m = ali.product_title?.match(/^([A-Z][a-zA-Z]+)\s/);
    if (m) return m[1];
  }
  return "Generic";
}

async function main() {
  console.log("🚀 Fetching products from AliExpress API...\n");
  const allProducts = [];
  const seenIds = new Set();

  for (const { aliCatId, ourCat, keywords } of CATEGORY_MAP) {
    process.stdout.write(`📦 ${ourCat.padEnd(20)}... `);
    const products = await fetchCategory(aliCatId, keywords, ourCat, PRODUCTS_PER_CATEGORY);
    let added = 0;
    for (const p of products) {
      if (seenIds.has(p.product_id)) continue;
      seenIds.add(p.product_id);
      try {
        allProducts.push(convertProduct(p, ourCat));
        added++;
      } catch (err) {
        console.error(`  ⚠️ skip: ${err.message}`);
      }
    }
    console.log(`✓ ${added} products`);
    // Rate limit
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n✅ Total: ${allProducts.length} products fetched\n`);

  if (allProducts.length === 0) {
    console.error("❌ No products fetched - check API credentials");
    process.exit(1);
  }

  // Write to file
  const outPath = path.join(__dirname, "..", "src", "lib", "generated-products.ts");
  const ts = `// Auto-generated from AliExpress API
// Generated: 2026-06-08
// Run: node scripts/fetch-aliexpress-products.mjs

import type { Product } from "./types";

export const GENERATED_PRODUCTS: Product[] = ${JSON.stringify(allProducts, null, 2)};
`;
  fs.writeFileSync(outPath, ts, "utf8");
  console.log(`💾 Written: ${outPath}`);
  console.log(`   (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)\n`);
  console.log("🎉 Done! Update src/lib/mock-data.ts to import GENERATED_PRODUCTS");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err);
  process.exit(1);
});
