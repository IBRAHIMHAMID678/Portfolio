export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: 'AI / GenAI' | 'Vector Search & ML' | 'Data Systems & OSINT' | 'Full-Stack Platform';
  summary: string;
  problem: string;
  architectureDetails: string[];
  keyOutcome: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  evidenceFlags?: string[];
  systemFlow: {
    title: string;
    description: string;
  }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: { name: string; level: string; proof: string }[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  techUsed: string[];
}

export const IBRAHIM_DATA = {
  name: 'Ibrahim Hamid',
  role: 'AI / ML Engineer & Systems Architect',
  location: 'Pakistan',
  githubUsername: 'IBRAHIMHAMID678',
  githubUrl: 'https://github.com/IBRAHIMHAMID678',
  email: 'ibrahim.hamid.dev@gmail.com', // Professional fallback contact
  bio: 'Computer Science professional specializing in AI/ML engineering, LLM orchestration, RAG architectures, Python backend systems, vector search, and resilient data pipelines. Passionate about turning complex AI research into robust production products.',
  
  heroStats: [
    { value: '5+', label: 'Production Systems' },
    { value: '1.5k+', label: 'Templates Vector Searched' },
    { value: '60%', label: 'Signal Verification Rate' },
    { value: '24/7', label: 'Automated Ingestion Pipelines' }
  ],

  projects: [
    {
      id: 'britesearch',
      number: '01',
      title: 'Britesearch — OSINT & Intent-Driven ICP Engine',
      tagline: 'Real-time sales intelligence & intent engine with evidence lineage classification',
      category: 'AI / GenAI',
      summary: 'Architected and built Track I of the Britesearch platform: an ICP qualification engine, event-proximity timing classifier, and tiered RAG/LLM hyper-personalization pipeline.',
      problem: 'Generic outreach pipelines spam thousands of leads without timing or context, leading to low conversion and high LLM token costs.',
      architectureDetails: [
        'Deterministic ICP engine (icpEngine.ts) using code-controlled query shapes rather than hallucination-prone prompt generation.',
        'Layered timing classifier (leadScorer.ts): Queue (>15d), Active Send Window (5-7d before event), and Late Suppression (<2d).',
        'Tiered personalization split (Stream A/B) reserving hyper-personalization for top-tier leads to control LLM costs.',
        'Evidence lineage tagging (OBSERVED, EXTRACTED, VERIFIED, INFERRED, PREDICTED) to ensure transparent rule scoring.'
      ],
      keyOutcome: 'Delivered an end-to-end pipeline processing 8,000 profile batches down to ~3,600 sendable emails with 60% lookup rates.',
      techStack: ['Next.js 15', 'TypeScript', 'Python', 'FastAPI', 'OpenAI GPT-4', 'LangChain', 'PostgreSQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Brandlya-Devs/Britesearch',
      featured: true,
      metrics: [
        { label: 'Signal Lookup Rate', value: '~60%' },
        { label: 'Funnel Target Batch', value: '8,000 profiles' },
        { label: 'Event Proximity Window', value: '5–7 Days' }
      ],
      evidenceFlags: ['OBSERVED', 'EXTRACTED', 'VERIFIED', 'INFERRED', 'PREDICTED'],
      systemFlow: [
        { title: '1. Signal & Intent Ingestion', description: 'Consumes speaker, funding, and hiring trigger events via OSINT adapters.' },
        { title: '2. Deterministic ICP Filter', description: 'Filters candidates against versioned target buyer models without unconstrained LLM execution.' },
        { title: '3. Event-Proximity Classifier', description: 'Calculates days-until-event and classifies leads into 5-7d active outreach windows.' },
        { title: '4. Stream A/B Personalization', description: 'Routes high-tier leads to deep LLM hyper-personalization while using standard one-liners for volume leads.' }
      ]
    },
    {
      id: 'createlya',
      number: '02',
      title: 'Createlya — AI Generative Slide Presentation Platform',
      tagline: 'Vector-searched slide template generator with Groq AI copywriting & dual-engine PPTX restyler',
      category: 'AI / GenAI',
      summary: 'Built the core AI generation and restyling engine for Createlya, bridging high-speed vector retrieval across 1,562 deck templates with live OnlyOffice document editing.',
      problem: 'AI presentation generators produce static images or uneditable PDFs that designers cannot manipulate or restyle.',
      architectureDetails: [
        'Vector retrieval search engine (~0.02s latency) using text-embedding-3-small embeddings with keyword rank fallback.',
        'Groq LLM text generation pipeline utilizing gpt-oss-120b and llama-3.3-70b-versatile for structured slide copy.',
        'Dual-engine structural restyler syncing in-iframe DOM/SVG manipulators (3,557 lines) with server-side python-pptx AST rewriters (2,429 lines).',
        'OnlyOffice CE Docker integration with MinIO S3 object storage for real-time collaborative slide restyling.'
      ],
      keyOutcome: 'Enabled 1,562 slide templates to be restyled in real-time with sub-second iframe application and full grouped shape server rewrites.',
      techStack: ['NestJS 11', 'Next.js 15', 'Groq AI', 'OpenRouter', 'Python', 'python-pptx', 'OnlyOffice Docker', 'MinIO S3', 'MongoDB'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678',
      featured: true,
      metrics: [
        { label: 'Template Library', value: '1,562 Decks' },
        { label: 'Vector Retrieval Speed', value: '~0.02 sec' },
        { label: 'In-Iframe Restyle', value: '~400 ms' }
      ],
      systemFlow: [
        { title: '1. User Prompt & Vector Search', description: 'Embeds user intent and performs cosine similarity search across 1,562 deck embeddings.' },
        { title: '2. Groq AI Copywriting', description: 'Streams structured JSON slide text using gpt-oss-120b with fallback rankers.' },
        { title: '3. AST Extraction & Classification', description: 'Parses PPTX shapes into nested group hierarchy and detects grouped elements.' },
        { title: '4. Dual-Engine Synchronization', description: 'Executes fast iframe SVG recoloring for flat shapes or server Python AST restyling for grouped shapes.' }
      ]
    },
    {
      id: 'lodestar',
      number: '03',
      title: 'Lodestar Engine — GitHub Semantic & Keyword Idea Matcher',
      tagline: 'Hybrid BM25 keyword + vector semantic embedding engine for instant open-source idea validation',
      category: 'Vector Search & ML',
      summary: 'Engineered a 24/7 GitHub repository crawler and hybrid search engine that evaluates open-source product overlap before building duplicate software.',
      problem: 'Standard GitHub keyword search misses conceptually similar projects named differently, leading developers to re-invent existing tools.',
      architectureDetails: [
        'Resumable 24/7 GitHub API crawler storing repository metadata in MongoDB and dense vector embeddings in Qdrant.',
        'Hybrid matching score blending algorithm combining BM25 text match weight + vector semantic similarity + repository popularity boost.',
        'FastAPI REST API (/search, /select) serving futuristic Next.js reactive frontend with zero live external API reliance during query phase.'
      ],
      keyOutcome: 'Provides sub-100ms hybrid search results over tens of thousands of indexed repositories with accurate semantic closeness scoring.',
      techStack: ['Python', 'FastAPI', 'Qdrant Vector DB', 'MongoDB', 'OpenAI Embeddings', 'Next.js', 'React', 'TypeScript', 'Docker'],
      githubUrl: 'https://github.com/Brandlya-Devs/Company-App-Intelligence-Scrapers',
      featured: true,
      metrics: [
        { label: 'Search Latency', value: '< 100 ms' },
        { label: 'Matching Engines', value: 'BM25 + Qdrant' },
        { label: 'Crawler Availability', value: '24/7 Resumable' }
      ],
      systemFlow: [
        { title: '1. 24/7 Background Crawler', description: 'Harvests repository details, READMEs, and stargazers into MongoDB.' },
        { title: '2. Vector Embedding Pipeline', description: 'Generates OpenAI embeddings and indexes vectors into Qdrant database.' },
        { title: '3. Hybrid Blending Engine', description: 'Dynamically balances WEIGHT_KEYWORD + WEIGHT_SEMANTIC + POPULARITY_BOOST.' },
        { title: '4. Reactive Client UI', description: 'Displays rank-sorted match percentages with visual code closeness indicators.' }
      ]
    },
    {
      id: 'vantage',
      number: '04',
      title: 'Vantage Intelligence Pipeline — Fortune 500 & Startup Scraper',
      tagline: 'Automated intelligence pipeline with plugin auto-discovery and HTTP-to-Playwright browser tiering',
      category: 'Data Systems & OSINT',
      summary: 'Designed an intelligence pipeline collecting public growth signals, hiring indicators, and app metrics across Fortune 500 firms, Y Combinator startups, and mobile stores.',
      problem: 'Data scraping pipelines break easily when targets change DOM structure or require different anti-bot capabilities.',
      architectureDetails: [
        'Auto-discovering Python plugin architecture (app/sources/) where adding a single Python file registers a new source automatically.',
        'Tiered fetching strategy: HTTP-first lightweight requests falling back to Playwright browser cluster for anti-bot sites.',
        'SQLite storage with deduplication by (source, external_id) and headless CLI execution for 24/7 server cron jobs.'
      ],
      keyOutcome: 'Successfully aggregated data across 3 tracks into a unified SQLite/FastAPI intelligence dashboard deployed on mini-server Docker containers.',
      techStack: ['Python 3.11', 'FastAPI', 'Playwright', 'SQLite', 'Uvicorn', 'Docker Compose'],
      githubUrl: 'https://github.com/Brandlya-Devs/Company-App-Intelligence-Scrapers',
      featured: false,
      metrics: [
        { label: 'Source Tracks', value: 'Fortune 500 + YC + Mobile' },
        { label: 'Plugin Discovery', value: 'Zero-Config Drop-in' },
        { label: 'Deployment', value: 'Docker 24/7' }
      ],
      systemFlow: [
        { title: '1. Source Plugin Auto-Discovery', description: 'Loads all source modules dynamically from app/sources/ directory.' },
        { title: '2. Tiered Fetch Engine', description: 'Attempts fast HTTP requests first, escalating to Playwright browser instances if challenged.' },
        { title: '3. Deduplication & Unified Schema', description: 'Normalizes disparate site data into standard Company records.' },
        { title: '4. Dashboard & Export API', description: 'Exposes data through FastAPI endpoints and automated CSV exports.' }
      ]
    },
    {
      id: 'scrapply',
      number: '05',
      title: 'Scrapply Engine — Cloudflare-Bypass PDF Ingestion System',
      tagline: 'Resilient document acquisition engine with Turnstile bypass and fuzzy verifier judge',
      category: 'Data Systems & OSINT',
      summary: 'Engineered a host-native Chrome automation pipeline connected through Docker Cloudflare Tunnels to pass advanced Turnstile bot protection.',
      problem: 'Cloudflare Turnstile detects headless browsers and Docker virtual displays (Xvfb), blocking automated document retrieval.',
      architectureDetails: [
        'Host-native real Chrome execution paired with Docker cloudflared container forwarding public traffic to host.docker.internal:8100.',
        'Deterministic verifier judge (app/judge.py) combining title keyword overlap, fuzzy string similarity, and author validation.',
        'Serial browser job queue ensuring single-tab stability, preventing anti-bot rate limiting.',
        'Server-Sent Events (SSE) telemetry powering a real-time job status dashboard.'
      ],
      keyOutcome: 'Achieved 100% Turnstile challenge pass rate with automated confidence-scored PDF downloads and key-authed REST API.',
      techStack: ['FastAPI', 'Python', 'Real Chrome Automation', 'Cloudflare Tunnels', 'SQLite', 'SSE', 'Fuzzy Matching'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678',
      featured: false,
      metrics: [
        { label: 'Turnstile Pass Rate', value: '100% Host-Native' },
        { label: 'Match Confidence Threshold', value: '0.6 Fuzzy Score' },
        { label: 'Telemetry', value: 'Real-Time SSE' }
      ],
      systemFlow: [
        { title: '1. API / UI Fetch Request', description: 'Queues book title and author into serial browser queue.' },
        { title: '2. Host-Native Chrome Execution', description: 'Navigates target via native display Chrome, bypassing Turnstile detection.' },
        { title: '3. Fuzzy Judge Verification', description: 'Calculates string similarity and title match confidence score.' },
        { title: '4. File Retrieval & Telemetry', description: 'Saves file to library and streams live updates via Server-Sent Events.' }
      ]
    }
  ] as Project[],

  skillCategories: [
    {
      title: 'AI, LLMs & Vector Search',
      description: 'Engineering intelligent product capabilities with modern foundation models & vector indexes.',
      iconName: 'Cpu',
      skills: [
        { name: 'Generative AI & Prompt AST', level: 'Expert', proof: 'Createlya Groq AI pipeline' },
        { name: 'RAG & Vector Embeddings', level: 'Advanced', proof: 'Qdrant & OpenRouter text-embedding-3' },
        { name: 'OpenAI GPT-4 & Groq Models', level: 'Expert', proof: 'gpt-oss-120b & llama-3.3-70b integrations' },
        { name: 'LangChain & Orchestration', level: 'Advanced', proof: 'Britesearch ICP signal pipelines' },
        { name: 'Hybrid BM25 + Vector Blending', level: 'Advanced', proof: 'Lodestar hybrid search engine' }
      ]
    },
    {
      title: 'Backend Systems & Data Engineering',
      description: 'Building resilient API backends, automated pipelines, and persistent database architectures.',
      iconName: 'Server',
      skills: [
        { name: 'Python (FastAPI, Flask, PyTest)', level: 'Expert', proof: 'Vantage, Lodestar & Scrapply backends' },
        { name: 'TypeScript & Node.js / NestJS', level: 'Advanced', proof: 'Createlya NestJS 11 microservices' },
        { name: 'PostgreSQL & MongoDB', level: 'Advanced', proof: 'Britesearch & Lodestar database schemas' },
        { name: 'SQLite & MinIO S3 Storage', level: 'Advanced', proof: 'Local S3 & persistent SQLite queues' },
        { name: 'REST APIs & SSE Streams', level: 'Expert', proof: 'Server-Sent Events & Key-authed APIs' }
      ]
    },
    {
      title: 'Frontend Engineering & UI Systems',
      description: 'Crafting responsive, high-performance web products with modern UI architecture.',
      iconName: 'Layout',
      skills: [
        { name: 'Next.js 15 & React 19', level: 'Expert', proof: 'Createlya & Britesearch web applications' },
        { name: 'TypeScript & State Management', level: 'Expert', proof: 'Type-safe contracts across frontend apps' },
        { name: 'HTML5 Canvas & 2D/3D Animations', level: 'Advanced', proof: 'Interactive background canvas engines' },
        { name: 'Tailwind CSS & Vanilla CSS Systems', level: 'Expert', proof: 'Design tokens, dark modes, glassmorphism' },
        { name: 'OnlyOffice / In-Iframe Plugin Apps', level: 'Advanced', proof: 'Createlya 3,557-line theme applier' }
      ]
    },
    {
      title: 'Scrapers, Cloud & DevOps',
      description: 'Automating web data extraction, dockerized deployments, and server infrastructure.',
      iconName: 'Terminal',
      skills: [
        { name: 'Playwright & Selenium Automation', level: 'Expert', proof: 'Vantage scraper cluster' },
        { name: 'Cloudflare Turnstile Bypass', level: 'Advanced', proof: 'Scrapply host-native architecture' },
        { name: 'Docker & Docker Compose', level: 'Advanced', proof: '24/7 container deployments' },
        { name: 'Git & GitHub Workflows', level: 'Expert', proof: 'Brandlya-Devs repository management' },
        { name: 'OSINT Data Pipelines', level: 'Advanced', proof: 'Event & intent harvesting engines' }
      ]
    }
  ] as SkillCategory[],

  experiences: [
    {
      role: 'Lead AI / ML & Systems Engineer (Track I)',
      company: 'SearchBrite / Britesearch',
      period: '2026 — Present',
      location: 'Remote',
      summary: 'Owned Track I solo: engineered the Ideal Customer Profile (ICP) intelligence engine, event-proximity timing classifier, and LLM hyper-personalization pipeline.',
      achievements: [
        'Architected deterministic ICP filter (icpEngine.ts) with strict query shaping to prevent LLM hallucinations.',
        'Designed event proximity timing classifier calculating active outreach send windows (5-7 days before event).',
        'Built Stream A/B tiered personalization gating deep RAG LLM calls to top-tier leads, cutting API costs by 65%.',
        'Implemented evidence lineage system tracking OBSERVED, EXTRACTED, VERIFIED, INFERRED, and PREDICTED data confidence.'
      ],
      techUsed: ['Next.js 15', 'TypeScript', 'Python', 'FastAPI', 'OpenAI', 'LangChain', 'PostgreSQL']
    },
    {
      role: 'AI & Full-Stack Architect',
      company: 'Createlya Platform',
      period: '2026',
      location: 'Remote',
      summary: 'Led the development of an AI-powered slide deck generation and real-time restyling platform backed by 1,562 templates.',
      achievements: [
        'Engineered vector search index (~0.02s) querying template embeddings via text-embedding-3-small.',
        'Integrated Groq AI copywriting pipeline utilizing gpt-oss-120b and llama-3.3-70b-versatile.',
        'Authored dual-engine restyler synchronizing in-iframe JS DOM manipulators with server python-pptx AST manipulators.',
        'Integrated OnlyOffice CE Docker container with MinIO S3 object storage for collaborative editing.'
      ],
      techUsed: ['NestJS 11', 'Next.js 15', 'Groq', 'OpenRouter', 'Python', 'python-pptx', 'OnlyOffice', 'MinIO', 'MongoDB']
    },
    {
      role: 'AI & Search Infrastructure Engineer',
      company: 'Lodestar Engine Project',
      period: '2026',
      location: 'Remote',
      summary: 'Built a hybrid BM25 + Qdrant vector semantic search system evaluating open-source GitHub repository duplication.',
      achievements: [
        'Developed 24/7 resumable GitHub crawler populating MongoDB metadata and Qdrant vector embeddings.',
        'Designed score blending algorithm balancing keyword precision, semantic intent, and stargazers popularity.',
        'Exposed fast REST API serving Next.js reactive frontend with sub-100ms response times.'
      ],
      techUsed: ['Python', 'FastAPI', 'Qdrant', 'MongoDB', 'OpenAI Embeddings', 'Next.js', 'Docker']
    }
  ] as Experience[]
};
