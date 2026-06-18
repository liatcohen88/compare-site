import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { SITE_URL } from "@/lib/config";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-QMMNLR39PW";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hashveli - השוואת מחירים בין KSP, אמזון, אליאקספרס ושיין",
    template: "%s | Hashveli",
  },
  description:
    "השוואת מחירים בין KSP, אמזון, אליאקספרס ושיין. גלה את המחיר הזול ביותר על אלקטרוניקה, גאדג'טים, סמארטפונים ועוד.",
  keywords: ["השוואת מחירים", "מחירים", "KSP", "אמזון", "אליאקספרס", "שיין", "אלקטרוניקה", "ישראל"],
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "השווה לי",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "FdR3p8GFolzFP2DKQLp7D-cw8ZZari_mD-o5X_dDsa0",
    other: {
      "impact-site-verification": "4b21067f-aa71-4c9a-b4ed-60e1704501e9",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <head>
        {/* Impact.com verification - requires `value` attribute */}
        <meta
          name="impact-site-verification"
          // @ts-expect-error - Impact requires `value` attribute
          value="4b21067f-aa71-4c9a-b4ed-60e1704501e9"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AccessibilityWidget />
        <Analytics />
        <SpeedInsights />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        {/* Skimlinks - auto-monetize outbound links (Shein, ASOS, Sephora etc.) */}
        <Script
          src="https://s.skimresources.com/js/304934X1793125.skimlinks.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
