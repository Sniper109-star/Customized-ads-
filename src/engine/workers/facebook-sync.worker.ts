import { Job } from "../types";
import { Queue } from "../queue";
import { EngineWorkerBase } from "./base";
import { FacebookAdsClient } from "../../lib/ads";

export class FacebookSyncWorker extends EngineWorkerBase {
  protected jobType = "sync_facebook";

  constructor(queue: Queue) {
    super(queue);
  }

  public async process(job: Job): Promise<unknown> {
    const { accessToken, adAccountId } = job.payload as { accessToken?: string; adAccountId?: string };
    if (!accessToken || !adAccountId) {
      throw new Error("Missing accessToken or adAccountId");
    }

    const client = new FacebookAdsClient(accessToken, adAccountId);
    const campaigns = await client.fetchInsights("campaigns");
    return { platform: "facebook", syncedAt: new Date(), campaigns };
  }
}
