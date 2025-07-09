'use client'
import Image from "next/image";
import Link from "next/link";
import ArboretumExplorer from "@/components/ArboretumExplorer"



export default function Arboretum() {
  const chartData = [10, 20, 15, 25, 30];

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
        <h1>Arboretum Explorer</h1>
        <ArboretumExplorer />

      </main>
      </>
  )
}