"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const RadioGroupContext = React.createContext<{ value?: string; onValueChange?: (value: string) => void }>({});

export function RadioGroup({ value, onValueChange, children, className }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="radiogroup" className={cn("grid gap-2", className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

RadioGroup.Item = function RadioGroupItem({ value, className, ...props }: RadioGroupItemProps) {
  const ctx = React.useContext(RadioGroupContext);
  const isSelected = ctx.value === value;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => ctx.onValueChange?.(value)}
      className={cn(
        "flex h-5 w-5 items-center justify-center rounded-full border border-input transition-colors",
        isSelected && "border-primary",
        className
      )}
      {...props}
    >
      {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
    </button>
  );
};
