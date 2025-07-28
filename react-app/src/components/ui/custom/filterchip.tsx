"use client"
import * as React from 'react';
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Xmark } from 'iconoir-react';


type FilterChipProps = {
  children: React.ReactNode;
  isActive?: boolean;
};


export default function FilterChip({ children, isActive = false }: FilterChipProps) {

  if (isActive) {
    return (
      <div className="p-2 bg-bg-brand font-mono text-xs text-tx-brand rounded-md flex">
        { children }
        <Xmark fontSize={12}/>
      </div>
    );
  }
  else {
    return (
        <div className="p-2 bg-bg-secondary font-mono text-xs text-tx-secondary rounded flex">
          { children }
        </div>
    );
  }
}
