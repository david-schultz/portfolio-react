import clsx from 'clsx'
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


import { Markdown } from '../components/Markdown'
// import { Category, PageProps } from '../lib/posts'
import { Category, PageProps } from '../lib/articles'
import { getAllSlicedArticles } from '@/lib/articles'


type ProjectCardProps = {
  title: string
  subtitle: string
  year: string
  imageSource: string
  imageType: string
}



// function ProjectCard(props: ProjectCardProps) {
//   // if type is image bg
  
//   return (
//     <li>
//       <Link href={props.link} className="flex flex-col gap-4">
//         <div className="border-[1px] border-border-base/80">
//           <Image 
//             src={props.imageSource}
//             alt="logo"
//             height={0}
//             width={0}
//             sizes="100vw"
//             className="min-w-full min-h-full w-full object-cover"
//           />
//         </div>

//         <div className="flex">
//           <div className="flex flex-col gap-1 w-full">
//             <h3>{props.name}</h3>
//             <p className="font-mono text-sm">{props.year} ※ {props.categories}</p>
//           </div>
//           <button>➡️</button>
//         </div>

//       </Link>
//     </li>
    
//   )

// }


export default async function Home() {
  // Fetch articles data directly in the component
  const sliced = true;
  const articles = await getAllSlicedArticles();


  // const displayedProjects: Array<ProjectCardProps> = [
  //   {
  //     "name": "TerrariumXR",
  //     "year": "2024",
  //     "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/terrariumxr/outside-render.jpg",
  //     "imageType": "bg",
  //     "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
  //     "logoName": "University of Washington",
  //     "link": "/work/terrariumxr",
  //     "textColor": "white",
  //     "categories": "XR prototyping",
  //   },
  //   {
  //     "name": "Cycles",
  //     "year": "2024",
  //     "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/hero2.jpg",
  //     "imageType": "bg",
  //     "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
  //     "logoName": "University of Washington",
  //     "link": "/work/cycles",
  //     "textColor": "white",
  //     "categories": "XR prototyping",
  //   },
  //   {
  //     "name": "Diversity in the Arboretum",
  //     "year": "2023",
  //     "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/arb_cover.jpg",
  //     "imageType": "bg",
  //     "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
  //     "logoName": "University of Washington",
  //     "link": "/work/arboretum",
  //     "textColor": "white",
  //     "categories": "Physical data vis",
  //   },
  //   {
  //     "name": "sureUI Data Visualization",
  //     "year": "2022",
  //     "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-cover.png",
  //     "imageType": "bg",
  //     "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-sureify.png",
  //     "logoName": "Sureify",
  //     "link": "/work/datavis",
  //     "textColor": "black",
  //     "categories": "Design systems",
  //   },
  //   {
  //     "name": "Acquire Demo",
  //     "year": "2022",
  //     "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_overview.png",
  //     "imageType": "block",
  //     "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-sureify.png",
  //     "logoName": "Sureify",
  //     "link": "/work/acquire",
  //     "textColor": "black",
  //     "categories": "UI",
  //   }
  // ];


  return (
    <>

      <div className="md:col-span-4 flex flex-col gap-4 md:sticky md:top-16 self-start">
        <div className="w-[100px] h-[100px] bg-red-500"></div>
        <Link href="/"><h1 className="font-serif text-tx">david schultz</h1></Link>
        <p>Hi! I&apos;m a freelance interaction designer & developer. My bread-and-butter is Next.js. I am currently expanding my skillset to MCP & SwiftUI development.</p>
      </div>

      <main className="md:col-span-8">
        <Tabs id="tabs" defaultValue="work" className="flex flex-col">
          <div className="flex gap-1 font-mono text-xs items-center sticky top-0 pt-16 bg-bg z-[10000]">
            
            <TabsList className="">
              <TabsTrigger value="work" className="w-full">work</TabsTrigger>
              <TabsTrigger value="gallery" className="w-full">gallery</TabsTrigger>
              <TabsTrigger value="about" className="w-full">about</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="work" className="px-2 flex flex-col items-center max-w-[900px] mt-16">
            <ul className="grid grid-cols-1 gap-4">
              { articles
                .filter(({ visible, path }) => visible && path.startsWith('/work/'))
                .map(({ title, subtitle, year, thumbnail, path }) => (
                  <Link
                    key={path}
                    className={clsx(
                      'flex flex-col gap-4'
                    )}
                    href={path}
                  >
                    <div className="border-[1px] border-border-base/80">
                      <Image 
                        src={thumbnail}
                        alt="thumbnail"
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="min-w-full min-h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex">
                      <div className="flex flex-col gap-1 w-full">
                        <h3>{title}</h3>
                        <p className="font-mono text-sm">{subtitle}</p>
                      </div>
                      <p>{year}</p>
                    </div>
                  </Link>
                ))}
            </ul>
          </TabsContent>
          <TabsContent value="gallery" className="px-2 flex flex-col items-center max-w-[900px]">
            {/* { galleryContent } */}
          </TabsContent>
          <TabsContent value="about" className="px-2 flex flex-col items-center max-w-[900px]">
            {/* { aboutContent } */}
          </TabsContent>
        </Tabs>

      </main>
    </>
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


type HomeCategoryProps = {
  category: Category
}

const HomeCategory = ({
  category: { name, articles },
}: HomeCategoryProps) => (
  <div className="flex flex-col gap-2">
    <p className="text-2xl">{name}</p>

    <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
      {articles
        .filter(({ visible }) => visible)
        .map(({ title, subtitle, content, path }) => (
          <Link
            key={path}
            className={clsx(
              'flex shrink-0 flex-col justify-between gap-6 rounded-sm border border-emerald-950 p-4',
              // Background effects
              'bg-transparent transition hover:bg-emerald-950 active:bg-emerald-900'
            )}
            href={path}
          >
            <div className="space-y-1">
              <p>{title}</p>
              <p className="text-xs italic opacity-60">{subtitle}</p>
            </div>

            {/* <Markdown
              className="pointer-events-none line-clamp-2 text-sm opacity-70"
              markdown={content}
            /> */}
            <Markdown markdown={content} />
          </Link>
        ))}
    </div>
  </div>
)

