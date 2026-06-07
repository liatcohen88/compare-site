-- =============================================
-- Compare Site - Supabase Schema
-- Run this in Supabase SQL Editor after creating project
-- =============================================

-- Products table
create table if not exists products (
  id text primary key,
  slug text unique not null,
  title text not null,
  title_en text,
  description text,
  category text not null,
  brand text,
  image_url text,
  images jsonb default '[]'::jsonb,
  specs jsonb default '{}'::jsonb,
  rating numeric(2,1),
  review_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists products_category_idx on products(category);
create index if not exists products_slug_idx on products(slug);
create index if not exists products_brand_idx on products(brand);

-- Vendor offers (current prices per vendor per product)
create table if not exists vendor_offers (
  id bigserial primary key,
  product_id text references products(id) on delete cascade,
  vendor text not null check (vendor in ('ksp', 'amazon', 'aliexpress', 'shein')),
  price numeric(10,2) not null,
  shipping_price numeric(10,2) default 0,
  in_stock boolean default true,
  url text not null,
  vendor_sku text,
  last_checked_at timestamptz default now(),
  unique(product_id, vendor)
);

create index if not exists offers_product_idx on vendor_offers(product_id);
create index if not exists offers_vendor_idx on vendor_offers(vendor);
create index if not exists offers_price_idx on vendor_offers(price);

-- Price history (for tracking and "price drop" alerts)
create table if not exists price_history (
  id bigserial primary key,
  product_id text references products(id) on delete cascade,
  vendor text not null,
  price numeric(10,2) not null,
  recorded_at timestamptz default now()
);

create index if not exists history_product_date_idx on price_history(product_id, recorded_at desc);

-- Click tracking (for analytics on which products convert)
create table if not exists affiliate_clicks (
  id bigserial primary key,
  product_id text,
  vendor text not null,
  user_agent text,
  referer text,
  clicked_at timestamptz default now()
);

create index if not exists clicks_product_idx on affiliate_clicks(product_id);
create index if not exists clicks_date_idx on affiliate_clicks(clicked_at desc);

-- Search keywords (for SEO content generation later)
create table if not exists search_keywords (
  id bigserial primary key,
  keyword text unique not null,
  monthly_volume integer,
  category text,
  product_id text references products(id) on delete set null,
  created_at timestamptz default now()
);

-- RLS: allow public read access to products and offers
alter table products enable row level security;
alter table vendor_offers enable row level security;
alter table price_history enable row level security;

create policy "Public read products" on products for select using (true);
create policy "Public read offers" on vendor_offers for select using (true);
create policy "Public read history" on price_history for select using (true);

-- Service role bypasses RLS for writes from bot/cron
