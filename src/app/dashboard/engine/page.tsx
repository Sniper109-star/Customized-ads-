"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface EngineStatusData {
  status: {
    isRunning: boolean;
    jobsProcessed: number;
    jobsFailed: number;
    lastRun: string | null;
    nextRun: string | null;
  };
  stats: { queued: number; running: number; completed: number; failed: number };
  jobs: Array<{
    id: string;
    type: string;
    status: string;
    attempts: number;
    createdAt: string;
    updatedAt: string;
    error?: string;
  }>;
}

import { Button } from "@/components/ui/button";

export default function EnginePage() {
  const [data, setData] = useState<EngineStatusData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEngineStatus = async () => {
    try {
      const res = await fetch("/api/engine");
      if (!res.ok) throw new Error("Failed to fetch engine status");
      const json = await res.json();
      setData(json);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEngineStatus();
    const interval = setInterval(fetchEngineStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerJob = async (type: string) => {
    setLoading(true);
    try {
      await fetch("/api/engine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: type }),
      });
      await fetchEngineStatus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Engine</h1>
            <p className="text-sm text-muted-foreground">Background jobs, platform sync, and automation.</p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => triggerJob("sync_facebook")}
              className="bg-[#1877F2] text-white hover:bg-[#166fe5]"
            >
              Sync Facebook
            </Button>
            <Button
              type="button"
              onClick={() => triggerJob("sync_tiktok")}
              className="bg-[#010101] text-white hover:bg-neutral-800"
            >
              Sync TikTok
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Engine Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Queued", value: data?.stats.queued ?? 0, description: "Waiting" },
            { label: "Running", value: data?.stats.running ?? 0, description: "In progress" },
            { label: "Completed", value: data?.stats.completed ?? 0, description: "Finished" },
            { label: "Failed", value: data?.stats.failed ?? 0, description: "Needs attention" },
          ].map((item) => (
            <Card key={item.label} className="border-border/70">
              <CardHeader className="pb-2">
                <CardDescription>{item.label}</CardDescription>
                <div className="text-2xl font-semibold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Job Status</CardTitle>
            <CardDescription>Recent engine jobs and platform syncs</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span className="text-sm text-muted-foreground">Loading engine state...</span>
              </div>
            ) : (
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="queued">Queued</TabsTrigger>
                  <TabsTrigger value="running">Running</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-2">
                  <JobList jobs={data?.jobs ?? []} />
                </TabsContent>
                <TabsContent value="queued" className="space-y-2">
                  <JobList jobs={data?.jobs.filter((j) => j.status === "queued") ?? []} />
                </TabsContent>
                <TabsContent value="running" className="space-y-2">
                  <JobList jobs={data?.jobs.filter((j) => j.status === "running") ?? []} />
                </TabsContent>
                <TabsContent value="completed" className="space-y-2">
                  <JobList jobs={data?.jobs.filter((j) => j.status === "completed") ?? []} />
                </TabsContent>
                <TabsContent value="failed" className="space-y-2">
                  <JobList jobs={data?.jobs.filter((j) => j.status === "failed") ?? []} />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

function JobList({ jobs }: { jobs: EngineStatusData["jobs"] }) {
  if (!jobs.length) {
    return <p className="text-sm text-muted-foreground">No jobs yet.</p>;
  }

  return jobs.map((job) => (
    <div
      key={job.id}
      className="flex items-center justify-between rounded-lg border border-border/60 bg-background/70 px-4 py-3"
    >
      <div className="space-y-1">
        <p className="text-sm font-medium">{job.type}</p>
        <p className="text-xs text-muted-foreground">{job.id}</p>
      </div>
      <div className="text-right text-xs text-muted-foreground space-x-2">
        <span>Attempts: {job.attempts}</span>
        <Badge variant={job.status === "failed" ? "destructive" : job.status === "completed" ? "success" : "secondary"}>
          {job.status}
        </Badge>
      </div>
    </div>
  ));
}
