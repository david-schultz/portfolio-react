'use client'

import { useState, useEffect } from 'react'

interface ScrollToProps {
  id: string;
  smooth: boolean;
}

export default function ScrollTo({ id, smooth }: ScrollToProps) {
  const [scrollActivated, setScrollActivated] = useState(false);

  // const handleTabClick = () => {
  //   setScrollActivated(true);
  // }

  useEffect(() => {
    const element = document.getElementById(id);
    if (element && !scrollActivated) {
      setScrollActivated(element.classList.contains("scrollActivated"));
    }
  });

  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      if(scrollActivated) {
        const shouldSmoothScroll = smooth && elementTop > window.pageYOffset;
        element.scrollIntoView({ behavior: shouldSmoothScroll ? 'smooth' : 'auto' });
      }
    }
  }, [id, smooth, scrollActivated]); // re-run effect if id or smooth or scrollActivated changes

  return null;
}