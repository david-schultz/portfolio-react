import Image from 'next/image'
import SiteBar from '@/components/SiteBar'
import { Button } from '@/components/ui/button.tsx'
import { ModeToggle } from '@/components/ui/mode-toggle'
import '@/app/styles.css'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <section className="mx-2 p-8 flex flex-col bg-neutral-800 rounded-b-lg">
        {/* <SiteBar /> */}
        <SiteBar variant="inverted" />
        <div className="grow-0 my-32 flex flex-col items-center">
          <p className="mr-64 tracking-tighter text-9xl font-500 text-white">Interaction*</p>
          <p className="ml-32 tracking-tighter text-9xl font-500 text-white">Designer</p>
        </div>

      </section>
      <section className="m-16">
        <h1 className="mb-4">hi welcome to chilis</h1>
        <div className="flex gap-4">
          
          <Button>primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="subtle">subtle</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="outline">outline</Button>
          <Button variant="link">link</Button>
          <ModeToggle />
        </div>

      </section>
    </main>
  )
}
