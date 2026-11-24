"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
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
      p *= 2.05;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 dir = normalize(vWorldPos);
    float h = clamp(dir.y, 0.0, 1.0);

    float wGolden = smoothstep(0.18, 0.42, uProgress);
    float wBlue = smoothstep(0.42, 0.68, uProgress);
    float wNight = smoothstep(0.68, 0.92, uProgress);

    vec3 z0 = vec3(0.16, 0.46, 0.78);
    vec3 h0 = vec3(0.66, 0.84, 0.96);

    vec3 z1 = vec3(0.14, 0.28, 0.56);
    vec3 h1 = vec3(0.92, 0.52, 0.24);

    vec3 z2 = vec3(0.08, 0.14, 0.30);
    vec3 h2 = vec3(0.24, 0.36, 0.58);

    vec3 z3 = vec3(0.04, 0.05, 0.09);
    vec3 h3 = vec3(0.08, 0.12, 0.20);

    vec3 zenith = mix(mix(mix(z0, z1, wGolden), z2, wBlue), z3, wNight);
    vec3 horizon = mix(mix(mix(h0, h1, wGolden), h2, wBlue), h3, wNight);

    vec3 sky = mix(horizon, zenith, pow(h, 0.55));

    if (dir.y > 0.02) {
      vec2 cloudUv = dir.xz / (dir.y + 0.28) * 1.45 + vec2(uTime * 0.008, -uProgress * 0.65);
      float n = fbm(cloudUv);
      float cloudMask = smoothstep(0.47, 0.76, n) * smoothstep(0.02, 0.22, dir.y) * smoothstep(0.92, 0.32, dir.y);
      vec3 cMorning = vec3(0.98, 0.95, 0.89);
      vec3 cGolden = vec3(0.98, 0.76, 0.52);
      vec3 cBlue = vec3(0.46, 0.56, 0.76);
      vec3 cNight = vec3(0.14, 0.18, 0.27);
      vec3 cloudCol = mix(mix(mix(cMorning, cGolden, wGolden), cBlue, wBlue), cNight, wNight);
      sky = mix(sky, cloudCol, cloudMask * mix(0.82, 0.38, wNight));
    }

    vec3 sunDir = normalize(mix(vec3(0.18, 0.44, -0.88), vec3(-0.12, 0.22, -0.96), wGolden));
    float sunDot = max(dot(dir, sunDir), 0.0);
    float sunGlow = pow(sunDot, 16.0) * (1.0 - wBlue) * 0.55 + pow(sunDot, 120.0) * (1.0 - wBlue) * 0.85;
    sky += vec3(0.98, 0.68, 0.32) * sunGlow;

    if (wNight > 0.05) {
      float starCell = hash(floor(dir.xy * 180.0 + dir.z * 90.0));
      float starBright = smoothstep(0.992, 1.0, starCell) * smoothstep(0.06, 0.4, dir.y);
      float twinkle = 0.7 + 0.3 * sin(uTime * 2.4 + starCell * 60.0);
      sky += vec3(0.97, 0.95, 0.89) * starBright * twinkle * wNight * 0.9;

      vec3 moonDir = normalize(vec3(0.24, 0.34, -0.91));
      float dMain = length(dir - moonDir);
      float dCut = length(dir - normalize(moonDir + vec3(0.016, 0.012, 0.0)));
      float crescent = smoothstep(0.036, 0.030, dMain) * (1.0 - smoothstep(0.033, 0.027, dCut));
      float moonHalo = exp(-dMain * 18.0) * 0.24;
      sky += vec3(0.97, 0.94, 0.86) * (crescent + moonHalo) * wNight;
    }

    gl_FragColor = vec4(sky, 1.0);
  }
`;

function createAnimeDigitalTexture(
  spec: BillboardSpec,
  disposables: THREE.Texture[],
  compactPlaque = false
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = compactPlaque ? 240 : 340;
  const ctx = canvas.getContext("2d");

  const accent = spec.accent === "cerulean" ? "#82c4e6" : "#ec7a26";
  const accentSoft =
    spec.accent === "cerulean" ? "rgba(130, 196, 230, 0.14)" : "rgba(236, 122, 38, 0.14)";

  if (ctx) {
    ctx.fillStyle = "#11151e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle glowing radial wash inside screen corner
    const grad = ctx.createRadialGradient(120, 48, 10, 120, 48, 420);
    grad.addColorStop(0, accentSoft);
    grad.addColorStop(1, "rgba(11, 14, 19, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stylized anime digital scanlines
    ctx.fillStyle = "rgba(248, 241, 227, 0.035)";
    for (let y = 0; y < canvas.height; y += 6) {
      ctx.fillRect(0, y, canvas.width, 2);
    }

    // Outer & inner neon-ivory broadcast frame
    ctx.strokeStyle = "rgba(248, 241, 227, 0.28)";
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    // Targeting brackets at all 4 inner corners
    ctx.strokeStyle = accent;
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

    // Top digital broadcast bar
    ctx.fillStyle = "#0b0e13";
    ctx.fillRect(16, 16, canvas.width - 32, 42);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(38, 37, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = accent;
    ctx.font = "600 20px monospace";
    ctx.fillText(`${spec.channel} · ${spec.jpTag}`, 56, 44);

    ctx.fillStyle = "#9da4b4";
    ctx.font = "500 18px monospace";
    const clickHint = "HOVER / CLICK ↗";
    const hintW = ctx.measureText(clickHint).width;
    ctx.fillText(clickHint, canvas.width - hintW - 32, 44);

    // Quant miniature chart / signal bars on non-compact telemetry signs
    if (!compactPlaque && spec.kind === "quant") {
      const bars = [26, 42, 34, 58, 48, 72, 62, 44, 68, 52];
      bars.forEach((bh, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? "#ec7a26" : "#82c4e6";
        ctx.fillRect(canvas.width - 210 + idx * 17, 178 - bh, 11, bh);
      });
    } else if (!compactPlaque) {
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = i < 4 ? accent : "rgba(248, 241, 227, 0.2)";
        ctx.fillRect(canvas.width - 140 + i * 16, 148 - i * 8, 9, 26 + i * 8);
      }
    }

    // Auto-scaled main title (guaranteed zero clipping)
    const maxTitleW = compactPlaque ? canvas.width - 72 : canvas.width - 245;
    let titleSize = compactPlaque ? 46 : 52;
    ctx.fillStyle = "#f8f1e3";
    ctx.font = `600 ${titleSize}px Georgia, serif`;
    while (ctx.measureText(spec.title).width > maxTitleW && titleSize > 24) {
      titleSize -= 2;
      ctx.font = `600 ${titleSize}px Georgia, serif`;
    }
    ctx.fillText(spec.title, 34, compactPlaque ? 132 : 146);

    // Subtitle metadata strip
    ctx.fillStyle = "#dfd7c8";
    ctx.font = "500 20px monospace";
    let subText = spec.subtitle;
    while (ctx.measureText(subText).width > canvas.width - 72 && subText.length > 18) {
      subText = `${subText.slice(0, -4)}...`;
    }
    ctx.fillText(subText, 34, compactPlaque ? 182 : 206);

    if (!compactPlaque) {
      ctx.fillStyle = accent;
      ctx.fillRect(34, 246, canvas.width - 68, 2);
      ctx.fillStyle = "#9da4b4";
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

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
    const fog = new THREE.FogExp2(0x1e2c42, 0.0085);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(
      54,
      container.clientWidth / Math.max(1, container.clientHeight),
      0.1,
      620
    );

    const setSize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const aspect = w / Math.max(1, h);
      renderer.setSize(w, h, false);
      camera.fov = aspect < 0.9 ? 68 : 54;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };
    setSize();

    const hemiLight = new THREE.HemisphereLight(0xaad2f0, 0x263145, 1.35);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffe1b8, 1.65);
    dirLight.position.set(22, 34, -40);
    scene.add(dirLight);

    // 1. Dynamic Makoto Shinkai Anime Sky Dome
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

    // 2. Unbroken Dark-Slate Promenade & Avenue Roadway (Z = +20 -> -260)
    const roadMat = trackMat(
      new THREE.MeshStandardMaterial({ color: 0x121722, roughness: 0.72, metalness: 0.18 })
    );
    const roadMesh = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(16, 0.4, 286)), roadMat);
    roadMesh.position.set(0, -0.2, -122);
    scene.add(roadMesh);

    const walkMat = trackMat(
      new THREE.MeshStandardMaterial({ color: 0x1a202d, roughness: 0.82, metalness: 0.1 })
    );
    const leftSidewalk = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(10, 0.56, 286)), walkMat);
    leftSidewalk.position.set(-13, -0.1, -122);
    const rightSidewalk = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(10, 0.56, 286)), walkMat);
    rightSidewalk.position.set(13, -0.1, -122);
    scene.add(leftSidewalk, rightSidewalk);

    const stripeMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xdfd7c8 }));
    const stripeInst = new THREE.InstancedMesh(trackGeo(new THREE.BoxGeometry(0.18, 0.02, 2.8)), stripeMat, 42);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 42; i++) {
      dummy.position.set(0, 0.015, 14 - i * 5.2);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      stripeInst.setMatrixAt(i, dummy.matrix);
    }
    scene.add(stripeInst);

    const bollardMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xec7a26 }));
    const bollardInst = new THREE.InstancedMesh(trackGeo(new THREE.CylinderGeometry(0.08, 0.1, 0.85, 8)), bollardMat, 64);
    for (let i = 0; i < 32; i++) {
      const zPos = 8 - i * 7.2;
      dummy.position.set(-8.1, 0.55, zPos);
      dummy.updateMatrix();
      bollardInst.setMatrixAt(i * 2, dummy.matrix);
      dummy.position.set(8.1, 0.55, zPos);
      dummy.updateMatrix();
      bollardInst.setMatrixAt(i * 2 + 1, dummy.matrix);
    }
    scene.add(bollardInst);

    // 3. Flanking Architectural Towers & Autumn Maple Trees
    const towerMat = trackMat(
      new THREE.MeshStandardMaterial({ color: 0x202736, roughness: 0.65, metalness: 0.25 })
    );
    const towerWindowMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x2d3546,
        emissive: new THREE.Color(0xec7a26),
        emissiveIntensity: 0.18,
        roughness: 0.35,
      })
    );
    for (let i = 0; i < 16; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = 4 - i * 11.5;
      const h = 22 + ((i * 7) % 18);
      const w = 8.5 + (i % 3) * 2.2;
      const b = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(w, h, 7.6)), towerMat);
      b.position.set(side * (16.5 + (i % 2) * 2.5), h / 2 - 0.1, z);
      scene.add(b);

      const pane = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(w * 0.72, h * 0.74)), towerWindowMat);
      pane.position.set(side * (16.5 + (i % 2) * 2.5 - 3.85), h / 2, z);
      pane.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      scene.add(pane);
    }

    const trunkMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x3b2c23, roughness: 0.9 }));
    const mapleMatA = trackMat(new THREE.MeshStandardMaterial({ color: 0xec7a26, roughness: 0.85 }));
    const mapleMatB = trackMat(new THREE.MeshStandardMaterial({ color: 0xd86919, roughness: 0.85 }));
    for (let i = 0; i < 14; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = 6 - i * 6.8;
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.18, 0.26, 3.8, 7)), trunkMat);
      trunk.position.y = 1.9;
      tree.add(trunk);

      const crownA = new THREE.Mesh(trackGeo(new THREE.IcosahedronGeometry(2.15, 1)), i % 3 === 0 ? mapleMatB : mapleMatA);
      crownA.position.set(0, 4.4, 0);
      crownA.scale.set(1.15, 0.85, 1.1);
      tree.add(crownA);

      const crownB = new THREE.Mesh(trackGeo(new THREE.IcosahedronGeometry(1.5, 1)), mapleMatA);
      crownB.position.set(side * 0.9, 5.2, 0.4);
      tree.add(crownB);

      tree.position.set(side * 9.8, 0.1, z);
      scene.add(tree);
    }

    const wireMat = trackMat(new THREE.MeshBasicMaterial({ color: 0x171d29 }));
    for (const wz of [-16, -42, -74, -108, -148]) {
      const wireCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-12, 8.6, wz),
        new THREE.Vector3(0, 7.6, wz - 0.6),
        new THREE.Vector3(12, 8.6, wz),
      ]);
      scene.add(new THREE.Mesh(trackGeo(new THREE.TubeGeometry(wireCurve, 12, 0.025, 5, false)), wireMat));
    }

    // 4. Static Architectural Structures Flanking Zones (Arch Pillars, Sculptures, Bridge, Studio)
    const archDarkMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x11151e, roughness: 0.45, metalness: 0.5 }));
    const leftPillar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.9, 7.4, 1.1)), archDarkMat);
    leftPillar.position.set(-7.6, 3.7, -10);
    const rightPillar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.9, 7.4, 1.1)), archDarkMat);
    rightPillar.position.set(7.6, 3.7, -10);
    const archBeam = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(16.6, 1.1, 1.2)), archDarkMat);
    archBeam.position.set(0, 7.2, -10);
    scene.add(leftPillar, rightPillar, archBeam);

    // Live Quant Bid/Ask Bars (Zone 3)
    const barGeo = trackGeo(new THREE.BoxGeometry(0.82, 1, 0.82));
    const bidBarMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xec7a26,
        emissive: new THREE.Color(0xec7a26),
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.82,
      })
    );
    const askBarMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x82c4e6,
        emissive: new THREE.Color(0x82c4e6),
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.82,
      })
    );
    const bidBars = new THREE.InstancedMesh(barGeo, bidBarMat, 32);
    const askBars = new THREE.InstancedMesh(barGeo, askBarMat, 32);
    scene.add(bidBars, askBars);

    // Rotating Polyhedra & Pedestals (Zone 4)
    const rotatingSculptures: THREE.Group[] = [];
    const polyGeo = trackGeo(new THREE.IcosahedronGeometry(1.4, 1));
    const polyMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x171d29,
        emissive: new THREE.Color(0x82c4e6),
        emissiveIntensity: 0.24,
        roughness: 0.25,
        metalness: 0.65,
      })
    );
    const polyWireGeo = trackGeo(new THREE.EdgesGeometry(polyGeo));
    const polyWireMat = trackMat(new THREE.LineBasicMaterial({ color: 0xf8f1e3 }));
    const frameSlateMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x11151e, roughness: 0.4, metalness: 0.45 }));

    for (let idx = 0; idx < 4; idx++) {
      const side = idx % 2 === 0 ? -1 : 1;
      const z = -150 - idx * 9.5;
      const plinth = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(3.2, 0.9, 3.2)), frameSlateMat);
      plinth.position.set(side * 6.8, 0.45, z);
      scene.add(plinth);

      const sculpt = new THREE.Group();
      sculpt.add(new THREE.Mesh(polyGeo, polyMat), new THREE.LineSegments(polyWireGeo, polyWireMat));
      sculpt.position.set(side * 6.8, 3.55, z);
      scene.add(sculpt);
      rotatingSculptures.push(sculpt);
    }

    // Bridge, Water & Zama FHEVM Crystal Lattice (Zone 5)
    const waterMesh = new THREE.Mesh(
      trackGeo(new THREE.PlaneGeometry(240, 90)),
      trackMat(new THREE.MeshStandardMaterial({ color: 0x0b101b, roughness: 0.16, metalness: 0.85 }))
    );
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, -1.6, -214);
    scene.add(waterMesh);

    const glowBarAmber = trackMat(new THREE.MeshBasicMaterial({ color: 0xec7a26 }));
    const pylonMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x1a2232, roughness: 0.45, metalness: 0.55 }));
    const cableMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xdfd7c8 }));
    for (const pz of [-196, -228]) {
      for (const side of [-8.8, 8.8]) {
        const pylon = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(1.1, 22, 1.2)), pylonMat);
        pylon.position.set(side, 9.5, pz);
        scene.add(pylon);
        const cap = new THREE.Mesh(trackGeo(new THREE.SphereGeometry(0.24, 8, 8)), glowBarAmber);
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
        const hanger = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.025, 0.025, hangerH, 5)), cableMat);
        hanger.position.set(side, 0.4 + hangerH / 2, sz);
        scene.add(hanger);
      }
    }

    const fheCrystal = new THREE.Group();
    const outerOctaGeo = trackGeo(new THREE.OctahedronGeometry(2.7, 0));
    const outerEdges = new THREE.LineSegments(
      trackGeo(new THREE.EdgesGeometry(outerOctaGeo)),
      trackMat(new THREE.LineBasicMaterial({ color: 0x82c4e6 }))
    );
    const innerCore = new THREE.Mesh(
      trackGeo(new THREE.OctahedronGeometry(1.35, 0)),
      trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xec7a26,
          emissive: new THREE.Color(0xec7a26),
          emissiveIntensity: 1.2,
          roughness: 0.2,
        })
      )
    );
    const orbitalRing = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(3.4, 0.045, 8, 48)),
      trackMat(new THREE.MeshBasicMaterial({ color: 0xf8f1e3 }))
    );
    orbitalRing.rotation.x = Math.PI / 3;
    fheCrystal.add(outerEdges, innerCore, orbitalRing);
    fheCrystal.position.set(0, 6.3, -212);
    scene.add(fheCrystal);

    // Midnight Glass Studio Structure (Zone 6)
    const studioGroup = new THREE.Group();
    const woodFloorMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x1e1712, roughness: 0.42, metalness: 0.15 }));
    const studioFloor = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(19, 0.25, 26)), woodFloorMat);
    studioFloor.position.set(0, 0.12, -243);
    studioGroup.add(studioFloor);

    const mullionMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x11151e, roughness: 0.35, metalness: 0.7 }));
    for (const mx of [-8.8, -4.4, 0, 4.4, 8.8]) {
      const m = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.18, 9.5, 0.22)), mullionMat);
      m.position.set(mx, 4.75, -254);
      studioGroup.add(m);
    }
    const studioCeiling = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(20, 0.4, 26)), mullionMat);
    studioCeiling.position.set(0, 9.4, -243);
    studioGroup.add(studioCeiling);

    const deskMesh = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(3.6, 0.14, 1.6)), woodFloorMat);
    deskMesh.position.set(3.8, 1.45, -248);
    studioGroup.add(deskMesh);

    const lampHead = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.75, 0.08, 0.16)), glowBarAmber);
    lampHead.position.set(4.8, 2.35, -248);
    studioGroup.add(lampHead);

    const deskLight = new THREE.PointLight(0xec7a26, 12, 16);
    deskLight.position.set(4.6, 2.2, -248);
    studioGroup.add(deskLight);

    const distantMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x141d2e, roughness: 0.72 }));
    const distantLitAmber = trackMat(new THREE.MeshBasicMaterial({ color: 0xec7a26 }));
    const distantLitSky = trackMat(new THREE.MeshBasicMaterial({ color: 0x82c4e6 }));
    for (let i = 0; i < 20; i++) {
      const dx = -38 + i * 4.1;
      const dz = -275 - (i % 4) * 10;
      const dh = 14 + ((i * 11) % 24);
      const t = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(3.2, dh, 3.2)), distantMat);
      t.position.set(dx, dh / 2 - 4, dz);
      studioGroup.add(t);

      for (let row = 0; row < 4; row++) {
        const winStrip = new THREE.Mesh(
          trackGeo(new THREE.PlaneGeometry(2.2, 0.28)),
          (i + row) % 3 === 0 ? distantLitAmber : distantLitSky
        );
        winStrip.position.set(dx, 2.0 + row * 3.1, dz + 1.62);
        studioGroup.add(winStrip);
      }

      if (i % 2 === 0) {
        const beacon = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.4, 0.4, 0.4)), distantLitAmber);
        beacon.position.set(dx, dh - 3.8, dz + 1.5);
        studioGroup.add(beacon);
      }
    }
    scene.add(studioGroup);

    // ============================================================
    // 5. ALL 18 INTERACTIVE ANIME DIGITAL BILLBOARDS + RAYCAST TARGETS
    // ============================================================
    const texLoader = new THREE.TextureLoader();
    const billboardRecords: InteractiveBoardRecord[] = [];
    const hitMeshes: THREE.Mesh[] = [];
    const worldUp = new THREE.Vector3(0, 1, 0);

    ANIME_BILLBOARDS.forEach((spec) => {
      const group = new THREE.Group();
      group.position.set(spec.position[0], spec.position[1], spec.position[2]);
      group.rotation.y = spec.rotationY;

      const accentHex = spec.accent === "cerulean" ? 0x82c4e6 : 0xec7a26;
      const ledMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: accentHex,
          emissive: new THREE.Color(accentHex),
          emissiveIntensity: 0.65,
          roughness: 0.25,
        })
      );

      // Cabinet housing
      const housing = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(spec.width + 0.24, spec.height + 0.24, 0.34)),
        frameSlateMat
      );
      group.add(housing);

      // Glowing top and bottom anime LED neon edges
      const topLed = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(spec.width + 0.3, 0.08, 0.38)),
        ledMat
      );
      topLed.position.y = spec.height / 2 + 0.1;
      const bottomLed = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(spec.width + 0.3, 0.08, 0.38)),
        ledMat
      );
      bottomLed.position.y = -spec.height / 2 - 0.1;
      group.add(topLed, bottomLed);

      // Vertical support stanchion anchored to ground for roadside boards
      if (spec.kind === "quant" || spec.kind === "flagship") {
        const postHeight = Math.max(0.5, spec.position[1] - spec.height / 2 + 0.2);
        const post = new THREE.Mesh(
          trackGeo(new THREE.BoxGeometry(0.28, postHeight, 0.28)),
          pylonMat
        );
        post.position.set(0, -spec.height / 2 - postHeight / 2, -0.08);
        group.add(post);
      }

      if (spec.kind === "flagship" && spec.plateKey) {
        // Real loaded project preview inside digital frame + compact digital caption plaque below
        const plateSrc = PLATE_SRCS[spec.plateKey];
        const screenMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xf8f1e3 }));
        texLoader.load(plateSrc, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          textures.push(tex);
          screenMat.map = tex;
          screenMat.color.setHex(0xffffff);
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
          trackMat(new THREE.MeshBasicMaterial({ map: capTex }))
        );
        plaque.position.set(0, -spec.height * 0.34, 0.19);
        group.add(plaque);
      } else {
        const screenTex = createAnimeDigitalTexture(spec, textures, false);
        const screen = new THREE.Mesh(
          trackGeo(new THREE.PlaneGeometry(spec.width - 0.22, spec.height - 0.22)),
          trackMat(new THREE.MeshBasicMaterial({ map: screenTex }))
        );
        screen.position.set(0, 0, 0.19);
        group.add(screen);
      }

      // Dedicated clean front-face raycast target mesh
      const hitMesh = new THREE.Mesh(
        trackGeo(new THREE.PlaneGeometry(spec.width + 0.5, spec.height + 0.5)),
        trackMat(new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }))
      );
      hitMesh.position.set(0, 0, 0.24);
      hitMesh.userData = { billboardId: spec.id };
      group.add(hitMesh);

      scene.add(group);
      hitMeshes.push(hitMesh);

      // Compute ideal eye-level inspection camera position & left-of-drawer lookAt target
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
      // Shift camera gaze slightly toward screen-right so the billboard sits unobstructed left-of-drawer
      const rightOffset = spec.kind === "studio" ? 0.55 : 1.05;
      const inspectLookAt = boardCenter.clone().addScaledVector(screenRight, rightOffset);
      inspectLookAt.y = lookY;

      billboardRecords.push({
        spec,
        group,
        hitMesh,
        ledMat,
        hoverAmount: 0,
        inspectCamPos,
        inspectLookAt,
      });
    });

    // ============================================================
    // 6. 260 INSTANCED 3D AUTUMN MAPLE PETALS
    // ============================================================
    const petalGeo = trackGeo(new THREE.OctahedronGeometry(0.14, 0));
    petalGeo.scale(1.2, 0.16, 1.6);
    const petalMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xec7a26 }));
    const petalCount = 260;
    const petals = new THREE.InstancedMesh(petalGeo, petalMat, petalCount);
    const petalData = Array.from({ length: petalCount }, (_, i) => ({
      x: ((i * 19) % 24) - 12,
      y: 1.5 + ((i * 7) % 10),
      z: 10 - i * 0.96,
      speed: 0.7 + (i % 5) * 0.25,
      phase: i * 0.63,
    }));
    scene.add(petals);

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
        targetYaw = -nx * 0.11;
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

    const cMorningFog = new THREE.Color(0x28405c);
    const cGoldenFog = new THREE.Color(0x3a241b);
    const cNightFog = new THREE.Color(0x0b0e13);

    const cSunDay = new THREE.Color(0xffebd1);
    const cSunGolden = new THREE.Color(0xf79948);
    const cMoonBlue = new THREE.Color(0x82c4e6);

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

      if (effectiveP < 0.45) {
        const k = effectiveP / 0.45;
        fog.color.lerpColors(cMorningFog, cGoldenFog, k);
        dirLight.color.lerpColors(cSunDay, cSunGolden, k);
        dirLight.intensity = 1.65 - k * 0.25;
      } else {
        const k = (effectiveP - 0.45) / 0.55;
        fog.color.lerpColors(cGoldenFog, cNightFog, k);
        dirLight.color.lerpColors(cSunGolden, cMoonBlue, k);
        dirLight.intensity = 1.4 - k * 0.45;
      }
      towerWindowMat.emissiveIntensity = 0.15 + effectiveP * 0.65;

      // Update camera: smooth turn-and-dolly to focused billboard OR walking spline
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

        splineLook.x += Math.sin(curYaw) * 8.0;
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

      // Animate billboard hover glow, pulse, and subtle pop scale
      const glowDamp = 1 - Math.exp(-dt * 10);
      for (const rec of billboardRecords) {
        const active = rec.spec.id === hoveredId || rec.spec.id === focusedId;
        rec.hoverAmount += ((active ? 1 : 0) - rec.hoverAmount) * glowDamp;
        const s = 1 + rec.hoverAmount * 0.045;
        rec.group.scale.setScalar(s);
        rec.ledMat.emissiveIntensity = 0.62 + rec.hoverAmount * 1.25 + Math.sin(elapsed * 2.4) * 0.08;
      }

      // Animate Quant orderbook liquidity bars (Zone 3)
      for (let i = 0; i < 32; i++) {
        const zBar = -103 - i * 1.25;
        const hBid = 1.8 + Math.sin(elapsed * 2.2 + i * 0.5) * 1.2 + Math.cos(i) * 0.4;
        const hAsk = 1.8 + Math.cos(elapsed * 2.4 + i * 0.5) * 1.2 + Math.sin(i) * 0.4;
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

      rotatingSculptures.forEach((s, i) => {
        s.rotation.y = elapsed * (0.45 + i * 0.08);
        s.rotation.x = Math.sin(elapsed * 0.6 + i) * 0.25;
      });
      fheCrystal.rotation.y = elapsed * 0.55;
      orbitalRing.rotation.z = elapsed * 0.7;

      for (let i = 0; i < petalCount; i++) {
        const pd = petalData[i];
        const fall = (elapsed * pd.speed * 0.55 + pd.phase) % 8.5;
        dummy.position.set(
          pd.x + Math.sin(elapsed * 0.9 + pd.phase) * 0.85,
          Math.max(0.25, pd.y - fall + 4.5),
          pd.z
        );
        dummy.rotation.set(elapsed + pd.phase, elapsed * 0.8, pd.phase);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        petals.setMatrixAt(i, dummy.matrix);
      }
      petals.instanceMatrix.needsUpdate = true;

      canvas.dataset.cameraZ = camera.position.z.toFixed(1);
      canvas.dataset.worldProgress = effectiveP.toFixed(3);
      canvas.dataset.focusedBillboard = focusedId ?? "";

      renderer.render(scene, camera);
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
