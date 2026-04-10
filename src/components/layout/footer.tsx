import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      {/* Red accent line at top */}
      <div className="red-line" />

      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-display text-2xl text-foreground">
              Liminal Foundation
            </p>
            <p className="text-ui-sm mt-2 text-text-dim">
              Independent Game Studio — Est. 2026
            </p>
            <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
              Dark, atmospheric games built with uncompromising attention to detail.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-label mb-4 text-accent">
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              <a href="/#games" className="text-ui text-muted-foreground transition-colors hover:text-foreground">
                Games
              </a>
              <a href="/#about" className="text-ui text-muted-foreground transition-colors hover:text-foreground">
                About
              </a>
              <a href="/#connect" className="text-ui text-muted-foreground transition-colors hover:text-foreground">
                Connect
              </a>
            </div>
          </div>

          {/* External */}
          <div>
            <p className="text-label mb-4 text-accent">
              External
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="https://store.steampowered.com/app/4581700/SCP_Dead_Letter_Protocol/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ui text-accent transition-colors hover:text-accent-hover"
              >
                Steam
              </Link>
              <Link
                href="https://JordanWinslow.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ui text-muted-foreground transition-colors hover:text-foreground"
              >
                JordanWinslow.dev
              </Link>
              <Link
                href="https://github.com/JordanWinslow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ui text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </Link>
              <Link
                href="https://JordanWinslow.me/royaltyfreemusic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ui text-muted-foreground transition-colors hover:text-foreground"
              >
                Royalty Free Music
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-caption mt-16 flex flex-col gap-2 border-t border-border pt-8 text-text-dim">
          <p>&copy; 2026 Liminal Foundation Games. All rights reserved.</p>
          <p>
            SCP content licensed under{" "}
            <Link
              href="https://creativecommons.org/licenses/by-sa/3.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline transition-colors hover:text-accent"
            >
              CC BY-SA 3.0
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
