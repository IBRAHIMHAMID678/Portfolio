import React from 'react';
import { ArrowRight, Sparkles, Code2, Database, ShieldCheck, Download, ExternalLink, MapPin, GraduationCap, FileText } from 'lucide-react';
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
        paddingTop: '8.5rem',
        paddingBottom: '5rem',
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
            marginBottom: '4rem'
          }}
        >
          {/* Left Column: Core Identity & CTAs */}
          <div>
            {/* Availability Eyebrow Badge */}
            <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
              <div className="badge-eyebrow">
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
                marginBottom: '1.35rem'
              }}
            >
              Building Intelligent Systems.{' '}
              <span className="cyan-gradient-text">Engineered for Production.</span>
            </h1>

            {/* Hero Subtitle */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                marginBottom: '2.25rem',
                maxWidth: '650px'
              }}
            >
              AI Full Stack Developer building production-grade <strong style={{ color: '#fff' }}>Generative AI</strong> systems —{' '}
              <strong style={{ color: '#fff' }}>LangChain RAG</strong> pipelines, <strong style={{ color: '#fff' }}>Python (FastAPI)</strong> backends,{' '}
              <strong style={{ color: '#fff' }}>React / Next.js</strong> frontends, shipped with rigorous QA discipline.
            </p>

            {/* Hero Island CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.75rem' }}>
              <a href="#projects" className="btn-island-primary">
                <span>Explore Showcase</span>
                <span className="btn-icon-bubble">
                  <ArrowRight size={16} />
                </span>
              </a>

              <button onClick={onOpenResume} className="btn-island-outline">
                <span>View Resume</span>
                <span className="btn-icon-bubble">
                  <FileText size={15} />
                </span>
              </button>

              <a
                href={IBRAHIM_DATA.resumePdfUrl}
                download="Ibrahim_Hamid_Resume.pdf"
                className="btn-island-secondary"
                title="Download Official PDF Resume"
              >
                <span>PDF Resume</span>
                <span className="btn-icon-bubble">
                  <Download size={14} />
                </span>
              </a>
            </div>

            {/* Quick Links with Monospace Aesthetics */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }} className="font-mono">
              <a
                href={IBRAHIM_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-cyan)', textDecoration: 'none' }}
                className="hover-underline"
              >
                <GithubIcon size={16} />
                <span>github.com/{IBRAHIM_DATA.githubUsername}</span>
              </a>
              <span>•</span>
              <a
                href={IBRAHIM_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#38bdf8', textDecoration: 'none' }}
                className="hover-underline"
              >
                <ExternalLink size={14} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Tech Cybernetic Profile Card with Double-Bezel */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="double-bezel"
              style={{
                maxWidth: '390px',
                width: '100%'
              }}
            >
              <div
                className="double-bezel-inner"
                style={{
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {/* Photo with Cybernetic Glowing Ring */}
                <div style={{ position: 'relative', margin: '0 auto 1.5rem auto', width: '190px', height: '190px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-5px',
                      borderRadius: '50%',
                      background: 'conic-gradient(from 0deg, var(--accent-cyan), #38bdf8, #8b5cf6, var(--accent-cyan))',
                      filter: 'blur(4px)',
                      opacity: 0.85,
                      animation: 'spin 12s linear infinite'
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
                      border: '4px solid #080a0e'
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
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      border: '3px solid #080a0e',
                      boxShadow: '0 0 12px #10b981'
                    }}
                    title="Active Contributor & Available"
                  />
                </div>

                {/* Profile Card Details */}
                <div style={{ textAlign: 'center', marginBottom: '1.25rem', width: '100%' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                    {IBRAHIM_DATA.name}
                  </h3>
                  <p className="font-mono cyan-gradient-text" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    AI & Full-Stack Software Engineer
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginTop: '0.45rem', color: 'var(--text-muted)', fontSize: '0.8rem' }} className="font-mono">
                    <MapPin size={13} style={{ color: 'var(--accent-cyan)' }} />
                    <span>{IBRAHIM_DATA.location} (Open to Remote)</span>
                  </div>
                </div>

                {/* Education Snippet */}
                <div
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '14px',
                    padding: '0.875rem 1rem',
                    marginBottom: '1.25rem',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)'
                  }}
                >
                  <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(0,245,212,0.1)', color: 'var(--accent-cyan)' }}>
                    <GraduationCap size={18} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>BS in Computer Science</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.725rem' }}>Capital University of Science & Technology</div>
                  </div>
                </div>

                {/* Core Skill Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                  {['LangChain', 'FastAPI', 'React', 'Next.js', 'RAG / LLMs', 'Jira QA'].map((pill, pIdx) => (
                    <span key={pIdx} className="tag-pill" style={{ fontSize: '0.725rem', padding: '0.25rem 0.65rem' }}>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Impact Metrics Bar in Double-Bezel Hardware Enclosure */}
        <div
          className="double-bezel"
          style={{
            width: '100%',
            maxWidth: '1240px',
            margin: '0 auto'
          }}
        >
          <div
            className="double-bezel-inner"
            style={{
              padding: '1.75rem 2.25rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.75rem',
              background: 'linear-gradient(180deg, rgba(14, 18, 25, 0.95) 0%, rgba(9, 12, 16, 0.98) 100%)'
            }}
          >
            {IBRAHIM_DATA.heroStats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  padding: '0.5rem',
                  borderRadius: '12px',
                  transition: 'background 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span className="font-mono cyan-gradient-text" style={{ fontSize: '2.15rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                    {stat.value}
                  </span>
                  <div style={{ padding: '0.35rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.04)' }}>
                    {idx === 0 && <Code2 size={18} style={{ color: 'var(--accent-cyan)' }} />}
                    {idx === 1 && <Sparkles size={18} style={{ color: '#38bdf8' }} />}
                    {idx === 2 && <ShieldCheck size={18} style={{ color: '#10b981' }} />}
                    {idx === 3 && <Database size={18} style={{ color: '#a855f7' }} />}
                  </div>
                </div>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.02em' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hover-underline:hover {
          text-decoration: underline !important;
        }
      `}</style>
    </section>
  );
};
