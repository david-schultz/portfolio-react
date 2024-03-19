// 'use client'

import Image from 'next/image'
import { get } from '@vercel/edge-config';
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import { InfoBox, InfoBoxHeader, InfoBoxSection } from '@/components/ui/custom/infoBox'

import VideoPlayer from "@/components/VideoPlayer.tsx"
import BackgroundSetter from "@/lib/setbg.tsx";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faBullseye, faMagnifyingGlass, faUsers, faHammer, faFileLines, faPieChart, faLineChart, faBarChart, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { NivoDemo } from '@/components/nivo/nivoDemo';

// import useWindowResize from '@/lib/useWindowResize';

// // Inside your component
// const isMobile = useWindowResize();


export default function Datavis() {
  return (
    <article className="basis-full max-w-[1200px] mt-16">
      <BackgroundSetter after="bg-white" />
      <div className="flex gap-1">
        <Badge>Case Study</Badge>
        <Badge variant="outline">2022</Badge>
      </div>
      <h1 className="mt-2 mb-4 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-500">sureUI Data Visualization</h1>

      <VideoPlayer width="600" height="400"
        videoUrl='https://firebasestorage.googleapis.com/v0/b/portfolio-95b18.appspot.com/o/casestudies%2Fdatavis%2Fvideos%2Fbarchart-demonstration.webm?alt=media&token=d46b6a27-fe9c-444c-9f89-28d3848c7d8a'
      />


      <Tabs defaultValue="deliverables" className="mt-16 flex flex-col items-center">
        <TabsList className="mb-32 w-full sticky top-4 z-[10000]">
          <TabsTrigger value="deliverables" className="w-full">Deliverables</TabsTrigger>
          <TabsTrigger value="process" className="w-full">Process</TabsTrigger>
        </TabsList>

        {/* ====================================================== */}

        <TabsContent value="deliverables" className="px-2 flex flex-col items-center max-w-[900px]">
          {/* <BackgroundSetter after="bg-background" before="bg-white" /> */}
          {/* <div className="flex flex-col items-center max-w-[900px]"> */}
            <section className="flex flex-col items-center ">
              <div className="text-center max-w-[500px]">
                <p className="md:text-lg mb-3">Built with Figma</p>
                <h1 className="text-3xl md:text-4xl">Responsive, flexible chart components</h1>
              </div>

              <div className="mt-16">
                <NivoDemo />
              </div>
            </section>
            <Separator className="my-8" />{/*————————————————————————————*/}
            <section className="flex flex-col items-center">
              {/* <div className="card p-8 w-full">
                <div className="flex flex-col gap-2 max-w-[360px]">
                  <p className="text-xl">Designed for drag-and-drop</p>
                  <p className="text-secondary">Charts can be inserted into a a design file, and will responsively re-size to fit any viewport.</p>
                </div>
              </div>

              <div className="w-full flex gap-8 mt-8">

                <div className="card p-8 w-full">
                  <div className="flex flex-col gap-2 max-w-[360px]">
                    <p className="text-xl">Modular architecture</p>
                    <p className="text-secondary">Charts support modification through various component controls, and direct selection.</p>
                  </div>
                </div>

                <div className="card p-8 w-full">
                  <div className="flex flex-col gap-2 max-w-[360px]">
                    <p className="text-xl">Translatable into code</p>
                    <p className="text-secondary">Component controls are mapped 1-to-1 with those in Nivo, and the default configuration is documented on the component itself.</p>
                  </div>
                </div>

              </div> */}
            </section>

            <Separator className="my-8" />{/*————————————————————————————*/}
            <section className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl mb-8">Lorem ipsum del tolor</p>
              <Button>Try it out <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" /></Button>
            </section>

            <Separator className="my-8" />{/*————————————————————————————*/}


          {/* </div> */}
        </TabsContent>

        {/* ====================================================== */}

        <TabsContent value="process" className="px-2 flex flex-col items-center max-w-[900px]">
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

            <Separator className="my-8" />{/*————————————————————————————*/}

            <section className="flex flex-col items-center text-center">
              <div className="mt-4 p-2 md:p-3 rounded-md bg-[#EC3C3C]/[0.1]">
                <FontAwesomeIcon icon={faBullseye} className="fa-2xl text-[#EC3C3C]" />
              </div>
              <div className="my-6 mb-6 max-w-[400px]">
                <h2 className="text-2xl md:text-4xl">Project Goal</h2>
                <p className="mt-3 md:text-lg leading-normal">Build a system to help designers and developers implement data visualization across Sureify’s products.</p>
              </div>

              <div className="col-span-2 card my-4"><Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv_published-component-controls.png"
                alt="published component controls"
                height={0}
                width={0}
                sizes="225vw"
                style={{ width: '100%', height: 'auto' }}
              /></div>
            </section>

            <Separator className="my-8" />{/*————————————————————————————*/}

            <section className="flex flex-col items-center text-center">
              <div className="mt-4 p-3 rounded-md bg-[#3C8DEC]/[0.1]">
                <FontAwesomeIcon icon={faUsers} className="fa-2xl text-[#3C8DEC]" />
              </div>
              <div className="my-6 mb-6 max-w-[400px]">
                <h2 className="text-2xl md:text-4xl">Understanding Stakeholders</h2>
                <p className="mt-3 md:text-lg leading-normal">The first thing that put me on the path was understanding who my stakeholders were, and what they needed.</p>
              </div>

            </section>

            <Separator className="my-8" />{/*————————————————————————————*/}

            <section className="flex flex-col items-center text-center">
              <div className="mt-4 p-3 rounded-md bg-[#FEC73A]/[0.1]">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-2xl text-[#FEC73A]" />
              </div>
              <div className="my-6 mb-6 max-w-[400px]">
                <h2 className="text-2xl md:text-4xl">Ideating & Defining</h2>
                <p className="mt-3 md:text-lg leading-normal">Lorem ipsum.</p>
              </div>

            </section>

            <Separator className="my-8" />{/*————————————————————————————*/}

            <section className="flex flex-col items-center text-center">
              <div className="mt-4 p-3 rounded-md bg-[#FE813A]/[0.1]">
                <FontAwesomeIcon icon={faHammer} className="fa-2xl text-[#FE813A]" />
              </div>
              <div className="my-6 mb-6 max-w-[400px]">
                <h2 className="text-2xl md:text-4xl">Prototyping & Testing</h2>
                <p className="mt-3 md:text-lg leading-normal">Implementing responsiveness [...].</p>
              </div>

            </section>

            <Separator className="my-8" />{/*————————————————————————————*/}

            <section className="flex flex-col items-center text-center">
              <div className="mt-4 p-3 rounded-md bg-[#72C67B]/[0.1]">
                <FontAwesomeIcon icon={faFileLines} className="fa-2xl text-[#72C67B]" />
              </div>
              <div className="my-6 mb-6 max-w-[400px]">
                <h2 className="text-2xl md:text-4xl">Communicating</h2>
                <p className="mt-3 md:text-lg leading-normal">Writing solid documentation [...].</p>
              </div>

            </section>


          {/* </div> */}
        </TabsContent>
      </Tabs>
    </article>
  )
}

