"use client";

import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row md:px-0">
        <div className="space-y-2 text-center md:text-left">
          <p className="font-semibold">{SITE_NAME}</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Launch ads on Facebook and TikTok, manage campaigns, and track performance from
            one dashboard.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 text-sm md:items-end">
          <div className="flex gap-6">
            <Link href="/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/dashboard/integrations" className="text-muted-foreground transition-colors hover:text-foreground">
              Integrations
            </Link>
            <Link href="/dashboard/settings" className="text-muted-foreground transition-colors hover:text-foreground">
              Settings
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
