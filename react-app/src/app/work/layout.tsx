import SiteBar from '@/components/SiteBar'
import ScrollUp from '@/components/ScrollUp'

import { useEffect } from 'react';

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col gap-4 mb-32 items-stretch">
      <ScrollUp/>
      <header className="mx-2 p-4">
        <SiteBar />
      </header>

      <main className="mx-16 flex justify-around">
        {children}
      </main>
    </div>
  )
}