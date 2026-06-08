import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    default: "השווה לי - השוואת מחירים בין KSP, אמזון, אליאקספרס ושיין",
    template: "%s | השווה לי",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
