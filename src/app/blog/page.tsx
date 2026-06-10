import Link from "next/link";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog-posts";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "בלוג - מדריכים, השוואות וטיפים לקניות חכמות",
  description:
    "מדריכים מקצועיים על קניות אונליין מאליאקספרס, אמזון, KSP ושיין. השוואות מחירים, טיפים לחיסכון וכל מה שצריך לדעת לפני שמזמינים.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
          📚 הבלוג של השווה לי
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          מדריכים, השוואות וטיפים שיעזרו לכם לקנות חכם יותר. עדכונים שבועיים.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-center">
              <span className="text-6xl">{post.coverEmoji}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  {post.category}
                </span>
                <span>·</span>
                <span>{post.readingMinutes} דקות קריאה</span>
                <span>·</span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600">
                {post.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-3 text-blue-600 text-sm font-semibold">
                להמשך קריאה ←
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-16 bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          רוצים לדעת מה משתלם לקנות?
        </h2>
        <p className="text-slate-600 mb-4">
          חזרו לדף הבית והשוו מחירים על מאות מוצרים בין KSP, אמזון, אליאקספרס ושיין.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl"
        >
          לדף הבית ←
        </Link>
      </section>
    </div>
  );
}
