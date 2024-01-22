"use client"
import React from 'react';
import '@/app/styles.css'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AcquireWindow({ src = 'default' }: { src?: string}) {
  
  return (
    <div className="card bg-clip-border h-[400px]">
    <Image
      src="/chrome-tool-bar.png"
      alt="toolbar"
      height={0}
      width={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
    />
    <Image 
      src={src}
      alt="acquire screen"
      height={0}
      width={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}/>
  </div>
  );
}
