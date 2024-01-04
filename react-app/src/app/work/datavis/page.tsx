import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import '@/app/styles.css'

export default function Datavis() {
  return (
    <article className="basis-full max-w-[1200px] mt-16">
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
        <TabsContent value="casestudy">Make changes to your account here.</TabsContent>
        <TabsContent value="gallery">Change your password here.</TabsContent>
      </Tabs>
    </article>
  )
}
