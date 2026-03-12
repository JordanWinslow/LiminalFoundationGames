import Link from "next/link";
import { GlitchText } from "@/components/glitch-text";

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-label mb-4 text-accent">
        Clearance Denied
      </p>

      <GlitchText
        text="404"
        className="text-display text-[clamp(5rem,15vw,12rem)] leading-none text-foreground"
      />

      <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
        This document has been redacted, expunged, or never existed.
        The Foundation denies all knowledge of the requested resource.
      </p>

      <Link
        href="/"
        className="text-ui magnetic-btn mt-10 border border-border px-8 py-3 text-muted-foreground transition-all hover:border-accent hover:text-accent"
      >
        Return to Base
      </Link>
    </div>
  );
}
