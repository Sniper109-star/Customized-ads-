import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">About</h1>
        <p className="text-muted-foreground">
          This platform helps small teams manage ads across Facebook and TikTok without switching
          between multiple tools. It combines campaign planning, creative management, and platform
          integrations into one workflow.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Campaigns</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Define budgets, objectives, schedules, and ownership in one place.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Ads</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create headlines, body copy, CTAs, images, and videos for multiple formats.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Integrations</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect Facebook Ads and TikTok Ads to publish and sync performance data.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Engine</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Background job system for sync, insights, publishing, and optimization.
            </p>
          </div>
        </div>
        <div>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
