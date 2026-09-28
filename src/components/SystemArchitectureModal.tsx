import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, RotateCcw, FastForward, Activity, CheckCircle2, Radio } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface SystemArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

type Phase = 'lock' | 'scan' | 'explode' | 'live';

interface LogLine {
  id: number;
  time: string;
  text: string;
  kind: 'sys' | 'ok' | 'flow' | 'warn';
}

const LOCK_MS = 1300;
const SCAN_MS = 2300;
const EXPLODE_MS = 2500;
const HOP_MS = 1900;
const SPACING = 196;

const PHASE_LABEL: Record<Phase, string> = {
  lock: 'TARGET LOCK',
  scan: 'DEEP SCAN',
  explode: 'DISASSEMBLY',
  live: 'LIVE TRACE'
};

const LiveDissection: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const [phase, setPhase] = useState<Phase>('lock');
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [activeHop, setActiveHop] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const timers = useRef<number[]>([]);
  const logId = useRef(0);
  const termRef = useRef<HTMLDivElement>(null);

  const n = project.systemFlow.length;
  const stageHeight = (n - 1) * SPACING + 190;
  const cleanTitle = (t: string) => t.replace(/^\d+\.\s*/, '');
  const stamp = () => new Date().toLocaleTimeString('en-GB', { hour12: false });

  const pushLog = useCallback((text: string, kind: LogLine['kind'] = 'sys') => {
    const id = ++logId.current;
    setLogs((prev) => [...prev.slice(-48), { id, time: stamp(), text, kind }]);
  }, []);

  const later = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const jumpToLive = useCallback(() => {
    clearTimers();
    setPhase('live');
    setShowDetails(true);
    pushLog('> intro skipped — engaging live trace', 'warn');
    pushLog(`> ${n} subsystems isolated :: conduits hot`, 'ok');
    pushLog('> streaming packets through pipeline', 'flow');
  }, [clearTimers, n, pushLog]);

  const runSequence = useCallback(() => {
    clearTimers();
    setPhase('lock');
    setLogs([]);
    setActiveHop(0);
    setShowDetails(false);
    logId.current = 0;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    pushLog('> dissection sequence initiated', 'sys');
    later(500, () => pushLog(`> target locked :: PROJECT_${project.number} // ${cleanTitle(project.title).slice(0, 34)}`, 'ok'));

    if (reduced) {
      later(700, () => {
        setPhase('live');
        setShowDetails(true);
        pushLog(`> ${n} subsystems isolated (reduced motion)`, 'ok');
        pushLog('> live trace engaged', 'flow');
      });
      return;
    }

    later(LOCK_MS, () => {
      setPhase('scan');
      pushLog('> deep scan in progress — probing subsystems', 'sys');
    });
    later(LOCK_MS + 900, () => pushLog(`> ${n} subsystems detected`, 'ok'));
    later(LOCK_MS + 1500, () => pushLog('> data conduits mapped', 'ok'));
    later(LOCK_MS + SCAN_MS, () => {
      setPhase('explode');
      pushLog('> disassembly in progress', 'warn');
      project.systemFlow.forEach((step, i) => {
        later(350 + i * 420, () =>
          pushLog(`> isolating COMPONENT_${String(i + 1).padStart(2, '0')} :: ${cleanTitle(step.title).slice(0, 40)} ✓`, 'ok')
        );
      });
    });
    later(LOCK_MS + SCAN_MS + EXPLODE_MS, () => {
      setPhase('live');
      setShowDetails(true);
      pushLog('> live trace engaged — packets flowing', 'flow');
    });
  }, [clearTimers, later, n, project, pushLog]);

  // live hop loop
  useEffect(() => {
    if (phase !== 'live') return;
    const id = window.setInterval(() => {
      setActiveHop((h) => {
        const next = (h + 1) % n;
        const step = project.systemFlow[next];
        pushLog(
          `▸ hop ${String(h + 1).padStart(2, '0')}→${String(next + 1).padStart(2, '0')} :: ${step.description.slice(0, 72)}${step.description.length > 72 ? '…' : ''}`,
          'flow'
        );
        return next;
      });
    }, HOP_MS);
    return () => window.clearInterval(id);
  }, [phase, n, project, pushLog]);

  useEffect(() => {
    runSequence();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  useEffect(() => {
    const el = termRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const exploded = phase === 'explode' || phase === 'live';

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: '1rem' }}>
      <style>{`
        .live-grid-bg {
          background-image:
            linear-gradient(rgba(0, 245, 212, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 212, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .live-badge {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-family: monospace; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.14em;
          color: #ff5d5d; background: rgba(255, 93, 93, 0.08);
          border: 1px solid rgba(255, 93, 93, 0.45); border-radius: 999px;
          padding: 0.3rem 0.8rem;
        }
        .live-badge.idle { color: #f5c542; background: rgba(245,197,66,0.07); border-color: rgba(245,197,66,0.4); }
        .live-dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; animation: livePulse 1.1s ease-in-out infinite; }
        @keyframes livePulse { 0%,100% { opacity: 1; box-shadow: 0 0 8px currentColor; } 50% { opacity: 0.35; box-shadow: none; } }
        .reticle { position: absolute; width: 26px; height: 26px; border: 2px solid rgba(0,245,212,0.85); animation: reticlePulse 1s ease-in-out infinite; z-index: 5; pointer-events: none; }
        .reticle.tl { top: -14px; left: -14px; border-right: none; border-bottom: none; border-radius: 8px 0 0 0; }
        .reticle.tr { top: -14px; right: -14px; border-left: none; border-bottom: none; border-radius: 0 8px 0 0; }
        .reticle.bl { bottom: -14px; left: -14px; border-right: none; border-top: none; border-radius: 0 0 0 8px; }
        .reticle.br { bottom: -14px; right: -14px; border-left: none; border-top: none; border-radius: 0 0 8px 0; }
        @keyframes reticlePulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.45; transform: scale(1.12); } }
        .scanline {
          position: absolute; left: -4%; right: -4%; height: 3px; z-index: 6; pointer-events: none;
          background: linear-gradient(90deg, transparent, #00f5d4 20%, #7df9ff 50%, #00f5d4 80%, transparent);
          box-shadow: 0 0 24px 4px rgba(0,245,212,0.55);
          animation: scanSweep 1.15s ease-in-out 2;
        }
        @keyframes scanSweep { 0% { top: -2%; opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { top: 102%; opacity: 0; } }
        .live-layer {
          position: absolute; left: 50%; top: 0;
          width: min(500px, 92%);
          transform: translate(-50%, 0);
          transition: transform 0.9s cubic-bezier(0.22, 1.4, 0.36, 1), opacity 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          background: rgba(10, 15, 22, 0.94);
          border: 1px solid rgba(0, 245, 212, 0.25);
          border-radius: 14px;
          padding: 1rem 1.2rem;
          backdrop-filter: blur(6px);
          z-index: 2;
        }
        .live-layer.hot {
          border-color: rgba(0, 245, 212, 0.9);
          box-shadow: 0 0 28px -4px rgba(0, 245, 212, 0.55), 0 12px 32px -16px rgba(0,245,212,0.5);
        }
        .live-conduit {
          position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; transform: translateX(-50%);
          background: linear-gradient(180deg, transparent, rgba(0,245,212,0.6) 10%, rgba(56,189,248,0.6) 90%, transparent);
          opacity: 0; transition: opacity 0.8s ease; z-index: 1;
        }
        .live-conduit.on { opacity: 1; }
        .packet {
          position: absolute; left: 50%; top: 0; width: 10px; height: 10px; margin-left: -5px;
          border-radius: 50%; background: #7df9ff;
          box-shadow: 0 0 12px 3px rgba(125, 249, 255, 0.8);
          animation: packetTravel 2.4s linear infinite; z-index: 3;
        }
        @keyframes packetTravel { from { transform: translateY(6px); opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } to { transform: translateY(var(--track-h)); opacity: 0; } }
        .term-line { animation: termIn 0.25s ease; }
        @keyframes termIn { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: none; } }
        .cursor-blink { animation: blink 0.9s steps(1) infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .live-fadein { animation: fadeUp 0.7s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .phase-chip {
          font-family: monospace; font-size: 0.68rem; letter-spacing: 0.18em; font-weight: 700;
          color: var(--accent-cyan); border: 1px solid rgba(0,245,212,0.35); border-radius: 6px;
          padding: 0.3rem 0.7rem; background: rgba(0,245,212,0.06); white-space: nowrap;
        }
        @media (max-width: 940px) {
          .live-cols { grid-template-columns: 1fr !important; }
          .live-term { min-height: 220px; max-height: 260px; }
        }
      `}</style>

      <div
        className="live-grid-bg"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '1180px', maxHeight: '92vh', overflowY: 'auto',
          background: 'rgba(8, 11, 17, 0.98)', border: '1px solid rgba(0, 245, 212, 0.28)',
          borderRadius: '18px', padding: '1.5rem', position: 'relative',
          boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.85)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
              <span className={`live-badge ${phase === 'live' ? '' : 'idle'}`}>
                <span className="live-dot" />
                {phase === 'live' ? 'LIVE' : 'ARMED'}
              </span>
              <span className="phase-chip">PHASE // {PHASE_LABEL[phase]}</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Activity size={22} style={{ color: 'var(--accent-cyan)' }} />
              Live Dissection — {cleanTitle(project.title)}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{project.tagline}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {phase !== 'live' && (
              <button onClick={jumpToLive} className="btn-outline-cyan" style={{ fontSize: '0.78rem', padding: '0.5rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FastForward size={14} /> Skip intro
              </button>
            )}
            <button onClick={() => runSequence()} className="btn-outline-cyan" style={{ fontSize: '0.78rem', padding: '0.5rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <RotateCcw size={14} /> Replay
            </button>
            <button
              onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', cursor: 'pointer', padding: '0.5rem', display: 'flex' }}
              aria-label="Close dissection"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Stage + terminal */}
        <div className="live-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem', alignItems: 'start' }}>
          {/* Dissection stage */}
          <div style={{ position: 'relative', height: `${stageHeight}px`, borderRadius: '14px', border: '1px solid rgba(0,245,212,0.14)', background: 'rgba(0,245,212,0.015)', overflow: 'hidden' }}>
            <div className={`live-conduit ${exploded ? 'on' : ''}`} style={{ height: '100%' }} />
            {phase === 'live' && (
              <div style={{ position: 'absolute', inset: 0, ['--track-h' as string]: `${stageHeight - 20}px` }}>
                {[0, 1, 2].map((p) => (
                  <span key={p} className="packet" style={{ animationDelay: `${p * 0.8}s` }} />
                ))}
              </div>
            )}
            {(phase === 'lock') && (
              <>
                <span className="reticle tl" /><span className="reticle tr" />
                <span className="reticle bl" /><span className="reticle br" />
              </>
            )}
            {phase === 'scan' && <div className="scanline" />}

            <div className="font-mono" style={{ position: 'absolute', top: '0.7rem', left: '1rem', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-dim)', zIndex: 4 }}>
              ▲ INPUT
            </div>
            <div className="font-mono" style={{ position: 'absolute', bottom: '0.7rem', left: '1rem', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-dim)', zIndex: 4 }}>
              ▼ OUTPUT
            </div>

            {project.systemFlow.map((step, i) => {
              const stacked = !exploded;
              const deckOffset = i * 10;
              const fanOffset = (i - (n - 1) / 2) * SPACING + stageHeight / 2 - 75;
              return (
                <div
                  key={i}
                  className={`live-layer ${phase === 'live' && activeHop === i ? 'hot' : ''}`}
                  style={{
                    zIndex: stacked ? n - i : 4,
                    opacity: stacked ? (i === 0 ? 1 : Math.max(0.25, 1 - i * 0.22)) : 1,
                    transform: stacked
                      ? `translate(-50%, ${deckOffset}px) scale(${1 - i * 0.035})`
                      : `translate(-50%, ${fanOffset}px) scale(1)`,
                    transitionDelay: exploded ? `${i * 0.12}s` : '0s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <span className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 800, color: '#00f5d4', background: 'rgba(0,245,212,0.1)', border: '1px solid rgba(0,245,212,0.4)', borderRadius: '6px', padding: '0.12rem 0.45rem' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f3f4f6', margin: 0 }}>{cleanTitle(step.title)}</h4>
                    {phase === 'live' && activeHop === i && (
                      <span className="font-mono" style={{ marginLeft: 'auto', fontSize: '0.62rem', color: '#7df9ff', letterSpacing: '0.14em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Radio size={11} /> PROCESSING
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>{step.description}</p>
                  <div className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: '0.5rem', letterSpacing: '0.12em' }}>
                    COMPONENT_{String(i + 1).padStart(2, '0')} // STAGE_{i + 1}_OF_{n}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal */}
          <div className="live-term" style={{ background: '#05070b', border: '1px solid rgba(0,245,212,0.2)', borderRadius: '14px', padding: '1rem', height: `${Math.min(stageHeight, 560)}px`, display: 'flex', flexDirection: 'column' }}>
            <div className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'var(--text-dim)', marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f5d4', display: 'inline-block' }} />
              DISSECTION_LOG
            </div>
            <div ref={termRef} className="font-mono" style={{ flex: 1, overflowY: 'auto', fontSize: '0.74rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              {logs.map((l) => (
                <div key={l.id} className="term-line" style={{ color: l.kind === 'ok' ? '#4ade80' : l.kind === 'flow' ? '#7df9ff' : l.kind === 'warn' ? '#f5c542' : '#8b93a3' }}>
                  <span style={{ opacity: 0.45, marginRight: '0.5rem' }}>{l.time}</span>
                  {l.text}
                </div>
              ))}
              <div style={{ color: '#00f5d4' }}>❯<span className="cursor-blink">▊</span></div>
            </div>
          </div>
        </div>

        {/* Contracts + stack */}
        {showDetails && (
          <div className="live-fadein" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem', marginTop: '1.25rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.1rem 1.25rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.7rem' }}>Core Engineering Contracts</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', padding: 0, margin: 0 }}>
                {project.architectureDetails.map((d, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: '#d1d5db', lineHeight: 1.55 }}>
                    <CheckCircle2 size={15} style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem', flexShrink: 0 }} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.1rem 1.25rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.7rem' }}>Technology Stack</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.techStack.map((t, i) => (
                  <span key={i} className="tag-pill" style={{ fontSize: '0.76rem' }}>{t}</span>
                ))}
              </div>
              {project.keyOutcome && (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '0.9rem' }}>
                  <strong style={{ color: '#fff' }}>Outcome: </strong>{project.keyOutcome}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const SystemArchitectureModal: React.FC<SystemArchitectureModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  return <LiveDissection key={project.id} project={project} onClose={onClose} />;
};
