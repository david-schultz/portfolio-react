import Footer from '@/components/ui/custom/footer'
import SiteBar from '@/components/ui/custom/SiteBar'
import ScrollUp from '@/lib/ScrollUp'

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background font-serif flex flex-col items-center min-h-screen">
      <ScrollUp/>
      {/* <header className="mx-2 p-4">
        <SiteBar />
      </header> */}

      {/* <main className="mx-4 xs:mx-8 sm:mx-16 flex justify-around"> */}
        {children}
      {/* </main> */}
    </div>
  )
}