import React, { useState } from 'react';
import { Sparkles, CheckCircle, RefreshCw, Palette, Mic, MessageSquare, Car } from 'lucide-react';

export const InteractiveSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agent' | 'automarket' | 'slides'>('agent');

  // --- Tab 1 State: AI Chatbot Agent ---
  const [agentQuery, setAgentQuery] = useState('How do I configure RAG vector search with Ollama Qwen2.5?');
  const [retrievalMode, setRetrievalMode] = useState<'VECTOR_RAG' | 'TOOL_EXECUTION' | 'DIRECT_LLM'>('VECTOR_RAG');
  const [isProcessingQuery, setIsProcessingQuery] = useState(false);

  const sampleQueries = [
    { text: 'How do I configure RAG vector search with Ollama Qwen2.5?', mode: 'VECTOR_RAG' as const },
    { text: 'What is the current weather in Islamabad, Pakistan?', mode: 'TOOL_EXECUTION' as const },
    { text: 'Explain the difference between FastAPI async and sync handlers.', mode: 'DIRECT_LLM' as const }
  ];

  const handleSimulateAgent = () => {
    setIsProcessingQuery(true);
    setTimeout(() => setIsProcessingQuery(false), 500);
  };

  // --- Tab 2 State: Auto Market Voice Search ---
  const [selectedVoiceQuery, setSelectedVoiceQuery] = useState('Find me fuel-efficient SUVs under $30,000');
  const [voiceListening, setVoiceListening] = useState(false);

  const vehicleInventory = [
    { name: 'Tesla Model Y Long Range', type: 'Electric SUV', price: '$28,900', mpg: '122 MPGe', score: '98% Match' },
    { name: 'Toyota RAV4 Hybrid AWD', type: 'Hybrid SUV', price: '$26,400', mpg: '40 MPG', score: '95% Match' },
    { name: 'Honda CR-V e:HEV', type: 'Hybrid Compact', price: '$27,800', mpg: '38 MPG', score: '91% Match' }
  ];

  const handleSimulateVoice = () => {
    setVoiceListening(true);
    setTimeout(() => setVoiceListening(false), 800);
  };

  // --- Tab 3 State: Enterprise Slide Restyler ---
  const [selectedTopic, setSelectedTopic] = useState<string>('Autonomous Multi-Agent Architecture');
  const [palette, setPalette] = useState<'cyan' | 'emerald' | 'purple'>('cyan');
  const [isGenerating, setIsGenerating] = useState(false);

  const palettes = {
    cyan: { bg: '#080d14', border: '#00f5d4', accent: '#00f5d4', text: '#f3f4f6', name: 'Cyber Cyan' },
    emerald: { bg: '#06120e', border: '#10b981', accent: '#10b981', text: '#f3f4f6', name: 'Emerald Obsidian' },
    purple: { bg: '#0f0917', border: '#a855f7', accent: '#a855f7', text: '#f3f4f6', name: 'Deep Violet' }
  };

  const handleSimulateRestyle = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 600);
  };

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
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '720px', marginTop: '0.5rem' }}>
            Test live algorithmic behavior, RAG intent routing, speech-to-text vehicle parsing, and presentation AST restyling directly in your browser.
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
              onClick={() => setActiveTab('agent')}
              style={{
                padding: '1.25rem 1.75rem',
                background: activeTab === 'agent' ? 'rgba(0, 245, 212, 0.08)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'agent' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                color: activeTab === 'agent' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              <MessageSquare size={16} />
              <span>AI Chatbot & RAG Routing Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('automarket')}
              style={{
                padding: '1.25rem 1.75rem',
                background: activeTab === 'automarket' ? 'rgba(0, 245, 212, 0.08)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'automarket' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                color: activeTab === 'automarket' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              <Car size={16} />
              <span>Auto Market Voice & Query Parser</span>
            </button>

            <button
              onClick={() => setActiveTab('slides')}
              style={{
                padding: '1.25rem 1.75rem',
                background: activeTab === 'slides' ? 'rgba(0, 245, 212, 0.08)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'slides' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                color: activeTab === 'slides' ? 'var(--accent-cyan)' : 'var(--text-muted)',
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
              <span>Presentation AST Restyler Simulator</span>
            </button>
          </div>

          {/* Tab Content Area */}
          <div style={{ padding: '2.5rem' }}>
            {/* --- TAB 1: AI CHATBOT & RAG ROUTER --- */}
            {activeTab === 'agent' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>
                    Agent Prompt & Query Ingestion
                  </h3>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      SELECT TEST PROMPT:
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {sampleQueries.map((sq, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setAgentQuery(sq.text);
                            setRetrievalMode(sq.mode);
                          }}
                          style={{
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            background: agentQuery === sq.text ? 'rgba(0, 245, 212, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                            border: agentQuery === sq.text ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                            color: agentQuery === sq.text ? '#fff' : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          {sq.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      ACTIVE ROUTING MODE:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span className="badge-cyan" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
                        {retrievalMode}
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', alignSelf: 'center' }}>
                        Memory Buffer: Active
                      </span>
                    </div>
                  </div>

                  <button onClick={handleSimulateAgent} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <RefreshCw size={16} className={isProcessingQuery ? 'spin' : ''} />
                    <span>Simulate Agent Pipeline Execution</span>
                  </button>
                </div>

                {/* Agent Execution Telemetry Output */}
                <div
                  style={{
                    background: '#080d14',
                    border: '1px solid rgba(0, 245, 212, 0.3)',
                    borderRadius: '16px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                        AGENT EXECUTION TELEMETRY
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.7rem', color: '#10b981' }}>
                        ● LangChain + Qwen2.5 Online
                      </span>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>
                        INTENT CLASSIFICATION:
                      </span>
                      <div style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>
                        {retrievalMode === 'VECTOR_RAG' ? 'Domain Technical Inquiry → Atlas Vector Store' :
                         retrievalMode === 'TOOL_EXECUTION' ? 'Live External API Action → Weather Tool Adapter' :
                         'Direct Knowledge Synthesis → Local LLM Engine'}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>
                        SYNTHESIZED RESPONSE:
                      </span>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.6, background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        {retrievalMode === 'VECTOR_RAG' ? 'Queried indexed embeddings via cosine distance. Ollama Qwen2.5 retrieved 3 high-confidence chunks on FastAPI async vector ingestion.' :
                         retrievalMode === 'TOOL_EXECUTION' ? 'Executed HTTP tool handler in 74ms. Weather parameters extracted: Islamabad, 24°C, Clear Skies.' :
                         'FastAPI async handlers use Python asyncio event loop to handle concurrent I/O operations without blocking worker threads.'}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                    <div>
                      <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>LATENCY</span>
                      <div className="font-mono cyan-gradient-text" style={{ fontSize: '1rem', fontWeight: 700 }}>42ms</div>
                    </div>
                    <div>
                      <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>GROUNDING</span>
                      <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>99.2%</div>
                    </div>
                    <div>
                      <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>VOICE READY</span>
                      <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>Whisper STT</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 2: AUTO MARKET VOICE SEARCH --- */}
            {activeTab === 'automarket' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>
                    Whisper Voice Query Simulation
                  </h3>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      VOICE INQUIRY INPUT:
                    </label>
                    <input
                      type="text"
                      value={selectedVoiceQuery}
                      onChange={(e) => setSelectedVoiceQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: '#121720',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <button onClick={handleSimulateVoice} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                      <Mic size={16} style={{ color: voiceListening ? '#ef4444' : 'var(--accent-cyan)' }} />
                      <span>{voiceListening ? 'Transcribing Whisper Audio...' : 'Test Speech Input'}</span>
                    </button>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.35rem' }}>
                      EXTRACTED PARAMETRIC FILTER:
                    </div>
                    <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <li>• Category: <strong>SUV / Crossover</strong></li>
                      <li>• Max Budget: <strong>$30,000</strong></li>
                      <li>• Powertrain: <strong>Hybrid / EV (Fuel Efficient)</strong></li>
                    </ul>
                  </div>
                </div>

                {/* Auto Market Matching Results */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' }}>
                    Matched Inventory from MongoDB Aggregation
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {vehicleInventory.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '1rem',
                          borderRadius: '10px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{item.name}</div>
                          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {item.type} • {item.mpg}
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div className="font-mono cyan-gradient-text" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                            {item.price}
                          </div>
                          <span className="badge-cyan" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>
                            {item.score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 3: PRESENTATION RESTYLER --- */}
            {activeTab === 'slides' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>
                    Deck Restyle Controls
                  </h3>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      TOPIC / AI COPYWRITING OUTLINE:
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
                      <option value="Autonomous Multi-Agent Architecture">Autonomous Multi-Agent Architecture (10 Slides)</option>
                      <option value="Vector Search & LLM Inference Pipeline">Vector Search & LLM Inference Pipeline (8 Slides)</option>
                      <option value="Full-Stack System Performance Benchmark">Full-Stack System Performance Benchmark (12 Slides)</option>
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

                  <button onClick={handleSimulateRestyle} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
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
                        GENERATED PRESENTATION SLIDE #01
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                        Group-Gate: Server Python AST Rewrite
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: palettes[palette].text, marginBottom: '0.75rem' }}>
                      {selectedTopic}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                      Generated by high-throughput LLM model with structural vector template matching across 1,562 slide templates (~0.02s latency).
                    </p>
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.75rem', opacity: 0.8 }} className="font-mono">
                    <CheckCircle size={14} style={{ color: palettes[palette].accent }} />
                    <span>In-Iframe DOM Applier Synced with python-pptx Engine</span>
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
