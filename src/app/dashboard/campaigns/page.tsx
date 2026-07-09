import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { campaigns as demoCampaigns } from "@/lib/demo-data";

export default function CampaignsPage() {
  const items = demoCampaigns;

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Campaigns</h1>
            <p className="text-sm text-muted-foreground">Manage budgets, objectives, schedules, and statuses.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/campaigns/new">New campaign</Link>
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
                <CardDescription>{item.objective}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Budget: ${item.budget}</span>
                  <span className="text-muted-foreground">{item.platform}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
