import Image from 'next/image'
import Link from 'next/link'
import SiteBar from '@/components/SiteBar'
import { Button } from '@/components/ui/button.tsx'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { ArrowDown } from "lucide-react"
import '@/app/styles.css'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-4 mb-32">
      <section className="mx-2 p-4 flex flex-col bg-neutral-800 rounded-b-lg">
        <SiteBar variant="inverted" />
        <div className="grow-0 my-32 flex flex-col items-center">
          <p className="mr-64 tracking-tighter text-9xl font-500 text-white">Interaction*</p>
          <p className="ml-32 tracking-tighter text-9xl font-500 text-white">Designer</p>
        </div>
        {/* <div className="flex justify-end">
          <ModeToggle />
        </div> */}
      </section>
      <section className="mx-6">
        <div className="rounded-lg border-border border bg-card elevation-1 flex items-center py-5 px-6 gap-4">
          <Image
            src="/globe.svg"
            width={32}
            height={32}
            alt="globe icon"
          />
          <h2>Hi, I’m David—a designer, front-end dev, photographer, and DJ.</h2>
        </div>
      </section>
      <section className="mx-6">
        <div className="rounded-lg border-border border bg-card elevation-1 flex items-center py-5 px-6 gap-4 mb-4">
          <ArrowDown size={32} />
          <Link href="/work"><h2>Work</h2></Link>
        </div>

        <ul className="grid grid-cols-2 gap-4">
          <Link href="/work/arboretum">
            <li className="rounded-lg border-border border bg-card elevation-1
                            p-4">
              <h3 className="font-500">Diversity in the Arboretum</h3>
            </li>
          </Link>
          <Link href="/work/datavis">
            <li className="rounded-lg border-border border bg-card elevation-1
                            p-4">
              <h3 className="font-500">sureUI Data Visualization</h3>
            </li>
          </Link>
          <Link href="/work/acquire">
            <li className="rounded-lg border-border border bg-card elevation-1
                            p-4">
              <h3 className="font-500">Acquire Demo</h3>
            </li>
          </Link>
        </ul>
      </section>
    </main>
  )
}
