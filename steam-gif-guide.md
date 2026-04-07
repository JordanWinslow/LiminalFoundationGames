# Animated Media Reference Guide

A comprehensive reference for producing optimized animated GIFs and videos for Steam, your website, and social media.

---

## Where Animated GIFs Work on Steam

| Location | GIF Support | Notes |
|----------|-------------|-------|
| **"About This Game" description** | Full autoplay | Primary location — GIFs autoplay inline |
| **Special Announcements / Events** | Full autoplay | Use `[img]{STEAM_CLAN_IMAGE}/path[/img]` BBCode |
| **Capsule images** | Static only | Renders first frame only — don't use GIFs here |
| **Screenshots** | Static only | First frame only |
| **Library assets** | Static only | First frame only |

### Inline MP4/WebM Video Clips (New — Aug 2025)

Steam now supports inline video clips in store descriptions as a higher-quality alternative to GIFs.

- Maximum duration: **12 seconds**
- Maximum file size: **100 MB**
- Far better quality-to-size ratio than GIF
- Recommended settings: H.264, 780–1170px wide, 30 fps, CRF 23

---

## Dimensions & Resolution

- Steam's content column is **780px wide** (Nov 2025 wider store rollout)
- **Recommended width:** 780px at 1×, or 1170px for 150% DPI scaling support
- **Maximum accepted:** 4096px wide
- Legacy width (616px) still works but wastes space on modern layouts

---

## File Size Limits

| Constraint | Limit |
|-----------|-------|
| Per image (hard practical limit) | **< 5 MB** |
| Total page animated content | **~15 MB** (Valve may remove GIFs above this) |
| Recommended per GIF | **2–4 MB** |
| Recommended GIF count | **2–3 per page** |

---

## Optimal GIF Settings

| Setting | Value | Rationale |
|---------|-------|-----------|
| Frame rate | **20 FPS** | Good smoothness without balloon file size |
| Duration | **2–5 seconds** (looping) | Short loops keep file size down |
| Color palette | **256 colors** (via ffmpeg `palettegen`) | Maximum GIF quality; use `stats_mode=full` |
| Dithering | **Floyd-Steinberg** | Best general-purpose dithering |
| Post-processing | `gifsicle -O3 --lossy=40` | 20-30% reduction with minimal quality loss |

### Key ffmpeg Commands

```bash
# Pass 1 — Generate optimized color palette (256 colors, full-frame analysis)
ffmpeg -i input.mp4 -vf "fps=20,scale=780:-1:flags=lanczos,palettegen=max_colors=256:stats_mode=full" -update 1 -frames:v 1 palette.png

# Pass 2 — Convert using palette
ffmpeg -i input.mp4 -i palette.png -lavfi "fps=20,scale=780:-1:flags=lanczos [x]; [x][1:v] paletteuse=dither=floyd_steinberg" output.gif
```

### Post-Processing with gifsicle

```bash
# Light compression — preserves sharpness
gifsicle -O3 --lossy=40 output.gif -o output-optimized.gif

# Heavier compression if you need to hit 5 MB (trades some quality)
gifsicle -O3 --colors 192 --lossy=80 output.gif -o output-smaller.gif
```

---

## MP4/WebM Inline Video Settings

For Steam's inline video feature (the higher-quality alternative):

```bash
# H.264 MP4 (CRF 18 for high quality)
ffmpeg -i input.mp4 -c:v libx264 -crf 18 -preset slow -vf "scale=780:-2" -an -movflags +faststart output.mp4

# VP9 WebM (CRF 24 for high quality)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 24 -b:v 0 -vf "scale=780:-2" -an output.webm
```

---

## Professional Best Practices

- Use **2–3 GIFs max**, each showing a different gameplay aspect
- Make the **first frame compelling** — it's visible while loading
- **Alternate GIFs with text blocks** for visual rhythm
- Place the **most impactful GIF near the top** of the description
- Don't duplicate trailer content — show complementary footage
- **No fake UI elements**, no cross-promotion, no external links via images (Sept 2025 policy update)

---

## Upload Process

### Store Page (About This Game)
1. Go to **Steamworks Partner portal** → **Store Page**
2. Click **"Upload Custom Image"** button in the description editor
3. Images are hosted on Steam CDN automatically

### Events & Announcements
Use BBCode to embed images:
```
[img]{STEAM_CLAN_IMAGE}/path/to/image.gif[/img]
```

---

---

# Website Video Best Practices

## Never Use GIFs on Your Website

The same 4-second gameplay clip:
- **GIF:** 4.65 MB (256 colors, dithered, lossy)
- **MP4:** 1.7 MB (full color, sharp, H.264)
- **WebM:** 1.8 MB (full color, sharp, VP9)

Video is **3–12× smaller** at dramatically better quality. Services like Giphy internally serve MP4, not GIF.

## HTML `<video>` as GIF Replacement

```html
<video autoplay muted loop playsinline poster="/thumbnail.jpg">
  <source src="/clip.webm" type="video/webm">
  <source src="/clip.mp4" type="video/mp4">
</video>
```

Every attribute matters:
- **`autoplay`** — begins playback when loaded
- **`muted`** — **required** for autoplay on all modern browsers
- **`loop`** — restarts automatically (GIF behavior)
- **`playsinline`** — prevents iOS Safari fullscreen takeover
- **`poster`** — shows a clean first frame during loading

**Always strip the audio track** with ffmpeg's `-an` flag.

## Lazy Loading

For videos below the fold, use Intersection Observer to defer loading:

```javascript
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    const video = entry.target;
    video.querySelectorAll('source').forEach(s => { s.src = s.dataset.src; });
    video.load();
    observer.unobserve(video);
  }
}, { rootMargin: '200px' });
```

## Target File Sizes for Web

| Context | Target Size | Resolution |
|---------|-------------|------------|
| Mobile looping clip (5–10s) | **1–3 MB** | 720p |
| Desktop looping clip (5–10s) | **3–5 MB** | 1080p |
| Hero background video | **5–10 MB** | 1080p |

## Next.js Considerations

- No built-in `<Video>` component — use native `<video>` tag
- Use `preload="none"` for below-the-fold videos
- Serve from CDN (Cloudflare) for best performance

---

# Social Media Specs & Strategy

## GIFs vs Videos for Engagement

**GIFs win for engagement** on Twitter/X because they autoplay and loop with zero friction:
- Tweets with GIFs get **55% more engagement** than text-only
- The autoplay/loop behavior is the key driver, not the format itself
- Twitter internally converts uploaded GIFs to MP4 — the "GIF" label is what triggers autoplay behavior

**Bottom line:** Upload as GIF for Twitter autoplay. Use short MP4 for Discord/Reddit.

## Platform Specifications

| Platform | Best Format | Max Size | Recommended Dimensions |
|----------|-------------|----------|----------------------|
| **Twitter/X** | GIF (autoplay) | 15 MB | 1280×720 (16:9) |
| **Twitter/X** | MP4 (video) | 512 MB | 1280×720 |
| **Discord** (free) | MP4 | 10–25 MB | 1280×720 |
| **Discord** (Nitro) | MP4 | 500 MB | 1280×720 |
| **Reddit** | MP4 (native) | 1 GB | 1920×1080 |

### Twitter/X Tips
- GIFs autoplay in timeline — maximum passive attention capture
- Keep GIFs under 15 MB and under 15 seconds
- 1280×720 landscape for best display

### Discord Tips
- Short MP4 under 10 MB for free users
- Keep clips 10–15 seconds
- 720p is sufficient

### Reddit Tips
- Upload native MP4, Reddit transcodes server-side
- Sweet spot: 45–90 second clips for gaming subreddits
- Upload at highest quality — Reddit handles compression

## Cross-Platform Conversion Pipeline

```
Master MP4 (high quality source, 1080p, 60fps)
  ├── Steam GIF:      780px, 20fps, 256 colors       → mp4-to-steam-gif.sh
  ├── Steam Video:     780px, H.264 CRF 18 + VP9      → mp4-to-steam-video.sh
  ├── Twitter/X GIF:   1280px, 20fps, 256 colors      → mp4-to-social.sh
  ├── Twitter/X MP4:   1280px, H.264 CRF 18           → mp4-to-social.sh
  ├── Discord MP4:     720px, H.264 CRF 20            → mp4-to-social.sh
  ├── Web MP4+WebM:    1280px, no audio                → mp4-to-social.sh
  ├── Web lossless:    native res, CRF 12 + VP9 + AV1 → mp4-to-web.sh
  └── Poster:          First frame (JPG or WebP)       → mp4-to-social.sh / mp4-to-web.sh
```

---

## Master Recording Specifications

Record once at the highest quality, then downscale for each platform using the conversion scripts.

### Recommended Recording Settings

| Setting | Value | Why |
|---------|-------|-----|
| **Resolution** | **1920×1080** (1080p) | Covers all platforms; downscales cleanly to 780, 720, etc. |
| **Aspect ratio** | **16:9** | Universal standard — Steam, YouTube, Twitter, Discord, Reddit all prefer 16:9 |
| **Frame rate** | **60 FPS** | Downscales cleanly to 30 FPS (Steam video) and 20 FPS (GIFs) |
| **Codec** | Near-lossless (CRF 0–15) | OBS: NVENC CQP 15 or x264 CRF 12. Gives clean source for re-encoding |
| **Container** | **MKV** (recording) → **MP4** (delivery) | MKV is crash-safe during recording; remux to MP4 with `ffmpeg -c copy` |
| **Audio** | **48 kHz, stereo, 320 kbps** | Standard for all platforms; scripts strip audio for web/GIF automatically |
| **Color space** | **YUV 4:2:0** | The delivery standard for all platforms |

### Why 1920×1080 and Not 4K?

- All delivery targets max out at 1920×1080 or below (Steam: 780px, Twitter: 1280px)
- 4K source files are 4× larger with no visible benefit after downscaling
- 1080p encodes 4× faster than 4K
- If you already record at 4K for YouTube, that works too — the scripts handle any input resolution

### Per-Platform Delivery Targets

| Platform | Resolution | FPS | Format | Max Duration | Max Size |
|----------|-----------|-----|--------|-------------|----------|
| **Steam trailer** | 1920×1080 | 30 or 60 | H.264 MP4 | ~3 min | — |
| **Steam inline video** | 780×439 | 30 | H.264 or VP9 | 12 sec | 100 MB |
| **Steam GIF** | 780×439 | 20 | GIF | 2–5 sec | 5 MB |
| **Website (hero)** | 1920×1080 | native | MP4 + WebM + AV1 | — | 5–10 MB |
| **Website (inline)** | 1920×1080 | native | MP4 + WebM + AV1 | — | 1–5 MB |
| **Twitter/X GIF** | 1280×720 | 20 | GIF | ~15 sec | 15 MB |
| **Twitter/X video** | 1280×720 | 30 | H.264 MP4 | 2:20 | 512 MB |
| **Discord** | 1280×720 | 30 | H.264 MP4 | — | 10 MB (free) |
| **Reddit** | 1920×1080 | 30+ | MP4 | — | 1 GB |

### Aspect Ratio: Always 16:9

Every platform listed above is optimized for **16:9 landscape**. This means:

- **1920×1080** → scales to **1280×720**, **780×439**, **720×405**
- All the conversion scripts assume 16:9 input
- If recording UI-heavy scenes, ensure important content isn't in the outer 5% (safe zone for cropping)

### Recording Tips for Game Trailers

1. **Record gameplay segments separately** — 15–30 second clips are easier to work with than one long session
2. **Capture at native game resolution** — don't upscale from a lower internal resolution
3. **Disable overlays** — turn off FPS counters, Steam overlay, Discord overlay, etc.
4. **Use a consistent frame rate** — lock to 60 FPS; variable frame rate causes encoding issues
5. **Record a few extra seconds** at start and end — gives room for trimming
6. **Remux MKV → MP4** before running scripts: `ffmpeg -i recording.mkv -c copy recording.mp4`

### Steam Asset Dimensions (Static Images)

All static assets uploaded to Steamworks must match exact pixel dimensions:

| Asset | Dimensions | Format | Notes |
|-------|-----------|--------|-------|
| Header Capsule | 460×215 | PNG/JPG | Store page header |
| Small Capsule | 231×87 | PNG/JPG | Search results, top sellers |
| Large Capsule | 467×181 | PNG/JPG | Featured carousel |
| Hero Capsule | 374×448 | PNG/JPG | Main capsule on store page |
| Library Capsule | 600×900 | PNG/JPG | Steam library grid view |
| Library Hero | 3840×1240 | PNG/JPG | Steam library detail background |
| Library Logo | 1280×720 | PNG (transparent) | Overlaid on Library Hero |
| Community Icon | 32×32 | PNG/JPG | Community hub |
| Client Icon | 32×32 | ICO | Also 16×16 and 64×64 variants |
| Page Background | 1438×810 | PNG/JPG | Store page background |
| Screenshots | 1920×1080 | PNG/JPG | 16:9, minimum 1280×720 |

Use `scripts/validate-steam-assets.sh` to check all assets at once, or `--fix` to auto-resize.

---

## Conversion Scripts

This project includes ready-to-use conversion scripts in the `scripts/` directory:

| Script | Purpose |
|--------|---------|
| `scripts/mp4-to-steam-gif.sh` | Convert MP4 → optimized GIF for Steam |
| `scripts/mp4-to-steam-video.sh` | Convert MP4 → optimized MP4/WebM for Steam inline video (tune animation, 2-pass VP9) |
| `scripts/mp4-to-social.sh` | Convert MP4 → all social media + web versions (tune animation) |
| `scripts/mp4-to-web.sh` | Convert MP4 → visually lossless MP4 + WebM + AV1 at native resolution |
| `scripts/batch-convert.sh` | Batch convert all MP4s in a directory to GIFs |
| `scripts/batch-convert-video.sh` | Batch convert all MP4s — supports steam, social, web, or all modes |
| `scripts/validate-steam-assets.sh` | Validate (and optionally fix) image dimensions for all Steam assets |

### Prerequisites
- **ffmpeg** — must be installed and on PATH
- **gifsicle** — optional but recommended for extra lossless GIF compression

### Encoding Optimizations

All H.264 encodes use `-tune animation` for better compression of game footage (flat colors, sharp edges, UI elements). VP9 encodes use 2-pass for optimal bitrate distribution. AV1 output (via `libsvtav1`) is generated when available, offering ~25% smaller files than VP9 at the same quality.

All scripts output to the **same directory as the input file** by default. Run any script with no arguments to see usage instructions.
