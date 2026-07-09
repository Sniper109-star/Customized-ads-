import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { settings as demoSettings } from "@/lib/demo-data";

export default function SettingsPage() {
  const settings = demoSettings;

  return (
    <DashboardShell>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage workspace name and default ad preferences.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>These settings affect the dashboard header and default metadata.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Workspace name</Label>
              <Input id="workspace-name" defaultValue={settings.workspaceName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-brand">Default brand</Label>
              <Input id="default-brand" defaultValue={settings.defaultBrand} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-currency">Default currency</Label>
              <Input id="default-currency" defaultValue={settings.defaultCurrency} />
            </div>
            <Button>Save settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
