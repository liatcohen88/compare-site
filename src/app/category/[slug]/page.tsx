import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/mock-data";
import { CATEGORIES } from "@/lib/config";
import ProductCard from "@/components/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: "קטגוריה לא נמצאה" };

  return {
    title: `${cat.name} - השוואת מחירים`,
    description: `השוואת מחירים על ${cat.name} בין KSP, אמזון, אליאקספרס ושיין. מצא את המחיר הזול ביותר בישראל.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          {cat.icon} {cat.name}
        </h1>
        <p className="text-slate-600">
          {products.length} מוצרים · השוואת מחירים בין KSP, אמזון, אליאקספרס ושיין
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-slate-600">עדיין אין מוצרים בקטגוריה זו. בקרוב!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
