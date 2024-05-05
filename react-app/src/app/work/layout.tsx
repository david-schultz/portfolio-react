import Footer from '@/components/ui/custom/footer'
import SiteBar from '@/components/ui/custom/SiteBar'
import ScrollUp from '@/lib/ScrollUp'

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-stretch">
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