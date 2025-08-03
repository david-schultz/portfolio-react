import React from "react";
import Link from "next/link";
import { IconButton } from "./ui/IconButton";
import { NavArrowLeft } from 'iconoir-react';
import { cn } from "@/lib/utils";



interface StickyCardProps {
  children: React.ReactNode;
  className?: string;
}

interface StickyCardNavProps {
  href: string;
  destination: string;
  page: string;
  className?: string;
}

export function StickyCardMask() {
  return (
    <section id="mask" className="w-[calc(100%)] sticky top-0 flex z-10 min-h-6 rounded-md">
      <div id="cornerLeft" className="top-3 h-[36px] w-[36px] overflow-hidden left-[-12px] absolute z-10 pointer-events-none">
        <div className="h-[48px] w-[48px] left-[12px] top-[12px] absolute border border-bd-primary border-l-0 rounded-md corner-shadow"></div>
      </div>
      <div className="top-3 h-[13px] w-[calc(100%-48px)] absolute border-b border-bd-primary left-6 z-0 "/>
      <div id="cornerRight" className="top-3 h-[36px] w-[36px] overflow-hidden right-[-12px] absolute z-10 pointer-events-none">
        <div className="h-[48px] w-[48px] right-[12px] top-[12px] absolute border border-bd-primary border-r-0 rounded-md corner-shadow"></div>
      </div>

      <div className="h-6 w-full z-1 absolute top-0 bg-bg-base "/>
    </section>
  );
}

export const StickyCard: React.FC<StickyCardProps> = ({ children, className }) => {
  // Convert children to array and check if we have exactly 2 elements
  const childrenArray = React.Children.toArray(children);
  const hasHeader = childrenArray.length === 2;

  // Get header and content elements
  const [headerChild, contentChild] = hasHeader ? childrenArray : [null, childrenArray[0]];

  return (
    <div className={cn("bg-bg-card border border-t-0 border-bd-card rounded-md shadow-sm", className)}>
      { hasHeader && headerChild }
      { contentChild }
    </div>
  );
}

export const StickyCardHeader: React.FC<StickyCardProps> = ({ children, className }) => {

  return (
    <header className={cn("w-full flex flex-col bg-bg-card border-b border-bd-card rounded-t-md", className)}>
      { children }
    </header>
  );
}

export const StickyCardNav: React.FC<StickyCardNavProps> = ({ href, destination, page, className }) => {


  return (
    <nav className={cn("font-mono text-xs w-full flex items-center bg-bg-card rounded-t-md p-4", className)}>
      <Link href={href} className="flex items-center gap-2 rounded-sm pr-2 text-tx-tertiary hover:bg-bg-hover hover:text-tx-primary">
        <IconButton variant="ghostalt" size="sm"><NavArrowLeft/></IconButton>
        <span> {destination} </span>
      </Link>
      <span className="text-tx-tertiary pr-2">/</span>
      <span className="text-tx-primary">{page}</span>
    </nav>
  );
}