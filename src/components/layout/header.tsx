"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { useTheme } from "../theme-provider";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Games", href: "/#games" },
  { label: "About", href: "/#about" },
  { label: "Connect", href: "/#connect" },
  { label: "Press Kit", href: "/press-kit" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden">
            <Image
              src={
                theme === "dark"
                  ? "/images/brand/avatar-dark.png"
                  : "/images/brand/avatar-light.png"
              }
              alt="Liminal Foundation"
              width={32}
              height={32}
              className="h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <span className="text-label hidden font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:inline">
            Liminal Foundation
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="vfx-hover-chromatic text-label text-muted-foreground transition-colors duration-300 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <div className="mx-2 h-4 w-px bg-border" />
          <a
            href="https://store.steampowered.com/app/4581700/SCP_Dead_Letter_Protocol/"
            target="_blank"
            rel="noopener noreferrer"
            className="vfx-hover-chromatic text-label text-accent transition-colors duration-300 hover:text-accent-hover"
          >
            Steam
          </a>
          <ThemeToggle />
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center border border-border transition-colors hover:border-accent"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-ui border-b border-border py-4 text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://store.steampowered.com/app/4581700/SCP_Dead_Letter_Protocol/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-ui border-b border-border py-4 text-accent transition-colors hover:text-accent-hover"
            >
              Steam
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
