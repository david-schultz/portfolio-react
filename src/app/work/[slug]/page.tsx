import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/articles'
import { Markdown } from '@/components/Markdown'
// import { renderMDXContentWithAnchors, AnchorData } from '@/lib/mdx'
import { renderMDXContent, AnchorData } from '@/lib/mdx'
import { ArrowLeft } from 'lucide-react'
import { StickyCard, StickyCardHeader, StickyCardMask, StickyCardNav } from '@/components/StickyCard'
import { Sidebar, SidebarNav } from '@/components/Sidebar'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles
    .filter(article => article.path.startsWith('/work/'))
    .map((article) => ({
      slug: article.path.replace('/work/', ''), // Extract just the slug part
    }))
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const articles = await getAllArticles()
  const article = articles.find(a => a.path === `/work/${slug}`)
  
  if (!article) {
    notFound()
  }

    // For MDX files, render with MDX compiler
    const isMDX = article.isMDX
    let renderedContent
    let anchors: AnchorData[] = []
  
    if (isMDX) {
      try {
        // Find the actual file to get the full content
        const articlesFolder = path.join(process.cwd(), 'public/articles/work/')
        const fileName = `${slug}.mdx`
        const filePath = path.join(articlesFolder, fileName)
        
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const { content, anchors: extractedAnchors } = await renderMDXContent(fileContent)
          // const { content, anchors: extractedAnchors } = await renderMDXContentWithAnchors(fileContent)
          renderedContent = content
          anchors = extractedAnchors
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
    <>
      <Sidebar>
        <SidebarNav href={'/'} breadcrumb={'work'} page={slug}/>
        <p>Contents</p>
        <ol className="font-mono italic text-sm space-y-1">
          {anchors.map((anchor, index) => (
            <li key={anchor.id}>
              <a 
                href={`#${anchor.id}`}
                className="text-tx-primary hover:underline"
              >
                {anchor.title}
              </a>
            </li>
          ))}
        </ol>
      </Sidebar>
      
      <main className="md:col-span-8">
        <StickyCardMask />
        <StickyCard>
          {/* <StickyCardNav href="/" destination="work" page ={params.slug} className="sticky top-6" /> */}
          <article className="max-w-4xl mx-auto px-8 py-8">
            {renderedContent}
          </article>
        </StickyCard>
      </main>
    
    </>
  )
}