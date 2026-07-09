export type JobType = "sync_facebook" | "sync_tiktok" | "fetch_insights" | "optimize_campaign" | "publish_ad";

export interface Job {
  id: string;
  type: JobType;
  payload: Record<string, unknown>;
  status: "queued" | "running" | "completed" | "failed";
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
  updatedAt: Date;
  result?: unknown;
  error?: string;
}

export interface EngineStatus {
  isRunning: boolean;
  jobsProcessed: number;
  jobsFailed: number;
  lastRun: Date | null;
  nextRun: Date | null;
}
