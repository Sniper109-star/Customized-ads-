import { NextResponse } from "next/server";
import { FacebookAdsClient, TikTokAdsClient } from "@/lib/ads";

export async function GET() {
  return NextResponse.json({
    providers: [
      {
        id: "facebook",
        name: "Facebook Ads",
        connected: false,
      },
      {
        id: "tiktok",
        name: "TikTok Ads",
        connected: false,
      },
    ],
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const provider = String(body.provider || "");
  const accessToken = String(body.accessToken || "");

  if (!accessToken) {
    return NextResponse.json({ error: "accessToken is required" }, { status: 400 });
  }

  if (!["facebook", "tiktok"].includes(provider)) {
    return NextResponse.json({ error: "Unsupported provider" }, { status: 400 });
  }

  let insight;
  try {
    if (provider === "facebook") {
      const client = new FacebookAdsClient(accessToken, body.adAccountId || "demo");
      insight = await client.fetchInsights(body.adId || "demo");
    } else {
      const client = new TikTokAdsClient(accessToken, body.advertiserId || "demo");
      insight = await client.fetchInsights(body.adId || "demo");
    }
  } catch (error) {
    return NextResponse.json({ error: "Please use a valid developer token for this demo integration." }, { status: 400 });
  }

  return NextResponse.json({ provider, insight, status: "ok" });
}
