import { Job } from "../types";
import { Queue } from "../queue";
import { EngineWorkerBase } from "./base";
import { TikTokAdsClient } from "../../lib/ads";

export class TikTokSyncWorker extends EngineWorkerBase {
  protected jobType = "sync_tiktok";

  constructor(queue: Queue) {
    super(queue);
  }

  public async process(job: Job): Promise<unknown> {
    const { accessToken, advertiserId } = job.payload as { accessToken?: string; advertiserId?: string };
    if (!accessToken || !advertiserId) {
      throw new Error("Missing accessToken or advertiserId");
    }

    const client = new TikTokAdsClient(accessToken, advertiserId);
    const campaigns = await client.fetchInsights("campaigns");
    return { platform: "tiktok", syncedAt: new Date(), campaigns };
  }
}
