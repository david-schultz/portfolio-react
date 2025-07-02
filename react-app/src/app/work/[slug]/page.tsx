import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/articles'
import { Markdown } from '@/components/Markdown'
import { renderMDXContent } from '@/lib/mdx'
// import { PageProps } from '@/lib/articles'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.path.slice(1), // Remove leading slash
  }))
}

export default async function ArticlePage({ params }: PageProps) {
  const articles = await getAllArticles()
  const article = articles.find(a => a.path === `/work/${params.slug}`)
  
  if (!article) {
    notFound()
  }

    // For MDX files, render with MDX compiler
    const isMDX = article.isMDX
    let renderedContent
  
    if (isMDX) {
      try {
        // Find the actual file to get the full content
        const articlesFolder = path.join(process.cwd(), 'public/articles/work/')
        const fileName = `${params.slug}.mdx`
        const filePath = path.join(articlesFolder, fileName)
        
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const { content } = await renderMDXContent(fileContent)
          renderedContent = content
        } else {
          // Fallback to article content from database
          renderedContent = <Markdown markdown={article.content} />
        }
      } catch (error) {
        console.error('Error rendering MDX:', error)
        renderedContent = <Markdown markdown={article.content} />
      }
    } else {
      // For regular markdown, use existing Markdown component
      renderedContent = <Markdown markdown={article.content} />
    }



  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* <div className="prose prose-lg max-w-none">
        <Markdown markdown={article.content} />
      </div> */}
      {renderedContent}
    </article>
  )
}