"use client"
import React, { useState, useEffect } from 'react';
import '@/app/styles.css'
import useWindowResize from '@/lib/useWindowResize';

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPieChart, faLineChart, faChartSimple } from '@fortawesome/free-solid-svg-icons'

import BarChart from './exampleBarChart';
// import LineChart from './exampleLineChart';
// import PieChart from './exampleBarChart';


import { mockBarData as barData } from "./mockData";
import { mockLineData as lineData } from "./mockData";
import { mockPieData as pieData } from "./mockData";


export function NivoDemo() {
  const isMobile = useWindowResize();
  const [selectedChart, setSelectedChart] = useState('bar');

  return (
    <div className={`flex gap-8 items-center ${isMobile ? 'flex-col' : ''}`}>
      <div className={`flex p-4 gap-4 card ${isMobile ? 'order-last' : 'flex-col'}`}>
        <button onClick={() => setSelectedChart('bar')} className="p-3 rounded-md bg-[#2864CC]/[0.1]">
            <FontAwesomeIcon icon={faChartSimple} className="fa-2xl text-[#2864CC]" />
        </button>
        <button onClick={() => setSelectedChart('line')} className="p-3 rounded-md bg-[#DC5858]/[0.1]">
          <FontAwesomeIcon icon={faLineChart} className="fa-2xl text-[#DC5858]" />
        </button>
        <button onClick={() => setSelectedChart('pie')} className="p-3 rounded-md bg-[#FBC756]/[0.1]">
          <FontAwesomeIcon icon={faPieChart} className="fa-2xl text-[#FBC756]" />
        </button>
      </div>

      <div className="flex flex-col p-4 gap-4 card w-[80vw] md:w-[60vw] h-[350px] ">
        {selectedChart === 'bar' && (
          <BarChart />
        )}

        {selectedChart === 'line' && (
          // <LineChart />
          <div></div>
        )}

        {selectedChart === 'pie' && (
          // <PieChart />
          <div></div>
        )}
      </div>


    </div>
  );
}