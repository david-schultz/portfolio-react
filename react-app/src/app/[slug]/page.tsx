import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { Markdown } from '@/components/Markdown'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug)
  
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