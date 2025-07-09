import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import '@/app/styles.css'
import '@/lib/transform.css'
import { getAllArticles } from '@/lib/articles'
import { getAllDemos } from '@/lib/demos'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Home() {
  // Fetch articles data directly in the component
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
        <p className="">© 2025</p>
      </section>

      <main className="md:col-span-8 md:pb-16">
        <Tabs id="tabs" defaultValue="work" className="flex flex-col">
          <div className="flex gap-1 font-mono text-xs items-center sticky top-0 pt-16 bg-bg z-[10000]">
            
            <TabsList className="">
              <TabsTrigger value="work" className="w-full">work</TabsTrigger>
              <TabsTrigger value="demos" className="w-full">demos</TabsTrigger>
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
          <TabsContent value="demos" className="px-2 flex flex-col items-center max-w-[900px] mt-16">
            <ul className="grid grid-cols-1 gap-4">
              { demos
                .filter(({ visible }) => visible)
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
          <TabsContent value="about" className="px-2 flex flex-col items-center max-w-[900px]">
            <p className="leading-7">Hi! I&apos;m a freelance interaction designer & developer. My bread-and-butter is Next.js. I am currently expanding my skillset to MCP & SwiftUI development.</p>
          </TabsContent>
        </Tabs>

      </main>
    </>
  )
}


