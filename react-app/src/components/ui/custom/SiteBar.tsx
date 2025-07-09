"use client"
import React, { useEffect, useState } from 'react';
import '@/app/styles.css'
import Logo from './logo';
import Image from 'next/image'
import Link from 'next/link';
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import AboutSection from '@/components/ui/custom/about-section'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function SiteBar({ variant = 'default' }: { variant?: string}) {
  const isInverted = variant === "inverted";

  let navStyling = "card glass";
  let logoSrc = "/logo.svg";
  let mainText = "text-mdlg sm:text-lg leading-tight xs:leading-normal";
  let subText = "text-secondary font-500 hidden xs:inline-block";

  if (isInverted) {
    navStyling = "grow glass-dark";
    logoSrc = "/logo-invert.svg";
    mainText = "text-invert text-mdlg sm:text-lg leading-tight xs:leading-normal";
    subText = "text-neutral-300 font-500 hidden xs:inline-block";
  }

  // const [scrollData, setScrollData] = useState({
  //   y: 0,
  //   lastY: 0
  // });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollData(prevState => {
  //       return {
  //         y: window.scrollY,
  //         lastY: prevState.y
  //       }
  //     })
  //   }

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);

  // }, []);
  
  return (
    <nav className={navStyling}>
         <ul className="flex items-center justify-between p-2 xs:p-4 gap-3 xs:gap-4">
           <li className="flex-shrink-0 h-[32px] w-[32px] xs:h-[48px] xs:w-[48px]">
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
              (<Button variant="primary" asChild>
                <Link href="https://medium.com/@schultzdavidg" target="_blank">Blog</Link>
              </Button>)
              :
              (<Button variant="ghost" asChild>
                <Link href="https://medium.com/@schultzdavidg" target="_blank">Blog</Link>
              </Button>)
            }
          </li>

          <li className="">
          <Dialog>
              <DialogTrigger asChild>
                { isInverted ? 
                  (<Button variant="primary">Let&apos;s connect!</Button>)
                  :
                  (<Button variant="secondary">Let&apos;s connect!</Button>)
                }
              </DialogTrigger>
              <DialogContent>
                <div className="w-full flex flex-col justify-center items-center">
                  <AboutSection />

                </div>

                {/* <DialogHeader>
                  <DialogTitle>Let&apos;s connect!</DialogTitle>
                  <DialogDescription>
                    Shoot me an email at david@davidschultz.co!
                  </DialogDescription>
                </DialogHeader> */}
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

export function SiteBarScroll() {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClasses = `
  mx-2 p-4 sticky top-1 w-full
  ${isVisible ? 'block' : 'hidden'}
`;
  
  return (
    <div className="navbarClasses" >
      <SiteBar />
    </div>
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