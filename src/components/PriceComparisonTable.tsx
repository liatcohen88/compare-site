import type { VendorOffer } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { VENDORS } from "@/lib/config";

interface Props {
  offers: VendorOffer[];
}

export default function PriceComparisonTable({ offers }: Props) {
  const sorted = [...offers].sort((a, b) => {
    if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
    return a.price + a.shippingPrice - (b.price + b.shippingPrice);
  });

  const cheapest = sorted.find((o) => o.inStock);

  return (
    <>
      {/* MOBILE: cards stacked vertically */}
      <div className="md:hidden space-y-3">
        {sorted.map((offer) => {
          const vendor = VENDORS[offer.vendor];
          const total = offer.price + offer.shippingPrice;
          const isBest = offer === cheapest;

          return (
            <div
              key={offer.vendor}
              className={`relative border-2 rounded-2xl overflow-hidden ${
                isBest
                  ? "border-green-400 bg-green-50"
                  : "border-slate-200 bg-white"
              } ${!offer.inStock ? "opacity-60" : ""}`}
            >
              {isBest && (
                <div className="absolute top-0 left-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-br-xl">
                  הכי זול 🏆
                </div>
              )}

              <div className="p-4 pt-7">
                <div className="flex items-center gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vendor.logo}
                    alt={vendor.name}
                    className="w-10 h-10 rounded-lg bg-white border border-slate-200 p-1"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 text-lg">
                      {vendor.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      📦 משלוח {vendor.shippingDays} ימים
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-3 mb-3">
                  <div>
                    <div className="text-xs text-slate-500">מחיר סופי</div>
                    <div
                      className={`text-3xl font-extrabold numeric ${isBest ? "text-green-700" : "text-blue-600"}`}
                    >
                      {formatPrice(total)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 numeric">
                      {formatPrice(offer.price)} מוצר{" "}
                      {offer.shippingPrice > 0
                        ? `+ ${formatPrice(offer.shippingPrice)} משלוח`
                        : "+ משלוח חינם 🎉"}
                    </div>
                  </div>
                </div>

                {offer.inStock ? (
                  <a
                    href={offer.url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className={`block text-center w-full py-3 rounded-xl font-bold text-base ${
                      isBest
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    🛒 לקנייה ב-{vendor.name}
                  </a>
                ) : (
                  <div className="block text-center w-full py-3 rounded-xl font-bold bg-slate-100 text-slate-400">
                    לא במלאי
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP: table */}
      <div className="hidden md:block border border-slate-200 rounded-xl overflow-hidden bg-white">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-right p-4 font-semibold text-slate-700">חנות</th>
              <th className="text-right p-4 font-semibold text-slate-700">משלוח</th>
              <th className="text-right p-4 font-semibold text-slate-700">מחיר</th>
              <th className="text-right p-4 font-semibold text-slate-700">סה&quot;כ</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((offer) => {
              const vendor = VENDORS[offer.vendor];
              const total = offer.price + offer.shippingPrice;
              const isBest = offer === cheapest;

              return (
                <tr
                  key={offer.vendor}
                  className={`border-b border-slate-100 last:border-0 ${
                    isBest ? "bg-green-50" : ""
                  } ${!offer.inStock ? "opacity-50" : ""}`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={vendor.logo}
                        alt={vendor.name}
                        className="w-8 h-8 rounded bg-white border border-slate-200 p-0.5"
                      />
                      <div>
                        <div className="font-semibold text-slate-900">
                          {vendor.name}
                          {isBest && (
                            <span className="inline-block mr-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              הכי זול
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          משלוח {vendor.shippingDays} ימים
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-700 numeric">
                    {offer.shippingPrice === 0 ? (
                      <span className="text-green-600 font-semibold">חינם</span>
                    ) : (
                      formatPrice(offer.shippingPrice)
                    )}
                  </td>
                  <td className="p-4 font-semibold text-slate-900 numeric">
                    {offer.originalPrice && offer.originalPrice > offer.price ? (
                      <span className="flex items-baseline gap-2">
                        <span className="text-red-600">{formatPrice(offer.price)}</span>
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(offer.originalPrice)}
                        </span>
                      </span>
                    ) : (
                      formatPrice(offer.price)
                    )}
                  </td>
                  <td className="p-4 font-bold text-blue-600 numeric">
                    {formatPrice(total)}
                  </td>
                  <td className="p-4">
                    {offer.inStock ? (
                      <a
                        href={offer.url}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        className={`inline-block px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
                          isBest
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        🛒 לקנייה ב-{vendor.name}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400">לא במלאי</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
