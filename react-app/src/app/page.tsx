
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
import Footer from '@/components/ui/custom/footer'


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
      "name": "TerrariumXR",
      "year": "2024",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/terrariumxr/outside-render.jpg",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
      "logoName": "University of Washington",
      "link": "/work/terrariumxr",
      "textColor": "white"
    },
    {
      "name": "Cycles",
      "year": "2024",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/hero2.jpg",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
      "logoName": "University of Washington",
      "link": "/work/cycles",
      "textColor": "white"
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
      "name": "Acquire Demo",
      "year": "2022",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_overview.png",
      "imageType": "block",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-sureify.png",
      "logoName": "Sureify",
      "link": "/work/acquire",
      "textColor": "black"
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
      <h2 className="text-xl sm:text-2xl">Hi, I’m David—a designer, developer, and tinkerer.</h2>
    </div>
  )


  return (
    <main className="min-h-screen flex flex-col gap-4 bg-repeat bg-[url('/patterns/dot-bg2.png')]">
      <section className="flex flex-col gap-4">
        <div className="w-[100px] h-[100px] bg-red-500"></div>
        <h1 className="font-serif">david schultz</h1>
        <ul className="font-mono">
          <li>※ Interaction designer</li>
          <li>※ read.cv</li>
          <li>☞ Contact</li>
        </ul>
      </section>
      {/* <AboutSection /> */}

      <section>
        <Tabs id="tabs" defaultValue="work" className="w-full max-w-[1200px] flex flex-col items-center">
          <div className="flex gap-4">
          <span>davidschultz.co</span>
          <span>/</span>
            <TabsList className="mb-4 w-full sticky top-16 z-[10000]">
              <TabsTrigger value="work" className="w-full">write-ups</TabsTrigger>
              <TabsTrigger value="news" className="w-full">gallery</TabsTrigger>
            </TabsList>
          </div>
            

            <TabsContent value="work" className="px-2 flex flex-col items-center max-w-[900px]">
              <ul className="grid grid-cols-1 gap-4">
                { projects }
              </ul>
            </TabsContent>
            <TabsContent value="news" className="px-2 flex flex-col items-center max-w-[900px]">
              <ul className="grid grid-cols-1 gap-4">
                {/* { newscards } */}
              </ul>
            </TabsContent>
        </Tabs>
      </section>



      <div className="m-2 mt-64">
        <Footer />
      </div>
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
    <li className={`card elevation-1 relative mx-auto bg-gradient-dark-2 min-h-[250px] overflow-hidden justify-self-stretch self-stretch w-full ${props.textColor === 'white' ? 'text-white' : 'text-foreground'}`}>
      <Link href={props.link} >
          <div className="absolute inset-0 m-4 flex flex-col justify-between">
            <div className='flex justify-between items-start gap-2'>
              <div className={`px-2 py-1 ${props.textColor === 'white' ? 'glass-dark-subtle' : 'glass-subtle'}`}>
                <h3 className='lg:text-3xl'>{props.name}</h3>
              </div>
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

}
