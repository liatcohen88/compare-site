/**
 * Daily report cron job - runs every day at 23:00 Israel time (20:00 UTC summer / 21:00 UTC winter)
 *
 * Setup required:
 * 1. Set RESEND_API_KEY in Vercel env vars (sign up at resend.com - free)
 * 2. Set ADMIN_EMAIL to your email
 * 3. Set CRON_SECRET (random string) in Vercel env vars
 * 4. Verify domain at resend.com or use their default sender
 *
 * Tests locally:
 *   curl -H "Authorization: Bearer YOUR_CRON_SECRET" http://localhost:3000/api/cron/daily-report
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/mock-data";
import { CATEGORIES } from "@/lib/config";

const CRON_SECRET = process.env.CRON_SECRET;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "motiva8891@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "motiva8891@gmail.com";

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel cron sends this automatically)
  const authHeader = req.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = getAllProducts();
  const today = new Date().toLocaleDateString("he-IL", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // TODO: Fetch real analytics from Vercel Analytics API + KSP/AliExpress affiliate APIs
  // For now: send a basic stats email
  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; }
    .card { background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    h1 { color: #0f172a; font-size: 24px; margin: 0 0 8px; }
    h2 { color: #0f172a; font-size: 18px; margin: 0 0 12px; }
    .stat { display: inline-block; background: #f1f5f9; padding: 12px 16px; border-radius: 8px; margin: 4px; }
    .stat-value { font-size: 24px; font-weight: bold; color: #0066ff; }
    .stat-label { font-size: 12px; color: #64748b; }
    a { color: #0066ff; }
    .footer { font-size: 12px; color: #94a3b8; text-align: center; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>📊 דוח יומי - השווה לי</h1>
    <p style="color: #64748b; margin: 0;">${today}</p>
  </div>

  <div class="card">
    <h2>🏪 מצב האתר</h2>
    <div class="stat">
      <div class="stat-value">${products.length}</div>
      <div class="stat-label">מוצרים פעילים</div>
    </div>
    <div class="stat">
      <div class="stat-value">${CATEGORIES.length}</div>
      <div class="stat-label">קטגוריות</div>
    </div>
    <div class="stat">
      <div class="stat-value">${products.reduce((s, p) => s + p.offers.length, 0)}</div>
      <div class="stat-label">הצעות מחיר</div>
    </div>
  </div>

  <div class="card">
    <h2>📈 תנועה (Google Analytics)</h2>
    <p style="color: #64748b;">לראיית נתוני תנועה מפורטים:</p>
    <p>
      <a href="https://analytics.google.com">→ Google Analytics</a><br>
      <a href="https://vercel.com/motiva8891-4777s-projects/compare-site/analytics">→ Vercel Analytics</a>
    </p>
    <p style="font-size: 12px; color: #94a3b8;">
      (אינטגרציה אוטומטית עם GA API תוסף בעדכון הבא)
    </p>
  </div>

  <div class="card">
    <h2>💰 הכנסות מאפיליאט</h2>
    <p>בדקי דשבורדים של כל פלטפורמה:</p>
    <ul>
      <li><a href="https://ksp.co.il/af/">KSP</a></li>
      <li><a href="https://portals.aliexpress.com/">AliExpress</a></li>
      <li><a href="https://affiliate-program.amazon.com/home/account/payee">Amazon Associates</a></li>
    </ul>
  </div>

  <div class="card">
    <h2>🎯 פעולות מומלצות</h2>
    <ul>
      <li>פתחי <a href="https://hashveli.co.il/admin">פאנל ניהול</a> לסקירה מלאה</li>
      <li>בדקי את <a href="https://search.google.com/search-console">Google Search Console</a> לחיפושים שמובילים אלייך</li>
      <li>שתפי את האתר ברשתות חברתיות</li>
    </ul>
  </div>

  <div class="footer">
    דוח זה נשלח אוטומטית מ-hashveli.co.il<br>
    <a href="https://hashveli.co.il/admin">פאנל ניהול</a> | <a href="https://hashveli.co.il">האתר</a>
  </div>
</body>
</html>
  `.trim();

  // Send email via Resend
  if (!RESEND_API_KEY) {
    return NextResponse.json({
      ok: false,
      error: "RESEND_API_KEY not set",
      preview: html,
    });
  }

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `📊 דוח יומי השווה לי - ${today}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      return NextResponse.json({ ok: false, error: err }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      sent_to: ADMIN_EMAIL,
      date: today,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "unknown" },
      { status: 500 },
    );
  }
}
