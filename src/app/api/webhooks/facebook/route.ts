import { getEngine } from "@/engine/core/engine";

export async function POST(request: Request) {
  const engine = getEngine();
  const body = await request.json().catch(() => ({}));
  const eventType = String(body.event_type || body.object || "");

  if (!eventType) {
    return Response.json({ error: "Missing event_type or object" }, { status: 400 });
  }

  if (eventType === "ad") {
    const fields = String(body.fields || "impressions,clicks,spend");
    const adId = String(body.ad_id || body.id || "");
    if (!adId) return Response.json({ error: "Missing ad_id" }, { status: 400 });

    engine.enqueue("fetch_insights", {
      adId,
      platform: "facebook",
      accessToken: String(body.access_token || ""),
      accountId: String(body.account_id || ""),
      metrics: fields.split(","),
    });

    return Response.json({ received: true, adId });
  }

  return Response.json({ received: true, eventType });
}
