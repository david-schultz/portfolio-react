
import Image from 'next/image'
import Link from 'next/link'
import SiteBar from '@/components/SiteBar'
import { ArrowDown } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import '@/app/styles.css'
import '@/lib/transform.css'

import GlobeIcon from '@/../public/globe.svg'


type ProjectCardProps = {
  name: string
  year: string
  imageSource: string
  imageType: string
  logoSource: string
  logoName: string
  link: string
}

export default function Home() {
  const displayedProjects: Array<ProjectCardProps> = [
    {
      "name": "sureUI Data Visualization",
      "year": "2021",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/arb_cover.png",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-sureify.png",
      "logoName": "Sureify",
      "link": "/work/datavis"
    },
    {
      "name": "Diversity in the Arboretum",
      "year": "2022",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/arb_cover.jpg",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
      "logoName": "University of Washington",
      "link": "/work/arboretum"
    },
    {
      "name": "Acquire Demo",
      "year": "2021",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_render-nobg.png",
      "imageType": "block",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-sureify.png",
      "logoName": "Sureify",
      "link": "/work/acquire"
    }
  ];

  const projects = displayedProjects.map(
    // const contests = allContests.map(
      project => <ProjectCard 
        key={project.name}
        name={project.name}
        year={project.year}
        imageSource={project.imageSource}
        imageType={project.imageType}
        logoSource={project.logoSource}
        logoName={project.logoName}
        link={project.link}
      /> 
    );

  const marqueeContent = (
    <div className="inline-block">
      <Image
          src={ GlobeIcon }
          alt="globe icon"
          priority
          className="inline-block mx-4 mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8"
        />
      <h2 className="text-xl sm:text-2xl">Hi, I’m David—a designer, front-end dev, and photographer.</h2>
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
      <section className="mx-6">
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
      <section className="mx-6">
        <div className="card flex items-center py-4 px-5 sm:py-5 sm:px-6 gap-3 sm:gap-4 mb-4">
          <ArrowDown size={32} />
          <h2 className="text-xl sm:text-2xl">Work</h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          { projects }
        </ul>
      </section>
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
    <li className="card relative mx-auto bg-gradient-dark-2 min-h-[250px] overflow-hidden justify-self-stretch self-stretch w-full">
      <Link href={props.link} >
          <div className="absolute inset-0 m-4 flex flex-col justify-between">
            <div className='flex justify-between items-start gap-2'>
              <h3 className='text-white mix-blend-difference lg:text-3xl'>{props.name}</h3>
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
              <p className="text-white font-500 mix-blend-difference">{props.logoName}</p>
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
