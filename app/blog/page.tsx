import type { Metadata } from "next"
import { Suspense } from "react"
import { getAllPosts } from "@/lib/posts"
import BlogContent from "./BlogContent"

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles about open source, web development, and programming by Priyansh Prajapat.",
  alternates: {
    canonical: "https://priyazsh.github.io/blog",
  },
  openGraph: {
    title: "Blog | Priyansh Prajapat",
    description: "Articles about open source, web development, and programming by Priyansh Prajapat.",
    url: "https://priyazsh.github.io/blog",
  },
  twitter: {
    title: "Blog | Priyansh Prajapat",
    description: "Articles about open source, web development, and programming by Priyansh Prajapat.",
  },
}

export default function Blog() {
  const posts = getAllPosts()
  return (
    <Suspense fallback={null}>
      <BlogContent posts={posts} />
    </Suspense>
  )
}
