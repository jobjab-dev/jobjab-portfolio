"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { type MotionValue } from "framer-motion";
import { flagshipProjects } from "@/lib/portfolio-data";

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

    // Phase palettes: morning -> golden hour -> blue hour -> starlit midnight
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

    // Painterly anime cumulus cloud bands above horizon
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

    // Sun glow in morning/golden hour, transitioning to crescent moon at night
    vec3 sunDir = normalize(mix(vec3(0.18, 0.44, -0.88), vec3(-0.12, 0.22, -0.96), wGolden));
    float sunDot = max(dot(dir, sunDir), 0.0);
    float sunGlow = pow(sunDot, 16.0) * (1.0 - wBlue) * 0.55 + pow(sunDot, 120.0) * (1.0 - wBlue) * 0.85;
    sky += vec3(0.98, 0.68, 0.32) * sunGlow;

    if (wNight > 0.05) {
      // Twinkling anime starfield
      float starCell = hash(floor(dir.xy * 180.0 + dir.z * 90.0));
      float starBright = smoothstep(0.992, 1.0, starCell) * smoothstep(0.06, 0.4, dir.y);
      float twinkle = 0.7 + 0.3 * sin(uTime * 2.4 + starCell * 60.0);
      sky += vec3(0.97, 0.95, 0.89) * starBright * twinkle * wNight * 0.9;

      // Glowing ivory crescent moon ahead over harbor bridge
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

function createPlaqueTexture(
  title: string,
  subtitle: string,
  accentColor: string,
  disposables: THREE.Texture[]
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 192;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#11151e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(248, 241, 227, 0.28)";
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    ctx.fillStyle = accentColor;
    ctx.fillRect(4, 4, 8, canvas.height - 8);

    ctx.fillStyle = accentColor;
    ctx.font = "600 22px monospace";
    ctx.fillText(subtitle, 30, 56);

    ctx.fillStyle = "#f8f1e3";
    let titleSize = 40;
    ctx.font = `600 ${titleSize}px Georgia, serif`;
    while (ctx.measureText(title).width > canvas.width - 56 && titleSize > 22) {
      titleSize -= 2;
      ctx.font = `600 ${titleSize}px Georgia, serif`;
    }
    ctx.fillText(title, 30, 126);

    ctx.fillStyle = "#9da4b4";
    ctx.font = "400 18px monospace";
    ctx.fillText("JOBJAB · PRODUCTION SYSTEM", 30, 164);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  disposables.push(tex);
  return tex;
}

export function Jobjab3DWorld({
  progress,
  manualSceneIdx,
  reducedMotion,
  onWebGLReady,
}: Jobjab3DWorldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const manualSceneRef = useRef<number | null>(manualSceneIdx);
  const reducedRef = useRef<boolean>(reducedMotion);

  useEffect(() => {
    manualSceneRef.current = manualSceneIdx;
  }, [manualSceneIdx]);

  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [reducedMotion]);

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
    const fog = new THREE.FogExp2(0x1e2c42, 0.009);
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

    // Lighting rig synchronized to sky progression
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
    const skyDome = new THREE.Mesh(
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
    );
    scene.add(skyDome);

    // 2. Unbroken Dark-Slate Promenade & Avenue Roadway (Z = +20 -> -260)
    const roadMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x121722,
        roughness: 0.72,
        metalness: 0.18,
      })
    );
    const roadMesh = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(16, 0.4, 286)), roadMat);
    roadMesh.position.set(0, -0.2, -122);
    scene.add(roadMesh);

    const walkMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x1a202d,
        roughness: 0.82,
        metalness: 0.1,
      })
    );
    const leftSidewalk = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(10, 0.56, 286)), walkMat);
    leftSidewalk.position.set(-13, -0.1, -122);
    scene.add(leftSidewalk);

    const rightSidewalk = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(10, 0.56, 286)), walkMat);
    rightSidewalk.position.set(13, -0.1, -122);
    scene.add(rightSidewalk);

    // Crisp dashed center stripes & warm amber walkway bollards
    const stripeMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xdfd7c8 }));
    const stripeGeo = trackGeo(new THREE.BoxGeometry(0.18, 0.02, 2.8));
    const stripeInst = new THREE.InstancedMesh(stripeGeo, stripeMat, 42);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 42; i++) {
      dummy.position.set(0, 0.015, 14 - i * 5.2);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      stripeInst.setMatrixAt(i, dummy.matrix);
    }
    scene.add(stripeInst);

    const bollardGeo = trackGeo(new THREE.CylinderGeometry(0.08, 0.1, 0.85, 8));
    const bollardMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xec7a26 }));
    const bollardInst = new THREE.InstancedMesh(bollardGeo, bollardMat, 64);
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

    // 3. Flanking Architectural Towers & Autumn Maple Trees (Zone 1-4)
    const towerMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x202736,
        roughness: 0.65,
        metalness: 0.25,
      })
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

    // Autumn maple trees in Zones 1 & 2
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

    // Overhead anime catenary utility lines across the avenue
    const wireMat = trackMat(new THREE.MeshBasicMaterial({ color: 0x171d29 }));
    for (const wz of [-16, -42, -74, -108, -148]) {
      const wireCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-12, 8.6, wz),
        new THREE.Vector3(0, 7.6, wz - 0.6),
        new THREE.Vector3(12, 8.6, wz),
      ]);
      const wireMesh = new THREE.Mesh(trackGeo(new THREE.TubeGeometry(wireCurve, 12, 0.025, 5, false)), wireMat);
      scene.add(wireMesh);
    }

    // ============================================================
    // ZONE 1 (Z = -10): JOBJAB STUDIO ENTRANCE ARCHWAY
    // ============================================================
    const archGroup = new THREE.Group();
    const archDarkMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x11151e, roughness: 0.45, metalness: 0.5 }));
    const leftPillar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.9, 7.4, 1.1)), archDarkMat);
    leftPillar.position.set(-7.6, 3.7, 0);
    const rightPillar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.9, 7.4, 1.1)), archDarkMat);
    rightPillar.position.set(7.6, 3.7, 0);
    const archBeam = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(16.6, 1.1, 1.2)), archDarkMat);
    archBeam.position.set(0, 7.2, 0);
    archGroup.add(leftPillar, rightPillar, archBeam);

    const archSignTex = createPlaqueTexture(
      "JOBJAB · 37 SYSTEMS",
      "[ 創 ]  CREATIVE TECHNOLOGIST",
      "#ec7a26",
      textures
    );
    const archSign = new THREE.Mesh(
      trackGeo(new THREE.PlaneGeometry(8.8, 2.2)),
      trackMat(new THREE.MeshBasicMaterial({ map: archSignTex }))
    );
    archSign.position.set(0, 6.2, 0.65);
    archGroup.add(archSign);
    archGroup.position.set(0, 0, -10);
    scene.add(archGroup);

    // ============================================================
    // ZONE 2 (Z = -54 to -94): 6 ILLUMINATED FLAGSHIP MONOLITHS
    // ============================================================
    const texLoader = new THREE.TextureLoader();
    const frameSlateMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x11151e, roughness: 0.4, metalness: 0.45 }));
    const glowBarAmber = trackMat(new THREE.MeshBasicMaterial({ color: 0xec7a26 }));

    flagshipProjects.forEach((proj, idx) => {
      const side = idx % 2 === 0 ? -1 : 1;
      const z = -54 - idx * 8.0;
      const monolith = new THREE.Group();

      const backing = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(5.6, 4.6, 0.35)), frameSlateMat);
      backing.position.y = 2.85;
      monolith.add(backing);

      const trim = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(5.65, 0.08, 0.4)), glowBarAmber);
      trim.position.y = 0.56;
      monolith.add(trim);

      const plateSrc = PLATE_SRCS[proj.plateKey];
      const screenMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xf8f1e3 }));
      texLoader.load(plateSrc, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        textures.push(tex);
        screenMat.map = tex;
        screenMat.color.setHex(0xffffff);
        screenMat.needsUpdate = true;
      });
      const screen = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(5.05, 2.85)), screenMat);
      screen.position.set(0, 3.4, 0.19);
      monolith.add(screen);

      const plaqueTex = createPlaqueTexture(
        `${proj.index} · ${proj.title}`,
        proj.shortLabel.split("·")[1]?.trim().toUpperCase() || "FLAGSHIP RUNTIME",
        "#ec7a26",
        textures
      );
      const plaque = new THREE.Mesh(
        trackGeo(new THREE.PlaneGeometry(5.05, 1.15)),
        trackMat(new THREE.MeshBasicMaterial({ map: plaqueTex }))
      );
      plaque.position.set(0, 1.28, 0.19);
      monolith.add(plaque);

      monolith.position.set(side * 6.4, 0, z);
      monolith.rotation.y = side > 0 ? -0.44 : 0.44;
      scene.add(monolith);
    });

    // ============================================================
    // ZONE 3 (Z = -102 to -142): LIVE 3D QUANT ORDERBOOK PLAZA
    // ============================================================
    const barGeo = trackGeo(new THREE.BoxGeometry(0.82, 1, 0.82));
    const bidBarMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xec7a26,
        emissive: new THREE.Color(0xec7a26),
        emissiveIntensity: 0.42,
        transparent: true,
        opacity: 0.82,
      })
    );
    const askBarMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x82c4e6,
        emissive: new THREE.Color(0x82c4e6),
        emissiveIntensity: 0.42,
        transparent: true,
        opacity: 0.82,
      })
    );
    const bidBars = new THREE.InstancedMesh(barGeo, bidBarMat, 32);
    const askBars = new THREE.InstancedMesh(barGeo, askBarMat, 32);
    scene.add(bidBars, askBars);

    const venues = [
      { name: "HYPERLIQUID", sub: "ASYNC WS · LIQUIDITY BOT" },
      { name: "GRVT V2", sub: "ZK-PERP · DUAL EMA SKEW" },
      { name: "POLYMARKET", sub: "CLOB DUAL-QUOTING ENGINE" },
      { name: "PARADEX", sub: "STARKNET MULTI-PERP MM" },
      { name: "BACKPACK", sub: "SOLANA ED25519 VOLUME" },
      { name: "UNISWAP V3", sub: "ACTIVE LP ROLLING TICK" },
    ];
    venues.forEach((v, idx) => {
      const side = idx % 2 === 0 ? -1 : 1;
      const tex = createPlaqueTexture(v.name, v.sub, side < 0 ? "#ec7a26" : "#82c4e6", textures);
      const panel = new THREE.Mesh(
        trackGeo(new THREE.PlaneGeometry(4.4, 1.5)),
        trackMat(new THREE.MeshBasicMaterial({ map: tex }))
      );
      panel.position.set(side * 6.5, 5.2, -106 - idx * 6.4);
      panel.rotation.y = side > 0 ? -0.35 : 0.35;
      scene.add(panel);
    });

    // ============================================================
    // ZONE 4 (Z = -148 to -186): SAAS, FINTECH & GPU 3D DISTRICT
    // ============================================================
    const rotatingSculptures: THREE.Group[] = [];
    const saasDistrict = [
      { title: "JVAULT", sub: "CRYPTO TREASURY PAY" },
      { title: "POSKUB", sub: "CLOUD POS & PROMPTPAY" },
      { title: "TRELLIS 3D", sub: "PYTORCH CUDA RECON" },
      { title: "FASTCAPTION", sub: "WHISPER AI MEDIA" },
    ];
    const polyGeo = trackGeo(new THREE.IcosahedronGeometry(1.55, 1));
    const polyMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x171d29,
        emissive: new THREE.Color(0x82c4e6),
        emissiveIntensity: 0.2,
        roughness: 0.25,
        metalness: 0.65,
      })
    );
    const polyWireGeo = trackGeo(new THREE.EdgesGeometry(polyGeo));
    const polyWireMat = trackMat(new THREE.LineBasicMaterial({ color: 0xf8f1e3 }));

    saasDistrict.forEach((item, idx) => {
      const side = idx % 2 === 0 ? -1 : 1;
      const z = -150 - idx * 9.5;
      const plinth = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(3.2, 1.4, 3.2)), frameSlateMat);
      plinth.position.set(side * 6.6, 0.7, z);
      scene.add(plinth);

      const sculpt = new THREE.Group();
      const core = new THREE.Mesh(polyGeo, polyMat);
      const edges = new THREE.LineSegments(polyWireGeo, polyWireMat);
      sculpt.add(core, edges);
      sculpt.position.set(side * 6.6, 3.4, z);
      scene.add(sculpt);
      rotatingSculptures.push(sculpt);

      const tex = createPlaqueTexture(item.title, item.sub, "#82c4e6", textures);
      const sign = new THREE.Mesh(
        trackGeo(new THREE.PlaneGeometry(4.0, 1.35)),
        trackMat(new THREE.MeshBasicMaterial({ map: tex }))
      );
      sign.position.set(side * 5.0, 1.1, z);
      sign.rotation.y = side > 0 ? -0.45 : 0.45;
      scene.add(sign);
    });

    // ============================================================
    // ZONE 5 (Z = -194 to -226): MIDNIGHT BAY BRIDGE & ZAMA FHEVM VAULT
    // ============================================================
    const waterMesh = new THREE.Mesh(
      trackGeo(new THREE.PlaneGeometry(240, 90)),
      trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x0b101b,
          roughness: 0.16,
          metalness: 0.85,
        })
      )
    );
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, -1.6, -214);
    scene.add(waterMesh);

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
        const hanger = new THREE.Mesh(
          trackGeo(new THREE.CylinderGeometry(0.025, 0.025, hangerH, 5)),
          cableMat
        );
        hanger.position.set(side, 0.4 + hangerH / 2, sz);
        scene.add(hanger);
      }
    }

    // Floating Zama Homomorphic Encryption Crystal Lattice at [0, 6.2, -212]
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

    const zamaTex = createPlaqueTexture(
      "ZAMA $5,000 BOUNTY",
      "1ST PLACE · FHEVM-REACT-TEMPLATE",
      "#ec7a26",
      textures
    );
    const zamaSign = new THREE.Mesh(
      trackGeo(new THREE.PlaneGeometry(7.2, 2.0)),
      trackMat(new THREE.MeshBasicMaterial({ map: zamaTex }))
    );
    zamaSign.position.set(0, 10.6, -212);
    scene.add(zamaSign);

    // ============================================================
    // ZONE 6 (Z = -230 to -256): MIDNIGHT GLASS STUDIO OVERLOOK
    // ============================================================
    const studioGroup = new THREE.Group();
    const woodFloorMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x1e1712, roughness: 0.42, metalness: 0.15 }));
    const studioFloor = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(19, 0.25, 26)), woodFloorMat);
    studioFloor.position.set(0, 0.12, -243);
    studioGroup.add(studioFloor);

    // Glass doorway ribs + tall panoramic end window mullions
    const mullionMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x11151e, roughness: 0.35, metalness: 0.7 }));
    for (const mx of [-8.8, -4.4, 0, 4.4, 8.8]) {
      const m = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.18, 9.5, 0.22)), mullionMat);
      m.position.set(mx, 4.75, -254);
      studioGroup.add(m);
    }
    const studioCeiling = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(20, 0.4, 26)), mullionMat);
    studioCeiling.position.set(0, 9.4, -243);
    studioGroup.add(studioCeiling);

    // Architect desk on right with warm glowing amber lamp & slim monitor display
    const deskMesh = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(3.6, 0.14, 1.6)), woodFloorMat);
    deskMesh.position.set(3.8, 1.45, -248);
    studioGroup.add(deskMesh);

    const lampHead = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.75, 0.08, 0.16)), glowBarAmber);
    lampHead.position.set(4.8, 2.35, -248);
    studioGroup.add(lampHead);

    const deskLight = new THREE.PointLight(0xec7a26, 12, 16);
    deskLight.position.set(4.6, 2.2, -248);
    studioGroup.add(deskLight);

    const monitorTex = createPlaqueTexture(
      "ARCHIVE READY · 37 BUILDS",
      "MIDNIGHT STUDIO · SCROLL BELOW",
      "#ec7a26",
      textures
    );
    const monitorScreen = new THREE.Mesh(
      trackGeo(new THREE.PlaneGeometry(2.2, 1.05)),
      trackMat(new THREE.MeshBasicMaterial({ map: monitorTex }))
    );
    monitorScreen.position.set(3.3, 2.08, -248.1);
    monitorScreen.rotation.y = -0.3;
    studioGroup.add(monitorScreen);

    // Distant twilight-midnight skyline silhouettes with illuminated city window bands
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

      // Lit architectural window strips across skyline face
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
    // 260 INSTANCED 3D AUTUMN MAPLE PETALS ALONG THE CORRIDOR
    // ============================================================
    const petalGeo = trackGeo(new THREE.OctahedronGeometry(0.14, 0));
    petalGeo.scale(1.2, 0.16, 1.6);
    const petalMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xec7a26 }));
    const petalCount = 260;
    const petals = new THREE.InstancedMesh(petalGeo, petalMat, petalCount);
    const petalData = Array.from({ length: petalCount }, (_, i) => ({
      x: ((i * 19) % 24) - 12,
      y: 1.5 + ((i * 7) % 10),
      z: 10 - (i * 0.96),
      speed: 0.7 + (i % 5) * 0.25,
      phase: i * 0.63,
    }));
    scene.add(petals);

    // ============================================================
    // CONTINUOUS 3D FPS CAMERA SPLINE (Z = +12 -> -243)
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

    let targetYaw = 0;
    let targetPitch = 0;
    let curYaw = 0;
    let curPitch = 0;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const onPointerMove = (e: PointerEvent) => {
      if (!finePointer || reducedRef.current) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetYaw = -nx * 0.11;
      targetPitch = -ny * 0.06;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

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
    let rafId = 0;
    let lastTime = performance.now();
    const camPos = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();

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

      const manual = manualSceneRef.current;
      const desiredP =
        manual !== null
          ? manual === 0
            ? 0.01
            : Math.min(0.95, (manual + 0.35) / 6)
          : Math.max(0, Math.min(1, progress.get()));

      const blend = 1 - Math.exp(-dt * (manual !== null ? 5.5 : 14));
      effectiveP += (desiredP - effectiveP) * blend;

      skyUniforms.uTime.value = elapsed;
      skyUniforms.uProgress.value = effectiveP;

      // Synchronize fog and sun/moon directional lights seamlessly
      if (effectiveP < 0.45) {
        const k = effectiveP / 0.45;
        fog.color.lerpColors(cMorningFog, cGoldenFog, k);
        dirLight.color.lerpColors(cSunDay, cSunGolden, k);
        dirLight.intensity = 1.55 - k * 0.25;
      } else {
        const k = (effectiveP - 0.45) / 0.55;
        fog.color.lerpColors(cGoldenFog, cNightFog, k);
        dirLight.color.lerpColors(cSunGolden, cMoonBlue, k);
        dirLight.intensity = 1.3 - k * 0.45;
      }
      towerWindowMat.emissiveIntensity = 0.15 + effectiveP * 0.65;

      // Update camera spline + natural human gait bob & pointer lookaround
      const t = Math.max(0.001, Math.min(0.996, effectiveP));
      camPath.getPointAt(t, camPos);
      camPath.getPointAt(Math.min(0.999, t + 0.032), lookTarget);

      if (!reducedRef.current) {
        camPos.y += Math.sin(effectiveP * Math.PI * 30) * 0.11;
        camPos.x += Math.cos(effectiveP * Math.PI * 15) * 0.08;
      }

      const lookDamp = 1 - Math.exp(-dt * 7);
      curYaw += (targetYaw - curYaw) * lookDamp;
      curPitch += (targetPitch - curPitch) * lookDamp;

      lookTarget.x += Math.sin(curYaw) * 8.0;
      lookTarget.y += curPitch * 5.0 + 0.18;

      camera.position.copy(camPos);
      camera.lookAt(lookTarget);
      if (!reducedRef.current) {
        camera.rotation.z += Math.sin(effectiveP * Math.PI * 15) * 0.006;
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

      // Rotate Zone 4 polyhedra & Zone 5 Zama FHEVM crystal lattice
      rotatingSculptures.forEach((s, i) => {
        s.rotation.y = elapsed * (0.45 + i * 0.08);
        s.rotation.x = Math.sin(elapsed * 0.6 + i) * 0.25;
      });
      fheCrystal.rotation.y = elapsed * 0.55;
      orbitalRing.rotation.z = elapsed * 0.7;

      // Drift 260 autumn maple leaves gently across 3D wind channels
      for (let i = 0; i < petalCount; i++) {
        const pd = petalData[i];
        const fall = ((elapsed * pd.speed * 0.55 + pd.phase) % 8.5);
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

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [progress, onWebGLReady]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
    >
      <canvas
        ref={canvasRef}
        data-webgl-world="true"
        aria-hidden="true"
        className="block h-full w-full"
      />
    </div>
  );
}
