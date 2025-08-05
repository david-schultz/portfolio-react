// 'use client'

import Image from 'next/image'
import { get } from '@vercel/edge-config';
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import SiteBar from '@/components/ui/custom/SiteBar'
import { InfoBox, InfoBoxHeader, InfoBoxSection } from '@/components/ui/custom/infoBox'
import FeatureCard from '@/components/ui/custom/featureCard';

// import VideoPlayer from "@/components/VideoPlayer.tsx"
import AcquireWindow from '@/components/AcquireWindow';
// import BackgroundSetter from "@/lib/setbg.tsx";

import "@/lib/bigtext.css"
import ScrollButton from '@/components/ui/custom/scroll-button';
import Footer from '@/components/ui/custom/footer';

export default function Acquire() {
  return (
    <main className="flex flex-col items-center bg-repeat bg-[url('/patterns/topo-bg.png')]">
      
      {/* <BackgroundSetter after="bg-white" /> */}
      <header className="w-full flex flex-col items-center">
        <div className="mx-2 p-4 sticky top-1 w-full">
          <SiteBar />
        </div>
        <div className="mx-4 xs:mx-8 sm:mx-16 max-w-[1200px] mt-16">
          <div className="flex gap-1">
            <Badge>Case Study</Badge>
            <Badge variant="outline">2022</Badge>
          </div>
          <h1 className="mt-2 mb-4 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-500">Acquire Demo</h1>
          <div className="card"><Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_overview.png"
                    alt="acquire overview"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                    /></div>
        </div>
      </header>

      <article className="mx-4 xs:mx-8 sm:mx-16 max-w-[900px] mt-16 pb-32">
        <section className="flex flex-col md:flex-row md:gap-8">
          <div className="max-w-[600px] flex flex-col gap-8 mb-8 md:mr-8 md:mt-16">
            <h1 className="text-3xl md:text-4xl">Digitizing the life insurance industry</h1>
            <p className="text-large">Operating between carriers, agents, and policyholders,<code className="mx-1 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-md font-600">SUREIFY</code>builds and whitelabels web-apps for life insurance carriers. One such product, LifetimeAcquire™, focuses on the application process—involving five distinct workflows and many different edge-cases.</p>
            <p className="text-large">In this project, our goal was to do a massive overhaul for the Acquire product—involving our new design system, brand new features, and major consideration to usability.</p>
          </div>

          <InfoBox>
            <InfoBoxHeader title="Acquire Demo" subtitle="Jun 2022 – Sep 2022" imageSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-cover.png" />
            <InfoBoxSection
              title="Details"
              format="A"
              dataRows={[
                { label: 'Client', value: 'Sureify' },
                { label: 'Role', value: 'Jr. Product Designer' },
                { label: 'Tooling', value: 'Figma' },
                { label: 'Domains', value: 'Form Design, Design Systems, Components' },
              ]}
            />
            <InfoBoxSection
              title="Team"
              format="B"
              dataRows={[
                { label: 'David Schultz', value: 'Designer' },
                { label: 'DJ Mackintosh', value: 'Designer' },
                { label: 'Nav Badheka', value: 'Customer Delivery' },
                { label: 'Pooja Rao', value: 'Product Owner' },
                { label: 'Nancy Bush', value: 'VP Pre-Sales' },
              ]}
            />
          </InfoBox>
        </section>



        <section className="flex flex-col items-center text-center mt-12">
            <div className="mt-4 p-2 md:p-3 rounded-md bg-[#EC3C3C]/[0.1]">
              {/* <FontAwesomeIcon icon={faBullseye} className="fa-2xl text-[#EC3C3C]" /> */}
            </div>
            <div className="my-6 mb-12 max-w-[700px]">
              <h2 className="text-2xl md:text-3xl">Project Goals</h2>
            </div>
            <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-8 text-left">
              <div className="flex flex-col items-start gap-3 p-6 rounded-xl bg-[#FBC756]/[0.5]">
                <Badge className="text-foreground bg-[#FBC756]/[0.8]">01</Badge>
                <h4>Build a clickable demo</h4>
                <p>i.e., an actual webpage that Sales could use for product demos.</p>
              </div>
              <div className="flex flex-col items-start gap-3 p-6 rounded-xl bg-[#65ACFF]/[0.5]">
                <Badge className="text-foreground bg-[#65ACFF]/[0.8]">02</Badge>
                <h4>Upgrade to sureUI</h4>
                <p>LifetimeAcquire™ hadn’t seen a significant update since sureUI (our design system) was released.</p>
              </div>
              <div className="flex flex-col items-start gap-3 p-6 rounded-xl bg-[#D765FF]/[0.5]">
                <Badge className="text-foreground bg-[#D765FF]/[0.8]">03</Badge>
                <h4>Prototype new features</h4>
                <p>Sales had been selling the *idea* of new features, but they hadn’t truly been fleshed out yet.</p>
              </div>
            </div>

            
        </section>




        <section className="flex flex-col items-center text-center mt-24">
            <div className="mt-4 p-2 md:p-3 rounded-md bg-[#3C8DEC]/[0.1]">
              {/* <FontAwesomeIcon icon={faUsers} className="fa-2xl text-[#3C8DEC]" /> */}
            </div>
            <div className="my-6 mb-6 max-w-[700px]">
              <h2 className="text-2xl md:text-3xl">Navigating a new design paradigm</h2>
              <p className="mt-3 md:text-lg leading-normal">Typically, design work at Sureify was scoped by either the product team or a client team. However, this project was issued to the demo team—and it created an entirely different paradigm for us (as designers).</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mt-8">
                <div className="col-span-2">
                  <Dialog>
                    <DialogTrigger>
                      <div className="card">
                        <Image
                          src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-quote_tall.png"
                          alt=""
                          height={0}
                          width={0}
                          sizes="225vw"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-[#EEEEEE] max-w-[calc(100vw-4rem)] md:min-w-[calc(100vw-16rem)] overflow-clip">
                      <DialogDescription className="overflow-y-scroll w-full max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-8rem)]">
                          <Image
                            src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-quote_full.png"
                            alt=""
                            height={0}
                            width={0}
                            sizes="225vw"
                            style={{ width: '100%', height: 'auto' }}
                          />
                        </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="col-span-2 flex flex-col gap-4">
                  <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                    <h4>Where’s the project manager?</h4>
                    <p>You may have noticed that we didn’t have a PM on this project*.</p>
                    <p className="italic text-sm text-secondary">*...well, sort of. Nav Badheka acted as our PM, issuing tickets and coordinating with the dev + Sales teams. (he was excellent!)</p>
                  </div>
                  <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                    <h4>High levels of agency</h4>
                    <p>Without a traditional PM, it was on us (as designers) to be decisive & set the groundwork for new iterations of LifetimeAcquire™.</p>
                    <p>Our work was exploratory. It was scrappy. We took rough ideas, and molded them into a working prototype. We drafted tickets as we learned to navigate our constraints.</p>
                    <h4 className="mt-6">Quick turnarounds</h4>
                    <p>Specs were drafted week-by-week, constraints were tight, and iteration needed to be rapid. Additionally, everything we designed needed to be quick for our dev team to implement.</p>
                  </div>
                </div>
            </div>
        </section>




        <section className="flex flex-col items-center text-center mt-24">
            <div className="mt-4 p-2 md:p-3 rounded-md bg-[#3C8DEC]/[0.1]">
              {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-2xl text-[#3C8DEC]" /> */}
            </div>
            <div className="my-6 mb-6 max-w-[700px]">
              <h2 className="text-2xl md:text-3xl">Scope (4 main workflows)</h2>
              <p className="mt-3 md:text-lg leading-normal">I worked very closely on this project with another designer, DJ Mackintosh. Together, we built 4 distinct workflows for desktop + mobile viewports. </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 my-16">
              <div className="flex flex-col gap-8">
                  <FeatureCard
                    color="hsla(212, 100%, 70%"
                    badge="User Form"
                    h3="Quote Form for Policyholders"
                    p="A straightforward, 2-page form for prospective policyholders to receive a brief quote."
                    imagePreviewSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-user_quote.png"
                    imageFullSrc={[
                      "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-quote_1-full.jpg",
                      "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-quote_2-full.jpg",
                    ]}
                    imageShadow={true}
                  />
                  
                  <FeatureCard
                    color="hsla(104, 66%, 63%"
                    badge="User Form"
                    h3="Application Form"
                    p="After receiving a quote, users then fill out an extended application form."
                    imagePreviewSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-application.png"
                    imageFullSrc={[
                      "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-application_1-full.jpg",
                      "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-application_2-full.jpg",
                    ]}
                    imageShadow={true}
                  />
              </div>

              <div className="flex flex-col gap-8 md:mt-20">
                  <FeatureCard
                    color="hsla(41, 95%, 66%"
                    badge="Agent Tooling"
                    h3="Quote Tool for Agents"
                    p="A 1-page tool, formatted for power-users. Intended for agents who generate quotes on a routine basis."
                    imagePreviewSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-agent_quote.png"
                    imageFullSrc={[
                      "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-agent_quote-full.jpg",
                    ]}
                    imageShadow={true}
                  />
                  <FeatureCard
                    color="hsla(27, 98%, 47%"
                    badge="Dashboard"
                    h3="OnTrack™ & eDelivery"
                    p="Once an application is submitted, it needs to go through underwriting before approval. OnTrack™ coordinates this process."
                    imagePreviewSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-ontrack.png"
                    imageFullSrc={[
                      "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-ontrack_1-full.jpg",
                      "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-ontrack_2-full.jpg",
                      "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-ontrack_3-full.jpg",
                      "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-ontrack_4-full.jpg",
                      "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-ontrack_5-full.jpg",
                    ]}
                    imageShadow={true}
                  />
              </div>
            </div>
        </section>




        
        <section className="flex flex-col items-center text-center mt-24">
            <div className="mt-4 p-2 md:p-3 rounded-md bg-[#FE813A]/[0.1]">
              {/* <FontAwesomeIcon icon={faHammer} className="fa-2xl text-[#FE813A]" /> */}
            </div>
            <div className="my-6 mb-6 max-w-[700px]">
              <h2 className="text-2xl md:text-3xl">Upgrading to sureUI</h2>
              <p className="mt-3 md:text-lg leading-normal">As we adjusted to the demo paradigm, our initial task was to refresh existing screens with the new sureUI design system. In the first few weeks, we laid the groundwork for the layout, look, and feel of the new experience.</p>
            </div>
            <div className="card mt-4">
              <Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-quote_iteration.png"
                alt=""
                height={0}
                width={0}
                sizes="225vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="card mt-4">
              <Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-quote_mobile.png"
                alt=""
                height={0}
                width={0}
                sizes="225vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="card mt-4">
              <Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-upload.png"
                alt=""
                height={0}
                width={0}
                sizes="225vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
        </section>





        <section className="flex flex-col items-center text-center mt-24">
            <div className="mt-4 p-2 md:p-3 rounded-md bg-[#43C797]/[0.1]">
              {/* <FontAwesomeIcon icon={faClipboardList} className="fa-2xl text-[#43C797]" /> */}
            </div>
            <div className="my-6 mb-6 max-w-[700px]">
              <h2 className="text-2xl md:text-3xl">Managing complex form fields</h2>
              <p className="mt-3 md:text-lg leading-normal">Pretty quickly, we ran into our first major hurdle—sureUI hadn’t yet encountered the complex form fields necessary for insurance applications.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 mt-8">
                <div className="col-span-2">
                  <div className="card">
                    <Image
                      src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-coverage_calc.png"
                      alt=""
                      height={0}
                      width={0}
                      sizes="225vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="card mt-4 hidden md:block">
                    <Image
                      src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-form_labels.png"
                      alt=""
                      height={0}
                      width={0}
                      sizes="225vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
                <div className="col-span-2 flex flex-col gap-4">
                  <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                    <h4>Sentence-length labels</h4>
                    <p>sureUI’s form fields were conceived for simple input (e.g. a login form).</p>
                    <p>However, insurance forms often ask sentence-length questions, with necessary context behind them. This meant our existing components were woefully unequipped.</p>
                    <h4 className="mt-6">Developer constraints</h4>
                    <p>An early solution I proposed was to use alternative field components—namely, ones that use box-fill styling (as seen in Material-UI).</p>
                    <p>However, due to tight deadlines + a more novice dev team, we needed to work with what we had.</p>
                  </div>
                  <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                  <h4>In response</h4>
                    <p>I designed a system of wrapper components, which separate the field label into a separate hierarchy. These satisfied both design and development constraints.</p>
                  </div>
                  {/* <div className="card bg-background p-6 text-left flex flex-col gap-3">
                    <h4>Hindsight is 20/20</h4>
                    <p>In hindsight, these form fields would not be adequate for a final product launch. If I were to go back-in-time, I’d advocate for more visual separation between components. (Google Forms seems like a great reference)</p>
                    <p>But as a junior designer, in the thick of a (very) tangled web of constraints and tight deadlines, my solutions worked!</p>
                  </div> */}

                  <div className="card mt-4 block md:hidden">
                    <Image
                      src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-form_fields.png"
                      alt=""
                      height={0}
                      width={0}
                      sizes="225vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
            </div>
        </section>




        <section className="flex flex-col items-center text-center mt-24">
            <div className="mt-4 p-2 md:p-3 rounded-md bg-[#43C797]/[0.1]">
              {/* <FontAwesomeIcon icon={faTableColumns} className="fa-2xl text-[#43C797]" /> */}
            </div>
            <div className="my-6 mb-6 max-w-[700px]">
              <h2 className="text-2xl md:text-3xl">OnTrack™: A multi-user dashboard</h2>
              <p className="mt-3 md:text-lg leading-normal">The idea behind OnTrack™ and e-Delivery was to give all parties involved (in underwriting) a shared dashboard to track its progress.</p>
            </div>
            <div className="card mt-4"
                  style={{boxShadow: "0px 15px 15px 0px rgba(0, 0, 0, 0.10)"}}>
              <Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-ontrack_browser.png"
                alt=""
                height={0}
                width={0}
                sizes="225vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            <div className="grid md:grid-cols-4 gap-8 my-24">
                <div className="col-span-2">
                  <div className="card">
                    <Image
                      src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-pizza_tracker.png"
                      alt=""
                      height={0}
                      width={0}
                      sizes="225vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
                <div className="col-span-2 flex flex-col gap-4">
                  <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                    <h4>What is underwriting?</h4>
                    <p>At this stage of an insurance application, a number of documents (i.e. requirements) are written, passed around, and signed.</p>
                    <h4 className="mt-6">Problem: it gets confusing</h4>
                    <p>With multiple parties involved, it gets difficult to see how far along the process is, who is responsible for what, etc.</p>
                    <h4 className="mt-6">Solution: a pizza tracker!</h4>
                    <p>Sales realized that our clients needed a product/feature that addressed this issue. Something like... a pizza tracker?</p>
                    <p>This idea formed the basis for the OnTrack™ dashboard, and is where DJ & I started our ideation.</p>
                  </div>
                </div>
            </div>

            <div className="card mt-4">
              <Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-ontrack_caught_up.png"
                alt=""
                height={0}
                width={0}
                sizes="225vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="card mt-4">
              <Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-ontrack_mobile_requirements.png"
                alt=""
                height={0}
                width={0}
                sizes="225vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="card mt-4">
              <Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq-ontrack_requirement.png"
                alt=""
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
