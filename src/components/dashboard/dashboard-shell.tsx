"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Megaphone,
  Image,
  Plug,
  Settings,
  ArrowRight,
  BarChart3,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/dashboard/ads", label: "Ads", icon: Image },
  { href: "/dashboard/integrations", label: "Integrations", icon: Plug },
  { href: "/dashboard/engine", label: "Engine", icon: Cpu },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r border-border/60 bg-background/60 md:block">
          <div className="flex h-full flex-col">
            <div className="h-14 border-b border-border/60 px-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span>Ad Control</span>
              </Link>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-border/60 p-3">
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link href="/">
                  <span>Back to site</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </aside>
        <main className="min-h-[calc(100vh-56px)]">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
