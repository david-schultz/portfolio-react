import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// import { useEffect } from 'react';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function SetBodyBackground() {
//   useEffect(() => {
//     document.body.className = "bg-white";
//     return () => {
//       document.body.className = "bg-background";
//     };
//   }, []);

//   return;
// }

// export function getImageUrl(person, size = 's') {
//   return (
//     'https://i.imgur.com/' +
//     person.imageId +
//     size +
//     '.jpg'
//   );
// }
