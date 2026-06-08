/**
 * Public stats endpoint - returns daily site stats.
 * Called by external WhatsApp reporter (aliexpress-deals-bot).
 *
 * Protected by simple token to prevent abuse.
 * Token header: x-stats-token
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/mock-data";
import { CATEGORIES, VENDORS } from "@/lib/config";

const STATS_TOKEN = process.env.STATS_TOKEN || "default-token-change-me";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-stats-token");
  if (token !== STATS_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = getAllProducts();
  const totalOffers = products.reduce((s, p) => s + p.offers.length, 0);

  const byVendor: Record<string, number> = { ksp: 0, amazon: 0, aliexpress: 0, shein: 0 };
  for (const p of products) {
    for (const o of p.offers) {
      if (o.inStock) byVendor[o.vendor]++;
    }
  }

  // TODO: Add Vercel Analytics API integration here for real visitor data
  // For now, return internal stats only
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString("he-IL"),
    products: {
      total: products.length,
      offers: totalOffers,
      byVendor,
    },
    categories: CATEGORIES.length,
    visitors: {
      // TODO: fetch from Vercel Analytics API
      today: null,
      yesterday: null,
      thisWeek: null,
    },
    affiliate: {
      // TODO: fetch from each affiliate dashboard via API
      clicks: { ksp: null, aliexpress: null, amazon: null, shein: null },
      conversions: { ksp: null, aliexpress: null, amazon: null, shein: null },
    },
    vendors: Object.values(VENDORS).map((v) => ({
      id: v.id,
      name: v.name,
      flag: v.countryFlag,
    })),
  });
}
