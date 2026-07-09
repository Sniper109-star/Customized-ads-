"use client";

import Link from "next/link";
import { SITE_NAME, NAVIGATION_ITEMS } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-lg">{SITE_NAME}</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
