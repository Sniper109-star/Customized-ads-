import { Job, JobType, EngineStatus } from "./types";

export class Queue {
  private queue: Map<string, Job> = new Map();
  private listeners: Map<string, Set<(job: Job) => void>> = new Map();

  enqueue(job: Job): void {
    this.queue.set(job.id, job);
    this.emit(`job:${job.type}`, job);
    this.emit("job:enqueued", job);
  }

  dequeue(type?: JobType): Job | undefined {
    const jobs = Array.from(this.queue.values()).filter((job) => {
      if (type) return job.type === type && job.status === "queued";
      return job.status === "queued";
    });

    jobs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    const job = jobs[0];
    if (job) {
      job.status = "running";
      job.updatedAt = new Date();
      this.emit("job:started", job);
    }
    return job;
  }

  complete(jobId: string, result?: unknown): void {
    const job = this.queue.get(jobId);
    if (job) {
      job.status = "completed";
      job.result = result;
      job.updatedAt = new Date();
      this.emit("job:completed", job);
    }
  }

  fail(jobId: string, error: string): void {
    const job = this.queue.get(jobId);
    if (job) {
      job.attempts += 1;
      if (job.attempts >= job.maxAttempts) {
        job.status = "failed";
        job.error = error;
        job.updatedAt = new Date();
        this.emit("job:failed", job);
      } else {
        job.status = "queued";
        job.updatedAt = new Date();
        this.emit("job:retry", job);
      }
    }
  }

  getJob(jobId: string): Job | undefined {
    return this.queue.get(jobId);
  }

  getJobsByStatus(status: Job["status"]): Job[] {
    return Array.from(this.queue.values()).filter((job) => job.status === status);
  }

  getStats(): { queued: number; running: number; completed: number; failed: number } {
    const jobs = Array.from(this.queue.values());
    return {
      queued: jobs.filter((j) => j.status === "queued").length,
      running: jobs.filter((j) => j.status === "running").length,
      completed: jobs.filter((j) => j.status === "completed").length,
      failed: jobs.filter((j) => j.status === "failed").length,
    };
  }

  on(event: string, callback: (job: Job) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  private emit(event: string, job: Job): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => cb(job));
    }
    const allCallbacks = this.listeners.get("*");
    if (allCallbacks) {
      allCallbacks.forEach((cb) => cb(job));
    }
  }
}
