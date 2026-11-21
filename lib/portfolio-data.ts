export interface FlagshipProject {
  id: string;
  index: string;
  slug: string;
  title: string;
  headline: string;
  shortLabel: string;
  stackLine: string;
  category: "flagship";
  description: string;
  tags: string[];
  mechanics: string[];
  liveUrl: string;
  githubUrl: string;
  plateKey: "lead-preview" | "thumb-02" | "thumb-03" | "thumb-04" | "thumb-05" | "thumb-06";
}

export interface QuantBotProject {
  id: string;
  index: string;
  title: string;
  venue: string;
  strategy: string;
  category: "quant";
  description: string;
  tags: string[];
  capabilities: string[];
  isPrivateRepo: boolean;
  githubUrl?: string;
  githubLabel?: string;
  liveUrl?: string;
  liveLabel?: string;
}

export interface PlatformProject {
  id: string;
  index: string;
  title: string;
  domain: string;
  category: "platform";
  description: string;
  tags: string[];
  capabilities: string[];
  isPrivateRepo: boolean;
  githubUrl?: string;
  githubLabel?: string;
  liveUrl?: string;
  liveLabel?: string;
  secondaryLiveUrl?: string;
  secondaryLiveLabel?: string;
}

export interface Web3Project {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  category: "web3";
  description: string;
  tags: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  highlight?: string;
}

export type UnifiedProject =
  | FlagshipProject
  | QuantBotProject
  | PlatformProject
  | Web3Project;

export const flagshipProjects: FlagshipProject[] = [
  {
    id: "live-auction-engine",
    index: "01",
    slug: "01-live-auction-engine",
    title: "HÄNSEL & ROTH",
    headline: "01 HÄNSEL & ROTH — Live SSE & React 19 Auction Engine",
    shortLabel: "HÄNSEL & ROTH · Live SSE Auction",
    stackLine: "NEXT.JS 16 · REACT 19 · SSE · FRAMER MOTION",
    category: "flagship",
    description:
      "Real-time collector auction house powered by Server-Sent Events, optimistic React 19 bid mutations with conflict rollback, and anti-sniping millisecond extensions.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "SSE", "Framer Motion"],
    mechanics: [
      "Server-Sent Events (/api/stream) simulating rival live bids",
      "React 19 useOptimistic immediate bid jump with conflict rollback",
      "Millisecond anti-sniping countdown extending +15s under 10s",
      "Rolling numeric digit ticker & sliding collector bid ledger",
    ],
    liveUrl: "https://01-live-auction-engine.vercel.app",
    githubUrl: "https://github.com/jobjab-dev/flagship-01-live-auction",
    plateKey: "lead-preview",
  },
  {
    id: "spatial-sound-studio",
    index: "02",
    slug: "02-spatial-sound-studio",
    title: "KINETON M-4",
    headline: "02 KINETON M-4 — Native Web Audio DSP & Hardware Synthesizer",
    shortLabel: "KINETON M-4 · Web Audio DSP",
    stackLine: "VITE 8 · REACT 19 · WEB AUDIO API · ZUSTAND",
    category: "flagship",
    description:
      "Browser-native spatial sound studio and polyphonic synthesizer built with raw AudioContext nodes, Pointer Capture hardware controls, and 60fps canvas oscilloscope.",
    tags: ["Vite 8", "React 19", "TypeScript", "Tailwind v4", "Zustand", "Web Audio API"],
    mechanics: [
      "Zero-MP3 procedural AudioContext synthesis, filter & noise generators",
      "Hardware rotary knobs & faders using Pointer Events (setPointerCapture)",
      "60fps HTML5 <canvas> AnalyserNode time/frequency oscilloscope",
      "Zustand Persist Middleware storing custom patch banks in localStorage",
    ],
    liveUrl: "https://02-spatial-sound-studio.vercel.app",
    githubUrl: "https://github.com/jobjab-dev/flagship-02-sound-studio",
    plateKey: "thumb-02",
  },
  {
    id: "infinite-idea-canvas",
    index: "03",
    slug: "03-infinite-idea-canvas",
    title: "FELD",
    headline: "03 FELD — Zero-Library CSS Matrix Infinite Spatial Canvas",
    shortLabel: "FELD · Matrix Canvas",
    stackLine: "VITE 8 · REACT 19 · CSS MATRIX · SVG BEZIER",
    category: "flagship",
    description:
      "Custom spatial thinking board and node editor featuring cursor-centered CSS Matrix zoom/pan, live SVG cubic Bezier routing, undo/redo history, and JSON serialization.",
    tags: ["Vite 8", "React 19", "TypeScript", "Tailwind v4", "CSS Matrix", "SVG"],
    mechanics: [
      "Hand-engineered cursor-centered pan/zoom via CSS transform matrix",
      "Resizable multi-type nodes (Notes, Checklists, Code Snippets)",
      "Real-time SVG cubic Bezier connections recalculated per frame",
      "Full Ctrl+Z / Ctrl+Y undo-redo stack & JSON workspace export/import",
    ],
    liveUrl: "https://03-infinite-idea-canvas.vercel.app",
    githubUrl: "https://github.com/jobjab-dev/flagship-03-idea-canvas",
    plateKey: "thumb-03",
  },
  {
    id: "telemetry-logistics-radar",
    index: "04",
    slug: "04-telemetry-logistics-radar",
    title: "VECTRA OPS",
    headline: "04 VECTRA OPS — 56-Unit High-Frequency Fleet & Radar Console",
    shortLabel: "VECTRA OPS · 56-Unit Radar",
    stackLine: "VITE 8 · REACT 19 · TANSTACK VIRTUAL · SVG RADAR",
    category: "flagship",
    description:
      "Autonomous fleet command surface streaming 8.3Hz polar coordinates across 56 vessels with interactive radar target lock and 6,000+ virtualized event rows.",
    tags: ["Vite 8", "React 19", "TypeScript", "Tailwind v4", "@tanstack/react-virtual"],
    mechanics: [
      "High-frequency telemetry stream tracking 56 active autonomous units",
      "Interactive polar radar plot with clickable target lock & inspector",
      "Virtualized log stream (>1,450–6,000 rows) powered by @tanstack/react-virtual",
      "Multi-facet severity/sector filtering & instant stream freeze/resume",
    ],
    liveUrl: "https://04-telemetry-logistics-radar.vercel.app",
    githubUrl: "https://github.com/jobjab-dev/flagship-04-telemetry-radar",
    plateKey: "thumb-04",
  },
  {
    id: "indie-zine-paywall",
    index: "05",
    slug: "05-indie-zine-paywall",
    title: "PRESS 09",
    headline: "05 PRESS 09 — Astro SSR Editorial Zine & Metered Paywall",
    shortLabel: "PRESS 09 · Astro SSR Zine",
    stackLine: "ASTRO 7 SSR · VIEW TRANSITIONS · REACT ISLANDS · VERCEL",
    category: "flagship",
    description:
      "Hybrid SSR editorial zine pairing Astro View Transitions with isolated React Islands for typography controls, quote clipping, and a metered cookie paywall.",
    tags: ["Astro 7", "@astrojs/vercel", "React Islands", "Tailwind v4", "SSR"],
    mechanics: [
      "Astro <ClientRouter /> View Transitions morphing covers & titles",
      "Isolated reading progress, typography & quote-clipper React Islands",
      "Cookie + localStorage metered paywall (2 free articles before unlock)",
      "Server-rendered unlock API endpoint (/api/unlock) on Vercel SSR",
    ],
    liveUrl: "https://05-indie-zine-paywall.vercel.app",
    githubUrl: "https://github.com/jobjab-dev/flagship-05-indie-zine",
    plateKey: "thumb-05",
  },
  {
    id: "kinetic-commerce",
    index: "06",
    slug: "06-kinetic-commerce",
    title: "ATELIER KINETA",
    headline: "06 ATELIER KINETA — Kinetic 3D Perspective Object Store",
    shortLabel: "ATELIER KINETA · 3D Commerce",
    stackLine: "NEXT.JS 16 · REACT 19 · FRAMER MOTION · URL STATE",
    category: "flagship",
    description:
      "Architectural object storefront with shared-element layoutId route morphing, scroll-linked parallax gallery header, 3D cursor tilt cards, and live checkout drawer.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Framer Motion"],
    mechanics: [
      "Shared-element layoutId card-to-detail transitions across routes",
      "Scroll-linked gallery hero using useScroll & useTransform",
      "3D perspective cursor tilt object studies & studio pricing",
      "URL-synced catalog filters & slide-over bag with /api/checkout receipt",
    ],
    liveUrl: "https://06-kinetic-commerce.vercel.app",
    githubUrl: "https://github.com/jobjab-dev/flagship-06-kinetic-commerce",
    plateKey: "thumb-06",
  },
];

export const quantBotProjects: QuantBotProject[] = [
  {
    id: "hyperliquid-mm-bot",
    index: "07",
    title: "Hyperliquid Trading Bot",
    venue: "Hyperliquid Perp DEX",
    strategy: "Liquidity Provider & Volume Mode",
    category: "quant",
    description:
      "Production Python market maker built on the official Hyperliquid SDK with asynchronous WebSocket order-book streams, paired quoting, and dynamic spread control.",
    tags: ["Python", "hyperliquid-python-sdk", "WebSockets", "aiohttp", "ujson", "eth-account"],
    capabilities: [
      "Paired bid/ask Liquidity Provider & dedicated Volume Mode execution",
      "Ultra-low-latency WebSockets orderbook streaming decoded via ujson",
      "Encrypted wallet management & cross-platform Linux/macOS/WSL installers",
    ],
    isPrivateRepo: true,
  },
  {
    id: "grvt-bot-v2",
    index: "08",
    title: "GRVT BotV2",
    venue: "GRVT Exchange",
    strategy: "Dual-Mode Pair MM & EMA Skew",
    category: "quant",
    description:
      "Dual-mode market-making engine for GRVT Exchange supporting classic order-pair quoting with EMA inventory skewing and multi-level volume generation.",
    tags: ["Python", "grvt-pysdk", "WebSockets", "Pandas", "NumPy", "cryptography"],
    capabilities: [
      "Dynamic EMA-based inventory skewing & automated spread recalculation",
      "Quantitative order sizing powered by Pandas/NumPy market series",
      "Rich terminal telemetry UI, cron scheduling & rate-throttled REST/WS",
    ],
    isPrivateRepo: true,
  },
  {
    id: "polymarket-mm-bot",
    index: "09",
    title: "Polymarket Market Making Bot",
    venue: "Polymarket CLOB",
    strategy: "Tick Quoting & Risk Manager",
    category: "quant",
    description:
      "Automated prediction-market quoting engine interacting directly with Polymarket's CLOB via py-clob-client, multi-market selectors, and WebSocket feeds.",
    tags: ["Python", "py-clob-client", "WebSockets", "web3.py", "Pandas", "Flask"],
    capabilities: [
      "Dual QuotingEngine & TickQuotingEngine with configurable market caps",
      "Live MarketMonitor, RiskManager guards & Flask monitoring endpoints",
      "CLI sandbox mode & hardware/time-limited license key provisioning",
    ],
    isPrivateRepo: true,
  },
  {
    id: "lighter-perp-bot",
    index: "10",
    title: "Lighter Perp Trading Bot",
    venue: "Lighter Perpetual DEX",
    strategy: "Multi-Channel WS Execution",
    category: "quant",
    description:
      "Multi-stream perpetual futures trading engine for Lighter DEX subscribing concurrently to order_book, account_orders, and account_all_trades channels.",
    tags: ["Python", "lighter-sdk", "WebSockets", "aiohttp-retry", "eth-account", "Binary Dist"],
    capabilities: [
      "Concurrent multi-channel WebSocket state sync with resilient backoff retry",
      "Compiled release distribution pipeline under dist/ for stable VPS uptime",
      "Built-in profit diagnostics & automated config snapshot recovery",
    ],
    isPrivateRepo: true,
  },
  {
    id: "aster-vega-bot",
    index: "11",
    title: "Aster Trading Bot (VEGA)",
    venue: "Aster DEX",
    strategy: "VEGA Algorithm & EMA Skew",
    category: "quant",
    description:
      "High-frequency market-making system implementing the custom VEGA (Volume Enhanced Growth Algorithm) strategy with strict schema validation and MQTT telemetry.",
    tags: ["Python", "WebSockets", "Pydantic", "asyncio-mqtt", "cryptography", "Market Making"],
    capabilities: [
      "VEGA high-turnover quoting loop paired with EMA inventory skewing",
      "Pydantic-validated strategy configs & isolated launcher orchestration",
      "Async MQTT telemetry publishing & integrated position risk limits",
    ],
    isPrivateRepo: true,
  },
  {
    id: "nado-volume-maker",
    index: "12",
    title: "Nado Volume Maker & Link Signer",
    venue: "Nado Exchange (Ink Chain)",
    strategy: "Multi-Level Ladder + EIP-712 Signer",
    category: "quant",
    description:
      "Perpetual market maker for Nado on Ink Chain pairing multi-level ladder execution with an open-source EIP-712 Ledger/Web3 linked-signer delegation interface.",
    tags: ["Python", "nado-protocol", "WebSockets", "coincurve", "EIP-712", "Ledger Signer"],
    capabilities: [
      "Multi-level orderbook ladder quoting & secp256k1 coincurve signing",
      "Dedicated EIP-712 hardware/MetaMask linked-signer delegation flow",
      "Companion live web app & public Nado-Link-Signer repository",
    ],
    isPrivateRepo: true,
    githubUrl: "https://github.com/jobjab-dev/Nado-Link-Signer",
    githubLabel: "Signer Repo",
    liveUrl: "https://nado-link-signer.vercel.app",
    liveLabel: "Open Link Signer",
  },
  {
    id: "apex-omni-bot",
    index: "13",
    title: "Apex Omni Volume Maker",
    venue: "Apex Omni Perp DEX",
    strategy: "6-Level Volatility Ladder",
    category: "quant",
    description:
      "High-frequency perpetual DEX bot featuring adaptive multi-timeframe volatility estimation, 6-level bilateral ladders, and emergency close/withdraw safeguards.",
    tags: ["Python", "apexomni", "web3.py", "ECDSA", "WebSockets", "Trailing Drawdown"],
    capabilities: [
      "Default 6-level per-side order ladder with dynamic volatility spread scaling",
      "Trailing drawdown circuit breaker & StarkEx L2 key derivation scripts",
      "Standalone emergency_close_withdraw failsafe CLI for capital safety",
    ],
    isPrivateRepo: true,
  },
  {
    id: "paradex-volume-maker",
    index: "14",
    title: "Paradex Volume Maker",
    venue: "Paradex (Starknet)",
    strategy: "Starknet Perp Quoting Engine",
    category: "quant",
    description:
      "Starknet ZK-rollup perpetual quoting bot bridging paradex-py, starknet-py, and Pandas/NumPy analytics inside an automated WSL/Linux deployment build.",
    tags: ["Python", "paradex-py", "starknet-py", "WebSockets", "Pandas", "NumPy"],
    capabilities: [
      "Dual Starknet + EVM key signing for Paradex L2 perpetual orderbooks",
      "Modular settings profiles & automated binary release packaging",
      "Continuous async WebSocket quote maintenance across perp markets",
    ],
    isPrivateRepo: true,
  },
  {
    id: "backpack-volume-bot",
    index: "15",
    title: "Backpack Volume Bot",
    venue: "Backpack Exchange",
    strategy: "6-Level Ed25519 Ladder MM",
    category: "quant",
    description:
      "High-throughput orderbook ladder market maker engineered for Backpack Exchange using PyNaCl Ed25519 request authentication and real-time market fetchers.",
    tags: ["Python", "PyNaCl (Ed25519)", "WebSockets", "aiohttp", "Rich TUI", "Market Making"],
    capabilities: [
      "GRVT V2-derived 6-level dynamic spacing order ladder architecture",
      "Sub-millisecond Ed25519 payload signing via PyNaCl & aiohttp pools",
      "Automated market metadata discovery & live Rich terminal telemetry",
    ],
    isPrivateRepo: true,
  },
  {
    id: "pacifica-volume-maker",
    index: "16",
    title: "Pacifica Volume Maker",
    venue: "Pacifica DEX (Solana)",
    strategy: "Multi-Asset 2–10+ Level Ladder",
    category: "quant",
    description:
      "Solana ecosystem multi-asset market maker built with native solders/Base58 keypairs supporting configurable 2–10+ price tiers and fast inventory turnover.",
    tags: ["Python", "Solana (solders)", "Base58", "WebSockets", "asyncio", "Market Making"],
    capabilities: [
      "Concurrent multi_asset_engine orchestrating multiple Solana markets",
      "Native solders & Base58 transaction signing with multi-account rotation",
      "Volatility-responsive spread calculation & inventory skew rebalancing",
    ],
    isPrivateRepo: true,
  },
  {
    id: "activelp-engine",
    index: "17",
    title: "ActiveLP Liquidity Engine",
    venue: "Uniswap V3 & PancakeSwap V3",
    strategy: "Rolling Tick-Volatility Rebalancer",
    category: "quant",
    description:
      "Automated concentrated liquidity engine managing AMM LP tick bounds across Uniswap V3 and PancakeSwap V3 using NumPy rolling tick-volatility windows.",
    tags: ["Python", "web3.py", "Uniswap V3", "PancakeSwap V3", "NumPy", "Active LP"],
    capabilities: [
      "Real-time tick history tracking & dynamic LP range width optimization",
      "On-chain position valuation, forced sweep & stuck-fund recovery tools",
      "Supports both Uniswap V3 and PancakeSwap V3 router/manager contracts",
    ],
    isPrivateRepo: true,
  },
];

export const platformProjects: PlatformProject[] = [
  {
    id: "jvault-base-l2",
    index: "18",
    title: "JVAULT",
    domain: "Base L2 Liquidity Vault",
    category: "platform",
    description:
      "Weekly-batch liquidity vault protocol built on Base L2 with an integrated monorepo spanning the production dApp interface, GitBook docs, and marketing site.",
    tags: ["Next.js", "TypeScript", "Base L2", "Monorepo", "DeFi Vault", "Framer Motion"],
    capabilities: [
      "Weekly-batch liquidity vault architecture targeting market-making yield on Base",
      "Three-surface monorepo unifying dApp, landing site & technical GitBook docs",
      "Public landing repository & dual live Vercel deployments",
    ],
    isPrivateRepo: true,
    githubUrl: "https://github.com/jobjab-dev/jobjab-vault-landing",
    githubLabel: "Landing Repo",
    liveUrl: "https://jobjab-vault-landing.vercel.app",
    liveLabel: "Launch Landing",
    secondaryLiveUrl: "https://jobjab-vault-docs.vercel.app",
    secondaryLiveLabel: "Read Docs",
  },
  {
    id: "poskub-sm-pos",
    index: "19",
    title: "POSkub & SM POS",
    domain: "Multi-Store Cloud & Offline POS",
    category: "platform",
    description:
      "Full-scale multi-branch Supermarket Cloud & Offline-first POS PWA supporting barcode/QR scanning, instant checkout, thermal receipts, and 17 interface languages.",
    tags: ["React", "TypeScript", "Supabase", "PWA", "QR & Barcode", "17 Languages"],
    capabilities: [
      "Offline-ready multi-store POS web app with html5-qrcode, jsbarcode & html2canvas",
      "Integrated @imgly/background-removal & Supabase multi-branch sync",
      "Live cloud POS application plus dedicated marketing site",
    ],
    isPrivateRepo: true,
    liveUrl: "https://poskub-landing.vercel.app",
    liveLabel: "Landing Site",
    secondaryLiveUrl: "https://suchada-three.vercel.app",
    secondaryLiveLabel: "Open POS App",
  },
  {
    id: "poskub-pay",
    index: "20",
    title: "Poskub Pay (paykub)",
    domain: "0%-Fee Crypto Payment Gateway",
    category: "platform",
    description:
      "Non-custodial 0%-fee multi-chain cryptocurrency payment gateway with tiered exchange spread, prepaid merchant credits, countertop POS, and embeddable checkout widget.",
    tags: ["React", "TypeScript", "Supabase", "Embed Widget", "Multi-Chain Crypto", "POS Terminal"],
    capabilities: [
      "Drop-in embeddable modal widget (/embed.js) & hosted QR checkout flows",
      "Database-driven Dynamic Chain & Token Admin API via Supabase SQL",
      "Open-source public repository under jobjab-dev/paykub",
    ],
    isPrivateRepo: false,
    githubUrl: "https://github.com/jobjab-dev/paykub",
    githubLabel: "GitHub",
  },
  {
    id: "fastcaption-saas",
    index: "21",
    title: "FastCaption",
    domain: "AI Video Subtitle SaaS",
    category: "platform",
    description:
      "Browser-first AI video captioning platform uniting client-side FFmpeg WASM rendering, Google Gemini transcription, Prisma/Postgres, and dual Stripe/NOWPayments billing.",
    tags: ["Next.js", "FFmpeg WASM", "Gemini AI", "Prisma", "Supabase", "Stripe & NOWPayments"],
    capabilities: [
      "In-browser video processing with @ffmpeg/ffmpeg & @flycut/caption-react",
      "Multilingual segmentation (budoux) & Gemini (@google/genai) captioning",
      "Dual subscription & crypto billing via Stripe and NOWPayments",
    ],
    isPrivateRepo: false,
    githubUrl: "https://github.com/jobjab-dev/fastcaption-app",
    githubLabel: "GitHub",
    liveUrl: "https://fastcaption-app.vercel.app",
    liveLabel: "Launch Live",
  },
  {
    id: "nudrub-marketplace",
    index: "22",
    title: "Nudrub Marketplace",
    domain: "AI Secondhand Marketplace",
    category: "platform",
    description:
      "Thailand secondhand marketplace monorepo powered by Supabase Auth/OTP identity verification, structured product filtering, and Gemini AI conversational search.",
    tags: ["TypeScript", "Monorepo", "Supabase", "Gemini AI", "OTP Verification"],
    capabilities: [
      "Workspace monorepo sharing types, packages & Supabase schema migrations",
      "Gemini AI smart search assistant & multi-attribute marketplace filters",
      "Verified OTP seller/buyer safety workflows live in production",
    ],
    isPrivateRepo: true,
    liveUrl: "https://nudrub.vercel.app",
    liveLabel: "Launch Live",
  },
  {
    id: "bond-limit-orders",
    index: "23",
    title: "BOND Limit Orders",
    domain: "Monad Limit Order Protocol",
    category: "platform",
    description:
      "Full-stack decentralized limit-order exchange protocol engineered for Monad Testnet inside a 4-surface monorepo (Trading dApp, Landing, Docs & Backend).",
    tags: ["Next.js", "TypeScript", "Wagmi v2", "Uniswap V3 SDK", "Monad", "Monorepo"],
    capabilities: [
      "Limit order pair routing backed by Uniswap V3 SDK & TanStack Query",
      "WalletConnect Web3Modal + SIWE authentication & Wagmi/Viem hooks",
      "Complete monorepo architecture (app :3000, landing :3001, docs, backend)",
    ],
    isPrivateRepo: true,
    liveUrl: "https://bond-black.vercel.app",
    liveLabel: "Launch Live",
  },
  {
    id: "paopay-pwa",
    index: "24",
    title: "PaoPay",
    domain: "Cashback & Top-Up PWA",
    category: "platform",
    description:
      "Mobile-first digital top-up, game credit, and utility bill payment PWA featuring Supabase Postgres Row-Level Security, Realtime balance sync, and QR payments.",
    tags: ["Next.js 16", "TypeScript", "Supabase RLS", "Realtime", "Zod", "PWA"],
    capabilities: [
      "Next.js 16 App Router with Cache Components, Turbopack & server-only guards",
      "Strict Supabase RLS policies, Realtime order ledger & Zod schema validation",
      "Dynamic QR generation & mobile PWA shell for instant top-up workflows",
    ],
    isPrivateRepo: true,
  },
  {
    id: "tiktok-ai-pipeline",
    index: "25",
    title: "TikTok AI Content Pipeline",
    domain: "Automated Short-Video Studio",
    category: "platform",
    description:
      "End-to-end Python short-video factory automating AI scriptwriting, Whisper speech-to-.ASS styled subtitle rendering, and Gemini generative scene synthesis.",
    tags: ["Python", "Whisper AI", ".ASS Subtitles", "Gemini AI", "Video Generation"],
    capabilities: [
      "Whisper UI converting recorded voiceovers into styled .ASS subtitle tracks",
      "Prompt & script generation workflows tuned for vertical short-form retention",
      "Modular Gemini scene_gen & video_gen batch composition pipeline",
    ],
    isPrivateRepo: true,
  },
  {
    id: "tryon-system-api",
    index: "26",
    title: "TryOn System",
    domain: "AI Virtual Try-On Backend",
    category: "platform",
    description:
      "Production backend service for AI garment virtual try-on managing 90-day JWT auth, Google Cloud Storage signed URL uploads, Stripe billing, and Prisma/MySQL ledgers.",
    tags: ["TypeScript", "Express", "Prisma", "MySQL", "Google Cloud Storage", "Stripe"],
    capabilities: [
      "Direct-to-GCS signed URL media uploads paired with Helmet/JWT security",
      "Metered per-try usage accounting with first-try free credit orchestration",
      "Prisma MySQL schema modeling user jobs, credits & try-on history",
    ],
    isPrivateRepo: true,
  },
  {
    id: "dukira-trellis-3d",
    index: "27",
    title: "Dukira Trellis 3D API",
    domain: "GPU Image-to-3D Pipeline",
    category: "platform",
    description:
      "GPU-accelerated FastAPI microservice running Microsoft Trellis under PyTorch CUDA to reconstruct 2D product photography into downloadable .glb 3D models.",
    tags: ["Python", "PyTorch CUDA", "FastAPI", "Trellis 3D", "Docker", "GCS"],
    capabilities: [
      "CUDA 12.1 PyTorch & OpenCV inference container packaged via Dockerfile",
      "Automated GCS bucket ingestion, 3D mesh reconstruction & .zip packaging",
      "Production Nginx + Uvicorn deployment scripts for GPU cloud hosts",
    ],
    isPrivateRepo: true,
  },
];

export const web3Projects: Web3Project[] = [
  {
    id: "fhevm-react-template",
    index: "28",
    title: "fhevm-react-template",
    shortTitle: "fhevm-react-template · Zama $5k Winner",
    category: "web3",
    highlight: "1st Place ($5,000) — Zama Monthly Bounty",
    description:
      "Universal SDK and starter template for building encrypted frontend dApps with Zama's FHEVM and Hardhat.",
    tags: ["FHEVM (Zama)", "Next.js", "React", "Solidity", "Hardhat", "Tailwind CSS"],
    features: ["Pre-configured Hardhat FHEVM setup", "React hooks for encrypted inputs", "Confidential contract wrappers"],
    liveUrl: "https://jobjab-fhevm-react-template-nextjs.vercel.app/",
    githubUrl: "https://github.com/jobjab-dev/fhevm-react-template",
  },
  {
    id: "zipher-launch",
    index: "29",
    title: "ZipherLaunch",
    shortTitle: "ZipherLaunch",
    category: "web3",
    description:
      "Confidential Token Launchpad & Private Sealed-Bid Dutch Auctions powered by Fully Homomorphic Encryption for fair price discovery.",
    tags: ["FHEVM (Zama)", "Next.js", "Solidity", "Dutch Auction", "Private Bidding"],
    features: ["Sealed encrypted bids", "Zero front-running price discovery", "Automated FHE clearing"],
    liveUrl: "https://zipher-launch.vercel.app/",
    githubUrl: "https://github.com/jobjab-dev/ZipherLaunch",
  },
  {
    id: "monad-world",
    index: "30",
    title: "Monad World",
    shortTitle: "Monad World",
    category: "web3",
    description:
      "Web3 Idle-Game on Monad Testnet featuring Lilnad NFTs as Soul-Bound Tokens (SBTs) with staking and live leaderboards.",
    tags: ["Next.js", "TypeScript", "Solidity", "Prisma", "PostgreSQL", "Monad", "SBT/NFT"],
    features: ["Soul-Bound NFT minting", "Idle game staking loops", "Persistent Prisma leaderboard"],
    liveUrl: "https://www.monadworld.xyz/",
    githubUrl: "https://github.com/jobjab-dev/MonadWorld",
  },
  {
    id: "zadiction",
    index: "31",
    title: "Zadiction",
    shortTitle: "Zadiction",
    category: "web3",
    description:
      "Transparent, linear-capped lottery AMM with dynamic odds and privacy-preserving on-chain RNG powered by Zama FHEVM.",
    tags: ["Solidity", "FHEVM (Zama)", "TypeScript", "ethers.js", "Next.js"],
    features: ["Encrypted on-chain RNG", "Dynamic odds AMM", "Private wager settlement"],
    liveUrl: "https://zadiction-nextjs.vercel.app/",
    githubUrl: "https://github.com/jobjab-dev/Zadiction",
  },
  {
    id: "paylink",
    index: "32",
    title: "Paylink",
    shortTitle: "Paylink",
    category: "web3",
    description:
      "Complete Web3 payment ecosystem built on Morph Layer 2 enabling instant QR code payments with gasless account-abstraction transactions.",
    tags: ["Next.js", "TypeScript", "Solidity", "Morph L2", "Gasless AA"],
    features: ["QR code checkout flow", "Account Abstraction gasless relays", "Merchant settlement ledger"],
    liveUrl: "https://paylink-psi.vercel.app/",
    githubUrl: "https://github.com/jobjab-dev/PayLink",
  },
  {
    id: "private-vote",
    index: "33",
    title: "Private Vote",
    shortTitle: "Private Vote",
    category: "web3",
    description:
      "Confidential voting dApp using Zama FHE so ballots are tallied homomorphically on-chain without decrypting individual choices.",
    tags: ["Next.js", "TypeScript", "Solidity", "Hardhat", "FHEVM (Zama)", "Sepolia"],
    features: ["Encrypted ballot casting", "Homomorphic vote tallying", "Zero voter exposure"],
    liveUrl: "https://private-vote-fhevm-app.vercel.app/",
    githubUrl: "https://github.com/jobjab-dev/Private-Vote-FHEVM",
  },
  {
    id: "fhevm-example-hub",
    index: "34",
    title: "FHEVM Example Hub",
    shortTitle: "FHEVM Example Hub",
    category: "web3",
    description:
      "CLI tool and interactive web directory for scaffolding audited FHEVM smart contract patterns across confidential voting and private auctions.",
    tags: ["FHEVM (Zama)", "CLI", "TypeScript", "Solidity", "Hardhat", "Developer Tools"],
    features: ["Interactive CLI generator", "Ready-to-deploy FHE contracts", "Live pattern documentation"],
    liveUrl: "https://fhevm-example-hub-rho.vercel.app/",
    githubUrl: "https://github.com/jobjab-dev/fhevm-example-hub",
  },
  {
    id: "zameme-fun",
    index: "35",
    title: "Zameme.fun",
    shortTitle: "Zameme.fun",
    category: "web3",
    description:
      "Privacy-first meme token fair-launch platform leveraging Zama FHE to keep balances encrypted and eliminate sniper front-running.",
    tags: ["FHEVM (Zama)", "Solidity", "Next.js", "Bonding Curve", "Fair Launch"],
    features: ["Bonding curve price engine", "Encrypted holder balances", "Anti-sniper launch guard"],
    liveUrl: "https://zameme-fun.vercel.app/",
    githubUrl: "https://github.com/jobjab-dev/Zameme",
  },
  {
    id: "hello-fhevm-tutorial",
    index: "36",
    title: "hello-fhevm-tutorial",
    shortTitle: "hello-fhevm-tutorial",
    category: "web3",
    description:
      "Beginner-friendly interactive walkthrough teaching confidential smart contract architecture and client encryption flows with FHEVM.",
    tags: ["React", "Vite", "FHEVM (Zama)", "Solidity", "Hardhat"],
    features: ["Interactive code sandbox", "Step-by-step encrypted flow", "Live contract examples"],
    liveUrl: "https://hello-fhevm-tutorial.vercel.app/",
    githubUrl: "https://github.com/jobjab-dev/hello-fhevm-tutorial",
  },
  {
    id: "click-on-chain",
    index: "37",
    title: "Click on chain",
    shortTitle: "Click on chain",
    category: "web3",
    description:
      "High-frequency decentralized social click experiment deployed on Tea Sepolia Testnet testing ultra-low-latency EVM interaction.",
    tags: ["React", "Solidity", "ethers.js", "Tea Sepolia"],
    features: ["Global on-chain counter", "Real-time EVM event sync", "Gas-optimized contract"],
    liveUrl: "https://www.clickonchain.xyz/",
    githubUrl: "https://github.com/jobjab-dev/Clickonchain.xyz",
  },
];

export const allProjects: UnifiedProject[] = [
  ...flagshipProjects,
  ...quantBotProjects,
  ...platformProjects,
  ...web3Projects,
];

export const techMatrix = [
  {
    code: "01",
    group: "Frontend & Full-Stack Systems",
    summary: "App Router architectures, hybrid SSR islands, offline-ready PWAs, optimistic UI, and responsive design systems.",
    items: [
      "Next.js 16 (App Router)",
      "React 19 (useOptimistic)",
      "Astro 7 SSR & Islands",
      "Vite 8",
      "TypeScript",
      "Tailwind CSS v4",
      "Supabase RLS & Realtime",
      "Prisma, Postgres & MySQL",
    ],
  },
  {
    code: "02",
    group: "Quant Trading & Interactive Engines",
    summary: "Low-latency Python Perp DEX market makers, multi-level ladder bots, plus zero-dependency audio & canvas runtimes.",
    items: [
      "Python AsyncIO & WebSockets",
      "Hyperliquid / GRVT / Nado SDKs",
      "Polymarket CLOB & py-clob-client",
      "NumPy, Pandas & EMA Skew",
      "Native Web Audio API",
      "CSS Matrix & SVG Bezier",
      "@tanstack/react-virtual",
      "Server-Sent Events (SSE)",
    ],
  },
  {
    code: "03",
    group: "Confidential Web3, DeFi & L2",
    summary: "Encrypted FHEVM computation, Starknet/Solana/Base L2 execution, concentrated liquidity bots, and non-custodial rails.",
    items: [
      "Zama FHEVM & Solidity",
      "Hardhat & Foundry",
      "Starknet (starknet-py)",
      "Solana (solders / Ed25519)",
      "Base L2, Monad & Morph L2",
      "Uniswap V3 / Active LP",
      "Wagmi v2, Viem & ethers.js",
      "EIP-712 & Account Abstraction",
    ],
  },
  {
    code: "04",
    group: "AI Media, GPU & Production Ops",
    summary: "Multimodal AI SaaS pipelines, GPU 3D reconstruction, browser WASM media, payments, and end-to-end Playwright QA.",
    items: [
      "Google Gemini API (@google/genai)",
      "PyTorch CUDA & FastAPI (Trellis 3D)",
      "FFmpeg WASM & Whisper AI",
      "Stripe & NOWPayments Crypto",
      "Google Cloud Storage & Docker",
      "Playwright QA",
      "GitHub Actions & Release Dist",
      "Vercel Production",
    ],
  },
];

export const awardsData = [
  {
    id: "zama-bounty-2025",
    index: "AWD-01",
    title: "Zama Monthly Bounty Winner",
    placement: "1st Place — $5,000 Prize",
    date: "October 2025",
    projectTitle: "fhevm-react-template",
    demoUrl: "https://jobjab-fhevm-react-template-nextjs.vercel.app/",
    githubUrl: "https://github.com/jobjab-dev/fhevm-react-template",
    description:
      "Awarded 1st Place ($5,000 bounty) in Zama's Monthly Developer Track for architecting fhevm-react-template—a full-stack React + Hardhat SDK enabling confidential on-chain operations with zero boilerplate.",
    highlights: [
      "Universal React hooks abstracting client-side FHE input encryption and decryption",
      "Drop-in Hardhat deployment pipeline with sample confidential smart contracts",
      "Adopted as a rapid starter kit for privacy-preserving EVM builders",
    ],
  },
];

export const contactChannels = [
  {
    id: "email",
    label: "Direct Email",
    value: "peejabh@gmail.com",
    href: "mailto:peejabh@gmail.com",
    note: "Best channel for product engineering roles, quant/DEX bot architecture, SaaS systems, or FHEVM advisory.",
  },
  {
    id: "github",
    label: "GitHub",
    value: "@jobjab-dev",
    href: "https://github.com/jobjab-dev",
    note: "55+ repositories across interactive frontend runtimes, Perp DEX trading bots, SaaS platforms, and Web3/FHEVM builds.",
  },
  {
    id: "twitter",
    label: "X / Twitter",
    value: "@jobjab_eth",
    href: "https://x.com/jobjab_eth",
    note: "Build logs, interactive prototypes, trading infrastructure notes, and FHEVM research updates.",
  },
  {
    id: "telegram",
    label: "Telegram",
    value: "@jobjab123",
    href: "https://t.me/jobjab123",
    note: "Fast async technical sync for founders, trading teams, and private repo demos.",
  },
];

export const portfolioData = {
  owner: "Jobjab",
  handle: "jobjab-dev",
  role: "Creative Technologist & Design Engineer",
  bio: "Creative Technologist & Design Engineer shipping 37 production systems across four disciplines: tactile browser runtimes (Next.js 16, React 19, Astro 7 SSR, Web Audio DSP, CSS Matrix Canvas), Python algorithmic Perp DEX trading bots (Hyperliquid, GRVT, Polymarket, Paradex, Backpack), full-stack SaaS & AI platforms (JVAULT, POSkub, FastCaption, Nudrub, BOND), and Zama FHEVM Web3 protocols.",
  stats: {
    totalShipped: "37 Production Systems (6 Flagship UI + 11 Quant Bots + 10 SaaS/AI + 10 Web3/FHEVM)",
    awardsWon: "1st Place ($5,000 Prize) — Zama Monthly Bounty Winner (Oct 2025)",
    experience: "Senior Creative Technologist, Quant Systems & Full-Stack Blockchain Engineer",
  },
  techMatrix,
  flagshipProjects,
  quantBotProjects,
  platformProjects,
  web3Projects,
  awards: awardsData,
  contact: {
    email: "peejabh@gmail.com",
    github: "https://github.com/jobjab-dev",
    twitter: "https://x.com/jobjab_eth",
    telegram: "https://t.me/jobjab123",
  },
};
