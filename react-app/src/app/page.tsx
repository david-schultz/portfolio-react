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
import { getAllArticles } from '@/lib/articles'


type ProjectCardProps = {
  name: string
  year: string
  imageSource: string
  imageType: string
  logoSource: string
  logoName: string
  link: string
  textColor: string
  categories: string
}

let readcvSrc = "/fa/readcv.svg";

export default async function Home() {
  // Fetch articles data directly in the component
  const articles = await getAllArticles()
  
  // Group articles by category
  const categories = articles.reduce((acc, article) => {
    let category = acc.find((category) => category.name === article.category)
    if (!category) {
      category = {
        name: article.category,
        articles: [],
      }
      acc.push(category)
    }

    // Shorten content to minimize build size but allow previewing
    category.articles.push({
      ...article,
      content: article.content.slice(0, 100),
    })

    return acc
  }, [] as Category[])

  const displayedProjects: Array<ProjectCardProps> = [
    {
      "name": "TerrariumXR",
      "year": "2024",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/terrariumxr/outside-render.jpg",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
      "logoName": "University of Washington",
      "link": "/terrariumxr",
      "textColor": "white",
      "categories": "XR prototyping",
    },
    {
      "name": "Cycles",
      "year": "2024",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/cycles/hero2.jpg",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
      "logoName": "University of Washington",
      "link": "/cycles",
      "textColor": "white",
      "categories": "XR prototyping",
    },
    {
      "name": "Diversity in the Arboretum",
      "year": "2023",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/arb_cover.jpg",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-uw.png",
      "logoName": "University of Washington",
      "link": "/arboretum",
      "textColor": "white",
      "categories": "Physical data vis",
    },
    {
      "name": "sureUI Data Visualization",
      "year": "2022",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/dv/dv-cover.png",
      "imageType": "bg",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-sureify.png",
      "logoName": "Sureify",
      "link": "/datavis",
      "textColor": "black",
      "categories": "Design systems",
    },
    {
      "name": "Acquire Demo",
      "year": "2022",
      "imageSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_overview.png",
      "imageType": "block",
      "logoSource": "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-sureify.png",
      "logoName": "Sureify",
      "link": "/acquire",
      "textColor": "black",
      "categories": "UI",
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
        categories={project.categories}
      /> 
    );

  // const newscards = displayedNews.map(

  // );

  const aboutContent = (
    <div className="flex flex-col md:flex-row gap-8">
        <div className="border-b-[1.5px] border-border-base/80 w-[200px] h-[200px]">
            <Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/selfie-mirror.png"
                alt="a selfie of the soul"
                height={0}
                width={0}
                sizes="225vw"
                style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'color-burn' }}
            />
        </div>
        <div className="w-fit">
            <p>Hey, it’s nice to meet you! As a designer, it feels strange to put myself in a bucket; we’re a multi-disciplinary bunch. </p>
            <p>What I will say, is, I’m driven by __. Spatial mediums, and gestural interactions, are particular areas of interest for me.</p>
            <p>I graduated in 2024 from UW Design in Seattle. </p>
        </div>
    </div>
  );

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
    <main className="md:col-span-8">
      <Tabs id="tabs" defaultValue="write-ups" className="flex flex-col">
        <div className="flex gap-1 font-mono text-xs items-center sticky top-0 pt-16 bg-bg z-[10000]">
          
          <TabsList className="">
            <TabsTrigger value="write-ups" className="w-full">write-ups</TabsTrigger>
            <TabsTrigger value="gallery" className="w-full">gallery</TabsTrigger>
            <TabsTrigger value="about" className="w-full">about</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write-ups" className="px-2 flex flex-col items-center max-w-[900px] mt-16">
          <ul className="grid grid-cols-1 gap-4">
            { projects }
          </ul>
        </TabsContent>
        <TabsContent value="gallery" className="px-2 flex flex-col items-center max-w-[900px]">
          <ul className="grid grid-cols-1 gap-4">
            { categories
              .filter(({ articles }) => articles.some(({ visible }) => visible)) 
              .flatMap((category) => (
                <HomeCategory key={category.name || ''} category={category} />
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="about" className="px-2 flex flex-col items-center max-w-[900px]">
          <ul className="grid grid-cols-1 gap-4">
            { aboutContent }
          </ul>
        </TabsContent>
      </Tabs>
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


export type HomeCategoryProps = {
  category: Category
}

export const HomeCategory = ({
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



function ProjectCard(props: ProjectCardProps) {
  // if type is image bg
  
  return (
    <li>
      <Link href={props.link} className="flex flex-col gap-4">
        <div className="border-[1px] border-border-base/80">
          <Image 
            src={props.imageSource}
            alt="logo"
            height={0}
            width={0}
            sizes="100vw"
            className="min-w-full min-h-full w-full object-cover"
          />
        </div>

        <div className="flex">
          <div className="flex flex-col gap-1 w-full">
            <h3>{props.name}</h3>
            <p className="font-mono text-sm">{props.year} ※ {props.categories}</p>
          </div>
          <button>➡️</button>
        </div>

      </Link>
    </li>
    // <li className={`card elevation-1 relative mx-auto bg-gradient-dark-2 min-h-[250px] overflow-hidden justify-self-stretch self-stretch w-full ${props.textColor === 'white' ? 'text-white' : 'text-foreground'}`}>
    //   <Link href={props.link} >
    //       <div className="absolute inset-0 m-4 flex flex-col justify-between">
    //         <div className='flex justify-between items-start gap-2'>
    //           <div className={`px-2 py-1 ${props.textColor === 'white' ? 'glass-dark-subtle' : 'glass-subtle'}`}>
    //             <h3 className='lg:text-3xl'>{props.name}</h3>
    //           </div>
    //           <Badge className="grow-0">{props.year}</Badge>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <Image 
    //             src={props.logoSource}
    //             alt="logo"
    //             height={24}
    //             width={24}
    //             sizes="10vw"
    //             className="rounded-[10rem]"
    //           />
    //           <p className="font-500">{props.logoName}</p>
    //         </div>
    //       </div>
    //       <Image 
    //         src={props.imageSource}
    //         alt="logo"
    //         height={0}
    //         width={0}
    //         sizes="100vw"
    //         className="min-w-full min-h-full w-full object-cover"
    //       />
    //   </Link>
    // </li>
    
  )

}
