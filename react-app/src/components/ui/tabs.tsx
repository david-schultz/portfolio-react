"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { useEffect } from 'react'

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const handleTabClick = () => {
  const element = document.getElementById("tabs");
  if (element) {
    element.classList.add("scrollActivated");
  }

  // useEffect(() => {
  //   const element = document.getElementById("tabs");
  //   if (element) {
  //     const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
  //     if(element.classList.contains("scrollActivated")) {
  //       const shouldSmoothScroll = elementTop > window.pageYOffset;
  //       element.scrollIntoView({ behavior: shouldSmoothScroll ? 'smooth' : 'auto' });
  //     }
  //   }
  //   // element?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  // }); // re-run effect if id or smooth changes
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 font-500 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    onClick={() => handleTabClick()}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
