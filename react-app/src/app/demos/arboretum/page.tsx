'use client'
import Image from "next/image";
import Link from "next/link";
// import { CurrentSelection, FilterCard } from "./components/ArboretumDataControls";
import { OverviewFilterCard } from "./components/OverviewFilterCard";
import { CurrentSelectionCard } from "./components/CurrentSelectionCard";
import ArboretumVisualizer from "./components/ArboretumVisualizer";
import { ArboretumProvider } from "./lib/ArboretumProvider";
import { Sidebar, SidebarNav } from "@/components/Sidebar";
import { StickyCard, StickyCardMask } from "@/components/StickyCard";

export default function Arboretum() {

  return (
    <>
      <ArboretumProvider>

        <Sidebar className="md:col-span-5">
          <SidebarNav href={'/?tab=demos'} breadcrumb={'demos'} page={'arboretum'} className="top-6 shadow-sm"/>
            <OverviewFilterCard />
            <CurrentSelectionCard /> {/* This should only be visible if there is a currently selected grid cell. */}
        </Sidebar>


        <main className="md:col-span-7">

          <StickyCardMask />
          <StickyCard className="bg-bg-secondary border border-bd-primary rounded">
            <ArboretumVisualizer />
          </StickyCard>
        </main>

      </ArboretumProvider>
    </>
  )
}