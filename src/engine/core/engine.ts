import { JobType, EngineStatus } from "../types";
import { Queue } from "../queue";
import { EngineWorkerBase } from "../workers/base";
import { FacebookSyncWorker } from "../workers/facebook-sync.worker";
import { TikTokSyncWorker } from "../workers/tiktok-sync.worker";
import { InsightsWorker } from "../workers/insights.worker";
import { OptimizationWorker } from "../workers/optimization.worker";
import { PublishWorker } from "../workers/publish.worker";

export class Engine {
  private queue: Queue;
  private workers: Map<string, EngineWorkerBase> = new Map();
  private isRunning = false;
  private jobsProcessed = 0;
  private jobsFailed = 0;
  private lastRun: Date | null = null;
  private nextRun: Date | null = null;
  private timers: NodeJS.Timeout[] = [];

  constructor() {
    this.queue = new Queue();
    this.registerWorkers();
  }

  private registerWorkers(): void {
    this.workers.set("sync_facebook", new FacebookSyncWorker(this.queue));
    this.workers.set("sync_tiktok", new TikTokSyncWorker(this.queue));
    this.workers.set("fetch_insights", new InsightsWorker(this.queue));
    this.workers.set("optimize_campaign", new OptimizationWorker(this.queue));
    this.workers.set("publish_ad", new PublishWorker(this.queue));
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastRun = new Date();
    this.nextRun = new Date(Date.now() + 5 * 60 * 1000);

    this.queue.on("job:completed", () => {
      this.jobsProcessed += 1;
    });

    this.queue.on("job:failed", () => {
      this.jobsFailed += 1;
    });

    this.timers.push(setInterval(() => this.tick(), 5000));
    this.timers.push(setInterval(() => this.scheduleRepeatingJobs(), 5 * 60 * 1000));
  }

  stop(): void {
    this.isRunning = false;
    this.timers.forEach(clearInterval);
    this.timers = [];
  }

  getQueue(): Queue {
    return this.queue;
  }

  getStatus(): EngineStatus {
    return {
      isRunning: this.isRunning,
      jobsProcessed: this.jobsProcessed,
      jobsFailed: this.jobsFailed,
      lastRun: this.lastRun,
      nextRun: this.nextRun,
    };
  }

  enqueue(type: JobType, payload: Record<string, unknown>, maxAttempts = 3): string {
    const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    this.queue.enqueue({
      id,
      type,
      payload,
      status: "queued",
      attempts: 0,
      maxAttempts,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return id;
  }

  processNext(type?: JobType): void {
    const job = this.queue.dequeue(type);
    if (!job) return;

    const worker = this.workers.get(job.type);
    if (!worker) {
      this.queue.fail(job.id, `No worker for job type: ${job.type}`);
      return;
    }

    Promise.resolve()
      .then(() => worker.process(job))
      .then((result) => this.queue.complete(job.id, result))
      .catch((error) => this.queue.fail(job.id, String(error)));
  }

  private tick(): void {
    this.processNext();
  }

  private scheduleRepeatingJobs(): void {
    this.nextRun = new Date(Date.now() + 5 * 60 * 1000);
  }
}

let engineInstance: Engine | null = null;

export function getEngine(): Engine {
  if (!engineInstance) {
    engineInstance = new Engine();
    engineInstance.start();
  }
  return engineInstance;
}

export function resetEngine(): void {
  if (engineInstance) {
    engineInstance.stop();
    engineInstance = null;
  }
}
