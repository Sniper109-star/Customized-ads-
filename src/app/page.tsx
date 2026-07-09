import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <section className="border-b border-border/60 bg-background">
        <div className="container mx-auto max-w-screen-2xl px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Multi-platform ad manager
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Run ads on Facebook and TikTok from one place
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Create campaigns, generate ads, connect accounts, and track performance
              across Facebook and TikTok without switching tabs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/dashboard/campaigns/new">Create campaign</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container mx-auto max-w-screen-2xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for ad operators</h2>
            <p className="mt-3 text-muted-foreground">
              Launch faster, edit creatives quicker, and use one view to compare platform results.
            </p>
          </div>
          <div className="mx-auto mt-10 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Campaign control</CardTitle>
                <CardDescription>Create and manage campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Set budgets, objectives, schedules, and status from one workflow instead of
                  switching between platform interfaces.
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link href="/dashboard/campaigns">View campaigns</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ad creative</CardTitle>
                <CardDescription>Create and review ads</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Draft headlines, body copy, CTAs, images, and videos. Sync creatives to connected
                  ad accounts when ready.
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link href="/dashboard/ads">View ads</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Facebook and TikTok</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect ad accounts, refresh access tokens, and trigger platform pushes from a
                  single integrations panel.
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link href="/dashboard/integrations">Manage integrations</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto max-w-screen-2xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Ready to launch?</CardTitle>
                <CardDescription>
                  Open the dashboard and start your first campaign in minutes.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/dashboard/campaigns/new">Start campaign</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/integrations">Connect platforms</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
