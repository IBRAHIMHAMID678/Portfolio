import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Shield, ShieldAlert, Zap } from 'lucide-react';

interface GuardrailLab3DProps {
  height?: number | string;
}

export const GuardrailLab3D: React.FC<GuardrailLab3DProps> = ({ height = 360 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [shieldMode, setShieldMode] = useState<'hardened' | 'naive'>('hardened');
  const [telemetry, setTelemetry] = useState({
    status: 'SHIELD ACTIVE // HARDENED AST',
    interceptRate: '100% (49/49)',
    invariants: '21/21 PASSING',
    lastEvent: 'READY TO SIMULATE'
  });
  const [isFiring, setIsFiring] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const fireProjectileRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const h = typeof height === 'number' ? height : container.clientHeight || 360;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / h, 0.1, 1000);
    camera.position.set(0, 14, 28);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x00f5d4, 2.5);
    cyanLight.position.set(10, 20, 15);
    scene.add(cyanLight);

    const redLight = new THREE.DirectionalLight(0xef4444, 2.0);
    redLight.position.set(-15, 10, -10);
    scene.add(redLight);

    // Ground Grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x00f5d4, 0x1e293b);
    gridHelper.position.y = -4.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.2;
    scene.add(gridHelper);

    // 1. Left Node: AI Agent Terminal
    const agentGroup = new THREE.Group();
    agentGroup.position.set(-10, 0, 0);
    scene.add(agentGroup);

    const agentBoxGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const agentBoxMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.8
    });
    const agentBox = new THREE.Mesh(agentBoxGeo, agentBoxMat);
    agentGroup.add(agentBox);

    const agentWireGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const agentWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const agentWire = new THREE.Mesh(agentWireGeo, agentWireMat);
    agentGroup.add(agentWire);

    // 2. Center Node: Quantum Defense Shield
    const shieldGroup = new THREE.Group();
    shieldGroup.position.set(0, 0, 0);
    scene.add(shieldGroup);

    // Hexagonal crystal disc
    const shieldDiscGeo = new THREE.CylinderGeometry(3.2, 3.2, 0.2, 6);
    const shieldDiscMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x007a6a,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      metalness: 0.9
    });
    const shieldDisc = new THREE.Mesh(shieldDiscGeo, shieldDiscMat);
    shieldDisc.rotation.z = Math.PI / 2;
    shieldGroup.add(shieldDisc);

    // Concentric forcefield rings
    const ring1Geo = new THREE.TorusGeometry(3.8, 0.08, 16, 48);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.y = Math.PI / 2;
    shieldGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(4.3, 0.05, 16, 48);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 2;
    shieldGroup.add(ring2);

    // 3. Right Node: Protected Server Core
    const serverGroup = new THREE.Group();
    serverGroup.position.set(10, 0, 0);
    scene.add(serverGroup);

    const serverCylGeo = new THREE.CylinderGeometry(1.8, 1.8, 4.0, 32);
    const serverCylMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8
    });
    const serverCyl = new THREE.Mesh(serverCylGeo, serverCylMat);
    serverGroup.add(serverCyl);

    const serverRingGeo = new THREE.TorusGeometry(2.2, 0.08, 16, 40);
    const serverRingMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const serverRing = new THREE.Mesh(serverRingGeo, serverRingMat);
    serverRing.rotation.x = Math.PI / 2;
    serverGroup.add(serverRing);

    // 4. Projectile Mesh (Fired during simulation)
    const projGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const projMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const projectile = new THREE.Mesh(projGeo, projMat);
    projectile.position.set(-10, 0, 0);
    projectile.visible = false;
    scene.add(projectile);

    // Spark Particles
    const sparkCount = 40;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      size: 0.35,
      color: 0x10b981,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const sparkParticles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkParticles);

    // Active projectile state
    let projActive = false;
    let projProgress = 0;
    let projDeflected = false;
    let sparkTimer = 0;

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

    // Firing trigger
    fireProjectileRef.current = () => {
      if (projActive) return;
      setIsFiring(true);
      projActive = true;
      projProgress = 0;
      projDeflected = false;
      projectile.visible = true;
      projectile.position.set(-10, 0, 0);

      setTelemetry(prev => ({
        ...prev,
        lastEvent: 'FIRING ADVERSARIAL SHELL VECTOR: git -C /repo commit'
      }));
    };

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      clock.getDelta();
      clock.getElapsedTime();

      // Camera orbit
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;
      if (!isDragging) {
        targetRotY += 0.002;
      }

      const dist = 28;
      camera.position.x = dist * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = dist * Math.sin(rotX);
      camera.position.z = dist * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 0, 0);

      // Rotate entities
      agentWire.rotation.y += 0.01;
      agentWire.rotation.x += 0.008;
      shieldDisc.rotation.x += 0.012;
      ring1.rotation.x += 0.01;
      ring2.rotation.z -= 0.015;
      serverRing.rotation.z += 0.02;

      // Pulse shield color depending on mode
      const isHardened = shieldMode === 'hardened';
      (shieldDiscMat as THREE.MeshStandardMaterial).color.setHex(isHardened ? 0x00f5d4 : 0xef4444);
      (shieldDiscMat as THREE.MeshStandardMaterial).opacity = isHardened ? 0.75 : 0.25; // Porous if naive
      (ring1Mat as THREE.MeshBasicMaterial).color.setHex(isHardened ? 0x00f5d4 : 0xef4444);

      // Projectile animation
      if (projActive) {
        projProgress += 0.025;

        if (isHardened) {
          // Hardened AST: hits shield at x=0 and ricochets backward
          if (projProgress < 0.5) {
            projectile.position.x = THREE.MathUtils.lerp(-10, 0, projProgress * 2);
          } else {
            if (!projDeflected) {
              projDeflected = true;
              sparkTimer = 1.0;
              // Trigger emerald sparks
              const posArr = sparkParticles.geometry.attributes.position.array as Float32Array;
              for (let s = 0; s < sparkCount; s++) {
                posArr[s * 3] = (Math.random() - 0.5) * 2;
                posArr[s * 3 + 1] = (Math.random() - 0.5) * 2;
                posArr[s * 3 + 2] = (Math.random() - 0.5) * 2;
              }
              sparkParticles.geometry.attributes.position.needsUpdate = true;
              (sparkMat as THREE.PointsMaterial).color.setHex(0x00f5d4);
              (sparkMat as THREE.PointsMaterial).opacity = 1.0;

              setTelemetry(prev => ({
                ...prev,
                lastEvent: '[🛡️ DEFENSE SUCCESS] AST NORMALIZED & INTERCEPTED'
              }));
            }
            // Deflect backwards
            const deflectProg = (projProgress - 0.5) * 2;
            projectile.position.x = THREE.MathUtils.lerp(0, -6, deflectProg);
          }
        } else {
          // Naive Regex: slips through shield to server at x=10
          projectile.position.x = THREE.MathUtils.lerp(-10, 10, projProgress);
          if (projProgress >= 0.5 && !projDeflected) {
            projDeflected = true;
            sparkTimer = 1.0;
            (sparkMat as THREE.PointsMaterial).color.setHex(0xef4444);
            (sparkMat as THREE.PointsMaterial).opacity = 1.0;
            setTelemetry(prev => ({
              ...prev,
              lastEvent: '[⚠️ SYSTEM BREACH] NAIVE REGEX BYPASSED — SERVER COMPROMISED'
            }));
          }
        }

        if (projProgress >= 1.0) {
          projActive = false;
          projectile.visible = false;
          setIsFiring(false);
        }
      }

      // Fade sparks
      if (sparkTimer > 0) {
        sparkTimer -= 0.03;
        (sparkMat as THREE.PointsMaterial).opacity = Math.max(0, sparkTimer);
      }

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
      agentBoxGeo.dispose();
      agentBoxMat.dispose();
      agentWireGeo.dispose();
      agentWireMat.dispose();
      shieldDiscGeo.dispose();
      shieldDiscMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      serverCylGeo.dispose();
      serverCylMat.dispose();
      serverRingGeo.dispose();
      serverRingMat.dispose();
      projGeo.dispose();
      projMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      renderer.dispose();
    };
  }, [height, shieldMode]);

  const handleFire = useCallback(() => {
    if (fireProjectileRef.current) {
      fireProjectileRef.current();
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, rgba(14, 22, 28, 0.9) 0%, rgba(8, 10, 13, 0.98) 100%)',
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
              background: shieldMode === 'hardened' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: shieldMode === 'hardened' ? '1px solid var(--accent-cyan)' : '1px solid #ef4444',
              color: shieldMode === 'hardened' ? 'var(--accent-cyan)' : '#fca5a5',
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            {shieldMode === 'hardened' ? <Shield size={14} /> : <ShieldAlert size={14} />}
            <span>3D PHYSICAL AIR-GAP INTERCEPTOR</span>
          </div>
          <span
            className="pulse-dot"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: shieldMode === 'hardened' ? '#00f5d4' : '#ef4444',
              boxShadow: shieldMode === 'hardened' ? '0 0 10px #00f5d4' : '0 0 10px #ef4444'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'auto' }}>
          {/* Mode Switcher */}
          <button
            onClick={() => setShieldMode(prev => prev === 'hardened' ? 'naive' : 'hardened')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              background: 'rgba(15, 20, 28, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
            title="Toggle between Hardened AST parser vs Naive Regex"
          >
            MODE: {shieldMode === 'hardened' ? 'HARDENED AST' : 'NAIVE REGEX'}
          </button>

          <button
            onClick={handleFire}
            className="btn-outline-cyan"
            style={{
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: isFiring ? 'rgba(0, 245, 212, 0.25)' : 'rgba(0, 0, 0, 0.6)'
            }}
            title="Fire command projectile across defense perimeter"
          >
            <Zap size={13} style={{ color: 'var(--accent-cyan)' }} />
            <span>{isFiring ? 'INTERCEPTING...' : 'FIRE ATTACK VECTOR'}</span>
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
              SECURITY POLICY
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              {shieldMode === 'hardened' ? 'POSIX AST Tokenizer' : 'Porous Regex Blocklist'}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              INTERCEPT SUCCESS
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: shieldMode === 'hardened' ? '#10b981' : '#ef4444', fontFamily: 'var(--font-mono)' }}>
              {shieldMode === 'hardened' ? '100% (49/49)' : '< 30% (Bypassed)'}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              RUNTIME ENGINE
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              21/21 INVARIANTS PASSING
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', fontFamily: 'var(--font-mono)' }}>
              EVENT
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
              {telemetry.lastEvent.slice(0, 36)}
            </span>
          </div>
        </div>

        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          DRAG 3D TO ROTATE // DEFENSE PERIMETER
        </div>
      </div>
    </div>
  );
};
