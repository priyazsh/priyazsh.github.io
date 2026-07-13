import Link from "next/link";
import { LuCalendar, LuClock, LuTag, LuArrowLeft } from "react-icons/lu";
import { Metadata } from "next";
import { renderMarkdown } from "@/lib/markdown";
import { getPostBySlug } from "@/lib/posts";
import ReadingProgress from "@/app/components/ReadingProgress";

export const dynamic = 'force-static';

interface BlogPostProps {
  params: Promise<{ url: string }>;
}

export async function generateStaticParams() {
  try {
    const { getAllPosts } = await import("@/lib/posts");
    return getAllPosts().map((post) => ({
      url: post.slug,
    }));
  } catch {
    return [];
  }
}

function extractFirstImage(content: string): string | null {
  const imagePattern = /<img[^>]+src=["']([^"']+)["']/;
  const match = content.match(imagePattern);
  return match ? match[1] : null;
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { url } = await params;
  const post = await getPostBySlug(url);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const htmlContent = await renderMarkdown(post.content);
  const firstImage = extractFirstImage(htmlContent);
  const baseUrl = 'https://priyazsh.github.io';

  return {
    title: post.title,
    description: post.desc,
    alternates: {
      canonical: `${baseUrl}/blog/${url}`,
    },
    openGraph: {
      title: post.title,
      description: post.desc,
      type: 'article',
      publishedTime: post.date,
      url: `${baseUrl}/blog/${url}`,
      images: firstImage ? [
        {
          url: firstImage.startsWith('http') ? firstImage : `${baseUrl}${firstImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [
        {
          url: `${baseUrl}/og/card.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.desc,
      images: firstImage ? [firstImage.startsWith('http') ? firstImage : `${baseUrl}${firstImage}`] : [`${baseUrl}/og/card.png`],
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { url } = await params;
  const post = getPostBySlug(url);

  if (!post) {
    return (
      <div className="py-4">
        <Link href="/" className="btn-ghost">
          <LuArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>

        <div className="text-center py-16">
          <h1 className="text-2xl font-display font-bold text-primary mb-4">Post Not Found</h1>
          <p className="text-secondary">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const htmlContent = await renderMarkdown(post.content);

  return (
    <div className="py-4">
      <ReadingProgress />
      <div className="mb-8">
        <Link href="/blog" className="btn-ghost">
          <LuArrowLeft className="w-3.5 h-3.5" />
          <span>Back to blogs</span>
        </Link>
      </div>

      <article className="blog-article space-y-8">
        <header className="space-y-4">
          <h1 className="text-[1.6rem] sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-xl sm:text-2xl text-secondary leading-relaxed">{post.desc}</p>

          <div className="flex flex-wrap items-center gap-4 text-base" style={{ color: "var(--text-tertiary)" }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <LuCalendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <LuClock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <LuTag className="w-4 h-4" />
                <div className="flex gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-sm"
                      style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-tertiary)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <div
          className="prose-custom leading-relaxed"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
