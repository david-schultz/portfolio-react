"use client"
import React, { useState, useEffect } from 'react';
import '@/app/styles.css'
import useWindowResize from '@/lib/useWindowResize';

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPieChart, faLineChart, faChartSimple } from '@fortawesome/free-solid-svg-icons'

import BarChart from './exampleBarChart';
import LineChart from './exampleLineChart';
import PieChart from './examplePieChart';

export function NivoDemo() {
  const isMobile = useWindowResize();
  const [selectedChart, setSelectedChart] = useState('bar');

  return (
    <div className={`flex gap-8 items-center ${isMobile ? 'flex-col' : ''}`}>
      <div className={`flex p-4 gap-4 card ${isMobile ? 'order-last' : 'flex-col'}`}>
        <button
          onClick={() => setSelectedChart('bar')}
          className={`p-3 rounded-md hover:bg-[#2864CC]/[0.1] ${selectedChart === 'bar' ? 'bg-[#2864CC]/[0.1]' : ''}`}>
            <FontAwesomeIcon icon={faChartSimple} className="fa-2xl text-[#2864CC]" />
        </button>

        <button 
          onClick={() => setSelectedChart('line')}
          className={`p-3 rounded-md hover:bg-[#DC5858]/[0.1] ${selectedChart === 'line' ? 'bg-[#DC5858]/[0.1]' : ''}`}>
            <FontAwesomeIcon icon={faLineChart} className="fa-2xl text-[#DC5858]" />
        </button>

        <button 
          onClick={() => setSelectedChart('pie')}
          className={`p-3 rounded-md hover:bg-[#FBC756]/[0.1] ${selectedChart === 'pie' ? 'bg-[#FBC756]/[0.1]' : ''}`}>
            <FontAwesomeIcon icon={faPieChart} className="fa-2xl text-[#FBC756]" />
        </button>
      </div>

      <div className="flex flex-col p-4 gap-4 card">
        <div>
          {selectedChart === 'bar' && (
            <div>
              <h4>Revenue from Premiums</h4>
              <p className="text-sm">Quarterly revenue by policy type</p>
            </div>
          )}

          {selectedChart === 'line' && (
            <div>
              <h4>Revenue from Premiums</h4>
              <p className="text-sm">Revenue (in $) by month</p>
            </div>
          )}

          {selectedChart === 'pie' && (
            <div>
              <h4>Age Groups</h4>
              <p className="text-sm">Distribution of policyholders by age</p>
            </div>
          )}
        </div>

        <div className="w-[80vw] md:w-[60vw] h-[350px]">
          {selectedChart === 'bar' && (
            <BarChart />
          )}

          {selectedChart === 'line' && (
            <LineChart />
          )}

          {selectedChart === 'pie' && (
            <PieChart />
          )}
        </div>
      </div>


    </div>
  );
}