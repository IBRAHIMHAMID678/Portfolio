import React, { useEffect } from 'react';
import { X, Download, GraduationCap, Award } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ backdropFilter: 'blur(16px)' }}>
      <div
        className="double-bezel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '880px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          className="double-bezel-inner"
          style={{
            padding: '2.5rem',
            overflowY: 'auto',
            background: 'linear-gradient(180deg, rgba(16, 21, 30, 0.98) 0%, rgba(9, 12, 17, 0.99) 100%)',
            position: 'relative'
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              color: '#fff',
              cursor: 'pointer',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)'
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Resume Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem', paddingBottom: '1.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                {IBRAHIM_DATA.name.toUpperCase()}
              </h2>
              <p className="font-mono cyan-gradient-text" style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '0.25rem' }}>
                {IBRAHIM_DATA.role.toUpperCase()}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.825rem', color: 'var(--text-muted)' }} className="font-mono">
                <span>{IBRAHIM_DATA.location}</span>
                <span>•</span>
                <span>{IBRAHIM_DATA.email}</span>
                <span>•</span>
                <span>{IBRAHIM_DATA.phone}</span>
                <span>•</span>
                <a href={IBRAHIM_DATA.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                  LinkedIn
                </a>
              </div>
            </div>

            <a
              href={IBRAHIM_DATA.resumePdfUrl}
              download="Ibrahim_Hamid_Resume.pdf"
              className="btn-island-primary"
              style={{ textDecoration: 'none' }}
            >
              <span>Download Official PDF</span>
              <span className="btn-icon-bubble">
                <Download size={15} />
              </span>
            </a>
          </div>

          {/* Resume Summary */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '0.6rem', letterSpacing: '0.1em', fontWeight: 700 }}>
              PROFESSIONAL SUMMARY
            </h3>
            <p style={{ fontSize: '0.975rem', color: '#d1d5db', lineHeight: 1.65 }}>
              {IBRAHIM_DATA.bio}
            </p>
          </div>

          {/* Education Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '0.85rem', letterSpacing: '0.1em', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GraduationCap size={16} />
              <span>EDUCATION</span>
            </h3>
            {IBRAHIM_DATA.education.map((edu, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.025)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{edu.degree}</h4>
                  <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>{edu.period}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {edu.institution}, {edu.location}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  {edu.details}
                </p>
              </div>
            ))}
          </div>

          {/* Experience Highlights */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '1rem', letterSpacing: '0.1em', fontWeight: 700 }}>
              PROFESSIONAL EXPERIENCE & INTERNSHIPS
            </h3>

            {IBRAHIM_DATA.experiences.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.025)', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                    {exp.role} — <span style={{ color: 'var(--accent-cyan)' }}>{exp.company}</span>
                  </h4>
                  <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exp.period}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', fontStyle: 'italic', margin: '0.35rem 0 0.6rem 0' }}>
                  {exp.location} • {exp.type}
                </p>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {exp.achievements.map((a, aIdx) => (
                    <li key={aIdx} style={{ marginBottom: '0.4rem', lineHeight: 1.55 }}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills Summary */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '0.85rem', letterSpacing: '0.1em', fontWeight: 700 }}>
              TECHNICAL SKILLS
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {[
                'Python (FastAPI)', 'React', 'Next.js', 'Node.js', 'NestJS', 'LangChain', 'RAG',
                'Ollama (Qwen2.5)', 'GPT-4o-mini', 'Whisper STT', 'MongoDB Atlas Vector Search',
                'Java', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion', 'REST APIs', 'Jira QA',
                'Git & GitHub', 'Docker', 'Postman'
              ].map((skill, idx) => (
                <span key={idx} className="tag-pill" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '0.85rem', letterSpacing: '0.1em', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={16} />
              <span>CERTIFICATIONS & PROFESSIONAL DEVELOPMENT</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
              {IBRAHIM_DATA.certifications.map((cert, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.025)', padding: '0.85rem 1.15rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{cert.title}</div>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cert.issuer} • {cert.platform}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
