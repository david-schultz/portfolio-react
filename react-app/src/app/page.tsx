import Image from 'next/image'
import Link from 'next/link'
import SiteBar from '@/components/SiteBar'
import { Button } from '@/components/ui/button.tsx'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { ArrowDown } from "lucide-react"
import '@/app/styles.css'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-4 mb-32">
      <section className="mx-2 p-4 flex flex-col bg-neutral-800 rounded-b-lg">
        <SiteBar variant="inverted" />
        <div className="grow-0 my-32 flex flex-col items-center">
          <p className="mr-64 tracking-tighter text-9xl font-500 text-white">Interaction*</p>
          <p className="ml-32 tracking-tighter text-9xl font-500 text-white">Designer</p>
        </div>
        {/* <div className="flex justify-end">
          <ModeToggle />
        </div> */}
      </section>
      <section className="mx-6">
        <div className="card flex items-center py-5 px-6 gap-4">
          <Image
            src="/globe.svg"
            width={32}
            height={32}
            alt="globe icon"
          />
          <h2>Hi, I’m David—a designer, front-end dev, photographer, and DJ.</h2>
        </div>
      </section>
      <section className="mx-6">
        <div className="card flex items-center py-5 px-6 gap-4 mb-4">
          <ArrowDown size={32} />
          <Link href="/work"><h2>Work</h2></Link>
        </div>

        <ul className="grid grid-cols-2 gap-4">
          <Link href="/work/arboretum">
            <li className="card p-4">
              <h3 className="font-500">Diversity in the Arboretum</h3>
            </li>
          </Link>
          <Link href="/work/datavis">
            <li className="card p-4">
              <h3 className="font-500">sureUI Data Visualization</h3>
            </li>
          </Link>
          <Link href="/work/acquire">
            <li className="card p-4">
              <h3 className="font-500">Acquire Demo</h3>
            </li>
          </Link>
          <ProjectCard />
        </ul>
      </section>
    </main>
  )
}

function ProjectCard() {
  // if type is image bg
  const bgImage = "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/aq/aq_render-nobg.png";
  const logoImage = "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/logos/logo-sureify.png";


  
  return (
    <Link href="/work/acquire">
      <ul className="card relative max-w-xl mx-auto bg-gradient-dark-1">
        <div className="absolute inset-0 m-4 flex flex-col justify-between">
          <div className='flex justify-between'>
            <h3 className='text-white'>Acquire Demo</h3>
            <Badge>2022</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Image 
              src={ logoImage }
              alt="logo"
              height={24}
              width={24}
              sizes="50vw"
              className="rounded-[10rem]"
            />
            <p className="text-white font-500">Sureify</p>

          </div>
        </div>
        <Image 
          src={ bgImage }
          alt="logo"
          height={0}
          width={0}
          sizes="100vw"
          className="w-full bg-cover"
        />
      </ul>
    </Link>
    
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