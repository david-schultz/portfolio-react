<script setup lang="ts">
// import * as d3 from "d3";
// import { ref, watch } from "vue";
// import ToggleGroup from "../components/ToggleGroup.vue";
// import ArboretumExplorer from "../components/ArboretumExplorer.vue";

// import accessions from "../assets/arboretum/accessions.json";
// import validCells from "../assets/arboretum/validcells.json";
// import { mean } from "d3";

// interface Cell {
//   id: string;
//   row: number;
//   col: number;
//   accessions: number;
//   families: number;
//   species: number;
//   zscoreA: number;
//   zscoreF: number;
//   zscoreS: number;
//   diversity: number;
//   percentage: number;
//   percentageU: number;
//   uniqueFamilies: string[];
//   uniqueSpecies: string[];
//   rodHeight: number;
//   blocks: number;
// }

// const cellData: Array<Cell> = [];
// const curView = ref("");
// const curFilter = ref("");
// const familyFilter = ref("Ericaceae");
// const speciesFilter = ref("Acer davidii");
// const blockHeights = ref("ALL");
// const activityFlag = ref(false);

// const totalAccessions = ref(-1);
// const meanA = ref(-1);
// const meanF = ref(-1);
// const meanS = ref(-1);
// const stdDevA = ref(-1);
// const stdDevF = ref(-1);
// const stdDevS = ref(-1);
// const species: string[] = [];
// const families: string[] = [];

// init();
// loadData();

// // Creates and pushes new Cells into cellData.
// function init() {
//   for (let i = 0; i < accessions.length; i++) {
//     if (cellData.filter((e) => e.id === accessions[i].cell).length === 0) {
//       let newCell: Cell = {
//         id: accessions[i].cell,
//         row: getCellRow(accessions[i].cell),
//         col: getCellCol(accessions[i].cell),
//         accessions: -1,
//         families: -1,
//         species: -1,
//         zscoreA: -1,
//         zscoreF: -1,
//         zscoreS: -1,
//         diversity: -1,
//         percentage: -1,
//         percentageU: -1,
//         uniqueFamilies: ["ROOT"],
//         uniqueSpecies: ["ROOT"],
//         rodHeight: -1,
//         blocks: -1,
//       };
//       cellData.push(newCell);
//     }
//     if (!families.includes(accessions[i].family)) {
//       families.push(accessions[i].family);
//     }
//     if (!species.includes(accessions[i].species)) {
//       species.push(accessions[i].species);
//     }
//   }
// }

// // Reloads cellData with a new, filtered dataset.
// // filter[0]: Filtering on "ALL", "SPECIES", "FAMILY".
// // filter[1]: Filtering by "ALL", {{ entered_value }}.
// // values: "RICHNESS"
// function loadData(filter?: string[]) {
//   clearData(0);

//   for (let i = 0; i < accessions.length; i++) {
//     const cell = cellData.find((cell) => cell.id === accessions[i].cell);
//     const curFamily = accessions[i].family;
//     const curSpecies = accessions[i].species;

//     if (cell !== undefined) {
//       if (filter === undefined) {
//         cell.accessions++;
//         if (!cell.uniqueFamilies.includes(curFamily)) {
//           cell.uniqueFamilies.push(curFamily);
//           cell.families++;
//         }
//         if (!cell.uniqueSpecies.includes(curSpecies)) {
//           cell.uniqueSpecies.push(curSpecies);
//           cell.species++;
//         }
//       } else {
//         if (filter[0] === "FAMILY") {
//           if (curFamily === filter[1]) {
//             cell.uniqueFamilies = [filter[1]];
//             cell.accessions++;
//             cell.families++;
//             if (!cell.uniqueSpecies.includes(curSpecies)) {
//               cell.uniqueSpecies.push(curSpecies);
//               cell.species++;
//             }
//           }
//         } else if (filter[0] === "SPECIES") {
//           if (curSpecies === filter[1]) {
//             cell.uniqueSpecies = [filter[1]];
//             cell.accessions++;
//             cell.species++;
//             if (!cell.uniqueFamilies.includes(curFamily)) {
//               cell.uniqueFamilies.push(curFamily);
//               cell.families++;
//             }
//           }
//         }
//       }
//     }
//   }

//   // Prepare array
//   const mathArrayA: number[] = [];
//   const mathArrayF: number[] = [];
//   const mathArrayS: number[] = [];
//   for (let i = 0; i < cellData.length; i++) {
//     const cell = cellData[i];
//     mathArrayA.push(cell.accessions);
//     mathArrayF.push(cell.families);
//     mathArrayS.push(cell.species);
//     totalAccessions.value += cell.accessions;
//   }

//   // Calculate mean + standard deviation
//   const n = mathArrayA.length;
//   meanA.value = mathArrayA.reduce((a, b) => a + b) / n;
//   meanF.value = mathArrayF.reduce((a, b) => a + b) / n;
//   meanS.value = mathArrayS.reduce((a, b) => a + b) / n;
//   stdDevA.value = Math.sqrt(
//     mathArrayA
//       .map((x) => Math.pow(x - meanA.value, 2))
//       .reduce((a, b) => a + b) / n
//   );
//   stdDevF.value = Math.sqrt(
//     mathArrayF
//       .map((x) => Math.pow(x - meanF.value, 2))
//       .reduce((a, b) => a + b) / n
//   );
//   stdDevS.value = Math.sqrt(
//     mathArrayS
//       .map((x) => Math.pow(x - meanS.value, 2))
//       .reduce((a, b) => a + b) / n
//   );

//   // Calculate + attach z-scores, attach diversity
//   let minZ = 100;
//   let maxZ = -100;
//   let minZU = 100;
//   let maxZU = -100;
//   for (let i = 0; i < cellData.length; i++) {
//     const cell = cellData[i];
//     cell.zscoreA = (cell.accessions - meanA.value) / stdDevA.value;
//     cell.zscoreF = (cell.families - meanF.value) / stdDevF.value;
//     cell.zscoreS = (cell.species - meanA.value) / stdDevS.value;
//     cell.diversity = (cell.families + cell.species) / (cell.accessions * 2);
//     const avgZscore = (cell.zscoreA + cell.zscoreF + cell.zscoreS) / 3;
//     const avgZscoreU = (cell.zscoreF + cell.zscoreS) / 2;
//     // if (avgZscore < minZ) {
//     //   minZ = avgZscore;
//     // }
//     // if (avgZscore > maxZ) {
//     //   maxZ = avgZscore;
//     // }
//     if (cell.zscoreA < minZ) {
//       minZ = cell.zscoreA;
//     }
//     if (cell.zscoreA > maxZ) {
//       maxZ = cell.zscoreA;
//     }
//     if (avgZscoreU < minZU) {
//       minZU = avgZscoreU;
//     }
//     if (avgZscoreU > maxZU) {
//       maxZU = avgZscoreU;
//     }
//     cell.rodHeight = 0.1875 + (cell.accessions * 0.1875) / 5;
//     cell.blocks = 1 + (cell.families + cell.species) / 10;
//   }
//   // Calculate + attach percentage
//   for (let i = 0; i < cellData.length; i++) {
//     const cell = cellData[i];
//     const avgZscore = (cell.zscoreA + cell.zscoreF + cell.zscoreS) / 3;
//     const avgZscoreU = (cell.zscoreF + cell.zscoreS) / 2;
//     // cell.percentage = (100 * (avgZscore - minZ)) / (maxZ - minZ);
//     cell.percentage = (100 * (cell.zscoreA - minZ)) / (maxZ - minZ);
//     cell.percentageU = (100 * (avgZscoreU - minZU)) / (maxZU - minZU);
//   }

//   if (filter !== undefined) {
//     curView.value = filter[0];
//   } else {
//     curView.value = "";
//   }
//   activityFlag.value = !activityFlag.value;
// }

// // Sets all Cell.data in cellData to value.
// function clearData(value: number) {
//   for (let i = 0; i < cellData.length; i++) {
//     cellData[i].accessions = value;
//     cellData[i].families = value;
//     cellData[i].species = value;
//     cellData[i].zscoreA = value;
//     cellData[i].zscoreF = value;
//     cellData[i].zscoreS = value;
//     cellData[i].diversity = value;
//     cellData[i].percentage = value;
//     cellData[i].percentageU = value;
//     cellData[i].uniqueFamilies = ["ROOT"];
//     cellData[i].uniqueSpecies = ["ROOT"];
//     cellData[i].rodHeight = value;
//     cellData[i].blocks = value;
//   }
//   totalAccessions.value = value;
//   meanA.value = value;
//   meanF.value = value;
//   meanS.value = value;
//   stdDevA.value = value;
//   stdDevF.value = value;
//   stdDevS.value = value;
// }

// function getCellId(row: number, col: number) {
//   let rowStr;
//   if (row < 51) {
//     let conversion = -row + 50;
//     rowStr = conversion.toString();
//   } else {
//     let conversion = row - 50;
//     rowStr = conversion.toString() + "S";
//   }

//   let colStr;
//   if (col < 7) {
//     let conversion = -col + 7;
//     colStr = conversion.toString() + "W";
//   } else if (col > 7) {
//     let conversion = col - 7;
//     colStr = conversion.toString() + "E";
//   } else {
//     colStr = "B";
//   }
//   return rowStr + "-" + colStr;
// }

// function getCellRow(id: string) {
//   const str = id.split("-")[0];
//   let row;
//   if (str.includes("S")) {
//     row = Number(str.substring(0, 1)); //8S: 8 + 50 -> 58
//   } else {
//     row = 0 - Number(str); //50: -50 + 50 -> 0
//   }
//   return row + 50;
// }

// function getCellCol(id: string) {
//   const str = id.split("-")[1];
//   let col;
//   if (str.includes("W")) {
//     col = 0 - Number(str.substring(0, 1)); //7W: -7 + 7 -> 0
//   } else if (str.includes("E")) {
//     col = Number(str.substring(0, 1)); //9E: 9 + 7 -> 16
//   } else {
//     col = 0;
//   }
//   return col + 7;
// }

// function temp(str: string) {
//   // console.log(str);
//   // activityFlag.value = !activityFlag.value;
// }
</script>

<template>
  <div class="flex flex-col pt-16 px-4 md:px-8 lg:px-16">
    <h2>Mapping Arboretum Data</h2>
    <p class="mb-16">Control the data through the filters below.</p>
    <div class="mb-8">
      <h6>Filter by:</h6>

      <div class="toggle-group space-x-4">
        <button @click="loadData()">All Accessions</button>
        <button @click="loadData(['FAMILY', familyFilter])">Family</button>
        <button @click="loadData(['SPECIES', speciesFilter])">Species</button>
      </div>
      <select v-model="curFilter" v-if="curView === ''">
        <option disabled value="">Please Select</option>
        <option value="ALL" selected>Total Accessions</option>
        <option value="FAMILY">Unique Families</option>
        <option value="SPECIES">Unique Species</option>
        <option value="Z-SCORE">Average z-score</option>
        <option value="Z-SCORE-UNIQUE">Uniqueness z-score</option>
        <option value="DIVERSITY">Diversity</option>
        <option value="PERCENTAGE">Percentage</option>
      </select>

      <select
        v-model="familyFilter"
        v-if="curView === 'FAMILY'"
        @change="loadData(['FAMILY', familyFilter])"
      >
        <option disabled value="">Please Select</option>
        <option v-for="option in families" :value="option" :key="option">
          {{ option }}
        </option>
      </select>

      <input
        v-model="speciesFilter"
        v-if="curView === 'SPECIES'"
        @change="loadData(['SPECIES', speciesFilter])"
        placeholder="enter species"
      />

      <select v-model="blockHeights" @change="temp(blockHeights)">
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
      :dataset="cellData"
      :view="curView"
      :filter="curFilter"
      :activity="activityFlag"
      :totalAccessions="totalAccessions"
      :meanA="meanA"
      :meanF="meanF"
      :meanS="meanS"
      :stdDevA="stdDevA"
      :stdDevF="stdDevF"
      :stdDevS="stdDevS"
      :blockHeights="blockHeights"
    />
  </div>
</template>

<style scoped></style>