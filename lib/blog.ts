import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  date: string
  title: string
  description: string
  tags?: string[]
}

function parseFrontmatter(content: string) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!frontmatterMatch) return null

  const [, frontmatterText] = frontmatterMatch
  const frontmatter: any = {}
  
  frontmatterText.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      if (key.trim() === 'tags') {
        try {
          frontmatter[key.trim()] = JSON.parse(value)
        } catch {
          frontmatter[key.trim()] = []
        }
      } else {
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '')
      }
    }
  })

  return frontmatter
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = fs.readdirSync(postsDirectory)
    
    return filenames
      .filter(name => name.endsWith('.mdx'))
      .map(name => {
        const slug = name.replace('.mdx', '')
        const filePath = path.join(postsDirectory, name)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const frontmatter = parseFrontmatter(fileContent)
        
        return {
          slug,
          date: frontmatter?.date || new Date().toISOString(),
          title: frontmatter?.title || slug,
          description: frontmatter?.desc || '',
          tags: frontmatter?.tags || []
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}