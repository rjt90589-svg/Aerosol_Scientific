"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

// ── Root ─────────────────────────────────────────────
function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

// ── Group ────────────────────────────────────────────
function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      className={cn("p-1", className)}
      {...props}
    />
  )
}

// ── Value ────────────────────────────────────────────
function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value {...props} />
}

// ── Trigger (🔥 modern + hover upgraded) ─────────────
function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex w-full items-center justify-between rounded-xl border border-border bg-background px-3 py-2.5 text-sm",
        "shadow-sm transition-all duration-150",

        // ✨ Hover
        "hover:border-blue-400 hover:bg-muted/30 hover:shadow-md",

        // ✨ Focus
        "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",

        // ✨ Disabled
        "disabled:opacity-50 disabled:cursor-not-allowed",

        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

// ── Content (dropdown) ───────────────────────────────
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        className={cn(
          "relative z-50 max-h-72 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-lg",
          "animate-in fade-in-0 zoom-in-95 duration-150",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />

        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

// ── Label ────────────────────────────────────────────
function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn("px-2 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

// ── Item (🔥 BEST PART — hover upgraded) ─────────────
function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "group relative flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-sm",
        "transition-all duration-150 ease-out",

        // ✨ Hover effect
        "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent",
        "hover:text-blue-700 hover:pl-3.5",

        // ✨ Focus
        "focus:bg-blue-50 focus:text-blue-700",

        // ✨ Selected
        "data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-800 data-[state=checked]:font-medium",

        // ✨ Disabled
        "data-disabled:opacity-50 data-disabled:pointer-events-none",

        className
      )}
      {...props}
    >
      {/* 🔥 Left hover indicator */}
      <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />

      {/* ✔ Check icon */}
      <span className="absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

// ── Separator ────────────────────────────────────────
function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

// ── Scroll Up ────────────────────────────────────────
function SelectScrollUpButton(
  props: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
) {
  return (
    <SelectPrimitive.ScrollUpButton className="flex justify-center py-1">
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

// ── Scroll Down ──────────────────────────────────────
function SelectScrollDownButton(
  props: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>
) {
  return (
    <SelectPrimitive.ScrollDownButton className="flex justify-center py-1">
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

// ── Export ───────────────────────────────────────────
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}