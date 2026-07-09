import { getEngine } from "@/engine/core/engine";

export async function GET() {
  const engine = getEngine();
  const queue = engine.getQueue();
  const stats = queue.getStats();
  const status = engine.getStatus();

  const allJobs = queue
    .getJobsByStatus("queued")
    .concat(queue.getJobsByStatus("running"))
    .concat(queue.getJobsByStatus("completed"))
    .concat(queue.getJobsByStatus("failed"));

  return Response.json({
    status,
    stats,
    jobs: allJobs.map((job) => ({
      id: job.id,
      type: job.type,
      status: job.status,
      attempts: job.attempts,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      error: job.error,
    })),
  });
}

export async function POST(request: Request) {
  const engine = getEngine();
  const body = await request.json().catch(() => ({}));

  const action = String(body.action || "");

  if (action === "enqueue") {
    const { type, payload } = body as { type: string; payload: Record<string, unknown> };
    if (!type) {
      return Response.json({ error: "type is required" }, { status: 400 });
    }
    const jobId = engine.enqueue(type as Parameters<typeof engine.enqueue>[0], payload || {}, Number(body.maxAttempts) || 3);
    return Response.json({ jobId }, { status: 202 });
  }

  if (action === "restart") {
    return Response.json({ message: "Engine restarted", status: engine.getStatus() });
  }

  if (action === "sync_facebook") {
    const { accessToken, adAccountId } = body as { accessToken?: string; adAccountId?: string };
    if (!accessToken) return Response.json({ error: "accessToken is required" }, { status: 400 });
    const jobId = engine.enqueue("sync_facebook", { accessToken, adAccountId });
    return Response.json({ jobId }, { status: 202 });
  }

  if (action === "sync_tiktok") {
    const { accessToken, advertiserId } = body as { accessToken?: string; advertiserId?: string };
    if (!accessToken) return Response.json({ error: "accessToken is required" }, { status: 400 });
    const jobId = engine.enqueue("sync_tiktok", { accessToken, advertiserId });
    return Response.json({ jobId }, { status: 202 });
  }

  if (action === "publish") {
    const payload = body.payload as Record<string, unknown>;
    if (!payload?.adId || !payload?.platform || !payload?.accessToken) {
      return Response.json({ error: "Missing required publish fields" }, { status: 400 });
    }
    const jobId = engine.enqueue("publish_ad", payload);
    return Response.json({ jobId }, { status: 202 });
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
}
