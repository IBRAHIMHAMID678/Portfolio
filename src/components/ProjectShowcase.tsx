import React, { useState } from 'react';
import { Layers, CheckCircle } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { IBRAHIM_DATA } from '../data/portfolioData';
import { SystemArchitectureModal } from './SystemArchitectureModal';
import { GithubIcon } from './GithubIcon';

export const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Layers size={14} />
            <span>02 // FEATURED WORK SHOWCASE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Production Systems & <br />
            <span className="cyan-gradient-text">Architectural Case Studies.</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '700px', marginTop: '0.75rem' }}>
            Curated selection of real-world intelligent software products, custom LLM pipelines, vector search platforms, and anti-bot data engines.
          </p>
        </div>

        {/* Project List: Large Editorial Showcase Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {IBRAHIM_DATA.projects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                padding: '2.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                background: 'linear-gradient(180deg, rgba(15, 19, 25, 0.95) 0%, rgba(10, 13, 18, 0.95) 100%)'
              }}
            >
              {/* Left Column: Number, Title, Problem, Outcome, Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Top Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="font-mono cyan-gradient-text" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                      PROJECT {project.number}
                    </span>
                    <span className="badge-blue" style={{ fontSize: '0.75rem' }}>
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', fontWeight: 500, marginBottom: '1.25rem' }}>
                    {project.tagline}
                  </p>

                  {/* Summary & Problem */}
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {project.summary}
                  </p>

                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      padding: '1rem',
                      borderRadius: '10px',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div className="font-mono" style={{ fontSize: '0.75rem', color: '#f59e0b', marginBottom: '0.25rem', fontWeight: 600 }}>
                      THE HARD TECHNICAL CHALLENGE:
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {project.problem}
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn-outline-cyan"
                    style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                  >
                    <Layers size={16} />
                    <span>Dissect Architecture</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                  >
                    <GithubIcon size={16} />
                    <span>Repository</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Architectural Highlights & Verified Metrics */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '14px',
                  padding: '1.5rem'
                }}
              >
                <div>
                  <h4 className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--accent-cyan)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                    KEY ARCHITECTURAL HIGHLIGHTS
                  </h4>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {project.architectureDetails.slice(0, 3).map((detail, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.875rem', color: '#d1d5db', lineHeight: 1.5 }}>
                        <CheckCircle size={15} style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem', flexShrink: 0 }} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Evidence Flags if available */}
                  {project.evidenceFlags && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>
                        EVIDENCE CONFIDENCE CLASSIFIERS:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {project.evidenceFlags.map((flag, idx) => (
                          <span
                            key={idx}
                            className="font-mono"
                            style={{
                              fontSize: '0.7rem',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              background: flag === 'OBSERVED' || flag === 'VERIFIED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                              color: flag === 'OBSERVED' || flag === 'VERIFIED' ? '#34d399' : '#9ca3af',
                              border: '1px solid rgba(255, 255, 255, 0.08)'
                            }}
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Metrics Box */}
                <div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
                      gap: '0.75rem',
                      padding: '1rem',
                      borderRadius: '10px',
                      background: 'rgba(0, 245, 212, 0.03)',
                      border: '1px solid rgba(0, 245, 212, 0.15)',
                      marginBottom: '1rem'
                    }}
                  >
                    {project.metrics.map((m, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                          {m.value}
                        </span>
                        <span className="font-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tag Cloud */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className="tag-pill" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
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

      {/* System Architecture Modal Trigger */}
      <SystemArchitectureModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
