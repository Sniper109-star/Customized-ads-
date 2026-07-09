"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export function AspectRatio({ ratio = 1, className, children, ...props }: AspectRatioProps) {
  return (
    <div
      style={{ aspectRatio: String(ratio) }}
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}
