/**
 * Ibrahim Hamid — Page Choreography & Interactive Systems
 * GSAP ScrollTrigger + SplitText + Lenis + SVG Workflow Visualizer
 */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const svgEl = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };

  gsap.registerPlugin(ScrollTrigger, SplitText);

  // 1. Archive Track (Every Live Build)
  const LIVE_BUILDS = [
    ['guardrail_lab_3d_studio', 'Guardrail Lab', 'POSIX AST Defense', 'https://github.com/IBRAHIMHAMID678/GUARDRAIL', 'github.com/IBRAHIMHAMID678/GUARDRAIL'],
    ['job-scraper-lever-form', 'AI Job Hunter', 'Playwright ATS', 'https://github.com/IBRAHIMHAMID678/AI-JOB-SCRAPER', 'github.com/IBRAHIMHAMID678/AI-JOB-SCRAPER'],
    ['dashboard', 'Eval-Agent', 'LLM-as-a-Judge', 'https://github.com/IBRAHIMHAMID678/eval-agent', 'github.com/IBRAHIMHAMID678/eval-agent'],
    ['chatbot-agent-ui', 'Chatbot-Agent', 'Voice RAG Assistant', 'https://github.com/IBRAHIMHAMID678/AI-Agent', 'github.com/IBRAHIMHAMID678/AI-Agent'],
    ['app-flightdeck', 'Security Flightdeck', 'OWASP Threat Interceptor', 'https://github.com/IBRAHIMHAMID678/GUARDRAIL', 'github.com/IBRAHIMHAMID678/GUARDRAIL'],
    ['compare', 'A/B Arbiter', 'Claim Verification', 'https://github.com/IBRAHIMHAMID678/eval-agent', 'github.com/IBRAHIMHAMID678/eval-agent'],
  ];

  const archiveEl = $('#archive');
  if (archiveEl) {
    archiveEl.innerHTML = LIVE_BUILDS.map(
      ([k, n, t, u, d]) =>
        `<a class="shot" href="${u}" target="_blank" rel="noopener">
          <span class="shot__frame">
            <img src="screenshots/${k}.png" alt="${n} project preview" loading="lazy" width="1200" height="750">
          </span>
          <span class="shot__meta">
            <b>${n}</b>
            <span>${t}</span>
          </span>
          <span class="shot__url">${d} &nearr;</span>
        </a>`
    ).join('');
  }

  // 2. Interactive SVG Workflow Visualizer
  const KIND = {
    trigger: '#ff4f1a',
    http: '#131313',
    code: '#3d4a6b',
    logic: '#d99a1e',
    wait: '#8a8478',
    end: '#b9b3a6',
    ai: '#7a4dff',
    app: '#1f8a70',
  };
  const KNAME = {
    trigger: 'Trigger',
    http: 'API / Network',
    code: 'AST / Code',
    logic: 'Logic Gate',
    wait: 'Wait',
    end: 'Termination',
    ai: 'AI Model',
    app: 'Platform Target',
  };

  const FLOWS = window.FLOWS || [];
  const svg = $('#flow-svg');
  const tabs = $('#flow-tabs');

  function drawFlow(f) {
    if (!svg) return;
    svg.innerHTML = '';
    const N = f.nodes;
    const S = 64;
    const pad = 110;
    const mx = Math.max(...N.map((n) => n[2]));
    const my = Math.max(...N.map((n) => n[3]));
    const W = mx + pad * 2;
    const H = my + pad * 2 + 40;

    svg.setAttribute('viewBox', `${-pad} ${-pad} ${W} ${H}`);

    const box = svg.parentElement;
    const fit = box.clientWidth;
    svg.style.width = Math.max(fit, Math.round(W * 0.36)) + 'px';
    box.classList.toggle('is-wide', W * 0.36 > fit + 4);

    const gE = svgEl('g', { fill: 'none', stroke: 'rgba(19,19,19,.38)', 'stroke-width': 3 }, svg);
    f.edges.forEach(([a, b]) => {
      const [, , x1, y1] = N[a];
      const [, , x2, y2] = N[b];
      const dx = Math.max(60, Math.abs(x2 - x1) * 0.5);
      svgEl('path', { d: `M${x1 + S / 2} ${y1}C${x1 + S / 2 + dx} ${y1} ${x2 - S / 2 - dx} ${y2} ${x2 - S / 2} ${y2}` }, gE);
    });

    N.forEach(([name, kind, x, y]) => {
      const g = svgEl('g', { class: 'fnode', transform: `translate(${x} ${y})` }, svg);
      svgEl('title', {}, g).textContent = `${name} (${KNAME[kind] || kind})`;
      svgEl('rect', { x: -S / 2, y: -S / 2, width: S, height: S, rx: 14, fill: KIND[kind] || '#131313', stroke: '#fff', 'stroke-width': 3 }, g);

      const words = name.split(' ');
      const l1 = words.slice(0, 2).join(' ');
      const l2 = words.slice(2, 5).join(' ');
      const t = svgEl('text', { y: S / 2 + 26, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: '#45433f', 'font-family': 'Switzer, sans-serif' }, g);
      svgEl('tspan', { x: 0 }, t).textContent = l1;
      if (l2) svgEl('tspan', { x: 0, dy: 27 }, t).textContent = l2;
      svgEl('circle', { r: 7, fill: 'rgba(255,255,255,.85)' }, g);
    });

    $('#flow-title').textContent = f.title;
    $('#flow-meta').innerHTML = `${f.client} · ${f.nodes.length} nodes${box.classList.contains('is-wide') ? ' · <span class="flow__more">scroll &rarr;</span>' : ''}`;
    box.classList.remove('is-end');
    $('#flow-cap').textContent = f.desc;
  }

  if (FLOWS.length && tabs) {
    tabs.innerHTML = FLOWS.map((f, i) => `<button role="tab" aria-selected="${i === 0}" data-i="${i}">${f.title}</button>`).join('');
    tabs.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', tabs).forEach((x) => x.setAttribute('aria-selected', String(x === b)));
      drawFlow(FLOWS[+b.dataset.i]);
      svg.parentElement.scrollLeft = 0;
    });

    drawFlow(FLOWS[0]);

    svg.parentElement.addEventListener(
      'scroll',
      (e) => {
        const b = e.currentTarget;
        b.classList.toggle('is-end', b.scrollLeft + b.clientWidth >= b.scrollWidth - 4);
      },
      { passive: true }
    );

    const lg = document.createElement('p');
    lg.className = 'flow__legend';
    lg.innerHTML = ['trigger', 'http', 'code', 'logic', 'ai', 'app']
      .map((k) => `<span><i style="background:${KIND[k]}"></i>${KNAME[k]}</span>`)
      .join('');
    $('#flow-cap').after(lg);
  }

  // 3. System Architecture Diagram
  const A = window.ARCH;
  const asvg = $('#arch-svg');
  if (A && asvg) {
    const B = {};
    A.boxes.forEach((b) => (B[b[0]] = b));
    const gl = svgEl('g', { fill: 'none', stroke: 'rgba(19,19,19,.32)', 'stroke-width': 1.4 }, asvg);
    A.links.forEach(([a, b]) => {
      const p = B[a];
      const q = B[b];
      const x1 = p[3] + p[5] / 2;
      const y1 = p[4] + p[6];
      const x2 = q[3] + q[5] / 2;
      const y2 = q[4];
      svgEl('path', { d: `M${x1} ${y1}C${x1} ${(y1 + y2) / 2} ${x2} ${(y1 + y2) / 2} ${x2} ${y2}` }, gl);
    });

    const fill = { app: '#fff', edge: '#ff4f1a', worker: '#131313', data: '#1f8a70', model: '#7a4dff', ext: '#e6e1d4' };
    A.boxes.forEach(([id, t, sub, x, y, w, h, k]) => {
      const g = svgEl('g', { class: 'abox' }, asvg);
      svgEl('rect', { x, y, width: w, height: h, fill: fill[k], stroke: k === 'app' ? '#131313' : 'none', 'stroke-width': 1.5 }, g);
      const light = k !== 'app' && k !== 'ext';
      svgEl(
        'text',
        {
          x: x + 8,
          y: y + (sub ? 17 : 21),
          'font-size': 12.5,
          'font-weight': 700,
          fill: light ? '#fff' : '#131313',
          'font-family': 'Switzer, sans-serif',
        },
        g
      ).textContent = t;
      if (sub) {
        svgEl(
          'text',
          {
            x: x + 8,
            y: y + 31,
            'font-size': 9.5,
            fill: light ? 'rgba(255,255,255,.75)' : '#7b776f',
            'font-family': 'Switzer, sans-serif',
          },
          g
        ).textContent = sub;
      }
    });
  }

  // 4. Lenis Smooth Scroll
  const lenis = reduce ? null : new Lenis({ duration: 1.15, smoothWheel: true });
  if (lenis) {
    lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // 5. Masthead Bar
  const mast = $('#mast');
  const burger = $('.mast__burger');
  let lastY = 0;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (mast) {
        mast.classList.toggle('is-hidden', y > lastY && y > 300 && !mast.classList.contains('is-open'));
      }
      lastY = y;
    },
    { passive: true }
  );

  if (burger) {
    burger.addEventListener('click', () => {
      const o = mast.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(o));
    });
  }

  $$('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const targetSelector = a.getAttribute('href');
      if (targetSelector.length <= 1) return;
      const t = $(targetSelector);
      if (!t) return;
      e.preventDefault();
      if (mast) mast.classList.remove('is-open');
      lenis ? lenis.scrollTo(t, { duration: 1.6 }) : t.scrollIntoView({ behavior: 'smooth' });
    })
  );

  // 6. Preloader Curtain & Line Reveals
  gsap.set('.cover__title .ln > span', { yPercent: 110 });
  gsap.set('[data-intro]', { opacity: 0, y: 20 });
  const n = $('#loader-n');
  const countObj = { v: 0 };
  let sceneOn = 0;

  const introTimeline = gsap
    .timeline({ paused: true })
    .to(countObj, {
      v: 2026,
      duration: 1.1,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (n) n.textContent = Math.round(countObj.v);
      },
    })
    .to('#loader', { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.15')
    .add(() => {
      document.body.classList.remove('is-loading');
      const lEl = $('#loader');
      if (lEl) lEl.remove();
      if (lenis) lenis.start();
      sceneOn = 1;
    }, '-=0.5')
    .to('.cover__title .ln > span', { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.1 }, '-=0.45')
    .to('[data-intro]', { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, '-=1')
    .add(() => ScrollTrigger.refresh());

  const sceneReady = new Promise((r) =>
    window.MAG ? r() : document.addEventListener('scene:ready', r, { once: true })
  );
  Promise.race([
    Promise.all([sceneReady, document.fonts ? document.fonts.ready : 0]),
    new Promise((r) => setTimeout(r, 6000)),
  ]).then(() => introTimeline.play());

  // 7. Pinned Horizontal Track
  const track = $('#archive');
  if (track && !reduce) {
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.archive',
        pin: true,
        start: 'top top',
        end: () => '+=' + dist(),
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  }

  // 8. Scroll Timeline for the 3D Magazine
  let anchors = [];
  let tv = 0;
  let lastT = performance.now();

  const buildAnchors = () => {
    const vh = window.innerHeight;
    const list = [];
    $$('[data-spread]').forEach((sec) => {
      const box = sec.closest('.pin-spacer') || sec;
      const top = box.getBoundingClientRect().top + window.scrollY;
      const bottom = top + box.offsetHeight;
      let h0 = top - vh * 0.1;
      let h1 = bottom - vh * 0.9;
      if (sec.id === 'top') h1 = vh * 0.5;
      if (h1 < h0) h0 = h1 = (h0 + h1) / 2;
      const s = +sec.dataset.spread;
      const prev = list[list.length - 1];
      if (prev && prev.s === s) prev.h1 = Math.max(prev.h1, h1);
      else list.push({ s, h0, h1 });
    });
    if (list.length) {
      list[0].h0 = -1e9;
      list[list.length - 1].h1 = 1e9;
    }
    anchors = list;
  };

  ScrollTrigger.addEventListener('refresh', () => {
    buildAnchors();
    tv = getTargetSpread();
  });

  const getTargetSpread = () => {
    const y = window.scrollY;
    for (let i = 0; i < anchors.length; i++) {
      const A = anchors[i];
      if (y <= A.h1) {
        if (i === 0 || y >= A.h0) return A.s;
        const P = anchors[i - 1];
        return P.s + (A.s - P.s) * Math.min(1, Math.max(0, (y - P.h1) / (A.h0 - P.h1)));
      }
    }
    return anchors.length ? anchors[anchors.length - 1].s : 0;
  };

  let fade = 1;
  const archiveSec = $('.archive');

  gsap.ticker.add(() => {
    if (!window.MAG || !anchors.length) return;
    const now = performance.now();
    const dt = Math.min(0.1, (now - lastT) / 1000);
    lastT = now;
    const goal = getTargetSpread();

    if (Math.abs(goal - tv) > 1.2) tv = goal - Math.sign(goal - tv);
    tv += reduce ? goal - tv : (goal - tv) * (1 - Math.exp(-dt * 8));

    if (archiveSec) {
      const r = archiveSec.getBoundingClientRect();
      const vh = window.innerHeight;
      const inArchive = r.top < vh * 0.55 && r.bottom > vh * 0.45 ? 0 : 1;
      fade += (inArchive - fade) * (1 - Math.exp(-dt * 7));
    }

    const hero = Math.min(1, window.scrollY / (window.innerHeight * 0.45));
    window.MAG.set(hero, tv, sceneOn * fade);
  });

  // 9. Folio Indicator
  const folio = $('#folio');
  const fn = $('#folio-n');
  const ft = $('#folio-t');
  if (folio && fn && ft) {
    $$('[data-folio]').forEach((sec) => {
      const no = sec.querySelector('.sec__no em');
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (s) => {
          if (!s.isActive) return;
          fn.textContent = no && /\d/.test(no.textContent) ? no.textContent : '→';
          ft.textContent = sec.dataset.folio;
          folio.classList.toggle('is-on', sec.id !== 'top');
        },
      });
    });

    ScrollTrigger.create({
      trigger: '.foot',
      start: 'top 92%',
      onToggle: (s) => folio.classList.toggle('is-off', s.isActive),
    });
  }

  // 10. SplitText Line Reveals
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    if (!reduce) {
      $$('[data-lines]').forEach((el) => {
        const split = new SplitText(el, { type: 'lines', linesClass: 'line' });
        split.lines.forEach((l) => {
          const m = document.createElement('span');
          m.className = 'line-mask';
          l.parentNode.insertBefore(m, l);
          m.appendChild(l);
        });
        gsap.from(split.lines, {
          yPercent: 105,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      $$('[data-reveal]').forEach((el) =>
        gsap.from(el, {
          y: 34,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      );

      $$('.sec__no').forEach((el) =>
        gsap.from(el, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      );
    }
    ScrollTrigger.refresh();
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
