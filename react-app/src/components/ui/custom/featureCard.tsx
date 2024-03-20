"use client"
import React, { useState, useEffect } from 'react';
import '@/app/styles.css'

import Image from 'next/image'
import { Badge } from "@/components/ui/badge"

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPieChart, faLineChart, faChartSimple } from '@fortawesome/free-solid-svg-icons'


type FeatureCardProps = {
  // children: React.ReactNode;
  color: string;
  badge: string;
  h3: string;
  p: string;
  imageSrc: string;
};


export default function FeatureCard({ color, badge, h3, p, imageSrc }: FeatureCardProps) {

  return (
    <div
      className="flex flex-col items-center text-center p-8 rounded-2xl"
      style={{backgroundColor: color+", 10%)"}}
    >
        <Badge
          className="text-foreground"
          style={{backgroundColor: color+", 50%)"}}
        >
          {badge}
        </Badge>
        <h3 className="font-500 mt-4 mb-2">{h3}</h3>
        <p>{p}</p>
        <div className="card mt-8">
          <Image
            src={imageSrc}
            alt=""
            height={0}
            width={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
    </div>
  );
}