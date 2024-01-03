import SiteBar from '@/components/SiteBar'
import ScrollUp from '@/components/ScrollUp'

import { useEffect } from 'react';

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen flex flex-col gap-4 mb-32">
      <ScrollUp/>
      <header className="mx-2 p-4 ">
        <SiteBar />
      </header>
      {children}
    </main>
  )
}