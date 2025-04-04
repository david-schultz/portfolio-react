import Image from 'next/image'
import Link from 'next/link'
import '@/app/styles.css'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <main className="w-full max-w-[64rem] p-4 sm:p-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-4 flex flex-col gap-4">
        <div className="w-[100px] h-[100px] bg-red-500"></div>
        <Link href="/"><h1>david schultz</h1></Link>
        <ul className="font-mono italic flex flex-col gap-2">
            <li className="flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/about"><span className="w-4">※</span>Interaction designer</Link>
                </Button>
            
            
            </li>
            <li className="flex gap-2"><span className="w-4">※</span>read.cv</li>
            <li className="flex gap-2"><span className="w-4">☞</span>Contact</li>
        </ul>
        </section>
        {/* <AboutSection /> */}

        <section className="md:col-span-8">
            <div className="text-sm font-mono text-tx-primary flex gap-1 mb-4 p-1">
              <button className="hover:bg-bg-hover border-b-[1.5px] border-bd/0 pt-1.5 pb-[7px] px-1">
                <Link href="/">davidschultz.co</Link>
              </button>
              <span className="border-b-[1.5px] border-bd/0 pt-1.5 pb-[7px] px-1">/</span>
              <span className="pt-1.5 pb-[7px] px-1 text-sm font-mono border-b-[1.5px] border-bd-primary">about</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="border-b-[1.5px] border-border-base/80 w-[200px] h-[200px]">
                    <Image
                        src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/selfie-mirror.png"
                        alt="a selfie of the soul"
                        height={0}
                        width={0}
                        sizes="225vw"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'color-burn' }}
                    />
                </div>
                <div className="w-fit">
                    <p>Hey, it’s nice to meet you! As a designer, it feels strange to put myself in a bucket; we’re a multi-disciplinary bunch. </p>
                    <p>What I will say, is, I’m driven by __. Spatial mediums, and gestural interactions, are particular areas of interest for me.</p>
                    <p>I graduated in 2024 from UW Design in Seattle. </p>
                </div>
            </div>
        </section>
    </main>
  )
}
