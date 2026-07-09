import { Job } from "../types";
import { Queue } from "../queue";

export abstract class EngineWorkerBase {
  protected abstract jobType: string;
  protected queue: Queue;

  constructor(queue: Queue) {
    this.queue = queue;
    this.setupListener();
  }

  private setupListener(): void {
    this.queue.on(`job:${this.jobType}`, (job: Job) => {
      if (job.status === "queued") {
        this.process(job)
          .then((result) => this.queue.complete(job.id, result))
          .catch((error) => this.queue.fail(job.id, String(error)));
      }
    });
  }

  public abstract process(job: Job): Promise<unknown>;
}
