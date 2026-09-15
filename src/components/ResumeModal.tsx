import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';
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

  const handleDownload = () => {
    // Generate text/markdown resume print representation
    const textContent = `
IBRAHIM HAMID — AI/ML ENGINEER & SYSTEMS ARCHITECT
GitHub: ${IBRAHIM_DATA.githubUrl}
Email: ${IBRAHIM_DATA.email}

SUMMARY:
Computer Science professional specializing in Generative AI, RAG architecture, LLM pipelines, FastAPI backends, vector search (Qdrant), and modern full-stack web platforms.

EXPERIENCE:
1. Lead AI/ML & Systems Engineer @ SearchBrite / Britesearch (2026 — Present)
- Owned Track I solo: engineered ICP filter (icpEngine.ts) with code-controlled query shaping.
- Built event-proximity timing engine classifying leads into 5-7d send windows.
- Stream A/B hyper-personalization split reducing LLM API token costs by 65%.

2. AI & Full-Stack Architect @ Createlya Platform (2026)
- Built vector search index (~0.02s) querying 1,562 template deck embeddings.
- Groq AI copywriting pipeline (gpt-oss-120b & llama-3.3-70b).
- Dual-engine restyler syncing in-iframe DOM SVG manipulators with python-pptx AST rewriters.

CORE SKILLS:
- AI & LLMs: Python, FastAPI, Groq, OpenAI GPT-4, Qdrant Vector DB, LangChain, Hybrid BM25 Vector Search.
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, Canvas API.
- Scrapers & Cloud: Docker, Playwright, Cloudflare Turnstile Bypass, MinIO S3, MongoDB, PostgreSQL.
`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ibrahim_Hamid_AI_ML_Engineer_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '800px',
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
        >
          <X size={20} />
        </button>

        {/* Resume Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>IBRAHIM HAMID</h2>
            <p className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              AI / ML ENGINEER & FULL-STACK SYSTEMS ARCHITECT
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }} className="font-mono">
              <span>{IBRAHIM_DATA.location}</span>
              <span>•</span>
              <a href={IBRAHIM_DATA.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                github.com/{IBRAHIM_DATA.githubUsername}
              </a>
            </div>
          </div>

          <button onClick={handleDownload} className="btn-primary">
            <Download size={16} />
            <span>Download Resume</span>
          </button>
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

        {/* Experience Highlights */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
            EXPERIENCE & LEAD ROLES
          </h3>

          {IBRAHIM_DATA.experiences.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                  {exp.role} — <span style={{ color: 'var(--accent-cyan)' }}>{exp.company}</span>
                </h4>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exp.period}</span>
              </div>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                {exp.achievements.map((a, aIdx) => (
                  <li key={aIdx} style={{ marginBottom: '0.25rem' }}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div>
          <h3 className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
            TECHNICAL SKILLS
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['Python', 'FastAPI', 'Groq AI', 'OpenAI GPT-4', 'Qdrant Vector DB', 'LangChain', 'Next.js 15', 'TypeScript', 'React', 'OnlyOffice AST', 'Playwright', 'Cloudflare Bypass', 'Docker', 'PostgreSQL', 'MongoDB'].map((skill, idx) => (
              <span key={idx} className="tag-pill" style={{ fontSize: '0.75rem' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
