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
              <div className="h-[36px] w-[36px] top-[36px] overflow-hidden left-[-12px] absolute z-10">
                <div className="border border-bd-primary rounded-md left-3 absolute h-[48px] w-[48px] top-3"></div>
              </div>
              <div className="absolute top-[36px] z-0 w-full h-[13px] border-b border-bd-primary w-[calc(100%-46px)] left-6">
                
              </div>
              <div className="h-[36px] w-[36px] top-[36px] top-12 overflow-hidden right-[-12px] absolute z-10">
                <div className="border border-bd-primary rounded-md right-3 absolute h-[48px] w-[48px] top-3"></div>
              </div>

              <div className="w-full z-1 absolute top-0 bg-bg-base h-12 py-4">
                
              </div>
            </div>

            <Tabs id="tabs" defaultValue="work" className="mt-12 md:mt-0 flex flex-col bg-bg-card border border-t-0 border-bd-card rounded-md overflow-clip">
              <div className="flex gap-1 font-mono text-xs items-center bg-bg-card border-b border-bd-card sticky top-12 rounded-t-md ">
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

        </div>
      </main>
    </>
  )
}


