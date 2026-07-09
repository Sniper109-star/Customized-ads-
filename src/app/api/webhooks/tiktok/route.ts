import { getEngine } from "@/engine/core/engine";

export async function POST(request: Request) {
  const engine = getEngine();
  const body = await request.json().catch(() => ({}));
  const eventType = String(body.event_type || "");

  if (!eventType) {
    return Response.json({ error: "Missing event_type" }, { status: 400 });
  }

  if (eventType === "ad_impression" || eventType === "ad_click" || eventType === "ad_conversion") {
    const adId = String(body.ad_id || "");
    const advertiserId = String(body.advertiser_id || "");
    const accessToken = String(body.access_token || "");

    if (!adId || !advertiserId || !accessToken) {
      return Response.json({ error: "Missing ad_id, advertiser_id, or access_token" }, { status: 400 });
    }

    engine.enqueue("fetch_insights", {
      adId,
      platform: "tiktok",
      accessToken,
      accountId: advertiserId,
      metrics: eventType === "ad_conversion"
        ? ["conversions", "spend", "ctr", "cpc", "cpm"]
        : ["impressions", "clicks", "spend"],
    });

    return Response.json({ received: true, eventType, adId });
  }

  return Response.json({ received: true, eventType });
}
