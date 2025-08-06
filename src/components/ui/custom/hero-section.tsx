
'use client'
import React from 'react'
import '@/app/styles.css'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import BackgroundSetter from '@/lib/setbg'
import { Button } from '@/components/ui/button'

import SiteBar from '@/components/ui/custom/SiteBar'
import GlassScene from '@/components/3d/glassScene'
import PointScene from '@/components/3d/pointScene'

let gogglesSrc = "/fa/head-side-goggles-solid.svg";
let browserSrc = "/fa/browser-solid.svg";


interface HeroSectionProps {
  // Define the props for your component here
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="mx-2 bg-neutral-800 rounded-b-lg h-[800px] md:h-[928px]">

        <div className="absolute w-[calc(100vw-4rem)] top-[500px] md:top-[650px] px-8 sm:px-16 md:px-24 lg:px-32 ">
          <h1 className="ml-1 text-5xl text-white">Interaction Designer</h1>
          <h3 className="ml-1 text-hypergold mt-3">Seattle, WA</h3>

          <div className="flex flex-col items-start xs:flex-row gap-2 text-white mt-8">
            <div className="flex bg-foreground rounded-full py-1 px-4">
                <Image
                  src={gogglesSrc}
                  width={16}
                  height={16}
                  alt="vr goggles icon"
                  className="mr-1"
                />
                <p className="font-500">Mixed Reality</p>
                {/* <p className="font-500" style={{"leading-trim": 'both', 'text-edge': 'cap'}}>Mixed Reality</p> */}
            </div>
            <div className="flex bg-foreground rounded-full py-1 px-4">
                <Image
                  src={browserSrc}
                  width={16}
                  height={16}
                  alt="browser icon"
                  className="mr-1"
                />
                <p className="font-500">Front-end</p>
                {/* <p className="font-500 " style={{"leading-trim": 'both', 'text-edge': 'cap'}}>Front-end</p> */}
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-1 w-[calc(100vw-2rem)] p-6">
          <SiteBar variant="inverted" />
        </div>

        <div className="w-full h-[800px] md:h-[800px] top-0">
          {/* <PortalScene isRunning={isRunning} /> */}
          {/* <GlassScene /> */}
          <PointScene />
        </div>

        {/* <div className="mx-2 p-4 sticky top-1 w-full">
          <SiteBar />
        </div> */}

        {/* <div className="absolute z-1 p-6 top-[calc(100vh-32rem)] md:top-[calc(100vh-24rem)] right-16">
          <Button onClick={toggleRunning} className={isRunning ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}>{isRunning ? "Pause Sim" : "Start Sim"}</Button>
        </div> */}
      </section>
  );
};

export default HeroSection;