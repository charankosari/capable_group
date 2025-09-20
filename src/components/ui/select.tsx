"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  required?: boolean
  children: React.ReactNode
}

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode
}

interface SelectContentProps {
  children: React.ReactNode
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

interface SelectValueProps {
  placeholder?: string
}

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

function Select({ value, onValueChange, children, required }: SelectProps) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <DropdownMenu>
        {children}
      </DropdownMenu>
    </SelectContext.Provider>
  )
}

function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  return (
    <DropdownMenuTrigger asChild>
      <button
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    </DropdownMenuTrigger>
  )
}

function SelectContent({ children }: SelectContentProps) {
  return (
    <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
      {children}
    </DropdownMenuContent>
  )
}

function SelectItem({ value, children }: SelectItemProps) {
  const { onValueChange } = React.useContext(SelectContext)
  
  return (
    <DropdownMenuItem
      onClick={() => onValueChange?.(value)}
      className="cursor-pointer"
    >
      {children}
    </DropdownMenuItem>
  )
}

function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = React.useContext(SelectContext)
  
  return (
    <span className={cn(!value && "text-muted-foreground")}>
      {value || placeholder}
    </span>
  )
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
}