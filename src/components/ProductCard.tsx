import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { VENDORS } from "@/lib/config";
import ProductImage from "./ProductImage";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const availableOffers = product.offers.filter((o) => o.inStock);
  const cheapest = [...availableOffers].sort(
    (a, b) => a.price + a.shippingPrice - (b.price + b.shippingPrice),
  )[0];
  const highest = [...availableOffers].sort(
    (a, b) => b.price + b.shippingPrice - (a.price + a.shippingPrice),
  )[0];

  const savings = highest && cheapest
    ? (highest.price + highest.shippingPrice) - (cheapest.price + cheapest.shippingPrice)
    : 0;
  const savingsPercent = highest
    ? Math.round((savings / (highest.price + highest.shippingPrice)) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all"
    >
      <div className="aspect-square bg-slate-50 relative overflow-hidden">
        <ProductImage
          src={product.imageUrl}
          alt={product.title}
          category={product.category}
          slug={product.slug}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {savingsPercent >= 10 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            חיסכון {savingsPercent}%
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs text-slate-500 mb-1">{product.brand}</div>
        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 min-h-[3rem]">
          {product.title}
        </h3>

        {cheapest && (
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-600 numeric">
                {formatPrice(cheapest.price + cheapest.shippingPrice)}
              </span>
              {highest && highest !== cheapest && (
                <span className="text-sm text-slate-400 line-through numeric">
                  {formatPrice(highest.price + highest.shippingPrice)}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-1">
              <span>ב-{VENDORS[cheapest.vendor].name}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={VENDORS[cheapest.vendor].logo}
                alt=""
                className="w-4 h-4 rounded-sm inline-block"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-1 mt-3 text-xs text-slate-500">
          <span className="flex gap-1">
            {product.offers.map((o) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={o.vendor}
                src={VENDORS[o.vendor].logo}
                alt={VENDORS[o.vendor].name}
                title={VENDORS[o.vendor].name}
                className="w-4 h-4 rounded-sm"
              />
            ))}
          </span>
          <span>·</span>
          <span>{product.offers.length} חנויות</span>
          {product.rating && (
            <>
              <span>·</span>
              <span>⭐ {product.rating}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
