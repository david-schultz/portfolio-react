import { ReactNode } from 'react'

interface AnchorProps {
  id: string
  children?: ReactNode
  title?: string
}

export function Anchor({ id, children, title }: AnchorProps) {
  return (
    <div id={id} className="scroll-mt-24">
      {children}
    </div>
  )
}

export default Anchor
