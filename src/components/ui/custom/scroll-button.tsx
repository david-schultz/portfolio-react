'use client'
import React from 'react';
import {useState, useEffect} from 'react';
import '@/app/styles.css'

import { ArrowUp } from 'iconoir-react'

interface ScrollButtonProps {
  // Add any props you need for your ScrollButton component
  isActive?: boolean;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ isActive = true }) => {
  const [isTop, setIsTop] = useState(true);
  
  useEffect(() => {
    const updateScroll = () => {
      if(window.scrollY > 500) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setIsTop(true);
  };

  return (
    <>
    { isTop && isActive ?
      <></>
      :
      <button className="fixed bottom-8 right-8 z-[49] elevation-2 glass-darker p-2 rounded-max w-[48px] h-[48px]" onClick={scrollUp}>
        <ArrowUp className="w-5 h-5 text-secondary" />
      </button>
    }
    </>
  );
};

export default ScrollButton;