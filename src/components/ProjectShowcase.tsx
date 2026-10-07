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
    'guardrail-lab': '3d'
  });

  // Track active screenshot thumbnail index per project
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState<Record<string, number>>({});

  const categories = ['All', 'AI & Autonomous Agents', 'System Automation'];

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
      default:
        return null;
    }
  };

  return (
    <section id="projects" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Layers size={14} />
            <span>02 // PRODUCTION ARCHITECTURES & 3D INTERACTIVE SIMULATIONS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Production Systems & <br />
            <span className="cyan-gradient-text">Architectural Case Studies.</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '750px', marginTop: '0.75rem' }}>
            Four production AI systems paired with bespoke 3D WebGL physical simulations and full architectural screenshot ledgers.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '100px',
                border: activeCategory === cat ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeCategory === cat ? 'rgba(0, 245, 212, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                color: activeCategory === cat ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project List: Editorial Cards with 3D and Screenshot Viewports */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {filteredProjects.map((project) => {
            const currentTab = mediaTabs[project.id] || '3d';
            const screenshots = project.screenshots || [];
            const curShotIdx = activeScreenshotIdx[project.id] || 0;
            const currentShot = screenshots[curShotIdx] || screenshots[0];

            return (
              <div
                key={project.id}
                className="glass-card"
                style={{
                  padding: '2.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                  gap: '2.5rem',
                  border: '1px solid rgba(0, 245, 212, 0.25)',
                  background: 'linear-gradient(180deg, rgba(15, 19, 25, 0.95) 0%, rgba(10, 13, 18, 0.98) 100%)',
                  borderRadius: '24px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
                }}
              >
                {/* Left Column: Number, Title, Challenge, Architecture, CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Top Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="font-mono cyan-gradient-text" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                        PROJECT {project.number}
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span className="badge-blue" style={{ fontSize: '0.75rem' }}>
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', fontWeight: 500, marginBottom: '1.25rem' }}>
                      {project.tagline}
                    </p>

                    {/* Summary */}
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {project.summary}
                    </p>

                    {/* Technical Challenge Box */}
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        padding: '1.15rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem'
                      }}
                    >
                      <div className="font-mono" style={{ fontSize: '0.75rem', color: '#f59e0b', marginBottom: '0.35rem', fontWeight: 600 }}>
                        THE HARD TECHNICAL CHALLENGE:
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                        {project.problem}
                      </p>
                    </div>

                    {/* Key Architectural Highlights */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
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
                        <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.4rem' }}>
                          VERIFIED ENGINE GUARANTEES:
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                          {project.evidenceFlags.map((flag, idx) => (
                            <span
                              key={idx}
                              className="font-mono"
                              style={{
                                fontSize: '0.7rem',
                                padding: '0.2rem 0.55rem',
                                borderRadius: '4px',
                                background: 'rgba(16, 185, 129, 0.15)',
                                color: '#34d399',
                                border: '1px solid rgba(16, 185, 129, 0.3)'
                              }}
                            >
                              {flag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action CTAs */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn-outline-cyan"
                      style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
                    >
                      <Activity size={16} />
                      <span>Live Dissect</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
                    >
                      <GithubIcon size={16} />
                      <span>Explore Repository</span>
                    </a>

                    {screenshots.length > 0 && (
                      <button
                        onClick={() => openScreenshotModal(screenshots, curShotIdx, project.title)}
                        className="btn-secondary"
                        style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem', gap: '0.4rem' }}
                      >
                        <ImageIcon size={15} style={{ color: 'var(--accent-cyan)' }} />
                        <span>Screenshots ({screenshots.length})</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Column: Visual Viewport (3D or Screenshots) + Metrics & Tech Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Viewport Card */}
                  <div
                    style={{
                      background: 'rgba(12, 16, 22, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {/* Viewport Header Controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1.25rem',
                        background: 'rgba(18, 24, 32, 0.95)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => setMediaTabs(prev => ({ ...prev, [project.id]: '3d' }))}
                          style={{
                            padding: '0.4rem 0.85rem',
                            borderRadius: '6px',
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
                            transition: 'all 0.2s'
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
                              borderRadius: '6px',
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
                              transition: 'all 0.2s'
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

                    {/* Viewport Content */}
                    {currentTab === '3d' ? (
                      render3DVisual(project.id)
                    ) : (
                      currentShot && (
                        <div>
                          {/* Screenshot Container */}
                          <div
                            style={{
                              position: 'relative',
                              height: '270px',
                              background: '#07090d',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                              cursor: 'pointer'
                            }}
                            onClick={() => openScreenshotModal(screenshots, curShotIdx, project.title)}
                          >
                            <img
                              src={currentShot.url}
                              alt={currentShot.title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease'
                              }}
                              className="screenshot-preview-img"
                            />

                            {/* Enlarge Overlay Button */}
                            <div
                              style={{
                                position: 'absolute',
                                top: '0.75rem',
                                right: '0.75rem',
                                background: 'rgba(10, 14, 20, 0.85)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(0, 245, 212, 0.3)',
                                borderRadius: '8px',
                                padding: '0.4rem 0.75rem',
                                color: 'var(--accent-cyan)',
                                fontSize: '0.75rem',
                                fontFamily: 'var(--font-mono)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                              }}
                            >
                              <Maximize2 size={13} />
                              <span>EXPAND</span>
                            </div>

                            {/* Bottom Label on Image */}
                            <div
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '0.6rem 1rem',
                                background: 'linear-gradient(180deg, transparent 0%, rgba(5, 7, 10, 0.95) 100%)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}
                            >
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>
                                {currentShot.title}
                              </span>
                              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>
                                {curShotIdx + 1} / {screenshots.length}
                              </span>
                            </div>
                          </div>

                          {/* Caption bar */}
                          <div style={{ padding: '0.85rem 1.15rem', background: 'rgba(15, 20, 28, 0.8)' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                              {currentShot.caption}
                            </p>
                          </div>

                          {/* Thumbnails row */}
                          {screenshots.length > 1 && (
                            <div
                              style={{
                                display: 'flex',
                                gap: '0.5rem',
                                padding: '0.6rem 1rem 0.85rem 1rem',
                                background: 'rgba(10, 14, 20, 0.95)',
                                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                overflowX: 'auto'
                              }}
                            >
                              {screenshots.map((s, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveScreenshotIdx(prev => ({ ...prev, [project.id]: idx }));
                                  }}
                                  style={{
                                    position: 'relative',
                                    width: '64px',
                                    height: '40px',
                                    borderRadius: '6px',
                                    overflow: 'hidden',
                                    border: curShotIdx === idx ? '2px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.12)',
                                    cursor: 'pointer',
                                    opacity: curShotIdx === idx ? 1 : 0.6,
                                    flexShrink: 0,
                                    padding: 0
                                  }}
                                  title={s.title}
                                >
                                  <img src={s.url} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  {/* Metrics Box */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
                      gap: '0.75rem',
                      padding: '1.15rem',
                      borderRadius: '12px',
                      background: 'rgba(0, 245, 212, 0.03)',
                      border: '1px solid rgba(0, 245, 212, 0.15)'
                    }}
                  >
                    {project.metrics.map((m, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                          {m.value}
                        </span>
                        <span className="font-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tag Cloud */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className="tag-pill" style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Architecture Modal Trigger */}
      <SystemArchitectureModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* High-Resolution Screenshot Modal */}
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
