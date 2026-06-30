import Link from "next/link";
import { LuCalendar, LuClock, LuTag } from "react-icons/lu";
import { getTopBlogPosts } from "@/lib/posts";

export default function Blogs() {
  const blogPosts = getTopBlogPosts();

  return (
    <section className="mt-8 sm:mt-12 md:mt-16">
      <p className="section-header mb-4 sm:mb-7">Recent Writing</p>

      <div className="space-y-4 sm:space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card block p-4 sm:p-6 md:p-8 cursor-pointer"
          >
            <h3 className="text-base sm:text-xl md:text-2xl font-display font-semibold tracking-tight text-primary">
              {post.title}
            </h3>

            <p className="text-sm sm:text-base md:text-lg text-secondary mt-1.5 sm:mt-2 leading-relaxed">{post.desc}</p>

            <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3">
              <div className="flex items-center gap-1">
                <LuCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color: "var(--text-tertiary)" }} />
                <p className="text-xs sm:text-sm text-tertiary">{post.date}</p>
              </div>
              <div className="flex items-center gap-1">
                <LuClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color: "var(--text-tertiary)" }} />
                <p className="text-xs sm:text-sm text-tertiary">{post.readTime}</p>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm text-tertiary"
                  >
                    <LuTag className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-4 sm:mt-6">
        <Link
          href="/blog"
          className="btn-ghost text-sm sm:text-base"
        >
          show all posts
        </Link>
      </div>
    </section>
  );
}
