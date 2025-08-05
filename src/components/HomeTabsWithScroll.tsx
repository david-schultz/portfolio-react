'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArticleThumbnail } from '@/components/organisms/ArticleThumbnail'
import { StickyCardHeader } from '@/components/StickyCard'

interface TabsWithScrollProps {
  articles: any[];
  demos: any[];
  defaultTab?: string;
}

export default function HomeTabsWithScroll({ articles, demos, defaultTab = 'work' }: TabsWithScrollProps) {
  const router = useRouter()

  const handleTabValueChange = (value: string) => {
    // Update URL - remove all search params for clean URLs
    router.push('/', { scroll: false })
    
    // Multiple approaches to ensure scrolling works regardless of content height
    setTimeout(() => {
      // Method 1: Direct element scrollTop (immediate)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      // Method 2: window.scrollTo with smooth behavior (for visual effect)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
      
      // Method 3: Force scroll by trying to scroll to a specific element (fallback)
      const topElement = document.querySelector('body')
      if (topElement) {
        topElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100) // Increased delay to ensure tab content has fully rendered
  }

  return (
    <Tabs 
      id="tabs" 
      defaultValue={defaultTab} 
      className="mt-12 md:mt-0 flex flex-col"
      onValueChange={handleTabValueChange}
    >
      <StickyCardHeader className="sticky top-[-81px] z-0">
        <h2 className="text-lg pl-4 pt-4">Stuff</h2>
        <p className="text-md text-tx-secondary ml-4">yeah check me out</p>
        <TabsList className="pt-4 flex items-center font-mono text-xs">
          <TabsTrigger 
            value="work" 
            className="w-full"
          >
            work
          </TabsTrigger>
          <TabsTrigger 
            value="demos" 
            className="w-full"
          >
            demos
          </TabsTrigger>
          <TabsTrigger 
            value="blog" 
            className="w-full"
          >
            blog
          </TabsTrigger>
          <TabsTrigger 
            value="about" 
            className="w-full"
          >
            about
          </TabsTrigger>
        </TabsList>
        
      </StickyCardHeader>

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
        <TabsContent value="blog" className="px-6 flex flex-col items-center max-w-[900px] m-0">
          <div className="my-4 bg-bg-secondary rounded w-full p-4 flex flex-col items-center">
            <p className="italic text-tx-secondary">Coming soon (to theaters near you)</p>
          </div>
        </TabsContent>
        <TabsContent value="about" className="px-6 flex flex-col items-center max-w-[900px] m-0">
          <div className="my-4 bg-bg-secondary rounded w-full p-4 flex flex-col items-center">
            <p className="text-tx-body">lorem ipsummmmm (sorry this is in progress) I&apos;m a freelance interaction designer & developer. My bread-and-butter is Next.js. I am currently expanding my skillset to MCP & SwiftUI development.</p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  )
}
