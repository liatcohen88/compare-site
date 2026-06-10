import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  getAllBlogPosts,
} from "@/lib/blog-posts";
import { formatDate } from "@/lib/format";
import { SITE_URL } from "@/lib/config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "פוסט לא נמצא" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const others = getAllBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "השווה לי",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <nav className="text-sm text-slate-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            בית
          </Link>
          <span className="mx-2">›</span>
          <Link href="/blog" className="hover:text-blue-600">
            בלוג
          </Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900">{post.title}</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.readingMinutes} דקות קריאה</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center gap-3 mt-6 pb-6 border-b border-slate-200">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              ל
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-sm">
                {post.author}
              </div>
              <div className="text-xs text-slate-500">
                פורסם {formatDate(post.publishedAt)}
              </div>
            </div>
          </div>
        </header>

        <article
          className="blog-content prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-slate-700 mb-3">
              <strong>נהניתם מהמאמר?</strong>
              <br />
              שתפו אותו עם חבר/ה שזה יעזור להם לחסוך
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl"
            >
              בואו להשוות מחירים →
            </Link>
          </div>
        </footer>

        {others.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              מאמרים נוספים
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-blue-300"
                >
                  <div className="text-3xl mb-2">{other.coverEmoji}</div>
                  <div className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">
                    {other.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {other.readingMinutes} דק&apos; · {other.category}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
