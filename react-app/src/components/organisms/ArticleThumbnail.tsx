import clsx from 'clsx';
import Link from "next/link";
import Image from "next/image";
import { IconButton } from "@/components/ui/IconButton";

import { ArrowUpRight } from 'iconoir-react';
import { ReactNode } from 'react';

// Historically, this component accepted a thumbnail as input,
// then used it in an Image component inside this file. However,
// I was getting a deserialization error, saying the "big strings"
// were impacting performance. I'm not sure if this is because the
// thumbnail string is excessively long; but doing it this way seemed
// to fix the error.

interface ArticleThumbnailProps {
  title: string;
  subtitle: string;
  thumbnail: string;
  // children?: ReactNode;
}

export function ArticleThumbnail({ title, subtitle, thumbnail }: ArticleThumbnailProps) {
  return (
    <div className="flex flex-col gap-4 group">
        {/* { children } */}
        {/* <Image
          src={thumbnail}
          alt="thumbnail"
          height={480}
          width={225}
          sizes="(max-width: 768px) 100vw, 225px" // More specific sizing
          quality={10} // Reduce quality for smaller file size
          className="min-w-full h-[250px] w-full object-cover border-[1px] border-border-base"
        /> */}
        <div className="bg-bg-primary w-full h-[200px]"></div>

        <div className="flex">
            <div className="flex flex-col w-full">
              <h3 className="text-md leading-[28px]">{title}</h3>
              <p className="font-mono text-xs text-tx-tertiary">{subtitle}</p>
            </div>
            <IconButton variant="tertiary" className="group-hover:bg-bg-hover group-active:bg-bg-pressed transition-colors"><ArrowUpRight/></IconButton>
        </div>
    </div>
  );
}
