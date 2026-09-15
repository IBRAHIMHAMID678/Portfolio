import React from 'react';
import { ExternalLink } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';

export const GithubStats: React.FC = () => {
  const languages = [
    { name: 'Python', percentage: 46, color: '#3572A5' },
    { name: 'TypeScript', percentage: 32, color: '#3178C6' },
    { name: 'JavaScript', percentage: 14, color: '#F7DF1E' },
    { name: 'HTML / CSS / Docker', percentage: 8, color: '#E34F26' }
  ];

  return (
    <section id="github" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <GithubIcon size={14} />
            <span>06 // GITHUB ENGINEERING ACTIVITY</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Open Source & <br />
            <span className="cyan-gradient-text">Repository Footprint.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Column 1: Profile Summary & Stats */}
          <div
            className="glass-card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'rgba(15, 19, 25, 0.9)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(0,245,212,0.3) 0%, rgba(59,130,246,0.3) 100%)',
                    border: '2px solid var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}
                >
                  <GithubIcon size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Ibrahim Hamid</h3>
                  <a
                    href={IBRAHIM_DATA.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono"
                    style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    @{IBRAHIM_DATA.githubUsername}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Language Distribution Progress Bar */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  LANGUAGE DISTRIBUTION ACROSS REPOSITORIES:
                </span>
                
                <div style={{ height: '8px', width: '100%', borderRadius: '4px', overflow: 'hidden', display: 'flex', marginBottom: '0.75rem' }}>
                  {languages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color
                      }}
                    />
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {languages.map((lang) => (
                    <div key={lang.name} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} className="font-mono">
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: lang.color }} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {lang.name} ({lang.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={IBRAHIM_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-cyan"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <GithubIcon size={16} />
              <span>Visit GitHub Profile</span>
            </a>
          </div>

          {/* Column 2: Highlights of Curated Repositories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <a
                  href="https://github.com/Brandlya-Devs/Britesearch"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: '#fff', fontWeight: 600, fontSize: '1rem' }}
                >
                  Brandlya-Devs / Britesearch
                </a>
                <span className="badge-cyan" style={{ fontSize: '0.65rem' }}>Active</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Real-Time OSINT & ICP Lead Intelligence Platform (Track I ICP Engine & Event Proximity).
              </p>
              <div style={{ display: 'flex', gap: '1rem' }} className="font-mono">
                <span style={{ fontSize: '0.75rem', color: '#3572A5' }}>● Python / Next.js</span>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <a
                  href={IBRAHIM_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: '#fff', fontWeight: 600, fontSize: '1rem' }}
                >
                  IBRAHIMHAMID678 / Createlya
                </a>
                <span className="badge-blue" style={{ fontSize: '0.65rem' }}>Featured</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                AI-Powered Presentation Platform with 1,562 templates and dual-engine restyling.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }} className="font-mono">
                <span style={{ fontSize: '0.75rem', color: '#3178C6' }}>● TypeScript / Python</span>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <a
                  href="https://github.com/Brandlya-Devs/Company-App-Intelligence-Scrapers"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: '#fff', fontWeight: 600, fontSize: '1rem' }}
                >
                  Brandlya-Devs / Lodestar-Engine
                </a>
                <span className="badge-cyan" style={{ fontSize: '0.65rem' }}>Maintained</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Hybrid BM25 keyword + Qdrant vector semantic open-source GitHub idea matcher.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }} className="font-mono">
                <span style={{ fontSize: '0.75rem', color: '#3572A5' }}>● Python / Qdrant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
