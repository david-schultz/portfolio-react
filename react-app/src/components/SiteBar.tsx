"use client"
import React from 'react';
import '@/app/styles.css'
import Image from 'next/image'
import { Button } from '@/components/ui/button.tsx'

export default function SiteBar({ variant = 'default' }: { variant?: string}) {
  const isInverted = variant === "inverted";

  let navStyling = "rounded-lg border-[#E4E4E7] bg-card elevation-1";
  let logoSrc = "/logo.svg";
  let mainText = "";
  let subText = "text-secondary font-500";

  if (isInverted) {
    navStyling = "grow";
    logoSrc = "/logo-invert.svg";
    mainText = "text-invert";
    subText = "text-neutral-300 font-500";
  }
  
  return (
    <nav className={navStyling}>
         <ul className="grow flex items-center justify-between p-4 gap-4">
           <li>
             <a href="/">
             <Image
              src={logoSrc}
              width={48}
              height={48}
              alt="Partial asterisk"
            />
            </a>
          </li>
          <li className="grow flex flex-col gap-0">
            <h4 className={ mainText }>David Schultz</h4>
            <small className={ subText }>Interaction Designer</small>
          </li>
          <li>
            {isInverted ? 
              (<Button variant="subtle-dark-locked">About the site</Button>)
              :
              (<Button variant="ghost">About the site</Button>)
            }
          </li>
          <li>
            {isInverted ? 
              (<Button variant="primary-locked">Contact</Button>)
              :
              (<Button variant="subtle">Contact</Button>)
            }
          </li>
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