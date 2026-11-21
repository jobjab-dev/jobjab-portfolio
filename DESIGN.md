---
name: Jobjab Portfolio — Phosphor Unix Terminal
description: Deep green-black CRT terminal workstation uniting interactive zsh command shell, tmux split panes, phosphor green signals, and amber private-engine highlights.
colors:
  phosphor-green: "#39ff7a"
  phosphor-green-hover: "#22e563"
  phosphor-green-ink: "#041108"
  phosphor-amber: "#ffb000"
  phosphor-amber-hover: "#e59e00"
  phosphor-cyan: "#46e8c8"
  term-void: "#050a07"
  term-sub: "#060f0b"
  term-pane: "#08120c"
  term-pane-bar: "#0c1911"
  term-pane-alt: "#0d1c13"
  term-border: "#193826"
  term-border-bright: "#2f7d4d"
  amber-tint: "#191205"
  term-ink-bright: "#ebfff2"
  term-ink: "#c9eed6"
  term-ink-soft: "#9dc4ac"
  term-ink-muted: "#6ca380"
typography:
  display:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.625
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
    letterSpacing: "0.08em"
rounded:
  none: "0px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.phosphor-green}"
    textColor: "{colors.phosphor-green-ink}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.phosphor-green-hover}"
    textColor: "{colors.phosphor-green-ink}"
  button-secondary:
    backgroundColor: "{colors.term-void}"
    textColor: "{colors.term-ink}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  button-amber-access:
    backgroundColor: "{colors.amber-tint}"
    textColor: "{colors.phosphor-amber}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  chip-tag:
    backgroundColor: "{colors.term-pane-alt}"
    textColor: "{colors.term-ink}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  chip-private-lock:
    backgroundColor: "{colors.amber-tint}"
    textColor: "{colors.phosphor-amber}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  pane-card:
    backgroundColor: "{colors.term-pane}"
    textColor: "{colors.term-ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  input-cli:
    backgroundColor: "{colors.term-void}"
    textColor: "{colors.term-ink-bright}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
    height: "40px"
---

# Design System: Jobjab Portfolio — Phosphor Unix Terminal

## Overview

**Creative North Star: "Phosphor Unix Terminal"**

The entire portfolio operates as a high-craft Unix workstation session (`jobjab@prod:~/portfolio`) running inside flat, razor-edged `tmux` split panes. Deep obsidian-green void surfaces hold calm, legible mint-phosphor body prose, structured command bars, and crisp single-pixel hairline partitions without fuzzy neon glow or generic dark-mode glass.

Rather than treating terminal aesthetics as pure decoration, the primary viewport houses a live interactive zsh interpreter alongside a synchronized hardware Proof Monitor for the 6 Flagship interactive runtimes, a live track jump table across all 37 production systems, and direct access to the Gemini 2.5 Studio Desk daemon. Signal phosphor green owns active prompts, active tabs, and primary live launches, while signal amber highlights Zama bounty honors, Python Perp DEX trading engines, and private-repository access controls.

**Key Characteristics:**
- Flat `tmux` split-pane geometry with crisp single-pixel green hairlines (`1px solid #193826`) and zero soft blur drop shadows or glowing neon halos
- Real interactive command shell (`help`, `ls`, `bots`, `saas`, `web3`, `cat <01-37>`, `open <01-37>`, `whoami`, `ai <query>`) driving live state directly in the hero viewport
- Phosphor-tinted green neutrals replacing neutral gray text so dark terminal contrast remains crisp across every hierarchy tier
- Dual-signal semantic encoding: Phosphor Green for public live execution; Phosphor Amber for Zama bounty achievements, Quant Perp DEX bots, and `[PRIVATE_REPO]` locks

## Colors

A dark CRT green-obsidian palette calibrated so every surface, divider, secondary hint, and interactive control shares one cohesive green-black spectrum punctuated by high-visibility Phosphor Green, Amber, and Cyan status signals.

### Primary
- **Phosphor Green** (`phosphor-green`): Primary interactive signal color for `Launch Live` actions, active `tmux` tabs, live blinking cursors, and primary focus outlines. Paired exclusively with deep green-black ink (`phosphor-green-ink`) to maintain maximum legibility.
- **Phosphor Green Hover** (`phosphor-green-hover`): Pressed and pointer-hover state for primary green action fills.
- **Phosphor Green Ink** (`phosphor-green-ink`): Deep green-black foreground text rendered atop solid Phosphor Green and Amber buttons.

### Secondary
- **Phosphor Amber** (`phosphor-amber`): Dedicated semantic status signal for the `$5,000` Zama Monthly Bounty placement, Algorithmic Quant & Perp DEX track headers, and `[PRIVATE_REPO]` security lock badges.
- **Phosphor Amber Hover** (`phosphor-amber-hover`): Deeper amber hover stop for secondary amber controls.
- **Amber Tint** (`amber-tint`): Recessed warm-amber dark surface fill behind `[PRIVATE_REPO]` lock tags and Request Access buttons.
- **Phosphor Cyan** (`phosphor-cyan`): Supporting terminal telemetry hue reserved for SaaS/Fintech/AI domain lines, Quick Node headings, and track count readouts.

### Neutral
- **Term Void** (`term-void`): Root canvas ground beneath every page, CLI input bar, and inline button inset.
- **Term Sub** (`term-sub`): Slightly lifted obsidian-green background for the Confidential Web3 Ledger section and quick-run command bar.
- **Term Pane** (`term-pane`): Primary surface fill for every project pane, terminal transcript window, header bar, and footer.
- **Term Pane Bar** (`term-pane-bar`): Title-bar header strip framing `[0] jobjab@prod:~/portfolio` and `[1] proof-monitor`.
- **Term Pane Alt** (`term-pane-alt`): Surface fill behind monospaced technology stack pills and terminal quick-run buttons.
- **Term Border** (`term-border`): Standard `1px` single-pixel hairline divider and resting pane perimeter.
- **Term Border Bright** (`term-border-bright`): Active hover boundary and secondary outlined button border.
- **Term Ink Bright** (`term-ink-bright`): High-luminance phosphor white-green ink for headings, active shell inputs, and channel values.
- **Term Ink** (`term-ink`): Primary readable body prose ink across descriptions and terminal output.
- **Term Ink Soft** (`term-ink-soft`): Slightly softer green-tinted ink for multi-line bullet lists inside cards.
- **Term Ink Muted** (`term-ink-muted`): Green-tinted subdued ink for metadata timestamps, placeholders, and secondary paths (never un-tinted neutral gray).

### Named Rules
**The Zero-Halo Rule.** Never wrap panes, text, or buttons in multi-pixel fluorescent `box-shadow` or `text-shadow` neon blooms; terminal authority comes from exact contrast ratios and razor-sharp `1px` borders.
**The Green-Tinted Neutral Rule.** Every muted caption and secondary description must come from phosphor-tinted green hues (`term-ink-muted`, `term-ink-soft`) rather than desaturating into cold neutral gray.

## Typography

**Display Font:** IBM Plex Mono (`IBM Plex Mono`, fallback `ui-monospace, SFMono-Regular, monospace`)
**Body Font:** IBM Plex Mono (`IBM Plex Mono`, fallback `ui-monospace, SFMono-Regular, monospace`)
**Label/Mono Font:** IBM Plex Mono (`IBM Plex Mono`, fallback `ui-monospace, SFMono-Regular, monospace`)

**Character:** Uncompromising utilitarian precision. Four self-hosted weights (`400`, `500`, `600`, and `700`) of `IBM Plex Mono` paired with enforced `tabular-nums` ensure aligned index columns, dense dependency badges, and crisp shell output without decorative sans or display mixing.

### Hierarchy
- **Display** (`600`, `2.25rem`, `1.15` line-height, `-0.02em` tracking): Subpage main `h1` headings (`Shipped Proofing Index`, `Get in Touch`).
- **Headline** (`600`, `1.875rem`, `1.2` line-height, `-0.015em` tracking): Major portfolio section headings on `/` (`Interactive Web Runtimes & Engines (01–06)`).
- **Title** (`600`, `1.125rem`, `1.3` line-height, `-0.01em` tracking): Pane and project headings (`[07] Hyperliquid Trading Bot`, `[1] proof-monitor`).
- **Body** (`400`, `0.75rem`, `1.625` line-height): System descriptions, capability bullets, and live CLI shell transcript lines.
- **Label** (`500`, `0.75rem`, `1.4` line-height, `+0.08em` tracking): Action buttons, nav window items (`0:home`, `1:projects(37)`), and track headers.
- **Caption** (`400`, `0.6875rem`, `1.4` line-height, `+0.06em` tracking): Venue/strategy tags, dependency pills, and quick-run buttons.
- **Micro** (`400`, `0.625rem`, `1.3` line-height, `+0.08em` tracking): `[PRIVATE_REPO]` badge text and compact quick-selector indices.

### Named Rules
**The Tabular Integrity Rule.** Enable `font-variant-numeric: tabular-nums` globally on `body` so numeric project indexes (`01` through `37`), pricing, and shell listings align in strict vertical columns.
**The No-Kicker Rule.** Never stack an uppercase eyebrow label above any `h1`, `h2`, or `h3` heading; put venue, domain, or stack indicators directly beneath the heading or inside the pane's structural title bar.

## Layout

All desktop (`>= 1024px`) and responsive views align inside a centered `max-width: 1440px` workstation container (`px-4` mobile, `px-6` tablet, `px-8` desktop):
- **Hero Workstation Grid:** `12`-column CSS grid (`7` columns for `[0] interactive zsh pane`, `5` columns stacking `[1] proof-monitor` + `[2] sys-index`), underscored by a full-width `5`-column Confidential Web3 quick-node strip.
- **Track 01 (`01–06`), Track 02 (`07–17`), Track 03 (`18–27`):** `1` col (`< 768px`), `2` cols (`768px–1023px`), `3` cols (`>= 1024px`) with `20px` gap across flat `1px`-bordered panes.
- **Track 04 (`28–37` Web3 Ledger):** `2` cols (`>= 768px`) nested inside a `term-sub` recessed band.
- **Unified Stack Matrix:** `1` col (`< 768px`), `2` cols (`768px–1023px`), `4` cols (`>= 1024px`).

## Elevation & Depth

This design system uses a **Zero-Shadow Flat Tiling Model**. No component renders a soft drop shadow or outer glow; visual hierarchy emerges strictly from surface step contrast (`term-void` -> `term-pane` -> `term-pane-alt`) separated by `1px solid` crisp hairline borders (`term-border` rising to `term-border-bright` or `phosphor-green` on pointer hover and focus).

### Named Rules
**The Flat-Tile Invariant Rule.** Borders alone carry containment; never add `box-shadow` or frosted `backdrop-filter` onto bordered terminal panes.
**The Reduced-Motion Fidelity Rule.** Cursor blinking (`.term-cursor`) and subtle `4px` `.crt-scanlines` strictly yield under `prefers-reduced-motion: reduce`, while active proof monitor swaps animate cleanly over `180ms` using `MotionConfig reducedMotion="user"`.

## Shapes

Architectural zero-radius orthogonality (`0px` corners) governs every surface in the application—header window tabs, buttons, `grep` inputs, stack tags, `[PRIVATE_REPO]` locks, AI dialogue boxes, and project panes—reinforcing a genuine raster terminal grid rather than consumer rounded SaaS cards.

## Components

Every interactive primitive mirrors an authentic terminal buffer, status bar button, or hairline pane control with immediate focus outlines (`1px solid #39ff7a`, `2px` offset) and zero border radius.

### Buttons
- **Shape:** Sharp square (`0px`).
- **Primary:** Solid Phosphor Green (`phosphor-green`) fill with deep Phosphor Green Ink (`phosphor-green-ink`) bold text (`padding: 8px 16px`), darkening to `phosphor-green-hover` on hover.
- **Secondary:** Term Void (`term-void`) fill inside `1px solid #2f7d4d`, shifting border and foreground ink cleanly to `phosphor-green` on hover.
- **Amber Access CTA:** Amber Tint (`amber-tint`) with `1px solid` amber stroke (`#ffb000`) for requesting walkthroughs on `[PRIVATE_REPO]` quant bots and commercial SaaS backends.

### Chips
- **Stack Tag:** Flat `0px` box (`padding: 2px 8px`) with `1px solid #193826` over `term-pane-alt`.
- **Private Lock Badge:** `[PRIVATE_REPO]` lock chip using `amber-tint` background and `phosphor-amber` text inside a hairline amber border.

### Cards / Containers
- **Corner Style:** Razor-square (`0px`).
- **Background:** Term Pane (`term-pane`), internal rule dividers (`1px solid #193826`).
- **Border:** `1px solid #193826` shifting to `1px solid #2f7d4d` (`#39ff7a` on interactive links/cards) on hover. Zero drop shadow.
- **Internal Padding:** `20px` (`p-5`) standard pane cards; `24px–32px` on award/contact feature panes.

### Inputs / Fields
- **Interactive Shell Prompt & Filter Inputs:** Grounded on Term Void (`term-void`), framed by `1px solid #193826` shifting to `#39ff7a` on `:focus` / `:focus-within`, rendered with `caret-color: #39ff7a` and visible blinking block cursor in the zsh prompt.

### Navigation
- Sticky `48px` `tmux`-style status bar (`[0:jobjab@prod] // PORTFOLIO_V3`), numbered window links (`0:home`, `1:projects(37)`, `2:about`, `3:awards`, `4:contact`) where the active window lights up solid Phosphor Green with an asterisk (`*`), paired with an inline `ai>` prompt bar.

### Signature Component: Interactive Zsh Console (`InteractiveShell`)
Split-pane terminal emulator supporting real keyboard navigation (`ArrowUp`/`ArrowDown` command history, `Tab` command completion), instant inspection (`cat <01-37>` updating the adjacent `proof-monitor` plate), filtering commands (`ls`, `bots`, `saas`, `web3`), direct URL launching (`open <01-37>`), and natural-language AI escalation (`ai <question>`).

## Do's and Don'ts

### Do:
- **Do** preserve `0px` sharp corners across panes, buttons, tags, and terminal inputs so the layout stays faithful to a `tmux` window manager.
- **Do** use phosphor-tinted green muted tokens (`#6ca380`, `#9dc4ac`) for secondary text and keep contrast well above `4.5:1`.
- **Do** label private commercial bots and backends honestly with `[PRIVATE_REPO]` and `Request Access` routes rather than exposing dead 404 GitHub links.
- **Do** bind interactive terminal commands cleanly to live React state (`activeFlagshipIdx`) and the global AI chat context.

### Don't:
- **Don't** apply `box-shadow` drop shadows or glowing neon halos (`box-shadow: 0 0 20px ...`) to cards, headings, or CRT text.
- **Don't** place uppercase eyebrow kickers above any `h1`, `h2`, or `h3` heading.
- **Don't** use cold gray (`#888`, `slate-400`) on obsidian-green panes or round pane containers to look like generic SaaS templates.
- **Don't** fabricate trading PnL, volume metrics, win rates, or fake revenue statistics anywhere in copy, AI prompts, or CLI command outputs.
