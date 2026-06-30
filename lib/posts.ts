import fs from 'fs'
import path from 'path'
import { parseFrontmatter, estimateReadTime } from './markdown'

export interface BlogPost {
  title: string
  desc: string
  date: string
  tags: string[]
  slug: string
  readTime: string
}

export function getAllPosts(): BlogPost[] {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = fs.readdirSync(postsDirectory)
    const posts: BlogPost[] = []

    for (const filename of filenames) {
      if (filename.endsWith('.mdx')) {
        const filePath = path.join(postsDirectory, filename)
        const fileContent = fs.readFileSync(filePath, 'utf8')

        const parsed = parseFrontmatter(fileContent)
        if (parsed) {
          const slug = filename.replace('.mdx', '')
          posts.push({
            title: String(parsed.frontmatter.title || 'Untitled'),
            desc: String(parsed.frontmatter.desc || ''),
            date: String(parsed.frontmatter.date || ''),
            tags: Array.isArray(parsed.frontmatter.tags) ? parsed.frontmatter.tags : [],
            slug,
            readTime: estimateReadTime(parsed.content),
          })
        }
      }
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function getTopBlogPosts(limit = 2): BlogPost[] {
  return getAllPosts().slice(0, limit)
}

export function getPostBySlug(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const parsed = parseFrontmatter(fileContent)
    if (!parsed) return null

    return {
      title: String(parsed.frontmatter.title || ''),
      desc: String(parsed.frontmatter.desc || ''),
      date: String(parsed.frontmatter.date || ''),
      tags: Array.isArray(parsed.frontmatter.tags) ? parsed.frontmatter.tags : [],
      content: parsed.content,
      readTime: estimateReadTime(parsed.content),
    }
  } catch {
    return null
  }
}
