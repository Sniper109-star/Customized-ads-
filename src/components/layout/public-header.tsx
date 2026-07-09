"use client";

import Link from "next/link";
import { SITE_NAME, NAVIGATION_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/75 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-semibold tracking-tight text-lg">{SITE_NAME}</span>
          <span className="hidden sm:inline-flex items-center rounded-full border border-border/70 bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            ads
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground/80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/campaigns/new">Start Campaign</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
