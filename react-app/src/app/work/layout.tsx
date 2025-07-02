// import Footer from '@/components/ui/custom/footer'
// import SiteBar from '@/components/ui/custom/SiteBar'
// import ScrollUp from '@/lib/ScrollUp'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="md:col-span-8 flex flex-col">
        <nav className="flex gap-1 font-mono text-xs items-center sticky top-0 pt-16 bg-bg z-[10000]">

            <Link href="/" className="py-2 px-4 hover:bg-bg
            inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors">
            
                <ArrowLeft size={16} />
                home / work /
            </Link>
            <span>arboretum</span>

        </nav>

      {children}

    </main>
  )
}