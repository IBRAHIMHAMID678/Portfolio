import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Globe, Activity } from 'lucide-react';

interface SignalHarbor3DProps {
  height?: number;
}

export const SignalHarbor3D: React.FC<SignalHarbor3DProps> = ({ height = 360 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSignal, setActiveSignal] = useState('OSINT MESH READY');
  const [verifiedCount, setVerifiedCount] = useState(148);
  const [isProbing, setIsProbing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06090e, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group
    const root = new THREE.Group();
    scene.add(root);

    // 1. Central Core Wireframe Sphere (OSINT Planet)
    const sphereGeo = new THREE.SphereGeometry(1.4, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    root.add(sphereMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    root.add(innerCore);

    // 2. Orbital Constellation Nodes (Verified Prospects & Domains)
    const nodeCount = 36;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGroup = new THREE.Group();
    root.add(nodeGroup);

    const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
    const verifiedMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const flaggedMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 1.6 + Math.sin(i * 1.5) * 0.35;

      const pos = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);

      const mat = i % 3 === 0 ? verifiedMat : i % 2 === 0 ? nodeMat : flaggedMat;
      const node = new THREE.Mesh(nodeGeo, mat);
      node.position.copy(pos);
      nodeGroup.add(node);
    }

    // 3. Dynamic Connecting Synapse Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.15
    });
    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.25) {
          linePoints.push(nodePositions[i], nodePositions[j]);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    root.add(lines);

    // 4. Orbital Radar Ring
    const ringGeo = new THREE.RingGeometry(2.1, 2.14, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    root.add(ringMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotY = mouseX * 0.8;
      targetRotX = -mouseY * 0.4;
    };

    container.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Continuous Idle Rotation
      root.rotation.y += delta * 0.22;
      root.rotation.x += (targetRotX - root.rotation.x) * 0.05;
      root.rotation.y += (targetRotY - root.rotation.y) * 0.05;

      innerCore.rotation.y -= delta * 0.5;
      innerCore.rotation.z += delta * 0.3;
      ringMesh.rotation.z = time * 0.15;

      // Pulse Central Mesh
      const scale = 1 + Math.sin(time * 2) * 0.02;
      sphereMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      nodeGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [height]);

  const triggerProbe = () => {
    setIsProbing(true);
    setActiveSignal('DISPATCHING OSINT MX PROBE...');
    setTimeout(() => {
      setActiveSignal('MX HANDSHAKE: 250 OK (RFC VALIDATED)');
      setVerifiedCount(prev => prev + 1);
      setTimeout(() => {
        setActiveSignal('PROVENANCE HASH: 0x9f4a...dc81');
        setTimeout(() => {
          setIsProbing(false);
          setActiveSignal('OSINT MESH READY');
        }, 1200);
      }, 1200);
    }, 900);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: `${height}px`, background: '#05070a', overflow: 'hidden' }}>
      {/* Three.js Canvas Container */}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Top HUD Status Bar */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 5
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: '0.725rem',
            padding: '0.3rem 0.65rem',
            borderRadius: '6px',
            background: 'rgba(6, 10, 16, 0.85)',
            border: '1px solid rgba(0, 245, 212, 0.3)',
            color: 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backdropFilter: 'blur(8px)'
          }}
        >
          <Globe size={12} />
          <span>B2B OSINT ORBITAL GRAPH</span>
        </div>

        <button
          onClick={triggerProbe}
          disabled={isProbing}
          style={{
            pointerEvents: 'auto',
            background: isProbing ? 'rgba(0, 245, 212, 0.2)' : 'rgba(6, 10, 16, 0.85)',
            border: '1px solid rgba(0, 245, 212, 0.4)',
            color: 'var(--accent-cyan)',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 700,
            cursor: isProbing ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <Activity size={12} className={isProbing ? 'spin' : ''} />
          <span>{isProbing ? 'AUDITING...' : 'PROBE PROSPECT'}</span>
        </button>
      </div>

      {/* Bottom Live OSINT Telemetry */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          padding: '0.65rem 0.85rem',
          borderRadius: '10px',
          background: 'rgba(6, 10, 16, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          backdropFilter: 'blur(10px)',
          zIndex: 5
        }}
        className="font-mono"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
          <span style={{ fontSize: '0.75rem', color: isProbing ? '#38bdf8' : '#10b981', fontWeight: 600 }}>
            {activeSignal}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <span>VERIFIED: <strong style={{ color: '#fff' }}>{verifiedCount}</strong></span>
          <span>BOUNCE: <strong style={{ color: '#10b981' }}>0.0%</strong></span>
        </div>
      </div>
    </div>
  );
};
