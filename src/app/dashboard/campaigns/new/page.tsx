"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const OBJECTIVES = ["Awareness", "Traffic", "Conversions", "App Installs", "Lead Generation"];
const PLATFORMS = ["Facebook", "TikTok"];
const BUDGET_TYPES = ["Daily", "Lifetime"];

export default function NewCampaignPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    objective: OBJECTIVES[0],
    platform: PLATFORMS[0],
    budget: "",
    budgetType: BUDGET_TYPES[0],
  });

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <DashboardShell>
      <div className="mx-auto max-w-2xl">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>New campaign</CardTitle>
            <CardDescription>Create a new campaign and attach it to an ad account.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/dashboard/campaigns");
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Campaign name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Summer launch"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={form.platform} onValueChange={(value) => update("platform", value)} placeholder="Select platform">
                    {PLATFORMS.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Objective</Label>
                  <Select value={form.objective} onValueChange={(value) => update("objective", value)} placeholder="Select objective">
                    {OBJECTIVES.map((objective) => (
                      <SelectItem key={objective} value={objective}>
                        {objective}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    min="0"
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    placeholder="100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Budget type</Label>
                  <Select value={form.budgetType} onValueChange={(value) => update("budgetType", value)} placeholder="Select budget type">
                    {BUDGET_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Button type="button" variant="ghost" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Create campaign</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
