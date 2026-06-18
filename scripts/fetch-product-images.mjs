/**
 * Fetches real product images from AliExpress API for products that have empty imageUrl.
 * Searches by product title (English) and uses the first result's image.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
const API_URL = "https://api-sg.aliexpress.com/sync";

function sign(params) {
  const sorted = Object.keys(params).sort();
  let base = "";
  for (const key of sorted) base += key + params[key];
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
  const res = await fetch(`${API_URL}?${qs.toString()}`);
  if (!res.ok) throw new Error(`${res.status}`);
  return await res.json();
}

async function findImageForProduct(title) {
  try {
    const result = await callAli("aliexpress.affiliate.product.query", {
      tracking_id: TRACKING_ID,
      keywords: title,
      page_no: 1,
      page_size: 3,
      sort: "LAST_VOLUME_DESC",
    });
    const products =
      result?.aliexpress_affiliate_product_query_response?.resp_result?.result
        ?.products?.product ?? [];
    return products[0]?.product_main_image_url || null;
  } catch {
    return null;
  }
}

// Parse mock-data.ts to find products with empty imageUrl
const FILE = path.join(__dirname, "..", "src", "lib", "mock-data.ts");
let content = fs.readFileSync(FILE, "utf8");

// Match product objects with their title (titleEn optional) + imageUrl
const productPattern = /title:\s*(['"`])([^'"`]+)\1[\s\S]{0,500}?imageUrl:\s*"([^"]*)"/g;

const HE_TO_EN = {
  "אוזניות": "headphones",
  "סמארטפון": "smartphone",
  "לפטופ": "laptop",
  "טלוויזיה": "tv",
  "שעון": "watch",
  "מצלמה": "camera",
  "תיק": "bag",
  "נעליים": "shoes",
  "שמלה": "dress",
  "חולצה": "shirt",
  "מכנסיים": "pants",
  "בושם": "perfume",
  "שפתון": "lipstick matte set",
  "מראת איפור": "led vanity mirror makeup",
  "עגילי": "silver earrings 925",
  "סיר טיגון אוויר": "air fryer 5l digital",
  "בייבי מוניטור": "baby monitor wifi 1080p camera",
  "שעון יד מינימליסטי": "minimalist women watch mesh strap",
};

function translateTitle(title) {
  for (const [he, en] of Object.entries(HE_TO_EN)) {
    if (title.includes(he)) return en;
  }
  return title;
}

const updates = [];
let m;
while ((m = productPattern.exec(content)) !== null) {
  const [full, , title, currentUrl] = m;
  if (currentUrl === "") {
    const titleEn = /[֐-׿]/.test(title) ? translateTitle(title) : title;
    updates.push({ title, titleEn, fullMatch: full });
  }
}

console.log(`🔍 Found ${updates.length} products without images\n`);

let updated = 0;
let failed = 0;

for (let i = 0; i < updates.length; i++) {
  const u = updates[i];
  process.stdout.write(`[${i + 1}/${updates.length}] ${u.titleEn.slice(0, 50)}... `);
  const img = await findImageForProduct(u.titleEn);
  if (img) {
    const newMatch = u.fullMatch.replace(/imageUrl:\s*""/, `imageUrl: "${img}"`);
    content = content.split(u.fullMatch).join(newMatch);
    updated++;
    console.log("✓");
  } else {
    failed++;
    console.log("❌");
  }
  await new Promise((r) => setTimeout(r, 400));
}

if (updated > 0) {
  fs.writeFileSync(FILE, content, "utf8");
  console.log(`\n💾 Updated ${updated} products`);
}
console.log(`✅ Done: ${updated} updated, ${failed} failed`);
