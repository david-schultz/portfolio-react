'use client'

import { useEffect } from 'react'

interface ScrollToProps {
  id: string;
  smooth: boolean;
}

export default function ScrollTo({ id, smooth }: ScrollToProps) {
  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const shouldSmoothScroll = smooth && elementTop > window.pageYOffset;
      element.scrollIntoView({ behavior: shouldSmoothScroll ? 'smooth' : 'auto' });
    }
    // element?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  }, [id, smooth]); // re-run effect if id or smooth changes

  return null;
}