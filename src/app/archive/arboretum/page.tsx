import Image from 'next/image'
import '@/app/styles.css'
import SiteBar from '@/components/ui/custom/SiteBar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import ScrollButton from '@/components/ui/custom/scroll-button'
import Footer from '@/components/ui/custom/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Arboretum() {
  return (
    <main className="md:col-span-8">

      <nav className="flex gap-1 font-mono text-xs sticky top-0 pt-16 bg-bg z-[10000]">
            <Button variant="tab" size="tab" asChild>
              <Link href="/">davidschultz.co</Link>
            </Button>
            <span className="border-b-[1px] border-bd/0 pt-1.5 pb-[7px] px-1 text-ic-tertiary">/</span>
            <Button variant="tab" size="tab" asChild>
              <Link href="/">write-ups</Link>
            </Button>
            <span className="border-b-[1px] border-bd/0 pt-1.5 pb-[7px] px-1 text-ic-tertiary">/</span>
            <span className="border-b-[1px] border-bd-base pt-1.5 pb-[7px] px-1 text-tx-primary">arboretum</span>
      </nav>

      <article className="text-tx-body mt-16">
        <header>
          <h1 className="text-tx-primary">Visceralizing plant diversity in the Seattle Arboretum</h1>
          <h3 className="font-mono text-tx-tertiary">2023 ※ Physical data visualization</h3>
          <p className="text-md">Students were asked to visualize a database of accession data from the Seattle Arboretum.</p>
          <div className="card mb-4 ">
              <Image
                src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-cover-min.jpg"
                alt="datavis"
                height={0}
                width={0}
                sizes="225vw"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <small className="text-tx-tertiary">Produced for DESIGN 384: Information Visualization, at the University of Washington.</small>
          </div>
        </header>

        <Separator className="my-12" />{/*————————————————————————————*/}

        <section>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16">
            <div className="flex flex-col gap-6 col-span-1">
              <p>Directly south from the University of Washington’s Seattle campus is a massive, 230-acre green space. It sits in the heart of Seattle, marked by bike paths and running trails which snake through its terrain.</p>
              <p>It is a total gem, and importantly, it contains a dynamic assortment of over 40,000 plants—some found nowhere else in the Northwest—cared for by volunteers, arborists, and gardeners.</p>
            </div>
            <div className="block md:hidden my-10">
              <div className="card">
                <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-park_map-min.png"
                    alt="acquire overview"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
              </div>
            </div>
            <div className="flex flex-col gap-6 col-span-1">
              <p>Since 1936, over 12,480 individual plants have been accessioned and digitized into the Arboretum’s database. These accessions can be categorized into 139 unique families + 3982 unique species (many of which are classified as threatened or endangered).</p>
              <p>For example, in the dataset, you can find that 491 individual trees belonging to the Cypress family have been accessioned across the Arboretum.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-4 mt-16">
            <div className="hidden md:block">
              <div className="card">
                <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-park_map-min.png"
                    alt="acquire overview"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
              </div>
            </div>
            <div className="">
              <div className="card">
                <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-walkthrough-min.jpg"
                    alt="acquire overview"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-16 mt-16">
              <div className="col-span-1">
                <p>The goal for this project was to set up a physical installation in the Arboretum’s visitor center, and present our project to the public.</p>
              </div>
              <div className="col-span-1">
                <p>I created a <span className="underline">4-dimensional bar chart</span>, which represents the number of <span className="underline">accessions</span> + unique species for each cell of the Arboretum’s grid.</p>
              </div>
          </div>

          <div className="card mt-16">
            <Image
              src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-side_profile-min.jpg"
              alt="acquire overview"
              height={0}
              width={0}
              sizes="225vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          <h3 className="mt-16 font-500">“The idea was to try and capture plant diversity.”</h3>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 mt-6">
            <div className="col-span-1">
              <p>Constructed from laser-cut plywood, each square block represents the presence of five unique species (to its corresponding location in the Arboretum). Inside each block is a wooden rod, whose height represents the number of individual accessions.</p>
            </div>
            <div className="col-span-1">
              <p>The idea was to try and capture plant diversity. Because the heights of blocks + rods are proportional, a viewer can immediately see that some areas of the Arboretum are both more dense, and more diverse.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-4 mt-16">
            <div className="col-span-1">
              <div className="card">
                <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-top_compass-min.jpg"
                    alt="acquire overview"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
              </div>
            </div>
            <div className="col-span-1">
              <div className="card">
                <Image
                    src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-top_title-min.jpg"
                    alt="acquire overview"
                    height={0}
                    width={0}
                    sizes="225vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
              </div>
            </div>
          </div>
        </section>
        <Separator className="my-16 md:my-24" />{/*————————————————————————————*/}

        <section>
          <h2>Prototyping with D3.js</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 mt-6">
            <div className="col-span-1">
              <p>While trying to wrap my head around the dataset and find stories within it, I found I needed a visual representation of it... and pivot tables only went so far. I decided it was time to learn a new skill, and installed D3.js, a data visualization library for the web.</p>
            </div>
            <div className="col-span-1">
              <p>This proved to be a very fruitful decision. It took some trial and effort to set it up properly, but being able to explore the dataset in terms of its placement in physical space gave me a much clearer picture of what I was working with.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 mt-16">
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_1-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_2-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_3-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_4-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_5-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_6-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_7-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_8-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_9-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_10-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_11-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="card">
              <Image
                  src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/arboretum/compressed/arb-slide_12-min.png"
                  alt="acquire overview"
                  height={0}
                  width={0}
                  sizes="225vw"
                  style={{ width: '100%', height: 'auto' }}
                />
            </div>
        </section>
      </article>

      <ScrollButton />
    </main>
  )
}
