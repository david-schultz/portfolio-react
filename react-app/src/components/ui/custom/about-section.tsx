'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { Separator } from '@/components/ui/separator'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faArrowDown, faArrowUpRightFromSquare, faEnvelope, faFile, faGraduationCap, faLink, faMapPin, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile, faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

let readcvSrc = "/fa/readcv.svg";

interface AboutSectionProps {
  // Define the props for your component here
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  const [contactView, setContactView] = useState(true);

  return (
      <section id="aboutSection" className="flex flex-col gap-4 md:sticky md:top-16 md:min-w-[300px] md:max-w-[400px]">
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
              <p className="text-secondary">Interaction Designer</p>
            </div>

            {contactView ? 
              <Button variant="default" onClick={() => setContactView(!contactView)}>
                About
                <FontAwesomeIcon icon={faPlus} className="ml-2" />
              </Button>
            :
              <Button variant="default" onClick={() => setContactView(!contactView)}>
                About
                <FontAwesomeIcon icon={faMinus} className="ml-2" />
              </Button>
            }
          </div>

          <Separator />

          {contactView ? 
            <div id="contactView"className="flex flex-col gap-3">
              <div className="flex gap-4">
                <Button variant="subtle" className="w-full" asChild>
                  <Link href="https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/files/SchultzDavid-Resume.pdf" target="_blank">
                      <FontAwesomeIcon icon={faFile as IconProp} className="mr-2" />
                      Resume
                  </Link>
                </Button>
                <Button variant="subtle" className="w-full" asChild>
                  <Link href="https://www.linkedin.com/in/schultzdavidg/" target="_blank">
                      <FontAwesomeIcon icon={faLinkedin as IconProp} className="mr-2" />
                      LinkedIn
                  </Link>
                </Button>
              </div>
              <div className="flex gap-4">
                <Button variant="subtle" className="w-full" asChild>
                  <Link href="mailto:david@davidschultz.co" target="_blank">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      Email
                  </Link>
                </Button>
                <Button variant="subtle" className="w-full" asChild>
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
              <div className="bg-background p-4 rounded-lg">
                <p>I will soon be graduating from the <strong>University of Washington</strong>&apos;s Interaction Design program!</p>
                <p className="mt-2">I&apos;m particularly excited about mixed reality, and designing experiences that pull us back into the world around us.</p>
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