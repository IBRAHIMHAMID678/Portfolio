import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        padding: '3rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'var(--bg-dark)',
        color: 'var(--text-muted)'
      }}
    >
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        {/* Left: Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(0, 245, 212, 0.1)',
              border: '1px solid rgba(0, 245, 212, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}
          >
            <Terminal size={16} />
          </div>
          <div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>IBRAHIM HAMID</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>
              AI / ML Engineer & Systems Architect
            </span>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} Ibrahim Hamid. All rights reserved.
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="btn-secondary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
        >
          <span>Back to top</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
};
