import { cn } from "@/lib/utils";

interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return <caption className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />;
}
