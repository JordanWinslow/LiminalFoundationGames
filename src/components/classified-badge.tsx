import { cn } from "@/lib/utils";

type BadgeVariant = "classified" | "active" | "pending" | "default";

interface ClassifiedBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  classified:
    "border-accent/40 text-accent bg-[var(--accent-muted)]",
  active:
    "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
  pending:
    "border-amber-500/40 text-amber-400 bg-amber-500/10",
  default:
    "border-border text-muted-foreground bg-transparent",
};

export function ClassifiedBadge({
  children,
  variant = "default",
  className,
}: ClassifiedBadgeProps) {
  return (
    <span
      className={cn(
        "text-ui-sm inline-block rounded-[1px] border px-2 py-0.5 font-normal",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
