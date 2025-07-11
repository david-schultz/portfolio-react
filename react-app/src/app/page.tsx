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


      <main className="md:col-span-8">
        <div>
            <div className="w-full sticky top-0 flex z-10 min-h-12">
              <div id="cornerLeft" className="h-[36px] w-[36px] top-[36px] overflow-hidden left-[-12px] absolute z-10">
                <div className="h-[48px] w-[48px]  left-3 top-3 absolute border border-bd-primary border-l-0 rounded-md corner-shadow"></div>
              </div>
              <div className="h-[13px] w-[calc(100%-46px)] absolute top-[36px] border-b border-bd-primary left-6 z-0 ">
                
              </div>
              <div id="cornerRight" className="h-[36px] w-[36px] top-[36px] top-12 overflow-hidden right-[-12px] absolute z-10">
                <div className="h-[48px] w-[48px] right-3  top-3 absolute border border-bd-primary border-r-0 rounded-md corner-shadow"></div>
              </div>

              <div className="w-full z-1 absolute top-0 bg-bg-base h-12 py-4">
                
              </div>
            </div>

            <Tabs id="tabs" defaultValue="work" className="mt-12 md:mt-0 flex flex-col bg-bg-card border border-t-0 border-bd-card rounded-md shadow-sm">
              <div className="w-full flex flex-col bg-bg-card border-b border-bd-card rounded-t-md sticky top-[-52px] ">
                <h2 className="text-lg pl-4 pt-4">Stuff</h2>
                <p className="text-md text-tx-secondary ml-4">yeah check me out</p>
                <TabsList className="pt-4 flex items-center font-mono text-xs">
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

        </div>
      </main>
    </>
  )
}


