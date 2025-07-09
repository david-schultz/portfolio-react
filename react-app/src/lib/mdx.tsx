import { compileMDX } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Highlight, Callout, Anchor } from '@/components/MDXCustomComponents'
import VideoPlayer from '@/components/VideoPlayer'
import MarkdownConverter from '@/components/MarkdownConverter'
import Image from 'next/image'

interface Frontmatter {
  title?: string
  subtitle?: string
  date?: string
  thumbnail?: string
  order?: number | string
  visible?: boolean
}

const components = {
  // Custom components for MDX rendering
  h1: (props: any) => <h1 className="text-xl text-tx-primary" {...props} />,
  h2: (props: any) => <h2 className="text-lg text-tx-primary mb-2" {...props} />,
  h3: (props: any) => <h3 className="font-mono text-md text-tx-primary border-b-2 border-dashed border-ic-disabled pb-2 mt-8" {...props}/>,
  h4: (props: any) => <h4 className="text-md text-tx-primary mb-3" {...props} />,
  h5: (props: any) => <h5 className="font-mono text-md text-tx-tertiary pb-2" {...props} />,
  h6: (props: any) => <h6 className="text-sm text-tx-tertiary pt-1" {...props} />,
  p:  (props: any) => <p  className="text-md py-4" {...props} />,
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-2 border-ic-brand bg-bg-disabled px-6 text-md italic text-tx-secondary pb-4" {...props} />
  ),
  ul: (props: any) => <ul className="list-disc text-md pl-8 pb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal text-md pl-8 pb-4" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  a: (props: any) => (
    <a 
      className="text-blue-600 dark:text-blue-400 hover:underline" 
      target="_blank" 
      rel="noopener noreferrer" 
      {...props} 
    />
  ),
  em: (props: any) => <em className="mb-4" {...props} />,
  strong: (props: any) => <strong className="mb-4" {...props} />,
  hr: (props: any) => <hr className="my-16" {...props} />,
  img: (props: any) => <img className="border my-4" {...props} />,
  // Custom components available in MDX
  Highlight,
  Callout,
  Anchor,
  VideoPlayer,
  Button,
  Link,
  Image,
  MarkdownConverter,
}


// Function to check if content should be treated as MDX
export function isMDXContent(filePath: string): boolean {
  return filePath.endsWith('.mdx')
}

// Function to render regular markdown (fallback)
export async function renderMarkdownContent(source: string) {
  const { data, content } = matter(source)
  
  // For regular markdown, you might want to use a markdown parser
  // For now, we'll just return the raw content
  return {
    frontmatter: data as Frontmatter,
    content: <div dangerouslySetInnerHTML={{ __html: content }} />
  }
}

export interface AnchorData {
  id: string
  title: string
}

// Function to extract anchors from MDX content using proper parsing
export function extractAnchors(source: string): AnchorData[] {
  const { content } = matter(source)
  const anchors: AnchorData[] = []
  
  // Match both self-closing and regular Anchor components
  // Self-closing: <Anchor id="..." />
  // With children: <Anchor id="...">content</Anchor>
  const anchorRegex = /<Anchor\s+id=["']([^"']+)["']\s*(?:\/>|>(.*?)<\/Anchor>)/g
  
  // Reset regex lastIndex to ensure we start from the beginning
  anchorRegex.lastIndex = 0
  let match
  
  while ((match = anchorRegex.exec(content)) !== null) {
    const id = match[1]
    const childContent = match[2] // This will be undefined for self-closing tags
    
    let title: string
    
    if (childContent) {
      // Use the child content as the title
      title = childContent.trim()
    } else {
      // Format title from ID: replace dashes with spaces and capitalize first letter
      title = id.replace(/-/g, ' ')
      title = title.charAt(0).toUpperCase() + title.slice(1)
    }
    
    anchors.push({ id, title })
  }
  
  return anchors
}




export async function renderMDXContent(source: string) {
  try {
    // Use gray-matter to extract frontmatter and content
    const { data, content } = matter(source)
    const anchors = extractAnchors(source)
    
    // Compile MDX content
    const { content: compiledContent } = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: false, // Already parsed by gray-matter
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        }
      },
      components
    })

    return { 
      frontmatter: data as Frontmatter, 
      content: compiledContent,
      anchors
    }
  } catch (error) {
    console.error('Error rendering MDX content:', error)
    throw error
  }
}