"use client"
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import FeatureCard from '@/components/ui/custom/featureCard';
import { NivoDemo } from '@/components/nivo/nivoDemo';
import { Button } from '@/components/ui/Button';
import { Separator } from "@/components/ui/separator"
import { InfoBox, InfoBoxHeader, InfoBoxSection } from '@/components/ui/custom/infoBox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faSquareInstagram, faSquareThreads, faThreads, faUnsplash } from '@fortawesome/free-brands-svg-icons';


interface FooterProps {
  // Define props here
}

const Footer: React.FC<FooterProps> = (props) => {

  return (
    <footer className="flex flex-col w-full 
                      bg-[#202020] text-fabric rounded-lg overflow-clip">
      <div className="grid md:grid-cols-3 gap-4 p-8 sm:p-12 md:p-16">
        <div className="col-span-2">
          <h1 className="text-[1.75rem] sm:text-[3rem] md:text-[2.8rem] lg:text-[4rem]">47° 39’ 19.1484” N</h1>
          <h1 className="text-[1.75rem] sm:text-[3rem] md:text-[2.8rem] lg:text-[4rem]">122° 18’ 43.3512” W</h1>
          
        </div>
        <div className="flex flex-col md:items-end">
          <h4>david@davidschultz.co</h4>
          <div className="flex gap-4 mt-2">
            <Link href="https://www.instagram.com/schultzdavidg/" target="_blank"><FontAwesomeIcon icon={faInstagram as IconProp} size="2x" className="hover:text-[#FC8E37]" /></Link>
            <Link href="https://www.threads.net/@schultzdavidg" target="_blank"><FontAwesomeIcon icon={faThreads as IconProp} size="2x" className="hover:text-[#FC8E37]" /></Link>
            <Link href="https://unsplash.com/@davidschultz" target="_blank"><FontAwesomeIcon icon={faUnsplash as IconProp} size="2x" className="hover:text-[#FC8E37]" /></Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between p-8
                      bg-[#2E2E2E] text-[#ACA998]">
        <p className="font-500">Built with Next.js, Tailwind.css, and shad/cn.</p>
        <p className="font-500">© 2024 ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
};

export default Footer;