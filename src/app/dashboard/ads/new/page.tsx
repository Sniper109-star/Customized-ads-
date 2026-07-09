"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const AD_TYPES = ["Image", "Video", "Story"];
const PLATFORMS = ["Facebook", "TikTok", "Both"];

export default function NewAdPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    headline: "",
    body: "",
    cta: "Shop Now",
    adType: AD_TYPES[0],
    platform: PLATFORMS[0],
    destinationUrl: "",
    imageUrl: "",
    videoUrl: "",
  });

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <DashboardShell>
      <div className="mx-auto max-w-2xl">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>New ad</CardTitle>
            <CardDescription>Create a new ad creative and attach it to a campaign.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/dashboard/ads");
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Ad name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Product launch video"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Ad type</Label>
                  <Select value={form.adType} onValueChange={(value) => update("adType", value)} placeholder="Select ad type">
                    {AD_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  value={form.headline}
                  onChange={(e) => update("headline", e.target.value)}
                  placeholder="Summer sale starts now"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Body</Label>
                <Textarea
                  id="body"
                  value={form.body}
                  onChange={(e) => update("body", e.target.value)}
                  placeholder="Describe the offer..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Call to action</Label>
                <Select value={form.cta} onValueChange={(value) => update("cta", value)} placeholder="Select CTA">
                  <SelectItem value="Shop Now">Shop Now</SelectItem>
                  <SelectItem value="Sign Up">Sign Up</SelectItem>
                  <SelectItem value="Learn More">Learn More</SelectItem>
                  <SelectItem value="Get Offer">Get Offer</SelectItem>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destinationUrl">Destination URL</Label>
                <Input
                  id="destinationUrl"
                  value={form.destinationUrl}
                  onChange={(e) => update("destinationUrl", e.target.value)}
                  placeholder="https://example.com/offer"
                  required
                />
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={form.imageUrl}
                    onChange={(e) => update("imageUrl", e.target.value)}
                    placeholder="https://cdn.example.com/image.png"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={form.videoUrl}
                    onChange={(e) => update("videoUrl", e.target.value)}
                    placeholder="https://cdn.example.com/video.mp4"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button type="button" variant="ghost" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Create ad</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
