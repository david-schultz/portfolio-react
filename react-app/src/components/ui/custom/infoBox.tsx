"use client"
import React, { useState, useEffect } from 'react';
import '@/app/styles.css'
import Image from 'next/image'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



type InfoBoxProps = {
  children: React.ReactNode;
};

type InfoBoxHeaderProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
};

type DataRow = {
  label: string;
  value: string;
};

type InfoBoxSectionProps = {
  title: string;
  dataRows: DataRow[];
  format: 'A' | 'B';
};

export function InfoBox({ children }: InfoBoxProps) {
  const [isAccordion, setIsAccordion] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsAccordion(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isAccordion) {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="card bg-background px-4">
          <AccordionTrigger className="text-lg font-500">Project Info</AccordionTrigger>
          <AccordionContent>
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <div className={`max-w-[300px] flex flex-col card bg-background p-6 gap-3 ${isAccordion ? 'accordion' : ''}`}>
      {children}
    </div>

    
  );
}



export function InfoBoxHeader({ title, subtitle, imageSrc }: InfoBoxHeaderProps) {
  return (
    <div className="flex flex-col text-center">
      <h4>{title}</h4>
      <p className="text-secondary">{subtitle}</p>
      <div className="card mt-4 mb-2">
        <Image  src={imageSrc} alt={title}
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}


export function InfoBoxSection({ title, dataRows, format }: InfoBoxSectionProps) {
  return (
    <div className="w-full">
      <div className="mb-4 flex py-1 justify-center items-center self-stretch bg-[#8D9FFF]/[0.2]">
        <p className="font-500">{title}</p>
      </div>
      <div className="flex flex-col gap-2 self-stretch">
        {dataRows.map((row, index) => (
          <div key={index} className={`flex ${format === 'A' ? 'flex-row' : 'flex-col text-center'}`}>
            {/* <p className="text-sm font-500 w-[4rem]">{row.label}</p>
            <p className="text-sm font-400 grow">{row.value}</p> */}
            <p className={`text-sm font-500 ${format === 'A' ? 'w-[8rem]' : 'grow'}`}>{row.label}</p>
            <p className={`text-sm font-400 w-full ${format === 'A' ? '' : 'text-secondary'}`}>{row.value}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
}