'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useArboretum } from '../lib/ArboretumProvider';
import { getMetricDisplayName } from '../lib/ArboretumUtils';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Plus, Check } from 'iconoir-react';

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

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






//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================





export function FilterCard() {
  const { 
    filterConfig, 
    computeConfig, 
    families, 
    species, 
    statistics,
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
    <div className="bg-bg-card p-2 flex flex-col border rounded">
      <div className="flex px-2">
        <h3 className="text-lg">Data</h3>
      </div>
      <Dialog>
        <div className="flex px-2">
          <span>Filter by:</span>

            <DialogTrigger>
              {/* <Button variant="tertiary" size="sm">Family <Plus/></Button> */}
              <div>Family <Plus/></div>
            </DialogTrigger>
            <DialogTrigger>
              {/* <Button variant="tertiary" size="sm">Species <Plus/></Button> */}
              <div>Species <Plus/></div>
            </DialogTrigger>
            <SelectionDialogContent setSpeciesInput={setSpeciesInput} />
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


export function SelectionDialogContent({ setSpeciesInput }: { setSpeciesInput: (value: string) => void }) {

  const { 
    filterConfig, 
    computeConfig, 
    families, 
    species, 
    statistics,
    setFilter, 
    setCompute 
  } = useArboretum();

  return (
      <DialogContent className="bg-bg-card p-4">
        <DialogHeader>
          <div className="flex gap-2">
            <DialogTitle className="grow">Species list</DialogTitle>
            <Button variant="tertiary" size="sm">Cancel</Button>
            <Button size="sm">Confirm <Check/></Button>
          </div>
          <div className="flex gap-1">
            <p>Filter by:</p>
            <div className="">Family</div>
            <div>Species</div>
          </div>
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
  );
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
    <div className="bg-bg-card p-2 flex flex-col border rounded">
      <div className="flex px-2">
        <h3 className="text-lg grow">Current Selection</h3>
        <Button onClick={handleUnselect}>unselect</Button>
      </div>

      <div className="flex">
        <div className="w-full h-4 bg-bg-primary">
          <div className="col-span-2">
            <p className="text-sm font-medium">Cell: {selectedCell.id}</p>
            <p className="text-xs text-tx-tertiary">Row {selectedCell.row}, Column {selectedCell.col}</p>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex flex-col grow">
            <p className="text-lg text-tx-body">{selectedCell.accessions}</p>
            <p className="text-sm text-tx-tertiary">Accessions</p>
          </div>
          <div className="flex flex-col grow">
            <p className="text-lg text-tx-body">{selectedCell.species}</p>
            <p className="text-sm text-tx-tertiary">Unique species</p>
          </div>
        </div>
      </div>

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Family</TableHead>
            <TableHead>Species</TableHead>
            <TableHead>Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>25</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <DataTableDemo/>

        {/* <div className="flex p-2 border-b border-bd-secondary">
          <h2 className="flex-grow">Current Selection</h2>
          
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
        </div> */}
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






//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================


const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
]
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div></div>
      )
    },
  },
]



export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}