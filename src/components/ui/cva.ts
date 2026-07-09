import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";

function cva(base: string, variants?: Record<string, Record<string, string>>, defaultVariants?: Record<string, string>) {
  return ({ className, ...props }: { className?: string } & Record<string, unknown>) => {
    let classes = base;
    if (variants && props) {
      for (const [key, value] of Object.entries(props)) {
        const variantMap = variants[key];
        if (variantMap && typeof value === "string") {
          classes += ` ${variantMap[value] ?? ""}`;
        }
      }
    }
    if (defaultVariants && variants) {
      for (const [key, value] of Object.entries(defaultVariants)) {
        const variantMap = variants[key];
        if (variantMap) {
          classes += ` ${variantMap[value] ?? ""}`;
        }
      }
    }
    return cn(classes, className);
  };
}

export { cva };
