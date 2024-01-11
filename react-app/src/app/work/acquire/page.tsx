// 'use client'

import Image from 'next/image'
import { get } from '@vercel/edge-config';
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"

import VideoPlayer from "@/components/VideoPlayer.tsx"
import BackgroundSetter from "@/lib/setbg.tsx";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export default function Acquire() {
  return (
    <article className="basis-full max-w-[1200px] mt-16">
      <BackgroundSetter after="bg-white" />
      <div className="flex gap-1">
        <Badge>Case Study</Badge>
        <Badge variant="outline">2022</Badge>
      </div>
      <h1 className="mt-2 mb-4 text-5xl font-600">Acquire Demo</h1>

      <Tabs defaultValue="casestudy" className="">
        <TabsList className="mb-2">
          <TabsTrigger value="casestudy">Case Study</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="casestudy" className="w-full flex flex-col items-center">
          <div className="card"><Image
                  src="https://fggzsvq4oc9hlhbo.public.blob.vercel-storage.com/aq_overview.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  /></div>

          <div className="max-w-[900px] mt-32">
              
            <section className="max-w-[600px] flex flex-col gap-8">
              <h1>Digitizing the life insurance industry</h1>
              <p className="text-large">Operating between carriers, agents, and policyholders,<code className="mx-1">SUREIFY</code>builds and whitelabels web-apps for life insurance carriers. One such product, LifetimeAcquire™, focuses on the application process—involving four distinct workflows and many different edge-cases.</p>
            </section>

            <Separator className="my-8" />

            <section className="grid grid-cols-2 gap-x-16 gap-y-8">
              <div>
                <p>For stakeholders, there were three goals behind developing the demo environment:</p>
                <ol className="styled">
                  <li>To create a space to rapidly ideate and test new features.</li>
                  <li>To be used when pitching LifetimeAcquire™ to prospective clients.</li>
                  <li>To unify various whitelabeled versions of the product with consistent design language.</li>
                </ol>
              </div>
              <ul>
                <li className="mb-6">We also used this as a way to try out new design methodology—in particular, something called “co-pilot designing”. This basically just means tickets are assigned to two designers, rather than just one.</li>
                <li className="mb-6">The idea was that, with such a large project involving heavy ideation, a collaborative feedback cycle would generate ideas more quickly.</li>
                <li>My co-pilot (DJ Mackintosh) and I found it pretty successful! No power-dynamics formed; rather, we grew to trust, respect, and synergize with each other’s design process.</li>
              </ul>
              <div className="col-span-2 card"><Image
                src="https://fggzsvq4oc9hlhbo.public.blob.vercel-storage.com/aq_mobile-form.png"
                alt="different views of the mobile form"
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                /></div>
              

              <h3 className="col-span-2">4 workflows</h3>
              <p>Lorem ipsum dolor sit amet consectetur. Ullamcorper ut quis pellentesque iaculis massa in at pellentesque. Semper blandit amet vitae aliquam pretium. Viverra elit viverra non justo vitae amet. Leo scelerisque commodo hac adipiscing sed ante.</p>
              <ul>
                <li className="mb-2"><strong>Responsive:</strong> In a card-based paradigm for content organization, designers work with frames that constantly change size. Components should responsively re-size into any container, with little difficulty.</li>
                <li className="mb-2"><strong>Modifiable:</strong> Non-truthy designs should not be delivered to stakeholders. As such, components should act as templates—intended to be changed. </li>
                <li><strong>Translatable to code:</strong> Each variable should map 1-to-1 with controls in code. This mapping begins with component architecture, and should be supported by clear documentation.</li>
              </ul>
              <div className="placeholder h-64 w-full bg-neutral-200"></div>
              <div className="placeholder h-64 w-full bg-neutral-200"></div>
              <h3 className="col-span-2">Documentation</h3>
              <p>A key requirement for the library was that it should support rigorous data visualization. This meant not just WCAG 2.0 compliance, but visualizations that accurately and intuitively reflect the data.</p>
              <p>For example, you wouldn’t want to present discrete data with a line chart, because the connection between data points may imply continuous data. A histogram would better serve the dataset.</p>
              <div></div>
              <p>This type of decision-making can be informed by the components, but realistically needs to be supported through external documentation.</p>
            
              <div className="flex flex-col justify-center gap-4 col-span-2">
                <div className="placeholder h-64 w-full bg-neutral-200"></div>
                <span className="text-caption">All published components</span>
              </div>
            </section>

            
            <Separator />

            <section className="grid grid-cols-2 gap-x-16 gap-y-4">
              <h2>Process</h2>
              <ul>
                <li><h3>Stakeholder Groups</h3></li>
                <li>Details and requirements were fuzzy at the beginning, so I began by defining three stakeholder groups, and talked with them to understand their needs:</li>
                <li><strong>Product:</strong> This was the team mandating the use of data visualizations. They wanted documentation to inform their decision-making, as they scoped out work.</li>
                <li><strong>Designers:</strong> Designers needed quick-and-easy chart templates that maintained consistency across use-cases. Their priority was to translate Product’s specifications quickly and consistently, with little overhead.</li>
                <li><strong>Developers:</strong> Pretty Figma files meant nothing if they couldn’t be translated into code. Developers needed charts to be rooted in a common language, code. We settled on using Nivo, an open source React library which offered high flexibility and clear documentation.</li>
              </ul>
            </section>
          </div>
        
        </TabsContent>
        <TabsContent value="gallery" className="w-full">
          <BackgroundSetter after="bg-background" before="bg-white" />
          
        </TabsContent>
      </Tabs>
      
      
    </article>
  )
}
