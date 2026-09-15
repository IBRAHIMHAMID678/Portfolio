import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Briefcase size={14} />
            <span>05 // PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Engineering History & <br />
            <span className="cyan-gradient-text">Verified Production Track Record.</span>
          </h2>
        </div>

        {/* Timeline Items */}
        <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid rgba(0, 245, 212, 0.2)' }}>
          {IBRAHIM_DATA.experiences.map((exp, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                marginBottom: '3rem',
                paddingLeft: '1.5rem'
              }}
            >
              {/* Timeline Node Icon */}
              <div
                style={{
                  position: 'absolute',
                  left: '-2.2rem',
                  top: '0.2rem',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--bg-dark)',
                  border: '3px solid var(--accent-cyan)',
                  boxShadow: '0 0 10px rgba(0, 245, 212, 0.5)'
                }}
              />

              {/* Card Container */}
              <div
                className="glass-card"
                style={{
                  padding: '2rem',
                  background: 'rgba(15, 19, 25, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {/* Meta Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff' }}>{exp.role}</h3>
                    <span className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {exp.company}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} className="font-mono">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Calendar size={14} style={{ color: 'var(--accent-cyan)' }} />
                      {exp.period}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <MapPin size={14} style={{ color: '#38bdf8' }} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {exp.summary}
                </p>

                {/* Achievements List */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.5rem' }}>
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      <CheckCircle size={15} style={{ color: 'var(--accent-cyan)', marginTop: '0.15rem', flexShrink: 0 }} />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {exp.techUsed.map((tech, tIdx) => (
                    <span key={tIdx} className="tag-pill" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                      {tech}
                    </span>
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
