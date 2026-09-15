import React, { useEffect, useRef } from 'react';

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

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    // Mouse tracker
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 190
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      setupCanvasSize();
      initNodes();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Node collection
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

    initNodes();

    // Render Loop
    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Draw subtle interactive cursor glow
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

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Motion update
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Wrap around bounds softly
        if (nodeA.x < -20) nodeA.x = width + 20;
        if (nodeA.x > width + 20) nodeA.x = -20;
        if (nodeA.y < -20) nodeA.y = height + 20;
        if (nodeA.y > height + 20) nodeA.y = -20;

        // Mouse influence
        const dxMouse = mouse.x - nodeA.x;
        const dyMouse = mouse.y - nodeA.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius && distMouse > 1) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          nodeA.x -= (dxMouse / distMouse) * force * 1.8;
          nodeA.y -= (dyMouse / distMouse) * force * 1.8;
        }

        // Pulse calculation
        nodeA.pulse += nodeA.pulseSpeed;
        const currentAlpha = Math.min(1, Math.max(0.1, nodeA.baseAlpha + Math.sin(nodeA.pulse) * 0.2));

        // Connect nearby nodes
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
            ctx.strokeStyle = `rgba(0, 245, 212, ${opacity})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();

            // Traveling light packet signals
            if ((i + j) % 5 === 0 && opacity > 0.12) {
              const signalProgress = (Math.sin(time * 2 + i) + 1) / 2;
              const sx = nodeA.x + (nodeB.x - nodeA.x) * signalProgress;
              const sy = nodeA.y + (nodeB.y - nodeA.y) * signalProgress;
              ctx.beginPath();
              ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(56, 189, 248, ${opacity * 2.8})`;
              ctx.fill();
            }
          }
        }

        // Draw node
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

      animationFrameId = requestAnimationFrame(render);
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
