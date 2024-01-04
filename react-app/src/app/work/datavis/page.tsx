import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import '@/app/styles.css'

export default function Datavis() {
  return (
    <article className="basis-full max-w-[1200px]">
      <section>
        <Badge>Case Study</Badge>
        <Badge variant="outline">2023</Badge>
        <h1>Data Visualization</h1>
      </section>

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </article>
  )
}
