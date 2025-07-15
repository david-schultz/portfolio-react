import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import '@/app/styles.css'
import '@/lib/transform.css'
import { getAllArticles } from '@/lib/articles'
import { getAllDemos } from '@/lib/demos'
import { ThemeButtons } from '@/components/ThemeButtons'
import HomeTabsWithScroll from '@/components/HomeTabsWithScroll'
import { StickyCard, StickyCardMask, StickyCardNav } from '@/components/StickyCard'

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
          sizes="10vw"
          priority
          className=""
        />
        <Link href="/"><h1 className="font-serif text-tx">david schultz</h1></Link>
        <p className="flex-grow">designer who codes</p>
        <ThemeButtons />
        <p className="">© 2025</p>
      </section>


      <main className="md:col-span-8">

          <StickyCardMask />
          <StickyCard>
            {/* <StickyCardNav href="/?tab=demos" destination="demos" page ="page" /> */}
            
            <HomeTabsWithScroll articles={articles} demos={demos} />
          </StickyCard>

        {/* <div>
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


        </div> */}
      </main>
    </>
  )
}


