"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import validRows from '@/app/demos/arboretum/data/validrows.json';
import validCols from '@/app/demos/arboretum/data/validcols.json';

interface Cell {
  id: string;
  row: number;
  col: number;
  accessions: number;
  families: number;
  species: number;
  zscoreA: number;
  zscoreF: number;
  zscoreS: number;
  diversity: number;
  percentage: number;
  percentageU: number;
  rodHeight: number;
  blocks: number;
}

interface ArboretumVisProps {
  dataset: Cell[];
  view: string;
  filter: string;
  activity: boolean;
  totalAccessions: number;
  meanA: number;
  meanF: number;
  meanS: number;
  stdDevA: number;
  stdDevF: number;
  stdDevS: number;
  blockHeights: string;
}

const ArboretumVis: React.FC<ArboretumVisProps> = ({
  dataset,
  view,
  filter,
  activity,
  totalAccessions,
  meanA,
  meanF,
  meanS,
  stdDevA,
  stdDevF,
  stdDevS,
  blockHeights
}) => {
  const [avgDensity, setAvgDensity] = useState(0);
  const [curMin, setCurMin] = useState(0);
  const [curMax, setCurMax] = useState(0);
  const [isDefaultScheme, setIsDefaultScheme] = useState(true);
  const [selectedCellColor, setSelectedCellColor] = useState("#000000");
  const [allBlocks, setAllBlocks] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [curCell, setCurCell] = useState<Cell>({
    id: "",
    row: -1,
    col: -1,
    accessions: -1,
    families: -1,
    species: -1,
    zscoreA: -1,
    zscoreF: -1,
    zscoreS: -1,
    diversity: -1,
    percentage: -1,
    percentageU: -1,
    rodHeight: -1,
    blocks: -1
  });

  const svgRef = useRef<SVGSVGElement>(null);

  const numRows = 59;
  const numCols = 17;
  const cellWidth = 15;
  const cellHeight = 15;
  const padding = 15;
  const w = numCols * cellHeight + 2 * padding;
  const h = numRows * cellHeight + 2 * padding;

  const xScale = d3
    .scaleLinear()
    .domain([0, numCols])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, numRows])
    .range([h - padding, padding]);

  const getData = (cell: Cell, filter: string): number => {
    if (filter === "Z-SCORE") {
      return (cell.zscoreA + cell.zscoreF + cell.zscoreS) / 3;
    } else if (filter === "Z-SCORE-UNIQUE") {
      return (cell.zscoreF + cell.zscoreS) / 2;
    } else if (filter === "DIVERSITY") {
      return cell.diversity;
    } else if (filter === "PERCENTAGE") {
      return cell.percentage;
    } else if (filter === "FAMILY") {
      return cell.families;
    } else if (filter === "SPECIES") {
      return cell.species;
    } else {
      return cell.accessions;
    }
  };

  const getColorScale = (cellData: Cell[], filter: string) => {
    const colorScale = d3.scaleLinear<string>();
    const domain = d3.extent(cellData, (d) => getData(d, filter)) as [number, number];
    let range: string[] = ["#FFC63E", "#C5002F"];
    setIsDefaultScheme(true);
    
    if (filter === "DIVERSITY") {
      range = ["#FFC63E", "#870EB2"];
      setIsDefaultScheme(false);
    }

    colorScale.domain(domain).range(range);
    return colorScale;
  };

  const getCellId = (row: number, col: number): string => {
    let rowStr: string;
    if (row < 51) {
      const conversion = -row + 50;
      rowStr = conversion.toString();
    } else {
      const conversion = row - 50;
      rowStr = conversion.toString() + "S";
    }

    let colStr: string;
    if (col < 7) {
      const conversion = -col + 7;
      colStr = conversion.toString() + "W";
    } else if (col > 7) {
      const conversion = col - 7;
      colStr = conversion.toString() + "E";
    } else {
      colStr = "B";
    }
    return rowStr + "-" + colStr;
  };

  const getCellRow = (rowInput: string): number => {
    let rowValue: number;
    if (rowInput.includes("S")) {
      rowValue = -Number(rowInput.substring(0, 1)) + 8;
    } else {
      rowValue = Number(rowInput) + 8;
    }
    return rowValue;
  };

  const getCellCol = (colInput: string): number => {
    let colValue: number;
    if (colInput.includes("W")) {
      colValue = 0 - Number(colInput.substring(0, 1));
    } else if (colInput.includes("E")) {
      colValue = Number(colInput.substring(0, 1));
    } else {
      colValue = 0;
    }
    return colValue + 7;
  };

  const renderGrid = () => {
    const svg = d3.select(svgRef.current);
    svg.append("g").attr("id", "grid-lines");
    svg.append("g").attr("id", "grid-labels");

    const colLines = d3
      .select("#grid-lines")
      .selectAll(".col-line")
      .data(xScale.ticks(numCols))
      .enter()
      .append("line")
      .attr("class", "col-line")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", h)
      .attr("stroke", "black");

    const rowLines = d3
      .select("#grid-lines")
      .selectAll(".row-line")
      .data(yScale.ticks(numRows))
      .enter()
      .append("line")
      .attr("class", "row-line")
      .attr("x1", 0)
      .attr("x2", w)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "black");

    const colLabels = d3
      .select("#grid-labels")
      .selectAll(".col-label")
      .data(validCols)
      .enter()
      .append("g")
      .attr("class", "col-label")
      .append("text")
      .text((d) => d as string)
      .attr("x", (d) => xScale(getCellCol(d as string)) + cellWidth / 2)
      .attr("y", cellHeight / 2)
      .style("font-size", "0.5em")
      .style("text-anchor", "middle")
      .style("fill", "gray");

    const rowLabels = d3
      .select("#grid-labels")
      .selectAll(".row-label")
      .data(validRows)
      .enter()
      .append("g")
      .attr("class", "row-label")
      .append("text")
      .text((d) => d as string)
      .attr("x", 0)
      .attr("y", (d) => yScale(getCellRow(d as string)) - cellHeight / 2)
      .style("font-size", "0.5em")
      .style("fill", "gray");
  };

  const renderData = (cellData: Cell[], filter: string, blockHeight: string) => {
    if (cellData && filter) {
      const colorScale = getColorScale(cellData, filter);
      const svg = d3.select(svgRef.current);

      svg.append("g").attr("id", "heatmap");
      const rect = d3.select("#heatmap").selectAll(".cell").data(cellData);

      rect
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("value", (cell) => getData(cell, filter))
        .attr("x", (cell) => cell.col * cellHeight + padding)
        .attr("y", (cell) => cell.row * cellWidth + padding)
        .style("fill", (cell) => {
          if (blockHeight !== "ALL" && Math.round(cell.blocks) != parseInt(blockHeight)) {
            return "#FFFFFF";
          }
          return colorScale(getData(cell, filter));
        })
        .on("click", (event, cell) => {
          const target = event.target as SVGRectElement;
          const cellId = getCellId(
            parseInt(target.getAttribute("y")!) / cellHeight - 1,
            parseInt(target.getAttribute("x")!) / cellWidth - 1
          );
          const foundCell = dataset.find((cell) => cell.id === cellId);
          if (foundCell) {
            setCurCell(foundCell);
            setSelectedCellColor(target.style.fill);
          }
        })
        .on("mouseover", (event) => {
          d3.select(event.target).transition().duration(50).attr("opacity", ".85");
        })
        .on("mouseout", (event) => {
          d3.select(event.target).transition().duration(50).attr("opacity", "1");
        });
    }
  };

  useEffect(() => {
    console.log(blockHeights);
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    renderGrid();
    renderData(dataset, filter, blockHeights);

    const newAllBlocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < dataset.length; i++) {
      const cell = dataset[i];
      const count = Math.round(cell.blocks);
      console.log(count);
      newAllBlocks[0]++;
      newAllBlocks[count]++;
    }
    console.log(newAllBlocks);
    setAllBlocks(newAllBlocks);

    const tempMin = d3.min(dataset, (cell) => getData(cell, filter));
    const tempMax = d3.max(dataset, (cell) => getData(cell, filter));
    const tempAvgDensity = d3.mean(dataset, (cell) => getData(cell, filter));

    if (tempMin !== undefined) {
      setCurMin(tempMin);
    }
    if (tempMax !== undefined) {
      setCurMax(tempMax);
    }
    if (tempAvgDensity !== undefined) {
      setAvgDensity(tempAvgDensity);
    }
  }, [dataset, filter, blockHeights]);

  const getBlockCount = (blockHeights: string): number => {
    if (blockHeights === 'ALL') return allBlocks[0];
    const index = parseInt(blockHeights);
    return allBlocks[index] || 0;
  };

  return (
    <div className="flex flex-row mt-8">
      <svg id="svg-grid" ref={svgRef} width="500" height="1000"></svg>
      <div id="info-panel" className="space-y-4">
        <ul className="card space-y-1 w-96">
          <li className="text-h5">Contents</li>
          <li>
            <svg height="16" width="16">
              <rect
                height="16"
                width="16"
                fill={isDefaultScheme ? "#FFC63E" : "#FFC63E"}
              />
            </svg>
            <span>Min: {Math.round(curMin * 10) / 10}</span>
          </li>
          <li>
            <svg height="16" width="16">
              <rect
                height="16"
                width="16"
                fill={isDefaultScheme ? "#C5002F" : "#870EB2"}
              />
            </svg>
            <span>Max: {Math.round(curMax * 10) / 10}</span>
          </li>
          <li>
            <h6>{Math.round(totalAccessions * 100) / 100}</h6>
            <p>total accessions</p>
          </li>
          <li>
            <p>Mean:</p>
            <h6>{Math.round(meanA * 100) / 100}</h6>
          </li>
          <li>
            <p>Std Dev:</p>
            <h6>{Math.round(stdDevA * 100) / 100}</h6>
          </li>
          <li>
            <p>Number of blocks:</p>
            <h6>{getBlockCount(blockHeights)}</h6>
          </li>
        </ul>
        
        {curCell.id !== '' && (
          <div className="card">
            <header className="flex space-x-2">
              <svg height={20} width={20}>
                <rect height={20} width={20} fill={selectedCellColor} />
              </svg>
              <h5>{curCell.id}</h5>
            </header>

            <ul>
              <li>
                <h6>{curCell.accessions}</h6>
                <p>total accessions</p>
              </li>
              <li>
                <h6>{(curCell.families + curCell.species) / 2}</h6>
                <p>total uniqueness</p>
              </li>
              <li>
                <h6>{Math.round(curCell.zscoreA * 100) / 100}</h6>
                <h6>{Math.round(curCell.percentage)}%</h6>
                <p>accessions score</p>
              </li>
              <li>
                <h6>
                  {Math.round((100 * (curCell.zscoreF + curCell.zscoreS)) / 2) / 100}
                </h6>
                <h6>{Math.round(curCell.percentageU)}%</h6>
                <p>uniqueness score</p>
              </li>
              <li>
                <h6>{curCell.rodHeight}in</h6>
                <p>rod height</p>
              </li>
              <li>
                <h6>{curCell.blocks}</h6>
                <p>blocks</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        .tooltip {
          position: absolute;
          text-align: center;
          padding: 0.5rem;
          background: #ffffff;
          color: #313639;
          border: 1px solid #313639;
          border-radius: 8px;
          pointer-events: none;
          font-size: 1.3rem;
        }

        .card {
          background-color: #fafafa;
          padding: 12px 16px 12px 16px;
          border-radius: 4px;
          box-shadow: 0px 0px 0px 1px rgba(59, 83, 105, 0.08);
        }

        li {
          display: flex;
          gap: 4px;
        }
      `}</style>
    </div>
  );
};

export default ArboretumVis;




