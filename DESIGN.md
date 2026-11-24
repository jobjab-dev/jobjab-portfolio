---
name: Jobjab Portfolio — Autumn Horizon Reel
description: Hand-painted autumn anime cinema portfolio uniting sunlit cityscape reels, Newsreader editorial serif headlines, floating SMPTE HUD typography, and deep slate archive frames.
colors:
  maple-amber: "#ec7a26"
  maple-amber-hover: "#d86919"
  maple-ink: "#120d08"
  amber-tint: "#23170d"
  sky-cerulean: "#82c4e6"
  cinema-void: "#0b0e13"
  cinema-frame: "#11151e"
  cinema-elevated: "#171d29"
  slate-thumb: "#2d3546"
  ivory-bright: "#f8f1e3"
  ivory-warm: "#f3ead8"
  ivory-body: "#dfd7c8"
  cloud-muted: "#9da4b4"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "4rem"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "0em"
  body-compact:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
  caption:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
  micro:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  pill: "9999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.maple-amber}"
    textColor: "{colors.maple-ink}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.maple-amber-hover}"
    textColor: "{colors.maple-ink}"
  button-secondary:
    backgroundColor: "{colors.cinema-void}"
    textColor: "{colors.ivory-bright}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  button-amber-access:
    backgroundColor: "{colors.amber-tint}"
    textColor: "{colors.maple-amber}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  chip-tag:
    backgroundColor: "{colors.cinema-elevated}"
    textColor: "{colors.ivory-body}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  chip-private-lock:
    backgroundColor: "{colors.amber-tint}"
    textColor: "{colors.maple-amber}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  card-cinema-frame:
    backgroundColor: "{colors.cinema-frame}"
    textColor: "{colors.ivory-body}"
    rounded: "{rounded.none}"
    padding: "20px"
---

# Design System: Jobjab Portfolio — Autumn Horizon Reel

## Overview

**Creative North Star: "Autumn Horizon Reel"**

Inspired by Makoto Shinkai and CoMix Wave animation cinematography, the portfolio opens on a single unbroken widescreen painted avenue bathed in warm autumn sunlight and azure clouds. Monumental `Newsreader` serif headlines emerge through a gentle optical focus pull over subtle atmospheric bottom glazes, while a floating studio masthead links projects, architecture tracks, and live SMPTE timecodes without enclosing bars.

Beneath the full-viewport opening reel (`SC 01`), four painted horizon chapters anchor every track across 37 real engineering systems on dark obsidian-slate archive plates framed exclusively by crisp ivory hairlines.

## Colors

A dusk-to-daylight palette pairing warm gouache autumn foliage tones against deep slate-navy archive backgrounds.

### Primary
- **Maple Amber** (`maple-amber`): High-contrast autumn focal signal for primary Live launches, project start indicators, Zama bounty badges, and Quant venue headers.
- **Maple Amber Hover** (`maple-amber-hover`): Deeper amber hover state for primary actions.
- **Maple Ink** (`maple-ink`): Dark espresso foreground text paired exclusively atop amber fills.

### Secondary
- **Sky Cerulean** (`sky-cerulean`): Cool afternoon sky accent reserved for SaaS domains and archive jump links.
- **Amber Tint** (`amber-tint`): Deep warm brown tint behind active scene selectors and Private Repo lock pills.

### Neutral
- **Cinema Void** (`cinema-void`): Root background across pages and inset button containers.
- **Cinema Frame** (`cinema-frame`): Surface for project cards, AI Studio Desk, and contact panels.
- **Cinema Elevated** (`cinema-elevated`): Recessed pill fill for technology dependency chips.
- **Ivory Bright** (`ivory-bright`): Editorial display titles and primary navigation links.
- **Ivory Body** (`ivory-body`): Warm cream reading copy inside archive panes.
- **Cloud Muted** (`cloud-muted`): Subdued blue-slate secondary metadata and capability bullets.

### Named Rules
**The Glaze-Before-Ink Rule.** Every heading or paragraph layered over hand-painted artwork sits above a directional dark gradient glaze so text legibility never drops below readable contrast.
**The Zero-Ghost-Frame Rule.** Archive frames rely strictly on subtle ivory hairline borders (`rgba(248, 241, 227, 0.14)`) with zero drop shadows.

## Typography

**Display Font:** Newsreader (`Newsreader`, Georgia fallback, weights 400, 500, and 600 with italic)
**Body Font:** Hanken Grotesk (`Hanken Grotesk`, system sans fallback, weights 400, 500, and 600)
**Label/Mono Font:** IBM Plex Mono (`IBM Plex Mono`, system mono fallback, weights 400, 500, and 600)

### Hierarchy
- **Display** (`500`, `4rem`, `0.98` line-height, `-0.025em` tracking): Opening cinema hero statement (`Craft, systems, code, motion.`).
- **Headline** (`500`, `2.25rem`, `1.15` line-height, `-0.02em` tracking): Painted horizon chapter titles and subpage headers.
- **Title** (`500`, `1.25rem`, `1.25` line-height, `-0.01em` tracking): Individual project archive titles.
- **Body** (`400`, `0.875rem`, `1.625` line-height): Narrative paragraphs and card descriptions (`0.75rem` compact size for metadata lists).
- **Label** (`500`, `0.75rem`, `1.4` line-height, `+0.08em` tracking): Action controls, tabs, and links.
- **Caption** (`400`, `0.6875rem`, `1.4` line-height): Dependency tags and scene descriptors.
- **Micro** (`400`, `0.625rem`, `1.3` line-height): Private Repo locks and vertical stamp subtitles.

### Named Rules
**The No-Kicker Rule.** Never stack an uppercase eyebrow label above any heading; place scene indicators inline beside chapter controls or below headings.

## Layout

- **Opening Hero (`SC 01`):** `100dvh` container (`min-height: 580px`, `max-height: 960px`) fitting cleanly above the fold on desktop, laptop, tablet, and mobile viewports.
- **Below-the-Fold Grid:** Centered `max-width: 1440px` container spanning 3 columns on desktop for Flagship (`01` to `06`), Quant (`07` to `17`), and SaaS (`18` to `27`) tracks, and 2 columns for Confidential Web3 (`28` to `37`).

## Elevation & Depth

Zero-shadow hairline layering: surfaces separate strictly through tone steps (`cinema-void` -> `cinema-frame` -> `cinema-elevated`) enclosed by `1px` warm-ivory perimeter strokes, reserving atmospheric gradients solely for artwork legibility scrimmed behind overlay typography.

## Shapes

Sharp architectural `0px` corners govern cards, buttons, inputs, and tags so interfaces mirror crisp camera crop gates, contrasting cleanly with circular amber status indicators (`Start a project`) and the floating AI trigger pill.

## Components

### Buttons
- **Primary:** Solid Maple Amber (`#ec7a26`) fill with Maple Ink (`#120d08`), shifting to `#d86919` on hover.
- **Secondary:** Hairline ivory border (`rgba(248, 241, 227, 0.2)`) over `cinema-void`, shifting to Maple Amber border and ink on hover.
- **Private Access:** Warm `amber-tint` button paired with `Request Access` or `Request Demo` links pointing to `/contact`.

### Chips & Tags
- **Dependency Tag:** Square `cinema-elevated` chip (`padding: 2px 8px`).
- **Private Lock Badge:** `amber-tint` lock badge highlighting closed-source commercial repositories cleanly.

### Navigation & Cinema HUD
- Floating overlay masthead on `/` featuring the `[ 創 ]` corner-bracket seal, 3 compact editorial nav columns, live ticking SMPTE timecode box (`SC 01` through `SC 04`), and `Start a project` CTA with an amber dot.

## Do's and Don'ts

### Do:
- **Do** keep hero horizon paintings unobstructed in the upper center sky and stage editorial headings cleanly in the bottom-left and bottom-right corners.
- **Do** disable continuous leaf drift animations cleanly under `prefers-reduced-motion: reduce`.
- **Do** pair painted backgrounds with directional dark contrast scrims beneath overlaid text.

### Don't:
- **Don't** place uppercase eyebrow kickers above headings.
- **Don't** combine `1px` borders with wide `box-shadow` drop shadows on archive cards.
- **Don't** invent unverified trading PnL, APR, revenue, or client claims.
