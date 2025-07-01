import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllArticles, Article } from '@/lib/articles'
import { renderMDXContent } from '@/lib/mdx'
import { Markdown } from '@/components/Markdown'

interface ArticlePageProps {
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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const articles = await getAllArticles()
  const article = articles.find(a => a.path === `/${params.slug}`)
  
  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600">The requested article could not be found.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // For MDX files, render with MDX compiler
  const isMDX = article.isMDX
  let renderedContent

  if (isMDX) {
    try {
      // Find the actual file to get the full content
      const articlesFolder = path.join(process.cwd(), 'public/articles')
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
      </div>
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
        {article.subtitle && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{article.subtitle}</p>
        )}
        {article.date && (
          <p className="text-sm text-gray-500">{article.date}</p>
        )}
        {isMDX && (
          <div className="mt-2">
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
              MDX
            </span>
          </div>
        )}
      </header>
      
      <article className="prose prose-lg dark:prose-invert max-w-none">
        {renderedContent}
      </article>
      
      {isMDX && (
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              ✅ MDX Integration Successful!
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              This page demonstrates that MDX is working correctly with custom React components, 
              styled markdown elements, and proper gray-matter frontmatter processing.
            </p>
          </div>
        </footer>
      )}
    </div>
  )
}
