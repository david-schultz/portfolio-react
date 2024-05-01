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

export default function Cycles() {
  return (
    <main className="flex flex-col items-center">
        
      <BackgroundSetter after="bg-white" />
      {/* <header className="w-full flex flex-col items-center">
        <div className="mx-2 p-4 sticky top-1 w-full">
          <SiteBar />
        </div>
        <div className="mx-4 xs:mx-8 sm:mx-16 max-w-[1200px] mt-16">
          <h1 className="mt-4 mb-4 text-3xl sm:text-4xl md:text-5xl font-500">Cycles</h1>
          <p className="text-lg">Re-imagining the calendar in mixed reality</p>

          <div className="card mt-4 sm:mt-8">
            <Image
              src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/hero.png"
              alt="a selfie of the soul"
              height={0}
              width={0}
              sizes="225vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          <div className="grid grid-cols-6 mt-8">
            <ul className="col-span-2 flex flex-col gap-1 text-sm">
              <li className="text-xs font-600">[DETAILS]</li>
              <li>Jan 2024 – Mar 2024</li>
              <li>DESIGN 483: Advanced Interfaces</li>
              <li>Unity, Quest 3</li>
            </ul>
            <ul className="col-span-2 flex flex-col gap-1 text-sm">
              <li className="text-xs font-600">[TEAM]</li>
              <li>Nat Musenga</li>
              <li>David Schultz</li>
              <li>Emi White</li>
              <li>Maggie Zheng</li>
            </ul>
            <ul className="col-span-2 flex flex-col gap-1 text-sm">
              <li className="text-xs font-600">[RESPONSIBILITIES]</li>
              <li>Design philosophy, conceptual ideation, prototyping in ShapesXR & Unity</li>
            </ul>
          </div>
          <Separator className="my-16" /> 
        </div>
      </header> */}

      <header className="w-full flex flex-col items-center">
        <div className="mx-2 p-4 sticky top-1 w-full">
          <SiteBar />
        </div>
        <div className="mx-4 xs:mx-8 sm:mx-16 max-w-[1200px] mt-16">
          <div className="flex gap-1">
            <Badge>Case Study</Badge>
            <Badge variant="outline">Winter 2024</Badge>
          </div>
          <h1 className="mt-4 mb-4 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-500">Cycles</h1>
          <div className="card"><Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/hero.jpg"
                    alt="acquire overview"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                    /></div>
        </div>
      </header>



      <article className="mx-4 xs:mx-8 sm:mx-16 max-w-[900px] mt-16">
        <section className="grid md:grid-cols-5 gap-8 md:gap-16">
          <div className="md:col-span-3 flex flex-col gap-6 max-w-[460px]">
            <h2 className="mb-2">Mixed Reality—<br/>A new design paradigm</h2>
            <p className="text-lg">
              In <code className="mx-1 relative rounded px-[0.4rem] py-[0.2rem] bg-[#EBEBE9] text-[#FF404B] font-mono text-md font-600">DESIGN 483: ADVANCED INTERFACES</code>, 
              students were challenged with creating a <strong>“time machine”</strong> in mixed reality.
            </p>
            <ul className="list-disc pl-4 flex flex-col gap-2">
              <li>This course was my first encounter with designing in XR.</li>
              <li>My team designed a new type of calendar—one that utilizes 3d-space.</li>
              <li>I was responsible for building a <span className="font-500">working prototype</span> in Unity for the Quest 3.</li>
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

        <section className="flex flex-col">
          <h2>Prototype Demo</h2>
          <p className="text-lg mt-4 mb-8">So here’s the basic idea: <span className="font-500">“How might we represent the cyclical nature of time?”</span></p>
          {/* <VideoPlayer width="600" height="400"
              videoUrl='https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/demo.webm'
              gifUrl='https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/demo-quick.gif'
          /> */}

          <div className="card mb-6 md:mb-16">
                  <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/demo-quick.gif"
                    alt="a selfie of the soul"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16">
            <div className="flex flex-col gap-2 col-span-1">
                <div className="card mb-4">
                  <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/demo-addtask.gif"
                    alt="a selfie of the soul"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h4>Organizing by task (not event)</h4>
                <p>The big idea here is an emphasis on tasks (as opposed to events). When a user creates a task and places it on the timeline, it acts like a beacon, indicating a general vibe of what’s going on, rather than a strict outline of their day.</p>
            </div>
            <div className="flex flex-col gap-2 col-span-1">
                <div className="card mb-4">
                  <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/demo-spin.gif"
                    alt="a selfie of the soul"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h4>Breaking away from grids</h4>
                <p>In the spirit of trying new things, we deviated as far as we could from your typical, grid-based calendar. This resulted in a circular form, broken by a gap to indicate the starting- and end-points of the currently visible range of time.</p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />{/*————————————————————————————*/}

        <section className="flex flex-col my-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 mt-4">
            <div className="flex flex-col col-span-1 gap-4">
              <h2>Early iterations in form</h2>
              <p>How do you represent time, physically? One option is to lay it out as a timeline in front of you. Cut off the ends, throw on some events, and call it a day.</p>
              <p>We gave it a shot, but decided that this iteration didn't work for two main reasons; for one, a calendar doesn't need to occupy a user's full "viewport". It's probably better suited to the peripheral.</p>
              <p>Second, and more fundamentally, this linear form factor didn't feel "anchored." It didn't give you a sense of where you were in your day.</p>
            </div>
            <div className="flex flex-col col-span-1 gap-2">
              <div className="card">
                    <Image
                      src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/linear-shapesxr.png"
                      alt="video of me, prototyping with ShapesXR"
                      height={0}
                      width={0}
                      sizes="225vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
              </div>
              <p className="text-sm text-center mt-2">Linear form in ShapesXR</p>
            </div>
          </div>


          <h3 className="mt-12 mb-4">Thinking in cycles</h3>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16">
            <div className="flex flex-col col-span-1 gap-4">
              
              <p>What if, instead, we modeled it after a clock? This way, the user would always be able to relate the current time to the current cycle.</p>
            </div>
            <div className="flex flex-col col-span-1 gap-2">
              <p>We ended up really digging this idea, and coming up with a few tricks to work within the new constraints of a form that lacks a defined start/end.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 mt-4">
            <div className="flex flex-col col-span-1 gap-4">
              <div className="card">
                    <Image
                      src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/desk-sketch-2.png"
                      alt="video of me, prototyping with ShapesXR"
                      height={0}
                      width={0}
                      sizes="225vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
              </div>
              <p className="text-sm text-center mt-2">Desk sketch</p>
            </div>
            <div className="flex flex-col col-span-1 gap-2">
              <div className="card">
                    <Image
                      src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/shapesxr-cropped.png"
                      alt="video of me, prototyping with ShapesXR"
                      height={0}
                      width={0}
                      sizes="225vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
              </div>
              <p className="text-sm text-center mt-2">Cyclical form in ShapesXR</p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />{/*————————————————————————————*/}


        <section className="flex flex-col gap-4 ">

          <div className="grid md:grid-cols-2 gap-6 md:gap-16">
            <div className="flex flex-col gap-6 col-span-1">
              <div>
                <h2>Building in Unity</h2>
                <p className="text-lg mt-2 mb-4">Midway through the quarter, I decided to take the leap and buy a Quest 3.</p>
              </div>
              <div className="card">
                  <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/maggie_shapesxr.gif"
                    alt="Maggie giving a demo of a prototype in ShapesXR"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
              </div>
              <p className="text-caption text-center">Maggie giving a demo</p>
            </div>
            <div className="flex flex-col gap-6 col-span-1">
              {/* <div className="card">
                <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/selfie.jpg"
                  alt="a selfie of the soul"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <p className="text-caption text-center">I’m very glad I did!</p> */}
              <div className="card mt-4">
                <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/david_shapesxr.gif"
                  alt="video of me, prototyping with ShapesXR"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <p className="text-caption text-center">Me, prototyping with ShapesXR in class</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 mt-16">
            <div className="flex flex-col col-span-1">
              <h3>The Challenge:<br/>an Infinite Circular Feed™</h3>
              <p className="font-500 mt-6 mb-1">Brief Context</p>
              <p>It turns out, learning to build in Unity isn’t too difficult! It’s pretty intuitive OOP in C#, and <a href="https://developer.oculus.com/documentation/unity/unity-gs-overview/" target="_blank" className='underline'>Meta’s XR All-in-One SDK</a> (software dev kit) makes it really easy to set up basic apps.</p>
              <p className="font-500 mt-6 mb-1">A Programming Challenge</p>
              <p>The real difficulty was figuring out how to engineer a system that behaves like an infinite feed, in a 3-dimensional environment.</p>
            </div>
            <div className="flex flex-col gap-6 col-span-1">
             <div className="card">
                <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/feed-diagram.png"
                  alt="a selfie of the soul"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          <div className="flex p-8 bg-background rounded-sm my-4">
            <p className="text-lg border-l-4 pl-6"><span className="font-500">TLDR;</span> The rotating surface should behave like an infinite feed. As the surface is rotated, objects should (1) disappear as they “move into” the gap. Conversely, objects should (2) appear as they “come out” of the gap.</p>
          </div>

          <h3>Strategy</h3>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 mt-4">
            <div className="flex flex-col col-span-1 gap-2">
              <h4>The Problem</h4>
              <p>So what makes this problem so difficult?</p>
              <ol className="list-decimal pl-6 flex flex-col gap-3 mt-4">
                <li>We’re dealing with non-euclidean space here. Let’s say the ring spins clockwise, and an object crosses 3° + disappears. What happens when it then crosses 36°? If this was normal geometry, you would expect it to re-appear… but in our case, it shouldn’t.</li>
                <li>Let’s say it spins clockwise, and a green object appears as it crosses 36°. How does the system know to make it appear at that angle?</li>
                <li>How are the objects stored on the timeline? What kind of data structure do they live in, is a List good enough?</li>
              </ol>
            </div>
            <div className="flex flex-col col-span-1 gap-2">
              <h4>Approach</h4>
              <p>Overall, abstract the <span className="italic">content</span> away from their <span className="italic">representations</span>.</p>
              <ol className="list-decimal pl-6 flex flex-col gap-3 mt-4">
                <li>Find a data structure to represent the timeline. Objects are sorted by DateTime.</li>
                <li>Select a range that represents the visible/active time. Update the range as the user spins the timeline.</li>
                <li>Convert DateTime values to euler angles.</li>
                <li>Show/hide items as they move in and out of the active range.</li>
              </ol>
            </div>
          </div>
        </section>
      </article>

      <ScrollButton />
    </main>
  )
}
