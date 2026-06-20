/**
 * Fetches active AliExpress promotional campaigns + products in each.
 * Uses the affiliate API endpoints:
 *  - aliexpress.affiliate.featuredpromo.get  (list of active campaigns)
 *  - aliexpress.affiliate.featuredpromo.products.get (products per campaign)
 *
 * Writes src/lib/aliexpress-promos.json:
 *  { generatedAt, campaigns: [{ name, label, products: [...] }] }
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
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET;
const TRACKING_ID = process.env.ALIEXPRESS_TRACKING_ID || "default";

if (!APP_SECRET) {
  console.error("Missing ALIEXPRESS_APP_SECRET");
  process.exit(1);
}

function sign(params) {
  const sorted = Object.keys(params).sort();
  let base = "";
  for (const k of sorted) base += k + params[k];
  return crypto.createHmac("sha256", APP_SECRET).update(base, "utf8").digest("hex").toUpperCase();
}

async function call(method, biz) {
  const p = {
    app_key: APP_KEY,
    method,
    sign_method: "sha256",
    timestamp: Date.now().toString(),
    format: "json",
    v: "2.0",
    ...biz,
  };
  p.sign = sign(p);
  const qs = new URLSearchParams(Object.entries(p).map(([k, v]) => [k, String(v)]));
  const res = await fetch(`https://api-sg.aliexpress.com/sync?${qs}`);
  return await res.json();
}

// Curated campaign selection - English title for users + the API promo_name
const TARGET_CAMPAIGNS = [
  { match: /Mid-Year Sale.*Bestsellers/i, label: "🔥 רבי-מכר של ה-Mid-Year Sale" },
  { match: /Mid-Year Sale.*Big Save/i, label: "💰 חיסכון ענק - Mid-Year Sale" },
  { match: /Mid-Year Sale.*Top Brands/i, label: "⭐ מותגי-על במבצע" },
  { match: /Choice/i, label: "🏆 AliExpress Choice - איכות מובטחת" },
];

async function main() {
  console.log("🔍 Fetching active campaigns...");
  const r = await call("aliexpress.affiliate.featuredpromo.get", {});
  const promos = r?.aliexpress_affiliate_featuredpromo_get_response?.resp_result?.result?.promos?.promo ?? [];
  console.log(`  → ${promos.length} active campaigns total`);

  const picked = [];
  for (const target of TARGET_CAMPAIGNS) {
    const found = promos.find((p) => target.match.test(p.promo_name));
    if (found) picked.push({ promo_name: found.promo_name, label: target.label, product_num: found.product_num });
  }
  console.log(`  → Picked ${picked.length} for the site:`);
  for (const p of picked) console.log(`     - ${p.promo_name} (${p.product_num} products)`);

  const campaigns = [];
  for (const camp of picked) {
    console.log(`\n📦 Loading "${camp.promo_name}"...`);
    try {
      const res = await call("aliexpress.affiliate.featuredpromo.products.get", {
        promotion_name: camp.promo_name,
        page_no: 1,
        page_size: 20,
        target_currency: "ILS",
        target_language: "EN",
        ship_to_country: "IL",
        tracking_id: TRACKING_ID,
        fields:
          "product_id,product_title,product_main_image_url,target_sale_price,target_original_price,discount,promotion_link,evaluate_rate,lastest_volume",
      });
      const arr = res?.aliexpress_affiliate_featuredpromo_products_get_response?.resp_result?.result?.products?.product ?? [];
      console.log(`   → ${arr.length} products`);
      const products = arr
        .filter((p) => p.target_sale_price && p.target_original_price)
        .map((p) => ({
          id: String(p.product_id),
          title: p.product_title,
          image: p.product_main_image_url,
          salePrice: Number(p.target_sale_price),
          originalPrice: Number(p.target_original_price),
          discount: p.discount,
          url: p.promotion_link,
          rating: p.evaluate_rate,
          orders: p.lastest_volume,
        }));
      campaigns.push({ name: camp.promo_name, label: camp.label, products });
    } catch (e) {
      console.log(`   ✗ Failed: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 400));
  }

  const out = {
    generatedAt: new Date().toISOString().slice(0, 10),
    campaigns,
  };
  const outPath = path.join(__dirname, "..", "src", "lib", "aliexpress-promos.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
  console.log(`\n✅ Wrote ${outPath} — ${campaigns.reduce((s, c) => s + c.products.length, 0)} products in ${campaigns.length} campaigns`);
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
