interface SectionHeadingProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionHeading({
  index,
  label,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-label text-accent">
        {index}
      </span>
      <span className="h-px w-8 bg-border-bright" />
      <span className="text-label text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
