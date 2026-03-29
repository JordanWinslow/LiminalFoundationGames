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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _hp: honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }

      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
                  I spent years as a music producer and software engineer building
                  games in RPG Maker, Ren&apos;Py, and visual novel engines before I
                  admitted what I actually wanted to make: the games that haunted me.
                  The ones that sit in the back of your mind days later. So I put
                  everything into my most ambitious project yet, SCP: Dead Letter
                  Protocol.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  My inspirations range from board games like Eldritch Horror to
                  analog horror like the Mandela Catalogue, with SCP lore, liminal
                  spaces, and things like House of Leaves and Petscop woven
                  throughout. I have zero interest in jump scares. I care about
                  existential dread: the kind that follows you out of the game and
                  makes you question what you just experienced.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  I&apos;m obsessed with interfaces. As a frontend developer by trade, I
                  design in Figma and build in GameMaker. Menus, readouts, and
                  dashboards can be just as immersive as any 3D world. I spend hours
                  on pixel-perfect visual effects and a style that feels like nothing
                  else out there. I&apos;m a programmer, not an illustrator, so I use AI
                  as a development tool, then edit every image and layer on VFX until
                  it becomes something genuinely my own.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Every decision in my games should feel difficult. Moral dilemmas
                  without clean answers. The wrong call costs you everything. I want
                  you to feel the weight of command, not just the thrill of combat. If
                  that sounds like your kind of game, join the newsletter and Discord.
                  Your feedback directly shapes what I build next.
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
                  className="flex flex-col gap-4"
                >
                  {/* Honeypot — invisible to real users, catches bots */}
                  <input
                    type="text"
                    name="_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      disabled={loading}
                      className="h-12 flex-1 border border-border bg-background px-4 font-mono text-foreground placeholder:text-text-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="vfx-hover-glitch magnetic-btn text-ui flex h-12 items-center gap-2 bg-accent px-8 text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                      {loading ? "Transmitting..." : "Subscribe"}
                    </button>
                  </div>
                  {error && (
                    <p className="text-ui text-sm text-red-400">{error}</p>
                  )}
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
