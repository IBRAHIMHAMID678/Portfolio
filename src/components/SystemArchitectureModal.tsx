import React, { useEffect } from 'react';
import { X, Workflow, CheckCircle2, ArrowDown } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface SystemArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export const SystemArchitectureModal: React.FC<SystemArchitectureModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const cleanTitle = (t: string) => t.replace(/^\d+\.\s*/, '');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '920px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          background: '#0d1117',
          border: '1px solid rgba(0, 245, 212, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        <style>{`
          .arch-blueprint {
            position: relative;
            padding: 1.5rem 0.5rem 0.5rem;
            background-image:
              linear-gradient(rgba(0, 245, 212, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 212, 0.04) 1px, transparent 1px);
            background-size: 28px 28px;
            border-radius: 12px;
          }
          .arch-spine {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            transform: translateX(-50%);
            background: linear-gradient(180deg,
              transparent 0%,
              rgba(0, 245, 212, 0.55) 12%,
              rgba(56, 189, 248, 0.55) 88%,
              transparent 100%);
          }
          .arch-row {
            position: relative;
            display: flex;
            margin-bottom: 1.4rem;
          }
          .arch-row.left { justify-content: flex-start; }
          .arch-row.right { justify-content: flex-end; }
          .arch-node {
            width: calc(50% - 2.75rem);
            background: rgba(10, 14, 20, 0.92);
            border: 1px solid rgba(0, 245, 212, 0.28);
            border-radius: 12px;
            padding: 1rem 1.15rem;
            box-shadow: 0 8px 24px -12px rgba(0, 245, 212, 0.35);
            backdrop-filter: blur(4px);
          }
          .arch-port {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #00f5d4;
            border: 2px solid #0d1117;
            animation: archPulse 2.2s ease-in-out infinite;
            z-index: 2;
          }
          .arch-port::after {
            content: '';
            position: absolute;
            top: 50%;
            height: 2px;
            width: 2.75rem;
            background: linear-gradient(90deg, rgba(0,245,212,0.15), rgba(0,245,212,0.6));
            transform: translateY(-50%);
          }
          .arch-row.left .arch-port::after { right: 7px; }
          .arch-row.right .arch-port::after {
            left: 7px;
            background: linear-gradient(90deg, rgba(0,245,212,0.6), rgba(0,245,212,0.15));
          }
          @keyframes archPulse {
            0%, 100% { box-shadow: 0 0 6px rgba(0,245,212,0.5); }
            50% { box-shadow: 0 0 18px rgba(0,245,212,1); }
          }
          @media (max-width: 640px) {
            .arch-spine { left: 14px; }
            .arch-row.left, .arch-row.right { justify-content: flex-start; }
            .arch-node { width: calc(100% - 3.25rem); margin-left: 3.25rem; }
            .arch-port { left: 14px; }
            .arch-row.left .arch-port::after,
            .arch-row.right .arch-port::after {
              right: 7px;
              left: auto;
              width: 3.25rem;
              background: linear-gradient(90deg, rgba(0,245,212,0.15), rgba(0,245,212,0.6));
            }
          }
        `}</style>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="badge-cyan" style={{ marginBottom: '0.5rem' }}>
            <Workflow size={14} />
            <span>SYSTEM ARCHITECTURE DISSECTION // {project.number}</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>{project.title}</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{project.tagline}</p>
        </div>

        {/* Inner Architecture Blueprint */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
              Inner Architecture Blueprint
            </h3>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ArrowDown size={12} />
              DATA FLOW
            </span>
          </div>

          <div className="arch-blueprint">
            <div className="arch-spine" />
            {project.systemFlow.map((step, idx) => {
              const side = idx % 2 === 0 ? 'left' : 'right';
              return (
                <div key={idx} className={`arch-row ${side}`}>
                  <div className="arch-node">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          color: '#00f5d4',
                          background: 'rgba(0, 245, 212, 0.1)',
                          border: '1px solid rgba(0, 245, 212, 0.4)',
                          borderRadius: '6px',
                          padding: '0.15rem 0.45rem',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f3f4f6', margin: 0 }}>
                        {cleanTitle(step.title)}
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                      {step.description}
                    </p>
                    <div className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--text-dim)', marginTop: '0.55rem', letterSpacing: '0.12em' }}>
                      COMPONENT_{String(idx + 1).padStart(2, '0')} // STAGE_{idx + 1}_OF_{project.systemFlow.length}
                    </div>
                  </div>
                  <div className="arch-port" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Architectural Decisions */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#fff' }}>
            Core Engineering Contracts
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', padding: 0, margin: 0 }}>
            {project.architectureDetails.map((detail, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: '#d1d5db' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem', flexShrink: 0 }} />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Matrix */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#fff' }}>
            Technology Stack
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.techStack.map((tech, idx) => (
              <span key={idx} className="tag-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
