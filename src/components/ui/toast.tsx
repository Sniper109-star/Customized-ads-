"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

const ToastContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void }>({
  open: false,
  setOpen: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <ToastContext.Provider value={{ open, setOpen }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  const show = (props: ToastProps) => {
    ctx.setOpen(true);
    return props;
  };
  return { show };
}

export function Toast({ className, title, description }: { className?: string } & ToastProps) {
  const { open, setOpen } = React.useContext(ToastContext);
  if (!open) return null;
  return (
    <div
      role="status"
      className={cn("fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-md border border-border bg-background p-4 shadow", className)}
    >
      <div className="space-y-1">
        {title && <p className="text-sm font-medium">{title}</p>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <button
        type="button"
        className="mt-2 inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors"
        onClick={() => setOpen(false)}
      >
        Dismiss
      </button>
    </div>
  );
}
