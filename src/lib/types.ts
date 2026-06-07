import type { VendorId, CategorySlug } from "./config";

export interface VendorOffer {
  vendor: VendorId;
  price: number;
  shippingPrice: number;
  inStock: boolean;
  url: string;
  vendorSku?: string;
  lastUpdated: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  category: CategorySlug;
  brand: string;
  imageUrl: string;
  images?: string[];
  specs: Record<string, string>;
  offers: VendorOffer[];
  rating?: number;
  reviewCount?: number;
  createdAt: string;
}

export interface PriceWithShipping {
  vendor: VendorId;
  total: number;
  price: number;
  shipping: number;
  url: string;
  inStock: boolean;
}
