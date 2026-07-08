"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

            <div className="grid gap-12 md:grid-cols-[minmax(0,380px)_1fr] md:gap-16">
              {/* Personnel file photo */}
              <motion.div
                custom={1}
                variants={fadeUp}
                className="mx-auto w-full max-w-[380px] self-start md:mx-0"
              >
                <div className="flex items-center justify-between border border-border bg-surface px-4 py-2.5">
                  <span className="text-label text-accent">Personnel File</span>
                  <span className="text-label text-text-dim">LF-001</span>
                </div>
                <div className="vfx-hover-scan relative border-x border-border">
                  <Image
                    src="/images/jordan-winslow.jpg"
                    alt="Jordan Winslow, founder and sole developer of Liminal Foundation Games"
                    width={1000}
                    height={1778}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between border border-border bg-surface px-4 py-2.5">
                  <span className="text-label text-foreground">
                    Jordan Winslow
                  </span>
                  <span className="text-label text-text-dim">
                    Founder / Developer
                  </span>
                </div>
              </motion.div>

              {/* Story */}
              <div>
                <motion.div custom={2} variants={fadeUp}>
                  <h2 className="text-display mb-8 text-4xl text-foreground md:text-5xl">
                    Games forged in
                    <br />
                    <span className="text-accent">the liminal dark</span>
                  </h2>
                </motion.div>

                <motion.div
                  custom={3}
                  variants={fadeUp}
                  className="flex flex-col gap-4"
                >
                  <p className="leading-relaxed text-muted-foreground">
                    I&apos;m Jordan Winslow. I&apos;ve spent my career as a{" "}
                    <a
                      href="https://JordanWinslow.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
                    >
                      front end developer
                    </a>{" "}
                    and more nights than I can count{" "}
                    <a
                      href="https://JordanWinslow.me/RoyaltyFreeMusic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
                    >
                      producing music
                    </a>
                    . Somewhere in between I kept making small games that
                    almost nobody played, and I loved building every one of
                    them.
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    There are plenty of great SCP games out there, and most of
                    them put you in first person, face to face with something
                    terrifying. I wanted to make a different kind of SCP game:
                    one built around the story, where you run the Foundation
                    instead of playing a single character, and the dread builds
                    through the decisions you&apos;re forced to make. It became
                    the most ambitious project I&apos;ve ever attempted, and I
                    ended up quitting my day job to give it everything.
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    That was over two years ago. Since then I&apos;ve been
                    working on the game roughly twelve hours a day, six or
                    seven days a week, with very few breaks, because I want it
                    to do the SCP universe justice. And if it succeeds,
                    I&apos;ll get to hire a small team and keep making games
                    about the things I love: liminal spaces, cryptids, the
                    Backrooms, and analog horror.
                  </p>
                </motion.div>
              </div>
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
