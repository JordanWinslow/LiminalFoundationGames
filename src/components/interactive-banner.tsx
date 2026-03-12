"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

// ── Icosahedron geometry ──
const PHI = (1 + Math.sqrt(5)) / 2;
const VERTS: [number, number, number][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
const EDGES: [number, number][] = [
  [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],
  [2,3],[2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],
  [4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],
  [7,10],[8,9],[10,11],
];

function rotateY(v: [number, number, number], a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c - v[2] * s, v[1], v[0] * s + v[2] * c];
}
function rotateX(v: [number, number, number], a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}
function project(
  v: [number, number, number], cx: number, cy: number, scale: number, fov: number
): [number, number] {
  const z = fov / (fov + v[2]);
  return [v[0] * scale * z + cx, v[1] * scale * z + cy];
}

// ── Data fragments ──
const FRAGMENTS = [
  { text: "LMNL FDTN", x: "8%", y: "12%", anchor: "start" as const },
  { text: "SCP-####", x: "92%", y: "12%", anchor: "end" as const },
  { text: "J0-rD4-N", x: "8%", y: "88%", anchor: "start" as const },
  { text: "INDEX pgded^ve 1244j", x: "50%", y: "92%", anchor: "middle" as const },
  { text: "W-1NS-10W", x: "92%", y: "88%", anchor: "end" as const },
];

function glitchChar(c: string): string {
  if (Math.random() > 0.5) return c;
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*!?<>{}[]|/\\^~";
  return glyphs[Math.floor(Math.random() * glyphs.length)];
}

// Static grain data URI (avoids SVG re-renders)
const GRAIN_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function InteractiveBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const cursorPxRef = useRef({ x: 0, y: 0, inside: false });
  const { theme } = useTheme();
  const [fragments, setFragments] = useState(FRAGMENTS.map((f) => f.text));
  const [glitchActive, setGlitchActive] = useState(false);
  const [vhsTracking, setVhsTracking] = useState(false);
  const [staticFlash, setStaticFlash] = useState(false);
  const [glitchSlices, setGlitchSlices] = useState<{ y: number; dx: number; h: number }[]>([]);
  const [cursorClip, setCursorClip] = useState({ x: 0, y: 0, inside: false });

  // Global mouse tracking — persists until banner is completely out of view
  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();

      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        mouseRef.current = {
          x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
          y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
        };

        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const inside = cx >= 0 && cx <= rect.width && cy >= 0 && cy <= rect.height;

        cursorPxRef.current = { x: cx, y: cy, inside };

        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            setCursorClip({ x: cx, y: cy, inside });
            rafId = null;
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Canvas wireframe + scanlines + cursor effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const isDark = theme === "dark";
    const lc = isDark ? [240, 230, 214] : [11, 17, 23];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function drawWireframe(cx: number, cy: number, scale: number, rotOffset: number) {
      if (!ctx) return;
      const mx = (mouseRef.current.x - 0.5) * 1.5;
      const my = (mouseRef.current.y - 0.5) * 1.5;
      const ry = time * 0.3 + rotOffset + mx * 0.6;
      const rx = time * 0.2 + rotOffset * 0.5 + my * 0.6;

      const curW = canvas!.getBoundingClientRect().width;
      const curPx = cursorPxRef.current;
      const dist = Math.sqrt((curPx.x - cx) ** 2 + (curPx.y - cy) ** 2);
      const proximity = curPx.inside ? Math.max(0, 1 - dist / (curW * 0.25)) : 0;

      const boostRy = ry + proximity * Math.sin(time * 3) * 0.15;
      const boostRx = rx + proximity * Math.cos(time * 2.5) * 0.12;
      const boostScale = scale * (1 + proximity * 0.15);

      const projected = VERTS.map((v) => {
        let r = rotateY(v, boostRy);
        r = rotateX(r, boostRx);
        return project(r, cx, cy, boostScale, 5);
      });

      // Ghost echo
      ctx.strokeStyle = `rgba(${lc.join(",")},${0.05 + proximity * 0.05})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (const [a, b] of EDGES) {
        ctx.moveTo(projected[a][0] + 4, projected[a][1] + 3);
        ctx.lineTo(projected[b][0] + 4, projected[b][1] + 3);
      }
      ctx.stroke();

      // Main edges — brighter when cursor is near
      ctx.strokeStyle = `rgba(${lc.join(",")},${0.22 + proximity * 0.25})`;
      ctx.lineWidth = 0.7 + proximity * 0.8;
      ctx.beginPath();
      for (const [a, b] of EDGES) {
        ctx.moveTo(projected[a][0], projected[a][1]);
        ctx.lineTo(projected[b][0], projected[b][1]);
      }
      ctx.stroke();

      // Vertices
      for (const p of projected) {
        ctx.fillStyle = `rgba(${lc.join(",")},${0.35 + proximity * 0.3})`;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 1.5 + proximity * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function animate() {
      time += 0.008;
      const w = canvas!.getBoundingClientRect().width;
      const h = canvas!.getBoundingClientRect().height;
      ctx!.clearRect(0, 0, w, h);

      drawWireframe(w * 0.22, h * 0.5, w * 0.065, 0);
      drawWireframe(w * 0.78, h * 0.5, w * 0.065, Math.PI * 0.7);

      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  // Fragment flicker — randomized timing
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function scheduleNext() {
      const delay = 500 + Math.random() * 1500; // 0.5–2s random
      timeout = setTimeout(() => {
        if (Math.random() < 0.45) {
          const idx = Math.floor(Math.random() * FRAGMENTS.length);
          const original = FRAGMENTS[idx].text;
          setFragments((prev) => {
            const next = [...prev];
            next[idx] = original.split("").map((c) => (c === " " ? " " : glitchChar(c))).join("");
            return next;
          });
          setTimeout(() => {
            setFragments((prev) => {
              const next = [...prev];
              next[idx] = original;
              return next;
            });
          }, 60 + Math.random() * 80);
        }
        scheduleNext();
      }, delay);
    }
    scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  // Glitch bursts — randomized timing, varied glitch types
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function scheduleNext() {
      const delay = 2500 + Math.random() * 4500; // 2.5–7s random
      timeout = setTimeout(() => {
        if (Math.random() < 0.3) {
          const glitchType = Math.random();
          let slices: { y: number; dx: number; h: number }[];

          if (glitchType < 0.3) {
            // Type A: 1–2 large slices — dramatic, simple
            const sliceCount = Math.random() < 0.5 ? 1 : 2;
            slices = Array.from({ length: sliceCount }, () => ({
              y: Math.random() * 60 + 10,
              dx: (Math.random() - 0.5) * 40,
              h: 15 + Math.random() * 25,
            }));
          } else if (glitchType < 0.55) {
            // Type B: Full-width horizontal shift of entire text
            slices = [{
              y: 0,
              dx: (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 20),
              h: 100,
            }];
          } else if (glitchType < 0.75) {
            // Type C: Many small fine slices — digital noise feel
            const sliceCount = Math.floor(Math.random() * 10) + 6;
            slices = Array.from({ length: sliceCount }, () => ({
              y: Math.random() * 100,
              dx: (Math.random() - 0.5) * 15,
              h: Math.random() * 4 + 0.5,
            }));
          } else {
            // Type D: Mixed displacement — some horizontal, some with slight vertical via offset y
            const sliceCount = Math.floor(Math.random() * 5) + 3;
            slices = Array.from({ length: sliceCount }, () => ({
              y: Math.random() * 100,
              dx: (Math.random() - 0.5) * 30,
              h: Math.random() * 12 + 2,
            }));
          }

          setGlitchSlices(slices);
          setGlitchActive(true);
          const dur = 60 + Math.random() * 140;
          setTimeout(() => {
            // 25% chance of double-burst
            if (Math.random() < 0.25) {
              const slices2 = Array.from({ length: Math.floor(Math.random() * 4) + 2 }, () => ({
                y: Math.random() * 100,
                dx: (Math.random() - 0.5) * 25,
                h: Math.random() * 10 + 1,
              }));
              setGlitchSlices(slices2);
              setTimeout(() => {
                setGlitchActive(false);
                setGlitchSlices([]);
              }, 50 + Math.random() * 60);
            } else {
              setGlitchActive(false);
              setGlitchSlices([]);
            }
          }, dur);
        }
        scheduleNext();
      }, delay);
    }
    scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  // VHS tracking — randomized timing, less frequent
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function scheduleNext() {
      const delay = 4000 + Math.random() * 7000; // 4–11s random
      timeout = setTimeout(() => {
        if (Math.random() < 0.2) {
          setVhsTracking(true);
          setTimeout(() => setVhsTracking(false), 150 + Math.random() * 250);
        }
        scheduleNext();
      }, delay);
    }
    scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  // Static noise flash — randomized timing, rare
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function scheduleNext() {
      const delay = 6000 + Math.random() * 10000; // 6–16s random
      timeout = setTimeout(() => {
        if (Math.random() < 0.1) {
          setStaticFlash(true);
          setTimeout(() => setStaticFlash(false), 60 + Math.random() * 80);
        }
        scheduleNext();
      }, delay);
    }
    scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  const isDark = theme === "dark";
  const fg = isDark ? "rgba(240,230,214," : "rgba(11,17,23,";
  const strokeColor = isDark ? "rgba(240,230,214,0.35)" : "rgba(11,17,23,0.35)";
  const outlineColor = isDark ? "rgba(240,230,214,0.1)" : "rgba(11,17,23,0.1)";

  const glitchDx = glitchActive ? (Math.random() - 0.5) * 8 : 0;

  // Responsive text: two lines on mobile, single line on md+
  const textCls = "font-display leading-[0.95] tracking-[0.08em] uppercase text-center text-[clamp(2.5rem,14vw,4rem)] md:text-[clamp(3rem,8vw,7rem)] md:whitespace-nowrap";

  // Mouse-reactive chromatic aberration on the whole banner text (from shd_UniversalVFX rgb_shift)
  const mx = cursorClip.inside ? (cursorClip.x / (containerRef.current?.offsetWidth || 1) - 0.5) : 0;
  const my = cursorClip.inside ? (cursorClip.y / (containerRef.current?.offsetHeight || 1) - 0.5) : 0;
  const chromaticX = mx * 2.5;
  const chromaticY = my * 1.2;

  // Cursor distortion offsets
  const distortDx = cursorClip.inside ? 5 + Math.sin(Date.now() * 0.003) * 4 : 0;
  const distortDy = cursorClip.inside ? 3 + Math.cos(Date.now() * 0.004) * 3 : 0;

  // Shared text content with responsive line break
  const bannerText = (
    <>LIMINAL<br className="md:hidden" /> FOUNDATION</>
  );

  // Cursor proximity — calculate distance from cursor to center of banner text
  // Used to trigger RGB shift and distortion effects without any visible overlay
  const containerW = containerRef.current?.offsetWidth || 1;
  const containerH = containerRef.current?.offsetHeight || 1;
  const textCenterX = containerW / 2;
  const textCenterY = containerH / 2;
  const cursorDistToCenter = cursorClip.inside
    ? Math.sqrt((cursorClip.x - textCenterX) ** 2 + (cursorClip.y - textCenterY) ** 2)
    : Infinity;
  const textProximity = cursorClip.inside ? Math.max(0, 1 - cursorDistToCenter / (containerW * 0.4)) : 0;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full select-none overflow-hidden"
    >
      {/* Canvas: wireframes + scanlines + cursor canvas effects */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />


      {/* ── All text layers ── */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative">
          {/* Outlined echo — shifted UP */}
          <h2
            className={`pointer-events-none absolute left-0 right-0 ${textCls}`}
            style={{
              color: "transparent",
              WebkitTextStroke: `1px ${outlineColor}`,
              bottom: "55%",
              transform: glitchActive ? `translateX(${-glitchDx * 0.4}px)` : "none",
              transition: glitchActive ? "none" : "transform 0.2s",
            }}
            aria-hidden="true"
          >
            {bannerText}
          </h2>

          {/* Ghost echo (from shd_UniversalVFX ghost effect) */}
          <h1
            className={`pointer-events-none absolute inset-0 ${textCls}`}
            style={{
              color: `${fg}0.04)`,
              transform: "translate(4px, 3px)",
              WebkitTextStroke: `1px ${fg}0.02)`,
            }}
            aria-hidden="true"
          >
            {bannerText}
          </h1>

          {/* Mouse-reactive chromatic red channel (from shd_UniversalVFX rgb_shift) */}
          <h1
            className={`pointer-events-none absolute inset-0 ${textCls}`}
            style={{
              color: cursorClip.inside ? "rgba(194,48,48,0.06)" : "transparent",
              transform: `translate(${chromaticX + (glitchActive ? glitchDx * 0.5 : 0)}px, ${chromaticY * 0.3}px)`,
              transition: glitchActive ? "none" : "transform 0.5s cubic-bezier(0.16,1,0.3,1), color 0.3s",
            }}
            aria-hidden="true"
          >
            {bannerText}
          </h1>

          {/* Mouse-reactive chromatic cyan channel */}
          <h1
            className={`pointer-events-none absolute inset-0 ${textCls}`}
            style={{
              color: cursorClip.inside ? "rgba(48,152,152,0.06)" : "transparent",
              transform: `translate(${-chromaticX + (glitchActive ? -glitchDx * 0.5 : 0)}px, ${-chromaticY * 0.3}px)`,
              transition: glitchActive ? "none" : "transform 0.5s cubic-bezier(0.16,1,0.3,1), color 0.3s",
            }}
            aria-hidden="true"
          >
            {bannerText}
          </h1>

          {/* Glitch offset layer (displaced during bursts) */}
          <h1
            className={`pointer-events-none absolute inset-0 ${textCls}`}
            style={{
              color: `${fg}${glitchActive ? "0.18" : "0"})`,
              transform: `translate(${glitchActive ? glitchDx : 0}px, ${glitchActive ? 1.5 : 0}px)`,
              transition: glitchActive ? "none" : "all 0.3s",
              WebkitTextStroke: `1px ${fg}${glitchActive ? "0.12" : "0"})`,
            }}
            aria-hidden="true"
          >
            {bannerText}
          </h1>

          {/* Main text */}
          <h1
            className={`${textCls} text-foreground`}
            style={{
              WebkitTextStroke: `1px ${strokeColor}`,
              textShadow: isDark
                ? `0 0 60px rgba(240,230,214,0.06), ${chromaticX * 0.5}px ${chromaticY * 0.2}px 0 rgba(194,48,48,0.03), ${-chromaticX * 0.5}px ${-chromaticY * 0.2}px 0 rgba(48,152,152,0.03)`
                : `0 0 60px rgba(11,17,23,0.04), ${chromaticX * 0.5}px ${chromaticY * 0.2}px 0 rgba(194,48,48,0.03), ${-chromaticX * 0.5}px ${-chromaticY * 0.2}px 0 rgba(48,152,152,0.03)`,
            }}
          >
            {bannerText}
          </h1>

          {/* Soft glitch slices (from shd_UniversalVFX soft_glitch) */}
          {glitchActive &&
            glitchSlices.map((slice, i) => (
              <div
                key={i}
                className={`pointer-events-none absolute left-0 right-0 top-0 overflow-hidden ${textCls} text-foreground`}
                style={{
                  clipPath: `inset(${slice.y}% 0 ${Math.max(0, 100 - slice.y - slice.h)}% 0)`,
                  transform: `translateX(${slice.dx}px)`,
                  WebkitTextStroke: `1px ${strokeColor}`,
                }}
                aria-hidden="true"
              >
                {bannerText}
              </div>
            ))}

          {/* Outlined echo — shifted DOWN */}
          <h2
            className={`pointer-events-none absolute left-0 right-0 ${textCls}`}
            style={{
              color: "transparent",
              WebkitTextStroke: `1px ${outlineColor}`,
              top: "55%",
              transform: glitchActive ? `translateX(${glitchDx * 0.4}px)` : "none",
              transition: glitchActive ? "none" : "transform 0.2s",
            }}
            aria-hidden="true"
          >
            {bannerText}
          </h2>
        </div>
      </div>

      {/* VHS tracking lines (from shd_CRTOverlay vhs_tracking) */}
      {vhsTracking && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {[10, 28, 45, 62, 78, 90].map((y) => (
            <div
              key={y}
              className="absolute left-0 right-0"
              style={{
                top: `${y + Math.random() * 6}%`,
                height: `${1 + Math.random() * 3.5}px`,
                background: `linear-gradient(90deg, transparent, ${fg}0.07) 10%, ${fg}0.12) 50%, ${fg}0.07) 90%, transparent)`,
                transform: `translateX(${(Math.random() - 0.5) * 50}px)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Static noise flash (from shd_CRTOverlay static_noise) */}
      {staticFlash && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.1,
            backgroundImage: GRAIN_URI,
            backgroundSize: "200px 200px",
          }}
          aria-hidden="true"
        />
      )}

      {/* Screen tear during glitch bursts (from shd_UniversalVFX) */}
      {glitchActive && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${Math.random() * 100}%`,
                height: `${Math.random() < 0.2 ? 3 : 1}px`,
                background: `${fg}${0.04 + Math.random() * 0.08})`,
                transform: `translateX(${(Math.random() - 0.5) * 60}px)`,
              }}
            />
          ))}
        </div>
      )}


      {/* Data fragments with proximity effects */}
      {FRAGMENTS.map((frag, i) => {
        const fragXPct = parseFloat(frag.x) / 100;
        const fragYPct = parseFloat(frag.y) / 100;
        const cw = containerRef.current?.offsetWidth || 1;
        const ch = containerRef.current?.offsetHeight || 1;
        const cxPct = cursorClip.inside ? cursorClip.x / cw : -1;
        const cyPct = cursorClip.inside ? cursorClip.y / ch : -1;
        const dist = Math.sqrt((cxPct - fragXPct) ** 2 + (cyPct - fragYPct) ** 2);
        const proximity = cursorClip.inside ? Math.max(0, 1 - dist / 0.2) : 0;

        return (
          <span
            key={i}
            className="text-label absolute transition-all duration-200"
            style={{
              fontSize: "clamp(6px, 1vw, 11px)",
              left: frag.anchor === "end" ? undefined : frag.x,
              right: frag.anchor === "end" ? `${100 - parseFloat(frag.x)}%` : undefined,
              top: frag.y,
              textAlign: frag.anchor === "middle" ? "center" : frag.anchor === "end" ? "right" : "left",
              transform: frag.anchor === "middle" ? "translateX(-50%)" : undefined,
              color: `${fg}${0.25 + proximity * 0.45})`,
              textShadow: proximity > 0.3 ? `0 0 ${proximity * 8}px ${fg}0.2)` : undefined,
            }}
          >
            {fragments[i]}
          </span>
        );
      })}

      {/*
        ── Cursor proximity VFX ──
        No visible overlay/circle. RGB shift and distortion intensity
        scales with cursor distance — closer = stronger effects.
        The chromatic aberration layers above already react to mouse position.
        These additional layers add localized intensity when cursor is close.
      */}
      {cursorClip.inside && textProximity > 0.1 && (
        <>
          {/* Red channel offset — intensity scales with proximity */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-4"
            style={{
              mixBlendMode: isDark ? "screen" : "multiply",
              opacity: textProximity * 0.6,
            }}
            aria-hidden="true"
          >
            <div className="relative" style={{ transform: `translate(${(4 + distortDx * 0.3) * textProximity}px, ${1.5 * textProximity}px)` }}>
              <h1 className={textCls} style={{ color: "rgba(194,48,48,0.5)" }}>
                {bannerText}
              </h1>
            </div>
          </div>

          {/* Cyan channel offset — intensity scales with proximity */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-4"
            style={{
              mixBlendMode: isDark ? "screen" : "multiply",
              opacity: textProximity * 0.6,
            }}
            aria-hidden="true"
          >
            <div className="relative" style={{ transform: `translate(${(-4 - distortDx * 0.3) * textProximity}px, ${-1.5 * textProximity}px)` }}>
              <h1 className={textCls} style={{ color: "rgba(48,152,152,0.5)" }}>
                {bannerText}
              </h1>
            </div>
          </div>

          {/* Displaced text — only visible at high proximity */}
          {textProximity > 0.4 && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-4"
              style={{ opacity: (textProximity - 0.4) * 0.8 }}
              aria-hidden="true"
            >
              <div className="relative" style={{ transform: `translate(${distortDx * textProximity}px, ${distortDy * textProximity}px)` }}>
                <h1
                  className={textCls}
                  style={{
                    color: `${fg}0.4)`,
                    WebkitTextStroke: `1px ${fg}0.2)`,
                  }}
                >
                  {bannerText}
                </h1>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
