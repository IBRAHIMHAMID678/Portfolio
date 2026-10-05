import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUpRight, Phone, Download } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(IBRAHIM_DATA.email);
    } catch {
      // Fallback for non-secure contexts where the Clipboard API is unavailable
      const ta = document.createElement('textarea');
      ta.value = IBRAHIM_DATA.email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* noop */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    const subject = `Portfolio inquiry from ${formData.name || 'a visitor'}`;
    const body = `Name: ${formData.name || '—'}\nEmail: ${formData.email}\n\n${formData.message}`;
    window.location.href = `mailto:${IBRAHIM_DATA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        <div
          className="glass-card"
          style={{
            padding: '3.5rem 2.5rem',
            background: 'linear-gradient(180deg, #0d1219 0%, #080a0d 100%)',
            border: '1px solid rgba(0, 245, 212, 0.3)',
            boxShadow: '0 20px 40px -15px rgba(0, 245, 212, 0.15)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            {/* Left Column: Direct Call to Action */}
            <div>
              <div className="badge-cyan" style={{ marginBottom: '1rem' }}>
                <Mail size={14} />
                <span>06 // START A CONVERSATION</span>
              </div>
              
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                Let’s Build Something <br />
                <span className="cyan-gradient-text">Intelligent.</span>
              </h2>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Whether you're looking for an AI Full Stack Developer, building an autonomous agent platform, or deploying robust full-stack web applications—let's connect.
              </p>

              {/* One-Click Copy Email Button */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>
                  DIRECT CONTACT EMAIL:
                </span>
                <div
                  onClick={handleCopyEmail}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1.25rem',
                    background: 'rgba(0, 245, 212, 0.06)',
                    border: '1px solid rgba(0, 245, 212, 0.3)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Mail size={18} style={{ color: 'var(--accent-cyan)' }} />
                  <span className="font-mono" style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>
                    {IBRAHIM_DATA.email}
                  </span>
                  <div style={{ color: copied ? '#10b981' : 'var(--accent-cyan)' }}>
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </div>
                </div>
                {copied && (
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: '#10b981', display: 'block', marginTop: '0.35rem' }}>
                    Email address copied to clipboard!
                  </span>
                )}
              </div>

              {/* Phone and Location */}
              <div style={{ marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="font-mono">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Phone size={15} style={{ color: 'var(--accent-cyan)' }} />
                  <a href={`tel:${IBRAHIM_DATA.phone.replace(/\s/g, '')}`} style={{ color: '#fff', textDecoration: 'none' }}>
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
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                >
                  <GithubIcon size={16} />
                  <span>GitHub Profile</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={IBRAHIM_DATA.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={IBRAHIM_DATA.resumePdfUrl}
                  download="Ibrahim_Hamid_Resume.pdf"
                  className="btn-outline-cyan"
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                >
                  <Download size={14} />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>

            {/* Right Column: Direct Message Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label htmlFor="contact-name" className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  YOUR NAME:
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. Lead Engineer / Hiring Manager"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  YOUR EMAIL ADDRESS:
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  PROJECT OR ROLE DETAILS:
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Tell me about your product requirements, engineering challenges, or available roles..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={16} />
                <span>{submitted ? 'Opening Your Email Client…' : 'Send Direct Message'}</span>
              </button>

              {submitted && (
                <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#34d399', fontSize: '0.85rem', textAlign: 'center' }} className="font-mono">
                  Opening your email app with the message addressed to Ibrahim Hamid — just hit send.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
