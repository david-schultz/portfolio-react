'use client'

import * as React from "react"
import { Button } from '@/components/ui/button'
import { useArboretum, Accession } from '../lib/ArboretumProvider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"



export function CurrentSelectionCard() {
  const { selectedCell, selectCell, accessions, filterConfig } = useArboretum();
  
  // Helper function to check if an accession should be included based on current filter
  const shouldIncludeAccession = React.useCallback((accession: Accession): boolean => {
    switch (filterConfig.type) {
      case 'FAMILY':
        return accession.family === filterConfig.value;
      case 'SPECIES':
        return accession.species === filterConfig.value;
      case 'MULTIPLE_SPECIES':
        return filterConfig.values ? filterConfig.values.includes(accession.species) : false;
      case 'ALL':
      default:
        return true;
    }
  }, [filterConfig]);

  // Calculate filtered stats for the selected cell
  const filteredStats = React.useMemo(() => {
    if (!accessions || !selectedCell) return { accessions: 0, species: 0 };
    
    const cellAccessions = accessions.filter(acc => 
      acc.cell === selectedCell.id && shouldIncludeAccession(acc)
    );
    
    const uniqueSpecies = new Set(cellAccessions.map(acc => acc.species));
    
    return {
      accessions: cellAccessions.length,
      species: uniqueSpecies.size
    };
  }, [accessions, selectedCell, shouldIncludeAccession]);

  if (!selectedCell) {
    return null; // Don't render if no cell is selected
  }

  const handleUnselect = () => {
    selectCell(null);
  };

  return (
    <div className="bg-bg-card p-2 flex flex-col border rounded">
      <div className="flex px-2 mb-3">
        <h3 className="text-lg grow">Current Selection</h3>
        <Button onClick={handleUnselect}>unselect</Button>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1 flex flex-col gap-2 items-center grow">
          <div className="w-full h-16 bg-bg-secondary rounded flex flex-col gap-2 px-4 py-3 font-mono"></div>
          <div className="col-span-2">
            <Badge>{selectedCell.id}</Badge>
          </div>
        </div>
        <div className="flex flex-col pr-2">
          <div className="flex flex-col grow">
            <p className="text-lg text-tx-body">{filteredStats.accessions}</p>
            <p className="text-sm text-tx-tertiary font-mono">Accessions</p>
          </div>
          <div className="flex flex-col grow">
            <p className="text-lg text-tx-body">{filteredStats.species}</p>
            <p className="text-sm text-tx-tertiary font-mono">Unique species</p>
          </div>
        </div>
      </div>

      <DataTable/>
    </div>
  )
}

// Type for aggregated species data
interface SpeciesTableRow {
  family: string;
  species: string;
  count: number;
}

// Utility function to truncate text and determine if tooltip is needed
const truncateText = (text: string, maxLength: number = 10): { text: string; isTruncated: boolean } => {
  if (text.length <= maxLength) {
    return { text, isTruncated: false };
  }
  return { text: text.substring(0, maxLength - 3) + '...', isTruncated: true };
};

// Custom cell component with tooltip for truncated text
const TruncatedCell: React.FC<{ text: string; maxLength?: number }> = ({ text, maxLength = 10 }) => {
  const { text: displayText, isTruncated } = truncateText(text, maxLength);
  
  if (isTruncated) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help">{displayText}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return <span>{displayText}</span>;
};

function DataTable() {
  const { selectedCell, accessions, filterConfig } = useArboretum();

  // Helper function to check if an accession should be included based on current filter
  const shouldIncludeAccession = React.useCallback((accession: Accession): boolean => {
    switch (filterConfig.type) {
      case 'FAMILY':
        return accession.family === filterConfig.value;
      case 'SPECIES':
        return accession.species === filterConfig.value;
      case 'MULTIPLE_SPECIES':
        return filterConfig.values ? filterConfig.values.includes(accession.species) : false;
      case 'ALL':
      default:
        return true;
    }
  }, [filterConfig]);

  // Get accessions for the selected cell and aggregate by species
  const tableData = React.useMemo(() => {
    if (!selectedCell || !accessions) return [];
    
    // Filter accessions for the selected cell AND apply current filter
    const cellAccessions = accessions.filter(acc => 
      acc.cell === selectedCell.id && shouldIncludeAccession(acc)
    );
    
    // Aggregate by species and family, counting occurrences
    const speciesMap = new Map<string, SpeciesTableRow>();
    
    cellAccessions.forEach(acc => {
      const key = `${acc.family}-${acc.species}`;
      if (speciesMap.has(key)) {
        const existing = speciesMap.get(key)!;
        existing.count += 1;
      } else {
        speciesMap.set(key, {
          family: acc.family,
          species: acc.species,
          count: 1
        });
      }
    });
    
    // Convert to array and sort by family
    return Array.from(speciesMap.values()).sort((a, b) => a.family.localeCompare(b.family));
  }, [selectedCell, accessions, shouldIncludeAccession]);

  // Define columns
  const columns: ColumnDef<SpeciesTableRow>[] = [
    {
      accessorKey: "family",
      header: "Family",
      cell: ({ row }) => <TruncatedCell text={row.getValue("family")} maxLength={15} />,
    },
    {
      accessorKey: "species",
      header: "Species",
      cell: ({ row }) => <TruncatedCell text={row.getValue("species")} maxLength={15} />,
    },
    {
      accessorKey: "count",
      header: "Count",
      cell: ({ row }) => <span>{row.getValue("count")}</span>,
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
      sorting: [
        {
          id: "count",
          desc: true,
        },
      ],
    },
    enableSortingRemoval: false,
    enableMultiSort: false,
  });

  if (!selectedCell || tableData.length === 0) {
    return (
      <div className="border border-bd-primary rounded overflow-hidden">
        <div className="p-4 text-center text-tx-tertiary">
          No species data available for this selection
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border border-bd-primary rounded overflow-hidden mb-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
        
      {/* Pagination controls */}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-tx-tertiary">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}