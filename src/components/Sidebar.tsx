'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconButton } from "./ui/IconButton";
import { Globe, RefreshDouble, Xmark } from 'iconoir-react';
import { cn } from "@/lib/utils";
import { CurrentTime } from "./CurrentTime";
// import StarIcon from './public/images/star-sm.svg'


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
    <section className={cn("md:col-span-4 flex flex-col gap-4 md:pt-16 md:h-screen md:sticky md:top-0 self-start", className)}>
          { children }
    </section>
  );
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ href, breadcrumb, page, className }) => {
  const pathname = usePathname();
  const [showTime, setShowTime] = useState(false); // State to toggle between breadcrumbs and time

  // Build the display text based on toggle state
  const getDisplayText = () => {
    if (showTime) {
      return <CurrentTime />;
    }
    
    // Show breadcrumbs based on current route
    if (!pathname || pathname === '/') {
      return <CurrentTime />; // On home page, default to time when showTime is false
    }
    
    // For other pages, build breadcrumb from the pathname
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) {
      return <CurrentTime />; // fallback for home
    }
    
    // Format: "/ parent / current"
    if (pathSegments.length === 1) {
      return `/ ${pathSegments[0]}`;
    } else if (pathSegments.length === 2) {
      return `/ ${pathSegments[0]} / ${pathSegments[1]}`;
    } else {
      // For deeper paths, show the last two segments
      const parent = pathSegments[pathSegments.length - 2];
      const current = pathSegments[pathSegments.length - 1];
      return `/ ${parent} / ${current}`;
    }
  };

  // Toggle function
  const handleToggle = () => {
    setShowTime(!showTime);
  };

  return (
      <nav className={cn("font-mono text-xs text-tx-button w-full flex gap-2 items-center bg-bg-button rounded-md p-2", className)}>
        <Link href={"/"} className="flex items-center gap-2 rounded-sm pr hover:bg-bg-hover hover:text-tx-primary">
          <IconButton variant="ghostalt" size="sm">
            <Image 
              src={'/star-sm-light.svg'}
              alt="logo"
              height={16}
              width={16}
              // sizes="10vw"
              // priority
            />
            {/* <StarIcon color="text-ic-button" /> */}
          </IconButton>
        </Link>
        <span className="flex-grow">{getDisplayText()}</span>

        <IconButton variant="primary" size="sm" onClick={handleToggle}>
          <Globe width={16} height={16}/>
        </IconButton>

      </nav>
  );
}



// export const SidebarNav: React.FC<SidebarNavProps> = ({ href, breadcrumb, page, className }) => {
//   return (
//     // <nav className={cn("font-mono text-xs w-full flex items-center bg-bg-card rounded-md p-2", className)}>
//     //   <Link href={href} className="flex items-center gap-2 rounded-sm pr-2 text-tx-tertiary hover:bg-bg-hover hover:text-tx-primary">
//     //     <IconButton variant="ghostalt" size="sm"><NavArrowLeft/></IconButton>
//     //     <span> {breadcrumb} </span>
//     //   </Link>
//     //   <span className="text-tx-tertiary pr-2">/</span>
//     //   <span className="text-tx-primary">{page}</span>
//     // </nav>

//       <nav className={cn("font-mono text-sm text-tx-body w-full flex gap-2 items-center bg-bg-primary rounded-md p-2", className)}>
//         <Link href={href} className="flex items-center gap-2 rounded-sm pr hover:bg-bg-hover hover:text-tx-primary">
//           <IconButton variant="ghostalt" size="sm">
//             <Image 
//               src={'/star-sm.svg'}
//               alt="logo"
//               height={20}
//               width={20}
//               // sizes="10vw"
//               // priority
//               className=""
//             />
//           </IconButton>
//         </Link>

//         <span className="text-ic-primary">/</span>

//         <Link href={href} className="flex items-center gap-2 rounded-sm hover:bg-bg-hover hover:text-tx-primary">
//           <span> {breadcrumb} </span>
//         </Link>
//       <span className="text-ic-primary">/</span>
//       <span className="">{page}</span>
//     </nav>
//   );
// }

