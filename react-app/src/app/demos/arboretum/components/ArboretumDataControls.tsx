'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useArboretum } from '../lib/ArboretumProvider';
import { getMetricDisplayName } from '../lib/ArboretumUtils';

// These components provide interactivity to its sister component, <ArboretumVisualization/>.
// If possible, computation should be done in ArboretumExplorer.ts

export function DataControls() {
  const { 
    filterConfig, 
    computeConfig, 
    families, 
    species, 
    setFilter, 
    setCompute 
  } = useArboretum();
  
  const [speciesInput, setSpeciesInput] = useState('');
  const [activeTab, setActiveTab] = useState('none');
  const handleComputeChange = (metric: string) => {
    setCompute({ 
      metric: metric as 'ALL' | 'FAMILY' | 'SPECIES' | 'Z-SCORE' | 'Z-SCORE-UNIQUE' | 'DIVERSITY' | 'PERCENTAGE' 
    });
  };

  const handleFilterChange = (type: 'ALL' | 'FAMILY' | 'SPECIES', value: string = '') => {
    setFilter({ type, value });
    if (type === 'ALL') {
      setActiveTab('none');
    }
  };

  const handleSpeciesSubmit = () => {
    if (speciesInput.trim()) {
      handleFilterChange('SPECIES', speciesInput.trim());
    }
  };

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
        <Select value={computeConfig.metric} onValueChange={handleComputeChange}>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="none" onClick={() => handleFilterChange('ALL')}>None</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="species">Species</TabsTrigger>
          </TabsList>

          <TabsContent value="none">{/* Don't filter anything */}</TabsContent>
          <TabsContent value="family">
            {/* Filter by family */}
            <Select 
              value={filterConfig.type === 'FAMILY' ? filterConfig.value : ''} 
              onValueChange={(value) => handleFilterChange('FAMILY', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a family..." />
              </SelectTrigger>
              <SelectContent>
                {families.filter(family => family && family.trim() !== '').map((family) => (
                  <SelectItem key={family} value={family}>{family}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TabsContent>
          <TabsContent value="species">
            {/* Filter by species */}
            <div className="flex gap-2">
              <Input 
                placeholder="Enter species name..." 
                value={speciesInput}
                onChange={(e) => setSpeciesInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSpeciesSubmit()}
              />
              <Button onClick={handleSpeciesSubmit}>Go</Button>
            </div>
            <Dialog>
              <DialogTrigger>View list of species</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Species list</DialogTitle>
                  <DialogDescription>
                    Copy a species&apos;s name, then paste into the input field.
                  </DialogDescription>
                  <div className="max-h-64 overflow-y-auto">
                    <ul>
                      <li className="flex flex-row font-medium border-b">
                        <p className="text-sm basis-2/3">Species name</p>
                        <p className="text-sm basis-1/3 text-tx-tertiary">Family</p>
                      </li>
                      {species.filter(speciesName => speciesName && speciesName.trim() !== '').map((speciesName) => {
                        // Find the family for this species from the data
                        const family = 'Unknown'; // You could enhance this by creating a species->family lookup
                        return (
                          <li key={speciesName} className="flex flex-row py-1 text-xs cursor-pointer hover:bg-gray-100" 
                              onClick={() => setSpeciesInput(speciesName)}>
                            <p className="basis-2/3">{speciesName}</p>
                            <p className="basis-1/3 text-tx-tertiary">{family}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
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
  const { statistics, computeConfig, filterConfig } = useArboretum();
  const metricName = getMetricDisplayName(computeConfig.metric);
  
  return (
    <div className="card">
      <div className="flex flex-col p-2 border-b border-bd-secondary">
        <div className="flex">
          <h2 className="flex-grow">Overview</h2>
          <Button>collapse card</Button>
        </div>
        <p>
          Currently, each cell represents {metricName.toLowerCase()}.
          {filterConfig.type !== 'ALL' && (
            <span> Filtered by {filterConfig.type.toLowerCase()}: {filterConfig.value}</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
          <p className="text-lg font-medium">{statistics.totalAccessions.toLocaleString()}</p>
          <p className="text-xs text-tx-secondary">Accessions</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium">{statistics.filledCells}</p>
          <p className="text-xs text-tx-secondary">Filled cells</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium">{statistics.meanA.toFixed(1)}</p>
          <p className="text-xs text-tx-secondary">Mean (Accessions)</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium">{statistics.stdDevA.toFixed(2)}</p>
          <p className="text-xs text-tx-secondary">Std Dev (Accessions)</p>
        </div>
        <div className="col-span-2 flex gap-4 pt-2">
          <div className="flex gap-2 items-center">
            <div className="h-3 w-3 bg-blue-200 rounded"></div>
            <p className="text-xs">Min</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="h-3 w-3 bg-blue-800 rounded"></div>
            <p className="text-xs">Max</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export function CurrentSelection() {
  const { selectedCell, selectCell } = useArboretum();
  
  if (!selectedCell) {
    return null; // Don't render if no cell is selected
  }

  const handleUnselect = () => {
    selectCell(null);
  };

  return (
    <div className="card">
        <div className="flex p-2 border-b border-bd-secondary">
          <h2 className="flex-grow">Current Selection</h2>
          {/* When this button is pressed, it should close the card and unselect the grid cell. */}
          <Button onClick={handleUnselect}>unselect</Button>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
          <div className="col-span-2">
            <p className="text-sm font-medium">Cell: {selectedCell.id}</p>
            <p className="text-xs text-tx-tertiary">Row {selectedCell.row}, Column {selectedCell.col}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium">{selectedCell.accessions}</p>
            <p className="text-xs text-tx-secondary">Accessions</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium">{selectedCell.families}</p>
            <p className="text-xs text-tx-secondary">Unique Families</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium">{selectedCell.species}</p>
            <p className="text-xs text-tx-secondary">Unique Species</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium">{selectedCell.diversity.toFixed(3)}</p>
            <p className="text-xs text-tx-secondary">Diversity</p>
          </div>
          {selectedCell.uniqueFamilies.length > 0 && (
            <div className="col-span-2">
              <p className="text-xs text-tx-secondary mb-1">Families:</p>
              <div className="text-xs max-h-20 overflow-y-auto">
                {selectedCell.uniqueFamilies.join(', ')}
              </div>
            </div>
          )}
          {selectedCell.uniqueSpecies.length > 0 && (
            <div className="col-span-2">
              <p className="text-xs text-tx-secondary mb-1">Species:</p>
              <div className="text-xs max-h-20 overflow-y-auto">
                {selectedCell.uniqueSpecies.join(', ')}
              </div>
            </div>
          )}
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