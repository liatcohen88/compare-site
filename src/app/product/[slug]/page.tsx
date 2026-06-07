import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, getProductsByCategory, MOCK_PRODUCTS } from "@/lib/mock-data";
import { CATEGORIES, VENDORS } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import PriceComparisonTable from "@/components/PriceComparisonTable";
import ProductCard from "@/components/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "מוצר לא נמצא" };

  const available = product.offers.filter((o) => o.inStock);
  const cheapest = [...available].sort(
    (a, b) => a.price + a.shippingPrice - (b.price + b.shippingPrice),
  )[0];

  return {
    title: `${product.title} - השוואת מחירים`,
    description: cheapest
      ? `${product.title} - המחיר הזול ביותר: ${formatPrice(cheapest.price + cheapest.shippingPrice)} ב-${VENDORS[cheapest.vendor].name}. ${product.description.slice(0, 100)}`
      : product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const cat = CATEGORIES.find((c) => c.slug === product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const available = product.offers.filter((o) => o.inStock);
  const cheapest = [...available].sort(
    (a, b) => a.price + a.shippingPrice - (b.price + b.shippingPrice),
  )[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.imageUrl,
    brand: { "@type": "Brand", name: product.brand },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount ?? 0,
      },
    }),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "ILS",
      lowPrice: cheapest ? cheapest.price + cheapest.shippingPrice : 0,
      offerCount: product.offers.length,
      availability: cheapest ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="text-sm text-slate-600 mb-6">
          <Link href="/" className="hover:text-blue-600">בית</Link>
          {cat && (
            <>
              <span className="mx-2">›</span>
              <Link href={`/category/${cat.slug}`} className="hover:text-blue-600">
                {cat.name}
              </Link>
            </>
          )}
          <span className="mx-2">›</span>
          <span className="text-slate-900">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-50 rounded-2xl p-8 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.title}
              className="max-w-full max-h-96 object-contain"
            />
          </div>

          <div>
            <div className="text-sm text-slate-500 mb-1">{product.brand}</div>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">⭐ {product.rating}</span>
                <span className="text-sm text-slate-500">
                  ({product.reviewCount?.toLocaleString("he-IL")} ביקורות)
                </span>
              </div>
            )}

            <p className="text-slate-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {cheapest && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                <div className="text-sm text-green-700 mb-1">💰 המחיר הכי זול</div>
                <div className="text-3xl font-bold text-green-700 numeric">
                  {formatPrice(cheapest.price + cheapest.shippingPrice)}
                </div>
                <div className="text-sm text-green-600 mt-1">
                  ב-{VENDORS[cheapest.vendor].name} {VENDORS[cheapest.vendor].countryFlag} ·
                  משלוח {VENDORS[cheapest.vendor].shippingDays} ימים
                </div>
              </div>
            )}

            {Object.keys(product.specs).length > 0 && (
              <div className="border border-slate-200 rounded-xl p-4">
                <h2 className="font-semibold text-slate-900 mb-3">מפרט טכני</h2>
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-slate-100 pb-2 last:border-0">
                      <dt className="text-slate-600">{k}</dt>
                      <dd className="font-semibold text-slate-900">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            השוואת מחירים בין החנויות
          </h2>
          <PriceComparisonTable offers={product.offers} />
          <p className="text-xs text-slate-500 mt-3">
            * המחירים מתעדכנים מדי יום. ייתכן שינוי קל מול האתר המקור.
            כאתר שותפים אנו מקבלים עמלה מרכישות זכאיות - ללא תוספת עלות עבורך.
          </p>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">מוצרים דומים</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
