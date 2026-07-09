import { Job } from "../types";
import { Queue } from "../queue";
import { EngineWorkerBase } from "./base";

export interface InsightWorkerPayload {
  adId: string;
  platform: "facebook" | "tiktok";
  accessToken: string;
  accountId: string;
  metrics?: string[];
}

export class InsightsWorker extends EngineWorkerBase {
  protected jobType = "fetch_insights";

  constructor(queue: Queue) {
    super(queue);
  }

  public async process(job: Job): Promise<unknown> {
    const payload = job.payload as unknown as InsightWorkerPayload;
    const { adId, platform, accessToken, accountId, metrics } = payload;

    const defaultMetrics = ["impressions", "clicks", "spend", "ctr", "cpc", "cpm", "conversions"];
    const requestedMetrics = metrics ?? defaultMetrics;

    if (platform === "facebook") {
      const url = `https://graph.facebook.com/v18.0/${adId}/insights`;
      const res = await fetch(
        `${url}?access_token=${accessToken}&fields=${requestedMetrics.join(",")}&time_range={"since":"2026-07-01","until":"2026-07-09"}`
      );
      if (!res.ok) throw new Error(`Facebook API error: ${res.status}`);
      return { adId, platform, insights: await res.json() };
    }

    if (platform === "tiktok") {
      const url = `https://business-api.tiktok.com/v2/report/ad/get/`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": accessToken,
        },
        body: JSON.stringify({
          advertiser_id: accountId,
          ad_id: adId,
          metrics: requestedMetrics,
        }),
      });
      if (!res.ok) throw new Error(`TikTok API error: ${res.status}`);
      return { adId, platform, insights: await res.json() };
    }

    throw new Error(`Unsupported platform: ${platform}`);
  }
}
