import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Next.js Template</h1>
          <p className="text-xl text-muted-foreground">
            A modern starter template with TypeScript, Tailwind CSS 4, and best practices built-in.
          </p>
        </div>
        <div className="flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>TypeScript</CardTitle>
              <CardDescription>Full type safety out of the box</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Strict TypeScript configuration with path aliases and modern tooling.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tailwind CSS 4</CardTitle>
              <CardDescription>Utility-first CSS framework</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tailwind CSS v4 with CSS-first configuration and automatic content detection.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>App Router</CardTitle>
              <CardDescription>Next.js 16 App Router</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Server Components by default with layouts, loading states, and error boundaries.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
