import type { Metadata } from "next";
import { PressKitClient } from "@/components/press-kit/press-kit-client";

export const metadata: Metadata = {
  title: "Press Kit | Liminal Foundation Games",
  description:
    "Download logos, screenshots, gameplay videos, and trailer assets for SCP: Dead Letter Protocol. Everything press and content creators need in one place.",
  openGraph: {
    title: "Press Kit | Liminal Foundation Games",
    description:
      "Download logos, screenshots, gameplay videos, and trailer assets for SCP: Dead Letter Protocol.",
    type: "website",
  },
};

export default function PressKitPage() {
  return <PressKitClient />;
}
