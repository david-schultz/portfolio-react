import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown } from "lucide-react"
import '@/app/styles.css'

export default function Work() {
  return (
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
  )
}
