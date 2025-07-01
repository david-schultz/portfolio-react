import { getAllArticles } from '@/lib/articles'
import { Markdown } from '@/components/Markdown'
import { notFound } from 'next/navigation'
// import { PageProps } from '@/lib/articles'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const articles = await getAllArticles()
  const article = articles.find(a => a.path === ("/work/" + params.slug))
  
  // console.log(articles)
  console.log('Article:', params, article);
  
  if (!article) {
    notFound()
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
        {article.subtitle && (
          <p className="text-xl text-gray-600 mb-4">{article.subtitle}</p>
        )}
        <div className="text-sm text-gray-500">
          {article.category} • {article.date ? String(article.date) : 'No date'}
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <Markdown markdown={article.content} />
      </div>
    </main>
  )
}