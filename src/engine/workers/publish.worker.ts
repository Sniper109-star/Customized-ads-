import { Job } from "../types";
import { Queue } from "../queue";
import { EngineWorkerBase } from "./base";

export interface PublishPayload {
  adId: string;
  platform: "facebook" | "tiktok";
  accessToken: string;
  accountId: string;
  campaignId: string;
  creative: {
    headline: string;
    body: string;
    cta: string;
    imageUrl?: string;
    videoUrl?: string;
    destinationUrl: string;
  };
}

export class PublishWorker extends EngineWorkerBase {
  protected jobType = "publish_ad";

  constructor(queue: Queue) {
    super(queue);
  }

  public async process(job: Job): Promise<unknown> {
    const payload = job.payload as unknown as PublishPayload;
    const { adId, platform, accessToken, accountId, campaignId, creative } = payload;

    if (platform === "facebook") {
      const url = `https://graph.facebook.com/v18.0/act_${accountId}/ads`;
      const body = {
        access_token: accessToken,
        campaign_id: campaignId,
        name: creative.headline,
        adformat: creative.imageUrl ? "IMAGE" : "VIDEO",
        creative: {
          title: creative.headline,
          body: creative.body,
          image_url: creative.imageUrl,
          call_to_action_type: creative.cta.toUpperCase().replace(/\s+/g, "_"),
          link_url: creative.destinationUrl,
        },
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Facebook publish failed: ${res.status} ${text}`);
      }

      const result = await res.json();
      return { adId, platform, status: "published", result };
    }

    if (platform === "tiktok") {
      const url = `https://business-api.tiktok.com/v2/ad/create/`;
      const body = {
        advertiser_id: accountId,
        campaign_id: campaignId,
        ad_name: creative.headline,
        ad_type: "TRAFFIC",
        creative_type: creative.videoUrl ? "VIDEO" : "IMAGE",
        assets: [
          ...(creative.imageUrl ? [{ type: "IMAGE", image_url: creative.imageUrl }] : []),
          ...(creative.videoUrl ? [{ type: "VIDEO", video_url: creative.videoUrl }] : []),
        ],
        call_to_action: creative.cta,
        landing_url: creative.destinationUrl,
        display_name: creative.headline,
        caption: creative.body,
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": accessToken,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`TikTok publish failed: ${res.status} ${text}`);
      }

      const result = await res.json();
      return { adId, platform, status: "published", result };
    }

    throw new Error(`Unsupported platform: ${platform}`);
  }
}
