// 'use client'

import Image from 'next/image'
import { get } from '@vercel/edge-config';
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import VideoPlayer from "@/components/VideoPlayer.tsx"
import AcquireWindow from '@/components/AcquireWindow';
import BackgroundSetter from "@/lib/setbg.tsx";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import "@/lib/bigtext.css"

export default function Acquire() {
  return (
    <article className="basis-full max-w-[1200px] mt-16">
      <BackgroundSetter after="bg-white" />
      <div className="flex gap-1">
        <Badge>Case Study</Badge>
        <Badge variant="outline">2022</Badge>
      </div>
      <h1 className="mt-2 mb-4 text-4xl sm:text-4xl md:text-5xl font-600">Acquire Demo</h1>

      <Tabs defaultValue="casestudy" className="">
        <TabsList className="mb-2">
          <TabsTrigger value="casestudy">Case Study</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="casestudy" className="w-full flex flex-col items-center">
          <div className="card"><Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_overview.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                  /></div>

          <div className="max-w-[900px] mt-16 sm:mt-24 md:mt-32">
            <section className="max-w-[600px] flex flex-col gap-8">
              <h1 className="text-3xl sm:text-4xl">Digitizing the life insurance industry</h1>
              <p className="text-large">Operating between carriers, agents, and policyholders,<code className="mx-1">SUREIFY</code>builds and whitelabels web-apps for life insurance carriers. One such product, LifetimeAcquire™, focuses on the application process—involving five distinct workflows and many different edge-cases.</p>
              <p className="text-large">In this project, our goal was to do a massive overhaul for the Acquire product—involving our new design system, brand new features, and major consideration to usability.</p>
              <Button className="self-start pb-1" variant="outline">See the final screens<FontAwesomeIcon icon={faArrowRight} className="ml-2 mb-[2px]" /></Button>
            </section>

            <Separator className="my-8" />

            <section className="flex flex-col sm:grid sm:grid-cols-2 gap-x-16 gap-y-8 sm:gap-y-12">
              <div className="flex flex-col gap-4 col-span-1">
                <h2>Building a clickable demo</h2>
                <p className="mb-2">Up until this point, the core LifetimeAcquire™ product had been heavily neglected. Our direct customer implementations had been steadily diverging, and our product pitch was very outdated.</p>
                <p><strong className="font-500">In short, Acquire was due for a refresh</strong>—and leadership decided the first step to unification would be to create a shiny new product demo, led by the pre-sales team.</p>
              </div>

              <div className="card bg-neutral-100 relative smmax:h-96 xsmax:h-64">
                <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_quote-window.png"
                  alt="quote page"
                  height={0}
                  width={0}
                  sizes="75vw"
                  className="elevation-big absolute top-4 left-[50%] -translate-x-1/2 w-[calc(100%-3rem)]"
                />
              </div>
              
              <div className="col-span-2 card bg-slate-200 h-64"></div>

              <div className="flex flex-col gap-6">
                <p>Typically, design work at Sureify was scoped by either the <strong>product team</strong> or a <strong>client team</strong>.</p>
                <p>In these situations, stakeholders were responsible for the vision and defining the path to implementation. This meant designers worked with clear specifications, and features that had already been well thought-out.</p>
              </div>
              <div className="flex flex-col gap-6">
                <p>However, this project was issued to the <strong>demo team</strong>—and it created an entirely different paradigm for us, as designers.</p>
                <p>Our work was exploratory. It was scrappy. Our job was to put rough ideas into a working prototype that we could pitch to prospective clients. Specs were drafted week-by-week, constraints were tight, and iteration needed to be rapid.</p>
              </div>

              <div className="col-span-2 my-4">
                <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_progression.png"
                  alt="progression between our reference and final product"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                  className="card"
                  />
              </div>


              <div className="flex flex-col gap-6">
                <p>I worked very closely on this project with another designer, DJ Mackintosh. Together, we built 5 distinct workflows for desktop + mobile viewports. </p>
                <p>As we adjusted to the demo paradigm, our initial task was to refresh existing screens with the new sureUI design system.</p>
                <p>This first workflow was a quote form for prospective policyholders.  Here, we encountered our first major hurdle—sureUI hadn’t yet encountered the complex form fields we needed to use. </p>
              </div>
              <div className="flex flex-col gap-6">
                <p>For example, some inputs were to be paired with long, sentence-style questions. However, existing components could only handle labels with &lt;23 characters.</p>
                <p>Our early solution was to use alternative components—but, as our devs were new to front-end, they were not feasible to implement within our tight deadlines. In response, I created a bespoke system of wrapper components which complemented both design and development constraints.</p>
              </div>

              
              <div className="col-span-2 card bg-slate-200 h-64"></div>
              <div className="col-span-2 card"><Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_mobile-form.png"
                alt="different views of the mobile form"
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                /></div>

              <p>In subsequent workflows, we moved further into unknown territory. If we were lucky, we had access to reference screens from competitors. But, to our knowledge, most of our work was novel.</p>
              <p>It was at these points where my co-designer and I were given a large amount of agency in defining both the implementation, and the purpose of features.</p>


              <div className="col-span-2 card bg-slate-200 h-64"></div>

              <div className="flex flex-col gap-6">
                <p>The idea behind OnTrack™ and e-Delivery (our final two workflows) was to give all people involved in the underwriting process a shared dashboard to track its progress.</p>
                <p>In this stage of an insurance application, a whole host of documents are written, passed around, and signed. These are called requirements, and importantly, the responsible party changes as it’s passed around.</p>
              </div>


              <div className="flex flex-col gap-6">
                <p>Requirements can be grouped in four different ways: assigned to you, assigned to someone else, completed, and upcoming.</p>
                <p>Hierarchically, the most important requirements are the current user’s action-items. The other categories exist to help users build a mental model of the rest of the underwriting process.</p>
              </div>

            </section>

          </div>
        
        </TabsContent>
        {/* ——————————————————————————————————————————————————————— */}
        <TabsContent value="gallery" className="w-full">
          <BackgroundSetter after="bg-background" before="bg-white" />

          <section className="grid grid-cols-2 gap-x-8 gap-y-8">
            <AcquireWindow src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_quote-input.png" />
            <AcquireWindow src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_quote-unavailable.png" />
            <AcquireWindow src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_quote-details.png" />
            <AcquireWindow src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_agent-quote.png" />
            <AcquireWindow src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_application-basic.png" />
            <AcquireWindow src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_application-beneficiaries.png" />
            <AcquireWindow src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_ontrack-assigned.png" />
            <AcquireWindow src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_ontrack-requirement.png" />
            <AcquireWindow src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_ontrack-uptodate.png" />
          </section>
        </TabsContent>
      </Tabs>
      
      
    </article>
  )
}
