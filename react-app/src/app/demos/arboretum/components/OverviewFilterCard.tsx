'use client'

import * as React from "react"
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useArboretum, Accession } from '../lib/ArboretumProvider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { Check, Xmark, FilterAlt, NavArrowDownSolid, NavArrowUpSolid, NavArrowRight, NavArrowDown } from 'iconoir-react';


// Types for family and species data
interface FamilyData {
  name: string;
  accessionCount: number;
  species: SpeciesData[];
}

interface SpeciesData {
  name: string;
  accessionCount: number;
}

// Utility function to truncate text and determine if tooltip is needed
const truncateText = (text: string, maxLength: number = 20): { text: string; isTruncated: boolean } => {
  if (text.length <= maxLength) {
    return { text, isTruncated: false };
  }
  return { text: text.substring(0, maxLength - 3) + '...', isTruncated: true };
};

// Custom cell component with tooltip for truncated text
const TruncatedCell: React.FC<{ text: string; maxLength?: number }> = ({ text, maxLength = 20 }) => {
  const { text: displayText, isTruncated } = truncateText(text, maxLength);
  
  if (isTruncated) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-default">{displayText}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return <span>{displayText}</span>;
};

// Filter state management types
interface FilterState {
  selectedFamilies: Set<string>;
  selectedSpecies: Set<string>;
}

// Accordion row component for nested family/species structure
interface AccordionRowProps {
  family: FamilyData;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  filterState: FilterState;
  onFilterChange: (newState: FilterState) => void;
  searchText: string;
}

const AccordionRow: React.FC<AccordionRowProps> = ({
  family,
  isExpanded,
  onToggleExpanded,
  filterState,
  onFilterChange,
  searchText
}) => {
  // Filter species based on search text
  const filteredSpecies = useMemo(() => {
    if (!searchText) return family.species;
    return family.species.filter(species => 
      species.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [family.species, searchText]);

  // Check if family should be shown (either matches search or has matching species)
  const shouldShowFamily = useMemo(() => {
    if (!searchText) return true;
    return family.name.toLowerCase().includes(searchText.toLowerCase()) || filteredSpecies.length > 0;
  }, [family.name, searchText, filteredSpecies]);

  // Calculate checkbox state for family
  const getCheckboxState = useCallback(() => {
    const selectedSpeciesInFamily = family.species.filter(species => 
      filterState.selectedSpecies.has(species.name)
    );
    
    if (selectedSpeciesInFamily.length === 0) {
      return 'unchecked';
    } else if (selectedSpeciesInFamily.length === family.species.length) {
      return 'checked';
    } else {
      return 'indeterminate';
    }
  }, [family.species, filterState.selectedSpecies]);

  const handleFamilyToggle = useCallback(() => {
    const checkboxState = getCheckboxState();
    const newSelectedSpecies = new Set(filterState.selectedSpecies);
    
    if (checkboxState === 'unchecked' || checkboxState === 'indeterminate') {
      // Select all species in family
      family.species.forEach(species => {
        newSelectedSpecies.add(species.name);
      });
    } else {
      // Unselect all species in family
      family.species.forEach(species => {
        newSelectedSpecies.delete(species.name);
      });
    }
    
    onFilterChange({
      ...filterState,
      selectedSpecies: newSelectedSpecies
    });
  }, [family.species, filterState, onFilterChange, getCheckboxState]);

  const handleSpeciesToggle = useCallback((speciesName: string) => {
    const newSelectedSpecies = new Set(filterState.selectedSpecies);
    
    if (newSelectedSpecies.has(speciesName)) {
      newSelectedSpecies.delete(speciesName);
    } else {
      newSelectedSpecies.add(speciesName);
    }
    
    onFilterChange({
      ...filterState,
      selectedSpecies: newSelectedSpecies
    });
  }, [filterState, onFilterChange]);

  if (!shouldShowFamily) return null;

  const checkboxState = getCheckboxState();

  return (
    <>
      <TableRow 
        className="cursor-pointer hover:bg-bg-hover"
        onClick={(e) => {
          if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.family-content')) {
            handleFamilyToggle();
          }
        }}
      >
        <TableCell className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="xs" 
            className="px-1"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpanded();
            }}
            aria-label={isExpanded ? "Collapse family" : "Expand family"}
          >
            {isExpanded ? <NavArrowDown /> : <NavArrowRight />}
          </Button>
          <Checkbox
            checked={checkboxState === 'checked' ? true : checkboxState === 'indeterminate' ? 'indeterminate' : false}
            onCheckedChange={(checked) => {
              handleFamilyToggle();
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="family-content">
            <TruncatedCell text={family.name} maxLength={25} />
          </div>
        </TableCell>
        <TableCell>{family.accessionCount.toLocaleString()}</TableCell>
      </TableRow>
      
      {isExpanded && filteredSpecies.map((species) => (
        <TableRow 
          key={species.name}
          className="cursor-pointer hover:bg-bg-hover"
          onClick={() => handleSpeciesToggle(species.name)}
        >
          <TableCell className="pl-12 flex items-center gap-2">
            <Checkbox
              checked={filterState.selectedSpecies.has(species.name)}
              onCheckedChange={() => handleSpeciesToggle(species.name)}
              onClick={(e) => e.stopPropagation()}
            />
            <TruncatedCell text={species.name} maxLength={30} />
          </TableCell>
          <TableCell>{species.accessionCount.toLocaleString()}</TableCell>
        </TableRow>
      ))}
    </>
  );
};


export function OverviewFilterCard() {
  const { 
    families, 
    species, 
    statistics,
    accessions,
    filterConfig,
    setFilter
  } = useArboretum();
  
  // Dialog open state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Calculate currently applied filters
  const appliedFilters = useMemo(() => {
    const filters: { family: string; speciesCount: number }[] = [];
    
    if (filterConfig.type === 'FAMILY' && filterConfig.value) {
      const familySpecies = accessions.filter(acc => acc.family === filterConfig.value);
      const uniqueSpecies = new Set(familySpecies.map(acc => acc.species));
      filters.push({ family: filterConfig.value, speciesCount: uniqueSpecies.size });
    } else if (filterConfig.type === 'SPECIES' && filterConfig.value) {
      const speciesAccession = accessions.find(acc => acc.species === filterConfig.value);
      if (speciesAccession) {
        filters.push({ family: speciesAccession.family, speciesCount: 1 });
      }
    }
    
    return filters;
  }, [filterConfig, accessions]);

  const clearAllFilters = useCallback(() => {
    setFilter({ type: 'ALL', value: '' });
    setIsDialogOpen(false);
  }, [setFilter]);

  return (
    <div className="bg-bg-card p-2 flex flex-col border rounded">
      <div className="flex px-2">
        <h3 className="text-lg">Data</h3>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex px-2 gap-2">
          <DialogTrigger asChild>
            <Button variant="tertiary"><FilterAlt/> Filters</Button>
          </DialogTrigger>
          {appliedFilters.length > 0 && (
            <Button onClick={clearAllFilters}>
              {appliedFilters.reduce((sum, filter) => sum + filter.speciesCount, 0)} applied <Xmark/>
            </Button>
          )}
          <SelectionDialogContent/>
        </div>
      </Dialog>
      <div className="bg-bg-secondary flex flex-col gap-2 px-4 py-3 font-mono">
        <div className="flex">
          <div className="flex flex-col grow">
            <p className="text-lg text-tx-body">{statistics.totalAccessions.toLocaleString()}</p>
            <p className="text-sm text-tx-tertiary">Accessions</p>
          </div>
          <div className="flex flex-col grow">
            <p className="text-lg text-tx-body">{statistics.filledCells}</p>
            <p className="text-sm text-tx-tertiary">Filled cells</p>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col grow">
            <p className="text-lg text-tx-body">{statistics.meanA.toFixed(1)}</p>
            <p className="text-sm text-tx-tertiary">Unique Species</p>
          </div>
          <div className="flex flex-col grow">
            <p className="text-lg text-tx-body">{statistics.stdDevA.toFixed(2)}</p>
            <p className="text-sm text-tx-tertiary">Standard deviation</p>
          </div>
        </div>
      </div>
    </div>
  );
}



export function SelectionDialogContent() {
  const { 
    accessions, 
    families, 
    species, 
    setFilter,
    filterConfig 
  } = useArboretum();

  // Local filter state for the dialog
  const [localFilterState, setLocalFilterState] = useState<FilterState>({
    selectedFamilies: new Set(),
    selectedSpecies: new Set()
  });

  // Search state
  const [searchText, setSearchText] = useState('');

  // Sorting state
  const [sortBy, setSortBy] = useState<'family' | 'accessions'>('accessions');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Expanded accordion state
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(new Set());

  // Initialize local state from current filters
  useEffect(() => {
    const newState: FilterState = {
      selectedFamilies: new Set(),
      selectedSpecies: new Set()
    };

    if (filterConfig.type === 'FAMILY' && filterConfig.value) {
      newState.selectedFamilies.add(filterConfig.value);
      const familySpecies = accessions
        .filter(acc => acc.family === filterConfig.value)
        .map(acc => acc.species);
      familySpecies.forEach(sp => newState.selectedSpecies.add(sp));
    } else if (filterConfig.type === 'SPECIES' && filterConfig.value) {
      newState.selectedSpecies.add(filterConfig.value);
    }

    setLocalFilterState(newState);
  }, [filterConfig, accessions]);

  // Prepare family data with species and accession counts
  const familyData = useMemo(() => {
    const familyMap = new Map<string, { species: Map<string, number>; totalAccessions: number }>();

    accessions.forEach(acc => {
      if (!familyMap.has(acc.family)) {
        familyMap.set(acc.family, { species: new Map(), totalAccessions: 0 });
      }
      
      const family = familyMap.get(acc.family)!;
      family.totalAccessions++;
      
      if (!family.species.has(acc.species)) {
        family.species.set(acc.species, 0);
      }
      family.species.set(acc.species, family.species.get(acc.species)! + 1);
    });

    const data: FamilyData[] = Array.from(familyMap.entries()).map(([familyName, familyInfo]) => ({
      name: familyName,
      accessionCount: familyInfo.totalAccessions,
      species: Array.from(familyInfo.species.entries()).map(([speciesName, count]) => ({
        name: speciesName,
        accessionCount: count
      })).sort((a, b) => b.accessionCount - a.accessionCount) // Sort species by accession count
    }));

    // Sort families
    return data.sort((a, b) => {
      if (sortBy === 'family') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else {
        return sortOrder === 'asc' ? a.accessionCount - b.accessionCount : b.accessionCount - a.accessionCount;
      }
    });
  }, [accessions, sortBy, sortOrder]);

  // Check if there are changes from the original state
  const hasChanges = useMemo(() => {
    const currentSelected = new Set<string>();
    
    if (filterConfig.type === 'FAMILY' && filterConfig.value) {
      const familySpecies = accessions
        .filter(acc => acc.family === filterConfig.value)
        .map(acc => acc.species);
      familySpecies.forEach(sp => currentSelected.add(sp));
    } else if (filterConfig.type === 'SPECIES' && filterConfig.value) {
      currentSelected.add(filterConfig.value);
    }

    return currentSelected.size !== localFilterState.selectedSpecies.size ||
           !Array.from(currentSelected).every(sp => localFilterState.selectedSpecies.has(sp));
  }, [filterConfig, accessions, localFilterState.selectedSpecies]);

  // Get selected families based on selected species
  const selectedFamiliesFromSpecies = useMemo(() => {
    const familySet = new Set<string>();
    localFilterState.selectedSpecies.forEach(speciesName => {
      const accession = accessions.find(acc => acc.species === speciesName);
      if (accession) {
        familySet.add(accession.family);
      }
    });
    return familySet;
  }, [localFilterState.selectedSpecies, accessions]);

  const handleToggleSort = () => {
    if (sortBy === 'accessions') {
      setSortBy('family');
      setSortOrder('asc');
    } else if (sortBy === 'family' && sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortBy('accessions');
      setSortOrder('desc');
    }
  };

  const handleToggleExpanded = (familyName: string) => {
    const newExpanded = new Set(expandedFamilies);
    if (newExpanded.has(familyName)) {
      newExpanded.delete(familyName);
    } else {
      newExpanded.add(familyName);
    }
    setExpandedFamilies(newExpanded);
  };

  const handleApply = () => {
    if (localFilterState.selectedSpecies.size === 0) {
      setFilter({ type: 'ALL', value: '' });
    } else if (localFilterState.selectedSpecies.size === 1) {
      const speciesName = Array.from(localFilterState.selectedSpecies)[0];
      setFilter({ type: 'SPECIES', value: speciesName });
    } else {
      // If multiple species from same family are selected, filter by family
      const selectedFamilies = Array.from(selectedFamiliesFromSpecies);
      if (selectedFamilies.length === 1) {
        const familyName = selectedFamilies[0];
        const allFamilySpecies = accessions
          .filter(acc => acc.family === familyName)
          .map(acc => acc.species);
        const uniqueFamilySpecies = Array.from(new Set(allFamilySpecies));
        
        if (uniqueFamilySpecies.length === localFilterState.selectedSpecies.size) {
          setFilter({ type: 'FAMILY', value: familyName });
        } else {
          // Mixed selection - for now just pick the first species
          const speciesName = Array.from(localFilterState.selectedSpecies)[0];
          setFilter({ type: 'SPECIES', value: speciesName });
        }
      } else {
        // Multiple families - just pick first species
        const speciesName = Array.from(localFilterState.selectedSpecies)[0];
        setFilter({ type: 'SPECIES', value: speciesName });
      }
    }
  };

  const handleCancel = () => {
    // Reset local state to current filter state
    const newState: FilterState = {
      selectedFamilies: new Set(),
      selectedSpecies: new Set()
    };

    if (filterConfig.type === 'FAMILY' && filterConfig.value) {
      newState.selectedFamilies.add(filterConfig.value);
      const familySpecies = accessions
        .filter(acc => acc.family === filterConfig.value)
        .map(acc => acc.species);
      familySpecies.forEach(sp => newState.selectedSpecies.add(sp));
    } else if (filterConfig.type === 'SPECIES' && filterConfig.value) {
      newState.selectedSpecies.add(filterConfig.value);
    }

    setLocalFilterState(newState);
  };

  const clearFamilyFilter = (familyName: string) => {
    const newSelectedSpecies = new Set(localFilterState.selectedSpecies);
    accessions
      .filter(acc => acc.family === familyName)
      .forEach(acc => newSelectedSpecies.delete(acc.species));
    
    setLocalFilterState({
      ...localFilterState,
      selectedSpecies: newSelectedSpecies
    });
  };

  return (
    <DialogContent className="bg-bg-card p-4 max-w-2xl">
      <DialogHeader className="flex flex-col gap-3">
        <div className="flex gap-2">
          <DialogTitle className="text-lg grow">Select filter</DialogTitle>
          <Button variant="tertiary" size="md" onClick={handleCancel}>Cancel</Button>
          <Button 
            size="md" 
            disabled={!hasChanges && localFilterState.selectedSpecies.size === 0}
            onClick={handleApply}
          >
            Apply <Check/>
          </Button>
        </div>
        
        <div className="flex gap-1 items-center flex-wrap">
          {selectedFamiliesFromSpecies.size === 0 ? (
            <>
              <span className="text-sm text-tx-secondary">No filters applied,</span>
              <span className="font-mono text-sm text-tx-secondary">
                ({species.length} species in dataset)
              </span>
            </>
          ) : (
            <>
              {Array.from(selectedFamiliesFromSpecies).map(familyName => (
                <Button 
                  key={familyName}
                  variant="chipactive" 
                  size="sm"
                  onClick={() => clearFamilyFilter(familyName)}
                >
                  <TruncatedCell text={familyName} maxLength={15} /> <Xmark/>
                </Button>
              ))}
              <span className="font-mono text-sm text-tx-secondary">
                ({localFilterState.selectedSpecies.size} species selected)
              </span>
            </>
          )}
        </div>

        <div>
          <Input 
            placeholder="Search..." 
            className="font-mono"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          <div className="border border-bd-primary rounded overflow-hidden">
            <Table>
              <TableHeader className="sticky top-0 bg-bg-card z-10">
                <TableRow>
                  <TableHead 
                    className="flex gap-1 text-sm items-center grow cursor-pointer hover:bg-bg-hover"
                    onClick={handleToggleSort}
                  >
                    Family 
                    <Button variant="ghost" size="xs" className="px-1">
                      {sortBy === 'family' ? (
                        sortOrder === 'asc' ? <NavArrowUpSolid/> : <NavArrowDownSolid/>
                      ) : (
                        <NavArrowDownSolid className="opacity-30"/>
                      )}
                    </Button>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-bg-hover"
                    onClick={handleToggleSort}
                  >
                    <div className="flex items-center gap-1">
                      Accessions
                      {sortBy === 'accessions' ? (
                        sortOrder === 'asc' ? <NavArrowUpSolid/> : <NavArrowDownSolid/>
                      ) : (
                        <NavArrowDownSolid className="opacity-30"/>
                      )}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {familyData.map((family) => (
                  <AccordionRow
                    key={family.name}
                    family={family}
                    isExpanded={expandedFamilies.has(family.name)}
                    onToggleExpanded={() => handleToggleExpanded(family.name)}
                    filterState={localFilterState}
                    onFilterChange={setLocalFilterState}
                    searchText={searchText}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogHeader>
    </DialogContent>
  );
}