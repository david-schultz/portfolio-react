"use client";
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import FeatureCard from '@/components/ui/custom/featureCard';
import { NivoDemo } from '@/components/nivo/nivoDemo';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import { InfoBox, InfoBoxHeader, InfoBoxSection } from '@/components/ui/custom/infoBox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



interface DataVisTabsProps {
  // Define props here
}

const DataVisTabs: React.FC<DataVisTabsProps> = (props) => {

  const handleTabClick = () => {

    const element = document.getElementById("tabs");
    if (element)
    {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const shouldSmoothScroll = elementTop > window.pageYOffset;
      element.scrollIntoView({ behavior: shouldSmoothScroll ? 'smooth' : 'auto' })
    }
  };

  return (
    <Tabs id="tabs" defaultValue="deliverables" className="mt-8 w-full max-w-[1200px] flex flex-col items-center">
          <TabsList className="mb-16 w-full sticky top-4 z-[10000]">
            <TabsTrigger value="deliverables" className="w-full" onClick={handleTabClick}>Deliverables</TabsTrigger>
            <TabsTrigger value="process" className="w-full" onClick={handleTabClick}>Process</TabsTrigger>
          </TabsList>

          {/* ====================================================== */}

          <TabsContent value="process" className="px-2 flex flex-col items-center max-w-[900px]">
            {/* <ScrollTo id="tabs" smooth={true}/> */}
            {/* <div className="max-w-[900px] mt-16"> */}
              <section className="flex flex-col md:flex-row">
                <div className="max-w-[600px] flex flex-col items-baseline gap-8 mb-8 md:mr-8">
                  <h1 className="text-3xl md:text-4xl">Building a component library for charts</h1>
                  <p className="text-large">At <code className="mx-1 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-md font-600">SUREIFY DESIGN</code>, the team needed a way to present data consistently throughout its product lineup. I was responsible for building a component library in Figma—this would enable designers to drag-and-drop charts into their design files, and modify them for their use-cases.</p>
                  <Button asChild>
                    <Link href="https://www.figma.com/community/file/1357811212711130745/sureui-data-visualization" target="_blank">
                      {/* Try it out <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" /> */}
                    </Link>
                  </Button>
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
                  {/* <FontAwesomeIcon icon={faBullseye} className="fa-2xl text-[#EC3C3C]" /> */}
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
                  {/* <FontAwesomeIcon icon={faUsers} className="fa-2xl text-[#3C8DEC]" /> */}
                </div>
                <div className="my-6 mb-6 max-w-[400px]">
                  <h2 className="text-2xl md:text-3xl">Understanding Stakeholders</h2>
                  <p className="mt-3 md:text-lg leading-normal">The first thing to get me on the right path was understanding who my stakeholders were, and what they needed.</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 mt-8">
                  <div className="col-span-2">
                    {/* <div className="card">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv_published-component-controls.png"
                        alt="published component controls"
                        height={0}
                        width={0}
                        sizes="225vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div> */}
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Designers</h4>
                      <p>As primary users, designers needed to be able to insert a chart in their design, and adjust it to their use-case. This meant the library needed to be:</p>
                      <ul className="list-disc pl-4">
                        <li className="mb-1"><strong>Intuitive</strong> (easy to use out-of-the-box)</li>
                        <li className="mb-1"><strong>Responsive</strong> (flex into different viewports)</li>
                        <li className="mb-1"><strong>Modifiable</strong> (sense of control over the tool)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col gap-4">
                    
                    <div className="rounded-lg bg-background p-6 text-left flex flex-col gap-3">
                      <h4>Developers</h4>
                      <p>As secondary users, developers needed to be able to easily translate designs to code.</p>
                      <p>Discussions led us to <a href="https://nivo.rocks" className="underline">nivo.rocks</a>, an open-source React library for charts. This library serves as the foundation for the one in Figma.</p>
                    </div>
                  </div>
                </div>
              </section>




              <section className="flex flex-col items-center text-center mt-24">
                <div className="mt-4 p-3 rounded-md bg-[#BF3AFE]/[0.1]">
                  {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-2xl text-[#BF3AFE]" /> */}
                </div>
                <div className="my-6 mb-6 max-w-[400px]">
                  <h2 className="text-2xl md:text-3xl">Navigating Figma’s Limits</h2>
                  <p className="mt-3 md:text-lg leading-normal">Figma, for all its strengths, is not exactly equipped for responsive data visualization.</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 mt-8">
                  <div className="col-span-2">
                    <div className="">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-basic_line_chart.png"
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
                      <h4>Responsive design in Figma</h4>
                      <p>Figma’s <span className="text-[#7D2BCE]">Auto Layout</span> property is kind of the bread-and-butter of responsive web design.</p>
                      <p>It’s a very powerful feature which allows elements to grow/shrink as its viewport is resized.</p>
                      <p>However, you quickly learn the limitations of auto layout when building a component library like this.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#F7F7F7] grid lg:grid-cols-2 gap-6 p-6 mt-8">
                    <div className="flex flex-col gap-4 p-4 text-left col-span-1">
                      <h4>Issue #1: Layering</h4>
                      <p>The fundamental problem with auto layout is that you can’t place items on top of each other in the same frame.</p>
                      <p>This creates an issue if, say, you needed data to be displayed on top of grid lines.</p>
                    </div>
                    <div className="rounded-lg bg-white overflow-clip">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-chart_anatomy-line.png"
                        alt="published component controls"
                        height={0}
                        width={0}
                        sizes="225vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                </div>
                <div className="rounded-xl bg-[#F7F7F7] grid lg:grid-cols-2 gap-6 p-6 mt-8">
                    <div className="flex flex-col gap-4 p-4 text-left col-span-1">
                      <h4>Issue #2: Alignment</h4>
                      <p>Even after figuring out a way to stack layers, how do you keep your data, grid, and labels aligned?</p>
                      <p>For example, on the right: when stacked elements don’t share the same width, they won’t line up.</p>
                    </div>
                    <div className="rounded-lg bg-white overflow-clip">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-grid_alignment.png"
                        alt="published component controls"
                        height={0}
                        width={0}
                        sizes="225vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                </div>
                <div className="rounded-xl bg-[#F7F7F7] grid lg:grid-cols-2 gap-6 p-6 mt-8">
                    <div className="flex flex-col gap-4 p-4 text-left col-span-1">
                      <h4>Issue #3: Toggles</h4>
                      <p>Ideally, a designer should be able to customize a chart for different use-cases.</p>
                      <p>Colors, rounded corners, and text are easy.</p>
                      <p>But for structural changes—like toggling an axis, or changing the amount of data shown—how do you ensure things continue to line up?</p>
                    </div>
                    <div className="rounded-lg bg-white overflow-clip">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-data_controls.png"
                        alt="published component controls"
                        height={0}
                        width={0}
                        sizes="225vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                </div>
                <div className="rounded-xl bg-[#F7F7F7] grid lg:grid-cols-2 gap-6 p-6 mt-8">
                    <div className="flex flex-col gap-4 p-4 text-left col-span-1">
                      <h4>Issue #4: Component limitations</h4>
                      <p>In a Figma component, you can’t resize or add new elements.</p>
                      <p>This is a problem for users who need to edit the shape of their data (e.g., changing the height of a bar).</p>
                      <p>The last thing you want them to do is detach the instance and lose functionality.</p>
                    </div>
                    <div className="rounded-lg bg-white overflow-clip">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-component_limitations.png"
                        alt="published component controls"
                        height={0}
                        width={0}
                        sizes="225vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                </div>
                <div className="rounded-xl bg-[#F7F7F7] grid lg:grid-cols-2 gap-6 p-6 mt-8">
                    <div className="flex flex-col gap-4 p-4 text-left col-span-1">
                      <h4>Issue #5: Complexity</h4>
                      <p>With all these issues, some pretty insane workarounds start to pop up—and they get confusing to work with, fast.</p>
                      <p>How do you keep things streamlined? Which solutions are more intuitive than others? How do you support learnability?</p>
                    </div>
                    <div className="rounded-lg bg-white overflow-clip">
                      <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-chart_anatomy.png"
                        alt="published component controls"
                        height={0}
                        width={0}
                        sizes="225vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                </div>
              </section>




              <section className="flex flex-col items-center text-center mt-24">
                <div className="mt-4 p-3 rounded-md bg-[#FE813A]/[0.1]">
                  {/* <FontAwesomeIcon icon={faHammer} className="fa-2xl text-[#FE813A]" /> */}
                </div>
                <div className="my-6 mb-6 max-w-[400px]">
                  <h2 className="text-2xl md:text-3xl">Strategies & Solutions</h2>
                  <p className="mt-3 md:text-lg leading-normal">So how do you go about implementing responsiveness?</p>
                </div>
                <div className="max-w-[388px] md:max-w-full grid md:grid-cols-2 gap-6 mt-8 text-left">
                    <div className="col-span-1 flex flex-col gap-6">
                      <div className="rounded-lg bg-background flex flex-col gap-4 p-6">
                        <h4>Utilize frame constraints</h4>
                        <p>Constraints are the only way to create responsiveness with stacked layers. Pixel perfect placement is very important here, or else scaling will not work properly.</p>
                      </div>
                      <div className="rounded-lg bg-background flex flex-col gap-4 p-6">
                        <h4>Set very specific heights & widths</h4>
                        <p>To ensure elements always line up properly, force them to maintain the same dimensions at all times.</p>
                        <p>This can be done by putting them in a noclip frame.</p>
                        <p>Note: this may cause text to overlap, which is an unfortunate, but unavoidable side-effect.</p>
                      </div>
                      <div className="rounded-lg bg-background flex flex-col gap-4 p-6">
                        <h4>Hide complexity under-the-hood</h4>
                        <p>While understanding how things work is always good for usability, there is too much going on here for a new user.</p>
                        <p>Follow Apple’s model—make it work out-of-the-box, and hide structural controls where possible.</p>
                      </div>
                      <div className="rounded-lg bg-background flex flex-col gap-4 p-6">
                        <h4>Encourage the use of ⌘ + click</h4>
                        <p>With so many layers in these components, it can be a pain to dig through them all.</p>
                        <p>As a general principle, place modifiable elements (e.g. text values or colors) at the lowest level of hierarchy to increase usability.</p>
                      </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-6">
                      <div className="rounded-lg bg-background flex flex-col gap-4 p-6">
                        <h4>Create presets</h4>
                        <p>For most use-cases, a user doesn’t need full control over the shape of their data.</p>
                        <p>Create a handful of “presets”, which make it easy to break the monotony between charts.</p>
                      </div>
                      <div className="rounded-lg bg-background flex flex-col gap-4 p-6">
                        <h4>Write good documentation</h4>
                        <p>While user testing with my team, we found that imitating examples was the easiest way to learn how to use the library.</p>
                        <p>Additionally, adding a description to each component seemed to be quite helpful.</p>
                      </div>
                      <div className="rounded-lg bg-background flex flex-col gap-4 p-6">
                        <h4>Define how to make an modification</h4>
                        <p>There are three forms of modification to the chart components:</p>
                        <ul className="list-disc pl-4 mt-2">
                          <li className="mb-3">Direct selection, where a user can select an element and modify it’s color, text content, etc.</li>
                          <li className="mb-3">Component controls, which are primarily used to modify large structural changes (e.g. visible axes, number of bar segments, etc.).</li>
                          <li className="">Show/hide an element (e.g. number of grid lines, etc.).</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-background flex flex-col gap-4 p-6">
                        <h4>Devise a naming convention</h4>
                        <p>With many different layers and sub-components in a chart, users need some way to differentiate between what they “can” and “cannot” touch.</p>
                        <ul className="list-disc pl-4 mt-2">
                          <li className="mb-3"><code className="mx-1 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-md font-600">PascalCase</code> (capital letters) indicate a component that is intended to be editable.</li>
                          <li className="mb-3"><code className="mx-1 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-md font-600">kebab-case</code> (dashes) indicate components which should not be touched. These are the “under-the-hood changes”.</li>
                        </ul>
                      </div>
                    </div>
                </div>
              </section>




              <section className="flex flex-col items-center text-center mt-24">
                <div className="mt-4 p-3 rounded-md bg-[#72C67B]/[0.1]">
                  {/* <FontAwesomeIcon icon={faFileLines} className="fa-2xl text-[#72C67B]" /> */}
                </div>
                <div className="my-6 mb-6 max-w-[400px]">
                  <h2 className="text-2xl md:text-3xl">Documentation</h2>
                  <p className="mt-3 md:text-lg">It was important that all parties involved had guidance on creating visualizations. The documentation I wrote covers:</p>
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

          {/* ====================================================== */}

          <TabsContent value="deliverables" className="px-2 flex flex-col items-center max-w-[900px]">
            {/* <ScrollTo id="tabs" smooth={true}/> */}
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
                  <Button asChild>
                    <Link href="https://www.figma.com/community/file/1357811212711130745/sureui-data-visualization" target="_blank">
                      {/* Try it out <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" /> */}
                    </Link>
                  </Button>
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
                    imagePreviewSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-drag_drop.png"
                    imageShadow={false}
                  />
                  
                  <FeatureCard
                    color="hsla(104, 65%, 63%"
                    badge="Useful"
                    h3="Translatable into code"
                    p="Component controls are mapped 1-to-1 with those in Nivo, a React library built on D3."
                    imagePreviewSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-nivo.png"
                    imageShadow={false}
                  />
                </div>
                <div className="flex flex-col gap-8 md:mt-20">
                <FeatureCard
                    color="hsla(212, 100%, 70%"
                    badge="Flexible"
                    h3="Modular architecture"
                    p="Charts support modification through various component controls, and direct selection."
                    imagePreviewSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-component_controls.png"
                    imageShadow={false}
                  />
                  <FeatureCard
                    color="hsla(284, 100%, 70%"
                    badge="Learnable"
                    h3="In-depth documentation"
                    p="Docs covering best practices, visual encoding, architecture, and hand-off support learnability."
                    imagePreviewSrc="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-docs.png"
                    imageShadow={false}
                  />
                </div>
              </section>

              <Separator className="my-4 md:hidden" />{/*————————————————————————————*/}

              <section className="flex flex-col items-center md:flex-row gap-12 md:gap-12 lg:gap-16 my-16">
                <div className="flex flex-col items-center text-center max-w-[465px] md:min-w-[334px] md:items-start md:text-left md:basis-1/2 md:mt-8">
                  <h2 className="text-xl md:text-2xl">A Figma library that actually works</h2>
                  <p className="md:text-lg mt-2 md:mt-4 mb-4 md:mb-12">Unlike existing libraries or plugins (which require heavy intervention), this library was built to be used.</p>
                  <Button asChild>
                    <Link href="https://www.figma.com/community/file/1357811212711130745/sureui-data-visualization" target="_blank">
                      {/* Try it out <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" /> */}
                    </Link>
                  </Button>
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

          
        </Tabs>
  );
};

export default DataVisTabs;