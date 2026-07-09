"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { integrations as demoIntegrations } from "@/lib/demo-data";

export default function IntegrationsPage() {
  const items = demoIntegrations;
  const [facebookToken, setFacebookToken] = useState("");
  const [tiktokToken, setTiktokToken] = useState("");
  const [saving, setSaving] = useState(false);

  const saveDemoTokens = async (platform: string, token: string) => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaving(false);
    alert(`${platform} demo token saved locally for this demo build.`);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground">Connect ad accounts for Facebook Ads and TikTok Ads.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Facebook Ads</CardTitle>
              <CardDescription>Connect a Facebook ad account to publish ads and insights.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fb-token">Access token</Label>
                <Input
                  id="fb-token"
                  value={facebookToken}
                  onChange={(e) => setFacebookToken(e.target.value)}
                  placeholder="Paste Facebook access token"
                />
              </div>
              <Button
                onClick={() => saveDemoTokens("Facebook", facebookToken)}
                disabled={saving || !facebookToken.trim()}
              >
                Save Facebook token
              </Button>
              <div className="space-y-2 text-sm text-muted-foreground">
            {items
              .filter((item) => item.id === "facebook")
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-md border border-border/60 bg-background/70 px-3 py-2">
                  <span>{item.name}</span>
                  <span className={`h-2 w-2 rounded-full ${item.status === "connected" ? "bg-emerald-500" : "bg-muted-foreground"}`} />
                </div>
              ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>TikTok Ads</CardTitle>
              <CardDescription>Connect a TikTok Ads account to publish ads and insights.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tt-token">Access token</Label>
                <Input
                  id="tt-token"
                  value={tiktokToken}
                  onChange={(e) => setTiktokToken(e.target.value)}
                  placeholder="Paste TikTok access token"
                />
              </div>
              <Button
                onClick={() => saveDemoTokens("TikTok", tiktokToken)}
                disabled={saving || !tiktokToken.trim()}
              >
                Save TikTok token
              </Button>
              <div className="space-y-2 text-sm text-muted-foreground">
                {items
                  .filter((item) => item.id === "tiktok")
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-md border border-border/60 bg-background/70 px-3 py-2">
                      <span>{item.name}</span>
                      <span className={`h-2 w-2 rounded-full ${item.status === "connected" ? "bg-emerald-500" : "bg-muted-foreground"}`} />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
