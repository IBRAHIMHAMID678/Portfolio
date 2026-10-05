import React from 'react';
import { ArrowRight, Sparkles, Code2, Database, ShieldCheck, Download, ExternalLink, MapPin, BrainCircuit } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';
import { HeroCanvas } from './HeroCanvas';
import { GithubIcon } from './GithubIcon';

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
        paddingTop: '7rem',
        paddingBottom: '4rem',
        overflow: 'hidden'
      }}
    >
      {/* Live Interactive Neural Field Canvas */}
      <HeroCanvas />

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem'
          }}
        >
          {/* Left Column: Core Identity & CTAs */}
          <div>
            {/* Availability Badge */}
            <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
              <div className="badge-cyan" style={{ padding: '0.4rem 1rem', fontSize: '0.8125rem' }}>
                <span className="pulse-dot" />
                <span>AVAILABLE FOR AI/ML & FULL-STACK ROLES</span>
              </div>
            </div>

            {/* Hero Title & Identity */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem'
              }}
            >
              Building Intelligent Systems.{' '}
              <span className="cyan-gradient-text">Engineered for Production.</span>
            </h1>

            {/* Hero Subtitle */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}
            >
              AI Full Stack Developer building production-grade <strong style={{ color: '#fff' }}>Generative AI</strong> systems —{' '}
              <strong style={{ color: '#fff' }}>LangChain RAG</strong> pipelines, <strong style={{ color: '#fff' }}>Python (FastAPI)</strong> backends,{' '}
              <strong style={{ color: '#fff' }}>React / Next.js</strong> frontends, shipped with rigorous QA discipline.
            </p>

            {/* Hero CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <a href="#projects" className="btn-primary">
                <span>Explore Showcase</span>
                <ArrowRight size={18} />
              </a>

              <button onClick={onOpenResume} className="btn-outline-cyan">
                <span>View Resume</span>
              </button>

              <a
                href={IBRAHIM_DATA.resumePdfUrl}
                download="Ibrahim_Hamid_Resume.pdf"
                className="btn-secondary"
                style={{ padding: '0.75rem 1rem' }}
                title="Download Official PDF Resume"
              >
                <Download size={16} />
                <span>PDF</span>
              </a>
            </div>

            {/* Quick Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }} className="font-mono">
              <a
                href={IBRAHIM_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-cyan)', textDecoration: 'none' }}
              >
                <GithubIcon size={16} />
                <span>github.com/{IBRAHIM_DATA.githubUsername}</span>
              </a>
              <span>•</span>
              <a
                href={IBRAHIM_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38bdf8', textDecoration: 'none' }}
              >
                <ExternalLink size={14} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Tech Cybernetic Profile Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="glass-card"
              style={{
                position: 'relative',
                maxWidth: '380px',
                width: '100%',
                padding: '2rem',
                border: '1px solid rgba(0, 245, 212, 0.3)',
                boxShadow: '0 25px 50px -12px rgba(0, 245, 212, 0.15)',
                background: 'linear-gradient(180deg, rgba(15, 20, 28, 0.95) 0%, rgba(8, 10, 14, 0.95) 100%)',
                borderRadius: '24px'
              }}
            >
              {/* Photo with Cybernetic Glowing Ring */}
              <div style={{ position: 'relative', margin: '0 auto 1.5rem auto', width: '190px', height: '190px' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-cyan) 0%, #38bdf8 50%, #818cf8 100%)',
                    filter: 'blur(3px)',
                    opacity: 0.8
                  }}
                />
                <img
                  src={IBRAHIM_DATA.avatarUrl}
                  alt={IBRAHIM_DATA.name}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #080a0d'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '12px',
                    zIndex: 3,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    border: '3px solid #080a0d',
                    boxShadow: '0 0 10px #10b981'
                  }}
                  title="Active Contributor"
                />
              </div>

              {/* Profile Card Details */}
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                  {IBRAHIM_DATA.name}
                </h3>
                <p className="font-mono cyan-gradient-text" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  AI Full Stack Developer
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginTop: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem' }} className="font-mono">
                  <MapPin size={13} style={{ color: 'var(--accent-cyan)' }} />
                  <span>{IBRAHIM_DATA.location} (Open to Remote)</span>
                </div>
              </div>

              {/* Education Snippet */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '0.875rem',
                  marginBottom: '1.25rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem'
                }}
              >
                <BrainCircuit size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, color: '#fff' }}>AI Full Stack Developer</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>BSCS — Capital University of Science & Technology</div>
                </div>
              </div>

              {/* Core Skill Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', justifyContent: 'center' }}>
                {['LangChain', 'FastAPI', 'React', 'Next.js', 'RAG / LLMs', 'Jira QA'].map((pill, pIdx) => (
                  <span key={pIdx} className="tag-pill" style={{ fontSize: '0.725rem', padding: '0.2rem 0.6rem' }}>
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
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
