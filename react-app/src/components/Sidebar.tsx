import React from "react";
import Link from "next/link";
import { IconButton } from "./ui/IconButton";
import { NavArrowLeft } from 'iconoir-react';
import { cn } from "@/lib/utils";



interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

interface SidebarNavProps {
  href: string;
  breadcrumb: string;
  page: string;
  className?: string;
}


export const Sidebar: React.FC<SidebarProps> = ({ children, className }) => {
  return (
    <section className={cn("md:col-span-4 flex flex-col gap-4 md:sticky md:top-0 md:py-16 self-start", className)}>
          { children }
      </section>
  );
}


export const SidebarNav: React.FC<SidebarNavProps> = ({ href, breadcrumb, page, className }) => {
  return (
    <nav className={cn("font-mono text-sm w-full flex items-center bg-bg-card rounded-t-md p-4", className)}>
      <Link href={href} className="flex items-center gap-2 rounded-sm pr-2 text-tx-tertiary hover:bg-bg-hover hover:text-tx-primary">
        <IconButton variant="ghostalt" size="sm"><NavArrowLeft/></IconButton>
        <span> {breadcrumb} </span>
      </Link>
      <span className="text-tx-tertiary pr-2">/</span>
      <span className="text-tx-primary">{page}</span>
    </nav>
  );
}