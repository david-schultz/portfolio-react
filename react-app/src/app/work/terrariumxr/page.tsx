import Image from 'next/image'
import '@/app/styles.css'
import BackgroundSetter from '@/lib/setbg'
import SiteBar from '@/components/ui/custom/SiteBar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import VideoPlayer from "@/components/VideoPlayer.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import ScrollButton from '@/components/ui/custom/scroll-button'
import Footer from '@/components/ui/custom/footer'

export default function TerrariumXR() {
  return (
    <main className="flex flex-col items-center">
        
      <BackgroundSetter after="bg-white" />
      <header className="w-full flex flex-col items-center">
        <div className="mx-2 p-4 sticky top-1 w-full">
          <SiteBar />
        </div>
        <div className="mx-4 xs:mx-8 sm:mx-16 max-w-[1200px] mt-16">
          <div className="flex gap-1">
            <Badge>Case Study</Badge>
            <Badge variant="outline">Spring 2024</Badge>
          </div>
          <h1 className="mt-4 mb-4 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-500">TerrariumXR</h1>
          <div className="card"><Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/terrariumxr/terrariumxr-hero.jpg"
                    alt="acquire overview"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                    /></div>
        </div>
      </header>



      <article className="mx-4 xs:mx-8 sm:mx-16 max-w-[900px] mt-16 pb-32">
        <section className="grid md:grid-cols-5 gap-8 md:gap-16">
          <div className="md:col-span-3 flex flex-col gap-6 max-w-[460px]">
            <h2 className="mb-2">Exploring the possibilities of gestural interaction</h2>
            <p className="text-lg">
              For my final capstone project at the <code className="mx-1 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-md font-600">UNIVERSITY OF WASHINGTON</code>, I opted to continue learning & developing in Unity.
            </p>
            <ul className="list-disc pl-4 flex flex-col gap-2">
              <li>This project is still ongoing. I will be submitting it to the <a href="https://metaquesthackathon.devpost.com/" target="_blank" className="underline">Meta Quest Presence Platform Hackathon</a> in a couple weeks.</li>
              <li>My goal is to push the boundaries of XR hand interactions.</li>
              <li>Common consensus right now seems to be that they are tiring + hard to learn—I want to challenge these notions, by ironing out stronger design patterns.</li>
            </ul>
          </div>
          <div className="card max-h-[400px] md:max-h-none md:col-span-2">
            <Image
              src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/ocean.jpg"
              alt="a selfie of the soul"
              height={0}
              width={0}
              sizes="225vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </section>

        <Separator className="my-12" />{/*————————————————————————————*/}

        <section className="flex flex-col my-8">
          <h3>Quick Demo</h3>
          <p className="">Please note that this project is a WIP.</p>

          <div className="card mt-4">
                  <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/terrariumxr/may2-demo.gif"
                    alt="pinch + dragging vertices with hands"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
              </div>
        </section>

      </article>

      <ScrollButton />

      <div className="w-[calc(100vw-2rem)] m-2">
        <Footer />
      </div>
    </main>
  )
}
