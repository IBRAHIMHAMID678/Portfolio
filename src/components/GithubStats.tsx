import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';

export const GithubStats: React.FC = () => {
  const languages = [
    { name: 'Python', percentage: 42, color: '#3572A5' },
    { name: 'JavaScript & TypeScript', percentage: 38, color: '#3178C6' },
    { name: 'Java', percentage: 12, color: '#b07219' },
    { name: 'HTML / CSS / Shell', percentage: 8, color: '#E34F26' }
  ];

  const publicRepos = [
    {
      name: 'AI-Agent',
      url: 'https://github.com/IBRAHIMHAMID678/AI-Agent',
      desc: 'Autonomous multi-turn AI conversational agent with LangChain orchestration, Ollama Qwen2.5, RAG, and Whisper STT voice support.',
      language: 'Python',
      langColor: '#3572A5',
      badge: 'Featured AI'
    },
    {
      name: 'AI-Powered-Vehical-Market-Place',
      url: 'https://github.com/IBRAHIMHAMID678/AI-Powered-Vehical-Market-Place',
      desc: 'Full-stack vehicle marketplace featuring Whisper-driven voice queries, parametric filtering, and MongoDB search indexing.',
      language: 'JavaScript',
      langColor: '#f1e05a',
      badge: 'Full-Stack'
    },
    {
      name: 'Team-Task-Manager-web-application',
      url: 'https://github.com/IBRAHIMHAMID678/Team-Task-Manager-web-application',
      desc: 'Collaborative team task and sprint management system with role-based access, kanban boards, and audit history.',
      language: 'JavaScript',
      langColor: '#f1e05a',
      badge: 'Productivity'
    }
  ];

  return (
    <section id="github" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <GithubIcon size={14} />
            <span>05 // GITHUB ENGINEERING FOOTPRINT</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Public Repositories & <br />
            <span className="cyan-gradient-text">Open-Source Codebase.</span>
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
              background: 'rgba(15, 19, 25, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div>
              {/* Profile Card Header with Real Photo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    padding: '3px',
                    background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%)'
                  }}
                >
                  <img
                    src={IBRAHIM_DATA.avatarUrl}
                    alt={IBRAHIM_DATA.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      // Fallback if image fails to render
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      border: '2px solid #0a0d12'
                    }}
                    title="Active Contributor"
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff' }}>{IBRAHIM_DATA.name}</h3>
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
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Islamabad, Pakistan
                  </span>
                </div>
              </div>

              {/* Language Distribution Progress Bar */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  CORE STACK DISTRIBUTION:
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
              <span>Explore GitHub Repositories</span>
            </a>
          </div>

          {/* Column 2: Highlights of Verified Public Repositories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {publicRepos.map((repo, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.975rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <BookOpen size={16} style={{ color: 'var(--accent-cyan)' }} />
                    <span>{repo.name}</span>
                  </a>
                  <span className="badge-cyan" style={{ fontSize: '0.65rem' }}>{repo.badge}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  {repo.desc}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="font-mono">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: repo.langColor }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: repo.langColor }} />
                    <span>{repo.language}</span>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    <span>View Repo</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
