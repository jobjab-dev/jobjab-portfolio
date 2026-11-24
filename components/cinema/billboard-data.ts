import {
  awardsData,
  flagshipProjects,
  platformProjects,
  quantBotProjects,
} from "@/lib/portfolio-data";

export type BillboardKind = "arch" | "flagship" | "quant" | "saas" | "zama" | "studio";

export interface BillboardSpec {
  id: string;
  sceneIdx: number;
  index: string;
  channel: string;
  jpTag: string;
  title: string;
  subtitle: string;
  accent: "amber" | "cerulean";
  kind: BillboardKind;
  position: [number, number, number];
  rotationY: number;
  width: number;
  height: number;
  plateKey?: "lead-preview" | "thumb-02" | "thumb-03" | "thumb-04" | "thumb-05" | "thumb-06";
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  isPrivateRepo?: boolean;
  targetRoute?: string;
}

const QUANT_PICK = [
  quantBotProjects[0], // 07 Hyperliquid
  quantBotProjects[1], // 08 GRVT V2
  quantBotProjects[2], // 09 Polymarket
  quantBotProjects[7], // 14 Paradex
  quantBotProjects[8], // 15 Backpack
  quantBotProjects[10], // 17 ActiveLP
];

const SAAS_PICK = [
  platformProjects[0], // 18 JVAULT
  platformProjects[1], // 19 POSkub
  platformProjects[9], // 27 Dukira Trellis 3D
  platformProjects[3], // 21 FastCaption
];

const award = awardsData[0];

export const ANIME_BILLBOARDS: BillboardSpec[] = [
  {
    id: "gate-intro",
    sceneIdx: 0,
    index: "00",
    channel: "CH-01",
    jpTag: "創 · STUDIO",
    title: "JOBJAB STUDIO",
    subtitle: "37 PRODUCTION SYSTEMS · DESIGN & SYSTEMS",
    accent: "amber",
    kind: "arch",
    position: [0, 6.2, -9.3],
    rotationY: 0,
    width: 8.8,
    height: 2.35,
    description:
      "Creative Technologist & Design Engineer shipping 37 live production systems across interactive browser runtimes, 11 Python Perp DEX trading bots, 10 commercial SaaS/AI platforms, and Zama FHEVM Web3 protocols.",
    tags: ["Next.js 16", "Three.js", "Python Quant", "Zama FHEVM", "37 Systems"],
    targetRoute: "/about",
  },
  ...flagshipProjects.map((proj, idx): BillboardSpec => {
    const side = idx % 2 === 0 ? -1 : 1;
    return {
      id: proj.id,
      sceneIdx: 1,
      index: proj.index,
      channel: `CH-0${idx + 2}`,
      jpTag: "作品 · FLAGSHIP",
      title: proj.title,
      subtitle: proj.shortLabel.split("·")[1]?.trim().toUpperCase() || "FLAGSHIP RUNTIME",
      accent: "amber",
      kind: "flagship",
      position: [side * 6.4, 2.85, -54 - idx * 8.0],
      rotationY: side > 0 ? -0.44 : 0.44,
      width: 5.6,
      height: 4.5,
      plateKey: proj.plateKey,
      description: proj.description,
      tags: proj.tags,
      liveUrl: proj.liveUrl,
      githubUrl: proj.githubUrl,
    };
  }),
  ...QUANT_PICK.map((bot, idx): BillboardSpec => {
    const side = idx % 2 === 0 ? -1 : 1;
    return {
      id: bot.id,
      sceneIdx: 2,
      index: bot.index,
      channel: `CH-${String(idx + 8).padStart(2, "0")}`,
      jpTag: "自動取引 · QUANT",
      title: bot.title.toUpperCase(),
      subtitle: `${bot.venue} · ${bot.strategy}`.toUpperCase(),
      accent: side < 0 ? "amber" : "cerulean",
      kind: "quant",
      position: [side * 6.5, 5.2, -106 - idx * 6.4],
      rotationY: side > 0 ? -0.35 : 0.35,
      width: 4.5,
      height: 2.0,
      description: bot.description,
      tags: bot.tags,
      isPrivateRepo: bot.isPrivateRepo,
      liveUrl: bot.liveUrl,
      githubUrl: bot.githubUrl,
      targetRoute: "/projects",
    };
  }),
  ...SAAS_PICK.map((plat, idx): BillboardSpec => {
    const side = idx % 2 === 0 ? -1 : 1;
    return {
      id: plat.id,
      sceneIdx: 3,
      index: plat.index,
      channel: `CH-${idx + 14}`,
      jpTag: "基盤 · SAAS & AI",
      title: plat.title.toUpperCase(),
      subtitle: plat.domain.toUpperCase(),
      accent: "cerulean",
      kind: "saas",
      position: [side * 5.0, 1.55, -150 - idx * 9.5],
      rotationY: side > 0 ? -0.45 : 0.45,
      width: 4.2,
      height: 1.75,
      description: plat.description,
      tags: plat.tags,
      isPrivateRepo: plat.isPrivateRepo,
      liveUrl: plat.liveUrl,
      githubUrl: plat.githubUrl,
      targetRoute: "/projects",
    };
  }),
  {
    id: award.id,
    sceneIdx: 4,
    index: "28",
    channel: "CH-18",
    jpTag: "受賞 · ZAMA FHEVM",
    title: "ZAMA $5,000 BOUNTY",
    subtitle: "1ST PLACE · FHEVM-REACT-TEMPLATE",
    accent: "amber",
    kind: "zama",
    position: [0, 10.6, -212],
    rotationY: 0,
    width: 7.4,
    height: 2.4,
    description: award.description,
    tags: ["FHEVM", "Solidity", "Hardhat", "React Hooks", "Zama Winner"],
    liveUrl: award.demoUrl,
    githubUrl: award.githubUrl,
  },
  {
    id: "studio-archive",
    sceneIdx: 5,
    index: "37",
    channel: "CH-19",
    jpTag: "工房 · STUDIO",
    title: "ARCHIVE READY · 37 BUILDS",
    subtitle: "FILTER FULL INDEX & TECH MATRIX",
    accent: "amber",
    kind: "studio",
    position: [3.3, 2.15, -248.1],
    rotationY: -0.3,
    width: 2.5,
    height: 1.35,
    description:
      "Full production proofing index covering all 6 interactive Flagship runtimes, 11 Python Perp DEX trading bots, 10 SaaS/AI systems, and 10 Web3 FHEVM protocols.",
    tags: ["All 37 Builds", "Searchable Index", "Live Demos", "GitHub"],
    targetRoute: "/projects",
  },
];
