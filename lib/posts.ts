import fs from 'fs'
import path from 'path'

// Ensure this runs at build time for static generation
const isServer = typeof window === 'undefined'

interface Post {
  slug: string
  date: string
  title: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)/
  const match = fileContent.match(frontmatterRegex)

  if (!match) {
    return null
  }

  const frontmatterText = match[1]
  const content = match[2]

  const frontmatter: any = {}
  frontmatterText.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '')
    }
  })

  return { frontmatter, content }
}

export function getAllPosts(): Post[] {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = fs.readdirSync(postsDirectory)
    const posts: Post[] = []

    for (const filename of filenames) {
      if (filename.endsWith('.mdx')) {
        const filePath = path.join(postsDirectory, filename)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        
        const parsed = parseFrontmatter(fileContent)
        if (parsed && parsed.frontmatter) {
          posts.push({
            slug: filename.replace('.mdx', ''),
            date: parsed.frontmatter.date || new Date().toISOString(),
            title: parsed.frontmatter.title || 'Untitled',
          })
        }
      }
    }

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}