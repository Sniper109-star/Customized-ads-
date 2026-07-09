"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const CollapsibleContext = React.createContext<{ open?: boolean; onOpenChange?: (open: boolean) => void }>({});

export function Collapsible({ open, onOpenChange, children }: CollapsibleProps) {
  return (
    <CollapsibleContext.Provider value={{ open, onOpenChange }}>
      <div className={cn("w-full")}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

Collapsible.Trigger = function CollapsibleTrigger({ className, children, ...props }: CollapsibleTriggerProps) {
  const ctx = React.useContext(CollapsibleContext);
  return (
    <button
      type="button"
      onClick={() => ctx.onOpenChange?.(ctx.open ? false : true)}
      className={cn("flex w-full items-center justify-between", className)}
      {...props}
    >
      {children}
      <span className="text-xs text-muted-foreground">{ctx.open ? "Hide" : "Show"}</span>
    </button>
  );
};

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

Collapsible.Content = function CollapsibleContent({ className, children, ...props }: CollapsibleContentProps) {
  const ctx = React.useContext(CollapsibleContext);
  if (!ctx.open) return null;
  return (
    <div className={cn("mt-2 space-y-2", className)} {...props}>
      {children}
    </div>
  );
};
