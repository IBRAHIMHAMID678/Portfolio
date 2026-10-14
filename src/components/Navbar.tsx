import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { IBRAHIM_DATA } from '../data/portfolioData';
import { GithubIcon } from './GithubIcon';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPos = window.scrollY + 180;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.75rem 1rem' : '1.25rem 1rem',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          transition: 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)'
        }}
      >
        <nav
          className="double-bezel"
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '1100px',
            padding: '4px',
            borderRadius: '9999px',
            background: scrolled
              ? 'rgba(10, 14, 20, 0.78)'
              : 'rgba(10, 14, 20, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: scrolled ? 'rgba(0, 245, 212, 0.22)' : 'rgba(255, 255, 255, 0.08)',
            boxShadow: scrolled
              ? '0 16px 40px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 245, 212, 0.08)'
              : '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.45rem 0.75rem 0.45rem 1.15rem',
              borderRadius: '9999px',
              background: 'transparent'
            }}
          >
            {/* Brand Logo with Live Terminal Node */}
            <a
              href="#hero"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                color: '#fff'
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(0,245,212,0.2) 0%, rgba(59,130,246,0.2) 100%)',
                  border: '1px solid rgba(0,245,212,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  boxShadow: '0 0 15px rgba(0, 245, 212, 0.15)'
                }}
              >
                <Terminal size={17} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.925rem', letterSpacing: '-0.02em', color: '#fff' }}>
                    IBRAHIM HAMID
                  </span>
                  <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                </div>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', letterSpacing: '0.08em' }}>
                  AI SYSTEMS ARCHITECT
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {[
                { id: 'about', label: 'Mindset' },
                { id: 'projects', label: 'Systems & 3D' },
                { id: 'skills', label: 'Capabilities' },
                { id: 'experience', label: 'Experience' },
                { id: 'github', label: 'Footprint' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      background: isActive ? 'rgba(0, 245, 212, 0.08)' : 'transparent',
                      border: isActive ? '1px solid rgba(0, 245, 212, 0.2)' : '1px solid transparent',
                      transition: 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)'
                    }}
                    className="nav-item-link"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Action CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                onClick={onOpenResume}
                className="btn-island-secondary"
                style={{ padding: '0.35rem 0.5rem 0.35rem 1rem', fontSize: '0.825rem' }}
                title="View interactive resume drawer"
              >
                <span>Resume</span>
                <span className="btn-icon-bubble" style={{ width: '26px', height: '26px' }}>
                  <FileText size={13} />
                </span>
              </button>

              <a
                href={IBRAHIM_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)'
                }}
                className="github-nav-btn"
                title="GitHub Profile"
              >
                <GithubIcon size={17} />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                className="mobile-toggle"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(6, 8, 12, 0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.75rem',
            padding: '2rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center', width: '100%', maxWidth: '320px' }}>
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'Engineering Mindset' },
              { id: 'projects', label: 'Production Architectures & 3D' },
              { id: 'skills', label: 'Capability Matrix' },
              { id: 'experience', label: 'Work History' },
              { id: 'github', label: 'GitHub Repositories' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: '#fff',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="btn-island-primary"
              style={{ justifyContent: 'center', marginTop: '0.75rem' }}
            >
              <span>View Resume</span>
              <span className="btn-icon-bubble">
                <ArrowUpRight size={16} />
              </span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-item-link:hover {
          color: #fff !important;
          background: rgba(255, 255, 255, 0.06) !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
        }
        .github-nav-btn:hover {
          color: var(--accent-cyan) !important;
          border-color: rgba(0, 245, 212, 0.3) !important;
          background: rgba(0, 245, 212, 0.08) !important;
          transform: translateY(-1px);
        }
        @media (max-width: 960px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
