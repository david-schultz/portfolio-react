"use client";

import React, { useState, useEffect, useRef } from 'react';
import ArboretumVis from './ArboretumVis';
import accessions from '@/app/demos/arboretum/data/accessions.json';

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
  uniqueFamilies: string[];
  uniqueSpecies: string[];
  rodHeight: number;
  blocks: number;
}

interface Accession {
  accession: string;
  cell: string;
  species: string;
  family: string;
}

const ArboretumExplorer: React.FC = () => {
  const [cellData, setCellData] = useState<Cell[]>([]);
  const [curView, setCurView] = useState<string>("");
  const [curFilter, setCurFilter] = useState<string>("");
  const [familyFilter, setFamilyFilter] = useState<string>("Ericaceae");
  const [speciesFilter, setSpeciesFilter] = useState<string>("Acer davidii");
  const [blockHeights, setBlockHeights] = useState<string>("ALL");
  const [activityFlag, setActivityFlag] = useState<boolean>(false);

  const [totalAccessions, setTotalAccessions] = useState<number>(-1);
  const [meanA, setMeanA] = useState<number>(-1);
  const [meanF, setMeanF] = useState<number>(-1);
  const [meanS, setMeanS] = useState<number>(-1);
  const [stdDevA, setStdDevA] = useState<number>(-1);
  const [stdDevF, setStdDevF] = useState<number>(-1);
  const [stdDevS, setStdDevS] = useState<number>(-1);
  const [species, setSpecies] = useState<string[]>([]);
  const [families, setFamilies] = useState<string[]>([]);

  const isInitialized = useRef(false);

  // Initialize component
  useEffect(() => {
    if (!isInitialized.current) {
      init();
      loadData();
      isInitialized.current = true;
    }
  }, []);

  // Creates and pushes new Cells into cellData.
  const init = () => {
    const newCellData: Cell[] = [];
    const newSpecies: string[] = [];
    const newFamilies: string[] = [];

    for (let i = 0; i < accessions.length; i++) {
      const accession = accessions[i] as Accession;
      
      if (newCellData.filter((e) => e.id === accession.cell).length === 0) {
        const newCell: Cell = {
          id: accession.cell,
          row: getCellRow(accession.cell),
          col: getCellCol(accession.cell),
          accessions: -1,
          families: -1,
          species: -1,
          zscoreA: -1,
          zscoreF: -1,
          zscoreS: -1,
          diversity: -1,
          percentage: -1,
          percentageU: -1,
          uniqueFamilies: ["ROOT"],
          uniqueSpecies: ["ROOT"],
          rodHeight: -1,
          blocks: -1,
        };
        newCellData.push(newCell);
      }
      
      if (!newFamilies.includes(accession.family)) {
        newFamilies.push(accession.family);
      }
      
      if (!newSpecies.includes(accession.species)) {
        newSpecies.push(accession.species);
      }
    }

    setCellData(newCellData);
    setFamilies(newFamilies);
    setSpecies(newSpecies);
  };

  // Reloads cellData with a new, filtered dataset.
  // filter[0]: Filtering on "ALL", "SPECIES", "FAMILY".
  // filter[1]: Filtering by "ALL", {{ entered_value }}.
  const loadData = (filter?: string[]) => {
    setCellData(prevCellData => {
      const updatedCellData = [...prevCellData];
      clearData(updatedCellData, 0);

      for (let i = 0; i < accessions.length; i++) {
        const accession = accessions[i] as Accession;
        const cell = updatedCellData.find((cell) => cell.id === accession.cell);
        const curFamily = accession.family;
        const curSpecies = accession.species;

        if (cell !== undefined) {
          if (filter === undefined) {
            cell.accessions++;
            if (!cell.uniqueFamilies.includes(curFamily)) {
              cell.uniqueFamilies.push(curFamily);
              cell.families++;
            }
            if (!cell.uniqueSpecies.includes(curSpecies)) {
              cell.uniqueSpecies.push(curSpecies);
              cell.species++;
            }
          } else {
            if (filter[0] === "FAMILY") {
              if (curFamily === filter[1]) {
                cell.uniqueFamilies = [filter[1]];
                cell.accessions++;
                cell.families++;
                if (!cell.uniqueSpecies.includes(curSpecies)) {
                  cell.uniqueSpecies.push(curSpecies);
                  cell.species++;
                }
              }
            } else if (filter[0] === "SPECIES") {
              if (curSpecies === filter[1]) {
                cell.uniqueSpecies = [filter[1]];
                cell.accessions++;
                cell.species++;
                if (!cell.uniqueFamilies.includes(curFamily)) {
                  cell.uniqueFamilies.push(curFamily);
                  cell.families++;
                }
              }
            }
          }
        }
      }

      // Prepare array
      const mathArrayA: number[] = [];
      const mathArrayF: number[] = [];
      const mathArrayS: number[] = [];
      let newTotalAccessions = 0;
      
      for (let i = 0; i < updatedCellData.length; i++) {
        const cell = updatedCellData[i];
        mathArrayA.push(cell.accessions);
        mathArrayF.push(cell.families);
        mathArrayS.push(cell.species);
        newTotalAccessions += cell.accessions;
      }

      // Calculate mean + standard deviation
      const n = mathArrayA.length;
      const newMeanA = mathArrayA.reduce((a, b) => a + b) / n;
      const newMeanF = mathArrayF.reduce((a, b) => a + b) / n;
      const newMeanS = mathArrayS.reduce((a, b) => a + b) / n;
      const newStdDevA = Math.sqrt(
        mathArrayA
          .map((x) => Math.pow(x - newMeanA, 2))
          .reduce((a, b) => a + b) / n
      );
      const newStdDevF = Math.sqrt(
        mathArrayF
          .map((x) => Math.pow(x - newMeanF, 2))
          .reduce((a, b) => a + b) / n
      );
      const newStdDevS = Math.sqrt(
        mathArrayS
          .map((x) => Math.pow(x - newMeanS, 2))
          .reduce((a, b) => a + b) / n
      );

      // Update state
      setTotalAccessions(newTotalAccessions);
      setMeanA(newMeanA);
      setMeanF(newMeanF);
      setMeanS(newMeanS);
      setStdDevA(newStdDevA);
      setStdDevF(newStdDevF);
      setStdDevS(newStdDevS);

      // Calculate + attach z-scores, attach diversity
      let minZ = 100;
      let maxZ = -100;
      let minZU = 100;
      let maxZU = -100;
      
      for (let i = 0; i < updatedCellData.length; i++) {
        const cell = updatedCellData[i];
        cell.zscoreA = (cell.accessions - newMeanA) / newStdDevA;
        cell.zscoreF = (cell.families - newMeanF) / newStdDevF;
        cell.zscoreS = (cell.species - newMeanS) / newStdDevS;
        cell.diversity = (cell.families + cell.species) / (cell.accessions * 2);
        const avgZscoreU = (cell.zscoreF + cell.zscoreS) / 2;
        
        if (cell.zscoreA < minZ) {
          minZ = cell.zscoreA;
        }
        if (cell.zscoreA > maxZ) {
          maxZ = cell.zscoreA;
        }
        if (avgZscoreU < minZU) {
          minZU = avgZscoreU;
        }
        if (avgZscoreU > maxZU) {
          maxZU = avgZscoreU;
        }
        
        cell.rodHeight = 0.1875 + (cell.accessions * 0.1875) / 5;
        cell.blocks = 1 + (cell.families + cell.species) / 10;
      }
      
      // Calculate + attach percentage
      for (let i = 0; i < updatedCellData.length; i++) {
        const cell = updatedCellData[i];
        const avgZscoreU = (cell.zscoreF + cell.zscoreS) / 2;
        cell.percentage = (100 * (cell.zscoreA - minZ)) / (maxZ - minZ);
        cell.percentageU = (100 * (avgZscoreU - minZU)) / (maxZU - minZU);
      }

      if (filter !== undefined) {
        setCurView(filter[0]);
      } else {
        setCurView("");
      }
      
      setActivityFlag(prev => !prev);
      
      return updatedCellData;
    });
  };

  // Sets all Cell.data in cellData to value.
  const clearData = (data: Cell[], value: number) => {
    for (let i = 0; i < data.length; i++) {
      data[i].accessions = value;
      data[i].families = value;
      data[i].species = value;
      data[i].zscoreA = value;
      data[i].zscoreF = value;
      data[i].zscoreS = value;
      data[i].diversity = value;
      data[i].percentage = value;
      data[i].percentageU = value;
      data[i].uniqueFamilies = ["ROOT"];
      data[i].uniqueSpecies = ["ROOT"];
      data[i].rodHeight = value;
      data[i].blocks = value;
    }
  };

  const getCellRow = (id: string): number => {
    const str = id.split("-")[0];
    let row: number;
    if (str.includes("S")) {
      row = Number(str.substring(0, 1)); //8S: 8 + 50 -> 58
    } else {
      row = 0 - Number(str); //50: -50 + 50 -> 0
    }
    return row + 50;
  };

  const getCellCol = (id: string): number => {
    const str = id.split("-")[1];
    let col: number;
    if (str.includes("W")) {
      col = 0 - Number(str.substring(0, 1)); //7W: -7 + 7 -> 0
    } else if (str.includes("E")) {
      col = Number(str.substring(0, 1)); //9E: 9 + 7 -> 16
    } else {
      col = 0;
    }
    return col + 7;
  };

  const temp = (str: string) => {
    // console.log(str);
    // setActivityFlag(prev => !prev);
  };

  return (
    <div className="flex flex-col pt-16 px-4 md:px-8 lg:px-16">
      <h2>Mapping Arboretum Data</h2>
      <p className="mb-16">Control the data through the filters below.</p>
      <div className="mb-8">
        <h6>Filter by:</h6>

        <div className="toggle-group space-x-4">
          <button onClick={() => loadData()}>All Accessions</button>
          <button onClick={() => loadData(['FAMILY', familyFilter])}>Family</button>
          <button onClick={() => loadData(['SPECIES', speciesFilter])}>Species</button>
        </div>
        
        {curView === '' && (
          <select 
            value={curFilter} 
            onChange={(e) => setCurFilter(e.target.value)}
          >
            <option disabled value="">Please Select</option>
            <option value="ALL">Total Accessions</option>
            <option value="FAMILY">Unique Families</option>
            <option value="SPECIES">Unique Species</option>
            <option value="Z-SCORE">Average z-score</option>
            <option value="Z-SCORE-UNIQUE">Uniqueness z-score</option>
            <option value="DIVERSITY">Diversity</option>
            <option value="PERCENTAGE">Percentage</option>
          </select>
        )}

        {curView === 'FAMILY' && (
          <select
            value={familyFilter}
            onChange={(e) => {
              setFamilyFilter(e.target.value);
              loadData(['FAMILY', e.target.value]);
            }}
          >
            <option disabled value="">Please Select</option>
            {families.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {curView === 'SPECIES' && (
          <input
            value={speciesFilter}
            onChange={(e) => {
              setSpeciesFilter(e.target.value);
              loadData(['SPECIES', e.target.value]);
            }}
            placeholder="enter species"
          />
        )}

        <select 
          value={blockHeights} 
          onChange={(e) => {
            setBlockHeights(e.target.value);
            temp(e.target.value);
          }}
        >
          <option value="ALL">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>

      <ArboretumVis
        dataset={cellData}
        view={curView}
        filter={curFilter}
        activity={activityFlag}
        totalAccessions={totalAccessions}
        meanA={meanA}
        meanF={meanF}
        meanS={meanS}
        stdDevA={stdDevA}
        stdDevF={stdDevF}
        stdDevS={stdDevS}
        blockHeights={blockHeights}
      />
    </div>
  );
};

export default ArboretumExplorer;
