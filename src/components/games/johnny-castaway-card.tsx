import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Play } from "lucide-react";
import { JOHNNY_PLAY_URL } from "./johnny-castaway-links";

export function JohnnyCastawayCard() {
  return (
    <article className="mt-20 border border-border bg-card [--font-display:var(--font-bebas-neue)]" aria-labelledby="castaway-title">
      <div className="grid items-center md:grid-cols-2">
        <Link href="/games/johnny-castaway-reborn/" className="relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <Image src="/images/games/johnny-castaway-reborn/island-stories-poster.webp" alt="A scene from Johnny Castaway: Reborn’s illustrated island" width={960} height={540} sizes="(max-width: 767px) 100vw, 50vw" className="aspect-video h-auto w-full object-contain" />
          <span className="text-ui absolute bottom-4 left-4 inline-flex items-center gap-2 border border-white/30 bg-black/80 px-3 py-2 text-white"><Play className="h-4 w-4" aria-hidden="true" /> See it in motion</span>
        </Link>
        <div className="p-6 md:p-10">
          <p className="text-label mb-4 text-accent">A love letter to a childhood favorite</p>
          <h2 id="castaway-title" className="text-display text-4xl leading-none text-foreground md:text-5xl">Johnny Castaway: Reborn</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">Watch Johnny build a camp, meet unexpected visitors and get into trouble. An unofficial reimagining of the classic screensaver by Jordan Winslow.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
            <Link href="/games/johnny-castaway-reborn/" className="text-ui inline-flex items-center gap-2 text-foreground hover:text-accent">Explore the project <ChevronRight className="h-4 w-4" aria-hidden="true" /></Link>
            <a href={JOHNNY_PLAY_URL} className="text-ui inline-flex items-center gap-2 text-accent hover:text-accent-hover">Visit the island <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </article>
  );
}
