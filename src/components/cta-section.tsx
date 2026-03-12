"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Send, ExternalLink } from "lucide-react";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61573754030578" },
  { label: "TikTok", href: "https://www.tiktok.com/@liminalfoundationgames" },
  { label: "Instagram", href: "https://www.instagram.com/jordan_d_winslow/" },
  { label: "Twitter / X", href: "https://x.com/LiminalFDN" },
  { label: "Discord", href: "https://discord.gg/cCQTJFWH" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Mailing list signup:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
      {/* Marquee Divider */}
      <div className="relative z-10 overflow-hidden border-y border-border bg-surface py-4">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="text-display mx-8 text-lg tracking-[0.15em] text-text-dim"
            >
              Liminal Foundation Games &bull; SCP: Dead Letter Protocol &bull;
              Coming Soon to Steam &bull; Secure &bull; Contain &bull; Protect
              &bull; Liminal Foundation Games &bull; SCP: Dead Letter Protocol
              &bull; Coming Soon to Steam &bull; Secure &bull; Contain &bull;
              Protect &bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div custom={0} variants={fadeUp}>
              <SectionHeading index="002" label="The Studio" className="mb-12" />
            </motion.div>

            <div>
              <motion.div custom={1} variants={fadeUp}>
                <h2 className="text-display mb-8 text-4xl text-foreground md:float-left md:mr-10 md:mb-4 md:text-5xl">
                  Games forged in
                  <br />
                  <span className="text-accent">the liminal dark</span>
                </h2>
              </motion.div>

              <motion.div custom={2} variants={fadeUp} className="flex flex-col gap-4">
                <p className="leading-relaxed text-muted-foreground">
                  I spent years as a software engineer and music producer before I finally
                  admitted what I really wanted to build. The games that haunted me. The
                  ones that sit in the back of your mind days later, the ones that make
                  you second-guess the silence in your own house. So I left everything
                  behind and started making them in GameMaker, one pixel at a time.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  My first love was board games &mdash; Eldritch Horror broke something open
                  in me and never let go. That obsession with SCP lore, liminal spaces,
                  and dark illustrative art bled into everything I create. I draw from
                  analog horror like the Mandela Catalogue, from the dread of things that
                  feel almost right but aren&apos;t. I don&apos;t believe in jump scares. I
                  believe in existential dread &mdash; the kind that follows you out of the
                  game and makes you question what you just experienced.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  I&apos;m obsessed with interfaces. My games are deeply UI-driven because I
                  think menus, readouts, and dashboards can be just as immersive as any
                  3D world. I spend agonizing hours on pixel-perfect visual effects,
                  meticulously crafting a style that feels like nothing else out there.
                  I&apos;m a programmer, not an illustrator &mdash; so I leverage AI as a
                  development tool, then painstakingly edit every image and layer on VFX
                  until it becomes something truly my own. No shortcuts. No slop.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  A compelling story is non-negotiable for me. I build strategy games
                  where every decision is meaningful and difficult &mdash; where moral
                  dilemmas don&apos;t have clean answers and the wrong choice can cost you
                  everything. I want you to feel the weight of command, not just the
                  thrill of combat.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  If any of this resonates with you, I&apos;d genuinely love for you to
                  join my newsletter and Discord. I&apos;m building these games for people
                  like you, and your feedback on upcoming projects isn&apos;t just welcome
                  &mdash; it shapes what I make next. Your voice matters here more than
                  you know.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="relative z-10 border-t border-border py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div custom={0} variants={fadeUp}>
              <SectionHeading
                index="003"
                label="Stay Informed"
                className="mb-12"
              />
            </motion.div>

            {/* Mailing List */}
            <motion.div
              custom={1}
              variants={fadeUp}
              className="vfx-hover-scan mb-16 border border-border bg-card p-8 md:p-12"
            >
              <h3 className="text-display mb-2 text-3xl text-foreground">
                Get Notified
              </h3>
              <p className="mb-8 max-w-lg leading-relaxed text-muted-foreground">
                Development updates, release announcements, and early access
                opportunities. Infrequent, high-signal transmissions only.
              </p>

              {submitted ? (
                <div className="flex items-center gap-3 border border-accent/30 bg-accent-muted px-6 py-4">
                  <span className="h-2 w-2 animate-pulse bg-accent" />
                  <p className="text-ui text-accent">
                    Transmission received. Stand by for further briefings.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 flex-1 border border-border bg-background px-4 font-mono text-foreground placeholder:text-text-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button
                    type="submit"
                    className="vfx-hover-glitch magnetic-btn text-ui flex h-12 items-center gap-2 bg-accent px-8 text-accent-foreground transition-colors hover:bg-accent-hover"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Subscribe
                  </button>
                </form>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div custom={2} variants={fadeUp}>
              <p className="text-label mb-6 text-accent">
                Follow Development
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vfx-hover-static magnetic-btn text-ui group flex items-center gap-2 border border-border bg-transparent px-6 py-3 text-muted-foreground transition-all hover:border-accent hover:text-accent"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
