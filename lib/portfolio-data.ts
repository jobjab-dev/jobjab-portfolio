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

export type UnifiedProject = (FlagshipProject | Web3Project) & {
  category: "flagship" | "web3";
};

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

export const web3Projects: Web3Project[] = [
  {
    id: "fhevm-react-template",
    index: "07",
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
    index: "08",
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
    index: "09",
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
    index: "10",
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
    index: "11",
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
    index: "12",
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
    index: "13",
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
    index: "14",
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
    index: "15",
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
    index: "16",
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

export const allProjects: UnifiedProject[] = [...flagshipProjects, ...web3Projects];

export const techMatrix = [
  {
    code: "01",
    group: "Frontend & Full-Stack Systems",
    summary: "App Router architectures, hybrid SSR islands, optimistic state machines, and responsive layout engineering.",
    items: ["Next.js 16 (App Router)", "React 19 (useOptimistic)", "Astro 7 SSR & Islands", "Vite 8", "TypeScript", "Tailwind CSS v4", "Zustand", "Prisma & PostgreSQL"],
  },
  {
    code: "02",
    group: "Interactive Engines & Media",
    summary: "Zero-dependency canvas math, Web Audio synthesis, virtualized streams, and choreographed UI transitions.",
    items: ["Native Web Audio API", "CSS Matrix 2D Viewport", "SVG Cubic Bezier Routing", "@tanstack/react-virtual", "Framer Motion", "HTML5 Canvas 60fps", "Server-Sent Events (SSE)", "Pointer Capture Hardware Controls"],
  },
  {
    code: "03",
    group: "Confidential Web3 & FHEVM",
    summary: "Encrypted on-chain computation, sealed-bid auctions, gasless Layer-2 payments, and full EVM contract stacks.",
    items: ["Zama FHEVM", "Solidity", "Hardhat & Foundry", "ethers.js & Viem", "Wagmi", "Monad Testnet", "Morph L2 & Account Abstraction", "Zero Knowledge & FHE"],
  },
  {
    code: "04",
    group: "Tooling, AI & Shipping",
    summary: "Production CLI tooling, Gemini model integrations, Playwright visual regression QA, and edge deployment.",
    items: ["Node.js", "Google Gemini API", "Playwright QA", "Git & GitHub CLI", "Vercel Production", "REST / Route Handlers", "CLI Scaffoling", "Design Systems"],
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
    note: "Best channel for product engineering roles, studio collaborations, or confidential FHEVM advisory.",
  },
  {
    id: "github",
    label: "GitHub",
    value: "@jobjab-dev",
    href: "https://github.com/jobjab-dev",
    note: "Source repositories across all 16 live Flagship Full-Stack and Web3/FHEVM builds.",
  },
  {
    id: "twitter",
    label: "X / Twitter",
    value: "@jobjab_eth",
    href: "https://x.com/jobjab_eth",
    note: "Build logs, interactive prototypes, and FHEVM research updates.",
  },
  {
    id: "telegram",
    label: "Telegram",
    value: "@jobjab123",
    href: "https://t.me/jobjab123",
    note: "Fast async technical sync for founders and protocol teams.",
  },
];

export const portfolioData = {
  owner: "Jobjab",
  handle: "jobjab-dev",
  role: "Creative Technologist & Design Engineer",
  bio: "Creative Technologist & Design Engineer shipping high-craft interactive frontend systems (Next.js 16, React 19, Astro 7 SSR, Web Audio DSP, hand-built Matrix Canvas, virtualized telemetry) alongside privacy-preserving Web3 protocols powered by Zama FHEVM, Monad, and Morph L2.",
  stats: {
    totalShipped: "16 Live Projects (6 Flagship Interactive + 10 Web3 / FHEVM)",
    awardsWon: "1st Place ($5,000 Prize) — Zama Monthly Bounty Winner (Oct 2025)",
    experience: "Senior Creative Technologist & Full-Stack Blockchain Engineer",
  },
  techMatrix,
  flagshipProjects,
  web3Projects,
  awards: awardsData,
  contact: {
    email: "peejabh@gmail.com",
    github: "https://github.com/jobjab-dev",
    twitter: "https://x.com/jobjab_eth",
    telegram: "https://t.me/jobjab123",
  },
};
