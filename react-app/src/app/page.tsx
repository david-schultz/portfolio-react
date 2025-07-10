import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import '@/app/styles.css'
import '@/lib/transform.css'
import { getAllArticles } from '@/lib/articles'
import { getAllDemos } from '@/lib/demos'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeButtons } from '@/components/ThemeButtons'
import { ArticleThumbnail } from '@/components/organisms/ArticleThumbnail'

export default async function Home() {
  // Fetch articles data directly in the component (server-side)
  const articles = await getAllArticles();
  const demos = await getAllDemos();

  return (
    <>

      <section className="md:col-span-4 flex flex-col gap-4 md:sticky md:top-0 md:py-16 self-start md:h-screen">
        <Image 
          src={'/images/star-sketch.png'}
          alt="logo"
          height={150}
          width={150}
          sizes="100vw"
          className=""
        />
        <Link href="/"><h1 className="font-serif text-tx">david schultz</h1></Link>
        <p className="flex-grow">designer who codes</p>
        <ThemeButtons />
        <p className="">© 2025</p>
      </section>


      <main className="md:col-span-8 md:pb-16 md:mt-16">
        <Tabs id="tabs" defaultValue="work" className="flex flex-col bg-bg-card border border-bd-card rounded-md">
          <div className="flex gap-1 font-mono text-xs items-center bg-bg-card z-10 border-b border-bd-card sticky top-16">
            <TabsList className="mb-8">
              <TabsTrigger value="work" className="w-full">work</TabsTrigger>
              <TabsTrigger value="demos" className="w-full">demos</TabsTrigger>
              <TabsTrigger value="about" className="w-full">about</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1">
            <TabsContent value="work" className="flex flex-col m-0">
              <ul className="grid grid-cols-1 gap-12 w-full p-4">
                { articles
                  .filter(({ visible, path }) => visible && path.startsWith('/work/'))
                  .map(({ title, subtitle, year, thumbnail, path }) => (
                    <Link key={path} className={clsx('w-full')} href={path}>
                      <ArticleThumbnail title={title} subtitle={subtitle} thumbnail={thumbnail}/>
                    </Link>
                  ))}
              </ul>
            </TabsContent>
            <TabsContent value="demos" className="flex flex-col m-0">
              <ul className="grid grid-cols-1 gap-12 w-full p-4">
                { demos
                  .filter(({ visible }) => visible)
                  .map(({ title, subtitle, year, thumbnail, path }) => (
                    <Link key={path} className={clsx('w-full')} href={path}>
                      <ArticleThumbnail title={title} subtitle={subtitle} thumbnail={thumbnail}/>
                    </Link>
                  ))}
              </ul>
            </TabsContent>
            <TabsContent value="about" className="px-6 py-4 flex flex-col items-center max-w-[900px] m-0">
              <p className="leading-7">Hi! I&apos;m a freelance interaction designer & developer. My bread-and-butter is Next.js. I am currently expanding my skillset to MCP & SwiftUI development.</p>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </>
  )
}


