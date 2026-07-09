import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">About</h1>
        <p className="text-xl text-muted-foreground">
          This is a modern Next.js starter template designed for AI-assisted development.
        </p>
        <div className="space-y-4">
          <p>
            It provides a clean foundation that can be extended to build any type of web
            application through interaction with an AI assistant.
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Next.js 16 with App Router</li>
            <li>TypeScript for type safety</li>
            <li>Tailwind CSS 4 for styling</li>
            <li>ESLint for code quality</li>
            <li>Prettier for formatting</li>
            <li>Standard component library</li>
          </ul>
          <div className="flex gap-4 pt-4">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
