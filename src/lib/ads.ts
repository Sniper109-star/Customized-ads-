export const FACEBOOK_API_VERSION = "v18.0";
export const TIKTOK_API_VERSION = "v2";

export function buildFacebookAd({ headline, body, cta, imageUrl, destinationUrl }: {
  headline: string;
  body: string;
  cta: string;
  imageUrl?: string;
  destinationUrl: string;
}) {
  return {
    name: headline.slice(0, 100),
    ad_format: "IMAGE",
    creative: {
      title: headline,
      body,
      message_tags: [],
      image_url: imageUrl,
      call_to_action_type: cta.toUpperCase().replace(/\s+/g, "_"),
      link_url: destinationUrl,
    },
  };
}

export function buildTikTokAd({ headline, body, cta, imageUrl, videoUrl, destinationUrl }: {
  headline: string;
  body: string;
  cta: string;
  imageUrl?: string;
  videoUrl?: string;
  destinationUrl: string;
}) {
  return {
    ad_name: headline,
    ad_type: "TRAFFIC",
    creative_type: videoUrl ? "VIDEO" : "IMAGE",
    assets: [
      ...(imageUrl ? [{ type: "IMAGE", image_url: imageUrl }] : []),
      ...(videoUrl ? [{ type: "VIDEO", video_url: videoUrl }] : []),
    ],
    call_to_action: cta,
    landing_url: destinationUrl,
    display_name: headline,
    caption: body,
  };
}

export class FacebookAdsClient {
  constructor(private accessToken: string, private adAccountId: string) {}

  async createAd(campaignId: string, creative: Record<string, unknown>) {
    const url = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/act_${this.adAccountId}/ads`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: this.accessToken,
        campaign_id: campaignId,
        name: creative.name,
        adformat: creative.ad_format,
        creative: creative.creative,
      }),
    });
    if (!res.ok) throw new Error(`Facebook API error: ${res.status}`);
    return res.json();
  }

  async fetchInsights(adId: string) {
    const url = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/${adId}/insights`;
    const res = await fetch(`${url}?access_token=${this.accessToken}&fields=impressions,clicks,spend,ctr,cpc,cpm,conversions`);
    if (!res.ok) throw new Error(`Facebook API error: ${res.status}`);
    return res.json();
  }
}

export class TikTokAdsClient {
  constructor(private accessToken: string, private advertiserId: string) {}

  async createAd(campaignId: string, creative: Record<string, unknown>) {
    const url = `https://business-api.tiktok.com/${TIKTOK_API_VERSION}/ad/create/`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": this.accessToken,
      },
      body: JSON.stringify({
        advertiser_id: this.advertiserId,
        campaign_id: campaignId,
        ...creative,
      }),
    });
    if (!res.ok) throw new Error(`TikTok API error: ${res.status}`);
    return res.json();
  }

  async fetchInsights(adId: string) {
    const url = `https://business-api.tiktok.com/${TIKTOK_API_VERSION}/report/ad/get/`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": this.accessToken,
      },
      body: JSON.stringify({
        advertiser_id: this.advertiserId,
        ad_id: adId,
        metrics: ["impressions", "clicks", "spend", "conversions", "ctr", "cpc", "cpm"],
      }),
    });
    if (!res.ok) throw new Error(`TikTok API error: ${res.status}`);
    return res.json();
  }
}
