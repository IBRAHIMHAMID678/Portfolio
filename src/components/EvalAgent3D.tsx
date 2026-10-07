import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Scale, AlertTriangle } from 'lucide-react';

interface EvalAgent3DProps {
  height?: number | string;
}

export const EvalAgent3D: React.FC<EvalAgent3DProps> = ({ height = 360 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [auditStats, setAuditStats] = useState({
    verdict: 'FAIL (HALLUCINATION DETECTED)',
    faithfulness: '2.1 / 5',
    relevance: '4.8 / 5',
    unsupportedSpans: 2,
    judgeModel: 'Groq LLaMA-3.1 70B'
  });
  const [isAuditing, setIsAuditing] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const triggerAuditRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const h = typeof height === 'number' ? height : container.clientHeight || 360;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 1000);
    camera.position.set(0, 14, 26);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f5d4, 2.5);
    dirLight1.position.set(12, 18, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xef4444, 2.0);
    dirLight2.position.set(-15, 10, -10);
    scene.add(dirLight2);

    // Ground Grid
    const gridHelper = new THREE.GridHelper(28, 28, 0x00f5d4, 0x1e293b);
    gridHelper.position.y = -4.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.22;
    scene.add(gridHelper);

    // 1. Central Forensic Examination Bench (Pedestals)
    const benchGroup = new THREE.Group();
    scene.add(benchGroup);

    // Left Platform: Model Candidate Answer A
    const platAGeo = new THREE.CylinderGeometry(2.5, 2.8, 0.6, 32);
    const platAMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8
    });
    const platA = new THREE.Mesh(platAGeo, platAMat);
    platA.position.set(-6, -3.8, 0);
    benchGroup.add(platA);

    const ringAGeo = new THREE.TorusGeometry(2.7, 0.05, 16, 48);
    const ringAMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ringA = new THREE.Mesh(ringAGeo, ringAMat);
    ringA.rotation.x = Math.PI / 2;
    ringA.position.set(-6, -3.5, 0);
    benchGroup.add(ringA);

    // Right Platform: Model Candidate Answer B / Ground Truth
    const platBGeo = new THREE.CylinderGeometry(2.5, 2.8, 0.6, 32);
    const platBMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8
    });
    const platB = new THREE.Mesh(platBGeo, platBMat);
    platB.position.set(6, -3.8, 0);
    benchGroup.add(platB);

    const ringBGeo = new THREE.TorusGeometry(2.7, 0.05, 16, 48);
    const ringBMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
    const ringB = new THREE.Mesh(ringBGeo, ringBMat);
    ringB.rotation.x = Math.PI / 2;
    ringB.position.set(6, -3.5, 0);
    benchGroup.add(ringB);

    // 2. Central Holographic Claim Ledger Tablets
    const claimGroup = new THREE.Group();
    scene.add(claimGroup);

    interface ClaimBox {
      mesh: THREE.Mesh;
      wireMesh: THREE.Mesh;
      baseColor: number;
      isHallucination: boolean;
      yBase: number;
    }

    const claims: ClaimBox[] = [];
    const claimData = [
      { x: -3.5, y: 1.0, z: 0, isHallucination: false, color: 0x00f5d4, label: 'Claim 1: Supported' },
      { x: 0, y: 2.2, z: 1.2, isHallucination: true, color: 0xef4444, label: 'Claim 2: Hallucination Trap' },
      { x: 3.5, y: 0.8, z: -0.5, isHallucination: false, color: 0x10b981, label: 'Claim 3: Source Entailment' }
    ];

    claimData.forEach((c) => {
      const boxGeo = new THREE.BoxGeometry(1.6, 1.1, 0.25);
      const boxMat = new THREE.MeshStandardMaterial({
        color: c.color,
        emissive: c.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.7,
        transparent: true,
        opacity: 0.85
      });
      const boxMesh = new THREE.Mesh(boxGeo, boxMat);
      boxMesh.position.set(c.x, c.y, c.z);

      const wireGeo = new THREE.BoxGeometry(1.7, 1.2, 0.3);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      boxMesh.add(wireMesh);

      claimGroup.add(boxMesh);
      claims.push({
        mesh: boxMesh,
        wireMesh,
        baseColor: c.color,
        isHallucination: c.isHallucination,
        yBase: c.y
      });
    });

    // 3. Sweeping Forensic Laser Scanner Line
    const laserGeo = new THREE.CylinderGeometry(0.04, 0.04, 18, 16);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.75
    });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.rotation.z = Math.PI / 2;
    laserMesh.position.set(0, 5, 0);
    scene.add(laserMesh);

    // 4. Floating Evidence Dust Particles
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let d = 0; d < dustCount; d++) {
      dustPositions[d * 3] = (Math.random() - 0.5) * 18;
      dustPositions[d * 3 + 1] = Math.random() * 8 - 2;
      dustPositions[d * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.6
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 5. Drag Orbit Handling
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
    const onMouseUp = () => { isDragging = false; };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch
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

    // Interactive Trigger
    triggerAuditRef.current = () => {
      setIsAuditing(true);
      (laserMat as THREE.MeshBasicMaterial).color.setHex(0xef4444);

      // Flash hallucination claim in red with shockwave
      claims.forEach((c) => {
        if (c.isHallucination) {
          (c.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 3.0;
        } else {
          (c.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.8;
        }
      });

      setAuditStats(prev => ({
        ...prev,
        faithfulness: '1.8 / 5',
        unsupportedSpans: 3
      }));

      setTimeout(() => {
        (laserMat as THREE.MeshBasicMaterial).color.setHex(0x00f5d4);
        claims.forEach((c) => {
          (c.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
        });
        setIsAuditing(false);
      }, 1800);
    };

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      clock.getDelta();
      const time = clock.getElapsedTime();

      // Camera orbit
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;
      if (!isDragging) {
        targetRotY += 0.002;
      }

      const dist = 26;
      camera.position.x = dist * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = dist * Math.sin(rotX);
      camera.position.z = dist * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 0, 0);

      // Bobbing floating claims
      claims.forEach((c, idx) => {
        c.mesh.position.y = c.yBase + Math.sin(time * 2 + idx * 1.2) * 0.25;
        c.mesh.rotation.y = Math.sin(time * 1.5 + idx) * 0.15;
      });

      // Sweep laser vertically
      laserMesh.position.y = 1.5 + Math.sin(time * (isAuditing ? 6 : 2.5)) * 3.0;

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
      platAGeo.dispose();
      platAMat.dispose();
      platBGeo.dispose();
      platBMat.dispose();
      laserGeo.dispose();
      laserMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, [height]);

  const handleTriggerAudit = useCallback(() => {
    if (triggerAuditRef.current) {
      triggerAuditRef.current();
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, rgba(16, 22, 28, 0.9) 0%, rgba(8, 10, 13, 0.98) 100%)',
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
            <Scale size={14} />
            <span>3D FORENSIC EVAL BENCH & ARBITRATION SCALE</span>
          </div>
          <span
            className="pulse-dot"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: isAuditing ? '#ef4444' : '#10b981',
              boxShadow: isAuditing ? '0 0 10px #ef4444' : '0 0 10px #10b981'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'auto' }}>
          <button
            onClick={handleTriggerAudit}
            className="btn-outline-cyan"
            style={{
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: isAuditing ? 'rgba(239, 68, 68, 0.25)' : 'rgba(0, 0, 0, 0.6)',
              borderColor: isAuditing ? '#ef4444' : 'var(--accent-cyan)',
              color: isAuditing ? '#fca5a5' : 'var(--accent-cyan)'
            }}
            title="Execute forensic claim scan"
          >
            <AlertTriangle size={13} />
            <span>{isAuditing ? 'AUDITING CLAIMS...' : 'RUN FORENSIC SCAN'}</span>
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
              LLM JUDGE VERDICT
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-mono)' }}>
              {auditStats.verdict}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              FAITHFULNESS SCORE
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              {auditStats.faithfulness}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              UNSUPPORTED SPANS
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
              {auditStats.unsupportedSpans} DETECTED
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              JUDGE INFERENCE
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
              Groq LLaMA-3.1 (70B)
            </span>
          </div>
        </div>

        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          DRAG 3D TO ROTATE // FORENSIC BENCH
        </div>
      </div>
    </div>
  );
};
