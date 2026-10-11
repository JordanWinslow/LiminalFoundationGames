import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

export function JohnnyCastawayCard() {
  return (
    <article className="mt-20 border border-border bg-card" aria-labelledby="castaway-title">
      <div className="grid items-center md:grid-cols-2">
        <Link href="/games/johnny-castaway-reborn/" className="block overflow-hidden">
          <Image src="/images/games/johnny-castaway-reborn/title.webp" alt="Johnny Castaway: Reborn title artwork" width={1344} height={752} className="h-auto w-full transition-transform duration-500 hover:scale-[1.02]" />
        </Link>
        <div className="p-6 md:p-10">
          <p className="text-label mb-4 text-accent">A love letter to a childhood favorite</p>
          <h2 id="castaway-title" className="text-display text-4xl leading-none text-foreground md:text-5xl">Johnny Castaway: Reborn</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">An unofficial reimagining of the classic screensaver. Watch Johnny forage, build, weather storms and stumble into strange little stories on an illustrated island that keeps changing. By Jordan Winslow.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
            <Link href="/games/johnny-castaway-reborn/" className="text-ui inline-flex items-center gap-2 text-foreground hover:text-accent">Explore the project <ChevronRight className="h-4 w-4" aria-hidden="true" /></Link>
            <a href="https://johnnycastaway.fyi" className="text-ui inline-flex items-center gap-2 text-accent hover:text-accent-hover">Visit the island <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </article>
  );
}
