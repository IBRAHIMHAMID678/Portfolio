import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface WhatsAppAgent3DProps {
  height?: number;
}

export const WhatsAppAgent3D: React.FC<WhatsAppAgent3DProps> = ({ height = 360 }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'user', text: 'Hi! Do you have any slots available for an engineering consultation tomorrow?', time: '14:28' },
    { sender: 'bot', text: 'Hello! Yes, I have open slots at 10:00 AM and 3:30 PM PKT. Which time suits you best?', time: '14:28' }
  ]);

  const simulateBooking = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(1);

    // Step 1: User picks 10:00 AM
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: '10:00 AM works perfectly for me.', time: '14:29' }
      ]);
      setActiveStep(2);

      // Step 2: Bot reserves slot & confirms
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: '✅ Confirmed! Slot reserved for tomorrow at 10:00 AM. A calendar invitation has been dispatched to your email.', time: '14:29' }
        ]);
        setActiveStep(3);

        setTimeout(() => {
          setIsSimulating(false);
          setActiveStep(0);
        }, 3000);
      }, 1400);
    }, 1000);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        background: '#070a0e',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem'
      }}
    >
      {/* Top Header Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 }}>
        <div
          className="font-mono"
          style={{
            fontSize: '0.725rem',
            padding: '0.3rem 0.65rem',
            borderRadius: '6px',
            background: 'rgba(10, 15, 22, 0.9)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <MessageSquare size={13} style={{ color: '#25D366' }} />
          <span>META WHATSAPP CLOUD API // GATEWAY ONLINE</span>
        </div>

        <button
          onClick={simulateBooking}
          disabled={isSimulating}
          style={{
            background: isSimulating ? 'rgba(37, 211, 102, 0.2)' : 'rgba(16, 22, 30, 0.9)',
            border: '1px solid rgba(37, 211, 102, 0.4)',
            color: '#25D366',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 700,
            cursor: isSimulating ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)'
          }}
        >
          <Send size={12} />
          <span>{isSimulating ? 'PROCESSING INBOUND...' : 'TEST INBOUND INQUIRY'}</span>
        </button>
      </div>

      {/* Center: Live Conversation Thread Simulation */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          overflowY: 'auto',
          maxHeight: '210px',
          padding: '0.5rem',
          borderRadius: '10px',
          background: 'rgba(11, 16, 23, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          margin: '0.5rem 0'
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '82%',
              padding: '0.65rem 0.85rem',
              borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              background: msg.sender === 'user' ? '#075e54' : '#1f2c34',
              color: '#fff',
              fontSize: '0.8rem',
              lineHeight: 1.45,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
              {msg.sender === 'bot' ? (
                <span className="font-mono" style={{ fontSize: '0.65rem', color: '#25D366', fontWeight: 700 }}>
                  AI RECEPTIONIST
                </span>
              ) : (
                <span className="font-mono" style={{ fontSize: '0.65rem', color: '#8696a0' }}>
                  CUSTOMER
                </span>
              )}
            </div>
            <div>{msg.text}</div>
            <div className="font-mono" style={{ fontSize: '0.6rem', color: '#8696a0', textAlign: 'right', marginTop: '0.25rem' }}>
              {msg.time}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Architecture Pipeline State Indicators */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          borderRadius: '8px',
          background: 'rgba(10, 15, 22, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
        className="font-mono"
      >
        {[
          { label: '1. WEBHOOK', desc: 'SHA-256 Valid', active: activeStep >= 0 },
          { label: '2. INTENT', desc: 'Slot Booking', active: activeStep >= 1 },
          { label: '3. CALENDAR', desc: 'Slot Locked', active: activeStep >= 2 },
          { label: '4. CRM SYNC', desc: 'Dispatched', active: activeStep >= 3 }
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: '0.3rem 0.45rem',
              borderRadius: '6px',
              background: item.active ? 'rgba(37, 211, 102, 0.12)' : 'rgba(255, 255, 255, 0.02)',
              border: item.active ? '1px solid rgba(37, 211, 102, 0.35)' : '1px solid rgba(255, 255, 255, 0.05)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.65rem', color: item.active ? '#25D366' : 'var(--text-dim)', fontWeight: 700 }}>
              {item.label}
            </div>
            <div style={{ fontSize: '0.6rem', color: item.active ? '#e5e7eb' : 'var(--text-dim)' }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
