import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, children, ...props }, ref) => {
    if (children) {
      return (
        <div className={cn(
          "flex h-10 w-full rounded-md border border-bd-card bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className
        )}>
          <input
            type={type}
            className="flex-1 bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-mono placeholder:text-tx-body focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-0"
            ref={ref}
            {...props}
          />
          <div className="flex items-center pr-1">
            {children}
          </div>
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-bd-card bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
