# Compare Site - השוואת מחירים

אתר השוואת מחירים בין KSP, Amazon, AliExpress ו-Shein.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (PostgreSQL)
- AliExpress Affiliate API
- KSP Affiliate (tracking links)

## הפעלה מקומית

```bash
npm install
npm run dev
```

האתר יעלה ב-http://localhost:3000

כרגע האתר עובד עם **mock data** (8 מוצרים לדוגמה ב-`src/lib/mock-data.ts`).

## שלבים להפעלה אמיתית

### 1. Supabase
- [ ] צור פרויקט חדש ב-https://supabase.com
- [ ] העתק `Project URL` ו-`anon key` ל-`.env.local`
- [ ] הרץ את `supabase-schema.sql` ב-SQL Editor של Supabase

### 2. החלפת mock-data ב-Supabase
- [ ] בקבצים `src/app/page.tsx`, `src/app/product/[slug]/page.tsx`, `src/app/category/[slug]/page.tsx` - להחליף `getAllProducts()`, `getProductBySlug()`, `getProductsByCategory()` בקריאות Supabase.

### 3. דומיין
- [ ] קנה דומיין (Namecheap / GoDaddy)
- [ ] עדכן `NEXT_PUBLIC_SITE_URL` ב-`.env.local` ובסביבת Vercel

### 4. Vercel
- [ ] Push ל-GitHub
- [ ] חבר את הריפו ל-Vercel
- [ ] הוסף את כל ה-env vars מ-`.env.local` ל-Vercel
- [ ] חבר את הדומיין ל-Vercel

### 5. הגשת בקשות אפיליאט
**Amazon Associates:**
- [ ] https://affiliate-program.amazon.com
- [ ] דורש: אתר חי + 10+ עמודי תוכן + פרטיות + תנאי שימוש (כולם קיימים)
- [ ] תקבל מזהה כמו `compareil-20`, עדכן `AMAZON_ASSOCIATE_TAG`

**Google AdSense:**
- [ ] https://adsense.google.com
- [ ] דורש: אתר חי + 20+ עמודי תוכן + פרטיות + תנאי שימוש
- [ ] עדכן `NEXT_PUBLIC_ADSENSE_CLIENT`

**Shein Affiliate:**
- [ ] https://onelink.shein.com

### 6. הזנת מוצרים אוטומטית
- [ ] cron job שמשתמש ב-`src/lib/aliexpress.ts → searchHotProducts()` ושומר ל-Supabase
- [ ] KSP scraper שסורק קטגוריות ומשווה SKUs

## מבנה הפרויקט

```
src/
├── app/
│   ├── layout.tsx          # RTL + header/footer
│   ├── page.tsx            # דף בית
│   ├── product/[slug]/     # עמוד מוצר עם השוואת מחירים
│   ├── category/[slug]/    # עמוד קטגוריה
│   ├── about/              # אודות
│   ├── privacy/            # מדיניות פרטיות
│   ├── terms/              # תנאי שימוש
│   ├── affiliate-disclosure/  # גילוי שותפים
│   ├── contact/            # צור קשר
│   ├── sitemap.ts          # sitemap.xml דינמי
│   └── robots.ts           # robots.txt
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── PriceComparisonTable.tsx
└── lib/
    ├── config.ts           # ספקים, קטגוריות, IDs
    ├── types.ts            # TypeScript types
    ├── format.ts           # פורמט מחיר/מספר/תאריך
    ├── mock-data.ts        # נתוני דמו (8 מוצרים)
    ├── supabase.ts         # Supabase client
    └── aliexpress.ts       # AliExpress API client
```
