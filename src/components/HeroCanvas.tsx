import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  tw: number;
  twSpeed: number;
  depth: number;
  baseAlpha: number;
}

interface Orb {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasSize();

    // Skip drawing when the hero section is fully off-screen (battery/CPU saver).
    // Evaluated synchronously every frame via getBoundingClientRect, so it can
    // never get stuck in a paused state.
    const sectionEl = canvas.parentElement;
    const isSectionOffscreen = () => {
      if (!sectionEl) return false;
      const rect = sectionEl.getBoundingClientRect();
      return rect.bottom < 0 || rect.top > window.innerHeight;
    };

    // ---- Mouse tracker (smoothed) ----
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 190 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    // ---- Layer 1: twinkling starfield ----
    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 8500), 170);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.3 + 0.4,
          tw: Math.random() * Math.PI * 2,
          twSpeed: Math.random() * 0.03 + 0.008,
          depth: Math.random() * 0.8 + 0.2,
          baseAlpha: Math.random() * 0.5 + 0.25
        });
      }
    };

    // ---- Layer 2: drifting nebula orbs ----
    const orbColors = ['0, 245, 212', '56, 189, 248', '129, 140, 248', '167, 139, 250'];
    let orbs: Orb[] = [];
    const initOrbs = () => {
      orbs = [];
      const count = Math.max(3, Math.min(5, Math.floor(width / 500)));
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 220 + 180;
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          color: orbColors[i % orbColors.length],
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          alpha: Math.random() * 0.05 + 0.035
        });
      }
    };

    // ---- Layer 3: constellation network ----
    let nodes: Node[] = [];
    const colors = ['#00f5d4', '#38bdf8', '#818cf8', '#00f5d4'];
    const initNodes = () => {
      nodes = [];
      const count = Math.min(Math.floor((width * height) / 14000), 85);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2.2 + 1.2,
          baseAlpha: Math.random() * 0.45 + 0.35,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.025 + 0.008
        });
      }
    };

    // ---- Layer 4: shooting stars ----
    let meteors: Meteor[] = [];
    let nextMeteorAt = performance.now() + 2500;

    const spawnMeteor = () => {
      const fromLeft = Math.random() > 0.5;
      const speed = Math.random() * 6 + 7;
      const angle = (Math.random() * 20 + 25) * (Math.PI / 180);
      meteors.push({
        x: fromLeft ? Math.random() * width * 0.7 : Math.random() * width * 0.3 + width * 0.7,
        y: Math.random() * height * 0.35,
        vx: (fromLeft ? 1 : -1) * Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 40 + 45
      });
      nextMeteorAt = performance.now() + Math.random() * 7000 + 4000;
    };

    initStars();
    initOrbs();
    initNodes();

    const handleResize = () => {
      setupCanvasSize();
      initStars();
      initOrbs();
      initNodes();
      meteors = [];
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let time = 0;
    const render = () => {
      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
      if (isSectionOffscreen()) return; // hero not visible — skip drawing this frame
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Parallax offset from mouse (stars drift opposite slightly)
      const px = (mouse.x - width / 2) * 0.018;
      const py = (mouse.y - height / 2) * 0.018;

      // --- Orbs: slow drifting nebula glows ---
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r) orb.x = width + orb.r;
        if (orb.x > width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = height + orb.r;
        if (orb.y > height + orb.r) orb.y = -orb.r;

        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        g.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        g.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Stars: twinkling far layer with parallax ---
      for (const s of stars) {
        s.tw += s.twSpeed;
        const a = s.baseAlpha * (0.55 + 0.45 * Math.sin(s.tw));
        const sx = s.x - px * s.depth;
        const sy = s.y - py * s.depth;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 240, 255, ${Math.max(0, a).toFixed(3)})`;
        ctx.fill();
      }

      // --- Meteors ---
      if (!reducedMotion && performance.now() > nextMeteorAt && meteors.length === 0) {
        spawnMeteor();
      }
      meteors = meteors.filter((m) => m.life < m.maxLife && m.x > -200 && m.x < width + 200 && m.y < height + 200);
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        const fade = Math.sin((m.life / m.maxLife) * Math.PI);
        const tx = m.x - m.vx * 14;
        const ty = m.y - m.vy * 14;
        const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
        grad.addColorStop(0, `rgba(255, 255, 255, ${(0.9 * fade).toFixed(3)})`);
        grad.addColorStop(0.3, `rgba(0, 245, 212, ${(0.5 * fade).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(0, 245, 212, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.9 * fade).toFixed(3)})`;
        ctx.fill();
      }

      // --- Mouse glow ---
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        mouseGrad.addColorStop(0, 'rgba(0, 245, 212, 0.08)');
        mouseGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.03)');
        mouseGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Constellation network ---
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        if (nodeA.x < -20) nodeA.x = width + 20;
        if (nodeA.x > width + 20) nodeA.x = -20;
        if (nodeA.y < -20) nodeA.y = height + 20;
        if (nodeA.y > height + 20) nodeA.y = -20;

        // Mouse repel
        const dxMouse = mouse.x - nodeA.x;
        const dyMouse = mouse.y - nodeA.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius && distMouse > 1) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          nodeA.x -= (dxMouse / distMouse) * force * 1.8;
          nodeA.y -= (dyMouse / distMouse) * force * 1.8;
        }

        nodeA.pulse += nodeA.pulseSpeed;
        const currentAlpha = Math.min(1, Math.max(0.1, nodeA.baseAlpha + Math.sin(nodeA.pulse) * 0.2));

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(0, 245, 212, ${opacity.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();

            if ((i + j) % 5 === 0 && opacity > 0.12) {
              const signalProgress = (Math.sin(time * 2 + i) + 1) / 2;
              const sx = nodeA.x + (nodeB.x - nodeA.x) * signalProgress;
              const sy = nodeA.y + (nodeB.y - nodeA.y) * signalProgress;
              ctx.beginPath();
              ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(56, 189, 248, ${(opacity * 2.8).toFixed(3)})`;
              ctx.fill();
            }
          }
        }

        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeA.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = nodeA.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.9
      }}
    />
  );
};
