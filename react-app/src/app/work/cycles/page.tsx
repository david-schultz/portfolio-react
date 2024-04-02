import Image from 'next/image'
import '@/app/styles.css'
import BackgroundSetter from '@/lib/setbg'
import SiteBar from '@/components/SiteBar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export default function Cycles() {
  return (
    <main className="flex flex-col items-center">
        
      {/* <BackgroundSetter after="bg-background" /> */}
      <header className="w-full flex flex-col items-center">
        <div className="mx-2 p-4 sticky top-1 w-full">
          <SiteBar />
        </div>
        <div className="mx-4 xs:mx-8 sm:mx-16 max-w-[1200px] mt-16">
          <h1 className="mt-4 mb-4 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-500">Cycles</h1>
        </div>
      </header>

      <article className="mx-4 xs:mx-8 sm:mx-16 max-w-[900px] mt-24">
        <section className="flex flex-col md:flex-row">
          <div className="max-w-[650px] flex flex-col gap-8">
            <h1 className="text-3xl md:text-4xl">Exploring + ‘visceralizing’ an incomplete dataset</h1>
            <p className="text-large">In <code className="mx-1 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-md font-600">DESIGN 384: INFORMATION VISUALIZATION</code>, a course I took at the UW, students were asked to visualize a database of accession data from the Seattle Arboretum.</p>
          </div>
        </section>
      </article>
    </main>
  )
}
