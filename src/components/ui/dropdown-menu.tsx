"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function DropdownMenu({ open, onOpenChange, children }: DropdownMenuProps) {
  return (
    <div className="relative inline-flex">
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border border-border bg-background p-1 shadow-md">
          {children}
        </div>
      )}
    </div>
  );
}

DropdownMenu.Item = function DropdownMenuItem({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn("flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-muted", className)}
      {...props}
    />
  );
};

DropdownMenu.Separator = function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 h-px bg-border", className)} />;
};
