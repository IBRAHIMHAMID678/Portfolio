import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="badge-eyebrow" style={{ marginBottom: '1rem' }}>
            <span className="pulse-dot" />
            <Briefcase size={13} />
            <span>05 // PROFESSIONAL TRACK RECORD</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Engineering History & <br />
            <span className="cyan-gradient-text">Verified Production Impact.</span>
          </h2>
        </div>

        {/* Timeline Items */}
        <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid rgba(0, 245, 212, 0.25)' }}>
          {IBRAHIM_DATA.experiences.map((exp, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                marginBottom: '3.5rem',
                paddingLeft: '1.5rem'
              }}
            >
              {/* Timeline Node Icon with Outer Glow Ring */}
              <div
                style={{
                  position: 'absolute',
                  left: '-2.7rem',
                  top: '0.4rem',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'var(--bg-dark)',
                  border: '3px solid var(--accent-cyan)',
                  boxShadow: '0 0 15px rgba(0, 245, 212, 0.7)'
                }}
              />

              {/* Card Container in Double-Bezel Hardware Architecture */}
              <div className="double-bezel">
                <div
                  className="double-bezel-inner"
                  style={{
                    padding: '2.25rem',
                    background: 'linear-gradient(180deg, rgba(16, 21, 30, 0.95) 0%, rgba(10, 13, 18, 0.98) 100%)'
                  }}
                >
                  {/* Meta Header */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.015em' }}>
                        {exp.role}
                      </h3>
                      <span className="font-mono" style={{ fontSize: '1rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                        {exp.company}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }} className="font-mono">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                        <Calendar size={15} style={{ color: 'var(--accent-cyan)' }} />
                        {exp.period}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                        <MapPin size={15} style={{ color: '#38bdf8' }} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {exp.summary}
                  </p>

                  {/* Achievements List */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: '#d1d5db', lineHeight: 1.55 }}>
                        <CheckCircle size={16} style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem', flexShrink: 0 }} />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {exp.techUsed.map((tech, tIdx) => (
                      <span key={tIdx} className="tag-pill" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}>
                        {tech}
                      </span>
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
