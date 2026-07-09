import { cn } from "@/lib/utils";

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn("p-4 align-middle [&:first-child]:pl-0 [&:last-child]:pr-0", className)}
      {...props}
    />
  );
}
