import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Canvas texture dimensions (Print magazine aspect ratio 1 : 1.3)
const CW = 900;
const CH = 1170;
const ASPECT = CH / CW;

// Editorial Color Palette for Canvas Textures
const C_PAPER = '#f4f1e9';
const C_INK = '#131313';
const C_INK_MUTED = '#47453f';
const C_INK_DIM = '#807b72';
const C_SPOT = '#ff4f1a';
const C_NIGHT = '#16171b';

// Helper: draw procedural paper grain
function applyPaperNoise(ctx: CanvasRenderingContext2D, bg = C_PAPER, intensity = 6) {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CW, CH);
  try {
    const imgData = ctx.getImageData(0, 0, CW, CH);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * intensity;
      d[i] += n;
      d[i + 1] += n;
      d[i + 2] += n;
    }
    ctx.putImageData(imgData, 0, 0);
  } catch {
    // fallback if security restriction
  }
}

// Helper: load image safely
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Helper: draw text with word wrapping
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 99
): number {
  const words = text.split(' ');
  let line = '';
  let count = 0;
  for (let n = 0; n < words.length; n++) {
    const testLine = line ? `${line} ${words[n]}` : words[n];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      if (++count >= maxLines) {
        ctx.fillText(line.replace(/[,.;:]?$/, '...'), x, y);
        return y + lineHeight;
      }
      ctx.fillText(line, x, y);
      line = words[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

// Page generator functions
async function createCoverPage(coverImg: HTMLImageElement | null): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = CW;
  canvas.height = CH;
  const ctx = canvas.getContext('2d')!;

  applyPaperNoise(ctx, C_NIGHT, 6);

  if (coverImg) {
    const h = 580;
    const sy = 280;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, sy, CW, h);
    ctx.clip();
    const scale = Math.max(CW / coverImg.width, h / coverImg.height);
    const nw = coverImg.width * scale;
    const nh = coverImg.height * scale;
    ctx.drawImage(coverImg, (CW - nw) / 2, sy + (h - nh) / 2, nw, nh);
    ctx.restore();

    // Top and bottom vignette
    const gTop = ctx.createLinearGradient(0, sy, 0, sy + 140);
    gTop.addColorStop(0, C_NIGHT);
    gTop.addColorStop(1, 'rgba(22, 23, 27, 0)');
    ctx.fillStyle = gTop;
    ctx.fillRect(0, sy, CW, 140);

    const gBot = ctx.createLinearGradient(0, sy + h - 160, 0, sy + h);
    gBot.addColorStop(0, 'rgba(22, 23, 27, 0)');
    gBot.addColorStop(1, C_NIGHT);
    ctx.fillStyle = gBot;
    ctx.fillRect(0, sy + h - 160, CW, 160);
  }

  // Masthead
  ctx.font = '800 240px Fraunces, serif';
  ctx.fillStyle = '#f4f1e9';
  ctx.letterSpacing = '-12px';
  ctx.fillText('IBRAHIM', 44, 230);
  const w = ctx.measureText('IBRAHIM').width;
  ctx.fillStyle = C_SPOT;
  ctx.fillText('.', 44 + w + 4, 230);
  ctx.letterSpacing = '0px';

  // Subheader
  ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(244, 241, 233, 0.75)';
  ctx.letterSpacing = '3px';
  ctx.fillText('ISSUE 01', 60, 275);
  ctx.textAlign = 'right';
  ctx.fillText('THE SYSTEMS EDITION  |  2026', CW - 60, 275);
  ctx.textAlign = 'left';
  ctx.letterSpacing = '0px';

  // Issue highlights
  const items = [
    ['01', 'Guardrail Lab: POSIX AST interceptor & 3D defense'],
    ['02', 'Job Hunter: Multi-source scraper & Playwright ATS auto-apply'],
    ['03', 'Eval-Agent: Forensic LLM-as-a-judge & trap detector'],
    ['04', 'SignalHarbor & WhatsApp: Production B2B & Meta agents'],
  ];

  let curY = 440;
  items.forEach(([num, desc]) => {
    ctx.font = 'italic 400 32px Fraunces, serif';
    ctx.fillStyle = C_SPOT;
    ctx.fillText(num, 60, curY);

    ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    wrapText(ctx, desc, 120, curY, 340, 32);
    curY += 92;
  });

  // Footer banner
  ctx.fillStyle = 'rgba(244, 241, 233, 0.2)';
  ctx.fillRect(60, 920, CW - 120, 2);

  ctx.font = '800 56px Fraunces, serif';
  ctx.fillStyle = '#f4f1e9';
  ctx.letterSpacing = '-2px';
  ctx.fillText('Ibrahim Hamid', 60, 990);
  ctx.letterSpacing = '0px';

  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(244, 241, 233, 0.75)';
  ctx.fillText('AI & Autonomous Agents  ·  POSIX Security  ·  Multi-Source Scraping', 60, 1030);

  // Faux Barcode
  let bx = CW - 220;
  for (let s = 0; s < 44; s++) {
    const bw = [2, 3, 5][(s * 7) % 3];
    ctx.fillStyle = '#f4f1e9';
    if (s % 2 === 0) ctx.fillRect(bx, 1050, bw, 58);
    bx += bw + 1;
  }
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(244, 241, 233, 0.6)';
  ctx.fillText('9 770000 202601', CW - 220, 1130);

  return canvas;
}

async function createContentsPage(): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = CW;
  canvas.height = CH;
  const ctx = canvas.getContext('2d')!;

  applyPaperNoise(ctx, C_PAPER);

  // Small Masthead
  ctx.font = '800 130px Fraunces, serif';
  ctx.fillStyle = C_INK;
  ctx.letterSpacing = '-6px';
  ctx.fillText('Ibrahim', 60, 160);
  const w = ctx.measureText('Ibrahim').width;
  ctx.fillStyle = C_SPOT;
  ctx.fillText('.', 60 + w + 2, 160);
  ctx.letterSpacing = '0px';

  ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = C_SPOT;
  ctx.letterSpacing = '3px';
  ctx.fillText('ISSUE 01  |  THE SYSTEMS EDITION', 60, 210);
  ctx.letterSpacing = '0px';

  ctx.fillStyle = C_INK;
  ctx.fillRect(60, 240, CW - 120, 2);

  ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = C_INK_DIM;
  ctx.letterSpacing = '2px';
  ctx.fillText('IN THIS ISSUE', 60, 290);
  ctx.letterSpacing = '0px';

  const chapters = [
    ['02', "Editor's letter", 'Software that keeps working unattended'],
    ['04', 'Guardrail Lab', 'POSIX AST interceptor & 3D WebGL simulator'],
    ['06', 'AI Job Hunter', 'Multi-source scraping & Playwright ATS auto-apply'],
    ['08', 'Eval-Agent', 'LLM-as-a-judge forensic scoring & adversarial traps'],
    ['10', 'SignalHarbor', 'Content-addressed evidence & B2B OSINT flightdeck'],
    ['12', 'WhatsApp AI', '24/7 Meta Cloud API booking concierge & RAG'],
    ['14', 'About & Handover', 'Nearly three years of shipping & credentials'],
  ];

  let y = 350;
  for (const [num, title, sub] of chapters) {
    ctx.font = '700 36px Fraunces, serif';
    ctx.fillStyle = C_SPOT;
    ctx.fillText(num, 60, y + 8);

    ctx.font = '700 28px Fraunces, serif';
    ctx.fillStyle = C_INK;
    ctx.fillText(title, 140, y);

    ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = C_INK_DIM;
    ctx.fillText(sub, 140, y + 28);

    ctx.fillStyle = 'rgba(19, 19, 19, 0.12)';
    ctx.fillRect(60, y + 48, CW - 120, 1);
    y += 82;
  }

  ctx.font = '500 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = C_INK_DIM;
  ctx.fillText('Every system in this issue is documented with live evidence, code and verification.', 60, CH - 70);

  // Folio
  ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('02  IBRAHIM. | CONTENTS', CW - 60, CH - 40);
  ctx.textAlign = 'left';

  return canvas;
}

async function createSpreadPage(
  title: string,
  chapter: string,
  kicker: string,
  bodyText: string,
  bullets: string[],
  statNum: string,
  statLabel: string,
  pageNum: number,
  side: 'left' | 'right'
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = CW;
  canvas.height = CH;
  const ctx = canvas.getContext('2d')!;

  applyPaperNoise(ctx, C_PAPER);

  // Kicker
  ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = C_SPOT;
  ctx.letterSpacing = '3px';
  ctx.fillText(chapter.toUpperCase(), 60, 95);
  ctx.letterSpacing = '0px';

  // Title
  ctx.font = '700 54px Fraunces, serif';
  ctx.fillStyle = C_INK;
  ctx.letterSpacing = '-1.5px';
  const afterTitleY = wrapText(ctx, title, 60, 165, CW - 120, 60, 3);
  ctx.letterSpacing = '0px';

  // Rule
  ctx.fillStyle = C_SPOT;
  ctx.fillRect(60, afterTitleY + 10, CW - 120, 3);

  // Drop cap / body
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = C_INK_MUTED;
  const afterBodyY = wrapText(ctx, bodyText, 60, afterTitleY + 65, CW - 120, 34, 6);

  // Stat callout
  if (statNum) {
    ctx.font = '800 110px Fraunces, serif';
    ctx.fillStyle = C_SPOT;
    ctx.letterSpacing = '-4px';
    ctx.fillText(statNum, 60, afterBodyY + 110);
    ctx.letterSpacing = '0px';

    ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = C_INK;
    wrapText(ctx, statLabel, 260, afterBodyY + 55, CW - 320, 28, 3);
  }

  // Bullets
  let by = afterBodyY + 175;
  bullets.slice(0, 3).forEach((b) => {
    ctx.fillStyle = 'rgba(19, 19, 19, 0.12)';
    ctx.fillRect(60, by - 24, CW - 120, 1);

    ctx.fillStyle = C_SPOT;
    ctx.beginPath();
    ctx.arc(70, by - 6, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = C_INK_MUTED;
    by = wrapText(ctx, b, 90, by, CW - 150, 26, 2) + 16;
  });

  // Folio
  ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = C_INK_DIM;
  if (side === 'left') {
    ctx.fillText(`${String(pageNum).padStart(2, '0')}   IBRAHIM.  |  ${kicker.toUpperCase()}`, 60, CH - 40);
  } else {
    ctx.textAlign = 'right';
    ctx.fillText(`${String(pageNum).padStart(2, '0')}   IBRAHIM.  |  ${kicker.toUpperCase()}`, CW - 60, CH - 40);
    ctx.textAlign = 'left';
  }

  return canvas;
}

// GLSL Vertex Shader: Realistic page curl physics
const VERT_PAGE_CURL = `
  uniform float uTurn, uZ0, uZ1, uW, uCurl;
  varying vec2 vUv;
  varying vec3 vN;
  varying float vD;
  const float PI = 3.141592653589793;

  void main() {
    vUv = uv;
    float d = position.x; // distance from spine (0 .. uW)
    float th = uTurn * PI;
    float f = d / uW;

    // Trailing edge curl
    float a = clamp(th - uCurl * sin(th) * f * f * 1.1, 0.0, PI);
    vec3 p = vec3(cos(a) * d, position.y, sin(a) * d * 0.9);

    // Z-layering to avoid collision
    p.z += mix(uZ0, uZ1, smoothstep(0.35, 0.65, uTurn)) + sin(th) * 0.02;
    vN = normalize(vec3(-sin(a), 0.0, cos(a)));
    vD = f;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

// GLSL Fragment Shader: Double-sided lighting & spine binding shadow
const FRAG_PAGE_CURL = `
  uniform sampler2D uFront, uBack;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vN;
  varying float vD;

  void main() {
    vec3 N = gl_FrontFacing ? vN : -vN;
    vec4 c = gl_FrontFacing ? texture2D(uFront, vUv) : texture2D(uBack, vec2(1.0 - vUv.x, vUv.y));

    float light = 0.78 + 0.22 * max(dot(N, normalize(vec3(0.2, 0.4, 1.0))), 0.0);
    float gutter = mix(0.72, 1.0, smoothstep(0.0, 0.09, vD)); // Spine binding shadow
    float edge = mix(0.94, 1.0, smoothstep(1.0, 0.985, vD));   // Paper edge highlight

    gl_FragColor = vec4(c.rgb * light * gutter * edge, uOpacity);
  }
`;

// Gentle curved sheet shader for non-turning pages
const VERT_PAGE_BEND = `
  uniform float uBend;
  varying vec2 vUv;
  varying float vShade;

  void main() {
    vUv = uv;
    vec3 p = position;
    p.z -= uBend * p.x * p.x;
    vShade = 1.0 - uBend * abs(p.x) * 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAG_PAGE_BEND = `
  uniform sampler2D uMap;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vShade;

  void main() {
    vec4 c = gl_FrontFacing ? texture2D(uMap, vUv) : vec4(0.95, 0.93, 0.90, 1.0);
    gl_FragColor = vec4(c.rgb * vShade, uOpacity);
  }
`;

export interface MagazineController {
  set: (hero: number, spread: number, opacity?: number) => void;
  pages: number;
}

declare global {
  interface Window {
    MAG?: MagazineController | null;
  }
}

export function Magazine3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let destroyed = false;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 16);

    const createTexture = (canvasEl: HTMLCanvasElement) => {
      const tex = new THREE.CanvasTexture(canvasEl);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      return tex;
    };

    // Load assets and build pages
    async function initScene() {
      const coverImg = await loadImage('/screenshots/guardrail_lab_3d_studio.png');

      const p0 = await createCoverPage(coverImg);
      const p1 = await createContentsPage();

      const p2 = await createSpreadPage(
        'Software that keeps working after I log off.',
        "Editor's letter",
        "Editor's letter",
        'Most of what I build runs unattended. A job posting drops at 3 a.m. and an evaluator parses its requirements, a multi-source scraper cleans duplicates against MongoDB, and a Playwright bot fills the application. An agent terminal issues a dangerous command and an AST interceptor kills the process before a shell opens.',
        [
          'Deterministic AST security replace naive regex filters',
          'Forensic LLM-as-a-judge catches 100% of hallucinations',
          'Automated scrapers harvested across 10+ job platforms',
        ],
        '21 / 21',
        'Engine invariants verified with zero runtime dependencies',
        3,
        'left'
      );

      const p3 = await createSpreadPage(
        'Guardrail Lab — Deterministic Defense Interceptor.',
        '01 System Security',
        'Guardrail Lab',
        'AI coding agents (Claude Code, Cursor, Copilot) are vulnerable to 70%+ of POSIX shell evasions when guarded by regex. Guardrail Lab implements a zero-dependency AST tokenizer that analyzes subshells, flag interleaving, and binary wrappers.',
        [
          '49 curated adversarial evasion attack vectors intercepted',
          '6 OWASP security policies mapped with live deflection telemetry',
          'Export production rules for Claude Code, Cursor, and Docker',
        ],
        '100%',
        'Evasion vectors intercepted across all OWASP categories',
        4,
        'right'
      );

      const p4 = await createSpreadPage(
        'AI Job Hunter & Autonomous Auto-Apply.',
        '02 Scraping & Automation',
        'Job Hunter',
        'High-throughput multi-platform scraper harvesting LinkedIn, Indeed, Himalayas, RemoteOK, and JobSpy with Groq AI fit scoring and automated Playwright submission workflows across Lever and Greenhouse ATS forms.',
        [
          'Concurrent scraper workers across 10 job platforms',
          'Sub-300ms Groq fit scoring against candidate stack',
          'Automated Lever & Greenhouse ATS form field injection',
        ],
        '10+',
        'Harvested portals with live SSE status streaming',
        5,
        'left'
      );

      const p5 = await createSpreadPage(
        'Eval-Agent — Forensic LLM-as-a-Judge.',
        '03 AI Evaluation',
        'Eval-Agent',
        'A forensic evaluation harness that decomposes model outputs into atomic claims, audits each against source evidence (SUPPORTED, CONTRADICTED, UNSUPPORTED), and conducts pairwise A/B arbitration.',
        [
          'Atomic claim extraction with exact unsupported span quoting',
          'Curated benchmark of 20 adversarial hallucination traps',
          'Pairwise head-to-head arbitration with ground-truth rationale',
        ],
        '< 900ms',
        'Grading latency with claim-by-claim forensic audit trails',
        6,
        'right'
      );

      const p6 = await createSpreadPage(
        'SignalHarbor & WhatsApp Concierge.',
        '04 Full-Stack Platforms',
        'SignalHarbor',
        'Evidence-first B2B intelligence with content-addressed cryptographic snapshots alongside a 24/7 autonomous Meta WhatsApp Cloud API receptionist handling booking calendars and CRM sync.',
        [
          'RFC-5322 email state machine with live DNS MX probes',
          'Sub-1.2s Meta WhatsApp Cloud API intake and calendar locks',
          'FastAPI async backend with 3D WebGL OSINT visualization',
        ],
        '24/7',
        'Autonomous customer intake & appointment scheduling',
        7,
        'left'
      );

      const p7 = await createSpreadPage(
        'About Ibrahim Hamid & Technical Handover.',
        '05 About & Handover',
        'About',
        'BS Computer Science graduate from Capital University of Science & Technology (CUST). Proven track record shipping AI agents, deterministic security tools, and full-stack architectures that teams can run without friction.',
        [
          'AI Engineer at Creative AI Agency building production harvesters',
          'Former AI Intern at Novotech Solutions & NTC Telecom NOC',
          'Google IT Support Professional & DeepLearning.AI Certified',
        ],
        '~3 yrs',
        'Of production software engineering & autonomous agents',
        8,
        'right'
      );

      if (destroyed) return;

      const pagePairs = [
        [p0, p1],
        [p2, p3],
        [p4, p5],
        [p6, p7],
      ];

      const pw = 1;
      const ph = ASPECT;

      // Group 1: Orbiting covers carousel for Hero
      const orbitGroup = new THREE.Group();
      scene.add(orbitGroup);

      const singleGeo = new THREE.PlaneGeometry(pw, ph, 24, 1);
      const orbitCanvases = [p0, p1, p2, p3, p4, p5, p6, p7];

      const orbitMeshes = orbitCanvases.map((pc, idx) => {
        const u = {
          uMap: { value: createTexture(pc) },
          uBend: { value: 0.18 },
          uOpacity: { value: 1.0 },
        };
        const mat = new THREE.ShaderMaterial({
          vertexShader: VERT_PAGE_BEND,
          fragmentShader: FRAG_PAGE_BEND,
          uniforms: u,
          side: THREE.DoubleSide,
          transparent: true,
        });
        const m = new THREE.Mesh(singleGeo, mat);
        m.userData.u = u;
        m.renderOrder = idx;
        orbitGroup.add(m);
        return m;
      });

      // Group 2: The Main Magazine with turnable pages
      const magGroup = new THREE.Group();
      scene.add(magGroup);

      const pageGeo = new THREE.PlaneGeometry(pw, ph, 48, 1);
      pageGeo.translate(pw / 2, 0, 0); // Rotate around spine at left

      const turnMeshes = pagePairs.map(([frontCanvas, backCanvas], idx) => {
        const u = {
          uFront: { value: createTexture(frontCanvas) },
          uBack: { value: createTexture(backCanvas) },
          uTurn: { value: 0 },
          uZ0: { value: (pagePairs.length - idx) * 0.005 },
          uZ1: { value: idx * 0.005 },
          uW: { value: pw },
          uCurl: { value: 0.55 },
          uOpacity: { value: 0 },
        };
        const mat = new THREE.ShaderMaterial({
          vertexShader: VERT_PAGE_CURL,
          fragmentShader: FRAG_PAGE_CURL,
          uniforms: u,
          side: THREE.DoubleSide,
          transparent: true,
        });
        const mesh = new THREE.Mesh(pageGeo, mat);
        mesh.userData.u = u;
        magGroup.add(mesh);
        return mesh;
      });

      // Ambient drop shadow under magazine
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = shadowCanvas.height = 128;
      const sctx = shadowCanvas.getContext('2d')!;
      const sGrad = sctx.createRadialGradient(64, 64, 4, 64, 64, 64);
      sGrad.addColorStop(0, 'rgba(20, 25, 35, 0.45)');
      sGrad.addColorStop(1, 'rgba(20, 25, 35, 0)');
      sctx.fillStyle = sGrad;
      sctx.fillRect(0, 0, 128, 128);

      const shadowMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(shadowCanvas),
          transparent: true,
          depthWrite: false,
        })
      );
      shadowMesh.position.z = -0.12;
      magGroup.add(shadowMesh);

      // Viewport math
      let viewWidth = window.innerWidth;
      let viewHeight = window.innerHeight;
      let fovHeight = 1;
      let fovWidth = 1;

      const onResize = () => {
        viewWidth = window.innerWidth;
        viewHeight = window.innerHeight;
        renderer.setSize(viewWidth, viewHeight, false);
        camera.aspect = viewWidth / viewHeight;
        camera.updateProjectionMatrix();
        fovHeight = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
        fovWidth = fovHeight * camera.aspect;
      };
      window.addEventListener('resize', onResize);
      onResize();

      let heroTarget = 0;
      let spreadTarget = 0;
      let masterFade = 1;

      const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
      const onPointerMove = (e: PointerEvent) => {
        pointer.targetX = (e.clientX / viewWidth) * 2 - 1;
        pointer.targetY = (e.clientY / viewHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });

      const isMobile = () => viewWidth < 900;
      const getLayout = () => {
        const mob = isMobile();
        const baseW = mob
          ? Math.min(fovWidth * 0.42, (fovHeight * 0.24) / ASPECT)
          : Math.min(fovWidth * 0.24, (fovHeight * 0.74) / ASPECT);
        const cx = mob ? 0 : fovWidth * 0.24;
        const cy = mob ? fovHeight * 0.22 : -fovHeight * 0.01;
        return { pw: baseW, cx, cy };
      };

      const clock = new THREE.Clock();
      const tempEuler = new THREE.Euler();
      const smoothStep = (x: number) => x * x * (3 - 2 * x);

      // Render Loop
      let reqId = 0;
      const animate = () => {
        reqId = requestAnimationFrame(animate);
        clock.getDelta();
        const elapsed = reduceMotion ? 0 : clock.getElapsedTime();

        pointer.x += (pointer.targetX - pointer.x) * 0.06;
        pointer.y += (pointer.targetY - pointer.y) * 0.06;

        const { pw: currentW, cx, cy } = getLayout();
        const b = Math.min(1, Math.max(0, spreadTarget));
        const s = Math.min(1, Math.max(0, spreadTarget - (pagePairs.length - 1)));
        const spreadFactor = smoothStep(b) * (1 - smoothStep(s));
        const spineShift = (-currentW / 2) * (1 - smoothStep(b)) + (currentW / 2) * smoothStep(s);

        magGroup.position.set(cx + spineShift, cy, 0);
        magGroup.scale.setScalar(currentW);

        tempEuler.set(
          -0.08 + pointer.y * 0.06 - (1 - spreadFactor) * 0.05,
          pointer.x * 0.1 - 0.12 * (1 - spreadFactor),
          0
        );
        magGroup.quaternion.setFromEuler(tempEuler);

        shadowMesh.scale.set((1 + spreadFactor) * 1.25, ASPECT * 1.18, 1);
        shadowMesh.position.x = 0.5 * (1 - smoothStep(b)) - 0.5 * smoothStep(s);

        // Turn pages according to spreadTarget
        turnMeshes.forEach((mesh, idx) => {
          const u = mesh.userData.u;
          u.uTurn.value = Math.min(1, Math.max(0, spreadTarget - idx));
          u.uOpacity.value = Math.min(1, heroTarget * 4 - 3) * masterFade;
          mesh.visible = u.uOpacity.value > 0.01;
        });

        shadowMesh.material.opacity = Math.max(0, heroTarget * 4 - 3) * masterFade;
        shadowMesh.visible = shadowMesh.material.opacity > 0.01;

        // Orbiting Hero covers phase
        const heroTransition = smoothStep(Math.min(1, heroTarget));
        orbitGroup.visible = heroTarget < 0.999;

        const mob = isMobile();
        const orbitRadiusX = mob ? fovWidth * 0.36 : Math.min(fovWidth * 0.34, 7);
        const orbitScale = mob ? fovWidth * 0.2 : Math.min(fovWidth * 0.085, 1.7);
        const orbitY = mob ? fovHeight * 0.27 : fovHeight * 0.285;
        const orbitAngleOffset = elapsed * 0.14 + pointer.x * 0.3;

        orbitMeshes.forEach((mesh, idx) => {
          const angle = (idx / orbitMeshes.length) * Math.PI * 2 + orbitAngleOffset;
          const gx = Math.sin(angle) * orbitRadiusX;
          const gz = Math.cos(angle) * orbitRadiusX * 0.5 - orbitRadiusX * 0.5;
          const gy = orbitY + Math.sin(angle * 2 + elapsed * 0.5) * orbitScale * 0.06 - Math.cos(angle) * orbitScale * 0.22;

          mesh.position.set(
            gx + (cx - gx) * heroTransition,
            gy + (cy - gy) * heroTransition,
            gz + (0.02 + idx * 0.012 - gz) * heroTransition
          );
          mesh.scale.setScalar(orbitScale + (currentW - orbitScale) * heroTransition);

          tempEuler.set(
            (-0.13 + pointer.y * 0.06) * heroTransition + 0.06 * (1 - heroTransition),
            angle * (1 - heroTransition) + (pointer.x * 0.1 - 0.12) * heroTransition,
            0
          );
          mesh.quaternion.setFromEuler(tempEuler);

          mesh.userData.u.uBend.value = 0.12 * (1 - heroTransition);
          mesh.userData.u.uOpacity.value = (idx === orbitMeshes.length - 1 ? 1 : 1 - Math.max(0, heroTransition - 0.85) / 0.15) * masterFade;
        });

        renderer.render(scene, camera);
      };

      animate();

      const controller: MagazineController = {
        set(hero: number, spread: number, opacity = 1) {
          heroTarget = hero;
          spreadTarget = spread;
          masterFade = opacity;
        },
        pages: pagePairs.length,
      };

      window.MAG = controller;
      document.dispatchEvent(new CustomEvent('scene:ready'));

      return () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('pointermove', onPointerMove);
        renderer.dispose();
      };
    }

    let cleanupPromise = initScene().catch((err) => {
      console.warn('WebGL magazine initialization fallback:', err);
      document.documentElement.classList.add('no-webgl');
      document.dispatchEvent(new CustomEvent('scene:ready'));
    });

    return () => {
      destroyed = true;
      if (cleanupPromise) {
        cleanupPromise.then((cleanup) => cleanup && cleanup());
      }
    };
  }, []);

  return (
    <canvas
      id="scene"
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
