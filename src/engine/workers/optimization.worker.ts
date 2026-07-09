import { Job } from "../types";
import { Queue } from "../queue";
import { EngineWorkerBase } from "./base";

export interface OptimizePayload {
  campaignId: string;
  objective: "awareness" | "traffic" | "conversions" | "app_installs" | "lead_generation";
  currentBudget: number;
  currentCtr: number;
  currentCpc: number;
  currentConversions: number;
  spend: number;
}

export class OptimizationWorker extends EngineWorkerBase {
  protected jobType = "optimize_campaign";

  constructor(queue: Queue) {
    super(queue);
  }

  public async process(job: Job): Promise<unknown> {
    const payload = job.payload as unknown as OptimizePayload;
    const {
      campaignId,
      objective,
      currentBudget,
      currentCtr,
      currentCpc,
      currentConversions,
      spend,
    } = payload;

    let recommendedBudget = currentBudget;
    let recommendation: "increase" | "decrease" | "maintain" | "warn" = "maintain";
    let reason = "Metrics within acceptable range";

    if (objective === "conversions" || objective === "lead_generation") {
      const cpa = currentConversions > 0 ? spend / currentConversions : Infinity;
      if (cpa === Infinity) {
        recommendation = "warn";
        reason = "No conversions yet. Consider reviewing targeting or creative.";
        recommendedBudget = Math.max(currentBudget * 0.85, 10);
      } else if (currentCtr < 0.01) {
        recommendation = "decrease";
        reason = "CTR is low; reduce budget to limit spend while testing new creatives.";
        recommendedBudget = Math.round(currentBudget * 0.9);
      } else if (currentCtr > 0.04 && cpa < currentCpc * 1.2) {
        recommendation = "increase";
        reason = "Strong CTR and efficient CPA; increase budget to capture more volume.";
        recommendedBudget = Math.round(currentBudget * 1.2);
      }
    } else if (objective === "awareness") {
      if (currentCtr > 0.04) {
        recommendation = "increase";
        reason = "High engagement rate; scale impressions.";
        recommendedBudget = Math.round(currentBudget * 1.25);
      } else if (currentCtr < 0.01 && spend > currentBudget * 0.5) {
        recommendation = "decrease";
        reason = "Low engagement with spend accelerating; reduce exposure.";
        recommendedBudget = Math.round(currentBudget * 0.85);
      }
    } else {
      if (currentCpc > 2.5 && currentCtr < 0.015) {
        recommendation = "decrease";
        reason = "High CPC with weak CTR; tighten audience or creative.";
        recommendedBudget = Math.round(currentBudget * 0.9);
      } else if (currentCtr > 0.03 && currentCpc < 1.2) {
        recommendation = "increase";
        reason = "Efficient traffic acquisition; increase budget.";
        recommendedBudget = Math.round(currentBudget * 1.2);
      }
    }

    return {
      campaignId,
      recommendation,
      reason,
      recommendedBudget,
      previousBudget: currentBudget,
      currentMetrics: {
        ctr: currentCtr,
        cpc: currentCpc,
        conversions: currentConversions,
        spend,
      },
    };
  }
}
