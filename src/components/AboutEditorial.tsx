import React from 'react';
import { Cpu, ShieldCheck, Zap, Server, GraduationCap } from 'lucide-react';

export const AboutEditorial: React.FC = () => {
  return (
    <section id="about" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Cpu size={14} />
            <span>01 // ENGINEERING MINDSET & BACKGROUND</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Architecting Software That Thinks, <br />
            <span className="cyan-gradient-text">Executes & Validates.</span>
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Column 1: Narrative Story */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontSize: '1.075rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
              I am a <strong>Computer Science graduate and Software Engineer</strong> based in Islamabad, Pakistan, specializing in
              building AI-powered, full-stack web applications. My foundation is built on modern Python (FastAPI), React, Next.js,
              LangChain, and retrieval-augmented generation (RAG).
            </p>
            <p style={{ fontSize: '0.975rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
              Across four industry internships—spanning creative agencies, software development firms, national telecom infrastructure (NTC),
              and digital banking (Mobilink Bank)—I have bridged the gap between rapid generative AI innovation and production-grade software reliability.
              In addition to writing scalable backend APIs and reactive frontends, I bring a disciplined QA mindset: designing exhaustive test cases,
              tracking defects in Jira, and verifying releases against requirements before client delivery.
            </p>

            {/* CUST Education Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.875rem'
              }}
            >
              <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(0,245,212,0.1)', color: 'var(--accent-cyan)' }}>
                <GraduationCap size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                  Bachelor of Science in Computer Science (Graduated)
                </div>
                <div className="font-mono cyan-gradient-text" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                  Capital University of Science & Technology (CUST), Islamabad
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  2022 — 2026 • Core competencies in Artificial Intelligence, Software Engineering, Algorithms, Database Systems, and QA methodologies.
                </p>
              </div>
            </div>
            
            {/* Direct Quote Card */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '12px',
                background: 'rgba(0, 245, 212, 0.04)',
                borderLeft: '4px solid var(--accent-cyan)',
                fontStyle: 'italic',
                color: '#e5e7eb',
                fontSize: '0.925rem',
                lineHeight: 1.6
              }}
            >
              "The real power of AI in production isn't unconstrained generation—it is anchoring intelligence inside verified, test-driven software architectures."
            </div>
          </div>

          {/* Column 2: 4 Engineering Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(0,245,212,0.1)', color: 'var(--accent-cyan)' }}>
                  <Cpu size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>RAG & LangChain AI</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Designing multi-turn autonomous agents with local and cloud LLMs (Qwen2.5, GPT-4o-mini), prompt engineering, and vector database retrieval.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
                  <Server size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Full-Stack & APIs</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Engineering low-latency Python FastAPI services, Node.js APIs, MongoDB Atlas vector schemas, and reactive React / Next.js frontends.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(168,85,247,0.1)', color: '#c084fc' }}>
                  <Zap size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Speech & Multi-Modal</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Integrating Whisper Speech-to-Text, voice inquiry interfaces, and python-pptx AST manipulation for automated document generation.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', color: '#34d399' }}>
                  <ShieldCheck size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>QA & Testing Rigor</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Comprehensive test case design, cross-browser validation, and end-to-end defect lifecycles in Jira across financial & enterprise apps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
