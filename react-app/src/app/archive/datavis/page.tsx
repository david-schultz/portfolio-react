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
import ScrollTo from '@/lib/archive/ScrollTo';
import ScrollUp from '@/lib/archive/ScrollUp';
import { Scroll } from 'lucide-react';
import DataVisTabs from '@/app/archive/datavis/datavisTabs';
import ScrollButton from '@/components/ui/custom/scroll-button';
import Footer from '@/components/ui/custom/footer';

// import useWindowResize from '@/lib/useWindowResize';

// // Inside your component
// const isMobile = useWindowResize();


export default function Datavis() {
  // const [tabClicked, setTabClicked] = useState(false);

  return (
    <main className="md:col-span-8">

      <nav className="flex gap-1 font-mono text-xs sticky top-0 pt-16 bg-bg z-[10000]">
            <Button variant="tab" size="tab" asChild>
              <Link href="/">davidschultz.co</Link>
            </Button>
            <span className="border-b-[1px] border-bd/0 pt-1.5 pb-[7px] px-1 text-ic-tertiary">/</span>
            <Button variant="tab" size="tab" asChild>
              <Link href="/">write-ups</Link>
            </Button>
            <span className="border-b-[1px] border-bd/0 pt-1.5 pb-[7px] px-1 text-ic-tertiary">/</span>
            <span className="border-b-[1px] border-bd-base pt-1.5 pb-[7px] px-1 text-tx-primary">datavis</span>
      </nav>

      <article className="text-tx-body mt-16">
        <header>
          <h1 className="text-tx-primary">sureUI Data Visualization</h1>
          <h3 className="font-mono text-tx-tertiary">2022 ※ Design systems, components</h3>
          <p className="text-md">Building a “time machine” in mixed reality. This course was my first encounter with designing in XR. My team designed a new type of calendar—one that utilizes 3d-space. I was responsible for building a working prototype in Unity for the Quest 3.</p>
          <div className="card mb-4 ">
              <VideoPlayer width="600" height="400"
                videoUrl='https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-bar_animation.webm'
                gifUrl='https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-bar_animation.gif'
              />
              <small className="text-tx-tertiary">Advised by Arjan van der Vlies, Anders Houston, Patrick Schaenzel</small>
          </div>
        </header>
        <DataVisTabs />
      </article>
      <ScrollButton />
    </main>
  )
}

