"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Engine</h1>
            <p className="text-sm text-muted-foreground">Background jobs, platform sync, and automation.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => triggerJob("sync_facebook")}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sync Facebook
            </button>
            <button
              type="button"
              onClick={() => triggerJob("sync_tiktok")}
              className="inline-flex items-center justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-pink-700"
            >
              Sync TikTok
            </button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Engine Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Queued</CardDescription>
              <CardTitle>{data?.stats.queued ?? 0}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Running</CardDescription>
              <CardTitle>{data?.stats.running ?? 0}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Completed</CardDescription>
              <CardTitle>{data?.stats.completed ?? 0}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Failed</CardDescription>
              <CardTitle>{data?.stats.failed ?? 0}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Status</CardTitle>
            <CardDescription>Recent engine jobs and platform syncs</CardDescription>
          </CardHeader>
          <CardContent>
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
      className="flex items-center justify-between rounded-md border border-border/60 bg-background/70 px-3 py-2"
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
