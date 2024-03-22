// 'use client'

// import { useState } from 'react';
import Image from 'next/image'
import { get } from '@vercel/edge-config';
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import { InfoBox, InfoBoxHeader, InfoBoxSection } from '@/components/ui/custom/infoBox'
import FeatureCard from '@/components/ui/custom/featureCard';

import VideoPlayer from "@/components/VideoPlayer.tsx"
import BackgroundSetter from "@/lib/setbg.tsx";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faBullseye, faMagnifyingGlass, faUsers, faHammer, faFileLines, faPieChart, faLineChart, faBarChart, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { NivoDemo } from '@/components/nivo/nivoDemo';
import SiteBar from '@/components/SiteBar'
import ScrollTo from '@/lib/ScrollTo';

// import useWindowResize from '@/lib/useWindowResize';

// // Inside your component
// const isMobile = useWindowResize();


export default function Datavis() {
  // const [tabClicked, setTabClicked] = useState(false);

  const handleTabClick = () => {
    const element = document.getElementById("#tabs");
    if (element) {
      element.classList.add("scrollActivated");
    }
  }


  return (
    <article className="flex flex-col items-center">
      <BackgroundSetter after="bg-white" />
      <header className="w-full flex flex-col items-center">
        <div className="mx-2 p-4 sticky top-4 w-full">
          <SiteBar />
        </div>
        <div className="mx-4 xs:mx-8 sm:mx-16 max-w-[1200px] mt-16">
          <div className="flex gap-1">
            <Badge>Case Study</Badge>
            <Badge variant="outline">2022</Badge>
          </div>
          <h1 className="mt-2 mb-4 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-500">sureUI Data Visualization</h1>

          <VideoPlayer width="600" height="400"
            videoUrl='https://firebasestorage.googleapis.com/v0/b/portfolio-95b18.appspot.com/o/casestudies%2Fdatavis%2Fvideos%2Fbarchart-demonstration.webm?alt=media&token=d46b6a27-fe9c-444c-9f89-28d3848c7d8a'
          />
        </div>
      </header>

      <main className="w-full flex flex-col items-center">
        <Tabs id="tabs" defaultValue="deliverables" className="mt-16 mx-4 xs:mx-8 sm:mx-16 w-full max-w-[1200px] flex flex-col items-center">
          <TabsList className="mb-32 w-full sticky top-4 z-[10000]">
            <TabsTrigger value="deliverables" className="w-full">Deliverables</TabsTrigger>
            <TabsTrigger value="process" className="w-full">Process</TabsTrigger>
          </TabsList>

          {/* ====================================================== */}

          <TabsContent value="deliverables" className="px-2 flex flex-col items-center max-w-[900px]">
            <ScrollTo id="tabs" smooth={true}/>
            {/* <BackgroundSetter after="bg-background" before="bg-white" /> */}
            {/* <div className="flex flex-col items-center max-w-[900px]"> */}
              <section className="flex flex-col items-center mb-16">
                <div className="text-center max-w-[500px]">
                  <p className="md:text-lg mb-3">Built with Figma & Nivo</p>
                  <h1 className="text-3xl md:text-4xl">Responsive, flexible chart components</h1>
                </div>
                <div className="mt-16">
                  <NivoDemo />
                </div>
              </section>

              <Separator className="my-4 md:hidden" />{/*————————————————————————————*/}

              <section className="flex flex-col items-center md:flex-row gap-12 md:gap-12 lg:gap-16 my-16">
                <div className="flex flex-col items-center text-center max-w-[465px] md:min-w-[334px] md:items-start md:text-left md:basis-1/2 md:mt-8">
                  <h2 className="text-xl md:text-2xl">A library by designers, for designers</h2>
                  <p className="md:text-lg mt-2 md:mt-4 mb-4 md:mb-12">Each component is built to support actual workflows, with usability, learnability, and flexibility in mind.</p>
                  <Button>Try it out <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" /></Button>
                </div>
                <div className="card md:basis-1/2 mx-16 md:mx-0">
                  <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-components.png"
                    alt=""
                    height={0}
                    width={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </section>

              <Separator className="my-4 md:hidden" />{/*————————————————————————————*/}

              <section className="flex flex-col md:flex-row gap-8 my-16">
                <div className="flex flex-col gap-8">
                  <FeatureCard
                    color="hsla(41, 95%, 66%"
                    badge="Responsive"
                    h3="Built for drag-and-drop"
                    p="Charts can be inserted into a a design file, and will responsively re-size to fit any viewport."
                    imageSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-drag_drop.png"
                    imageShadow={false}
                  />
                  
                  <FeatureCard
                    color="hsla(104, 65%, 63%"
                    badge="Useful"
                    h3="Translatable into code"
                    p="Component controls are mapped 1-to-1 with those in Nivo, a React library built on D3."
                    imageSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-nivo.png"
                    imageShadow={false}
                  />
                </div>
                <div className="flex flex-col gap-8 md:mt-20">
                <FeatureCard
                    color="hsla(212, 100%, 70%"
                    badge="Flexible"
                    h3="Modular architecture"
                    p="Charts support modification through various component controls, and direct selection."
                    imageSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-component_controls.png"
                    imageShadow={false}
                  />
                  <FeatureCard
                    color="hsla(284, 100%, 70%"
                    badge="Learnable"
                    h3="In-depth documentation"
                    p="Docs covering best practices, visual encoding, architecture, and hand-off support learnability."
                    imageSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-docs.png"
                    imageShadow={false}
                  />
                </div>
              </section>

              <Separator className="my-4 md:hidden" />{/*————————————————————————————*/}

              <section className="flex flex-col items-center md:flex-row gap-12 md:gap-12 lg:gap-16 my-16">
                <div className="flex flex-col items-center text-center max-w-[465px] md:min-w-[334px] md:items-start md:text-left md:basis-1/2 md:mt-8">
                  <h2 className="text-xl md:text-2xl">A Figma library that actually works</h2>
                  <p className="md:text-lg mt-2 md:mt-4 mb-4 md:mb-12">Unlike existing libraries or plugins (which require heavy intervention), this library was built to be used.</p>
                  <Button>Try it out <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" /></Button>
                </div>
                <div className="card md:basis-1/2 md:order-first mx-16 md:mx-0">
                  <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-comissions.png"
                    alt=""
                    height={0}
                    width={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </section>

              <Separator className="my-4" />{/*————————————————————————————*/}

              <section className="flex flex-col gap-8 my-16">
                <h2 className="text-xl md:text-2xl mb-8 text-center">Gallery</h2>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col gap-4 basis-1/2">
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-gallery-bar1.png"
                        alt=""
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-gallery-bar2.png"
                        alt=""
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 basis-1/2">
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-gallery-bar3.png"
                        alt=""
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-gallery-bar4.png"
                        alt=""
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="card">
                    <Image
                      src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-gallery-charts.png"
                      alt=""
                      height={0}
                      width={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
                </div>

                <div className="flex flex-row gap-4">
                  <div className="flex flex-col gap-4 basis-1/2">
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-gallery-pie_card.png"
                        alt=""
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-gallery-donut.png"
                        alt=""
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 basis-1/2">
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-gallery-marimekko.png"
                        alt=""
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-gallery-bar_card.png"
                        alt=""
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  </div>
                </div>
              </section>


            {/* </div> */}
          </TabsContent>

          {/* ====================================================== */}

          <TabsContent value="process" className="px-2 flex flex-col items-center max-w-[900px]">
            <ScrollTo id="tabs" smooth={true}/>
            {/* <div className="max-w-[900px] mt-16"> */}
              <section className="flex flex-col md:flex-row">
                <div className="max-w-[600px] flex flex-col gap-8 mb-8 md:mr-8">
                  <h1 className="text-3xl md:text-4xl">Building a component library for charts</h1>
                  <p className="text-large">At <code className="mx-1 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-md font-600">SUREIFY DESIGN</code>, the team needed a way to present data consistently throughout its product lineup. I was responsible for building a component library in Figma—this would enable designers to drag-and-drop charts into their design files, and modify them for their use-cases.</p>
                  <Button className="self-start">Try it out<FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" /></Button>
                </div>

                <InfoBox>
                  <InfoBoxHeader title="sureUI Data Visualization" subtitle="Feb 2022 – Sep 2022" imageSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv_cover.png" />
                  <InfoBoxSection
                    title="Details"
                    format="A"
                    dataRows={[
                      { label: 'Client', value: 'Sureify' },
                      { label: 'Role', value: 'Jr. Product Designer' },
                      { label: 'Tooling', value: 'Figma' },
                      { label: 'Domains', value: 'Design Systems, Components, Data Vis' },
                    ]}
                  />
                  <InfoBoxSection
                    title="Team"
                    format="B"
                    dataRows={[
                      { label: 'David Schultz', value: 'Designer' },
                      { label: 'Patrick Schaenzel', value: 'Design Advisor' },
                      { label: 'Arjan van der Vlies', value: 'Design Advisor' },
                      { label: 'Wasib Mohammed', value: 'Technical Architect' },
                    ]}
                  />
                </InfoBox>
              </section>
              


              <section className="flex flex-col items-center text-center mt-24">
                <div className="mt-4 p-2 md:p-3 rounded-md bg-[#EC3C3C]/[0.1]">
                  <FontAwesomeIcon icon={faBullseye} className="fa-2xl text-[#EC3C3C]" />
                </div>
                <div className="my-6 mb-6 max-w-[400px]">
                  <h2 className="text-2xl md:text-3xl">Project Goal</h2>
                  <p className="mt-3 md:text-lg leading-normal">Build a system to help designers and developers implement data visualization across Sureify’s products.</p>
                </div>

                <div className="col-span-2 card my-4">
                  <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv_published-component-controls.png"
                    alt="published component controls"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </section>




              <section className="flex flex-col items-center text-center mt-24">
                <div className="mt-4 p-3 rounded-md bg-[#3C8DEC]/[0.1]">
                  <FontAwesomeIcon icon={faUsers} className="fa-2xl text-[#3C8DEC]" />
                </div>
                <div className="my-6 mb-6 max-w-[400px]">
                  <h2 className="text-2xl md:text-3xl">Understanding Stakeholders</h2>
                  <p className="mt-3 md:text-lg leading-normal">The first thing to get me on the right path was understanding who my stakeholders were, and what they needed.</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 mt-8">
                  <div className="col-span-2">
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv_published-component-controls.png"
                        alt="published component controls"
                        height={0}
                        width={0}
                        sizes="225vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col gap-4">
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Designers</h4>
                      <p>As primary users, designers needed to be able to insert a chart in their design, and adjust it to their use-case. This meant the library needed to be:</p>
                      <ul className="list-disc pl-4">
                        <li className="mb-1"><strong>Intuitive</strong> (easy to use out-of-the-box)</li>
                        <li className="mb-1"><strong>Responsive</strong> (flex into different viewports)</li>
                        <li className="mb-1"><strong>Modifiable</strong> (sense of control over the tool)</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Developers</h4>
                      <p>As secondary users, developers needed to be able to easily translate designs to code.</p>
                      <p>Discussions led us to <a href="https://nivo.rocks" className="underline">nivo.rocks</a>, an open-source React library for charts. This library serves as the foundation for the one in Figma.</p>
                    </div>
                  </div>
                </div>
              </section>




              <section className="flex flex-col items-center text-center mt-24">
                <div className="mt-4 p-3 rounded-md bg-[#FEC73A]/[0.1]">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-2xl text-[#FEC73A]" />
                </div>
                <div className="my-6 mb-6 max-w-[400px]">
                  <h2 className="text-2xl md:text-3xl">Ideating & Defining</h2>
                  <p className="mt-3 md:text-lg leading-normal">Lorem ipsum.</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 mt-8">
                  <div className="col-span-2">
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-ideation.png"
                        alt="published component controls"
                        height={0}
                        width={0}
                        sizes="225vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col gap-4">
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Building an MVP</h4>
                      <p>I soon learned that data visualization is... very broad. The literature mainly concerns the communication of data—not so much how I could actually build a component library.</p>
                      <p>Patrick, my advisor, suggested I start by creating a few bespoke charts. This was great advice, as it helped me gather my bearings.</p>
                    </div>
                  </div>
                </div>
              </section>




              <section className="flex flex-col items-center text-center mt-24">
                <div className="mt-4 p-3 rounded-md bg-[#FE813A]/[0.1]">
                  <FontAwesomeIcon icon={faHammer} className="fa-2xl text-[#FE813A]" />
                </div>
                <div className="my-6 mb-6 max-w-[400px]">
                  <h2 className="text-2xl md:text-3xl">Prototyping & Testing</h2>
                  <p className="mt-3 md:text-lg leading-normal">Implementing responsiveness [...].</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 mt-8">
                  <div className="col-span-2">
                    <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-frame_constraints.png"
                        alt="published component controls"
                        height={0}
                        width={0}
                        sizes="225vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col gap-4">
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>The meat of it all</h4>
                      <p>Lorem ipsum</p>
                      <small className="italic">*community examples on Figma did not fit our need for responsiveness.</small>
                    </div>
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Insufficient tooling</h4>
                      <p>Figma, for all it’s strengths, is not a great tool to create chart components.</p>
                    </div>
                  </div>
                </div>
              </section>




              <section className="flex flex-col items-center text-center mt-24">
                <div className="mt-4 p-3 rounded-md bg-[#72C67B]/[0.1]">
                  <FontAwesomeIcon icon={faFileLines} className="fa-2xl text-[#72C67B]" />
                </div>
                <div className="my-6 mb-6 max-w-[400px]">
                  <h2 className="text-2xl md:text-3xl">Documentation</h2>
                  <p className="mt-3 md:text-lg">Lorem ipsum [...]. The documentation I wrote covers:</p>
                </div>
                <div className="grid md:grid-cols-5 gap-8 mt-8">
                  <div className="md:col-span-3 md:col-start-2 flex flex-col gap-4">
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Best Practices</h4>
                      <p>I had guidance from my mentor, Arjan, on setting up an internal wiki. He recommended Claus Wilke’s textbook on the <a href="https://clauswilke.com/dataviz/" className="underline">Fundamentals of Data Visualization</a> (which to this day shows up in my auto-complete).</p>
                    </div>
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Visual Encoding</h4>
                      <p>The first question when visualizing data is, what kind of chart should we use? To answer this, we should consider data types: amounts, proportions, distributions, xy relationships, etc.</p>
                      <div className="card">
                        <Image
                          src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-docs.png"
                          alt="published component controls"
                          height={0}
                          width={0}
                          sizes="225vw"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    </div>
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Color Theory</h4>
                      <p>Is it more important that colors are pretty, or that they are informative? We settled on the latter, emphasizing the use of sequential, categorical, and diverging data sets.</p>
                      <div className="card">
                        <Image
                          src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-colors.png"
                          alt="published component controls"
                          height={0}
                          width={0}
                          sizes="225vw"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    </div>
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Developer Handoff</h4>
                      <p>How does a chart go from conceptualization to production? As this question is relevant to designer, developer, and product stakeholders, this page is written to address each perspective.</p>
                      <div className="card">
                        <Image
                          src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-handoff.png"
                          alt="published component controls"
                          height={0}
                          width={0}
                          sizes="225vw"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    </div>
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Component Architecture</h4>
                      <p>Because of the requirement for responsiveness, components get complex, fast. I wrote two pages here: one outlining how to manipulate components, and one to guide further updates.</p>
                      <div className="card">
                        <Image
                          src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-docs_overview.png"
                          alt="published component controls"
                          height={0}
                          width={0}
                          sizes="225vw"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>


            {/* </div> */}
          </TabsContent>
        </Tabs>
      </main>
    </article>
  )
}

