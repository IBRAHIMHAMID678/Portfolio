import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle, RefreshCw, Cpu, Palette } from 'lucide-react';

export const InteractiveSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'icp' | 'createlya' | 'lodestar'>('icp');

  // --- Tab 1 State: ICP Engine ---
  const [triggerType, setTriggerType] = useState<'JOB_CHANGE' | 'FUNDING' | 'HIRING'>('JOB_CHANGE');
  const [daysUntilEvent, setDaysUntilEvent] = useState<number>(6);

  const getTimingClassification = (days: number) => {
    if (days < 2) return { status: 'SUPPRESSED', color: '#ef4444', desc: 'Too late (ignored to preserve domain reputation)' };
    if (days >= 5 && days <= 7) return { status: 'ACTIVE SEND WINDOW', color: '#10b981', desc: 'Optimal timing window (speakers actively deck building)' };
    if (days > 15) return { status: 'QUEUED', color: '#f59e0b', desc: 'Queued for future event-proximity approach' };
    return { status: 'MONITORING', color: '#3b82f6', desc: 'In proximity window, awaiting 5-7d threshold' };
  };

  const timingResult = getTimingClassification(daysUntilEvent);

  // --- Tab 2 State: Createlya AI ---
  const [selectedTopic, setSelectedTopic] = useState<string>('AI Agents in Healthcare');
  const [palette, setPalette] = useState<'cyan' | 'emerald' | 'purple'>('cyan');
  const [isGenerating, setIsGenerating] = useState(false);

  const palettes = {
    cyan: { bg: '#080d14', border: '#00f5d4', accent: '#00f5d4', text: '#f3f4f6', name: 'Cyber Cyan' },
    emerald: { bg: '#06120e', border: '#10b981', accent: '#10b981', text: '#f3f4f6', name: 'Emerald Obsidian' },
    purple: { bg: '#0f0917', border: '#a855f7', accent: '#a855f7', text: '#f3f4f6', name: 'Deep Violet' }
  };

  const handleSimulateCreatelya = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 600);
  };

  // --- Tab 3 State: Lodestar Hybrid Search ---
  const [keywordWeight, setKeywordWeight] = useState<number>(0.4);
  const [semanticWeight, setSemanticWeight] = useState<number>(0.6);

  const mockRepos = [
    { name: 'voice-notes-ai-todo', bm25: 0.95, vector: 0.82 },
    { name: 'audio-task-harvester', bm25: 0.30, vector: 0.94 },
    { name: 'speech-to-task-pipeline', bm25: 0.60, vector: 0.88 },
    { name: 'react-voice-recorder', bm25: 0.70, vector: 0.40 }
  ];

  const calculateBlendScore = (bm25: number, vector: number) => {
    return (bm25 * keywordWeight + vector * semanticWeight).toFixed(2);
  };

  const sortedRepos = [...mockRepos].sort((a, b) => {
    const scoreA = a.bm25 * keywordWeight + a.vector * semanticWeight;
    const scoreB = b.bm25 * keywordWeight + b.vector * semanticWeight;
    return scoreB - scoreA;
  });

  return (
    <section id="sandbox" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>03 // INTERACTIVE SYSTEM SIMULATORS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Live Architectural <span className="cyan-gradient-text">Interactive Sandbox.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '700px', marginTop: '0.5rem' }}>
            Test live algorithmic behavior, decision matrices, vector search score blending, and slide AST restyling directly in your browser.
          </p>
        </div>

        {/* Sandbox Container */}
        <div
          className="glass-card"
          style={{
            border: '1px solid rgba(0, 245, 212, 0.25)',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #0c1017 0%, #080a0d 100%)'
          }}
        >
          {/* Tab Navigation */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)',
              overflowX: 'auto'
            }}
          >
            <button
              onClick={() => setActiveTab('icp')}
              style={{
                padding: '1.25rem 1.75rem',
                background: activeTab === 'icp' ? 'rgba(0, 245, 212, 0.08)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'icp' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                color: activeTab === 'icp' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              <Cpu size={16} />
              <span>Britesearch Event Proximity Classifier</span>
            </button>

            <button
              onClick={() => setActiveTab('createlya')}
              style={{
                padding: '1.25rem 1.75rem',
                background: activeTab === 'createlya' ? 'rgba(0, 245, 212, 0.08)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'createlya' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                color: activeTab === 'createlya' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              <Palette size={16} />
              <span>Createlya AI Restyler Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('lodestar')}
              style={{
                padding: '1.25rem 1.75rem',
                background: activeTab === 'lodestar' ? 'rgba(0, 245, 212, 0.08)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'lodestar' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                color: activeTab === 'lodestar' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              <Sliders size={16} />
              <span>Lodestar Hybrid Vector Weight Blender</span>
            </button>
          </div>

          {/* Tab Content Area */}
          <div style={{ padding: '2.5rem' }}>
            {/* --- TAB 1: BRITESEARCH ICP CLASSIFIER --- */}
            {activeTab === 'icp' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>
                    Signal Parameters
                  </h3>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      SELECT TRIGGER TYPE:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {(['JOB_CHANGE', 'FUNDING', 'HIRING'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTriggerType(t)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            border: triggerType === t ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.1)',
                            background: triggerType === t ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255,255,255,0.03)',
                            color: triggerType === t ? 'var(--accent-cyan)' : 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <label className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        DAYS UNTIL EVENT:
                      </label>
                      <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                        {daysUntilEvent} Days
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={30}
                      value={daysUntilEvent}
                      onChange={(e) => setDaysUntilEvent(Number(e.target.value))}
                      style={{
                        width: '100%',
                        accentColor: 'var(--accent-cyan)',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                      <span>0d (Too late)</span>
                      <span>5-7d (Optimal Window)</span>
                      <span>30d (Far out)</span>
                    </div>
                  </div>
                </div>

                {/* Classification Output Card */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${timingResult.color}`,
                    borderRadius: '12px',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
                      TIMING ENGINE OUTPUT CLASSIFICATION
                    </span>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: timingResult.color,
                          boxShadow: `0 0 10px ${timingResult.color}`
                        }}
                      />
                      <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: timingResult.color }}>
                        {timingResult.status}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                      {timingResult.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>
                      VERIFIED EVIDENCE FLAGS:
                    </span>
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                      <span className="badge-cyan" style={{ fontSize: '0.7rem' }}>OBSERVED: LinkedIn Signal</span>
                      <span className="badge-cyan" style={{ fontSize: '0.7rem' }}>VERIFIED: Email Signal</span>
                      <span className="badge-blue" style={{ fontSize: '0.7rem' }}>INFERRED: 45-day Decay</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 2: CREATELYA AI RESTYLER --- */}
            {activeTab === 'createlya' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>
                    Deck Restyle Controls
                  </h3>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      TOPIC / AI COPYWRITING PROMPT:
                    </label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: '#121720',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option value="AI Agents in Healthcare">AI Agents in Healthcare (12 Slides)</option>
                      <option value="Next.js 15 Vector RAG Stack">Next.js 15 Vector RAG Stack (8 Slides)</option>
                      <option value="Automated Scraper Pipeline">Automated Scraper Pipeline (10 Slides)</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      SELECT DESIGN PALETTE:
                    </label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {(['cyan', 'emerald', 'purple'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPalette(p)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            border: palette === p ? `2px solid ${palettes[p].border}` : '1px solid rgba(255,255,255,0.1)',
                            background: palettes[p].bg,
                            color: '#fff',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          {palettes[p].name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleSimulateCreatelya} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <RefreshCw size={16} className={isGenerating ? 'spin' : ''} />
                    <span>Simulate Dual-Engine Restyle</span>
                  </button>
                </div>

                {/* Slide Preview Output */}
                <div
                  style={{
                    background: palettes[palette].bg,
                    border: `1px solid ${palettes[palette].border}`,
                    borderRadius: '16px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: palettes[palette].accent }}>
                        CREATELYA GENERATED SLIDE #01
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                        Group-Gate: Server Python AST Rewrite
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: palettes[palette].text, marginBottom: '0.75rem' }}>
                      {selectedTopic}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                      Generated by Groq gpt-oss-120b model with structural vector template matching (~0.02s latency).
                    </p>
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.75rem', opacity: 0.8 }} className="font-mono">
                    <CheckCircle size={14} style={{ color: palettes[palette].accent }} />
                    <span>In-Iframe DOM Applier Synced with python-pptx Engine</span>
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 3: LODESTAR HYBRID BLENDER --- */}
            {activeTab === 'lodestar' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>
                    Score Blend Weights
                  </h3>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <label className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        BM25 KEYWORD WEIGHT:
                      </label>
                      <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                        {keywordWeight.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={keywordWeight}
                      onChange={(e) => {
                        const kw = Number(e.target.value);
                        setKeywordWeight(kw);
                        setSemanticWeight(Number((1 - kw).toFixed(2)));
                      }}
                      style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <label className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        QDRANT VECTOR SEMANTIC WEIGHT:
                      </label>
                      <span className="font-mono" style={{ color: '#38bdf8', fontWeight: 700 }}>
                        {semanticWeight.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={semanticWeight}
                      onChange={(e) => {
                        const sem = Number(e.target.value);
                        setSemanticWeight(sem);
                        setKeywordWeight(Number((1 - sem).toFixed(2)));
                      }}
                      style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
                    />
                  </div>
                </div>

                {/* Ranked Results List */}
                <div>
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '1rem' }}>
                    DYNAMICALLY RE-RANKED CANDIDATE REPOSITORIES:
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {sortedRepos.map((repo, idx) => {
                      const finalScore = calculateBlendScore(repo.bm25, repo.vector);
                      return (
                        <div
                          key={repo.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.85rem 1.25rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: idx === 0 ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '10px'
                          }}
                        >
                          <div>
                            <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 600, color: idx === 0 ? '#fff' : '#d1d5db' }}>
                              #{idx + 1} {repo.name}
                            </span>
                            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                              BM25: {repo.bm25.toFixed(2)} | Vector: {repo.vector.toFixed(2)}
                            </div>
                          </div>

                          <div className="font-mono" style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: idx === 0 ? 'var(--accent-cyan)' : '#9ca3af' }}>
                              {Math.round(Number(finalScore) * 100)}%
                            </span>
                            <span style={{ fontSize: '0.7rem', display: 'block', color: 'var(--text-dim)' }}>Closeness</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
