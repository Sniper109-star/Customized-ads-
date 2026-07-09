import { NextResponse } from "next/server";
import { db } from "@/db";
import { platforms, adAccounts, campaigns, ads } from "@/db/schema";
import { sql } from "drizzle-orm";

function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET() {
  const [platformRows, accountRows, campaignRows, adRows] = await Promise.all([
    db.select().from(platforms).orderBy(platforms.id),
    db.select().from(adAccounts).orderBy(adAccounts.id),
    db.select().from(campaigns).orderBy(campaigns.id),
    db.select().from(ads).orderBy(ads.id),
  ]);

  return ok({
    summary: {
      platforms: platformRows.length,
      accounts: accountRows.length,
      campaigns: campaignRows.length,
      ads: adRows.length,
    },
    platforms: platformRows,
    accounts: accountRows,
    campaigns: campaignRows,
    ads: adRows,
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const route = String(body.route || "");

  if (route === "campaigns") {
    const [campaign] = await db.insert(campaigns).values({
      userId: body.userId || 1,
      accountId: body.accountId || 1,
      name: body.name || "Untitled campaign",
      objective: body.objective || "Traffic",
      status: body.status || "draft",
      budget: Number(body.budget ?? 0),
      budgetType: body.budgetType || "daily",
      startDate: body.startDate ? new Date(body.startDate) : new Date(),
      endDate: body.endDate ? new Date(body.endDate) : new Date(),
    }).returning();
    return ok(campaign, 201);
  }

  if (route === "ads") {
    const [ad] = await db.insert(ads).values({
      campaignId: body.campaignId || 1,
      userId: body.userId || 1,
      name: body.name || "Untitled ad",
      adType: body.adType || "IMAGE",
      status: body.status || "draft",
      headline: body.headline || "",
      body: body.body || "",
      cta: body.cta || "",
      destinationUrl: body.destinationUrl || "",
    }).returning();
    return ok(ad, 201);
  }

  return NextResponse.json({ error: "Invalid route" }, { status: 400 });
}
