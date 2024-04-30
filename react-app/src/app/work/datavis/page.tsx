// 'use client'

// import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
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
import { faArrowUpRightFromSquare, faBullseye, faMagnifyingGlass, faUsers, faHammer, faFileLines, faPieChart, faLineChart, faBarChart, faChartSimple, faCamera } from '@fortawesome/free-solid-svg-icons'
import { NivoDemo } from '@/components/nivo/nivoDemo';
import SiteBar from '@/components/ui/custom/SiteBar'
import ScrollTo from '@/lib/ScrollTo';
import ScrollUp from '@/lib/ScrollUp';
import { Scroll } from 'lucide-react';
import DataVisTabs from '@/app/work/datavis/datavisTabs';

// import useWindowResize from '@/lib/useWindowResize';

// // Inside your component
// const isMobile = useWindowResize();


export default function Datavis() {
  // const [tabClicked, setTabClicked] = useState(false);

  return (
    <article className="flex flex-col items-center ">
      <BackgroundSetter after="bg-white" />
      <header className="w-full flex flex-col items-center">
        <div className="mx-2 p-4 sticky top-1 w-full">
          <SiteBar />
        </div>
        <div className="max-w-[1200px] mt-16 mx-4 xs:mx-8 sm:mx-16 ">
          <div className="flex gap-1">
            <Badge>Case Study</Badge>
            <Badge variant="outline">2022</Badge>
          </div>
          <h1 className="mt-2 mb-4 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-500">sureUI Data Visualization</h1>

          {/* <VideoPlayer width="600" height="400"
            videoUrl='https://firebasestorage.googleapis.com/v0/b/portfolio-95b18.appspot.com/o/casestudies%2Fdatavis%2Fvideos%2Fbarchart-demonstration.webm?alt=media&token=d46b6a27-fe9c-444c-9f89-28d3848c7d8a'
          /> */}
          <VideoPlayer width="600" height="400"
            videoUrl='https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-bar_animation.webm'
            gifUrl='https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-bar_animation.gif'
          />
          {/* <div className="card">
            <Image
              src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-bar_animation.gif"
              alt=""
              height={0}
              width={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div> */}
        </div>
      </header>

      <main className="flex flex-col items-center mx-4 xs:mx-8 sm:mx-16">
        <DataVisTabs />
      </main>
    </article>
  )
}

