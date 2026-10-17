/**
 * Ibrahim Hamid — 3D WebGL Magazine Engine
 * Three.js + Custom GLSL Vertex Shader Page Curl + Real-Time 2D Canvas Typesetting
 */
(() => {
  const CW = 900;
  const CH = 1165;
  const Ka = CH / CW;

  const C_PAPER = '#f4f1e9';
  const C_INK = '#131313';
  const C_INK_MUTED = '#47453f';
  const C_INK_DIM = '#807b72';
  const C_SPOT = '#ff4f1a';
  const C_NIGHT = '#16171b';
  const C_PAPER_ALT = '#f2efe7';

  const F_SERIF = 'Zodiak, Fraunces, Georgia, serif';
  const F_SANS = 'Switzer, "Plus Jakarta Sans", Arial, sans-serif';

  const NODE_COLORS = {
    trigger: '#ff4f1a',
    http: '#131313',
    code: '#3d4a6b',
    logic: '#d99a1e',
    wait: '#8a8478',
    end: '#b9b3a6',
    ai: '#7a4dff',
    app: '#1f8a70',
  };

  const imageCache = new Map();
  function loadImg(src) {
    if (!src) return Promise.resolve(null);
    if (imageCache.has(src)) return imageCache.get(src);
    const p = new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
    imageCache.set(src, p);
    return p;
  }

  function createPageCanvas() {
    const c = document.createElement('canvas');
    c.width = CW;
    c.height = CH;
    return c;
  }

  function applyPaperNoise(ctx, color = C_PAPER, noiseAmount = 6) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, CW, CH);
    try {
      const img = ctx.getImageData(0, 0, CW, CH);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const n = (Math.random() - 0.5) * noiseAmount;
        d[i] += n;
        d[i + 1] += n;
        d[i + 2] += n;
      }
      ctx.putImageData(img, 0, 0);
    } catch (e) {
      // fallback
    }
  }

  function drawFolio(ctx, num, title, align = 'left', color = C_INK_DIM) {
    ctx.font = `600 17px ${F_SANS}`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'alphabetic';
    const s = `${String(num).padStart(2, '0')}   IBRAHIM.  |  ${title.toUpperCase()}`;
    ctx.letterSpacing = '2px';
    if (align === 'left') {
      ctx.textAlign = 'left';
      ctx.fillText(s, 64, CH - 46);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText(s, CW - 64, CH - 46);
    }
    ctx.letterSpacing = '0px';
    ctx.textAlign = 'left';
  }

  function drawKicker(ctx, text, x, y, color = C_SPOT) {
    ctx.font = `700 17px ${F_SANS}`;
    ctx.fillStyle = color;
    ctx.letterSpacing = '3px';
    ctx.fillText(text.toUpperCase(), x, y);
    ctx.letterSpacing = '0px';
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 99) {
    const words = text.split(' ');
    let line = '';
    let count = 0;
    for (let n = 0; n < words.length; n++) {
      const test = line ? line + ' ' + words[n] : words[n];
      if (ctx.measureText(test).width > maxWidth && line) {
        if (++count >= maxLines) {
          ctx.fillText(line.replace(/[,.;:]?$/, '...'), x, y);
          return y + lineHeight;
        }
        ctx.fillText(line, x, y);
        line = words[n];
        y += lineHeight;
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
    }
    return y;
  }

  function drawTitle(ctx, text, x, y, maxWidth, size = 74, color = C_INK, weight = 700, italic = false) {
    ctx.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${F_SERIF}`;
    ctx.fillStyle = color;
    ctx.letterSpacing = `${-size * 0.025}px`;
    const endY = wrapText(ctx, text, x, y, maxWidth, size * 1.04);
    ctx.letterSpacing = '0px';
    return endY;
  }

  function drawLede(ctx, text, x, y, maxWidth, size = 22, color = C_INK_MUTED, maxLines = 99) {
    ctx.font = `400 ${size}px ${F_SANS}`;
    ctx.fillStyle = color;
    return wrapText(ctx, text, x, y, maxWidth, size * 1.5, maxLines);
  }

  function drawDropCap(ctx, text, x, y, maxWidth, size = 22, color = C_INK_MUTED) {
    const cap = text[0];
    ctx.font = `700 ${size * 4.2}px ${F_SERIF}`;
    ctx.fillStyle = C_SPOT;
    ctx.fillText(cap, x, y + size * 2.6);
    const capW = ctx.measureText(cap).width + 14;

    ctx.font = `400 ${size}px ${F_SANS}`;
    ctx.fillStyle = color;
    const words = text.slice(1).split(' ');
    let line = '';
    let curY = y;
    let linesDrawn = 0;
    const lh = size * 1.5;

    for (const w of words) {
      const p = linesDrawn < 3 ? capW : 0;
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxWidth - p && line) {
        ctx.fillText(line, x + p, curY);
        line = w;
        curY += lh;
        linesDrawn++;
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillText(line, x + (linesDrawn < 3 ? capW : 0), curY);
      curY += lh;
    }
    return curY;
  }

  function drawClippedImg(ctx, img, x, y, w, h, alignX = 0.5, alignY = 0.5) {
    if (!img) {
      ctx.fillStyle = '#ddd';
      ctx.fillRect(x, y, w, h);
      return;
    }
    const scale = Math.max(w / img.width, h / img.height);
    const nw = img.width * scale;
    const nh = img.height * scale;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.drawImage(img, x + (w - nw) * alignX, y + (h - nh) * alignY, nw, nh);
    ctx.restore();
  }

  function drawBorderedImg(ctx, img, x, y, w, h, alignX = 0.5, alignY = 0.5) {
    drawClippedImg(ctx, img, x, y, w, h, alignX, alignY);
    ctx.strokeStyle = C_INK;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);
  }

  function drawRule(ctx, x, y, width, color = C_INK, height = 2) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  function drawMast(ctx, color = C_INK, targetSize = 138, y = 200, x = 64, maxW = CW - 160, dotColor = C_SPOT) {
    let size = targetSize;
    ctx.letterSpacing = `${-size * 0.04}px`;
    ctx.font = `800 ${size}px ${F_SERIF}`;
    const text = 'IBRAHIM';
    let totalW = ctx.measureText(text).width + ctx.measureText('.').width + 12;
    if (totalW > maxW) {
      size = Math.floor(size * (maxW / totalW));
      ctx.letterSpacing = `${-size * 0.04}px`;
      ctx.font = `800 ${size}px ${F_SERIF}`;
    }
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    const w = ctx.measureText(text).width;
    ctx.fillStyle = dotColor;
    ctx.fillText('.', x + w, y);
    ctx.letterSpacing = '0px';
  }

  // Draw authentic workflow directly onto canvas
  function drawWorkflowOnCanvas(ctx, flow, x, y, w, h, { dark = false, node = 30 } = {}) {
    const nodes = flow.nodes;
    const maxX = Math.max(...nodes.map((n) => n[2])) || 1;
    const maxY = Math.max(...nodes.map((n) => n[3])) || 1;
    const scale = Math.min((w - node * 2) / maxX, (h - node * 2.4) / maxY);
    const ox = x + (w - maxX * scale) / 2;
    const oy = y + (h - maxY * scale) / 2;
    const pos = nodes.map((n) => [ox + n[2] * scale, oy + n[3] * scale]);

    ctx.lineWidth = 2.2;
    ctx.strokeStyle = dark ? 'rgba(242,239,231,.45)' : 'rgba(19,19,19,.45)';
    flow.edges.forEach(([a, b]) => {
      const [x1, y1] = pos[a];
      const [x2, y2] = pos[b];
      const dx = Math.max(30, Math.abs(x2 - x1) * 0.5);
      ctx.beginPath();
      ctx.moveTo(x1 + node / 2, y1);
      ctx.bezierCurveTo(x1 + node / 2 + dx, y1, x2 - node / 2 - dx, y2, x2 - node / 2, y2);
      ctx.stroke();
    });

    nodes.forEach((n, idx) => {
      const [nx, ny] = pos[idx];
      ctx.fillStyle = NODE_COLORS[n[1]] || C_INK;
      const r = node * 0.24;
      ctx.beginPath();
      ctx.roundRect(nx - node / 2, ny - node / 2, node, node, r);
      ctx.fill();
      ctx.strokeStyle = dark ? C_NIGHT : C_PAPER;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  // PAGE GENERATORS
  async function makeCoverPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx, C_NIGHT, 5);

    const shot = await loadImg('/screenshots/guardrail_lab_3d_studio.png');
    drawClippedImg(ctx, shot, 0, 300, CW, 560, 0.5, 0.5);

    // Vignette
    let grad = ctx.createLinearGradient(0, 300, 0, 420);
    grad.addColorStop(0, C_NIGHT);
    grad.addColorStop(1, 'rgba(22,23,27,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 300, CW, 120);

    grad = ctx.createLinearGradient(0, 700, 0, 860);
    grad.addColorStop(0, 'rgba(22,23,27,0)');
    grad.addColorStop(1, C_NIGHT);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 700, CW, 160);

    drawMast(ctx, C_PAPER_ALT, 138, 220, 64, CW - 160, C_SPOT);

    ctx.font = `600 17px ${F_SANS}`;
    ctx.fillStyle = 'rgba(242,239,231,.75)';
    ctx.letterSpacing = '3px';
    ctx.fillText('ISSUE 01', 64, 290);
    ctx.textAlign = 'right';
    ctx.fillText('THE SYSTEMS EDITION  |  2026', CW - 64, 290);
    ctx.textAlign = 'left';
    ctx.letterSpacing = '0px';

    const highlights = [
      ['01', 'Guardrail Lab: POSIX AST defense & 3D WebGL simulator'],
      ['02', 'Job Hunter: Multi-source scraper & Playwright ATS auto-apply'],
      ['03', 'Eval-Agent: Forensic LLM-as-a-judge & trap detector'],
      ['04', 'SignalHarbor & WhatsApp: Production B2B & Meta agents'],
    ];

    let y = 430;
    highlights.forEach(([num, text]) => {
      ctx.font = `italic 400 30px ${F_SERIF}`;
      ctx.fillStyle = C_SPOT;
      ctx.fillText(num, 64, y);
      ctx.font = `700 24px ${F_SERIF}`;
      ctx.fillStyle = '#fff';
      wrapText(ctx, text, 110, y, 320, 32);
      y += 92;
    });

    drawRule(ctx, 64, 900, CW - 128, C_PAPER_ALT, 2);
    drawTitle(ctx, 'Ibrahim Hamid', 64, 978, CW - 128, 64, C_PAPER_ALT, 800);

    ctx.font = `400 21px ${F_SANS}`;
    ctx.fillStyle = 'rgba(242,239,231,.72)';
    ctx.fillText('AI & Autonomous Agents  ·  POSIX Guardrails  ·  Scraping & RAG', 64, 1030);

    let bx = CW - 210;
    for (let s = 0; s < 46; s++) {
      const bw = [2, 3, 5][(s * 7) % 3];
      ctx.fillStyle = C_PAPER_ALT;
      if (s % 2 === 0) ctx.fillRect(bx, 1050, bw, 62);
      bx += bw + 1;
    }
    ctx.font = `600 13px ${F_SANS}`;
    ctx.fillStyle = 'rgba(242,239,231,.6)';
    ctx.fillText('9 770000 202601', CW - 210, 1132);

    return c;
  }

  async function makeContentsPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx);

    drawMast(ctx, C_INK, 128, 180, 64, CW - 160, C_SPOT);
    drawKicker(ctx, 'Issue 01  |  The systems edition', 64, 242);
    drawRule(ctx, 64, 280, CW - 128);
    drawKicker(ctx, 'In this issue', 64, 342, C_INK_DIM);

    const items = [
      ['02', "Editor's letter", 'Software that keeps working unattended'],
      ['04', 'Guardrail Lab', 'POSIX AST interceptor & 3D WebGL firewall'],
      ['06', 'AI Job Hunter', 'Multi-source scraping & Playwright ATS auto-apply'],
      ['08', 'Eval-Agent', 'LLM-as-a-judge forensic scoring & hallucination traps'],
      ['10', 'SignalHarbor & WhatsApp', 'B2B OSINT intelligence & Meta Cloud API concierge'],
      ['12', 'About Ibrahim', 'Nearly three years of shipping & credentials'],
      ['14', 'Back cover', 'Hire me & project pathways'],
    ];

    let y = 402;
    for (const [num, title, sub] of items) {
      ctx.font = `700 40px ${F_SERIF}`;
      ctx.fillStyle = C_SPOT;
      ctx.fillText(num, 64, y + 10);
      ctx.font = `700 33px ${F_SERIF}`;
      ctx.fillStyle = C_INK;
      ctx.fillText(title, 150, y);
      ctx.font = `400 19px ${F_SANS}`;
      ctx.fillStyle = C_INK_DIM;
      ctx.fillText(sub, 150, y + 30);
      drawRule(ctx, 64, y + 52, CW - 128, 'rgba(19,19,19,.12)', 1);
      y += 82;
    }

    ctx.font = `400 18px ${F_SANS}`;
    ctx.fillStyle = C_INK_DIM;
    ctx.fillText('Every system in this issue is documented with live evidence, code and verification.', 64, CH - 96);
    drawFolio(ctx, 2, 'Contents', 'left');
    return c;
  }

  async function makeEditorLetterPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx);

    drawKicker(ctx, "Editor's letter", 64, 110);
    let y = drawTitle(ctx, 'Software that keeps working unattended.', 64, 196, CW - 128, 72);
    drawRule(ctx, 64, y + 6, CW - 128, C_SPOT, 3);
    y += 70;

    y = drawDropCap(
      ctx,
      'Most of what I build runs unattended. A job posting drops at 3 a.m. and an evaluator parses its requirements, a scraper cleans duplicates against MongoDB, and a Playwright bot fills the application. An agent terminal issues a dangerous command and an AST interceptor kills the process before a shell opens.',
      64,
      y,
      CW - 128,
      23
    );
    y += 16;

    y = drawLede(
      ctx,
      'The other half is craft: deterministic security harnesses, three.js scenes and scroll choreography for systems that feel like places. This magazine is one of them. Every project inside is real, tested and running.',
      64,
      y,
      CW - 128,
      23
    );

    ctx.font = `italic 400 40px ${F_SERIF}`;
    ctx.fillStyle = C_INK;
    ctx.fillText('Ibrahim Hamid', 64, y + 70);

    ctx.font = `400 19px ${F_SANS}`;
    ctx.fillStyle = C_INK_DIM;
    ctx.fillText('AI Full Stack Developer & Systems Engineer', 64, y + 104);

    drawFolio(ctx, 3, "Editor's letter", 'right');
    return c;
  }

  async function makeGuardrailChapterPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx, C_NIGHT, 5);

    ctx.font = `800 360px ${F_SERIF}`;
    ctx.fillStyle = C_SPOT;
    ctx.letterSpacing = '-20px';
    ctx.fillText('01', 30, 330);
    ctx.letterSpacing = '0px';

    const y = drawTitle(ctx, 'Guardrail Lab: Deterministic AST Defense.', 64, 450, CW - 128, 74, '#fff', 800);
    drawLede(
      ctx,
      'Naive regex blocklists fail against 70%+ of POSIX shell evasions. Guardrail Lab implements a zero-dependency AST tokenizer that analyzes subshells, flag interleaving, and binary wrappers.',
      64,
      y + 10,
      CW - 128,
      22,
      'rgba(242,239,231,.72)'
    );

    const flow = (window.FLOWS || []).find((f) => f.key === 'guardrail');
    if (flow) {
      drawWorkflowOnCanvas(ctx, flow, 40, 760, CW - 80, 290, { dark: true, node: 26 });
    }

    ctx.font = `600 16px ${F_SANS}`;
    ctx.fillStyle = 'rgba(242,239,231,.55)';
    ctx.fillText('POSIX AST TOKENIZER  |  21/21 INVARIANTS  |  100% DEFENSE', 64, 1070);

    drawFolio(ctx, 4, 'Guardrail Lab', 'left', 'rgba(242,239,231,.5)');
    return c;
  }

  async function makeGuardrailDetailsPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx);

    drawKicker(ctx, 'Case Study  |  Security Architecture', 64, 110);
    let y = drawTitle(ctx, 'Stopping coding agents from breaking the system.', 64, 196, CW - 128, 76);

    const shot = await loadImg('/screenshots/app-flightdeck.png');
    drawBorderedImg(ctx, shot, 64, y + 10, CW - 128, 330, 0.5, 0.35);
    y += 400;

    ctx.font = `800 140px ${F_SERIF}`;
    ctx.fillStyle = C_SPOT;
    ctx.letterSpacing = '-6px';
    ctx.fillText('21/21', 56, y + 105);
    ctx.letterSpacing = '0px';

    drawLede(
      ctx,
      'Core engine invariants verified with zero runtime dependencies. Intercepts subshells $(...), flag insertions (-rf vs -r -f), and binary wrappers (sudo, env, time).',
      360,
      y + 30,
      CW - 424,
      21,
      C_INK
    );
    y += 180;

    drawLede(
      ctx,
      'Exports production-ready hardened configurations for Claude Code, Cursor IDE (.cursorrules), AgentSH, POSIX Bash hooks, and Docker Seccomp.',
      64,
      y,
      CW - 128,
      22
    );

    drawFolio(ctx, 5, 'Guardrail Lab', 'right');
    return c;
  }

  async function makeScrapingChapterPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx, C_NIGHT, 5);

    ctx.font = `800 360px ${F_SERIF}`;
    ctx.fillStyle = C_SPOT;
    ctx.letterSpacing = '-20px';
    ctx.fillText('02', 30, 330);
    ctx.letterSpacing = '0px';

    const y = drawTitle(ctx, 'Browsers that work the night shift.', 64, 450, CW - 128, 74, '#fff', 800);
    drawLede(
      ctx,
      'High-throughput multi-platform scraper harvesting LinkedIn, Indeed, Himalayas, RemoteOK, and JobSpy with Groq AI fit scoring and automated Playwright ATS submissions.',
      64,
      y + 10,
      CW - 128,
      22,
      'rgba(242,239,231,.72)'
    );

    const flow = (window.FLOWS || []).find((f) => f.key === 'job_hunter');
    if (flow) {
      drawWorkflowOnCanvas(ctx, flow, 40, 760, CW - 80, 290, { dark: true, node: 26 });
    }

    ctx.font = `600 16px ${F_SANS}`;
    ctx.fillStyle = 'rgba(242,239,231,.55)';
    ctx.fillText('MULTI-SOURCE HARVESTER  |  10 PLATFORMS  |  < 300MS EVAL', 64, 1070);

    drawFolio(ctx, 6, 'Job Hunter', 'left', 'rgba(242,239,231,.5)');
    return c;
  }

  async function makeScrapingDetailsPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx);

    drawKicker(ctx, 'Case Study  |  Headless Automation', 64, 110);
    drawTitle(ctx, 'Auto-filling Lever and Greenhouse forms.', 64, 190, CW - 128, 62);

    const shot = await loadImg('/screenshots/job-scraper-lever-form.png');
    drawBorderedImg(ctx, shot, 64, 280, CW - 128, 320, 0.5, 0.5);

    const items = [
      ['10+', 'Job portals harvested in parallel with proxy & rate-limit rotation'],
      ['<300ms', 'Groq AI fit scoring candidate tech stacks against job specs'],
      ['60%+', 'Auto-apply threshold; borderline candidates flagged for review'],
      ['0 Drop', 'Playwright form injector confirms submission with audit receipts'],
    ];

    let y = 690;
    items.forEach(([stat, desc]) => {
      drawRule(ctx, 64, y - 40, CW - 128, 'rgba(19,19,19,.14)', 1);
      ctx.font = `800 40px ${F_SERIF}`;
      ctx.fillStyle = C_SPOT;
      ctx.fillText(stat, 64, y);
      drawLede(ctx, desc, 240, y - 10, CW - 304, 19, C_INK_MUTED, 2);
      y += 84;
    });

    drawFolio(ctx, 7, 'Job Hunter', 'right');
    return c;
  }

  async function makeEvalChapterPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx);

    drawKicker(ctx, '03 AI Engineering  |  Forensic Evaluation', 64, 110);
    const y = drawTitle(ctx, 'Eval-Agent: LLM-as-a-Judge Harness.', 64, 196, CW - 128, 76);

    const shot = await loadImg('/screenshots/dashboard.png');
    drawBorderedImg(ctx, shot, 64, y + 10, CW - 128, 330, 0.5, 0.35);

    ctx.font = `800 130px ${F_SERIF}`;
    ctx.fillStyle = C_SPOT;
    ctx.letterSpacing = '-4px';
    ctx.fillText('100%', 56, y + 490);
    ctx.letterSpacing = '0px';

    drawLede(
      ctx,
      'Adversarial hallucination traps caught across 20 curated benchmark test cases. Deconstructs outputs into atomic claims and verifies each against source evidence.',
      360,
      y + 420,
      CW - 424,
      21,
      C_INK
    );

    drawFolio(ctx, 8, 'Eval-Agent', 'left');
    return c;
  }

  async function makeEvalDetailsPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx);

    drawKicker(ctx, 'Case Study  |  Adversarial Benchmarks', 64, 110);
    drawTitle(ctx, 'Deconstructing output claims against gold evidence.', 64, 190, CW - 128, 62);

    const shot = await loadImg('/screenshots/compare.png');
    drawBorderedImg(ctx, shot, 64, 280, CW - 128, 320, 0.5, 0.5);

    const items = [
      ['100%', 'Adversarial hallucination traps caught in automated evaluation runs'],
      ['20 Gold', 'Benchmark test fixtures probing negation, entity-swaps & confabulation'],
      ['Atomic', 'Claim deconstruction maps every phrase to explicit source citations'],
      ['Judge', 'LLM-as-a-judge arbitrates factual faithfulness with mathematical rigor'],
    ];

    let y = 690;
    items.forEach(([stat, desc]) => {
      drawRule(ctx, 64, y - 40, CW - 128, 'rgba(19,19,19,.14)', 1);
      ctx.font = `800 40px ${F_SERIF}`;
      ctx.fillStyle = C_SPOT;
      ctx.fillText(stat, 64, y);
      drawLede(ctx, desc, 240, y - 10, CW - 304, 19, C_INK_MUTED, 2);
      y += 84;
    });

    drawFolio(ctx, 8, 'Eval-Agent', 'right');
    return c;
  }

  async function makePlatformsPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx, C_NIGHT, 5);

    ctx.font = `800 360px ${F_SERIF}`;
    ctx.fillStyle = C_SPOT;
    ctx.letterSpacing = '-20px';
    ctx.fillText('04', 30, 330);
    ctx.letterSpacing = '0px';

    const y = drawTitle(ctx, 'SignalHarbor & WhatsApp Concierge.', 64, 450, CW - 128, 74, '#fff', 800);
    drawLede(
      ctx,
      'B2B OSINT intelligence platform with content-addressed snapshots & RFC email validation, paired with a 24/7 Meta Cloud API booking receptionist.',
      64,
      y + 10,
      CW - 128,
      22,
      'rgba(242,239,231,.72)'
    );

    const shot = await loadImg('/screenshots/chatbot-agent-ui.png');
    drawBorderedImg(ctx, shot, 64, 760, CW - 128, 270, 0.5, 0.5);

    ctx.font = `600 16px ${F_SANS}`;
    ctx.fillStyle = 'rgba(242,239,231,.55)';
    ctx.fillText('B2B OSINT PLATFORM  |  META CLOUD API  |  SUB-100MS LATENCY', 64, 1070);

    drawFolio(ctx, 9, 'Platforms & OSINT', 'left', 'rgba(242,239,231,.5)');
    return c;
  }

  async function makePlatformsDetailsPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx);

    drawKicker(ctx, 'Case Study  |  B2B OSINT & Meta Automation', 64, 110);
    drawTitle(ctx, 'Intelligent routing and RFC email verification.', 64, 190, CW - 128, 62);

    const shot = await loadImg('/screenshots/app-scoreboard.png');
    drawBorderedImg(ctx, shot, 64, 280, CW - 128, 320, 0.5, 0.5);

    const items = [
      ['RFC 5322', 'Deterministic mail deliverability validation and DNS MX record probing'],
      ['WhatsApp', '24/7 Meta Cloud API booking receptionist with zero-shot inquiry resolution'],
      ['<100ms', 'FastAPI native OS background workers achieving sub-100ms API response latency'],
      ['Zero Drop', 'Distributed worker queues with automated failure retries and audit receipts'],
    ];

    let y = 690;
    items.forEach(([stat, desc]) => {
      drawRule(ctx, 64, y - 40, CW - 128, 'rgba(19,19,19,.14)', 1);
      ctx.font = `800 36px ${F_SERIF}`;
      ctx.fillStyle = C_SPOT;
      ctx.fillText(stat, 64, y);
      drawLede(ctx, desc, 240, y - 10, CW - 304, 19, C_INK_MUTED, 2);
      y += 84;
    });

    drawFolio(ctx, 10, 'Platforms & OSINT', 'right');
    return c;
  }

  async function makeAboutPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx);

    drawKicker(ctx, '05 About Ibrahim', 64, 110);
    drawTitle(ctx, 'Nearly three years of shipping.', 64, 196, CW - 128, 70);

    const timeline = [
      ['2026 – now', 'Creative AI Agency', 'AI Engineer building harvesters & evaluation harnesses'],
      ['2025', 'NOVOTECH Solutions', 'AI Intern developing LangChain chatbots & voice RAG'],
      ['2024', 'National Telecom (NTC)', 'Software Eng Intern building workflow portals & NOC'],
      ['2022 – 2026', 'Capital University (CUST)', 'BS Computer Science graduate (Islamabad)'],
    ];

    let y = 420;
    timeline.forEach(([date, company, role]) => {
      drawRule(ctx, 64, y - 44, CW - 128, 'rgba(19,19,19,.14)', 1);
      ctx.font = `600 18px ${F_SANS}`;
      ctx.fillStyle = C_INK_DIM;
      ctx.fillText(date, 64, y);

      ctx.font = `700 28px ${F_SERIF}`;
      ctx.fillStyle = C_INK;
      ctx.fillText(company, 240, y);

      ctx.font = `400 18px ${F_SANS}`;
      ctx.fillStyle = C_SPOT;
      ctx.fillText(role, 240, y + 30);

      y += 120;
    });

    drawLede(
      ctx,
      'Final-year CS graduate from Islamabad, Pakistan. Works across US, European and global time zones, writes things down, and ships deterministic code teams can run.',
      64,
      y + 10,
      CW - 128,
      21
    );

    drawFolio(ctx, 11, 'About', 'left');
    return c;
  }

  async function makeToolkitPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx, C_NIGHT, 5);

    drawKicker(ctx, '05 The Toolkit', 64, 110, C_SPOT);
    const yTop = drawTitle(ctx, 'The technical stack.', 64, 190, CW - 128, 62, '#fff', 800);

    const stacks = [
      ['Automation & AI', 'LangChain, Ollama Qwen2.5, Groq LLaMA-3.1, Whisper STT, Vector RAG, LLM-as-a-Judge'],
      ['POSIX AST & Security', 'Deterministic Shell Tokenizers, OWASP Guardrails, Seccomp, POSIX hooks, ES6'],
      ['Front End & 3D Web', 'Three.js WebGL, React 19, TypeScript, GSAP ScrollTrigger, Lenis, Custom Shaders'],
      ['Backend & Cloud Systems', 'FastAPI Async, Python 3.11, PostgreSQL, MongoDB, Redis, Docker, Meta Cloud API'],
    ];

    let y = yTop + 30;
    stacks.forEach(([title, tech]) => {
      ctx.font = `700 26px ${F_SERIF}`;
      ctx.fillStyle = '#fff';
      ctx.fillText(title, 64, y);
      y = drawLede(ctx, tech, 64, y + 32, CW - 128, 19, 'rgba(242,239,231,.72)') + 28;
    });

    drawRule(ctx, 64, y, CW - 128, C_SPOT, 2);
    y += 50;

    drawKicker(ctx, 'Before the code', 64, y, C_SPOT);
    y += 46;

    const creds = [
      'Google IT Support Professional Certificate · Coursera',
      'AI For Everyone · DeepLearning.AI',
      'Android App Components & Architecture · Coursera',
      'iOS App Development Fundamentals · Coursera',
      'Volunteer Teacher · Education Health & Development Foundation',
    ];

    creds.forEach((item) => {
      ctx.font = `italic 400 22px ${F_SERIF}`;
      ctx.fillStyle = C_PAPER_ALT;
      ctx.fillText(item, 64, y);
      y += 42;
    });

    drawFolio(ctx, 12, 'About', 'right', 'rgba(242,239,231,.5)');
    return c;
  }

  async function makeBackCoverPage() {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    applyPaperNoise(ctx, C_SPOT, 6);

    drawMast(ctx, C_NIGHT, 140, 280, 64, CW - 160, C_PAPER_ALT);
    const y = drawTitle(ctx, 'Got something that should run itself?', 64, 500, CW - 128, 74, C_NIGHT, 800);

    ctx.font = `600 30px ${F_SANS}`;
    ctx.fillStyle = C_NIGHT;
    ctx.fillText('ibrahimhamid.2600@gmail.com', 64, y + 70);
    ctx.fillText('github.com/IBRAHIMHAMID678', 64, y + 116);
    ctx.fillText('+92 318 0584128', 64, y + 162);

    drawRule(ctx, 64, CH - 150, CW - 128, C_NIGHT, 2);

    ctx.font = `600 17px ${F_SANS}`;
    ctx.fillStyle = C_NIGHT;
    ctx.letterSpacing = '3px';
    ctx.fillText('ISLAMABAD, PAKISTAN  |  REMOTE, WORLDWIDE', 64, CH - 104);
    ctx.letterSpacing = '0px';

    drawFolio(ctx, 13, 'Back Cover', 'left', C_NIGHT);
    return c;
  }

  // Orbiting covers generator
  async function makeOrbitCover(key, title, subtitle, shotSrc, alignX = 0.5) {
    const c = createPageCanvas();
    const ctx = c.getContext('2d');
    ctx.fillStyle = C_NIGHT;
    ctx.fillRect(0, 0, CW, CH);

    const shot = await loadImg(shotSrc);
    drawClippedImg(ctx, shot, 0, 0, CW, CH, alignX, 0.5);

    let grad = ctx.createLinearGradient(0, 0, 0, 380);
    grad.addColorStop(0, 'rgba(10,10,12,.82)');
    grad.addColorStop(1, 'rgba(10,10,12,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CW, 380);

    grad = ctx.createLinearGradient(0, CH - 420, 0, CH);
    grad.addColorStop(0, 'rgba(10,10,12,0)');
    grad.addColorStop(1, 'rgba(10,10,12,.9)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, CH - 420, CW, 420);

    drawMast(ctx, '#fff', 132, 210, 64, CW - 160, C_SPOT);

    ctx.font = `600 17px ${F_SANS}`;
    ctx.fillStyle = 'rgba(255,255,255,.8)';
    ctx.letterSpacing = '3px';
    ctx.fillText('ISSUE 01  |  2026  |  IBRAHIM HAMID', 60, 262);
    ctx.letterSpacing = '0px';

    ctx.font = `italic 400 34px ${F_SERIF}`;
    ctx.fillStyle = C_SPOT;
    ctx.fillText(subtitle, 60, CH - 150);

    return c;
  }

  // GLSL SHADERS
  const VERT_PAGE_CURL = `
    uniform float uTurn, uZ0, uZ1, uW, uCurl;
    varying vec2 vUv;
    varying vec3 vN;
    varying float vD;
    const float PI = 3.14159265;
    void main() {
      vUv = uv;
      float d = position.x;
      float th = uTurn * PI;
      float f = d / uW;
      float a = clamp(th - uCurl * sin(th) * f * f * 1.1, 0., PI);
      vec3 p = vec3(cos(a) * d, position.y, sin(a) * d * .9);
      p.z += mix(uZ0, uZ1, smoothstep(.35, .65, uTurn)) + sin(th) * .02;
      vN = normalize(vec3(-sin(a), 0., cos(a)));
      vD = f;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.);
    }
  `;

  const FRAG_PAGE_CURL = `
    uniform sampler2D uFront, uBack;
    uniform float uOpacity;
    varying vec2 vUv;
    varying vec3 vN;
    varying float vD;
    void main() {
      vec3 N = gl_FrontFacing ? vN : -vN;
      vec4 c = gl_FrontFacing ? texture2D(uFront, vUv) : texture2D(uBack, vec2(1. - vUv.x, vUv.y));
      float light = .78 + .22 * max(dot(N, normalize(vec3(.2, .4, 1.))), 0.);
      float gutter = mix(.72, 1., smoothstep(0., .09, vD));
      float edge = mix(.94, 1., smoothstep(1., .985, vD));
      gl_FragColor = vec4(c.rgb * light * gutter * edge, uOpacity);
    }
  `;

  const VERT_BEND = `
    uniform float uBend;
    varying vec2 vUv;
    varying float vShade;
    void main() {
      vUv = uv;
      vec3 p = position;
      p.z -= uBend * p.x * p.x;
      vShade = 1. - uBend * abs(p.x) * .5;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.);
    }
  `;

  const FRAG_BEND = `
    uniform sampler2D uMap;
    uniform float uOpacity;
    varying vec2 vUv;
    varying float vShade;
    void main() {
      vec4 c = gl_FrontFacing ? texture2D(uMap, vUv) : vec4(.95, .93, .9, 1.);
      gl_FragColor = vec4(c.rgb * vShade, uOpacity);
    }
  `;

  async function buildScene(canvas) {
    const isMobile = () => window.innerWidth < 900;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0, 0);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 16);

    const toTexture = (cvs) => {
      const tex = new THREE.CanvasTexture(cvs);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      return tex;
    };

    // Load fonts before building
    await Promise.all(
      ['700 40px Zodiak', 'italic 400 40px Zodiak', '800 40px Zodiak', '400 20px Switzer', '600 20px Switzer', '700 20px Switzer']
        .map((f) => document.fonts.load(f).catch(() => 0))
    );

    // Build spreads (7 sheets matching 7 data-spreads)
    const [
      pCover,
      pContents,
      pLetter,
      pGuard1,
      pGuard2,
      pScrape1,
      pScrape2,
      pEval1,
      pEval2,
      pPlatforms1,
      pPlatforms2,
      pAbout,
      pToolkit,
      pBack,
    ] = await Promise.all([
      makeCoverPage(),
      makeContentsPage(),
      makeEditorLetterPage(),
      makeGuardrailChapterPage(),
      makeGuardrailDetailsPage(),
      makeScrapingChapterPage(),
      makeScrapingDetailsPage(),
      makeEvalChapterPage(),
      makeEvalDetailsPage(),
      makePlatformsPage(),
      makePlatformsDetailsPage(),
      makeAboutPage(),
      makeToolkitPage(),
      makeBackCoverPage(),
    ]);

    const spreads = [
      [pCover, pContents],        // Sheet 0: Cover / Contents
      [pLetter, pGuard1],        // Sheet 1: Editor's letter / 01 Guardrails Chapter
      [pGuard2, pScrape1],       // Sheet 2: Guardrails Details / 02 Scraping Chapter
      [pScrape2, pEval1],        // Sheet 3: Scraping Details / 03 Evals Chapter
      [pEval2, pPlatforms1],     // Sheet 4: Evals Details / 04 Platforms & OSINT Chapter
      [pPlatforms2, pAbout],     // Sheet 5: Platforms Details / 05 About Timeline
      [pToolkit, pBack],         // Sheet 6: About Toolkit & Credentials / Back Cover
    ];

    // Orbit covers for hero
    const orbitCovers = await Promise.all([
      makeOrbitCover('guardrail', 'Guardrail Lab', '3D POSIX Defense', '/screenshots/guardrail_lab_3d_studio.png', 0.5),
      makeOrbitCover('job_hunter', 'Job Hunter', 'Playwright ATS Auto-Apply', '/screenshots/job-scraper-lever-form.png', 0.5),
      makeOrbitCover('eval_agent', 'Eval-Agent', 'LLM-as-a-Judge', '/screenshots/dashboard.png', 0.5),
      makeOrbitCover('signalharbor', 'SignalHarbor', 'B2B OSINT Engine', '/screenshots/chatbot-agent-ui.png', 0.5),
      makeOrbitCover('flightdeck', 'Security Flightdeck', 'AST Matrix', '/screenshots/app-flightdeck.png', 0.5),
    ]);
    orbitCovers.push(spreads[0][0]);

    const pageW = 1;
    const pageH = Ka;

    // Group 1: Orbiting covers
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const orbitGeo = new THREE.PlaneGeometry(pageW, pageH, 24, 1);
    const orbitMeshes = orbitCovers.map((cvs, idx) => {
      const u = {
        uMap: { value: toTexture(cvs) },
        uBend: { value: 0.18 },
        uOpacity: { value: 1 },
      };
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT_BEND,
        fragmentShader: FRAG_BEND,
        uniforms: u,
        side: THREE.DoubleSide,
        transparent: true,
      });
      const mesh = new THREE.Mesh(orbitGeo, mat);
      mesh.userData.u = u;
      mesh.renderOrder = idx;
      orbitGroup.add(mesh);
      return mesh;
    });

    // Group 2: The Magazine
    const magGroup = new THREE.Group();
    scene.add(magGroup);

    const numSpreads = spreads.length;
    const pageTurnGeo = new THREE.PlaneGeometry(pageW, pageH, 48, 1);
    pageTurnGeo.translate(pageW / 2, 0, 0);

    const turnMeshes = spreads.map(([frontCvs, backCvs], idx) => {
      const u = {
        uFront: { value: toTexture(frontCvs) },
        uBack: { value: toTexture(backCvs) },
        uTurn: { value: 0 },
        uZ0: { value: (numSpreads - idx) * 0.004 },
        uZ1: { value: idx * 0.004 },
        uW: { value: pageW },
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
      const mesh = new THREE.Mesh(pageTurnGeo, mat);
      mesh.userData.u = u;
      magGroup.add(mesh);
      return mesh;
    });

    // Magazine Drop Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = shadowCanvas.height = 128;
    const sctx = shadowCanvas.getContext('2d');
    const sGrad = sctx.createRadialGradient(64, 64, 4, 64, 64, 64);
    sGrad.addColorStop(0, 'rgba(20, 25, 35, .38)');
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

    // Responsive dimensions
    let W = 1, H = 1, fovW = 1, fovH = 1;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      fovH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
      fovW = fovH * camera.aspect;
    };
    window.addEventListener('resize', resize);
    resize();

    let heroVal = 0;
    let spreadVal = 0;
    let fadeVal = 1;
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener('pointermove', (e) => {
      ptr.tx = (e.clientX / W) * 2 - 1;
      ptr.ty = (e.clientY / H) * 2 - 1;
    });

    function getLayout() {
      const mob = isMobile();
      const pw = mob ? Math.min(fovW * 0.42, (fovH * 0.24) / Ka) : Math.min(fovW * 0.22, (fovH * 0.72) / Ka);
      const cx = mob ? 0 : fovW * 0.22;
      const cy = mob ? fovH * 0.22 : -fovH * 0.01;
      return { pw, cx, cy };
    }

    const clock = new THREE.Clock();
    const smoothStep = (x) => x * x * (3 - 2 * x);
    const tempEuler = new THREE.Euler();

    function renderLoop() {
      requestAnimationFrame(renderLoop);
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = reduceMotion ? 0 : clock.getElapsedTime();

      ptr.x += (ptr.tx - ptr.x) * 0.06;
      ptr.y += (ptr.ty - ptr.y) * 0.06;

      const { pw, cx, cy } = getLayout();
      const b = Math.min(1, Math.max(0, spreadVal));
      const s = Math.min(1, Math.max(0, spreadVal - (numSpreads - 1)));
      const spreadFactor = smoothStep(b) * (1 - smoothStep(s));
      const spineShift = (-pw / 2) * (1 - smoothStep(b)) + (pw / 2) * smoothStep(s);

      magGroup.position.set(cx + spineShift, cy, 0);
      magGroup.scale.setScalar(pw);
      tempEuler.set(-0.08 + ptr.y * 0.06 - (1 - spreadFactor) * 0.05, ptr.x * 0.1 - 0.12 * (1 - spreadFactor), 0);
      magGroup.quaternion.setFromEuler(tempEuler);

      shadowMesh.scale.set((1 + spreadFactor) * 1.25, Ka * 1.18, 1);
      shadowMesh.position.x = 0.5 * (1 - smoothStep(b)) - 0.5 * smoothStep(s);

      turnMeshes.forEach((mesh, idx) => {
        const u = mesh.userData.u;
        u.uTurn.value = Math.min(1, Math.max(0, spreadVal - idx));
        u.uOpacity.value = Math.min(1, heroVal * 4 - 3) * fadeVal;
        mesh.visible = u.uOpacity.value > 0.01;
      });

      shadowMesh.material.opacity = Math.max(0, heroVal * 4 - 3) * fadeVal;
      shadowMesh.visible = shadowMesh.material.opacity > 0.01;

      // Hero Orbiting covers
      const heroT = smoothStep(Math.min(1, heroVal));
      orbitGroup.visible = heroVal < 0.999;

      const mob = isMobile();
      const orbitRX = mob ? fovW * 0.36 : Math.min(fovW * 0.32, 6.2);
      const orbitScale = mob ? fovW * 0.18 : Math.min(fovW * 0.078, 1.5);
      const orbitY = mob ? fovH * 0.27 : fovH * 0.285;
      const angleOffset = elapsed * 0.14 + ptr.x * 0.3;

      orbitMeshes.forEach((mesh, idx) => {
        const ang = (idx / orbitMeshes.length) * Math.PI * 2 + angleOffset;
        const gx = Math.sin(ang) * orbitRX;
        const gz = Math.cos(ang) * orbitRX * 0.5 - orbitRX * 0.5;
        const gy = orbitY + Math.sin(ang * 2 + elapsed * 0.5) * orbitScale * 0.06 - Math.cos(ang) * orbitScale * 0.22;

        mesh.position.set(gx + (cx - gx) * heroT, gy + (cy - gy) * heroT, gz + (0.02 + idx * 0.012 - gz) * heroT);
        mesh.scale.setScalar(orbitScale + (pw - orbitScale) * heroT);

        tempEuler.set((-0.13 + ptr.y * 0.06) * heroT + 0.06 * (1 - heroT), ang * (1 - heroT) + (ptr.x * 0.1 - 0.12) * heroT, 0);
        mesh.quaternion.setFromEuler(tempEuler);

        mesh.userData.u.uBend.value = 0.12 * (1 - heroT);
        mesh.userData.u.uOpacity.value = (idx === orbitMeshes.length - 1 ? 1 : 1 - Math.max(0, heroT - 0.85) / 0.15) * fadeVal;
      });

      orbitMeshes
        .slice()
        .sort((a, b) => a.position.z - b.position.z)
        .forEach((m, idx) => (m.renderOrder = idx));

      renderer.render(scene, camera);
    }

    renderLoop();

    return {
      set(hero, spread, fade) {
        heroVal = hero;
        spreadVal = spread;
        if (fade != null) fadeVal = fade;
      },
      pages: numSpreads,
    };
  }

  window.MAG = null;
  const canvasEl = document.getElementById('scene');
  if (canvasEl) {
    buildScene(canvasEl)
      .then((controller) => {
        window.MAG = controller;
        document.dispatchEvent(new CustomEvent('scene:ready'));
      })
      .catch((err) => {
        console.error('Three.js scene error:', err);
        document.documentElement.classList.add('no-webgl');
        document.dispatchEvent(new CustomEvent('scene:ready'));
      });
  }
})();
