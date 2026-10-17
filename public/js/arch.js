// Ibrahim Hamid — System Architecture Schema
window.ARCH = {
  boxes: [
    ['client', 'Client / UI', 'Next.js & React', 15, 20, 150, 48, 'app'],
    ['gateway', 'FastAPI Gateway', 'Async Python 3.11', 205, 20, 150, 48, 'edge'],
    ['workers', 'Worker Pool', 'Scrapers & AST', 395, 20, 150, 48, 'worker'],
    ['groq', 'Groq LLaMA-3.1', '< 300ms Inference', 205, 120, 150, 48, 'model'],
    ['mongo', 'MongoDB & Redis', 'Cache & Persistence', 15, 120, 150, 48, 'data'],
    ['playwright', 'Playwright Pool', 'Headless Chromium', 395, 120, 150, 48, 'worker'],
    ['ats', 'Lever & Greenhouse', 'ATS Application Forms', 395, 220, 150, 48, 'ext'],
    ['whatsapp', 'Meta Cloud API', 'Webhooks & Receipts', 205, 220, 150, 48, 'ext'],
    ['threejs', 'Three.js WebGL', '3D Spatial Simulator', 15, 220, 150, 48, 'app'],
  ],
  links: [
    ['client', 'gateway'],
    ['gateway', 'workers'],
    ['gateway', 'groq'],
    ['gateway', 'mongo'],
    ['workers', 'playwright'],
    ['workers', 'mongo'],
    ['playwright', 'ats'],
    ['gateway', 'whatsapp'],
    ['client', 'threejs'],
  ],
};
