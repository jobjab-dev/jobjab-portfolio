"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { type MotionValue } from "framer-motion";
import { ANIME_BILLBOARDS, type BillboardSpec } from "@/components/cinema/billboard-data";

import leadPreviewImg from "@/assets/plates/lead-preview.png";
import thumb02Img from "@/assets/plates/thumb-02.png";
import thumb03Img from "@/assets/plates/thumb-03.png";
import thumb04Img from "@/assets/plates/thumb-04.png";
import thumb05Img from "@/assets/plates/thumb-05.png";
import thumb06Img from "@/assets/plates/thumb-06.png";

const PLATE_SRCS: Record<string, string> = {
  "lead-preview": leadPreviewImg.src,
  "thumb-02": thumb02Img.src,
  "thumb-03": thumb03Img.src,
  "thumb-04": thumb04Img.src,
  "thumb-05": thumb05Img.src,
  "thumb-06": thumb06Img.src,
};

interface Jobjab3DWorldProps {
  progress: MotionValue<number>;
  manualSceneIdx: number | null;
  focusedBillboardId: string | null;
  onHoverBillboard: (spec: BillboardSpec | null) => void;
  onSelectBillboard: (spec: BillboardSpec | null) => void;
  reducedMotion: boolean;
  onWebGLReady?: (ready: boolean) => void;
}

const SKY_VERTEX_SHADER = `
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const SKY_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uProgress;
  varying vec3 vWorldPos;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.04;
      a *= 0.5;
    }
    return v;
  }

  float shootingStar(vec2 uv, vec2 start, vec2 vel, float tFrac) {
    vec2 head = start + vel * tFrac;
    vec2 pa = uv - head;
    vec2 dir = normalize(-vel);
    float proj = clamp(dot(pa, dir), 0.0, 0.16);
    float d = length(pa - dir * proj);
    float fade = (1.0 - proj / 0.16) * smoothstep(0.0, 0.12, tFrac) * smoothstep(1.0, 0.65, tFrac);
    return smoothstep(0.0055, 0.0, d) * fade;
  }

  void main() {
    vec3 dir = normalize(vWorldPos);
    float h = clamp(dir.y, 0.0, 1.0);

    float wGolden = smoothstep(0.16, 0.42, uProgress);
    float wBlue = smoothstep(0.42, 0.64, uProgress);
    float wNight = smoothstep(0.64, 0.84, uProgress);

    // Makoto Shinkai Morning: vivid cerulean-turquoise zenith -> luminous apricot-sakura horizon
    vec3 z0 = vec3(0.07, 0.44, 0.88);
    vec3 m0 = vec3(0.24, 0.68, 0.94);
    vec3 h0 = vec3(0.98, 0.78, 0.64);

    // Kataware-doki Sunset: royal indigo-violet -> orchid magenta -> fiery coral-tangerine
    vec3 z1 = vec3(0.15, 0.12, 0.44);
    vec3 m1 = vec3(0.68, 0.24, 0.56);
    vec3 h1 = vec3(1.00, 0.46, 0.20);

    // Cyber Blue Hour: electric cobalt -> orchid twilight -> neon cyan-coral horizon rim
    vec3 z2 = vec3(0.04, 0.08, 0.30);
    vec3 m2 = vec3(0.20, 0.18, 0.54);
    vec3 h2 = vec3(0.28, 0.44, 0.78);

    // Starlit Midnight: deep cosmic navy + indigo neon horizon rim
    vec3 z3 = vec3(0.015, 0.025, 0.09);
    vec3 m3 = vec3(0.04, 0.06, 0.18);
    vec3 h3 = vec3(0.09, 0.13, 0.30);

    vec3 zenith = mix(mix(mix(z0, z1, wGolden), z2, wBlue), z3, wNight);
    vec3 midSky = mix(mix(mix(m0, m1, wGolden), m2, wBlue), m3, wNight);
    vec3 horizon = mix(mix(mix(h0, h1, wGolden), h2, wBlue), h3, wNight);

    vec3 lowMix = mix(horizon, midSky, smoothstep(0.0, 0.24, h));
    vec3 sky = mix(lowMix, zenith, pow(clamp((h - 0.10) * 1.15, 0.0, 1.0), 0.72));

    // Sun position & radiant anime horizon halo
    vec3 sunDir = normalize(mix(vec3(0.20, 0.42, -0.88), vec3(-0.14, 0.18, -0.97), wGolden));
    float sunDot = max(dot(dir, sunDir), 0.0);
    float daySunsetStrength = 1.0 - wBlue * 0.85;
    float sunDisc = smoothstep(0.9965, 0.9992, sunDot) * daySunsetStrength;
    float sunGlow = (pow(sunDot, 10.0) * 0.48 + pow(sunDot, 64.0) * 0.72) * daySunsetStrength;
    vec3 sunCol = mix(vec3(1.0, 0.86, 0.62), vec3(1.0, 0.52, 0.26), wGolden);
    sky += sunCol * (sunGlow + sunDisc * 1.1);

    // Painted Makoto Shinkai luminous cumulus cloud billows with silver-gold rim lighting
    if (dir.y > 0.015) {
      vec2 cloudUv = dir.xz / (dir.y + 0.24) * 1.35 + vec2(uTime * 0.007, -uProgress * 0.65);
      float n1 = fbm(cloudUv);
      float n2 = fbm(cloudUv * 2.1 + vec2(3.7, 1.9));
      float cloudShape = mix(n1, n2, 0.35);
      float cloudMask = smoothstep(0.46, 0.72, cloudShape) * smoothstep(0.015, 0.20, dir.y) * smoothstep(0.94, 0.28, dir.y);
      float edgeGlow = smoothstep(0.45, 0.56, cloudShape) * (1.0 - smoothstep(0.56, 0.74, cloudShape));

      vec3 cMorning = vec3(0.99, 0.96, 0.93);
      vec3 cGolden = vec3(1.00, 0.76, 0.58);
      vec3 cBlue = vec3(0.42, 0.50, 0.82);
      vec3 cNight = vec3(0.12, 0.17, 0.32);

      vec3 cRimMorning = vec3(1.00, 0.88, 0.72);
      vec3 cRimGolden = vec3(1.00, 0.54, 0.38);
      vec3 cRimBlue = vec3(0.84, 0.48, 0.92);
      vec3 cRimNight = vec3(0.32, 0.72, 0.96);

      vec3 cloudCol = mix(mix(mix(cMorning, cGolden, wGolden), cBlue, wBlue), cNight, wNight);
      vec3 rimCol = mix(mix(mix(cRimMorning, cRimGolden, wGolden), cRimBlue, wBlue), cRimNight, wNight);

      vec3 finalCloud = cloudCol + rimCol * edgeGlow * (0.45 + 0.55 * pow(sunDot, 2.0));
      sky = mix(sky, finalCloud, cloudMask * mix(0.88, 0.46, wNight));
    }

    // Cosmic twilight aurora wisps, multi-hue starfield, crescent moon & shooting stars
    if (wBlue > 0.05) {
      vec2 skyProj = dir.xy * 1.4;
      float aur = fbm(skyProj * 2.3 + vec2(uTime * 0.018, -uTime * 0.01));
      float aurMask = smoothstep(0.52, 0.82, aur) * smoothstep(0.12, 0.55, dir.y) * wNight * 0.34;
      vec3 aurCol = mix(vec3(0.18, 0.86, 0.88), vec3(0.76, 0.38, 0.98), noise(skyProj * 3.1));
      sky += aurCol * aurMask;

      float starCell = hash(floor(dir.xy * 210.0 + dir.z * 95.0));
      float starBright = smoothstep(0.991, 1.0, starCell) * smoothstep(0.06, 0.38, dir.y);
      float twinkle = 0.65 + 0.35 * sin(uTime * 2.8 + starCell * 72.0);
      vec3 starHue = starCell > 0.9975 ? vec3(0.56, 0.88, 1.0) : starCell > 0.9945 ? vec3(1.0, 0.84, 0.72) : vec3(0.98, 0.96, 0.92);
      sky += starHue * starBright * twinkle * (0.35 * wBlue + 0.95 * wNight);
    }

    if (wNight > 0.05) {
      vec3 moonDir = normalize(vec3(0.22, 0.33, -0.92));
      float dMain = length(dir - moonDir);
      float dCut = length(dir - normalize(moonDir + vec3(0.016, 0.012, 0.0)));
      float crescent = smoothstep(0.036, 0.029, dMain) * (1.0 - smoothstep(0.033, 0.026, dCut));
      float moonHalo = exp(-dMain * 16.0) * 0.28;
      sky += vec3(0.94, 0.96, 1.00) * (crescent * 1.15 + moonHalo) * wNight;

      // Two animated shooting stars streaking diagonally across the night sky
      float sTime1 = fract(uTime * 0.16);
      float sTime2 = fract(uTime * 0.12 + 0.54);
      vec2 viewUv = vec2(dir.x, dir.y);
      float s1 = shootingStar(viewUv, vec2(-0.34, 0.44), vec2(0.42, -0.18), sTime1);
      float s2 = shootingStar(viewUv, vec2(0.28, 0.38), vec2(-0.38, -0.16), sTime2);
      sky += vec3(0.68, 0.92, 1.0) * s1 * wNight * 1.45;
      sky += vec3(1.0, 0.80, 0.92) * s2 * wNight * 1.35;
    }

    gl_FragColor = vec4(sky, 1.0);
  }
`;

const ROAD_VERTEX_SHADER = `
  varying vec3 vWorldPos;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const ROAD_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uProgress;
  varying vec3 vWorldPos;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    vec2 xz = vWorldPos.xz;
    float wGolden = smoothstep(0.18, 0.45, uProgress);
    float wCyber = smoothstep(0.45, 0.85, uProgress);

    // Base damp dark-indigo Tokyo asphalt
    vec3 col = mix(vec3(0.075, 0.095, 0.145), vec3(0.045, 0.055, 0.105), wCyber);

    // Micro asphalt sparkle & rain puddle mask
    float micro = noise(xz * 3.8);
    float puddle = smoothstep(0.42, 0.72, noise(xz * vec2(0.24, 0.14)));

    // Longitudinal wet reflections mirrored along left, center, and right lanes
    float laneDistL = exp(-abs(abs(xz.x) - 5.4) * 0.62);
    float laneDistMid = exp(-abs(xz.x) * 0.42);
    float shimmer = 0.72 + 0.28 * sin(xz.y * 0.85 + uTime * 2.2 + micro * 4.5);

    vec3 reflWarm = mix(vec3(0.98, 0.56, 0.26), vec3(1.0, 0.42, 0.62), smoothstep(0.2, 0.7, sin(xz.y * 0.12) * 0.5 + 0.5));
    vec3 reflCyan = mix(vec3(0.36, 0.78, 0.98), vec3(0.28, 0.94, 0.78), smoothstep(-1.0, 1.0, cos(xz.y * 0.09)));

    vec3 leftRefl = mix(vec3(0.98, 0.66, 0.34), reflWarm, 0.45 + 0.55 * wCyber);
    vec3 rightRefl = mix(vec3(0.48, 0.76, 0.98), reflCyan, 0.35 + 0.65 * wCyber);
    vec3 sideRefl = xz.x < 0.0 ? leftRefl : rightRefl;

    col += sideRefl * laneDistL * puddle * shimmer * (0.34 + 0.42 * wCyber + 0.18 * wGolden);
    vec3 skyMirror = mix(vec3(0.42, 0.66, 0.92), mix(vec3(0.98, 0.48, 0.28), vec3(0.32, 0.54, 0.96), wCyber), smoothstep(0.18, 0.62, uProgress));
    col += skyMirror * laneDistMid * puddle * 0.22;

    // Subtle traveling energy pulse wave along road
    float pulse = pow(max(0.0, sin(xz.y * 0.28 + uTime * 3.2)), 14.0);
    col += mix(vec3(0.95, 0.52, 0.22), vec3(0.38, 0.82, 1.0), step(0.0, xz.x)) * pulse * 0.18 * (0.4 + 0.6 * wCyber);

    // Center dashed lane guide & glowing neon road-edge strips
    float dash = step(0.35, fract(-xz.y * 0.19)) * smoothstep(0.16, 0.05, abs(xz.x));
    col = mix(col, vec3(0.95, 0.90, 0.82), dash * 0.75);

    float curbGlow = exp(-abs(abs(xz.x) - 7.75) * 6.5);
    vec3 curbCol = xz.x < 0.0 ? vec3(1.0, 0.54, 0.22) : vec3(0.36, 0.84, 1.0);
    col += curbCol * curbGlow * (0.55 + 0.55 * wCyber);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const WATER_VERTEX_SHADER = `
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const WATER_FRAGMENT_SHADER = `
  uniform float uTime;
  varying vec3 vWorldPos;

  void main() {
    vec2 p = vWorldPos.xz;
    float w1 = sin(p.x * 0.7 + p.y * 0.35 + uTime * 1.9);
    float w2 = cos(p.x * 0.45 - p.y * 0.6 + uTime * 1.4);
    float ripple = w1 * 0.5 + w2 * 0.5;

    vec3 base = vec3(0.03, 0.06, 0.14);
    float centerBeam = exp(-abs(p.x) * 0.11);
    float sideCyan = exp(-abs(abs(p.x) - 10.0) * 0.18);
    float pinkStreak = exp(-abs(p.x + 17.0) * 0.14);

    float spec = pow(max(0.0, ripple * 0.5 + 0.5), 6.0);
    vec3 goldCol = vec3(1.0, 0.62, 0.24);
    vec3 cyanCol = vec3(0.36, 0.86, 1.0);
    vec3 sakuraCol = vec3(1.0, 0.42, 0.72);

    vec3 col = base;
    col += goldCol * centerBeam * (0.28 + 0.75 * spec);
    col += cyanCol * sideCyan * (0.22 + 0.55 * spec);
    col += sakuraCol * pinkStreak * (0.14 + 0.42 * spec);
    col += vec3(0.85, 0.92, 1.0) * smoothstep(0.86, 0.99, ripple) * 0.16;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const HOLO_SWEEP_VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const HOLO_SWEEP_FRAGMENT = `
  uniform float uTime;
  uniform float uSeed;
  uniform vec3 uColor;
  uniform float uBoost;
  varying vec2 vUv;

  void main() {
    float cycle = fract(uTime * 0.24 + uSeed);
    float diag = vUv.x * 0.7 + vUv.y * 0.3;
    float sweepPos = cycle * 1.8 - 0.4;
    float beam = exp(-abs(diag - sweepPos) * 16.0);
    float scan = 0.5 + 0.5 * sin(vUv.y * 120.0 + uTime * 3.0);
    float edge = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x) *
                 smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.92, vUv.y);
    float alpha = (beam * 0.18 + 0.025 * scan) * edge * (1.0 + uBoost * 1.1);
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function createBokehTexture(disposables: THREE.Texture[]): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 1, 32, 32, 31);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.28, "rgba(255, 255, 255, 0.72)");
    grad.addColorStop(0.65, "rgba(255, 255, 255, 0.16)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
  }
  const tex = new THREE.CanvasTexture(canvas);
  disposables.push(tex);
  return tex;
}

function createSunbeamTexture(disposables: THREE.Texture[]): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const vGrad = ctx.createLinearGradient(0, 0, 0, 512);
    vGrad.addColorStop(0, "rgba(255, 224, 168, 0.42)");
    vGrad.addColorStop(0.45, "rgba(255, 198, 134, 0.18)");
    vGrad.addColorStop(1, "rgba(255, 180, 120, 0)");
    ctx.fillStyle = vGrad;
    ctx.fillRect(0, 0, 256, 512);

    ctx.globalCompositeOperation = "destination-in";
    const hGrad = ctx.createLinearGradient(0, 0, 256, 0);
    hGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
    hGrad.addColorStop(0.5, "rgba(255, 255, 255, 1)");
    hGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = hGrad;
    ctx.fillRect(0, 0, 256, 512);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  disposables.push(tex);
  return tex;
}

function createBuildingFacadeTexture(
  variant: number,
  disposables: THREE.Texture[]
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const baseColors = [
      "rgb(25, 34, 52)",
      "rgb(22, 30, 48)",
      "rgb(30, 34, 54)",
      "rgb(24, 36, 54)",
    ];
    ctx.fillStyle = baseColors[variant % baseColors.length];
    ctx.fillRect(0, 0, 512, 1024);

    // Vertical architectural curtain-wall mullions
    ctx.fillStyle = "rgba(12, 16, 28, 0.55)";
    for (let x = 0; x < 512; x += 64) {
      ctx.fillRect(x, 0, 5, 1024);
    }

    const windowPalettes = [
      "rgb(255, 212, 138)", // warm honey gold
      "rgb(122, 216, 255)", // electric cyan
      "rgb(255, 142, 188)", // sakura rose
      "rgb(246, 240, 224)", // sunlit ivory
      "rgb(112, 238, 198)", // mint teal
      "rgb(192, 160, 255)", // soft orchid
    ];

    const rows = 26;
    const cols = 8;
    for (let r = 0; r < rows; r++) {
      const y = 26 + r * 38;
      // Subtle floor slab band
      ctx.fillStyle = "rgba(10, 14, 24, 0.45)";
      ctx.fillRect(0, y + 26, 512, 6);

      for (let c = 0; c < cols; c++) {
        const seed = (r * 31 + c * 17 + variant * 13) % 100;
        const x = 10 + c * 64;
        if (seed < 36) {
          // Dark unlit glass pane with faint sky reflection
          ctx.fillStyle = "rgba(76, 106, 150, 0.16)";
          ctx.fillRect(x, y, 48, 22);
        } else {
          const paletteIdx = (seed + variant + r) % windowPalettes.length;
          ctx.fillStyle = windowPalettes[paletteIdx];
          ctx.fillRect(x, y, 48, 22);

          // Interior blind silhouette on top strip
          ctx.fillStyle = "rgba(18, 24, 42, 0.36)";
          ctx.fillRect(x, y, 48, (seed % 3 === 0 ? 9 : 4));
        }
      }
    }

    // Glowing architectural rooftop band
    const trimPalette = [
      "rgb(255, 138, 62)",
      "rgb(88, 212, 255)",
      "rgb(255, 108, 178)",
      "rgb(102, 240, 200)",
    ];
    ctx.fillStyle = trimPalette[variant % trimPalette.length];
    ctx.fillRect(0, 6, 512, 8);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  disposables.push(tex);
  return tex;
}

function createKanjiSignTexture(
  label: string,
  sub: string,
  colorRgb: string,
  glowRgba: string,
  disposables: THREE.Texture[]
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "rgb(14, 18, 30)";
    ctx.fillRect(0, 0, 256, 640);

    const grad = ctx.createLinearGradient(0, 0, 0, 640);
    grad.addColorStop(0, glowRgba);
    grad.addColorStop(0.5, "rgba(14, 18, 30, 0)");
    grad.addColorStop(1, glowRgba);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 640);

    ctx.strokeStyle = colorRgb;
    ctx.lineWidth = 8;
    ctx.strokeRect(12, 12, 232, 616);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, 208, 592);

    ctx.shadowColor = colorRgb;
    ctx.shadowBlur = 18;
    ctx.fillStyle = "rgb(252, 248, 240)";
    ctx.textAlign = "center";
    ctx.font = "700 108px sans-serif";
    const chars = Array.from(label).slice(0, 3);
    const startY = chars.length === 2 ? 220 : 175;
    chars.forEach((ch, idx) => {
      ctx.fillText(ch, 128, startY + idx * 134);
    });

    ctx.shadowBlur = 0;
    ctx.fillStyle = colorRgb;
    ctx.font = "700 22px monospace";
    ctx.fillText(sub, 128, 578);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  disposables.push(tex);
  return tex;
}

function createAnimeDigitalTexture(
  spec: BillboardSpec,
  disposables: THREE.Texture[],
  compactPlaque = false
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = compactPlaque ? 240 : 340;
  const ctx = canvas.getContext("2d");

  const theme =
    spec.kind === "quant" && spec.accent === "cerulean"
      ? {
          primary: "rgb(92, 218, 255)",
          secondary: "rgb(92, 242, 198)",
          glow: "rgba(92, 218, 255, 0.22)",
        }
      : spec.kind === "quant"
      ? {
          primary: "rgb(255, 136, 56)",
          secondary: "rgb(255, 112, 174)",
          glow: "rgba(255, 136, 56, 0.22)",
        }
      : spec.kind === "saas"
      ? {
          primary: "rgb(118, 214, 255)",
          secondary: "rgb(196, 132, 255)",
          glow: "rgba(156, 146, 255, 0.22)",
        }
      : spec.kind === "zama"
      ? {
          primary: "rgb(255, 194, 72)",
          secondary: "rgb(96, 224, 255)",
          glow: "rgba(255, 194, 72, 0.24)",
        }
      : {
          primary: "rgb(255, 142, 58)",
          secondary: "rgb(255, 186, 108)",
          glow: "rgba(255, 142, 58, 0.20)",
        };

  if (ctx) {
    ctx.fillStyle = "rgb(15, 20, 31)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dual-hue radial cyber-anime corner aura
    const grad = ctx.createRadialGradient(110, 48, 8, 140, 80, 460);
    grad.addColorStop(0, theme.glow);
    grad.addColorStop(0.55, "rgba(72, 118, 214, 0.08)");
    grad.addColorStop(1, "rgba(11, 14, 19, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Crisp horizontal CRT / anime monitor scanlines
    ctx.fillStyle = "rgba(248, 241, 227, 0.035)";
    for (let y = 0; y < canvas.height; y += 6) {
      ctx.fillRect(0, y, canvas.width, 2);
    }

    // Outer metallic border & neon corner brackets
    ctx.strokeStyle = "rgba(248, 241, 227, 0.34)";
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 4;
    const m = 14;
    const b = 22;
    ctx.beginPath();
    ctx.moveTo(m, m + b);
    ctx.lineTo(m, m);
    ctx.lineTo(m + b, m);
    ctx.moveTo(canvas.width - m - b, m);
    ctx.lineTo(canvas.width - m, m);
    ctx.lineTo(canvas.width - m, m + b);
    ctx.moveTo(m, canvas.height - m - b);
    ctx.lineTo(m, canvas.height - m);
    ctx.lineTo(m + b, canvas.height - m);
    ctx.moveTo(canvas.width - m - b, canvas.height - m);
    ctx.lineTo(canvas.width - m, canvas.height - m);
    ctx.lineTo(canvas.width - m, canvas.height - m - b);
    ctx.stroke();

    // Top digital broadcast bar with colored accent gradient rule
    ctx.fillStyle = "rgb(10, 14, 22)";
    ctx.fillRect(16, 16, canvas.width - 32, 42);
    const barGrad = ctx.createLinearGradient(16, 0, canvas.width - 16, 0);
    barGrad.addColorStop(0, theme.primary);
    barGrad.addColorStop(1, theme.secondary);
    ctx.fillStyle = barGrad;
    ctx.fillRect(16, 56, canvas.width - 32, 3);

    ctx.fillStyle = theme.primary;
    ctx.beginPath();
    ctx.arc(38, 37, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = "600 20px monospace";
    ctx.fillText(`${spec.channel} · ${spec.jpTag}`, 56, 44);

    ctx.fillStyle = "rgb(198, 208, 226)";
    ctx.font = "500 18px monospace";
    const clickHint = "HOVER / CLICK ↗";
    const hintW = ctx.measureText(clickHint).width;
    ctx.fillText(clickHint, canvas.width - hintW - 32, 44);

    // Rich animated-style spectrum / chart telemetry on non-compact signs
    if (!compactPlaque && spec.kind === "quant") {
      const bars = [28, 46, 36, 62, 50, 78, 64, 48, 74, 58];
      bars.forEach((bh, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? theme.primary : theme.secondary;
        ctx.fillRect(canvas.width - 214 + idx * 17, 184 - bh, 11, bh);
      });
    } else if (!compactPlaque && spec.kind === "saas") {
      ctx.strokeStyle = theme.secondary;
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i <= 10; i++) {
        const px = canvas.width - 208 + i * 17;
        const py = 144 + Math.sin(i * 0.9) * 24;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = i % 2 === 0 ? theme.primary : theme.secondary;
        ctx.fillRect(canvas.width - 190 + i * 24, 152 - (i % 3) * 14, 10, 26 + (i % 3) * 14);
      }
    } else if (!compactPlaque) {
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = i < 4 ? (i % 2 === 0 ? theme.primary : theme.secondary) : "rgba(248, 241, 227, 0.25)";
        ctx.fillRect(canvas.width - 144 + i * 17, 152 - i * 8, 10, 28 + i * 8);
      }
    }

    // Auto-scaled crisp ivory title
    const maxTitleW = compactPlaque ? canvas.width - 72 : canvas.width - 245;
    let titleSize = compactPlaque ? 46 : 52;
    ctx.fillStyle = "rgb(248, 241, 227)";
    ctx.font = `600 ${titleSize}px Georgia, serif`;
    while (ctx.measureText(spec.title).width > maxTitleW && titleSize > 24) {
      titleSize -= 2;
      ctx.font = `600 ${titleSize}px Georgia, serif`;
    }
    ctx.fillText(spec.title, 34, compactPlaque ? 132 : 146);

    ctx.fillStyle = "rgb(223, 215, 200)";
    ctx.font = "500 20px monospace";
    let subText = spec.subtitle;
    while (ctx.measureText(subText).width > canvas.width - 72 && subText.length > 18) {
      subText = `${subText.slice(0, -4)}...`;
    }
    ctx.fillText(subText, 34, compactPlaque ? 182 : 206);

    if (!compactPlaque) {
      const divGrad = ctx.createLinearGradient(34, 0, canvas.width - 34, 0);
      divGrad.addColorStop(0, theme.primary);
      divGrad.addColorStop(1, theme.secondary);
      ctx.fillStyle = divGrad;
      ctx.fillRect(34, 246, canvas.width - 68, 2);
      ctx.fillStyle = "rgb(174, 186, 206)";
      ctx.font = "400 18px monospace";
      const tagSummary = spec.tags.slice(0, 4).join("  ·  ").toUpperCase();
      ctx.fillText(tagSummary, 34, 288);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  disposables.push(tex);
  return tex;
}

interface InteractiveBoardRecord {
  spec: BillboardSpec;
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  ledMat: THREE.MeshStandardMaterial;
  sweepUniforms: {
    uTime: { value: number };
    uSeed: { value: number };
    uColor: { value: THREE.Color };
    uBoost: { value: number };
  };
  hoverAmount: number;
  inspectCamPos: THREE.Vector3;
  inspectLookAt: THREE.Vector3;
}

export function Jobjab3DWorld({
  progress,
  manualSceneIdx,
  focusedBillboardId,
  onHoverBillboard,
  onSelectBillboard,
  reducedMotion,
  onWebGLReady,
}: Jobjab3DWorldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const manualSceneRef = useRef<number | null>(manualSceneIdx);
  const focusedIdRef = useRef<string | null>(focusedBillboardId);
  const reducedRef = useRef<boolean>(reducedMotion);
  const hoverCbRef = useRef(onHoverBillboard);
  const selectCbRef = useRef(onSelectBillboard);

  useEffect(() => {
    manualSceneRef.current = manualSceneIdx;
  }, [manualSceneIdx]);

  useEffect(() => {
    focusedIdRef.current = focusedBillboardId;
  }, [focusedBillboardId]);

  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    hoverCbRef.current = onHoverBillboard;
    selectCbRef.current = onSelectBillboard;
  }, [onHoverBillboard, onSelectBillboard]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const testGl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!testGl) {
      onWebGLReady?.(false);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      });
    } catch {
      onWebGLReady?.(false);
      return;
    }

    onWebGLReady?.(true);

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      geometries.push(g);
      return g;
    };
    const trackMat = <T extends THREE.Material>(m: T): T => {
      materials.push(m);
      return m;
    };

    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(0x284066, 0.0044);
    scene.fog = fog;

    const initW = container.clientWidth || window.innerWidth;
    const initH = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(
      54,
      initW / Math.max(1, initH),
      0.1,
      620
    );

    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(pixelRatio);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(initW, initH),
      0.46,
      0.55,
      0.78
    );
    const outputPass = new OutputPass();
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(outputPass);

    const setSize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const aspect = w / Math.max(1, h);
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      bloomPass.setSize(w, h);
      camera.fov = aspect < 0.9 ? 68 : 54;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };
    setSize();

    const hemiLight = new THREE.HemisphereLight(0xbbe0ff, 0x26314e, 1.55);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffe6c4, 1.85);
    dirLight.position.set(22, 34, -40);
    scene.add(dirLight);

    // Warm rim light from opposite side for richer architectural silhouettes
    const rimLight = new THREE.DirectionalLight(0xff7cb8, 0.55);
    rimLight.position.set(-24, 18, -90);
    scene.add(rimLight);

    // 1. Dynamic Makoto Shinkai Anime Sky Dome + Volumetric Morning God-Rays
    const skyUniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
    };
    scene.add(
      new THREE.Mesh(
        trackGeo(new THREE.SphereGeometry(420, 32, 24)),
        trackMat(
          new THREE.ShaderMaterial({
            vertexShader: SKY_VERTEX_SHADER,
            fragmentShader: SKY_FRAGMENT_SHADER,
            uniforms: skyUniforms,
            side: THREE.BackSide,
            depthWrite: false,
          })
        )
      )
    );

    const sunbeamTex = createSunbeamTexture(textures);
    const sunbeamMat = trackMat(
      new THREE.MeshBasicMaterial({
        map: sunbeamTex,
        color: 0xffc88a,
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    );
    const sunbeamGroup = new THREE.Group();
    const beamConfigs = [
      { x: -7.5, y: 12.5, z: -24, w: 10, h: 30, rz: -0.44 },
      { x: 8.2, y: 13.5, z: -46, w: 11, h: 32, rz: -0.38 },
      { x: -8.0, y: 12.0, z: -68, w: 10, h: 30, rz: -0.42 },
      { x: 7.5, y: 13.0, z: -88, w: 11, h: 32, rz: -0.38 },
    ];
    beamConfigs.forEach((bc) => {
      const m = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(bc.w, bc.h)), sunbeamMat);
      m.position.set(bc.x, bc.y, bc.z);
      m.rotation.z = bc.rz;
      m.rotation.y = 0.25;
      sunbeamGroup.add(m);
    });
    scene.add(sunbeamGroup);

    // 2. Wet-Asphalt Reflective Roadway & Luminous Anime Lantern Curbs
    const roadUniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
    };
    const roadShaderMat = trackMat(
      new THREE.ShaderMaterial({
        vertexShader: ROAD_VERTEX_SHADER,
        fragmentShader: ROAD_FRAGMENT_SHADER,
        uniforms: roadUniforms,
      })
    );
    const roadMesh = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(16, 286)), roadShaderMat);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.set(0, 0.01, -122);
    scene.add(roadMesh);

    const walkMat = trackMat(
      new THREE.MeshStandardMaterial({ color: 0x1a2234, roughness: 0.58, metalness: 0.22 })
    );
    const leftSidewalk = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(10, 0.56, 286)), walkMat);
    leftSidewalk.position.set(-13, -0.1, -122);
    const rightSidewalk = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(10, 0.56, 286)), walkMat);
    rightSidewalk.position.set(13, -0.1, -122);
    scene.add(leftSidewalk, rightSidewalk);

    // Multi-hue Pedestrian Street Lanterns (slender dark post + blooming HDR lantern head)
    const poleMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x161c2a, metalness: 0.6, roughness: 0.35 }));
    const lanternHeadMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        toneMapped: false,
      })
    );
    const postInst = new THREE.InstancedMesh(trackGeo(new THREE.CylinderGeometry(0.06, 0.08, 1.35, 8)), poleMat, 56);
    const lanternInst = new THREE.InstancedMesh(trackGeo(new THREE.SphereGeometry(0.16, 10, 10)), lanternHeadMat, 56);
    const dummy = new THREE.Object3D();
    const lanternColors = [
      new THREE.Color(0xff9b42).multiplyScalar(1.45), // warm amber HDR glow
      new THREE.Color(0xff72b6).multiplyScalar(1.45), // sakura pink HDR glow
      new THREE.Color(0x52d4ff).multiplyScalar(1.45), // electric cyan HDR glow
    ];
    for (let i = 0; i < 28; i++) {
      const zPos = 8 - i * 7.8;
      dummy.position.set(-8.15, 0.85, zPos);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      postInst.setMatrixAt(i * 2, dummy.matrix);
      dummy.position.set(-8.15, 1.56, zPos);
      dummy.scale.set(1, 1.3, 1);
      dummy.updateMatrix();
      lanternInst.setMatrixAt(i * 2, dummy.matrix);
      lanternInst.setColorAt(i * 2, lanternColors[i % lanternColors.length]);

      dummy.position.set(8.15, 0.85, zPos);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      postInst.setMatrixAt(i * 2 + 1, dummy.matrix);
      dummy.position.set(8.15, 1.56, zPos);
      dummy.scale.set(1, 1.3, 1);
      dummy.updateMatrix();
      lanternInst.setMatrixAt(i * 2 + 1, dummy.matrix);
      lanternInst.setColorAt(i * 2 + 1, lanternColors[(i + 2) % lanternColors.length]);
    }
    scene.add(postInst, lanternInst);

    // 3. Richly Textured Multi-Color Anime City Towers, Skyline & Japanese Neon Kanji Signs
    const facadeMaterials = [0, 1, 2, 3].map((v) => {
      const tex = createBuildingFacadeTexture(v, textures);
      return trackMat(
        new THREE.MeshStandardMaterial({
          map: tex,
          emissiveMap: tex,
          emissive: new THREE.Color(0xd8e6ff),
          emissiveIntensity: 0.45,
          roughness: 0.42,
          metalness: 0.25,
        })
      );
    });
    const roofTrimMats = [0xff8c42, 0x4fd4ff, 0xff6bb5, 0x9c72ff].map((hex) =>
      trackMat(
        new THREE.MeshStandardMaterial({
          color: hex,
          emissive: new THREE.Color(hex),
          emissiveIntensity: 1.55,
          roughness: 0.2,
        })
      )
    );

    for (let i = 0; i < 18; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = 4 - i * 11.0;
      const h = 22 + ((i * 7) % 20);
      const w = 8.4 + (i % 3) * 2.1;
      const d = 7.8;
      const bx = side * (16.5 + (i % 2) * 2.2);

      const b = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(w, h, d)),
        facadeMaterials[i % facadeMaterials.length]
      );
      b.position.set(bx, h / 2 - 0.1, z);
      scene.add(b);

      const crown = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(w + 0.3, 0.35, d + 0.3)),
        roofTrimMats[i % roofTrimMats.length]
      );
      crown.position.set(bx, h - 0.15, z);
      scene.add(crown);
    }

    // Distant Painterly Skyline Silhouettes flanking deep perspective horizon
    for (let i = 0; i < 24; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const distX = side * (29 + (i % 4) * 9);
      const distZ = -22 - i * 9.5;
      const distH = 34 + ((i * 13) % 36);
      const st = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(10 + (i % 3) * 3, distH, 10)),
        facadeMaterials[(i + 1) % facadeMaterials.length]
      );
      st.position.set(distX, distH / 2 - 2, distZ);
      scene.add(st);
    }

    // Cantilevered Glowing Japanese Neon Kanji Signs along both sides
    const kanjiSpecs = [
      { label: "創造", sub: "CREATE", rgb: "rgb(255, 138, 62)", glow: "rgba(255, 138, 62, 0.34)", hex: 0xff8a3e, z: -20, side: -1 },
      { label: "電脳", sub: "CYBER", rgb: "rgb(78, 214, 255)", glow: "rgba(78, 214, 255, 0.34)", hex: 0x4ed6ff, z: -32, side: 1 },
      { label: "未来", sub: "FUTURE", rgb: "rgb(255, 108, 178)", glow: "rgba(255, 108, 178, 0.34)", hex: 0xff6cb2, z: -48, side: -1 },
      { label: "芸術", sub: "ARTISTRY", rgb: "rgb(102, 240, 200)", glow: "rgba(102, 240, 200, 0.34)", hex: 0x66f0c8, z: -64, side: 1 },
      { label: "量子", sub: "QUANT", rgb: "rgb(255, 186, 72)", glow: "rgba(255, 186, 72, 0.34)", hex: 0xffba48, z: -84, side: -1 },
      { label: "市場", sub: "PERPDEX", rgb: "rgb(78, 214, 255)", glow: "rgba(78, 214, 255, 0.34)", hex: 0x4ed6ff, z: -98, side: 1 },
      { label: "自動", sub: "ENGINE", rgb: "rgb(255, 108, 178)", glow: "rgba(255, 108, 178, 0.34)", hex: 0xff6cb2, z: -116, side: -1 },
      { label: "光速", sub: "LATENCY", rgb: "rgb(102, 240, 200)", glow: "rgba(102, 240, 200, 0.34)", hex: 0x66f0c8, z: -130, side: 1 },
      { label: "設計", sub: "SYSTEMS", rgb: "rgb(186, 134, 255)", glow: "rgba(186, 134, 255, 0.34)", hex: 0xba86ff, z: -146, side: -1 },
      { label: "立体", sub: "3D WEB", rgb: "rgb(78, 214, 255)", glow: "rgba(78, 214, 255, 0.34)", hex: 0x4ed6ff, z: -162, side: 1 },
      { label: "暗号", sub: "FHEVM", rgb: "rgb(255, 198, 72)", glow: "rgba(255, 198, 72, 0.34)", hex: 0xffc648, z: -178, side: -1 },
      { label: "工房", sub: "STUDIO", rgb: "rgb(255, 108, 178)", glow: "rgba(255, 108, 178, 0.34)", hex: 0xff6cb2, z: -190, side: 1 },
    ];
    const kanjiMats: THREE.MeshStandardMaterial[] = [];
    const bracketMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x161d2e, metalness: 0.7, roughness: 0.3 }));
    kanjiSpecs.forEach((ks, idx) => {
      const kTex = createKanjiSignTexture(ks.label, ks.sub, ks.rgb, ks.glow, textures);
      const kMat = trackMat(
        new THREE.MeshStandardMaterial({
          map: kTex,
          emissiveMap: kTex,
          emissive: new THREE.Color(ks.hex),
          emissiveIntensity: 1.05,
          roughness: 0.25,
        })
      );
      kanjiMats.push(kMat);

      const signY = 8.4 + (idx % 3) * 1.4;
      const signX = ks.side * 11.4;
      const signBox = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(1.45, 3.6, 0.28)), kMat);
      signBox.position.set(signX, signY, ks.z);
      signBox.rotation.y = ks.side > 0 ? -0.22 : 0.22;
      scene.add(signBox);

      const arm = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(2.8, 0.14, 0.14)), bracketMat);
      arm.position.set(ks.side * 13.0, signY + 0.8, ks.z);
      scene.add(arm);
    });

    // Multi-Hue Lush Autumn Maple + Sakura Blossom Trees
    const trunkMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x3b2820, roughness: 0.9 }));
    const foliagePalette = [
      trackMat(new THREE.MeshStandardMaterial({ color: 0xe84855, emissive: new THREE.Color(0xc42b3c), emissiveIntensity: 0.22, roughness: 0.78 })), // crimson maple
      trackMat(new THREE.MeshStandardMaterial({ color: 0xff8c38, emissive: new THREE.Color(0xd85c18), emissiveIntensity: 0.22, roughness: 0.78 })), // tangerine
      trackMat(new THREE.MeshStandardMaterial({ color: 0xffc857, emissive: new THREE.Color(0xd8941e), emissiveIntensity: 0.24, roughness: 0.76 })), // warm gold
      trackMat(new THREE.MeshStandardMaterial({ color: 0xff85b3, emissive: new THREE.Color(0xd64882), emissiveIntensity: 0.26, roughness: 0.75 })), // sakura pink
    ];
    for (let i = 0; i < 16; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = 7 - i * 6.4;
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.18, 0.27, 4.0, 7)), trunkMat);
      trunk.position.y = 2.0;
      tree.add(trunk);

      const crownA = new THREE.Mesh(
        trackGeo(new THREE.IcosahedronGeometry(2.1, 2)),
        foliagePalette[i % foliagePalette.length]
      );
      crownA.position.set(0, 4.5, 0);
      crownA.scale.set(1.15, 0.85, 1.1);
      tree.add(crownA);

      const crownB = new THREE.Mesh(
        trackGeo(new THREE.IcosahedronGeometry(1.5, 2)),
        foliagePalette[(i + 1) % foliagePalette.length]
      );
      crownB.position.set(side * 0.95, 5.35, 0.45);
      tree.add(crownB);

      const crownC = new THREE.Mesh(
        trackGeo(new THREE.IcosahedronGeometry(1.25, 2)),
        foliagePalette[(i + 3) % foliagePalette.length]
      );
      crownC.position.set(-side * 0.75, 4.85, -0.5);
      tree.add(crownC);

      tree.position.set(side * 10.0, 0.1, z);
      scene.add(tree);
    }

    const wireMat = trackMat(new THREE.MeshBasicMaterial({ color: 0x161d2e }));
    for (const wz of [-16, -42, -74, -108, -148]) {
      const wireCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-12, 8.8, wz),
        new THREE.Vector3(0, 7.8, wz - 0.6),
        new THREE.Vector3(12, 8.8, wz),
      ]);
      scene.add(new THREE.Mesh(trackGeo(new THREE.TubeGeometry(wireCurve, 12, 0.025, 5, false)), wireMat));
    }

    // 4. Zone Architectural Setpieces (Gate, Quant WebSocket Arcs, SaaS Jewels, Zama Bridge, Midnight Studio)
    const archDarkMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x131926, roughness: 0.35, metalness: 0.65 }));
    const leftPillar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.95, 7.5, 1.15)), archDarkMat);
    leftPillar.position.set(-7.6, 3.75, -10);
    const rightPillar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.95, 7.5, 1.15)), archDarkMat);
    rightPillar.position.set(7.6, 3.75, -10);
    const archBeam = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(16.8, 1.1, 1.25)), archDarkMat);
    archBeam.position.set(0, 7.3, -10);
    scene.add(leftPillar, rightPillar, archBeam);

    // Gate Pillar Neon Accent Strips
    const gateStripeL = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.12, 6.8, 0.12)), roofTrimMats[0]);
    gateStripeL.position.set(-7.05, 3.4, -9.4);
    const gateStripeR = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.12, 6.8, 0.12)), roofTrimMats[1]);
    gateStripeR.position.set(7.05, 3.4, -9.4);
    scene.add(gateStripeL, gateStripeR);

    // Live Quant Bid/Ask Orderbook Walls + Overhead Arched WebSocket Data Arcs (Zone 3)
    const barGeo = trackGeo(new THREE.BoxGeometry(0.84, 1, 0.84));
    const bidBarMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xff8a3e,
        emissive: new THREE.Color(0xff6b2c),
        emissiveIntensity: 0.95,
        transparent: true,
        opacity: 0.88,
      })
    );
    const askBarMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x52e0ff,
        emissive: new THREE.Color(0x36c8f5),
        emissiveIntensity: 0.95,
        transparent: true,
        opacity: 0.88,
      })
    );
    const bidBars = new THREE.InstancedMesh(barGeo, bidBarMat, 32);
    const askBars = new THREE.InstancedMesh(barGeo, askBarMat, 32);
    scene.add(bidBars, askBars);

    // Arched holographic WebSocket data arcs & traveling packets overhead at Quant Plaza
    const packetOrbs: { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; offset: number }[] = [];
    const arcPacketGeo = trackGeo(new THREE.SphereGeometry(0.2, 8, 8));
    for (let i = 0; i < 6; i++) {
      const zArc = -106 - i * 6.4;
      const arcCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-7.2, 3.8, zArc),
        new THREE.Vector3(-3.0, 9.2 + (i % 2) * 1.4, zArc - 1.2),
        new THREE.Vector3(3.0, 9.2 + (i % 2) * 1.4, zArc - 1.2),
        new THREE.Vector3(7.2, 3.8, zArc),
      ]);
      const arcCol = i % 2 === 0 ? 0xff7eb6 : 0x58e0ff;
      const arcMat = trackMat(
        new THREE.MeshBasicMaterial({
          color: arcCol,
          transparent: true,
          opacity: 0.42,
        })
      );
      scene.add(new THREE.Mesh(trackGeo(new THREE.TubeGeometry(arcCurve, 28, 0.045, 6, false)), arcMat));

      const pktMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: arcCol,
          emissive: new THREE.Color(arcCol),
          emissiveIntensity: 2.2,
        })
      );
      const pkt = new THREE.Mesh(arcPacketGeo, pktMat);
      scene.add(pkt);
      packetOrbs.push({ mesh: pkt, curve: arcCurve, speed: 0.42 + (i % 3) * 0.14, offset: i * 0.21 });
    }

    // Jewel-Toned Rotating Polyhedra + Dual Orbital Rings (Zone 4)
    const rotatingSculptures: { group: THREE.Group; ringA: THREE.Mesh; ringB: THREE.Mesh }[] = [];
    const polyGeo = trackGeo(new THREE.IcosahedronGeometry(1.42, 1));
    const polyWireGeo = trackGeo(new THREE.EdgesGeometry(polyGeo));
    const polyWireMat = trackMat(new THREE.LineBasicMaterial({ color: 0xffffff }));
    const frameSlateMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x131926, roughness: 0.35, metalness: 0.5 }));
    const jewelColors = [0x46d8ff, 0xff6bb5, 0x5cf2c2, 0xffc84a];

    for (let idx = 0; idx < 4; idx++) {
      const side = idx % 2 === 0 ? -1 : 1;
      const z = -150 - idx * 9.5;
      const jColor = jewelColors[idx % jewelColors.length];

      const plinth = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(3.3, 0.9, 3.3)), frameSlateMat);
      plinth.position.set(side * 6.8, 0.45, z);
      scene.add(plinth);

      const plinthRing = new THREE.Mesh(
        trackGeo(new THREE.TorusGeometry(1.55, 0.05, 8, 36)),
        trackMat(
          new THREE.MeshStandardMaterial({
            color: jColor,
            emissive: new THREE.Color(jColor),
            emissiveIntensity: 1.8,
          })
        )
      );
      plinthRing.rotation.x = Math.PI / 2;
      plinthRing.position.set(side * 6.8, 0.94, z);
      scene.add(plinthRing);

      const jewelMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: jColor,
          emissive: new THREE.Color(jColor),
          emissiveIntensity: 0.85,
          roughness: 0.18,
          metalness: 0.72,
        })
      );

      const sculpt = new THREE.Group();
      sculpt.add(new THREE.Mesh(polyGeo, jewelMat), new THREE.LineSegments(polyWireGeo, polyWireMat));

      const ringMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: jColor,
          emissive: new THREE.Color(jColor),
          emissiveIntensity: 1.5,
        })
      );
      const ringA = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(2.05, 0.035, 8, 40)), ringMat);
      const ringB = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(2.35, 0.03, 8, 40)), ringMat);
      ringA.rotation.x = Math.PI / 3;
      ringB.rotation.y = Math.PI / 3;
      sculpt.add(ringA, ringB);

      sculpt.position.set(side * 6.8, 3.65, z);
      scene.add(sculpt);
      rotatingSculptures.push({ group: sculpt, ringA, ringB });
    }

    // Animated Harbor Water + Cable-Stayed Zama Bridge + Multi-Ring FHE Crystal (Zone 5)
    const waterUniforms = { uTime: { value: 0 } };
    const waterMesh = new THREE.Mesh(
      trackGeo(new THREE.PlaneGeometry(240, 96)),
      trackMat(
        new THREE.ShaderMaterial({
          vertexShader: WATER_VERTEX_SHADER,
          fragmentShader: WATER_FRAGMENT_SHADER,
          uniforms: waterUniforms,
        })
      )
    );
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, -1.6, -214);
    scene.add(waterMesh);

    const glowBarAmber = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xff9f3f,
        emissive: new THREE.Color(0xff9f3f),
        emissiveIntensity: 1.85,
      })
    );
    const glowBarCyan = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x52dcff,
        emissive: new THREE.Color(0x52dcff),
        emissiveIntensity: 1.85,
      })
    );
    const pylonMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x1a2236, roughness: 0.4, metalness: 0.6 }));
    const cableMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xd0e8ff }));

    for (const pz of [-196, -228]) {
      for (const side of [-8.8, 8.8]) {
        const pylon = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(1.1, 22, 1.2)), pylonMat);
        pylon.position.set(side, 9.5, pz);
        scene.add(pylon);

        const pylonStripe = new THREE.Mesh(
          trackGeo(new THREE.BoxGeometry(0.14, 21, 0.14)),
          side < 0 ? glowBarAmber : glowBarCyan
        );
        pylonStripe.position.set(side + (side < 0 ? 0.56 : -0.56), 9.5, pz);
        scene.add(pylonStripe);

        const cap = new THREE.Mesh(
          trackGeo(new THREE.SphereGeometry(0.3, 10, 10)),
          side < 0 ? glowBarAmber : glowBarCyan
        );
        cap.position.set(side, 20.8, pz);
        scene.add(cap);
      }
      const crossTop = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(18.6, 0.8, 1.0)), pylonMat);
      crossTop.position.set(0, 15.2, pz);
      scene.add(crossTop);
    }

    for (const side of [-8.8, 8.8]) {
      const cat = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side, 8.5, -182),
        new THREE.Vector3(side, 19.5, -196),
        new THREE.Vector3(side, 13.8, -212),
        new THREE.Vector3(side, 19.5, -228),
        new THREE.Vector3(side, 8.5, -240),
      ]);
      scene.add(new THREE.Mesh(trackGeo(new THREE.TubeGeometry(cat, 32, 0.06, 6, false)), cableMat));

      for (const sz of [-202, -207, -212, -217, -222]) {
        const t = (sz - -182) / (-240 - -182);
        const pt = cat.getPointAt(Math.max(0.05, Math.min(0.95, t)));
        const hangerH = Math.max(2, pt.y - 0.4);
        const hanger = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.028, 0.028, hangerH, 5)), cableMat);
        hanger.position.set(side, 0.4 + hangerH / 2, sz);
        scene.add(hanger);
      }
    }

    const fheCrystal = new THREE.Group();
    const outerOctaGeo = trackGeo(new THREE.OctahedronGeometry(2.8, 0));
    const outerEdges = new THREE.LineSegments(
      trackGeo(new THREE.EdgesGeometry(outerOctaGeo)),
      trackMat(new THREE.LineBasicMaterial({ color: 0x6ce4ff }))
    );
    const innerCore = new THREE.Mesh(
      trackGeo(new THREE.OctahedronGeometry(1.42, 0)),
      trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xffb845,
          emissive: new THREE.Color(0xff9628),
          emissiveIntensity: 1.9,
          roughness: 0.15,
        })
      )
    );
    const orbitalRing = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(3.45, 0.055, 8, 56)),
      glowBarCyan
    );
    const orbitalRing2 = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(4.05, 0.045, 8, 56)),
      glowBarAmber
    );
    const orbitalRing3 = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(4.65, 0.035, 8, 56)),
      trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xff70b8,
          emissive: new THREE.Color(0xff70b8),
          emissiveIntensity: 1.6,
        })
      )
    );
    orbitalRing.rotation.x = Math.PI / 3;
    orbitalRing2.rotation.y = Math.PI / 3;
    orbitalRing3.rotation.x = -Math.PI / 4;
    fheCrystal.add(outerEdges, innerCore, orbitalRing, orbitalRing2, orbitalRing3);
    fheCrystal.position.set(0, 6.4, -212);
    scene.add(fheCrystal);

    // Subtle rising holographic beam through Zama crystal into starry sky
    const zamaBeam = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.4, 2.2, 44, 16, 1, true)),
      trackMat(
        new THREE.MeshBasicMaterial({
          color: 0x62d6ff,
          transparent: true,
          opacity: 0.08,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      )
    );
    zamaBeam.position.set(0, 22, -212);
    scene.add(zamaBeam);

    // Midnight Glass Studio Structure + Colorful Skyline (Zone 6)
    const studioGroup = new THREE.Group();
    const woodFloorMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x221a15, roughness: 0.62, metalness: 0.08 }));
    const studioFloor = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(19, 0.24, 26)), woodFloorMat);
    studioFloor.position.set(0, -0.06, -243);
    studioGroup.add(studioFloor);

    const mullionMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x121726, roughness: 0.32, metalness: 0.72 }));
    for (const mx of [-8.8, -4.4, 0, 4.4, 8.8]) {
      const m = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.18, 9.5, 0.22)), mullionMat);
      m.position.set(mx, 4.75, -254);
      studioGroup.add(m);
    }
    const studioCeiling = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(20, 0.4, 26)), mullionMat);
    studioCeiling.position.set(0, 9.4, -243);
    studioGroup.add(studioCeiling);

    // Subtle neon studio ceiling strip accent
    const studioStrip = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(16, 0.08, 0.14)), glowBarCyan);
    studioStrip.position.set(0, 9.15, -252.5);
    studioGroup.add(studioStrip);

    const deskMesh = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(3.6, 0.14, 1.6)), woodFloorMat);
    deskMesh.position.set(3.8, 1.45, -248);
    studioGroup.add(deskMesh);

    const lampHead = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.85, 0.09, 0.18)), glowBarAmber);
    lampHead.position.set(4.8, 2.35, -248);
    studioGroup.add(lampHead);

    const deskLight = new THREE.PointLight(0xff9c3e, 16, 18);
    deskLight.position.set(4.6, 2.2, -248);
    studioGroup.add(deskLight);

    const studioCyanFill = new THREE.PointLight(0x46d8ff, 8, 20);
    studioCyanFill.position.set(-4.8, 4.2, -249);
    studioGroup.add(studioCyanFill);

    const distantColors = [0xff9438, 0x52dcff, 0xff70b8, 0x66f0c8];
    const distantBeaconMats = distantColors.map((hex) =>
      trackMat(
        new THREE.MeshStandardMaterial({
          color: hex,
          emissive: new THREE.Color(hex),
          emissiveIntensity: 1.75,
        })
      )
    );
    for (let i = 0; i < 22; i++) {
      const dx = -42 + i * 4.0;
      const dz = -274 - (i % 4) * 10;
      const dh = 15 + ((i * 11) % 26);
      const t = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(3.4, dh, 3.4)),
        facadeMaterials[i % facadeMaterials.length]
      );
      t.position.set(dx, dh / 2 - 4, dz);
      studioGroup.add(t);

      const beacon = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(0.45, 0.45, 0.45)),
        distantBeaconMats[i % distantBeaconMats.length]
      );
      beacon.position.set(dx, dh - 3.6, dz + 1.6);
      studioGroup.add(beacon);
    }
    scene.add(studioGroup);

    // ============================================================
    // 5. ALL 19 INTERACTIVE ANIME DIGITAL BILLBOARDS + HOLOGRAPHIC SWEEP + TARGET RETICLE
    // ============================================================
    const texLoader = new THREE.TextureLoader();
    const billboardRecords: InteractiveBoardRecord[] = [];
    const hitMeshes: THREE.Mesh[] = [];
    const worldUp = new THREE.Vector3(0, 1, 0);

    ANIME_BILLBOARDS.forEach((spec, idx) => {
      const group = new THREE.Group();
      group.position.set(spec.position[0], spec.position[1], spec.position[2]);
      group.rotation.y = spec.rotationY;

      const accentHex =
        spec.kind === "saas"
          ? 0xa878ff
          : spec.kind === "zama"
          ? 0xffc648
          : spec.accent === "cerulean"
          ? 0x4fd4ff
          : 0xff8a3e;

      const ledMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: accentHex,
          emissive: new THREE.Color(accentHex),
          emissiveIntensity: 1.35,
          roughness: 0.2,
        })
      );

      // Cabinet housing
      const housing = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(spec.width + 0.24, spec.height + 0.24, 0.34)),
        frameSlateMat
      );
      group.add(housing);

      // Glowing outer neon cabinet edges (top, bottom, left, right)
      const topLed = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(spec.width + 0.32, 0.08, 0.4)), ledMat);
      topLed.position.y = spec.height / 2 + 0.1;
      const bottomLed = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(spec.width + 0.32, 0.08, 0.4)), ledMat);
      bottomLed.position.y = -spec.height / 2 - 0.1;
      const leftLed = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.07, spec.height + 0.24, 0.38)), ledMat);
      leftLed.position.x = -spec.width / 2 - 0.12;
      const rightLed = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.07, spec.height + 0.24, 0.38)), ledMat);
      rightLed.position.x = spec.width / 2 + 0.12;
      group.add(topLed, bottomLed, leftLed, rightLed);

      // Vertical support stanchion anchored to ground
      if (spec.kind === "quant" || spec.kind === "flagship") {
        const postHeight = Math.max(0.5, spec.position[1] - spec.height / 2 + 0.2);
        const post = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.28, postHeight, 0.28)), pylonMat);
        post.position.set(0, -spec.height / 2 - postHeight / 2, -0.08);
        group.add(post);
      }

      if (spec.kind === "flagship" && spec.plateKey) {
        const plateSrc = PLATE_SRCS[spec.plateKey];
        // Slight 0xd8d8d8 color scale prevents bright images from crossing UnrealBloom threshold
        const screenMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xd8d8d8 }));
        texLoader.load(plateSrc, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          textures.push(tex);
          screenMat.map = tex;
          screenMat.needsUpdate = true;
        });
        const screen = new THREE.Mesh(
          trackGeo(new THREE.PlaneGeometry(spec.width - 0.36, spec.height * 0.64)),
          screenMat
        );
        screen.position.set(0, spec.height * 0.14, 0.19);
        group.add(screen);

        const capTex = createAnimeDigitalTexture(spec, textures, true);
        const plaque = new THREE.Mesh(
          trackGeo(new THREE.PlaneGeometry(spec.width - 0.36, spec.height * 0.28)),
          trackMat(new THREE.MeshBasicMaterial({ map: capTex, color: 0xe2e2e2 }))
        );
        plaque.position.set(0, -spec.height * 0.34, 0.19);
        group.add(plaque);
      } else {
        const screenTex = createAnimeDigitalTexture(spec, textures, false);
        const screen = new THREE.Mesh(
          trackGeo(new THREE.PlaneGeometry(spec.width - 0.22, spec.height - 0.22)),
          trackMat(new THREE.MeshBasicMaterial({ map: screenTex, color: 0xe0e0e0 }))
        );
        screen.position.set(0, 0, 0.19);
        group.add(screen);
      }

      // Holographic animated sheen sweep overlay on billboard glass
      const sweepUniforms = {
        uTime: { value: 0 },
        uSeed: { value: idx * 0.17 },
        uColor: { value: new THREE.Color(accentHex) },
        uBoost: { value: 0 },
      };
      const sweepPlane = new THREE.Mesh(
        trackGeo(new THREE.PlaneGeometry(spec.width - 0.2, spec.height - 0.2)),
        trackMat(
          new THREE.ShaderMaterial({
            vertexShader: HOLO_SWEEP_VERTEX,
            fragmentShader: HOLO_SWEEP_FRAGMENT,
            uniforms: sweepUniforms,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        )
      );
      sweepPlane.position.set(0, 0, 0.21);
      group.add(sweepPlane);

      // Dedicated clean front-face raycast target mesh
      const hitMesh = new THREE.Mesh(
        trackGeo(new THREE.PlaneGeometry(spec.width + 0.5, spec.height + 0.5)),
        trackMat(new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }))
      );
      hitMesh.position.set(0, 0, 0.25);
      hitMesh.userData = { billboardId: spec.id };
      group.add(hitMesh);

      scene.add(group);
      hitMeshes.push(hitMesh);

      const normal = new THREE.Vector3(Math.sin(spec.rotationY), 0, Math.cos(spec.rotationY)).normalize();
      const boardCenter = new THREE.Vector3(spec.position[0], spec.position[1], spec.position[2]);

      const dist =
        spec.kind === "arch"
          ? 9.8
          : spec.kind === "zama"
          ? 10.6
          : spec.kind === "studio"
          ? 4.4
          : 6.4;

      const camY =
        spec.kind === "arch"
          ? 4.6
          : spec.kind === "zama"
          ? 6.4
          : spec.kind === "studio"
          ? 2.2
          : Math.max(2.35, spec.position[1] - 0.15);

      const lookY =
        spec.kind === "zama"
          ? 8.4
          : spec.kind === "saas"
          ? 2.25
          : spec.position[1];

      const inspectCamPos = boardCenter.clone().addScaledVector(normal, dist);
      inspectCamPos.y = camY;

      const dirToCenter = boardCenter.clone().sub(inspectCamPos).normalize();
      const screenRight = new THREE.Vector3().crossVectors(dirToCenter, worldUp).normalize();
      const rightOffset = spec.kind === "studio" ? 0.55 : 1.05;
      const inspectLookAt = boardCenter.clone().addScaledVector(screenRight, rightOffset);
      inspectLookAt.y = lookY;

      billboardRecords.push({
        spec,
        group,
        hitMesh,
        ledMat,
        sweepUniforms,
        hoverAmount: 0,
        inspectCamPos,
        inspectLookAt,
      });
    });

    // Floating 3D Anime Target Lock-On Reticle Ring (snaps to hovered billboard)
    const reticleGroup = new THREE.Group();
    const reticleOuterMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(0x52dcff),
        emissiveIntensity: 2.0,
        transparent: true,
        opacity: 0.9,
      })
    );
    const reticleRingA = new THREE.Mesh(trackGeo(new THREE.RingGeometry(0.96, 1.02, 48)), reticleOuterMat);
    const reticleRingB = new THREE.Mesh(trackGeo(new THREE.RingGeometry(1.1, 1.13, 6)), reticleOuterMat);
    reticleGroup.add(reticleRingA, reticleRingB);
    reticleGroup.visible = false;
    scene.add(reticleGroup);

    // ============================================================
    // 6. ZIPPING NEON SPEED RIBBONS + MULTI-HUE PETALS + ANIME BOKEH FIREFLIES
    // ============================================================
    const speedRibbonData: { mesh: THREE.Mesh; baseX: number; baseY: number; speed: number; offset: number }[] = [];
    const ribbonGeo = trackGeo(new THREE.BoxGeometry(0.08, 0.06, 8.5));
    const ribbonColors = [0xff8c42, 0x4ad8ff, 0xff6cb5, 0x62f2c4];
    for (let i = 0; i < 12; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const rColor = ribbonColors[i % ribbonColors.length];
      const rMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: rColor,
          emissive: new THREE.Color(rColor),
          emissiveIntensity: 1.9,
        })
      );
      const rMesh = new THREE.Mesh(ribbonGeo, rMat);
      scene.add(rMesh);
      speedRibbonData.push({
        mesh: rMesh,
        baseX: side * (7.2 + (i % 3) * 0.45),
        baseY: 0.65 + (i % 4) * 1.15,
        speed: 22 + (i % 3) * 8,
        offset: i * 19.5,
      });
    }

    // 300 Multi-Hue Falling Maple & Sakura Petals
    const petalGeo = trackGeo(new THREE.OctahedronGeometry(0.14, 0));
    petalGeo.scale(1.25, 0.16, 1.65);
    const petalMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(0x552218),
        emissiveIntensity: 0.35,
        roughness: 0.6,
      })
    );
    const petalCount = 300;
    const petals = new THREE.InstancedMesh(petalGeo, petalMat, petalCount);
    const petalPalette = [
      new THREE.Color(0xe84855),
      new THREE.Color(0xff8c38),
      new THREE.Color(0xffc857),
      new THREE.Color(0xff82b8),
    ];
    const petalData = Array.from({ length: petalCount }, (_, i) => {
      petals.setColorAt(i, petalPalette[i % petalPalette.length]);
      return {
        x: ((i * 19) % 24) - 12,
        y: 1.5 + ((i * 7) % 10),
        z: 10 - i * 0.85,
        speed: 0.7 + (i % 5) * 0.25,
        phase: i * 0.63,
      };
    });
    if (petals.instanceColor) petals.instanceColor.needsUpdate = true;
    scene.add(petals);

    // 180 Glowing Anime Bokeh Firefly Orbs rising softly across twilight & midnight
    const fireflyCount = 180;
    const fireflyPos = new Float32Array(fireflyCount * 3);
    const fireflyCol = new Float32Array(fireflyCount * 3);
    const ffPalette = [
      new THREE.Color(0x52dcff),
      new THREE.Color(0xffa43f),
      new THREE.Color(0xff74bc),
      new THREE.Color(0x6af5cc),
    ];
    const fireflySeeds = Array.from({ length: fireflyCount }, (_, i) => {
      const c = ffPalette[i % ffPalette.length];
      fireflyCol[i * 3] = c.r;
      fireflyCol[i * 3 + 1] = c.g;
      fireflyCol[i * 3 + 2] = c.b;
      const sx = ((i * 23) % 26) - 13;
      const sy = 0.6 + ((i * 11) % 8);
      const sz = 8 - i * 1.4;
      fireflyPos[i * 3] = sx;
      fireflyPos[i * 3 + 1] = sy;
      fireflyPos[i * 3 + 2] = sz;
      return { sx, sy, sz, phase: i * 0.77 };
    });
    const fireflyGeo = trackGeo(new THREE.BufferGeometry());
    fireflyGeo.setAttribute("position", new THREE.BufferAttribute(fireflyPos, 3));
    fireflyGeo.setAttribute("color", new THREE.BufferAttribute(fireflyCol, 3));
    const bokehTex = createBokehTexture(textures);
    const fireflyMat = trackMat(
      new THREE.PointsMaterial({
        size: 0.62,
        map: bokehTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.68,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const fireflies = new THREE.Points(fireflyGeo, fireflyMat);
    scene.add(fireflies);

    // ============================================================
    // 7. CONTINUOUS 3D FPS CAMERA SPLINE + RAYCAST POINTER HANDLERS
    // ============================================================
    const camPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, 2.35, 12),
      new THREE.Vector3(0.5, 2.35, -20),
      new THREE.Vector3(-0.9, 2.38, -62),
      new THREE.Vector3(0.9, 2.4, -108),
      new THREE.Vector3(-0.8, 2.4, -152),
      new THREE.Vector3(0.4, 2.55, -202),
      new THREE.Vector3(0.0, 2.45, -225),
      new THREE.Vector3(0.0, 2.35, -242),
    ]);

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2(99, 99);
    let pointerActive = false;
    let hoveredId: string | null = null;
    let targetYaw = 0;
    let targetPitch = 0;
    let curYaw = 0;
    let curPitch = 0;
    let pointerDownPos: { x: number; y: number } | null = null;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const updatePointerNdc = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      pointerActive = true;
    };

    const pickBillboardAtClient = (clientX: number, clientY: number): BillboardSpec | null => {
      updatePointerNdc(clientX, clientY);
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(hitMeshes, false);
      if (hits.length > 0) {
        const hitId = hits[0].object.userData.billboardId as string | undefined;
        if (hitId) {
          return billboardRecords.find((r) => r.spec.id === hitId)?.spec ?? null;
        }
      }
      return null;
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointerNdc(e.clientX, e.clientY);
      if (finePointer && !reducedRef.current) {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        targetYaw = nx * 0.09;
        targetPitch = -ny * 0.06;
      }
    };

    const onPointerLeave = () => {
      pointerActive = false;
      if (hoveredId !== null) {
        hoveredId = null;
        canvas.style.cursor = "default";
        canvas.dataset.hoveredBillboard = "";
        hoverCbRef.current(null);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!pointerDownPos) return;
      const distMoved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      pointerDownPos = null;
      if (distMoved > 8) return;

      const hit = pickBillboardAtClient(e.clientX, e.clientY);
      if (hit) {
        selectCbRef.current(hit);
      } else if (focusedIdRef.current !== null) {
        selectCbRef.current(null);
      }
    };

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown, { passive: true });
    canvas.addEventListener("pointerup", onPointerUp, { passive: true });

    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    let effectiveP = Math.max(0, Math.min(1, progress.get()));
    const currentCamPos = new THREE.Vector3();
    const currentLookAt = new THREE.Vector3();
    camPath.getPointAt(0.001, currentCamPos);
    camPath.getPointAt(0.035, currentLookAt);

    let rafId = 0;
    let lastTime = performance.now();
    const splinePos = new THREE.Vector3();
    const splineLook = new THREE.Vector3();
    const reticleNormal = new THREE.Vector3();

    const cMorningFog = new THREE.Color(0x284066);
    const cGoldenFog = new THREE.Color(0x4b2434);
    const cBlueFog = new THREE.Color(0x16224a);
    const cNightFog = new THREE.Color(0x0b1022);

    const cSunDay = new THREE.Color(0xffe8c8);
    const cSunGolden = new THREE.Color(0xff8e42);
    const cMoonBlue = new THREE.Color(0x6cc8ff);

    const renderFrame = (now: number) => {
      rafId = requestAnimationFrame(renderFrame);
      if (!isVisible) return;

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const elapsed = now * 0.001;

      const focusedId = focusedIdRef.current;
      const focusedRecord = focusedId
        ? billboardRecords.find((r) => r.spec.id === focusedId) ?? null
        : null;

      const manual = manualSceneRef.current;
      const desiredP = focusedRecord
        ? (focusedRecord.spec.sceneIdx + 0.35) / 6
        : manual !== null
        ? manual === 0
          ? 0.01
          : Math.min(0.95, (manual + 0.35) / 6)
        : Math.max(0, Math.min(1, progress.get()));

      const blend = 1 - Math.exp(-dt * (manual !== null || focusedRecord ? 5.5 : 14));
      effectiveP += (desiredP - effectiveP) * blend;

      skyUniforms.uTime.value = elapsed;
      skyUniforms.uProgress.value = effectiveP;
      roadUniforms.uTime.value = elapsed;
      roadUniforms.uProgress.value = effectiveP;
      waterUniforms.uTime.value = elapsed;

      // Dynamic lighting, atmospheric fog & selective bloom curve across zones
      if (effectiveP < 0.38) {
        const k = effectiveP / 0.38;
        fog.color.lerpColors(cMorningFog, cGoldenFog, k);
        dirLight.color.lerpColors(cSunDay, cSunGolden, k);
        dirLight.intensity = 1.85 - k * 0.35;
      } else if (effectiveP < 0.68) {
        const k = (effectiveP - 0.38) / 0.3;
        fog.color.lerpColors(cGoldenFog, cBlueFog, k);
        dirLight.color.lerpColors(cSunGolden, cMoonBlue, k);
        dirLight.intensity = 1.5 - k * 0.35;
      } else {
        const k = (effectiveP - 0.68) / 0.32;
        fog.color.lerpColors(cBlueFog, cNightFog, k);
        dirLight.color.copy(cMoonBlue);
        dirLight.intensity = 1.15 - k * 0.2;
      }

      // Sunbeams fade softly away before twilight
      sunbeamMat.opacity = Math.max(0, 1 - effectiveP / 0.42) * 0.13;
      bloomPass.strength = 0.4 + effectiveP * 0.16;
      fireflyMat.opacity = 0.25 + effectiveP * 0.62;

      facadeMaterials.forEach((fm, idx) => {
        fm.emissiveIntensity = 0.26 + effectiveP * 0.58 + Math.sin(elapsed + idx) * 0.03;
      });
      kanjiMats.forEach((km, idx) => {
        km.emissiveIntensity = 0.85 + effectiveP * 0.65 + Math.sin(elapsed * 2.2 + idx * 1.1) * 0.15;
      });

      // Camera spline vs billboard close-up focus
      if (focusedRecord) {
        const camDamp = 1 - Math.exp(-dt * 5.2);
        currentCamPos.lerp(focusedRecord.inspectCamPos, camDamp);
        currentLookAt.lerp(focusedRecord.inspectLookAt, camDamp);
        camera.position.copy(currentCamPos);
        camera.lookAt(currentLookAt);
      } else {
        const t = Math.max(0.001, Math.min(0.996, effectiveP));
        camPath.getPointAt(t, splinePos);
        camPath.getPointAt(Math.min(0.999, t + 0.032), splineLook);

        if (!reducedRef.current) {
          splinePos.y += Math.sin(effectiveP * Math.PI * 30) * 0.11;
          splinePos.x += Math.cos(effectiveP * Math.PI * 15) * 0.08;
        }

        const lookDamp = 1 - Math.exp(-dt * 7);
        curYaw += (targetYaw - curYaw) * lookDamp;
        curPitch += (targetPitch - curPitch) * lookDamp;

        splineLook.x += Math.sin(curYaw) * 6.0;
        splineLook.y += curPitch * 5.0 + 0.18;

        const returnDamp = 1 - Math.exp(-dt * 9);
        currentCamPos.lerp(splinePos, returnDamp);
        currentLookAt.lerp(splineLook, returnDamp);

        camera.position.copy(currentCamPos);
        camera.lookAt(currentLookAt);
        if (!reducedRef.current) {
          camera.rotation.z += Math.sin(effectiveP * Math.PI * 15) * 0.006;
        }
      }

      // Raycast pointer hover over billboards
      if (pointerActive) {
        raycaster.setFromCamera(pointerNdc, camera);
        const hits = raycaster.intersectObjects(hitMeshes, false);
        const nextHoverId =
          hits.length > 0 ? ((hits[0].object.userData.billboardId as string) ?? null) : null;
        if (nextHoverId !== hoveredId) {
          hoveredId = nextHoverId;
          canvas.style.cursor = nextHoverId ? "pointer" : "default";
          canvas.dataset.hoveredBillboard = nextHoverId ?? "";
          const spec = nextHoverId
            ? billboardRecords.find((r) => r.spec.id === nextHoverId)?.spec ?? null
            : null;
          hoverCbRef.current(spec);
        }
      }

      // Animate billboards, holographic sweeps & 3D lock-on reticle
      const glowDamp = 1 - Math.exp(-dt * 10);
      let activeReticleRecord: InteractiveBoardRecord | null = null;
      for (const rec of billboardRecords) {
        const active = rec.spec.id === hoveredId || rec.spec.id === focusedId;
        rec.hoverAmount += ((active ? 1 : 0) - rec.hoverAmount) * glowDamp;
        const s = 1 + rec.hoverAmount * 0.045;
        rec.group.scale.setScalar(s);
        rec.ledMat.emissiveIntensity = 1.2 + rec.hoverAmount * 1.4 + Math.sin(elapsed * 2.4) * 0.12;
        rec.sweepUniforms.uTime.value = elapsed;
        rec.sweepUniforms.uBoost.value = rec.hoverAmount;
        if (rec.spec.id === hoveredId && rec.spec.id !== focusedId) {
          activeReticleRecord = rec;
        }
      }

      if (activeReticleRecord) {
        reticleGroup.visible = true;
        reticleGroup.position.copy(activeReticleRecord.group.position);
        reticleNormal.set(
          Math.sin(activeReticleRecord.spec.rotationY),
          0,
          Math.cos(activeReticleRecord.spec.rotationY)
        );
        reticleGroup.position.addScaledVector(reticleNormal, 0.34);
        reticleGroup.rotation.set(0, activeReticleRecord.spec.rotationY, 0);
        const rScale = Math.min(activeReticleRecord.spec.width, activeReticleRecord.spec.height) * 0.56;
        reticleGroup.scale.setScalar(rScale * (1 + Math.sin(elapsed * 4.5) * 0.03));
        reticleRingA.rotation.z = elapsed * 0.85;
        reticleRingB.rotation.z = -elapsed * 1.15;
      } else {
        reticleGroup.visible = false;
      }

      // Animate Quant Bid/Ask orderbook columns & traveling data packets
      for (let i = 0; i < 32; i++) {
        const zBar = -103 - i * 1.25;
        const hBid = 1.9 + Math.sin(elapsed * 2.4 + i * 0.5) * 1.25 + Math.cos(i) * 0.4;
        const hAsk = 1.9 + Math.cos(elapsed * 2.6 + i * 0.5) * 1.25 + Math.sin(i) * 0.4;
        dummy.rotation.set(0, 0, 0);
        dummy.position.set(-7.3, hBid / 2 + 0.1, zBar);
        dummy.scale.set(1, hBid, 1);
        dummy.updateMatrix();
        bidBars.setMatrixAt(i, dummy.matrix);

        dummy.position.set(7.3, hAsk / 2 + 0.1, zBar);
        dummy.scale.set(1, hAsk, 1);
        dummy.updateMatrix();
        askBars.setMatrixAt(i, dummy.matrix);
      }
      bidBars.instanceMatrix.needsUpdate = true;
      askBars.instanceMatrix.needsUpdate = true;

      packetOrbs.forEach((p, idx) => {
        const u = (elapsed * p.speed + p.offset) % 1;
        const t = idx % 2 === 0 ? u : 1 - u;
        p.curve.getPointAt(t, p.mesh.position);
      });

      rotatingSculptures.forEach((s, i) => {
        s.group.rotation.y = elapsed * (0.48 + i * 0.08);
        s.group.rotation.x = Math.sin(elapsed * 0.7 + i) * 0.22;
        s.ringA.rotation.z = elapsed * 1.1;
        s.ringB.rotation.z = -elapsed * 0.9;
      });
      fheCrystal.rotation.y = elapsed * 0.55;
      orbitalRing.rotation.z = elapsed * 0.75;
      orbitalRing2.rotation.z = -elapsed * 0.62;
      orbitalRing3.rotation.y = elapsed * 0.85;

      // Zipping roadside cyber light ribbons
      speedRibbonData.forEach((sr) => {
        const travel = (elapsed * sr.speed + sr.offset) % 248;
        sr.mesh.position.set(sr.baseX, sr.baseY, 14 - travel);
      });

      // Multi-hue maple & sakura petals
      for (let i = 0; i < petalCount; i++) {
        const pd = petalData[i];
        const fall = (elapsed * pd.speed * 0.55 + pd.phase) % 8.5;
        dummy.position.set(
          pd.x + Math.sin(elapsed * 0.9 + pd.phase) * 0.9,
          Math.max(0.25, pd.y - fall + 4.5),
          pd.z
        );
        dummy.rotation.set(elapsed + pd.phase, elapsed * 0.85, pd.phase);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        petals.setMatrixAt(i, dummy.matrix);
      }
      petals.instanceMatrix.needsUpdate = true;

      // Drifting anime bokeh fireflies
      const posAttr = fireflyGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < fireflyCount; i++) {
        const fs = fireflySeeds[i];
        posAttr.setXYZ(
          i,
          fs.sx + Math.sin(elapsed * 0.7 + fs.phase) * 0.85,
          fs.sy + ((elapsed * 0.45 + fs.phase) % 5.5),
          fs.sz + Math.cos(elapsed * 0.5 + fs.phase) * 0.6
        );
      }
      posAttr.needsUpdate = true;

      canvas.dataset.cameraZ = camera.position.z.toFixed(1);
      canvas.dataset.lookX = currentLookAt.x.toFixed(2);
      canvas.dataset.worldProgress = effectiveP.toFixed(3);
      canvas.dataset.focusedBillboard = focusedId ?? "";

      composer.render();
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      bloomPass.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, [progress, onWebGLReady]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute inset-0 z-0"
    >
      <canvas
        ref={canvasRef}
        data-webgl-world="true"
        data-focused-billboard={focusedBillboardId ?? ""}
        aria-label="Interactive 3D anime world of Jobjab studio signs"
        className="block h-full w-full"
      />
    </div>
  );
}
