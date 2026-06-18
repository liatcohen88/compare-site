import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "חנויות מומלצות - Adidas, Nike, Sephora ועוד 25 מותגים",
  description:
    "כל המותגים המובילים במקום אחד. קליק ישיר לחנות הרשמית של Adidas, Nike, Reebok, ASOS, Sephora, Walmart ועוד. השוואה חכמה ושופינג בלי טריקים.",
  alternates: { canonical: "/stores" },
  openGraph: {
    title: "חנויות מומלצות | Hashveli",
    description: "Adidas, Nike, Sephora, ASOS ועוד 25 מותגי-על במקום אחד.",
  },
};

type Store = {
  name: string;
  domain: string;
  description: string;
  category: "אופנת ספורט" | "אופנה" | "יופי" | "אלקטרוניקה" | "בית וכללי" | "נסיעות";
  brandColor: string;
};

const STORES: Store[] = [
  // אופנת ספורט
  { name: "Adidas", domain: "adidas.com", description: "נעלי ספורט, ביגוד וציוד מקצועי", category: "אופנת ספורט", brandColor: "#000000" },
  { name: "Nike", domain: "nike.com", description: "חידושי טכנולוגיה לאתלטים", category: "אופנת ספורט", brandColor: "#111111" },
  { name: "Reebok", domain: "reebok.com", description: "קלאסיקות + ביגוד אימון", category: "אופנת ספורט", brandColor: "#dc2626" },
  { name: "Puma", domain: "puma.com", description: "סטייל אורבני וספורט", category: "אופנת ספורט", brandColor: "#1f2937" },
  { name: "New Balance", domain: "newbalance.com", description: "נעלי ריצה ויומיום", category: "אופנת ספורט", brandColor: "#dc2626" },
  { name: "Under Armour", domain: "underarmour.com", description: "ביגוד פרפורמנס", category: "אופנת ספורט", brandColor: "#000000" },

  // אופנה
  { name: "ASOS", domain: "asos.com", description: "אופנת רחוב + מותגי בוטיק", category: "אופנה", brandColor: "#000000" },
  { name: "H&M", domain: "hm.com", description: "אופנה לכל המשפחה במחירים נגישים", category: "אופנה", brandColor: "#e60012" },
  { name: "Mango", domain: "mango.com", description: "אופנה ספרדית קלאסית ומודרנית", category: "אופנה", brandColor: "#1f1f1f" },
  { name: "Boohoo", domain: "boohoo.com", description: "אופנת אופנה בריטית מהירה", category: "אופנה", brandColor: "#e91e63" },

  // יופי וטיפוח
  { name: "Sephora", domain: "sephora.com", description: "איפור וטיפוח פרימיום", category: "יופי", brandColor: "#000000" },
  { name: "MAC Cosmetics", domain: "maccosmetics.com", description: "איפור מקצועי", category: "יופי", brandColor: "#000000" },
  { name: "Boots", domain: "boots.com", description: "טיפוח, ויטמינים ובריאות", category: "יופי", brandColor: "#005eb8" },
  { name: "Estée Lauder", domain: "esteelauder.com", description: "טיפוח פרימיום ובשמים", category: "יופי", brandColor: "#1a1a1a" },

  // אלקטרוניקה
  { name: "Best Buy", domain: "bestbuy.com", description: "אלקטרוניקה, גאדג'טים ומחשבים", category: "אלקטרוניקה", brandColor: "#0046be" },
  { name: "Newegg", domain: "newegg.com", description: "חומרת מחשב וגיימינג", category: "אלקטרוניקה", brandColor: "#f80" },
  { name: "B&H Photo", domain: "bhphotovideo.com", description: "צילום, וידאו ואודיו", category: "אלקטרוניקה", brandColor: "#1a1a1a" },

  // בית וכללי
  { name: "Walmart", domain: "walmart.com", description: "כל מה שצריך לבית במחיר טוב", category: "בית וכללי", brandColor: "#0071dc" },
  { name: "Target", domain: "target.com", description: "מותגים ועיצוב הבית", category: "בית וכללי", brandColor: "#cc0000" },
  { name: "Macy's", domain: "macys.com", description: "אופנה, יופי ובית", category: "בית וכללי", brandColor: "#e91d2c" },
  { name: "Wayfair", domain: "wayfair.com", description: "ריהוט ועיצוב בית", category: "בית וכללי", brandColor: "#7b189f" },
  { name: "IKEA", domain: "ikea.com", description: "ריהוט במחירי שטח", category: "בית וכללי", brandColor: "#0058a3" },

  // נסיעות
  { name: "Booking.com", domain: "booking.com", description: "מלונות ודירות נופש", category: "נסיעות", brandColor: "#003580" },
  { name: "Expedia", domain: "expedia.com", description: "טיסות, מלונות וחבילות", category: "נסיעות", brandColor: "#fcd34d" },
  { name: "Airbnb", domain: "airbnb.com", description: "דירות, וילות וחוויות", category: "נסיעות", brandColor: "#ff5a5f" },
];

const CATEGORIES: Store["category"][] = [
  "אופנת ספורט",
  "אופנה",
  "יופי",
  "אלקטרוניקה",
  "בית וכללי",
  "נסיעות",
];

function StoreCard({ store }: { store: Store }) {
  const logoSrc = `https://logo.clearbit.com/${store.domain}?size=200`;
  const href = `https://${store.domain}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener"
      className="group flex flex-col items-center gap-3 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 transition-all"
      aria-label={`${store.name} - ${store.description}`}
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: store.brandColor }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={`לוגו ${store.name}`}
          loading="lazy"
          className="w-14 h-14 object-contain bg-white rounded-xl p-1"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = "none";
            const fb = t.nextElementSibling as HTMLElement | null;
            if (fb) fb.style.display = "flex";
          }}
        />
        <span
          className="hidden w-14 h-14 bg-white rounded-xl items-center justify-center font-extrabold text-xl"
          style={{ color: store.brandColor }}
        >
          {store.name.charAt(0)}
        </span>
      </div>
      <div className="text-center">
        <h3 className="font-bold text-slate-900 group-hover:text-blue-600">
          {store.name}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{store.description}</p>
      </div>
      <span className="mt-auto text-xs font-semibold text-blue-600 group-hover:underline">
        לחנות ←
      </span>
    </a>
  );
}

export default function StoresPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">
          🏬 כל החנויות המובילות
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          25 מותגי-על במקום אחד — קליק ישיר לחנות הרשמית. ללא מתווכים, ללא טריקים.
        </p>
      </div>

      <nav aria-label="קטגוריות חנויות" className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`#${encodeURIComponent(cat)}`}
            className="px-4 py-2 text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 rounded-full"
          >
            {cat}
          </a>
        ))}
      </nav>

      {CATEGORIES.map((cat) => {
        const inCategory = STORES.filter((s) => s.category === cat);
        return (
          <section key={cat} id={cat} className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 mb-5 border-b-2 border-blue-100 pb-2">
              {cat}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {inCategory.map((store) => (
                <StoreCard key={store.domain} store={store} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-sm text-slate-700">
        <p className="font-semibold text-blue-900 mb-2">💡 איך זה עובד</p>
        <p>
          Hashveli משתתפת בתוכניות שותפים של אלפי מותגים בעולם. אנחנו מקבלים עמלה
          קטנה מהמותג כשאת קונה דרך הקישורים שלנו — בלי תוספת מחיר עבורך. זה מה
          שמאפשר לנו לשמור על האתר חינמי וללא פרסומות מטרידות.
        </p>
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">
        * משלוח לישראל, מחירים וזמינות תלויים בכל מותג. בדקי בעמוד החנות לפני הקנייה.
      </p>
    </div>
  );
}
