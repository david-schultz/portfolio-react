'use client'

import { Sidebar, SidebarNav } from '@/components/Sidebar'
import { StickyCard, StickyCardMask } from '@/components/StickyCard'
import { useMDXContent } from '@/hooks/useMDXContent'

export default function MarkdownDemo() {
  const { renderedContent, loading, error } = useMDXContent('/demos/markdown/markdownconverter.mdx')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    )
  }

  if (!renderedContent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No content available</p>
      </div>
    )
  }

  return (
    <>

            <Sidebar>
              <SidebarNav href={'/?tab=demos'} breadcrumb={'demos'} page={'markdown'}/>
              <p>Contents</p>
              <h2 className="font-mono text-sm text-tx-tertiary mb-2">
                {renderedContent.frontmatter.title || 'Untitled'}
              </h2>
              {renderedContent.frontmatter.subtitle && (
                <p className="text-tx-secondary text-sm mb-2">
                  {renderedContent.frontmatter.subtitle}
                </p>
              )}
              {renderedContent.frontmatter.year && (
                <p className="text-tx-tertiary text-xs">
                  {renderedContent.frontmatter.year}
                </p>
              )}
              
              {renderedContent.anchors.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-mono text-xs text-tx-tertiary mb-2">Table of Contents</h3>
                  <ul className="space-y-1">
                    {renderedContent.anchors.map((anchor) => (
                      <li key={anchor.id}>
                        <a
                          href={`#${anchor.id}`}
                          className="text-xs text-tx-secondary hover:text-tx-primary transition-colors"
                        >
                          {anchor.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Sidebar>
            
            <main className="md:col-span-8">
              <StickyCardMask />
              <StickyCard>
                {/* <StickyCardNav href="/" destination="work" page ={params.slug} className="sticky top-6" /> */}
                <article className="max-w-4xl mx-auto px-8 py-8">
                  {renderedContent.content}
                </article>
              </StickyCard>
            </main>

    </>
  )
}