"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Drawer({ open, onOpenChange, children }: DrawerProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => onOpenChange?.(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm border-l border-border bg-background p-4 shadow-lg">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
