import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// import 'katex/dist/katex.min.css'

export type MarkdownProps = {
  markdown: string
  className?: string
}

export const Markdown = ({ markdown, className }: MarkdownProps) => (
  <ReactMarkdown
    className={clsx('prose break-words dark:prose-invert', className)}
    components={{}}
    linkTarget="_blank"
    remarkPlugins={[remarkGfm]}
  >
    {markdown}
  </ReactMarkdown>
)
