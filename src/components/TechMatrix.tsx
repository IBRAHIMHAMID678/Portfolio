import React from 'react';
import { Cpu, Server, Layout, Terminal, CheckCircle2 } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';

export const TechMatrix: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu size={22} style={{ color: 'var(--accent-cyan)' }} />;
      case 'Server': return <Server size={22} style={{ color: '#60a5fa' }} />;
      case 'Layout': return <Layout size={22} style={{ color: '#c084fc' }} />;
      case 'Terminal': return <Terminal size={22} style={{ color: '#34d399' }} />;
      default: return <Cpu size={22} />;
    }
  };

  return (
    <section id="skills" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-eyebrow" style={{ marginBottom: '1rem' }}>
            <span className="pulse-dot" />
            <Cpu size={13} />
            <span>04 // VERIFIED CAPABILITY MATRIX</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Technical Capabilities & <br />
            <span className="cyan-gradient-text">Production Evidence.</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '720px', marginTop: '1rem', lineHeight: 1.6 }}>
            Every capability listed below is backed by concrete implementation code across production systems, enterprise platforms, and verified GitHub repositories.
          </p>
        </div>

        {/* 4 Skill Category Cards in Double-Bezel Hardware Enclosures */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {IBRAHIM_DATA.skillCategories.map((category, idx) => (
            <div key={idx} className="double-bezel">
              <div
                className="double-bezel-inner"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(16, 21, 30, 0.96) 0%, rgba(9, 12, 17, 0.98) 100%)'
                }}
              >
                <div>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {getIcon(category.iconName)}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                      {category.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {category.description}
                  </p>

                  {/* Skills List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.04)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.925rem', fontWeight: 600, color: '#f3f4f6' }}>
                            {skill.name}
                          </span>
                          <span
                            className="font-mono"
                            style={{
                              fontSize: '0.7rem',
                              color: 'var(--accent-cyan)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px',
                              background: 'rgba(0, 245, 212, 0.08)',
                              border: '1px solid rgba(0, 245, 212, 0.2)'
                            }}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <CheckCircle2 size={13} style={{ color: '#10b981', flexShrink: 0 }} />
                          <span>Proof: {skill.proof}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
