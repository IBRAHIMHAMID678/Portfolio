import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutEditorial } from './components/AboutEditorial';
import { ProjectShowcase } from './components/ProjectShowcase';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { TechMatrix } from './components/TechMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { GithubStats } from './components/GithubStats';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div style={{ position: 'relative', background: 'var(--bg-dark)', minHeight: '100vh', color: 'var(--text-main)' }}>
      {/* Visual Ambient Depth Effects */}
      <div className="ambient-background" />
      <div className="grid-overlay" />

      {/* Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Core Portfolio Sections */}
      <main style={{ position: 'relative', zIndex: 5 }}>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <AboutEditorial />
        <ProjectShowcase />
        <InteractiveSandbox />
        <TechMatrix />
        <ExperienceTimeline />
        <GithubStats />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

export default App;
