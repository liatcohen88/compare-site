import CryptoJS from "crypto-js";

const APP_KEY = process.env.ALIEXPRESS_APP_KEY ?? "";
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET ?? "";
const TRACKING_ID = process.env.ALIEXPRESS_TRACKING_ID ?? "default";

const API_URL = "https://api-sg.aliexpress.com/sync";

interface AliParams {
  [key: string]: string | number;
}

function sign(params: AliParams): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}${params[k]}`)
    .join("");
  const stringToSign = APP_SECRET + sorted + APP_SECRET;
  return CryptoJS.HmacSHA256(stringToSign, APP_SECRET)
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();
}

async function callAli<T = unknown>(method: string, params: AliParams): Promise<T> {
  if (!APP_KEY || !APP_SECRET) {
    throw new Error("AliExpress credentials missing in env");
  }

  const full: AliParams = {
    ...params,
    method,
    app_key: APP_KEY,
    timestamp: new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14),
    sign_method: "sha256",
    format: "json",
    v: "2.0",
  };
  full.sign = sign(full);

  const qs = new URLSearchParams(
    Object.entries(full).map(([k, v]) => [k, String(v)]),
  );

  const res = await fetch(`${API_URL}?${qs.toString()}`, { method: "POST" });
  if (!res.ok) {
    throw new Error(`AliExpress API ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

export interface AliProduct {
  product_id: string;
  product_title: string;
  product_main_image_url: string;
  sale_price: string;
  sale_price_currency: string;
  evaluate_rate: string;
  commission_rate: string;
  promotion_link?: string;
  shop_url?: string;
  first_level_category_name?: string;
}

export async function searchHotProducts(opts: {
  categoryId?: string;
  keywords?: string;
  pageNo?: number;
  pageSize?: number;
}): Promise<AliProduct[]> {
  const result = await callAli<{
    aliexpress_affiliate_hotproduct_query_response?: {
      resp_result?: {
        result?: {
          products?: { product: AliProduct[] };
        };
      };
    };
  }>("aliexpress.affiliate.hotproduct.query", {
    tracking_id: TRACKING_ID,
    target_currency: "ILS",
    target_language: "HE",
    ship_to_country: "IL",
    page_no: opts.pageNo ?? 1,
    page_size: opts.pageSize ?? 20,
    ...(opts.categoryId ? { category_ids: opts.categoryId } : {}),
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
  });

  return (
    result?.aliexpress_affiliate_hotproduct_query_response?.resp_result?.result
      ?.products?.product ?? []
  );
}

export async function generateAffiliateLink(sourceUrl: string): Promise<string | null> {
  const result = await callAli<{
    aliexpress_affiliate_link_generate_response?: {
      resp_result?: {
        result?: {
          promotion_links?: {
            promotion_link: Array<{ promotion_link: string }>;
          };
        };
      };
    };
  }>("aliexpress.affiliate.link.generate", {
    tracking_id: TRACKING_ID,
    promotion_link_type: 0,
    source_values: sourceUrl,
  });

  return (
    result?.aliexpress_affiliate_link_generate_response?.resp_result?.result
      ?.promotion_links?.promotion_link?.[0]?.promotion_link ?? null
  );
}
