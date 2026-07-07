import { cn } from "@/lib/utils";

type CalloutVariant = "tip" | "warning" | "danger" | "note" | "example";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantConfig: Record<
  CalloutVariant,
  { label: string; bar: string; chip: string }
> = {
  tip: {
    label: "Tip",
    bar: "before:bg-accent",
    chip: "border-accent/40 text-accent bg-[var(--accent-muted)]",
  },
  warning: {
    label: "Caution",
    bar: "before:bg-amber-500",
    chip: "border-amber-500/40 text-amber-400 bg-amber-500/10",
  },
  danger: {
    label: "Lethal",
    bar: "before:bg-accent",
    chip: "border-accent/50 text-accent bg-[var(--accent-muted)]",
  },
  note: {
    label: "Note",
    bar: "before:bg-border-bright",
    chip: "border-border text-muted-foreground bg-transparent",
  },
  example: {
    label: "Example",
    bar: "before:bg-border-bright",
    chip: "border-border text-muted-foreground bg-transparent",
  },
};

/**
 * Strategy-guide sidebar / callout box. A left accent bar, a mono status chip,
 * an optional heading, then body content. Styled to the site's classified-document
 * language (sharp corners, mono labels, arterial-red accent).
 */
export function Callout({
  variant = "note",
  title,
  children,
  className,
}: CalloutProps) {
  const cfg = variantConfig[variant];
  return (
    <div
      className={cn(
        "relative border border-border bg-card/40 py-4 pl-6 pr-5 md:py-5 md:pl-7 md:pr-6",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:content-['']",
        cfg.bar,
        className
      )}
    >
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "text-ui-sm inline-block rounded-[1px] border px-2 py-0.5",
            cfg.chip
          )}
        >
          {cfg.label}
        </span>
        {title && (
          <span className="text-ui text-foreground">{title}</span>
        )}
      </div>
      <div className="space-y-2 leading-relaxed text-foreground/85 [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
}
