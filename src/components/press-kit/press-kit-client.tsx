"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Download,
  Package,
  Check,
  Loader2,
  X,
  ChevronRight,
  Eye,
} from "lucide-react";
import JSZip from "jszip";
import { pressCategories, type PressAsset, type PressCategory } from "./press-kit-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

type DownloadState = "idle" | "downloading" | "done";

async function downloadFile(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  return res.arrayBuffer();
}

async function downloadAsZip(
  assets: PressAsset[],
  zipName: string,
  onProgress: (pct: number) => void
) {
  const zip = new JSZip();
  let loaded = 0;

  for (const asset of assets) {
    const data = await downloadFile(asset.src);
    zip.file(asset.filename, data);
    loaded++;
    onProgress(Math.round((loaded / assets.length) * 100));
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = zipName;
  link.click();
  URL.revokeObjectURL(link.href);
}

function downloadSingle(asset: PressAsset) {
  const link = document.createElement("a");
  link.href = asset.src;
  link.download = asset.filename;
  link.click();
}

/* ---- Lightbox ---- */
function Lightbox({
  asset,
  category,
  onClose,
  onPrev,
  onNext,
}: {
  asset: PressAsset;
  category: PressCategory;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const idx = category.assets.indexOf(asset);
  const total = category.assets.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="absolute left-4 top-4 z-10 flex items-center gap-4">
        <span className="text-caption text-text-dim">
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="text-caption text-muted-foreground">{asset.label}</span>
      </div>

      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      <div className="max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        {asset.type === "video" ? (
          <video
            src={asset.src}
            controls
            autoPlay
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
        ) : (
          <img
            src={asset.src}
            alt={asset.label}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); downloadSingle(asset); }}
          className="text-ui flex items-center gap-2 border border-border px-4 py-2 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
      </div>

      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </motion.div>
  );
}

/* ---- Asset Thumbnail ---- */
function AssetThumb({
  asset,
  onClick,
}: {
  asset: PressAsset;
  onClick: () => void;
}) {
  return (
    <div className="group relative border border-border bg-card/50 transition-colors hover:border-accent/60">
      {/* Preview area */}
      <button
        onClick={onClick}
        className="relative block w-full overflow-hidden"
        aria-label={`View ${asset.label}`}
      >
        <div className="relative aspect-video w-full bg-surface">
          {asset.type === "video" ? (
            <video
              src={asset.src}
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          ) : (
            <Image
              src={asset.src}
              alt={asset.label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity group-hover:opacity-100">
            <Eye className="h-6 w-6 text-foreground" />
          </div>
        </div>
      </button>

      {/* Info bar */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <span className="text-ui-sm truncate text-muted-foreground">{asset.label}</span>
        <button
          onClick={() => downloadSingle(asset)}
          className="flex h-7 w-7 shrink-0 items-center justify-center text-text-dim transition-colors hover:text-accent"
          aria-label={`Download ${asset.label}`}
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ---- Category Section ---- */
function CategorySection({
  category,
  index,
  onAssetClick,
}: {
  category: PressCategory;
  index: number;
  onAssetClick: (cat: PressCategory, asset: PressAsset) => void;
}) {
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const [progress, setProgress] = useState(0);

  const handleDownloadCategory = async () => {
    setDownloadState("downloading");
    setProgress(0);
    try {
      await downloadAsZip(
        category.assets,
        `scp-dlp-${category.id}.zip`,
        setProgress
      );
      setDownloadState("done");
      setTimeout(() => setDownloadState("idle"), 2500);
    } catch {
      setDownloadState("idle");
    }
  };

  return (
    <motion.section
      id={category.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {/* Section header */}
      <motion.div custom={0} variants={fadeUp} className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="text-caption text-text-dim">
              {String(index + 1).padStart(3, "0")}
            </span>
            <div className="h-px w-8 bg-border" />
          </div>
          <h2 className="text-display text-3xl text-foreground md:text-4xl">
            {category.title}
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">{category.description}</p>
        </div>
        <button
          onClick={handleDownloadCategory}
          disabled={downloadState !== "idle"}
          className="vfx-hover-glitch text-ui inline-flex shrink-0 items-center gap-2 border border-border px-5 py-2.5 text-muted-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {downloadState === "downloading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {progress}%
            </>
          ) : downloadState === "done" ? (
            <>
              <Check className="h-4 w-4 text-accent" />
              Done
            </>
          ) : (
            <>
              <Package className="h-4 w-4" />
              Download .zip
            </>
          )}
        </button>
      </motion.div>

      {/* YouTube embed for trailer */}
      {category.youtubeUrl && (
        <motion.div custom={1} variants={fadeUp} className="mb-4">
          <div className="relative aspect-video w-full border border-border bg-surface">
            <iframe
              src={`https://www.youtube.com/embed/${category.youtubeUrl.split("/").pop()}`}
              title="Announcement Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="mt-2 flex items-center gap-3">
            <a
              href={category.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ui-sm text-muted-foreground transition-colors hover:text-accent"
            >
              Watch on YouTube
            </a>
          </div>
        </motion.div>
      )}

      {/* Asset grid */}
      <motion.div
        custom={category.youtubeUrl ? 2 : 1}
        variants={fadeUp}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {category.assets.map((asset) => (
          <AssetThumb
            key={asset.filename}
            asset={asset}
            onClick={() => onAssetClick(category, asset)}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}

/* ---- Main Press Kit Page ---- */
export function PressKitClient() {
  const [lightbox, setLightbox] = useState<{
    category: PressCategory;
    index: number;
  } | null>(null);
  const [allDownloadState, setAllDownloadState] = useState<DownloadState>("idle");
  const [allProgress, setAllProgress] = useState(0);

  const allAssets = pressCategories.flatMap((c) => c.assets);

  const handleDownloadAll = async () => {
    setAllDownloadState("downloading");
    setAllProgress(0);
    try {
      const zip = new JSZip();
      let loaded = 0;
      for (const cat of pressCategories) {
        const folder = zip.folder(cat.id)!;
        for (const asset of cat.assets) {
          const data = await downloadFile(asset.src);
          folder.file(asset.filename, data);
          loaded++;
          setAllProgress(Math.round((loaded / allAssets.length) * 100));
        }
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "scp-dlp-press-kit.zip";
      link.click();
      URL.revokeObjectURL(link.href);
      setAllDownloadState("done");
      setTimeout(() => setAllDownloadState("idle"), 2500);
    } catch {
      setAllDownloadState("idle");
    }
  };

  const openLightbox = useCallback((cat: PressCategory, asset: PressAsset) => {
    const index = cat.assets.indexOf(asset);
    setLightbox({ category: cat, index });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const prevLightbox = useCallback(() => {
    if (!lightbox) return;
    const { category, index } = lightbox;
    setLightbox({
      category,
      index: (index - 1 + category.assets.length) % category.assets.length,
    });
  }, [lightbox]);

  const nextLightbox = useCallback(() => {
    if (!lightbox) return;
    const { category, index } = lightbox;
    setLightbox({
      category,
      index: (index + 1) % category.assets.length,
    });
  }, [lightbox]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, prevLightbox, nextLightbox]);

  return (
    <div className="relative z-10 pt-24 pb-24 md:pt-32 md:pb-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Page Header */}
        <motion.div initial="hidden" animate="visible" className="mb-20">
          <motion.div custom={0} variants={fadeUp}>
            <Link
              href="/"
              className="text-ui mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-display mb-3 text-5xl text-foreground md:text-7xl"
          >
            Press Kit
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mb-6 max-w-2xl text-xl leading-relaxed text-foreground/90 md:text-2xl"
          >
            SCP: Dead Letter Protocol
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            className="mb-8 max-w-2xl leading-relaxed text-muted-foreground"
          >
            Logos, screenshots, gameplay clips, and trailer footage for press
            and content creators. Download individual files or grab entire
            categories as a .zip.
          </motion.p>

          {/* Quick nav + Download All */}
          <motion.div custom={4} variants={fadeUp} className="mb-8 flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadAll}
              disabled={allDownloadState !== "idle"}
              className="vfx-hover-glitch magnetic-btn text-ui inline-flex items-center gap-3 border border-accent/40 bg-accent-muted px-6 py-3 text-accent transition-colors hover:border-accent disabled:opacity-50"
            >
              {allDownloadState === "downloading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Packing... {allProgress}%
                </>
              ) : allDownloadState === "done" ? (
                <>
                  <Check className="h-4 w-4" />
                  Downloaded
                </>
              ) : (
                <>
                  <Package className="h-4 w-4" />
                  Download Everything
                </>
              )}
            </button>
            <span className="text-caption text-text-dim">
              {allAssets.length} files
            </span>
          </motion.div>

          {/* Category quick links */}
          <motion.div custom={5} variants={fadeUp} className="flex flex-wrap gap-2">
            {pressCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="text-ui-sm border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {cat.title}
              </a>
            ))}
          </motion.div>

          <motion.div custom={6} variants={fadeUp} className="mt-8">
            <div className="red-line" />
          </motion.div>
        </motion.div>

        {/* Category Sections */}
        <div className="space-y-20">
          {pressCategories.map((category, i) => (
            <CategorySection
              key={category.id}
              category={category}
              index={i}
              onAssetClick={openLightbox}
            />
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={0}
          className="mt-20 border border-border bg-card/50 p-8 md:p-12"
        >
          <p className="text-label mb-4 text-accent">Contact</p>
          <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">
            For press inquiries, review copies, or additional assets, reach out
            on{" "}
            <a
              href="https://discord.gg/VhMYBCRgKa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline transition-colors hover:text-accent-hover"
            >
              Discord
            </a>{" "}
            or through{" "}
            <a
              href="https://JordanWinslow.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline transition-colors hover:text-accent-hover"
            >
              JordanWinslow.dev
            </a>
            .
          </p>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={0}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/"
            className="vfx-hover-glitch magnetic-btn text-ui inline-flex items-center gap-3 border border-accent/40 bg-accent-muted px-8 py-3.5 text-accent transition-colors hover:border-accent"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          asset={lightbox.category.assets[lightbox.index]}
          category={lightbox.category}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </div>
  );
}
