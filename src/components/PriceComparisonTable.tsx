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
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-right p-4 font-semibold text-slate-700">חנות</th>
            <th className="text-right p-4 font-semibold text-slate-700 hidden md:table-cell">משלוח</th>
            <th className="text-right p-4 font-semibold text-slate-700">מחיר</th>
            <th className="text-right p-4 font-semibold text-slate-700 hidden md:table-cell">סה"כ</th>
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
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{vendor.countryFlag}</span>
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
                <td className="p-4 hidden md:table-cell text-slate-700 numeric">
                  {offer.shippingPrice === 0 ? (
                    <span className="text-green-600 font-semibold">חינם</span>
                  ) : (
                    formatPrice(offer.shippingPrice)
                  )}
                </td>
                <td className="p-4 font-semibold text-slate-900 numeric">
                  {formatPrice(offer.price)}
                </td>
                <td className="p-4 font-bold text-blue-600 hidden md:table-cell numeric">
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
                      לחנות ←
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
  );
}
