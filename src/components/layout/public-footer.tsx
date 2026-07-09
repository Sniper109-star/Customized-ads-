"use client";

import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-4 py-10 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-semibold">{SITE_NAME}</span>
          <p className="max-w-xs text-sm text-muted-foreground">
            Launch ads to Facebook and TikTok, manage campaigns, and track performance from
            one dashboard.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="flex gap-4 text-sm">
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
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
