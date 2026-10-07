import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Mic, Radio } from 'lucide-react';

interface ChatbotAgent3DProps {
  height?: number | string;
}

export const ChatbotAgent3D: React.FC<ChatbotAgent3DProps> = ({ height = 360 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [telemetry, setTelemetry] = useState({
    activeQuery: 'Find benchmark comparisons for Qwen2.5 7B RAG',
    cosineSimilarity: 0.94,
    tokenRate: 86,
    retrievedChunks: 4
  });
  const [isProbing, setIsProbing] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const triggerProbeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const h = typeof height === 'number' ? height : container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 1000);
    camera.position.set(0, 12, 25);
    camera.lookAt(0, 0, 0);

    // 2. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x00f5d4, 2.5);
    cyanLight.position.set(10, 15, 12);
    scene.add(cyanLight);

    const tealLight = new THREE.DirectionalLight(0x0d9488, 1.8);
    tealLight.position.set(-12, -8, -10);
    scene.add(tealLight);

    // 4. Ground Grid
    const gridHelper = new THREE.GridHelper(26, 26, 0x00f5d4, 0x1e293b);
    gridHelper.position.y = -5.0;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.2;
    scene.add(gridHelper);

    // 5. Central Whisper Voice Waveform Rings
    const waveformGroup = new THREE.Group();
    scene.add(waveformGroup);

    const ringCount = 5;
    const waveformRings: THREE.Mesh[] = [];

    for (let r = 0; r < ringCount; r++) {
      const radius = 1.6 + r * 0.45;
      const ringGeo = new THREE.TorusGeometry(radius, 0.04, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? 0x00f5d4 : 0x2dd4bf,
        transparent: true,
        opacity: 0.65 - r * 0.1
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + (r * 0.1);
      ringMesh.rotation.y = r * 0.15;
      waveformGroup.add(ringMesh);
      waveformRings.push(ringMesh);
    }

    // Inner Ollama Synthesis Core
    const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x0f766e,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    waveformGroup.add(coreMesh);

    const coreWireGeo = new THREE.OctahedronGeometry(1.4, 0);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x5eead4,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const coreWireMesh = new THREE.Mesh(coreWireGeo, coreWireMat);
    waveformGroup.add(coreWireMesh);

    // 6. 3D RAG Vector Embeddings Cluster
    const vectorGroup = new THREE.Group();
    scene.add(vectorGroup);

    const clusterCount = 45;
    const clusterPositions: THREE.Vector3[] = [];
    const clusterMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < clusterCount; i++) {
      // Cluster points into a spherical vector space
      const phi = Math.acos(-1 + (2 * i) / clusterCount);
      const theta = Math.sqrt(clusterCount * Math.PI) * phi;
      const radius = 6.5 + (Math.sin(i * 3) * 2.2);

      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi) * 0.7,
        radius * Math.cos(phi)
      );

      clusterPositions.push(pos);

      const nodeGeo = new THREE.SphereGeometry(0.2, 12, 12);
      const isCitation = i % 4 === 0;
      const nodeMat = new THREE.MeshStandardMaterial({
        color: isCitation ? 0x00f5d4 : 0x14b8a6,
        emissive: isCitation ? 0x00f5d4 : 0x0f766e,
        emissiveIntensity: isCitation ? 1.0 : 0.4,
        roughness: 0.3
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      vectorGroup.add(nodeMesh);
      clusterMeshes.push(nodeMesh);
    }

    // Connect nearest neighbor nodes with hairline lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.2
    });

    const linesGroup = new THREE.Group();
    vectorGroup.add(linesGroup);

    for (let i = 0; i < clusterPositions.length; i++) {
      for (let j = i + 1; j < clusterPositions.length; j++) {
        if (clusterPositions[i].distanceTo(clusterPositions[j]) < 3.2) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([clusterPositions[i], clusterPositions[j]]);
          const line = new THREE.Line(lineGeo, lineMaterial);
          linesGroup.add(line);
        }
      }
    }

    // 7. Probe Query Particles (Traveling from core into nearest vectors)
    const probeCount = 20;
    const probeGeo = new THREE.BufferGeometry();
    const probePositions = new Float32Array(probeCount * 3);
    const probeTargetIndices: number[] = [];
    const probeProgress: number[] = [];

    for (let p = 0; p < probeCount; p++) {
      probePositions[p * 3] = 0;
      probePositions[p * 3 + 1] = 0;
      probePositions[p * 3 + 2] = 0;
      probeTargetIndices.push(Math.floor(Math.random() * clusterPositions.length));
      probeProgress.push(Math.random());
    }

    probeGeo.setAttribute('position', new THREE.BufferAttribute(probePositions, 3));
    const probeMat = new THREE.PointsMaterial({
      size: 0.4,
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const probeParticles = new THREE.Points(probeGeo, probeMat);
    scene.add(probeParticles);

    // 8. Orbit Controls (Mouse & Touch Drag)
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotX = 0.25;
    let rotY = 0.0;
    let targetRotX = 0.25;
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

    const onMouseUp = () => { isDragging = false; };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
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
    const onTouchEnd = () => { isDragging = false; };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    // Interactive Probe Query Trigger
    triggerProbeRef.current = () => {
      setIsProbing(true);
      setTelemetry(prev => ({
        ...prev,
        cosineSimilarity: Number((0.92 + Math.random() * 0.06).toFixed(2)),
        tokenRate: Math.floor(82 + Math.random() * 12),
        retrievedChunks: Math.floor(3 + Math.random() * 3)
      }));

      // Highlight target cluster nodes
      clusterMeshes.forEach((mesh, idx) => {
        if (idx % 3 === 0) {
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.5;
        }
      });

      setTimeout(() => {
        clusterMeshes.forEach((mesh, idx) => {
          const isCitation = idx % 4 === 0;
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = isCitation ? 1.0 : 0.4;
        });
        setIsProbing(false);
      }, 1600);
    };

    // 9. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera orbit
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;
      if (!isDragging) {
        targetRotY += 0.002;
      }

      const dist = 25;
      camera.position.x = dist * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = dist * Math.sin(rotX);
      camera.position.z = dist * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 0, 0);

      // Rotate vectors & core
      vectorGroup.rotation.y += 0.003;
      coreMesh.rotation.y += 0.015;
      coreWireMesh.rotation.y -= 0.01;
      coreWireMesh.rotation.z += 0.008;

      // Undulate Whisper audio waveform rings
      waveformRings.forEach((ring, idx) => {
        const wave = Math.sin(time * 3 + idx * 0.8) * 0.15;
        ring.scale.set(1 + wave, 1 + wave, 1 + wave);
        ring.rotation.z += 0.008 * (idx % 2 === 0 ? 1 : -1);
      });

      // Animate probe particles traveling from center to vector nodes
      const posArray = probeParticles.geometry.attributes.position.array as Float32Array;

      for (let p = 0; p < probeCount; p++) {
        probeProgress[p] += isProbing ? 0.03 : 0.012;
        if (probeProgress[p] >= 1.0) {
          probeProgress[p] = 0;
          probeTargetIndices[p] = Math.floor(Math.random() * clusterPositions.length);
        }

        const target = clusterPositions[probeTargetIndices[p]];
        const prog = probeProgress[p];

        posArray[p * 3] = target.x * prog;
        posArray[p * 3 + 1] = target.y * prog;
        posArray[p * 3 + 2] = target.z * prog;
      }

      probeParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

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

      gridHelper.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      coreWireGeo.dispose();
      coreWireMat.dispose();
      probeGeo.dispose();
      probeMat.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [height]);

  const handleTriggerProbe = useCallback(() => {
    if (triggerProbeRef.current) {
      triggerProbeRef.current();
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, rgba(13, 24, 30, 0.9) 0%, rgba(8, 10, 13, 0.98) 100%)',
        border: '1px solid rgba(0, 245, 212, 0.3)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(0, 245, 212, 0.05)'
      }}
    >
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: typeof height === 'number' ? `${height}px` : height,
          cursor: 'grab'
        }}
      />

      {/* Top HUD Header */}
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
            <Radio size={14} />
            <span>3D RAG VECTOR SPACE & VOICE HELIX</span>
          </div>
          <span
            className="pulse-dot"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#00f5d4',
              boxShadow: '0 0 10px #00f5d4'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'auto' }}>
          <button
            onClick={handleTriggerProbe}
            className="btn-outline-cyan"
            style={{
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: isProbing ? 'rgba(0, 245, 212, 0.25)' : 'rgba(0, 0, 0, 0.6)'
            }}
            title="Probe top-k vector embeddings"
          >
            <Mic size={13} style={{ color: 'var(--accent-cyan)' }} />
            <span>{isProbing ? 'QUERYING CLUSTER...' : 'VOICE QUERY PROBE'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
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
              LOCAL INFERENCE
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              Ollama Qwen2.5 (7B)
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              COSINE SIMILARITY
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2dd4bf', fontFamily: 'var(--font-mono)' }}>
              {telemetry.cosineSimilarity}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              THROUGHPUT
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              {telemetry.tokenRate} tok/s
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              WHISPER STT
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
              16kHz STREAMING
            </span>
          </div>
        </div>

        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          DRAG 3D TO ROTATE // NEURAL VECTOR SPACE
        </div>
      </div>
    </div>
  );
};
