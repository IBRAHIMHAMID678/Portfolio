import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        padding: '3.5rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(6, 8, 12, 0.98)',
        color: 'var(--text-muted)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        {/* Left: Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
              border: '1px solid rgba(0, 245, 212, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              boxShadow: '0 0 15px rgba(0, 245, 212, 0.1)'
            }}
          >
            <Terminal size={17} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
                IBRAHIM HAMID
              </span>
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
            </div>
            <span className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--accent-cyan)', display: 'block' }}>
              AI/ML Engineer & Systems Architect
            </span>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} Ibrahim Hamid. Engineered with precision & verified production rigor.
        </div>

        {/* Right: Island Back to top button */}
        <button
          onClick={scrollToTop}
          className="btn-island-secondary"
          style={{ padding: '0.45rem 0.6rem 0.45rem 1.15rem', fontSize: '0.825rem' }}
          title="Scroll back to top"
        >
          <span>Top</span>
          <span className="btn-icon-bubble" style={{ width: '26px', height: '26px' }}>
            <ArrowUp size={13} />
          </span>
        </button>
      </div>
    </footer>
  );
};
