import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3, Megaphone, Image, Zap } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Campaigns", value: "8", icon: Megaphone },
    { label: "Ads", value: "24", icon: Image },
    { label: "Accounts", value: "2", icon: Zap },
    { label: "Performance", value: "94%", icon: BarChart3 },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of campaigns, ads, and integrations.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/dashboard/campaigns/new">New campaign</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/ads/new">New ad</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{item.label}</CardDescription>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent campaigns</CardTitle>
              <CardDescription>Latest campaign activity</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Open campaigns to view status, budget, and performance over time.
              </p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/dashboard/campaigns">View campaigns</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Facebook Ads and TikTok Ads</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect accounts and push campaigns to each platform from the integrations page.
              </p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/dashboard/integrations">Manage integrations</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
