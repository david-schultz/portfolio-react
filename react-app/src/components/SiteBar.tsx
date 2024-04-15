"use client"
import React from 'react';
import '@/app/styles.css'
import Image from 'next/image'
import Link from 'next/link';
import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Logo from './ui/custom/logo';

export default function SiteBar({ variant = 'default' }: { variant?: string}) {
  const isInverted = variant === "inverted";

  let navStyling = "card glass";
  let logoSrc = "/logo.svg";
  let mainText = "";
  let subText = "text-secondary font-500";

  if (isInverted) {
    navStyling = "grow";
    logoSrc = "/logo-invert.svg";
    mainText = "text-invert text-md sm:text-lg leading-tight xs:leading-normal";
    subText = "text-neutral-300 font-500 invisible xs:visible";
  }
  
  return (
    <nav className={navStyling}>
         <ul className="grow flex items-center justify-between p-4 gap-3 xs:gap-4">
           <li className="flex-shrink-0 h-[44px] w-[44px] sm:h-[48px] sm:w-[48px]">
             {/* <a href="/">
              <Image
                src={logoSrc}
                width={48}
                height={48}
                alt="Partial asterisk"
              />
            </a> */}
            <Logo isInverted={isInverted}/>
          </li>
          <li className="grow flex xs:flex-col gap-0">
            <h4 className={ mainText }>David Schultz</h4>
            <small className={ subText }>Interaction Designer</small>
          </li>
          {/* <li className="block sm:hidden mr-4">
            { isInverted ? 
                  (<FontAwesomeIcon icon={faBars} className="text-white fa-xl" />)
                  :
                  (<FontAwesomeIcon icon={faBars} className="fa-xl"/>)
                }
          </li> */}

          <li className="hidden sm:block">
            {isInverted ? 
              (<Button variant="subtle-dark-locked" asChild>
                <Link href="https://medium.com/@schultzdavidg" target="_blank">Blog</Link>
              </Button>)
              :
              (<Button variant="ghost" asChild>
                <Link href="https://medium.com/@schultzdavidg" target="_blank">Blog</Link>
              </Button>)
            }
          </li>

          {/* <li className="hidden sm:block">
            <Dialog>
              <DialogTrigger asChild>
                { isInverted ? 
                  (<Button variant="subtle-dark-locked">About the site</Button>)
                  :
                  (<Button variant="ghost">About the site</Button>)
                }
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>About the site</DialogTitle>
                  <DialogDescription>
                    This website is built with React.js, Next.js, and notably shadcn/ui.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </li> */}

          <li className="">
          <Dialog>
              <DialogTrigger asChild>
                { isInverted ? 
                  (<Button variant="primary-locked">Let&apos;s connect!</Button>)
                  :
                  (<Button variant="subtle">Let&apos;s connect!</Button>)
                }
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Let&apos;s connect!</DialogTitle>
                  <DialogDescription>
                    Shoot me an email at david@davidschultz.co!
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </li>
          {/* <li className="hidden sm:block">
            {isInverted ? 
              (<Button variant="primary-locked">Contact</Button>)
              :
              (<Button variant="subtle">Contact</Button>)
            }
          </li> */}
        </ul>

    </nav>
  );
}

// const Nav: React.FC<NavProps> = (variant) => {
//   return (
//     <nav className="grow nav-light">
//       <ul className="grow flex items-center justify-between p-4 gap-4">
//         <li>
//           <a href="/">
//           <Image
//           src="/logo.svg"
//           width={48}
//           height={48}
//           alt="Partial asterisk"
//         />
//         </a>
//       </li>
//       <li className="grow flex flex-col gap-0">
//         <h4>David Schultz</h4>
//         <small className="text-secondary font-500">Interaction Designer</small>
//       </li>
//       <li>
//         <Button variant="ghost">About the site</Button>
//       </li>
//       <li>
//         <Button variant="subtle">Contact</Button>
//       </li>
//     </ul>
//   </nav>
//   );
// }

// export default Nav;

// export default function Nav() {
//   return (
//     <header className="grow">
//       <nav className="nav-light">
//         <ul className="grow flex items-center justify-between p-4 gap-4">
//           <li>
//             <a href="/">
//             <Image
//               src="/logo.svg"
//               width={48}
//               height={48}
//               alt="Partial asterisk"
//             />
//             </a>
//           </li>
//           <li className="grow flex flex-col gap-0">
//             <h4>David Schultz</h4>
//             <small className="text-secondary font-500">Interaction Designer</small>
//           </li>
//           <li>
//             <Button variant="ghost">About the site</Button>
//           </li>
//           <li>
//             <Button variant="subtle">Contact</Button>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   )
// }