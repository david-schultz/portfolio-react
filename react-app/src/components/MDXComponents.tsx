import { MDXProvider } from '@mdx-js/react'
import { ReactNode } from 'react'
import { Highlight, Callout } from './MDXCustomComponents'

interface MDXComponentsProps {
  children: ReactNode
}

const components = {
  // Custom components for MDX rendering
  h1: (props: any) => <h1 className="text-xl text-tx-primary" {...props} />,
  h2: (props: any) => <h2 className="text-lg text-tx-primary mb-3" {...props} />,
  h3: (props: any) => <h3 className="font-mono text-md text-tx-primary mb-2" {...props} />,
  h4: (props: any) => <h4 className="text-md text-tx-primary mb-3" {...props} />,
  h5: (props: any) => <h5 className="font-mono text-md text-tx-tertiary" {...props} />,
  h6: (props: any) => <h6 className="text-sm text-tx-tertiary" {...props} />,
  p: (props: any) => <p className="text-tx-body" {...props} />,
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4" {...props} />
  ),
  ul: (props: any) => <ul className="list-disc pl-6 mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  a: (props: any) => (
    <a 
      className="text-blue-600 dark:text-blue-400 hover:underline" 
      target="_blank" 
      rel="noopener noreferrer" 
      {...props} 
    />
  ),
  // Custom components available in MDX
  Highlight,
  Callout,
}

export function MDXComponents({ children }: MDXComponentsProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}

export default MDXComponents
