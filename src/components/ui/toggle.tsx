"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  className?: string;
}

export function Toggle({ pressed, onPressedChange, className }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange?.(!pressed)}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md border border-border px-3 py-2 text-sm transition-colors",
        pressed && "bg-primary text-primary-foreground",
        className
      )}
    />
  );
}
