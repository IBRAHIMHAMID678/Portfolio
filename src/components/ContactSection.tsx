import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUpRight, Phone, Download } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(IBRAHIM_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        <div className="double-bezel">
          <div
            className="double-bezel-inner"
            style={{
              padding: '3.5rem 3rem',
              background: 'linear-gradient(180deg, rgba(16, 21, 30, 0.96) 0%, rgba(9, 12, 17, 0.98) 100%)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
              {/* Left Column: Direct Call to Action */}
              <div>
                <div className="badge-eyebrow" style={{ marginBottom: '1.25rem' }}>
                  <span className="pulse-dot" />
                  <Mail size={13} />
                  <span>07 // START A CONVERSATION</span>
                </div>
                
                <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                  Let’s Build Something <br />
                  <span className="cyan-gradient-text">Intelligent & Scalable.</span>
                </h2>

                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '2.25rem' }}>
                  Whether you're looking for an AI/ML Software Engineer, building an autonomous agent platform, or deploying robust full-stack web applications—let's connect.
                </p>

                {/* One-Click Copy Email Button */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                    DIRECT CONTACT EMAIL:
                  </span>
                  <div
                    onClick={handleCopyEmail}
                    className="btn-island-outline"
                    style={{
                      cursor: 'pointer',
                      padding: '0.65rem 0.85rem 0.65rem 1.25rem'
                    }}
                    title="Click to copy email address"
                  >
                    <Mail size={16} style={{ color: 'var(--accent-cyan)' }} />
                    <span className="font-mono" style={{ fontSize: '0.925rem', color: '#fff', fontWeight: 600 }}>
                      {IBRAHIM_DATA.email}
                    </span>
                    <span className="btn-icon-bubble" style={{ width: '28px', height: '28px', color: copied ? '#10b981' : 'var(--accent-cyan)' }}>
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </span>
                  </div>
                  {copied && (
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: '#10b981', display: 'block', marginTop: '0.45rem' }}>
                      ✓ Email address copied to clipboard!
                    </span>
                  )}
                </div>

                {/* Phone and Location */}
                <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="font-mono">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <Phone size={15} style={{ color: 'var(--accent-cyan)' }} />
                    <a href={`tel:${IBRAHIM_DATA.phone}`} style={{ color: '#fff', textDecoration: 'none' }}>
                      {IBRAHIM_DATA.phone}
                    </a>
                  </div>
                </div>

                {/* Social Link Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <a
                    href={IBRAHIM_DATA.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-island-secondary"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub</span>
                    <span className="btn-icon-bubble" style={{ width: '26px', height: '26px' }}>
                      <ArrowUpRight size={13} />
                    </span>
                  </a>

                  <a
                    href={IBRAHIM_DATA.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-island-secondary"
                  >
                    <ArrowUpRight size={16} style={{ color: '#38bdf8' }} />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={IBRAHIM_DATA.resumePdfUrl}
                    download="Ibrahim_Hamid_Resume.pdf"
                    className="btn-island-secondary"
                  >
                    <Download size={15} />
                    <span>PDF Resume</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Direct Message Dispatcher */}
              <div
                style={{
                  background: 'rgba(12, 16, 22, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '18px',
                  padding: '2rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.08)'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                  Send a Direct Message
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                  Leave a query or collaboration inquiry—I typically respond within 24 hours.
                </p>

                {submitted ? (
                  <div
                    style={{
                      padding: '2rem 1.5rem',
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '12px',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.2)',
                        color: '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto'
                      }}
                    >
                      <Check size={24} />
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>
                      Message Dispatched
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Thank you! Your note has been queued. You can also reach me directly at {IBRAHIM_DATA.email}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.45rem', letterSpacing: '0.05em' }}>
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Vance"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          color: '#fff',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                      />
                    </div>

                    <div>
                      <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.45rem', letterSpacing: '0.05em' }}>
                        YOUR EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          color: '#fff',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                      />
                    </div>

                    <div>
                      <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.45rem', letterSpacing: '0.05em' }}>
                        PROJECT / INQUIRY DETAILS
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your system requirements, timeline, or engineering opportunity..."
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          color: '#fff',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          resize: 'vertical',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-island-primary"
                      style={{ width: '100%', justifyContent: 'center', padding: '0.75rem 1.5rem', marginTop: '0.5rem' }}
                    >
                      <span>Transmit Message</span>
                      <span className="btn-icon-bubble">
                        <Send size={15} />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
