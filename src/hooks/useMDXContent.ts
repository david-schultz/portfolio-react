import { useState, useEffect } from 'react'
import { renderMDXContent } from '@/lib/mdx'

interface RenderedContent {
  frontmatter: {
    title?: string
    subtitle?: string
    year?: string
  }
  content: React.ReactElement
  anchors: Array<{ id: string; title: string }>
}

export function useMDXContent(mdxPath: string) {
  const [renderedContent, setRenderedContent] = useState<RenderedContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMDXContent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Dynamically import the MDX file content
        const response = await fetch(mdxPath)
        if (!response.ok) {
          throw new Error(`Failed to fetch MDX file: ${response.statusText}`)
        }
        
        const mdxSource = await response.text()
        const rendered = await renderMDXContent(mdxSource)
        
        setRenderedContent(rendered)
      } catch (err) {
        console.error('Error loading MDX content:', err)
        setError(err instanceof Error ? err.message : 'Failed to load content')
      } finally {
        setLoading(false)
      }
    }

    loadMDXContent()
  }, [mdxPath])

  return { renderedContent, loading, error }
}
