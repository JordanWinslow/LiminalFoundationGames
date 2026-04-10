import type { Metadata } from "next";
import { Metrophobic, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SteamBanner } from "@/components/layout/steam-banner";
import { GrainOverlay } from "@/components/layout/grain-overlay";
import "./globals.css";

const metrophobic = Metrophobic({
  variable: "--font-metrophobic",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liminal Foundation Games — Indie Horror Game Studio",
  description:
    "Liminal Foundation Games is a solo indie game studio by Jordan Winslow — one developer building dark, methodical experiences with obsessive attention to detail. Debut title: SCP: Dead Letter Protocol.",
  keywords: [
    "indie games",
    "horror games",
    "SCP",
    "roguelike",
    "Dead Letter Protocol",
    "Liminal Foundation Games",
    "Jordan Winslow",
  ],
  openGraph: {
    title: "Liminal Foundation Games",
    description:
      "Solo indie game studio by Jordan Winslow. Debut title: SCP: Dead Letter Protocol.",
    type: "website",
    url: "https://www.liminalfoundationgames.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('lf-theme');
                  if (theme === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${metrophobic.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <ThemeProvider>
          <GrainOverlay />
          <SteamBanner />
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
