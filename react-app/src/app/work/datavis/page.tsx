// 'use client'

import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import React from 'react'
// import ReactPlayer from 'react-player'
import Head from 'next/head';
import { useEffect } from 'react';
import VideoPlayer from "@/components/VideoPlayer.tsx"
import BackgroundSetter from "@/lib/setbg.tsx";

import '@/app/styles.css'

export default function Datavis() {

  return (
    <article className="basis-full max-w-[1200px] mt-16">
      <BackgroundSetter after="bg-white" />
      <div className="flex gap-1">
        <Badge>Case Study</Badge>
        <Badge variant="outline">2023</Badge>
      </div>
      <h1 className="mt-4 mb-6">sureUI Data Visualization</h1>

      <Tabs defaultValue="casestudy" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="casestudy">Case Study</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="casestudy" className="w-full">
          <VideoPlayer width="600" height="400"
            videoUrl='https://firebasestorage.googleapis.com/v0/b/portfolio-95b18.appspot.com/o/casestudies%2Fdatavis%2Fvideos%2Fbarchart-demonstration.webm?alt=media&token=d46b6a27-fe9c-444c-9f89-28d3848c7d8a' />

        
        </TabsContent>
        <TabsContent value="gallery" className="w-full">
          <BackgroundSetter after="bg-background" before="bg-white" />
          
        </TabsContent>
      </Tabs>
      
      
    </article>
  )
}

