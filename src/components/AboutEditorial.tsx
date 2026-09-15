import React from 'react';
import { Cpu, ShieldCheck, Zap, Server, Code } from 'lucide-react';

export const AboutEditorial: React.FC = () => {
  return (
    <section id="about" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Cpu size={14} />
            <span>01 // ENGINEERING MINDSET</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Architecting Software That Thinks, <br />
            <span className="cyan-gradient-text">Executes & Scales.</span>
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
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
              I am an <strong>AI/ML Engineer & Full-Stack Systems Architect</strong> who believes that intelligence in software
              should be deterministic, verifiable, and fast. Rather than building tutorial-level wrappers around LLM APIs,
              I design robust production software platforms.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
              My engineering focus centers on <strong>Generative AI pipelines</strong>, <strong>RAG vector search</strong>,
              <strong>Python/FastAPI microservices</strong>, <strong>anti-bot scraping clusters</strong>, and <strong>TypeScript web platforms</strong>.
              Whether implementing structural PowerPoint AST manipulation or constructing 24/7 OSINT signal harvesters, I focus on delivering real-world product impact.
            </p>
            
            {/* Direct Quote Card */}
            <div
              style={{
                marginTop: '1rem',
                padding: '1.5rem',
                borderRadius: '12px',
                background: 'rgba(0, 245, 212, 0.04)',
                borderLeft: '4px solid var(--accent-cyan)',
                fontStyle: 'italic',
                color: '#e5e7eb',
                fontSize: '0.95rem',
                lineHeight: 1.6
              }}
            >
              "The true value of AI isn't unconstrained text generation — it is placing intelligent, evidence-backed capabilities inside deterministic software architectures."
            </div>
          </div>

          {/* Column 2: 4 Engineering Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(0,245,212,0.1)', color: 'var(--accent-cyan)' }}>
                  <ShieldCheck size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Evidence Lineage</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Tagging data with OBSERVED, EXTRACTED, VERIFIED, INFERRED, and PREDICTED labels to eliminate opaque AI hallucination.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
                  <Zap size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Hybrid Vector Search</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Blending BM25 keyword matching with Qdrant vector semantic embeddings for sub-100ms closeness scoring.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(168,85,247,0.1)', color: '#c084fc' }}>
                  <Server size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Resilient Scrapers</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Host-native Chrome execution and Cloudflare turnstile bypass architecture running 24/7 without detection.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', color: '#34d399' }}>
                  <Code size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Full-Stack Web</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Crafting Next.js 15 & React platforms with clean UI/UX design tokens and instant responsive interaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
