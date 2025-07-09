'use client'

import accessions from '@/app/demos/arboretum/data/accessions.json';
import { Button } from '@/components/ui/Button'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input';import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

// These components provide interactivity to its sister component, <ArboretumVisualization/>.
// If possible, computation should be done in ArboretumExplorer.ts

export function DataControls() {
  return (
    <div className="bg-bg-card">
      <div className="flex flex-col p-2 border-b border-bd-secondary">
        <div className="flex">
          <h2 className="flex-grow">Data controls</h2>
          <Button>collapse card</Button>
        </div>
        <p>Explore the arboretum data through the filters below.</p>
      </div>

      <div className="flex flex-col p-2 border-b border-bd-secondary">
        <h3>Compute:</h3>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Total Accessions</SelectItem>
            <SelectItem value="FAMILY">Unique Families</SelectItem>
            <SelectItem value="SPECIES">Unique Species</SelectItem>
            <SelectItem value="Z-SCORE">Average z-score</SelectItem>
            <SelectItem value="Z-SCORE-UNIQUE">Uniqueness z-score</SelectItem>
            <SelectItem value="DIVERSITY">Diversity</SelectItem>
            <SelectItem value="PERCENTAGE">Percentage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col p-2 border-b border-bd-secondary">
        <h3>Filter by:</h3>

        <Tabs defaultValue="none" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="none">None</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="species">Species</TabsTrigger>
          </TabsList>

          <TabsContent value="none">{/* Don't filter anything */}</TabsContent>
          <TabsContent value="family">
            {/* Filter by family */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a family..." />
              </SelectTrigger>
              <SelectContent>
                {/* Populate with families */}
                <SelectItem value="EXAMPLE">Example</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>
          <TabsContent value="species">
            {/* Filter by species */}
            <Input placeholder="Enter species name..." />
            <Button>Go</Button>
            <Dialog>
              <DialogTrigger>View list of species</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Species list</DialogTitle>
                  <DialogDescription>
                    Copy a species's name, then paste into the input field.
                  </DialogDescription>
                  <ul>
                    {/* Populate with list of all species */}
                    <li className="flex flex-row">
                      <p className="text-sm basis-1/3">Species name</p>
                      <p className="text-sm basis-1/3 text-tx-tertiary">Family</p>
                      <p className="text-sm basis-1/3 text-tx-tertiary">Count</p>
                    </li>
                  </ul>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TabsContent>

        </Tabs>
      </div>

    </div>
  )
}

export function Overview() {
  return (
    <div className="card">
      <div className="flex flex-col p-2 border-b border-bd-secondary">
        <div className="flex">
          <h2 className="flex-grow">Overview</h2>
          <Button>collapse card</Button>
        </div>
        <p>Currently, each cell represents {/* INSERT CURRENTLY SELECTED COMPUTATION METHOD */}.</p>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <p>12,481 {/* REPLACE WITH TOTAL NUMBER OF ACCESSIONS AFTER FILTERING + COMPUTING */}</p>
          <p className="text-xs text-tx-secondary">Accessions</p>
        </div>
        <div className="flex flex-col">
          <p>586 {/* REPLACE WITH TOTAL NUMBER OF CELLS THAT HAVE >0 ACCESSIONS */}</p>
          <p className="text-xs text-tx-secondary">Filled cells</p>
        </div>
        <div className="flex flex-col">
          <p>21.3 {/* REPLACE WITH MEAN NUMBER OF ACCESSIONS */}</p>
          <p className="text-xs text-tx-secondary">Mean</p>
        </div>
        <div className="flex flex-col">
          <p>34.87 {/* REPLACE WITH STANDARD DEVIATION */}</p>
          <p className="text-xs text-tx-secondary">Standard Deviation</p>
        </div>
        <div className="col-span-2 flex">
          <div className="flex gap-2">
            <div className="h-1 w-1 bg-red"></div>
            <p>Min</p>
          </div>
          <div className="flex gap-2">
            <div className="h-1 w-1 bg-blue"></div>
            <p>Max</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export function CurrentSelection() {
  return (
    <div className="card">
        <div className="flex">
          <h2 className="flex-grow">Current Selection</h2>
          {/* When this button is pressed, it should close the card and unselect the grid cell. */}
          <Button>unselect</Button>
        </div>
        <div className="grid grid-cols-2">
          <div>
            Empty for now
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p>34 {/* REPLACE WITH NUMBER OF ACCESSIONS IN CURRENTLY SELECTED CELL */}</p>
              <p className="text-xs text-tx-secondary">Accessions</p>
            </div>
            <div className="flex flex-col">
              <p>4 {/* REPLACE WITH NUMBER OF UNIQUE SPECIES IN CURRENTLY SELECTED CELL */}</p>
              <p className="text-xs text-tx-secondary">Unique Species</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export function DataStories() {
  return (
    <div className="card">
      <h2>Data Stories</h2>
      {/* ignore for now */}
    </div>
  )
}