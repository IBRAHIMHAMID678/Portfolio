import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectScreenshot } from '../data/portfolioData';

interface ScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  screenshots: ProjectScreenshot[];
  initialIndex?: number;
  projectTitle: string;
}

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({
  isOpen,
  onClose,
  screenshots,
  initialIndex = 0,
  projectTitle
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, screenshots.length]);

  if (!isOpen || !screenshots || screenshots.length === 0) return null;

  const current = screenshots[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 7, 10, 0.92)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      {/* Modal Dialog Box */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(15, 20, 28, 0.95)',
          border: '1px solid rgba(0, 245, 212, 0.3)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 245, 212, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(10, 14, 20, 0.8)'
          }}
        >
          <div>
            <div className="font-mono cyan-gradient-text" style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>
              {projectTitle} // SYSTEM SCREENSHOT
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>
              {current.title}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {currentIndex + 1} / {screenshots.length}
            </span>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                color: '#fff',
                padding: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              aria-label="Close Screenshot Modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Image Display Area with Navigation */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: '340px',
            maxHeight: '68vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#06080b',
            overflow: 'hidden',
            padding: '1rem'
          }}
        >
          <img
            src={current.url}
            alt={current.title}
            style={{
              maxWidth: '100%',
              maxHeight: '65vh',
              objectFit: 'contain',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)'
            }}
          />

          {/* Left Arrow */}
          {screenshots.length > 1 && (
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(15, 20, 28, 0.85)',
                border: '1px solid rgba(0, 245, 212, 0.4)',
                borderRadius: '50%',
                color: 'var(--accent-cyan)',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Previous Screenshot (Left Arrow)"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Right Arrow */}
          {screenshots.length > 1 && (
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(15, 20, 28, 0.85)',
                border: '1px solid rgba(0, 245, 212, 0.4)',
                borderRadius: '50%',
                color: 'var(--accent-cyan)',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Next Screenshot (Right Arrow)"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Footer with Caption & Thumbnails */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(10, 14, 20, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem'
          }}
        >
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--accent-cyan)' }}>Architectural Note: </strong>
            {current.caption}
          </p>

          {/* Thumbnail Strip */}
          {screenshots.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
              {screenshots.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '50px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: currentIndex === idx ? '2px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: '#000',
                    cursor: 'pointer',
                    opacity: currentIndex === idx ? 1 : 0.6,
                    transition: 'all 0.2s',
                    flexShrink: 0,
                    padding: 0
                  }}
                >
                  <img src={s.url} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
