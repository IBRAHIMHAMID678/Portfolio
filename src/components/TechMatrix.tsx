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
    <section id="skills" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Cpu size={14} />
            <span>04 // VERIFIED SKILL MATRIX</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Technical Capabilities & <br />
            <span className="cyan-gradient-text">Project Evidence.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '700px', marginTop: '0.5rem' }}>
            Every capability listed below is backed by concrete implementation code in SearchBrite, Createlya, Lodestar, Vantage, or Scrapply.
          </p>
        </div>

        {/* 4 Skill Category Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {IBRAHIM_DATA.skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'rgba(255,255,255,0.03)' }}>
                    {getIcon(category.iconName)}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                    {category.title}
                  </h3>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  {category.description}
                </p>

                {/* Skills List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f3f4f6' }}>
                          {skill.name}
                        </span>
                        <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>
                          {skill.level}
                        </span>
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <CheckCircle2 size={12} style={{ color: '#10b981' }} />
                        <span>Proof: {skill.proof}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
