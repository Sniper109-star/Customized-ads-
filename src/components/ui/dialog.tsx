"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => onOpenChange?.(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-lg border border-border bg-background p-4 shadow-lg">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
