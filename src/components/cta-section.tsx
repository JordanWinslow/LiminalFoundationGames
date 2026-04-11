"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { ExternalLink } from "lucide-react";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/LiminalFoundationGames/" },
  { label: "TikTok", href: "https://www.tiktok.com/@liminalfoundationgames" },
  { label: "Instagram", href: "https://www.instagram.com/jordan_d_winslow/" },
  { label: "Twitter / X", href: "https://x.com/LiminalFDN" },
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
              Wishlist on Steam &bull; Secure &bull; Contain &bull; Protect
              &bull; Liminal Foundation Games &bull; SCP: Dead Letter Protocol
              &bull; Wishlist on Steam &bull; Secure &bull; Contain &bull;
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
                  I&apos;m Jordan Winslow, a solo developer. Everything you see
                  here, from the game itself to this website and the words on
                  it, is built by me. I&apos;ve spent over two years pouring
                  myself into SCP: Dead Letter Protocol, handling the design,
                  programming, VFX, narrative, and UI from the ground up.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  I care about craft. Every interface is designed in Figma and
                  built in GameMaker with pixel-perfect attention to detail.
                  Every visual effect is hand-tuned. Every system is designed
                  to create the kind of dread that stays with you after you
                  close the game. If that sounds like your kind of experience,
                  join the Discord. Your feedback directly shapes what I build
                  next.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="relative z-10 border-t border-border py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div custom={0} variants={fadeUp}>
              <SectionHeading
                index="003"
                label="Connect"
                className="mb-12"
              />
            </motion.div>

            {/* Discord — primary CTA */}
            <motion.div
              custom={1}
              variants={fadeUp}
              className="vfx-hover-scan mb-12 border border-border bg-card p-8 md:p-12"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <p className="text-label mb-2 text-accent">
                    Open Channel
                  </p>
                  <h3 className="text-display mb-2 text-3xl text-foreground">
                    Join the Discord
                  </h3>
                  <p className="max-w-lg leading-relaxed text-muted-foreground">
                    Playtest upcoming builds, talk directly with the developer,
                    and help shape the game. This is the fastest way to reach me
                    and the best place to follow development.
                  </p>
                </div>
                <a
                  href="https://discord.gg/7QCX33wgUZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vfx-hover-glitch magnetic-btn text-ui flex items-center gap-2 self-start border border-accent/40 bg-accent px-8 py-3.5 text-accent-foreground transition-colors hover:bg-accent-hover md:self-center"
                >
                  Join Discord
                </a>
              </div>
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
