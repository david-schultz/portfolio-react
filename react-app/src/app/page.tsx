
import Image from 'next/image'
import Link from 'next/link'
import SiteBar from '@/components/ui/custom/SiteBar'
import SiteBarScroll from '@/components/ui/custom/SiteBar'
import { ArrowDown } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import '@/app/styles.css'
import '@/lib/transform.css'

import GlobeIcon from '@/../public/globe.svg'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUpRightFromSquare, faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile, faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import HeroSection from '@/components/ui/custom/hero-section'
import AboutSection from '@/components/ui/custom/about-section'


type ProjectCardProps = {
  name: string
  year: string
  imageSource: string
  imageType: string
  logoSource: string
  logoName: string
  link: string
  textColor: string
}



let readcvSrc = "/fa/readcv.svg";

export default function Home() {
  const displayedProjects: Array<ProjectCardProps> = [
    {
      "name": "sureUI Data Visualization",
      "year": "2022",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-cover.png",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-sureify.png",
      "logoName": "Sureify",
      "link": "/work/datavis",
      "textColor": "black"
    },
    {
      "name": "Diversity in the Arboretum",
      "year": "2023",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/arb_cover.jpg",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
      "logoName": "University of Washington",
      "link": "/work/arboretum",
      "textColor": "white"
    },
    {
      "name": "Acquire Demo",
      "year": "2022",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_render-nobg.png",
      "imageType": "block",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-sureify.png",
      "logoName": "Sureify",
      "link": "/work/acquire",
      "textColor": "white"
    },
    {
      "name": "Cycles",
      "year": "2024",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/hero.jpg",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
      "logoName": "University of Washington",
      "link": "/work/cycles",
      "textColor": "white"
    }
  ];

  // const displayedNews: Array<NewsCardProps> = [

  // ];

  const projects = displayedProjects.map(
      project => <ProjectCard 
        key={project.name}
        name={project.name}
        year={project.year}
        imageSource={project.imageSource}
        imageType={project.imageType}
        logoSource={project.logoSource}
        logoName={project.logoName}
        link={project.link}
        textColor={project.textColor}
      /> 
    );

  // const newscards = displayedNews.map(

  // );

  const marqueeContent = (
    <div className="inline-block">
      <Image
          src={ GlobeIcon }
          alt="globe icon"
          priority
          className="inline-block mx-4 mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8"
        />
      {/* <h2 className="text-xl sm:text-2xl">Designing & developing in mixed reality!</h2> */}
      <h2 className="text-xl sm:text-2xl">Hi, I’m David—a designer, developer, and hobbyist.</h2>
    </div>
  )


  return (
    <main className="min-h-screen flex flex-col gap-4 mb-32">
      <section className="mx-2 p-4 flex flex-col bg-neutral-800 rounded-b-lg">
        <SiteBar variant="inverted" />
        <div className="grow-0 my-16 sm:my-24 md:my-32 flex flex-col items-center">
          <p className="mr-10 sm:mr-16 md:mr-20 tracking-tighter text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-500 text-white">Interaction*</p>
          <p className="ml-20 sm:ml-32 md:ml-48 tracking-tighter text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-500 text-white">Designer</p>
        </div>
      </section>
      {/* <HeroSection /> */}
      <section className="mx-2">
        <div className="card pt-5 pb-1 overflow-hidden">
          <div className="marquee">
          {/* <div> */}
            { marqueeContent }
            { marqueeContent }
            { marqueeContent }
            { marqueeContent }
          </div>
        </div>
      </section>

      <div className="mx-6 flex flex-col md:flex-row md:justify-center gap-4 md:gap-8 lg:gap-16">
        <AboutSection />

        <section id="workSection" className="md:mt-0 mb-64 md:max-w-[600px]">
          <header className="card flex items-center py-4 px-5 sm:py-5 sm:px-6 gap-3 sm:gap-4 mb-4">
            <FontAwesomeIcon icon={faArrowDown} className="fa-xl" />
            <h2 className="text-xl sm:text-2xl">Work</h2>
          </header>
          <ul className="grid grid-cols-1 gap-4">
            { projects }
          </ul>
          {/* <Tabs id="tabs" defaultValue="work" className="w-full max-w-[1200px] flex flex-col items-center">
            <TabsList className="mb-4 w-full sticky top-16 z-[10000]">
              <TabsTrigger value="work" className="w-full">Work</TabsTrigger>
              <TabsTrigger value="news" className="w-full">News</TabsTrigger>
            </TabsList>

            <TabsContent value="work" className="px-2 flex flex-col items-center max-w-[900px]">
              <ul className="grid grid-cols-1 gap-4">
                { projects }
              </ul>
            </TabsContent>
            <TabsContent value="news" className="px-2 flex flex-col items-center max-w-[900px]">
              <ul className="grid grid-cols-1 gap-4">
                { newscards }
              </ul>
            </TabsContent>
          </Tabs> */}

        </section>

      </div>

      {/* <section className="mx-6 grid grid-cols-5 gap-4 sm:gap-6">

        <div className="card flex flex-col py-4 px-5 sm:py-5 sm:px-6 gap-4 sm:gap-6
                        col-span-5 md:col-span-2">
            <header className="flex items-center gap-3 sm:gap-4">
              <FontAwesomeIcon icon={faNewspaper as IconProp} className="fa-xl" />
              <h2 className="text-xl sm:text-2xl">News</h2>
            </header>
            <div>
              <Badge variant="outline">March 2024</Badge>
              <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles-demo.gif"
                    alt="gif of demo"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto',  }}
                    className="mt-2 card max-w-[250px]"
                  />
              <h4 className="mt-3 mb-1">Building an Infinite Circular Feed [devlog.02]</h4>
              <a href="https://medium.com/@schultzdavidg/building-an-infinite-circular-feed-devlog-02-12d7fafb1981" target="_blank" className="flex gap-1 items-center">
                <p className="text-sm underline">medium.com</p>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="fa-xs" />
              </a>
            </div>
        </div>
      </section> */}

      
    </main>
  )
}

// type ProjectCardProps = {
//   name: string
//   year: string
//   imageSource: string
//   imageType: string
//   logoSource: string
//   logoName: string
// }


function ProjectCard(props: ProjectCardProps) {
  // if type is image bg
  
  return (
    <li className={`card relative mx-auto bg-gradient-dark-2 min-h-[250px] overflow-hidden justify-self-stretch self-stretch w-full ${props.textColor === 'white' ? 'text-white' : 'text-foreground'}`}>
      <Link href={props.link} >
          <div className="absolute inset-0 m-4 flex flex-col justify-between">
            <div className='flex justify-between items-start gap-2'>
              <h3 className='lg:text-3xl'>{props.name}</h3>
              <Badge className="grow-0">{props.year}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Image 
                src={props.logoSource}
                alt="logo"
                height={24}
                width={24}
                sizes="10vw"
                className="rounded-[10rem]"
              />
              <p className="font-500">{props.logoName}</p>
            </div>
          </div>
          <Image 
            src={props.imageSource}
            alt="logo"
            height={0}
            width={0}
            sizes="100vw"
            className="min-w-full min-h-full w-full object-cover"
          />
      </Link>
    </li>
    
  )

  // return (
  //   <Link href="/work/acquire">
  //     <ul className="card relative max-w-xl mx-auto">
  //       <div className="absolute inset-0 m-4 flex flex-col justify-between">
  //         <div className='flex justify-between'>
  //           <h3 className='text-white'>Acquire Demo</h3>
  //           <Badge>2022</Badge>
  //         </div>
  //         <div className="flex items-center gap-2">
  //           <Image 
  //             src={ logoImage }
  //             alt="logo"
  //             height={24}
  //             width={24}
  //             sizes="50vw"
  //             className="rounded-[10rem]"
  //           />
  //           <p className="text-white font-500">Sureify</p>

  //         </div>
  //       </div>
  //       <Image 
  //         src={ bgImage }
  //         alt="logo"
  //         height={0}
  //         width={0}
  //         sizes="100vw"
  //         className="w-full bg-cover"
  //       />
  //     </ul>
  //   </Link>
    
  // )
}
