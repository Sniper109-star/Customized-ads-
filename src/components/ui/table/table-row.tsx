import { cn } from "@/lib/utils";

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export function TableRow({ className, ...props }: TableRowProps) {
  return <tr className={cn("border-b border-border transition-colors", "hover:bg-muted/50", "data-[state=selected]:bg-muted", className)} {...props} />;
}
