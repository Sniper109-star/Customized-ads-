"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ads as demoAds } from "@/lib/demo-data";

const AD_TYPES = ["Image", "Video", "Carousel", "Collection"];

export default function AdsPage() {
  const items = demoAds;

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Ads</h1>
            <p className="text-sm text-muted-foreground">Create and manage ad creatives.</p>
          </div>
          <Button asChild>
            <a href="/dashboard/ads/new">New ad</a>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  <span className="rounded-full border border-border/60 bg-background px-2 py-0.5 text-xs text-muted-foreground">
                    {item.status}
                  </span>
                </div>
                <CardDescription>{item.adType} ad</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.body}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded-full border border-border/60 bg-background px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
