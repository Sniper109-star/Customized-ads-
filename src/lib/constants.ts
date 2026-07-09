export const SITE_NAME = "Next.js Template";
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
] as const;
