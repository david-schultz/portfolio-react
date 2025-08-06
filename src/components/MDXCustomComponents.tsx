import { ReactNode } from 'react'
import VideoPlayer from '@/components/VideoPlayer'

interface HighlightProps {
  children: React.ReactNode
  color?: 'yellow' | 'blue' | 'green' | 'red'
}

export function Highlight({ children, color = 'yellow' }: HighlightProps) {
  const colorClasses = {
    yellow: 'bg-yellow-200 dark:bg-yellow-800',
    blue: 'bg-blue-200 dark:bg-blue-800',
    green: 'bg-green-200 dark:bg-green-800',
    red: 'bg-red-200 dark:bg-red-800',
  }

  return (
    <span className={`px-2 py-1 rounded ${colorClasses[color]}`}>
      {children}
    </span>
  )
}

interface CalloutProps {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'success' | 'error'
}

export function Callout({ children, type = 'info' }: CalloutProps) {
  const typeClasses = {
    info: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
    warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
    success: 'border-green-500 bg-green-50 dark:bg-green-950',
    error: 'border-red-500 bg-red-50 dark:bg-red-950',
  }

  return (
    <div className={`border-l-4 p-4 my-4 ${typeClasses[type]}`}>
      {children}
    </div>
  )
}

interface AnchorProps {
  id: string
  children?: ReactNode
  title?: string
}

export function Anchor({ id, children, title }: AnchorProps) {
  return (
    <div id={id} className="font-mono text-xs text-tx-disabled mb-5 scroll-mt-24">
      {children}
    </div>
  )
}


const MDXCustomComponents = {
  Highlight,
  Callout,
  Anchor,
  VideoPlayer
}

export default MDXCustomComponents
