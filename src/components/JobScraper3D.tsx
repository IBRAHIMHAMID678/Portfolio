import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Zap, Cpu } from 'lucide-react';

interface JobScraper3DProps {
  height?: number | string;
}

interface PlatformNode {
  name: string;
  radius: number;
  speed: number;
  angle: number;
  inclination: number;
  mesh: THREE.Mesh;
  color: number;
}

export const JobScraper3D: React.FC<JobScraper3DProps> = ({ height = 360 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({
    packetsHarvested: 1420,
    evalLatency: 284,
    autoApplied: 48,
    activeSources: 10
  });
  const [scrapeWaveActive, setScrapeWaveActive] = useState(false);

  // References to keep Three.js entities
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const triggerWaveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const h = typeof height === 'number' ? height : container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 1000);
    camera.position.set(0, 14, 24);
    camera.lookAt(0, 0, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f5d4, 2.5);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3b82f6, 2.0);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x10b981, 2.0);
    dirLight3.position.set(15, -5, 5);
    scene.add(dirLight3);

    // 4. Central AI Core (Groq Evaluation Engine)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing crystal
    const coreGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x007a6a,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Outer cyber wireframe cage
    const cageGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageMesh);

    // Core pulsing ring
    const ringGeo = new THREE.RingGeometry(2.7, 2.85, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    coreGroup.add(ringMesh);

    // Second inclined ring
    const ring2Geo = new THREE.RingGeometry(3.1, 3.22, 48);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = Math.PI / 3;
    ring2Mesh.rotation.y = Math.PI / 6;
    coreGroup.add(ring2Mesh);

    // 5. Grid plane floor (Cyber ground)
    const gridHelper = new THREE.GridHelper(30, 30, 0x00f5d4, 0x1e293b);
    gridHelper.position.y = -4.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    scene.add(gridHelper);

    // 6. Platform Satellites (10 Job Sources)
    const platformsData = [
      { name: 'LinkedIn (JobSpy)', radius: 6.8, speed: 0.007, color: 0x0a66c2, inc: 0.15 },
      { name: 'Indeed (JobSpy)', radius: 7.6, speed: -0.006, color: 0x2164f3, inc: -0.2 },
      { name: 'Himalayas API', radius: 8.4, speed: 0.008, color: 0x10b981, inc: 0.35 },
      { name: 'Glassdoor', radius: 9.0, speed: -0.005, color: 0x0caa41, inc: -0.1 },
      { name: 'ZipRecruiter', radius: 9.8, speed: 0.006, color: 0x38bdf8, inc: 0.25 },
      { name: 'Remote OK API', radius: 10.6, speed: -0.007, color: 0xf59e0b, inc: -0.3 },
      { name: 'Remotive API', radius: 11.2, speed: 0.005, color: 0xa855f7, inc: 0.18 },
      { name: 'WeWorkRemotely', radius: 11.8, speed: -0.006, color: 0xec4899, inc: -0.22 },
      { name: 'Python.org Feed', radius: 12.4, speed: 0.007, color: 0xfacc15, inc: 0.12 },
      { name: 'Lever / Greenhouse', radius: 13.0, speed: -0.004, color: 0x00f5d4, inc: 0.05 }
    ];

    const platformNodes: PlatformNode[] = [];
    const platformSatellitesGroup = new THREE.Group();
    scene.add(platformSatellitesGroup);

    platformsData.forEach((p, idx) => {
      const satGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const satMat = new THREE.MeshStandardMaterial({
        color: p.color,
        emissive: p.color,
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.8
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);

      // Add a small aura halo
      const haloGeo = new THREE.RingGeometry(0.45, 0.55, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: p.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      satMesh.add(haloMesh);

      platformSatellitesGroup.add(satMesh);

      platformNodes.push({
        name: p.name,
        radius: p.radius,
        speed: p.speed,
        angle: (idx * (Math.PI * 2)) / platformsData.length,
        inclination: p.inc,
        mesh: satMesh,
        color: p.color
      });
    });

    // 7. Data Stream Particles (Firing from Satellites into Core)
    const packetCount = 120;
    const packetsGeo = new THREE.BufferGeometry();
    const packetPositions = new Float32Array(packetCount * 3);
    const packetColors = new Float32Array(packetCount * 3);

    // Each packet has an origin satellite, a progress (0 to 1), and a speed
    const packetMeta: { nodeIdx: number; progress: number; speed: number; isAutoApply: boolean }[] = [];

    const cyanColor = new THREE.Color(0x00f5d4);
    const greenColor = new THREE.Color(0x10b981);
    const blueColor = new THREE.Color(0x38bdf8);

    for (let i = 0; i < packetCount; i++) {
      const nodeIdx = i % platformNodes.length;
      const isAutoApply = i % 4 === 0; // 25% are approved auto-applies
      const progress = Math.random();
      const speed = 0.008 + Math.random() * 0.012;

      packetMeta.push({ nodeIdx, progress, speed, isAutoApply });

      const c = isAutoApply ? greenColor : (i % 2 === 0 ? cyanColor : blueColor);
      packetColors[i * 3] = c.r;
      packetColors[i * 3 + 1] = c.g;
      packetColors[i * 3 + 2] = c.b;

      packetPositions[i * 3] = 0;
      packetPositions[i * 3 + 1] = 0;
      packetPositions[i * 3 + 2] = 0;
    }

    packetsGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    packetsGeo.setAttribute('color', new THREE.BufferAttribute(packetColors, 3));

    const packetMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const packetParticles = new THREE.Points(packetsGeo, packetMat);
    scene.add(packetParticles);

    // 8. Auto-Apply Output Portal (on the right)
    const portalGroup = new THREE.Group();
    portalGroup.position.set(13, 1, 0);
    scene.add(portalGroup);

    const portalRingGeo = new THREE.TorusGeometry(1.6, 0.12, 16, 40);
    const portalRingMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 1.2,
      roughness: 0.2
    });
    const portalRing = new THREE.Mesh(portalRingGeo, portalRingMat);
    portalRing.rotation.y = Math.PI / 2;
    portalGroup.add(portalRing);

    // 9. Interactive Drag Orbit Handling
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotX = 0.28;
    let rotY = 0.0;
    let targetRotX = 0.28;
    let targetRotY = 0.0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      prevMouse = { x: e.clientX, y: e.clientY };

      targetRotY += dx * 0.007;
      targetRotX = Math.max(-0.6, Math.min(0.8, targetRotX + dy * 0.007));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      targetRotY += dx * 0.007;
      targetRotX = Math.max(-0.6, Math.min(0.8, targetRotX + dy * 0.007));
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    // Scrape Wave Trigger Function
    triggerWaveRef.current = () => {
      setScrapeWaveActive(true);
      setStats(prev => ({
        ...prev,
        packetsHarvested: prev.packetsHarvested + 85,
        autoApplied: prev.autoApplied + 4,
        evalLatency: 195
      }));

      // Boost packet speeds temporarily
      packetMeta.forEach(pm => {
        pm.speed *= 2.5;
        pm.progress = Math.random() * 0.3; // Reset closer to source
      });

      setTimeout(() => {
        packetMeta.forEach(pm => {
          pm.speed /= 2.5;
        });
        setScrapeWaveActive(false);
      }, 1800);
    };

    // 10. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera orbit rotation
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      if (!isDragging) {
        targetRotY += 0.002; // Slow ambient orbit
      }

      // Position camera based on orbit
      const dist = 26;
      camera.position.x = dist * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = dist * Math.sin(rotX);
      camera.position.z = dist * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 0, 0);

      // Rotate central AI core
      coreMesh.rotation.y += 0.012;
      coreMesh.rotation.x += 0.008;
      cageMesh.rotation.y -= 0.009;
      cageMesh.rotation.z += 0.007;

      // Pulse core scale
      const scale = 1.0 + Math.sin(time * 3) * 0.06;
      coreGroup.scale.set(scale, scale, scale);

      ringMesh.rotation.z += 0.01;
      ring2Mesh.rotation.z -= 0.012;

      // Rotate auto-apply portal
      portalRing.rotation.z += 0.02;

      // Update satellites
      platformNodes.forEach((node) => {
        node.angle += node.speed;
        const x = Math.cos(node.angle) * node.radius;
        const z = Math.sin(node.angle) * node.radius;
        const y = Math.sin(node.angle * 2) * (node.radius * node.inclination);
        node.mesh.position.set(x, y, z);
      });

      // Update data stream packets
      const positions = packetParticles.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < packetCount; i++) {
        const meta = packetMeta[i];
        const node = platformNodes[meta.nodeIdx];

        meta.progress += meta.speed;

        if (meta.progress >= 1.0) {
          meta.progress = 0;
          meta.nodeIdx = Math.floor(Math.random() * platformNodes.length);
        }

        // Lerp position from satellite node toward central core (or toward portal if auto-apply)
        const startX = node.mesh.position.x;
        const startY = node.mesh.position.y;
        const startZ = node.mesh.position.z;

        let endX = 0;
        let endY = 0;
        let endZ = 0;

        if (meta.isAutoApply && meta.progress > 0.5) {
          // If approved, shoots out to portal on the right
          const localProgress = (meta.progress - 0.5) * 2;
          endX = portalGroup.position.x;
          endY = portalGroup.position.y;
          endZ = portalGroup.position.z;

          positions[i * 3] = THREE.MathUtils.lerp(0, endX, localProgress);
          positions[i * 3 + 1] = THREE.MathUtils.lerp(0, endY, localProgress) + Math.sin(localProgress * Math.PI) * 1.5;
          positions[i * 3 + 2] = THREE.MathUtils.lerp(0, endZ, localProgress);
        } else {
          // Normal ingestion into core
          positions[i * 3] = THREE.MathUtils.lerp(startX, endX, meta.progress);
          positions[i * 3 + 1] = THREE.MathUtils.lerp(startY, endY, meta.progress) + Math.sin(meta.progress * Math.PI) * 1.0;
          positions[i * 3 + 2] = THREE.MathUtils.lerp(startZ, endZ, meta.progress);
        }
      }

      packetParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth || 600;
      const newH = typeof height === 'number' ? height : container.clientHeight || 360;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      // Clean Three.js resources
      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      gridHelper.dispose();
      packetsGeo.dispose();
      packetMat.dispose();
      portalRingGeo.dispose();
      portalRingMat.dispose();
      renderer.dispose();
    };
  }, [height]);

  const handleTriggerWave = useCallback(() => {
    if (triggerWaveRef.current) {
      triggerWaveRef.current();
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.85) 0%, rgba(8, 10, 13, 0.98) 100%)',
        border: '1px solid rgba(0, 245, 212, 0.3)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(0, 245, 212, 0.05)'
      }}
    >
      {/* 3D Canvas Mounting Container */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: typeof height === 'number' ? `${height}px` : height,
          cursor: 'grab'
        }}
      />

      {/* Top HUD Overlay Header */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              background: 'rgba(0, 245, 212, 0.15)',
              border: '1px solid var(--accent-cyan)',
              color: 'var(--accent-cyan)',
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Cpu size={14} />
            <span>3D AUTONOMOUS PIPELINE RADAR</span>
          </div>
          <span
            className="pulse-dot"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px #10b981'
            }}
          />
        </div>

        {/* Live Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'auto' }}>
          <button
            onClick={handleTriggerWave}
            className="btn-outline-cyan"
            style={{
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: scrapeWaveActive ? 'rgba(0, 245, 212, 0.25)' : 'rgba(0, 0, 0, 0.6)'
            }}
            title="Fire scraping sweep across all 10 sources"
          >
            <Zap size={13} style={{ color: 'var(--accent-cyan)' }} />
            <span>{scrapeWaveActive ? 'SWEEPING...' : 'SCRAPE SWEEP'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Metrics Strip */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.625rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0.875rem',
          background: 'rgba(10, 13, 18, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              HARVESTED PACKETS
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              {stats.packetsHarvested.toLocaleString()}+
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              GROQ EVAL SPEED
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              {stats.evalLatency}ms
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              AUTO-APPLY DISPATCHED
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
              {stats.autoApplied} SUBMITTED
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              ACTIVE SOURCES
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
              {stats.activeSources} PLATFORMS
            </span>
          </div>
        </div>

        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          DRAG 3D TO ROTATE // INTERACTIVE AIR-GAP
        </div>
      </div>
    </div>
  );
};
