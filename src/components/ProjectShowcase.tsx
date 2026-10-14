import React, { useState } from 'react';
import { Layers, CheckCircle, Activity, Image as ImageIcon, Maximize2, Cpu } from 'lucide-react';
import type { Project, ProjectScreenshot } from '../data/portfolioData';
import { IBRAHIM_DATA } from '../data/portfolioData';
import { SystemArchitectureModal } from './SystemArchitectureModal';
import { ScreenshotModal } from './ScreenshotModal';
import { ChatbotAgent3D } from './ChatbotAgent3D';
import { JobScraper3D } from './JobScraper3D';
import { EvalAgent3D } from './EvalAgent3D';
import { GuardrailLab3D } from './GuardrailLab3D';
import { SignalHarbor3D } from './SignalHarbor3D';
import { WhatsAppAgent3D } from './WhatsAppAgent3D';
import { GithubIcon } from './GithubIcon';

export const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Screenshot modal state
  const [screenshotModalState, setScreenshotModalState] = useState<{
    isOpen: boolean;
    screenshots: ProjectScreenshot[];
    initialIndex: number;
    projectTitle: string;
  }>({
    isOpen: false,
    screenshots: [],
    initialIndex: 0,
    projectTitle: ''
  });

  // Track active media tab ('3d' vs 'screenshots') per project - defaults to '3d' for all
  const [mediaTabs, setMediaTabs] = useState<Record<string, '3d' | 'screenshots'>>({
    'chatbot-agent': '3d',
    'ai-job-scraper': '3d',
    'eval-agent': '3d',
    'guardrail-lab': '3d',
    'signalharbor-b2b': '3d',
    'whatsapp-receptionist': '3d'
  });

  // Track active screenshot thumbnail index per project
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState<Record<string, number>>({});

  const categories = ['All', 'AI & Autonomous Agents', 'Full-Stack Platforms', 'System Automation'];

  const filteredProjects = activeCategory === 'All'
    ? IBRAHIM_DATA.projects
    : IBRAHIM_DATA.projects.filter(p => p.category === activeCategory);

  const openScreenshotModal = (screenshots: ProjectScreenshot[], index: number, title: string) => {
    setScreenshotModalState({
      isOpen: true,
      screenshots,
      initialIndex: index,
      projectTitle: title
    });
  };

  const render3DVisual = (id: string) => {
    switch (id) {
      case 'chatbot-agent':
        return <ChatbotAgent3D height={360} />;
      case 'ai-job-scraper':
        return <JobScraper3D height={360} />;
      case 'eval-agent':
        return <EvalAgent3D height={360} />;
      case 'guardrail-lab':
        return <GuardrailLab3D height={360} />;
      case 'signalharbor-b2b':
        return <SignalHarbor3D height={360} />;
      case 'whatsapp-receptionist':
        return <WhatsAppAgent3D height={360} />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-eyebrow" style={{ marginBottom: '1rem' }}>
            <span className="pulse-dot" />
            <Layers size={13} />
            <span>02 // PRODUCTION ARCHITECTURES & 3D SIMULATIONS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Production Systems & <br />
            <span className="cyan-gradient-text">Architectural Case Studies.</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '750px', marginTop: '1rem', lineHeight: 1.6 }}>
            Four production AI systems paired with bespoke 3D WebGL physical simulations and full architectural screenshot ledgers.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '3.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '9999px',
                border: activeCategory === cat ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeCategory === cat ? 'rgba(0, 245, 212, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                color: activeCategory === cat ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
                boxShadow: activeCategory === cat ? '0 0 20px rgba(0, 245, 212, 0.2)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project List: Double-Bezel Hardware Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {filteredProjects.map((project) => {
            const currentTab = mediaTabs[project.id] || '3d';
            const screenshots = project.screenshots || [];
            const curShotIdx = activeScreenshotIdx[project.id] || 0;
            const currentShot = screenshots[curShotIdx] || screenshots[0];

            return (
              <div
                key={project.id}
                className="double-bezel"
                style={{ width: '100%' }}
              >
                <div
                  className="double-bezel-inner"
                  style={{
                    padding: '2.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '2.75rem',
                    background: 'linear-gradient(180deg, rgba(16, 21, 30, 0.96) 0%, rgba(9, 12, 17, 0.98) 100%)'
                  }}
                >
                  {/* Left Column: Number, Title, Challenge, Architecture, Island CTAs */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Top Meta */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span className="font-mono cyan-gradient-text" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                          PROJECT {project.number}
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className="badge-blue" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}>
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.25, letterSpacing: '-0.015em' }}>
                        {project.title}
                      </h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', fontWeight: 500, marginBottom: '1.25rem' }}>
                        {project.tagline}
                      </p>

                      {/* Summary */}
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1.35rem' }}>
                        {project.summary}
                      </p>

                      {/* Technical Challenge Box */}
                      <div
                        style={{
                          background: 'rgba(245, 158, 11, 0.05)',
                          border: '1px solid rgba(245, 158, 11, 0.2)',
                          padding: '1.15rem',
                          borderRadius: '14px',
                          marginBottom: '1.5rem',
                          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <div className="font-mono" style={{ fontSize: '0.75rem', color: '#f59e0b', marginBottom: '0.35rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                          THE HARD TECHNICAL CHALLENGE:
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                          {project.problem}
                        </p>
                      </div>

                      {/* Key Architectural Highlights */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', letterSpacing: '0.08em', fontWeight: 600 }}>
                          KEY ARCHITECTURAL HIGHLIGHTS
                        </div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                          {project.architectureDetails.slice(0, 3).map((detail, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.85rem', color: '#d1d5db', lineHeight: 1.5 }}>
                              <CheckCircle size={15} style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem', flexShrink: 0 }} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Evidence Confidence Classifiers */}
                      {project.evidenceFlags && (
                        <div style={{ marginBottom: '1.5rem' }}>
                          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.45rem', letterSpacing: '0.05em' }}>
                            VERIFIED ENGINE GUARANTEES:
                          </span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {project.evidenceFlags.map((flag, idx) => (
                              <span
                                key={idx}
                                className="font-mono"
                                style={{
                                  fontSize: '0.7rem',
                                  padding: '0.25rem 0.6rem',
                                  borderRadius: '6px',
                                  background: 'rgba(16, 185, 129, 0.12)',
                                  color: '#34d399',
                                  border: '1px solid rgba(16, 185, 129, 0.28)'
                                }}
                              >
                                {flag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Island CTAs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem' }}>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="btn-island-primary"
                        style={{ fontSize: '0.85rem' }}
                      >
                        <span>Live Dissect</span>
                        <span className="btn-icon-bubble" style={{ width: '28px', height: '28px' }}>
                          <Activity size={14} />
                        </span>
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-island-secondary"
                        style={{ fontSize: '0.85rem' }}
                      >
                        <span>Explore Repo</span>
                        <span className="btn-icon-bubble" style={{ width: '28px', height: '28px' }}>
                          <GithubIcon size={14} />
                        </span>
                      </a>

                      {screenshots.length > 0 && (
                        <button
                          onClick={() => openScreenshotModal(screenshots, curShotIdx, project.title)}
                          className="btn-island-outline"
                          style={{ fontSize: '0.85rem' }}
                        >
                          <span>Screenshots ({screenshots.length})</span>
                          <span className="btn-icon-bubble" style={{ width: '28px', height: '28px' }}>
                            <ImageIcon size={14} />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Viewport (3D or Screenshots) + Metrics & Tech Stack */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Viewport Frame */}
                    <div
                      style={{
                        background: 'rgba(11, 15, 21, 0.96)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      {/* Viewport Header Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1.25rem',
                          background: 'rgba(16, 22, 30, 0.95)',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => setMediaTabs(prev => ({ ...prev, [project.id]: '3d' }))}
                            style={{
                              padding: '0.4rem 0.85rem',
                              borderRadius: '8px',
                              border: currentTab === '3d' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                              background: currentTab === '3d' ? 'rgba(0, 245, 212, 0.15)' : 'transparent',
                              color: currentTab === '3d' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                              fontSize: '0.785rem',
                              fontWeight: 700,
                              fontFamily: 'var(--font-mono)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)'
                            }}
                          >
                            <Cpu size={13} />
                            <span>3D SIMULATION</span>
                          </button>

                          {screenshots.length > 0 && (
                            <button
                              onClick={() => setMediaTabs(prev => ({ ...prev, [project.id]: 'screenshots' }))}
                              style={{
                                padding: '0.4rem 0.85rem',
                                borderRadius: '8px',
                                border: currentTab === 'screenshots' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                                background: currentTab === 'screenshots' ? 'rgba(0, 245, 212, 0.15)' : 'transparent',
                                color: currentTab === 'screenshots' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                                fontSize: '0.785rem',
                                fontWeight: 700,
                                fontFamily: 'var(--font-mono)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)'
                              }}
                            >
                              <ImageIcon size={13} />
                              <span>UI SCREENSHOTS ({screenshots.length})</span>
                            </button>
                          )}
                        </div>

                        {currentTab === 'screenshots' && (
                          <button
                            onClick={() => openScreenshotModal(screenshots, curShotIdx, project.title)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--accent-cyan)',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-mono)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}
                          >
                            <Maximize2 size={13} />
                            <span>ENLARGE</span>
                          </button>
                        )}
                      </div>

                      {/* Content Area */}
                      {currentTab === '3d' ? (
                        <div style={{ position: 'relative', width: '100%', height: '360px', background: '#070a0e' }}>
                          {render3DVisual(project.id)}
                        </div>
                      ) : (
                        <div style={{ position: 'relative', width: '100%', background: '#070a0e', padding: '1rem' }}>
                          {currentShot && (
                            <div
                              onClick={() => openScreenshotModal(screenshots, curShotIdx, project.title)}
                              style={{
                                cursor: 'pointer',
                                position: 'relative',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.1)'
                              }}
                            >
                              <img
                                src={currentShot.url}
                                alt={currentShot.title}
                                style={{
                                  width: '100%',
                                  height: '280px',
                                  objectFit: 'contain',
                                  display: 'block',
                                  background: '#040608'
                                }}
                              />
                              <div
                                style={{
                                  padding: '0.65rem 0.85rem',
                                  background: 'rgba(12, 16, 22, 0.95)',
                                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                                }}
                              >
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                                  {currentShot.title}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                  {currentShot.caption}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Thumbnails row if multiple */}
                          {screenshots.length > 1 && (
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                              {screenshots.map((shot, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => setActiveScreenshotIdx(prev => ({ ...prev, [project.id]: sIdx }))}
                                  style={{
                                    border: curShotIdx === sIdx ? '2px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '6px',
                                    overflow: 'hidden',
                                    padding: 0,
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    width: '64px',
                                    height: '44px'
                                  }}
                                >
                                  <img
                                    src={shot.url}
                                    alt={shot.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Metrics Ledger Dock */}
                    <div
                      style={{
                        padding: '1.25rem',
                        background: 'rgba(12, 16, 22, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        borderRadius: '16px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                        gap: '1rem',
                        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span className="font-mono cyan-gradient-text" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                            {m.value}
                          </span>
                          <span className="font-mono" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {project.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="tag-pill" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dissection System Architecture Modal */}
      {selectedProject && (
        <SystemArchitectureModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Screenshot Lightbox Modal */}
      <ScreenshotModal
        isOpen={screenshotModalState.isOpen}
        onClose={() => setScreenshotModalState(prev => ({ ...prev, isOpen: false }))}
        screenshots={screenshotModalState.screenshots}
        initialIndex={screenshotModalState.initialIndex}
        projectTitle={screenshotModalState.projectTitle}
      />
    </section>
  );
};
