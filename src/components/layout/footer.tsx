import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:h-16 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-0 sm:flex-row sm:gap-2 sm:px-0">
          <p className="text-sm text-muted-foreground">
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
