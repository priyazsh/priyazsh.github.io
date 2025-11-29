import Link from "next/link";
import { LuCalendar, LuClock, LuTag, LuExternalLink } from "react-icons/lu";
import fs from "fs";
import path from "path";

interface BlogPost {
  title: string;
  desc: string;
  date: string;
  tags: string[];
  slug: string;
  readTime?: string;
}

function parseFrontmatter(content: string) {
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

function getTopBlogPosts(): BlogPost[] {
  try {
    const postsDirectory = path.join(process.cwd(), "posts");

    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(postsDirectory);
    const posts: BlogPost[] = [];

    for (const filename of filenames) {
      if (filename.endsWith(".mdx")) {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");

        const parsed = parseFrontmatter(fileContent);
        if (parsed) {
          const slug = filename.replace(".mdx", "");
          posts.push({
            title: parsed.frontmatter.title || "Untitled",
            desc: parsed.frontmatter.desc || "",
            date: parsed.frontmatter.date || "",
            tags: parsed.frontmatter.tags || [],
            slug: slug,
            readTime: estimateReadTime(parsed.content),
          });
        }
      }
    }

    return posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2);
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export default function Blogs() {
  const blogPosts = getTopBlogPosts();

  return (
    <section className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-display font-semibold tracking-tight border-b border-zinc-800 pb-2 sm:pb-3 mb-3 sm:mb-4">
        <span className="text-gray-500 font-mono">~/</span> Blogs
      </h2>

      {blogPosts.map((post) => (
        <div
          key={post.slug}
          className="p-4 sm:p-6 rounded-xl border border-zinc-800/50 hover:border-zinc-600 transition-colors bg-zinc-900/30"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-display font-semibold tracking-tight">
              {post.title}
            </h3>

            <span className="hidden sm:inline-flex px-2 py-0.5 text-xs rounded bg-black-600/20 text-red-500 w-fit">
              {post.readTime}
            </span>
          </div>

          <p className="text-sm text-zinc-400 mb-3 sm:mb-4 leading-relaxed">{post.desc}</p>

          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <LuCalendar className="w-3 h-3 text-zinc-500 shrink-0" />
              <p className="text-xs text-zinc-500">{post.date}</p>
            </div>
            
            <div className="flex items-center gap-2 sm:hidden">
              <LuClock className="w-3 h-3 text-zinc-500 shrink-0" />
              <p className="text-xs text-zinc-500">{post.readTime}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
            {post.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs text-zinc-500"
                  >
                    <LuTag className="w-3 h-3 shrink-0" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            ) : (
              <div></div>
            )}

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-200 font-medium transition-colors duration-300 text-sm w-fit"
            >
              <span>Read</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      ))}

      <div className="pt-3 sm:pt-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 hover:border-zinc-600 transition-all duration-300 text-sm font-medium text-zinc-300 hover:text-white active:scale-95"
        >
          <span>show all posts</span>
        </Link>
      </div>
    </section>
  );
}
