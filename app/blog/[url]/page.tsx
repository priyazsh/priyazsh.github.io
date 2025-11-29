import fs from "fs";
import path from "path";
import Link from "next/link";
import { LuCalendar, LuClock, LuTag, LuArrowLeft } from "react-icons/lu";
import { Metadata } from "next";
import Footer from "@/app/components/Footer";

export const dynamic = 'force-static';

interface BlogPostProps {
  params: Promise<{ url: string }>;
}

interface FrontMatter {
  title: string;
  desc: string;
  date: string;
  tags: string[];
}

function parseFrontmatter(
  content: string
): { frontmatter: FrontMatter; content: string } | null {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    return null;
  }

  const [, frontmatterText, postContent] = frontmatterMatch;

  const frontmatter: any = {};
  frontmatterText.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim();
      if (key.trim() === "tags") {
        try {
          frontmatter[key.trim()] = JSON.parse(value);
        } catch {
          frontmatter[key.trim()] = [];
        }
      } else {
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, "");
      }
    }
  });

  return { frontmatter, content: postContent };
}

function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-display font-semibold text-zinc-200 mt-8 mb-4 pb-2 border-b border-zinc-800/50">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-display font-semibold text-zinc-100 mt-10 mb-5 pb-3 border-b border-zinc-700">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-display font-semibold text-white mt-10 mb-6 pb-3 border-b-2 border-zinc-600">$1</h1>');

  // Text formatting
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Linked images (must come before regular links and images)
  html = html.replace(
    /\[!\[([^\]]*)\]\(([^)]*)\)\]\(([^)]*)\)/g,
    '<a href="$3" target="_blank" rel="noopener noreferrer"><img src="$2" alt="$1" class="rounded-lg my-4 max-w-full h-auto hover:opacity-80 transition-opacity" /></a>'
  );

  // Images (must come before regular links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]*)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-4 max-w-full h-auto" />');

  // Links
  html = html.replace(
    /\[([^\]]*)\]\(([^)]*)\)/g,
    '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Code blocks
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre class="bg-zinc-950 border border-zinc-800 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm text-zinc-300 font-mono leading-relaxed whitespace-pre">$2</code></pre>'
  );

  // Inline code
  html = html.replace(/`([^`]*)`/g, '<code class="bg-zinc-800 border border-zinc-700 px-2 py-1 rounded text-sm text-zinc-300 font-mono">$1</code>');

  // Lists
  html = html.replace(/^\* (.*$)/gim, '<li class="mb-1">$1</li>');
  html = html.replace(/(<li.*<\/li>)/g, '<ul class="list-disc list-inside my-4 space-y-1">$1</ul>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p class="mb-4 text-zinc-400">');
  html = '<p class="mb-4 text-zinc-400">' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p class="mb-4 text-zinc-400"><\/p>/g, '');

  return html;
}

async function getBlogPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "posts", `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsed = parseFrontmatter(fileContent);

    if (!parsed) {
      return null;
    }

    return {
      ...parsed.frontmatter,
      content: parsed.content,
      readTime: estimateReadTime(parsed.content),
    };
  } catch (error) {
    console.error("Error reading blog post:", error);
    return null;
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const postsDirectory = path.join(process.cwd(), "posts");
    const filenames = fs.readdirSync(postsDirectory);
    
    return filenames
      .filter(name => name.endsWith('.mdx'))
      .map(name => ({
        url: name.replace('.mdx', '')
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

function extractFirstImage(content: string): string | null {
  const imagePatterns = [
    /!\[([^\]]*)\]\(([^)]*)\)/,  // ![alt](url)
    /\[!\[([^\]]*)\]\(([^)]*)\)\]\(([^)]*)\)/ // [![alt](url)](link)
  ];

  for (const pattern of imagePatterns) {
    const match = content.match(pattern);
    if (match) {
      return match[2];
    }
  }
  
  return null;
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { url } = await params;
  const post = await getBlogPost(url);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const firstImage = extractFirstImage(post.content);
  const baseUrl = 'https://priyanzsh.github.io';

  return {
    title: post.title,
    description: post.desc,
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
          url: `${baseUrl}/og/card.png`, // Fallback image
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
  const post = await getBlogPost(url);

  if (!post) {
    return (
      <div className="max-w-4xl px-6 py-8">
        <Link href="/" className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm border border-gray-700/30 hover:border-gray-600/50">
          <LuArrowLeft />
          <span>Back</span>
        </Link>

        <div className="text-center py-16">
          <h1 className="text-2xl font-display font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-zinc-400">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const htmlContent = markdownToHtml(post.content);

  return (
    <div className="max-w-4xl px-6 py-8">
      <div className="mb-6">
        <Link href="/blog" className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm border border-gray-700/30 hover:border-gray-600/50">
          <LuArrowLeft />
          <span>Back to blogs</span>
        </Link>
      </div>

      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">{post.title}</h1>
          <p className="text-lg text-zinc-400 font-sans leading-relaxed">{post.desc}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <LuCalendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <LuClock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <LuTag className="w-4 h-4" />
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-zinc-800 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <div 
          className="text-zinc-400 leading-relaxed font-sans prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </article>
      <Footer />
    </div>
  );
}
