'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { Separator } from '@/components/ui/separator'

import { ArrowDown, OpenInBrowser, Mail, Page, GraduationCap, Link as LinkIcon, MapPin, Minus, Plus, Emoji, Book, Linkedin } from 'iconoir-react'

let readcvSrc = "/fa/readcv.svg";

interface AboutSectionProps {
  // Define the props for your component here
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  const [contactView, setContactView] = useState(true);

  return (
      <section id="aboutSection" className="flex flex-col gap-4 md:sticky md:top-16 md:min-w-[300px] md:max-w-[400px] elevation-1 ">
        <div className="rounded-md overflow-clip">
          <Image
              src="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/selfie.jpg"
              alt="a selfie of the soul"
              height={0}
              width={0}
              sizes="225vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
        <div className="card flex flex-col px-6 py-5 gap-4">
          <div className="flex">
            <div className="flex flex-col w-full">
              <h4>David Schultz</h4>
              <p className="text-secondary">AR/VR/XR Designer</p>
            </div>

            {contactView ? 
              <Button variant="primary" onClick={() => setContactView(!contactView)}>
                About
                <Plus className="ml-2 w-4 h-4" />
              </Button>
            :
              <Button variant="primary" onClick={() => setContactView(!contactView)}>
                About
                <Minus className="ml-2 w-4 h-4" />
              </Button>
            }
          </div>

          <Separator />

          {contactView ? 
            <div id="contactView"className="flex flex-col gap-3">
              <div className="flex gap-4">
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/files/SchultzDavid-Resume.pdf" target="_blank">
                      <Page className="mr-2 w-4 h-4" />
                      Resume
                  </Link>
                </Button>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="https://www.linkedin.com/in/schultzdavidg/" target="_blank">
                      <Linkedin className="mr-2 w-4 h-4" />
                      LinkedIn
                  </Link>
                </Button>
              </div>
              <div className="flex gap-4">
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="mailto:david@davidschultz.co" target="_blank">
                      <Mail className="mr-2 w-4 h-4" />
                      Email
                  </Link>
                </Button>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="https://read.cv/davidschultz" target="_blank">
                    <Image
                      src={readcvSrc}
                      width={16}
                      height={16}
                      alt="readcv logo"
                      className="mr-2"
                    />
                      read.cv
                  </Link>
                </Button>
              </div>
            </div>
          : 
            <div id="detailsView" className="flex flex-col">
              {/* <div className="flex items-center gap-2 mb-2 text-red-500">
                <FontAwesomeIcon icon={faMapPin} />
                <span className="font-500">Seattle, WA</span>
              </div> */}
              <div className="bg-background flex flex-col gap-2">
                <p>Hi! I&apos;m <strong>David</strong>, and I love to tinker.</p>
                <p>My niche is in <strong>extended reality (XR) prototyping</strong>, which brings together my design and programming skillsets.</p>
                <p>I&apos;m particularly excited about gestural interactions—i.e., designing for a future without traditional controllers.</p>
              </div>

              
              {/* <p className="font-500">B.Des from the University of Washington</p> */}
              {/* <div className="flex items-center gap-2 mb-2 text-purple-600">
                <FontAwesomeIcon icon={faGraduationCap} />
                <span className="font-500">University of Washington</span>
              </div> */}
            </div>
          }
          
          
        </div>
      </section>
  );
};

export default AboutSection;