import React from 'react';
import { Cpu, ShieldCheck, Zap, Server, GraduationCap, Quote } from 'lucide-react';

export const AboutEditorial: React.FC = () => {
  return (
    <section id="about" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-eyebrow" style={{ marginBottom: '1rem' }}>
            <span className="pulse-dot" />
            <Cpu size={13} />
            <span>01 // ENGINEERING MINDSET & BACKGROUND</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Architecting Software That Thinks, <br />
            <span className="cyan-gradient-text">Executes & Validates.</span>
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* Column 1: Narrative Story */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.75, color: 'var(--text-main)' }}>
              I am an <strong style={{ color: '#fff' }}>AI Full Stack Developer</strong> based in Islamabad, Pakistan, specializing in
              building AI-powered, production full-stack web applications. My foundation is built on modern Python (FastAPI), React, Next.js,
              LangChain, and retrieval-augmented generation (RAG).
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
              Across four industry internships—spanning creative agencies, software development firms, national telecom infrastructure (NTC),
              and digital banking (Mobilink Bank)—I have bridged the gap between rapid generative AI innovation and production-grade software reliability.
              In addition to writing scalable backend APIs and reactive frontends, I bring a disciplined QA mindset: designing exhaustive test cases,
              tracking defects in Jira, and verifying releases against requirements before client delivery.
            </p>

            {/* CUST Education Card in Double-Bezel */}
            <div className="double-bezel">
              <div
                className="double-bezel-inner"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.25rem',
                  background: 'linear-gradient(180deg, rgba(16, 21, 30, 0.95) 0%, rgba(10, 13, 18, 0.98) 100%)'
                }}
              >
                <div
                  style={{
                    padding: '0.75rem',
                    borderRadius: '12px',
                    background: 'rgba(0,245,212,0.12)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(0,245,212,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <GraduationCap size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                    Bachelor of Science in Computer Science
                  </div>
                  <div className="font-mono cyan-gradient-text" style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.2rem' }}>
                    Capital University of Science & Technology (CUST), Islamabad
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                    2022 — 2026 • Core competencies in Artificial Intelligence, Software Engineering, Algorithms, Database Systems, and QA methodologies.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Direct Quote Card */}
            <div
              style={{
                position: 'relative',
                padding: '1.5rem 1.75rem',
                borderRadius: '16px',
                background: 'rgba(0, 245, 212, 0.035)',
                border: '1px solid rgba(0, 245, 212, 0.2)',
                color: '#e5e7eb',
                fontSize: '0.975rem',
                lineHeight: 1.65,
                boxShadow: '0 10px 30px rgba(0, 245, 212, 0.05)'
              }}
            >
              <Quote size={20} style={{ color: 'var(--accent-cyan)', opacity: 0.7, marginBottom: '0.5rem' }} />
              <div style={{ fontStyle: 'italic' }}>
                "The real power of AI in production isn't unconstrained generation—it is anchoring intelligence inside verified, test-driven software architectures."
              </div>
            </div>
          </div>

          {/* Column 2: 4 Engineering Pillars in Double-Bezel Hardware Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: <Cpu size={22} />,
                color: 'var(--accent-cyan)',
                title: 'RAG & LangChain AI',
                desc: 'Designing multi-turn autonomous agents with local and cloud LLMs (Qwen2.5, GPT-4o-mini), prompt engineering, and vector database retrieval.',
                tag: 'AUTONOMOUS WORKFLOWS'
              },
              {
                icon: <Server size={22} />,
                color: '#60a5fa',
                title: 'Full-Stack & APIs',
                desc: 'Engineering low-latency Python FastAPI services, Node.js APIs, MongoDB Atlas vector schemas, and reactive React / Next.js frontends.',
                tag: 'FASTAPI & REACT'
              },
              {
                icon: <Zap size={22} />,
                color: '#c084fc',
                title: 'Speech & Multi-Modal',
                desc: 'Integrating Whisper Speech-to-Text, voice inquiry interfaces, and python-pptx AST manipulation for automated document generation.',
                tag: 'WHISPER STT/TTS'
              },
              {
                icon: <ShieldCheck size={22} />,
                color: '#34d399',
                title: 'QA & Testing Rigor',
                desc: 'Comprehensive test case design, cross-browser validation, and end-to-end defect lifecycles in Jira across financial & enterprise apps.',
                tag: 'JIRA & TEST CYCLES'
              }
            ].map((pillar, pIdx) => (
              <div key={pIdx} className="double-bezel">
                <div
                  className="double-bezel-inner"
                  style={{
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: pillar.color
                        }}
                      >
                        {pillar.icon}
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.65rem', color: pillar.color, letterSpacing: '0.1em', fontWeight: 600 }}>
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem' }}>
                      {pillar.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
