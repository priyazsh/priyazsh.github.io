"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { LuCalendar, LuClock, LuTag, LuX, LuArrowLeft } from "react-icons/lu"
import Footer from "../components/Footer"
import type { BlogPost } from "@/lib/posts"

function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

export default function BlogContent({ posts }: { posts: BlogPost[] }) {
  const searchParams = useSearchParams()
  const activeTag = searchParams.get("tag")
  const allTags = getAllTags(posts)
  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts

  return (
    <section className="space-y-6 mt-2">
      <Link href="/" className="btn-ghost">
        <LuArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </Link>

      <p className="section-header">Blog</p>

      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <span className="text-sm font-medium text-tertiary mr-1">Filter:</span>
          {allTags.map((tag) => {
            const isActive = tag === activeTag
            return (
              <Link
                key={tag}
                href={isActive ? "/blog" : `/blog?tag=${encodeURIComponent(tag)}`}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium transition-all duration-250 border ${
                  isActive
                    ? "border-theme text-primary"
                    : "border-theme text-secondary hover:border-hover-theme hover:text-primary"
                }`}
                style={{
                  backgroundColor: isActive ? "var(--bg-hover)" : "var(--bg-elevated)",
                }}
              >
                {tag}
                {isActive && <LuX className="w-3 h-3" />}
              </Link>
            )
          })}
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <p className="text-secondary text-sm py-8 text-center">No posts found with this tag.</p>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card block p-4 sm:p-7 md:p-8 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-primary">
                    {post.title}
                  </h3>
                  <span
                    className="px-2 py-0.5 text-xs rounded-full font-medium"
                    style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-tertiary)" }}
                  >
                    {post.readTime}
                  </span>
                </div>
              </div>

              <p className="text-lg text-secondary mt-2 sm:mt-3 leading-relaxed">{post.desc}</p>

              <div className="flex items-center gap-4 mt-2.5">
                <div className="flex items-center gap-1.5">
                  <LuCalendar className="w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <p className="text-sm text-tertiary">{post.date}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <LuClock className="w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <p className="text-sm text-tertiary">{post.readTime}</p>
                </div>
              </div>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 text-sm text-tertiary">
                      <LuTag className="w-3.5 h-3.5 shrink-0" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </section>
  )
}
