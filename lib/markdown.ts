import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { createHighlighter } from "shiki"
import type { Root, Element } from "hast"

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["javascript", "typescript", "json", "bash", "html", "css", "java", "python", "markdown", "yaml", "shell", "tsx", "jsx", "sql"],
    })
  }
  return highlighter
}

export async function renderMarkdown(content: string): Promise<string> {
  const hl = await getHighlighter()

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        class: "heading-anchor",
      },
    })
    .use(() => {
      return (tree: Root) => {
        function visit(node: Element | Root) {
          if ("tagName" in node && node.tagName === "pre") {
            const firstChild = node.children?.[0]
            if (firstChild && "tagName" in firstChild && firstChild.tagName === "code") {
              const codeNode = firstChild as Element
              const className = codeNode.properties?.className
              if (Array.isArray(className)) {
                const langClass = className.find((c) => typeof c === "string" && c.startsWith("language-"))
                if (langClass) {
                  const lang = (langClass as string).replace("language-", "") || "text"
                  const codeNodeChild = codeNode.children?.[0]
                  const code = codeNodeChild && "value" in codeNodeChild ? String((codeNodeChild as { value: string }).value) : ""
                  if (code) {
                    try {
                      const html = hl.codeToHtml(code, {
                        lang,
                        theme: "github-dark",
                      })
                      const mutableNode = node as unknown as { tagName: string; children: { type: string; value: string }[]; properties: Record<string, unknown> }
                      mutableNode.tagName = "shiki-code"
                      mutableNode.children = [{ type: "raw", value: html }]
                      mutableNode.properties = {}
                    } catch {
                      // fallback: keep original node
                    }
                  }
                }
              }
            }
          }
          if ("children" in node && Array.isArray(node.children)) {
            for (const child of node.children) {
              if (child && typeof child === "object" && "type" in child) {
                visit(child as Element | Root)
              }
            }
          }
        }
        visit(tree)
      }
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return String(result)
}

export function parseFrontmatter(fileContent: string) {
  const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!frontmatterMatch) return null

  const [, frontmatterText, content] = frontmatterMatch

  const frontmatter: Record<string, unknown> = {}
  frontmatterText.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":")
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim()
      if (key.trim() === "tags") {
        try {
          frontmatter[key.trim()] = JSON.parse(value)
        } catch {
          frontmatter[key.trim()] = []
        }
      } else {
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, "")
      }
    }
  })

  return { frontmatter, content }
}

export function estimateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}
