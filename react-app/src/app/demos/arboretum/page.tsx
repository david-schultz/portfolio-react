'use client'
import Image from "next/image";
import Link from "next/link";
import { DataControls, Overview, CurrentSelection, DataStories } from "./components/ArboretumDataControls";
import ArboretumVisualizer from "./components/ArboretumVisualizer";
import { ArboretumProvider } from "./lib/ArboretumProvider";

export default function Arboretum() {

  return (
    <ArboretumProvider>
      <div className="md:col-span-12">
          <header>
              <nav className="flex gap-1 font-mono text-xs items-center sticky top-0 pt-16 bg-bg z-[10000]">
                  <Link href="/"><span className="text-tx-tertiary">demos</span></Link>
                  <span className="text-tx-tertiary">/</span>
                  <span className="text-tx-primary">arboretum explorer</span>
              </nav>
              <h1>Arboretum Explorer</h1>
              <p>Read the case study here</p>
          </header>

          <main className="w-full max-w-[64rem] px-4 sm:px-16 grid grid-cols-1 md:grid-cols-12 gap-8">
              <section className="md:col-span-4 flex flex-col gap-4 md:sticky md:top-0 md:py-16 self-start md:h-screen">
                  <DataControls />
                  <Overview />
                  <CurrentSelection /> {/* This should only be visible if there is a currently selected grid cell. */}
              </section>

              <section className="md:col-span-8 md:pb-16">
                  <ArboretumVisualizer />
              </section>
          </main>

      </div>
    </ArboretumProvider>
  )
}