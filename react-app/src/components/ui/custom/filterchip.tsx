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

