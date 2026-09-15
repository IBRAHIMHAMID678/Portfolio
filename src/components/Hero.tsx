import React from 'react';
import { ArrowRight, Sparkles, Code2, Database, ShieldCheck } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';
import { HeroCanvas } from './HeroCanvas';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        overflow: 'hidden'
      }}
    >
      {/* Dynamic Neural Field Canvas */}
      <HeroCanvas />

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* Availability Badge */}
        <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
          <div className="badge-cyan" style={{ padding: '0.4rem 1rem', fontSize: '0.8125rem' }}>
            <span className="pulse-dot" />
            <span>AVAILABLE FOR AI/ML & FULL-STACK ENGINEERING ROLES</span>
          </div>
        </div>

        {/* Hero Title & Identity */}
        <h1
          style={{
            fontSize: 'clamp(2.75rem, 5.5vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            maxWidth: '1000px'
          }}
        >
          Building Intelligent Systems.{' '}
          <span className="cyan-gradient-text">Engineered for Production.</span>
        </h1>

        {/* Hero Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
            color: 'var(--text-muted)',
            maxWidth: '780px',
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}
        >
          Computer Science professional specializing in <strong style={{ color: '#fff' }}>Generative AI</strong>,{' '}
          <strong style={{ color: '#fff' }}>RAG Architecture</strong>, <strong style={{ color: '#fff' }}>LLM Pipelines</strong>,{' '}
          <strong style={{ color: '#fff' }}>FastAPI</strong>, and high-performance full-stack web platforms.
        </p>

        {/* Hero CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '4rem' }}>
          <a href="#projects" className="btn-primary">
            <span>Explore Work Showcase</span>
            <ArrowRight size={18} />
          </a>

          <a href="#sandbox" className="btn-secondary">
            <Sparkles size={18} style={{ color: 'var(--accent-cyan)' }} />
            <span>Try AI Sandbox</span>
          </a>

          <button onClick={onOpenResume} className="btn-outline-cyan">
            <span>View Resume</span>
          </button>
        </div>

        {/* Verified Impact Metrics Bar */}
        <div
          className="glass-card"
          style={{
            padding: '1.5rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(15, 19, 25, 0.75)'
          }}
        >
          {IBRAHIM_DATA.heroStats.map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-mono cyan-gradient-text" style={{ fontSize: '2rem', fontWeight: 800 }}>
                  {stat.value}
                </span>
                {idx === 0 && <Code2 size={18} style={{ color: 'var(--accent-cyan)' }} />}
                {idx === 1 && <Sparkles size={18} style={{ color: '#38bdf8' }} />}
                {idx === 2 && <ShieldCheck size={18} style={{ color: '#10b981' }} />}
                {idx === 3 && <Database size={18} style={{ color: '#a855f7' }} />}
              </div>
              <span className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
