'use client'

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import validRows from '@/app/demos/arboretum/data/validrows.json';
import validCols from '@/app/demos/arboretum/data/validcols.json';
import { useArboretum } from '../lib/ArboretumProvider';
import { getCellColor, getCellValue, formatCellValue, getMetricDisplayName } from '../lib/ArboretumUtils';
import { ArrowRight } from 'iconoir-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

// This file should draw the arboretum grid, and populate grid cells with the calculated colors.
// Grid cells are clickable. When clicked, it should make <CurrentSelection/> visible, and update its contents.
// Where possible, handle computation inside ArboretumExplorer.ts

// Simple squircle component
function Squircle({ color, width = 16, height = 16 }: { color: string; width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1C10.5 1 15 1 15 8C15 15 10.5 15 8 15C5.5 15 1 15 1 8C1 1 5.5 1 8 1Z"
        fill={color}
        stroke="none"
      />
    </svg>
  );
}

export default function ArboretumVisualizer() {
  const { cellData, computeConfig, selectedCell, selectCell, statistics, setCompute } = useArboretum();
  const svgRef = useRef<SVGSVGElement>(null);

  const numRows = 59;
  const numCols = 17;
  const cellWidth = 15;
  const cellHeight = 15;
  const padding = 15;
  const w = numCols * cellWidth + 2 * padding;
  const h = numRows * cellHeight + 2 * padding;

  useEffect(() => {
    if (!svgRef.current || cellData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, numCols])
      .range([padding, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, numRows])
      .range([h - padding, padding]);

    // Filter valid cells based on validRows and validCols
    const validCellData = cellData.filter(cell => {
      const rowValid = (validRows as unknown as number[]).includes(cell.row);
      const colValid = (validCols as unknown as number[]).includes(cell.col);
      return rowValid && colValid;
    });

    // Use all cells as fallback if filtering removes everything
    const finalValidCellData = validCellData.length > 0 ? validCellData : cellData;

    // Get min/max values for current metric
    const minValue = statistics.minValues[computeConfig.metric];
    const maxValue = statistics.maxValues[computeConfig.metric];

    // Create cell groups
    const cellGroups = svg
      .selectAll(".cell")
      .data(finalValidCellData, (d: any) => d.id)
      .enter()
      .append("g")
      .attr("class", "cell")
      .style("cursor", "pointer");

    // Add rectangles
    cellGroups
      .append("rect")
      .attr("x", (d) => xScale(d.col))
      .attr("y", (d) => yScale(d.row))
      .attr("width", cellWidth)
      .attr("height", cellHeight)
      .attr("fill", (d) => getCellColor(d, computeConfig, minValue, maxValue))
      .attr("stroke", (d) => selectedCell?.id === d.id ? "#333" : "#ccc")
      .attr("stroke-width", (d) => selectedCell?.id === d.id ? 2 : 0.5)
      .on("click", function(event, d) {
        console.log(`Cell ${d.id} clicked: ${d.accessions} accessions`);
        selectCell(d);
      })
      .on("mouseover", function(event, d) {
        // Add tooltip or highlight effect
        d3.select(this).attr("stroke", "#666").attr("stroke-width", 1);
        
        // Simple tooltip using DOM API
        const existingTooltip = document.querySelector('.arboretum-tooltip');
        if (existingTooltip) {
          existingTooltip.remove();
        }
        
        const tooltip = document.createElement('div');
        tooltip.className = 'arboretum-tooltip';
        tooltip.innerHTML = `
          <div><strong>Cell:</strong> ${d.id}</div>
          <div><strong>Value:</strong> ${formatCellValue(d, computeConfig)}</div>
          <div><strong>Accessions:</strong> ${d.accessions}</div>
          <div><strong>Families:</strong> ${d.families}</div>
          <div><strong>Species:</strong> ${d.species}</div>
        `;
        
        Object.assign(tooltip.style, {
          position: 'absolute',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          pointerEvents: 'none',
          zIndex: '1000',
          left: (event.pageX + 10) + 'px',
          top: (event.pageY - 10) + 'px'
        });
        
        document.body.appendChild(tooltip);
      })
      .on("mouseout", function(event, d) {
        if (selectedCell?.id !== d.id) {
          d3.select(this).attr("stroke", "#ccc").attr("stroke-width", 0.5);
        }
        
        // Remove tooltip
        const tooltip = document.querySelector('.arboretum-tooltip');
        if (tooltip) {
          tooltip.remove();
        }
      });

    // Update colors when compute config changes
    svg.selectAll(".cell rect")
      .attr("fill", (d: any) => getCellColor(d, computeConfig, minValue, maxValue))
      .attr("stroke", (d: any) => selectedCell?.id === d.id ? "#333" : "#ccc")
      .attr("stroke-width", (d: any) => selectedCell?.id === d.id ? 2 : 0.5);

  }, [cellData, computeConfig, selectedCell, statistics, h, selectCell, w]);

  return (
    <div className="flex flex-col bg-bg-secondary border border-bd-primary rounded p-6 gap-6">
      <div>
        <h2 className="text-xl">Arboretum Explorer</h2>
        <p className="text-md text-tx-secondary">2023 ※ D3.js, Three.js</p>
      </div>
      <p className="text-sm text-tx-body">This is an introductory attempt to using AI to convert handwritten notes into .md files. This is intended to bridge the gap between tangible note-taking and the practicality of obsidian.md.</p>

      <Link href="/work/arboretum">
        <Button className="gap-2">Go to case study <ArrowRight width={16} height={16}/></Button>
      </Link>

      <Separator/>

      <div>
        <p className="font-mono text-sm">Display:</p>
        <Select
          value={computeConfig.metric}
          onValueChange={(value) => setCompute({ metric: value as any })}
        >
          <SelectTrigger className="w-48 mb-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Total Accessions</SelectItem>
            <SelectItem value="FAMILY">Unique Families</SelectItem>
            <SelectItem value="SPECIES">Unique Species</SelectItem>
            <SelectItem value="Z-SCORE">Average Z-Score</SelectItem>
            <SelectItem value="Z-SCORE-UNIQUE">Uniqueness Z-Score</SelectItem>
            <SelectItem value="DIVERSITY">Diversity</SelectItem>
            <SelectItem value="PERCENTAGE">Percentage</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-4">
          <div className="flex gap-2 px-1 items-center">
            <Squircle color={getCellColor({
              id: 'min',
              row: 0,
              col: 0,
              accessions: computeConfig.metric === 'ALL' ? statistics.minValues[computeConfig.metric] : 1,
              families: computeConfig.metric === 'FAMILY' ? statistics.minValues[computeConfig.metric] : 1,
              species: computeConfig.metric === 'SPECIES' ? statistics.minValues[computeConfig.metric] : 1,
              zscoreA: computeConfig.metric === 'Z-SCORE' ? statistics.minValues[computeConfig.metric] * 3 : 0,
              zscoreF: computeConfig.metric === 'Z-SCORE' ? statistics.minValues[computeConfig.metric] * 3 : computeConfig.metric === 'Z-SCORE-UNIQUE' ? statistics.minValues[computeConfig.metric] * 2 : 0,
              zscoreS: computeConfig.metric === 'Z-SCORE' ? statistics.minValues[computeConfig.metric] * 3 : computeConfig.metric === 'Z-SCORE-UNIQUE' ? statistics.minValues[computeConfig.metric] * 2 : 0,
              diversity: computeConfig.metric === 'DIVERSITY' ? statistics.minValues[computeConfig.metric] : 0,
              percentage: computeConfig.metric === 'PERCENTAGE' ? statistics.minValues[computeConfig.metric] : 0,
              percentageU: 0,
              uniqueFamilies: [],
              uniqueSpecies: [],
              rodHeight: 0,
              blocks: 0
            }, computeConfig, statistics.minValues[computeConfig.metric], statistics.maxValues[computeConfig.metric])} />
            <p>Min: {statistics.minValues[computeConfig.metric]?.toFixed(computeConfig.metric.includes('Z-SCORE') || computeConfig.metric === 'DIVERSITY' ? 2 : 0) || '0'}</p>
          </div>
          <div className="flex gap-2 px-1 items-center">
            <Squircle color={getCellColor({
              id: 'max',
              row: 0,
              col: 0,
              accessions: computeConfig.metric === 'ALL' ? statistics.maxValues[computeConfig.metric] : 1,
              families: computeConfig.metric === 'FAMILY' ? statistics.maxValues[computeConfig.metric] : 1,
              species: computeConfig.metric === 'SPECIES' ? statistics.maxValues[computeConfig.metric] : 1,
              zscoreA: computeConfig.metric === 'Z-SCORE' ? statistics.maxValues[computeConfig.metric] * 3 : 0,
              zscoreF: computeConfig.metric === 'Z-SCORE' ? statistics.maxValues[computeConfig.metric] * 3 : computeConfig.metric === 'Z-SCORE-UNIQUE' ? statistics.maxValues[computeConfig.metric] * 2 : 0,
              zscoreS: computeConfig.metric === 'Z-SCORE' ? statistics.maxValues[computeConfig.metric] * 3 : computeConfig.metric === 'Z-SCORE-UNIQUE' ? statistics.maxValues[computeConfig.metric] * 2 : 0,
              diversity: computeConfig.metric === 'DIVERSITY' ? statistics.maxValues[computeConfig.metric] : 0,
              percentage: computeConfig.metric === 'PERCENTAGE' ? statistics.maxValues[computeConfig.metric] : 0,
              percentageU: 0,
              uniqueFamilies: [],
              uniqueSpecies: [],
              rodHeight: 0,
              blocks: 0
            }, computeConfig, statistics.minValues[computeConfig.metric], statistics.maxValues[computeConfig.metric])} />
            <p>Max: {statistics.maxValues[computeConfig.metric]?.toFixed(computeConfig.metric.includes('Z-SCORE') || computeConfig.metric === 'DIVERSITY' ? 2 : 0) || '0'}</p>
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-tx-secondary">
        Click on a cell to view details. Colors represent {computeConfig.metric.toLowerCase().replace('-', ' ')}.
      </p>

      <div className="overflow-auto">
        <svg
          ref={svgRef}
          width={w}
          height={h}
          style={{ background: '#f9f9f9', border: '1px solid #ddd' }}
        />
      </div>
    </div>
  );
}