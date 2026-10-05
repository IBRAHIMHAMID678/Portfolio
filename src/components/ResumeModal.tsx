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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '850px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          background: '#0a0d12',
          border: '1px solid var(--accent-cyan)'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Resume Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{IBRAHIM_DATA.name.toUpperCase()}</h2>
            <p className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              {IBRAHIM_DATA.role.toUpperCase()}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }} className="font-mono">
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
            className="btn-primary"
            style={{ textDecoration: 'none' }}
          >
            <Download size={16} />
            <span>Download Official PDF</span>
          </a>
        </div>

        {/* Resume Summary */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            PROFESSIONAL SUMMARY
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: 1.6 }}>
            {IBRAHIM_DATA.bio}
          </p>
        </div>

        {/* Education Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GraduationCap size={16} />
            <span>EDUCATION</span>
          </h3>
          {IBRAHIM_DATA.education.map((edu, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{edu.degree}</h4>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>{edu.period}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {edu.institution}, {edu.location}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.35rem' }}>
                {edu.details}
              </p>
            </div>
          ))}
        </div>

        {/* Experience Highlights */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
            PROFESSIONAL EXPERIENCE & INTERNSHIPS
          </h3>

          {IBRAHIM_DATA.experiences.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                  {exp.role} — <span style={{ color: 'var(--accent-cyan)' }}>{exp.company}</span>
                </h4>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', fontStyle: 'italic', margin: '0.35rem 0 0.5rem 0' }}>
                {exp.location} • {exp.type}
              </p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                {exp.achievements.map((a, aIdx) => (
                  <li key={aIdx} style={{ marginBottom: '0.35rem', lineHeight: 1.5 }}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
            TECHNICAL SKILLS
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {[
              'Python (FastAPI)', 'React', 'Next.js', 'Node.js', 'NestJS', 'LangChain', 'RAG',
              'Ollama (Qwen2.5)', 'GPT-4o-mini', 'Whisper STT', 'MongoDB Atlas Vector Search',
              'Java', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion', 'REST APIs', 'Jira QA',
              'Git & GitHub', 'Docker', 'Postman'
            ].map((skill, idx) => (
              <span key={idx} className="tag-pill" style={{ fontSize: '0.75rem' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={16} />
            <span>CERTIFICATIONS & PROFESSIONAL DEVELOPMENT</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {IBRAHIM_DATA.certifications.map((cert, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>{cert.title}</div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cert.issuer} • {cert.platform}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
