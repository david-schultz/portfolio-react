'use client'
import React from 'react';
import {useState, useEffect} from 'react';
import '@/app/styles.css'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';

interface ScrollButtonProps {
  // Add any props you need for your ScrollButton component
}

const ScrollButton: React.FC<ScrollButtonProps> = () => {
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
    { isTop ?
      <></>
      :
      <button className="fixed bottom-8 right-8 z-[100000] elevation-2 glass-darker p-2 rounded-max w-[48px] h-[48px]" onClick={scrollUp}>
        <FontAwesomeIcon icon={faAnglesUp} size="lg" className="text-secondary" />
      </button>
    }
    </>
  );
};

export default ScrollButton;