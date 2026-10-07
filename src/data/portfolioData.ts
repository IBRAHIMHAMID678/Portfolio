export interface ProjectScreenshot {
  url: string;
  title: string;
  caption: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: 'AI & Autonomous Agents' | 'Full-Stack Platforms' | 'Enterprise Case Studies' | 'System Automation';
  summary: string;
  problem: string;
  architectureDetails: string[];
  keyOutcome: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  isEnterprise?: boolean;
  ndaNotice?: string;
  featured: boolean;
  has3DAnimation?: boolean;
  metrics: { label: string; value: string }[];
  evidenceFlags?: string[];
  screenshots?: ProjectScreenshot[];
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
  type: string;
  summary: string;
  achievements: string[];
  techUsed: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  platform: string;
}

export const IBRAHIM_DATA = {
  name: 'Ibrahim Hamid',
  role: 'Software Engineer | AI & Full-Stack Development',
  headline: 'Building AI-Powered Systems, Production Full-Stack Platforms & RAG Architectures',
  location: 'Islamabad, Pakistan',
  phone: '+92 318 0584128',
  email: 'ibrahimhamid.2600@gmail.com',
  githubUsername: 'IBRAHIMHAMID678',
  githubUrl: 'https://github.com/IBRAHIMHAMID678',
  linkedinUrl: 'https://www.linkedin.com/in/ibrahim-hamid678',
  avatarUrl: `${import.meta.env.BASE_URL}avatar.jpg`,
  resumePdfUrl: `${import.meta.env.BASE_URL}Ibrahim_Hamid_Resume.pdf`,
  
  bio: 'AI Full Stack Developer with hands-on experience building AI-powered, production web applications, autonomous agent workflows, and deterministic security harnesses. Skilled in Python (FastAPI), React, Next.js, LangChain, Three.js WebGL, and retrieval-augmented generation (RAG), with practical expertise in LLM-as-a-judge evaluations, multi-source scraping pipelines, vector search, and AST-level guardrails.',

  heroStats: [
    { value: '4', label: 'Production Architectures' },
    { value: '10+', label: 'Job Platforms Harvested' },
    { value: '21/21', label: 'Guardrail Engine Invariants' },
    { value: '100%', label: 'Forensic Eval Precision' }
  ],

  projects: [
    {
      id: 'chatbot-agent',
      number: '01',
      title: 'Chatbot-Agent — AI Conversational Assistant & Voice RAG',
      tagline: 'Multi-turn autonomous conversational agent with Ollama Qwen2.5, LangChain RAG & Whisper voice I/O',
      category: 'AI & Autonomous Agents',
      summary: 'Designed and implemented an intelligent full-stack AI agent capable of multi-turn contextual conversations, intent recognition, dynamic retrieval-augmented generation (RAG), and real-time voice interaction.',
      problem: 'Generic chatbots suffer from context drift across multi-turn dialogues, fail to ground answers in localized knowledge bases, and lack seamless hands-free speech interactions.',
      architectureDetails: [
        'LangChain orchestration layer routing user intent between direct LLM synthesis, knowledge base retrieval, and live external API execution.',
        'Integrated local Ollama (Qwen2.5) and remote LLM endpoints for contextual query understanding and zero-shot entity extraction.',
        'Bidirectional voice interface combining Speech-to-Text (Whisper model) and low-latency Text-to-Speech synthesis.',
        'Reactive React/Next.js frontend powered by Tailwind CSS and Framer Motion micro-animations for fluid chat streaming.'
      ],
      keyOutcome: 'Delivered an end-to-end voice-enabled RAG assistant with sub-second intent classification and multi-turn conversational memory.',
      techStack: ['Python', 'FastAPI', 'React', 'Next.js', 'LangChain', 'Ollama (Qwen2.5)', 'Whisper STT', 'Tailwind CSS'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678/AI-Agent',
      featured: true,
      metrics: [
        { label: 'LLM Orchestration', value: 'LangChain + Qwen2.5' },
        { label: 'Voice Interface', value: 'Whisper STT / TTS' },
        { label: 'Latency Profile', value: 'Streaming Sub-sec' }
      ],
      evidenceFlags: ['OBSERVED', 'EXTRACTED', 'VERIFIED'],
      screenshots: [
        {
          url: `${import.meta.env.BASE_URL}screenshots/chatbot-agent-ui.png`,
          title: 'Voice & RAG Conversation Console',
          caption: 'Interactive multi-turn chat session with Ollama Qwen2.5, LangChain RAG vector source citations, and real-time Whisper speech waveform meter.'
        }
      ],
      systemFlow: [
        { title: '1. Audio / Text Ingestion', description: 'Transcribes audio via Whisper STT or ingests user prompt streaming into FastAPI gateway.' },
        { title: '2. Intent Recognition & RAG Routing', description: 'LangChain pipeline classifies intent, querying vector store for domain context or invoking external tools.' },
        { title: '3. LLM Response Generation', description: 'Synthesizes context-grounded response with Ollama Qwen2.5 / GPT-4o-mini.' },
        { title: '4. Streaming UI & TTS Output', description: 'Streams markdown response tokens to Next.js UI while synthesizing speech playback.' }
      ]
    },
    {
      id: 'ai-job-scraper',
      number: '02',
      title: 'AI Job Hunter & Autonomous Auto-Apply Orchestrator',
      tagline: 'Multi-source job scraper, Groq AI evaluation engine, and automated Lever/Greenhouse application agent',
      category: 'AI & Autonomous Agents',
      summary: 'Engineered a high-throughput multi-source job harvesting pipeline (LinkedIn, Indeed, Himalayas, RemoteOK, JobSpy) pairing a FastAPI backend with real-time SSE telemetry, local Mongo/in-memory cache, Groq-powered fit scoring, and automated Playwright headless application workflows.',
      problem: 'Manual job hunting across 10+ fragmented portals is tedious, rate-limited, and filled with location/visa mismatches that waste hundreds of engineering hours.',
      architectureDetails: [
        'Multi-platform scraper engine harvesting across 10 sources: JobSpy (LinkedIn, Indeed, Glassdoor, ZipRecruiter), Himalayas API, Remotive API, Remote OK API, WeWorkRemotely RSS, and Python.org.',
        'Smart local evaluator scoring postings against candidate tech stacks (Python, FastAPI, React, Next.js, LangChain, RAG) with location & visa restriction filters.',
        'Auto-approval decision gate: auto-qualifies jobs scoring >= 60%, flags borderline cases for manual review, and routes qualified leads to application queues.',
        'Automated application engine using Playwright to inspect, auto-fill, and submit candidate profiles across Lever and Greenhouse ATS forms.',
        'Real-time executive control center with EventSource (SSE) streaming live logs, pipeline status trackers, and CSV/DOCX report exports.'
      ],
      keyOutcome: 'Harvests hundreds of listings across 10 job platforms within seconds, evaluates matches using Groq (<300ms), and eliminates manual submission overhead.',
      techStack: ['Python', 'FastAPI', 'Playwright', 'Groq AI', 'MongoDB', 'JobSpy', 'EventSource (SSE)', 'Three.js 3D', 'Docker'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678/AI-JOB-SCRAPER',
      featured: true,
      has3DAnimation: true,
      metrics: [
        { label: 'Scraper Sources', value: '10 Platforms' },
        { label: 'Evaluator Speed', value: '< 300ms / Job' },
        { label: 'Auto-Approval Gate', value: '≥ 60% Match' }
      ],
      evidenceFlags: ['OBSERVED', 'EXTRACTED', 'VERIFIED'],
      screenshots: [
        {
          url: `${import.meta.env.BASE_URL}screenshots/job-scraper-dashboard.png`,
          title: 'Pipeline Control Center & Telemetry',
          caption: 'Live executive dashboard with active platform status, candidate verifier gates, and export actions.'
        },
        {
          url: `${import.meta.env.BASE_URL}screenshots/job-scraper-lever-form.png`,
          title: 'Automated Lever Form Injection',
          caption: 'Headless browser automatically detecting and populating custom ATS form fields.'
        },
        {
          url: `${import.meta.env.BASE_URL}screenshots/job-scraper-applied.png`,
          title: 'Application Dispatch Confirmation',
          caption: 'Verified submission receipt and audit logging after end-to-end auto-apply execution.'
        },
        {
          url: `${import.meta.env.BASE_URL}screenshots/job-scraper-canonical.png`,
          title: 'Canonical Candidate Application State',
          caption: 'Post-submission audit snapshot confirming zero dropped fields.'
        }
      ],
      systemFlow: [
        { title: '1. Multi-Source Ingestion', description: 'Concurrent scraper workers pull live listings from LinkedIn, Indeed, Himalayas, RemoteOK, and RSS feeds.' },
        { title: '2. Smart AI Evaluator & Filtering', description: 'Evaluates descriptions against candidate tech stack, stripping location-restricted roles and scoring relevance.' },
        { title: '3. Auto-Approval Gate & Queue', description: 'Roles scoring >= 60% are auto-approved and queued; borderline listings are marked for review.' },
        { title: '4. Automated ATS Application Engine', description: 'Playwright automation navigates to Lever/Greenhouse forms, maps resume fields, and executes submissions.' }
      ]
    },
    {
      id: 'eval-agent',
      number: '03',
      title: 'Eval-Agent — LLM-as-a-Judge Forensic Evaluation Harness',
      tagline: 'Forensic evaluation harness scoring agent outputs on faithfulness, relevance & hallucination detection',
      category: 'AI & Autonomous Agents',
      summary: 'Built an LLM-as-a-judge evaluation harness that grades AI agent and RAG responses against source documents, decomposing outputs into atomic claims, quoting unsupported spans, and performing pairwise A/B arbitration.',
      problem: 'Generative AI chatbots frequently introduce subtle hallucinations, misquoted numbers, and unsupported claims that traditional regex or unit tests fail to detect.',
      architectureDetails: [
        'Two-phase forensic judge agent (Groq LLaMA-3.1): extracts atomic claims from model outputs, then verifies each claim individually against source documents as SUPPORTED, CONTRADICTED, or UNSUPPORTED.',
        'Multi-metric evaluation engine scoring Faithfulness, Relevance, and Hallucination (inverse) on 1-5 scales, deriving PASS / BORDERLINE / FAIL verdicts.',
        'Pairwise A/B comparison engine pitting two candidate agent answers head-to-head and selecting the winner with grounding rationale.',
        'Curated benchmark test set (20 test cases across RAG faithfulness, instruction following, and adversarial hallucination traps).',
        'Forensic examination bench UI styled with rubber-stamp verdicts, instrument meters, red-marker span highlights, and typewriter notes.'
      ],
      keyOutcome: 'Catches 100% of adversarial hallucination traps with sub-second Groq inference and provides claim-by-claim forensic audit trails.',
      techStack: ['Python', 'FastAPI', 'Groq AI', 'LLaMA-3.1', 'Pydantic', 'Uvicorn', 'Adversarial Benchmarks'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678/eval-agent',
      featured: true,
      metrics: [
        { label: 'Grading Latency', value: '< 900ms' },
        { label: 'Benchmark Suite', value: '20 Test Cases' },
        { label: 'Evaluation Model', value: 'LLM-as-a-Judge' }
      ],
      evidenceFlags: ['OBSERVED', 'EXTRACTED', 'VERIFIED'],
      screenshots: [
        {
          url: `${import.meta.env.BASE_URL}screenshots/dashboard.png`,
          title: 'Forensic Examination Bench',
          caption: 'Rubber-stamp FAIL verdict, instrument meters, claim-by-claim ledger, and red-marker unsupported span highlights.'
        },
        {
          url: `${import.meta.env.BASE_URL}screenshots/compare.png`,
          title: 'Pairwise A/B Answer Arbitration',
          caption: 'Head-to-head model comparison identifying better-grounded answers with decisive evidence.'
        },
        {
          url: `${import.meta.env.BASE_URL}screenshots/gallery.png`,
          title: 'Adversarial Trap Gallery',
          caption: 'Catalog of 6 adversarial hallucination traps testing model vulnerability to edge cases.'
        },
        {
          url: `${import.meta.env.BASE_URL}screenshots/all_views.png`,
          title: 'Full System Architecture Overview',
          caption: 'Complete dashboard overview across judge, compare, and adversarial evaluation modes.'
        }
      ],
      systemFlow: [
        { title: '1. Claim Decomposition', description: 'Deconstructs candidate response into atomic factual statements, isolating assertions for verification.' },
        { title: '2. Source Entailment Verification', description: 'Audits each atomic claim against ingested source documents, labeling Supported, Contradicted, or Unsupported.' },
        { title: '3. Multi-Metric Scoring Engine', description: 'Calculates Faithfulness, Relevance, and Hallucination scores (1-5) and applies strict PASS/FAIL thresholds.' },
        { title: '4. Forensic Audit & Span Quoting', description: 'Highlights exact unsupported text spans in red and outputs structured JSON audit reports.' }
      ]
    },
    {
      id: 'guardrail-lab',
      number: '04',
      title: 'Guardrail Lab — Adversarial AI Coding Agent Permission Firewall',
      tagline: 'Deterministic POSIX AST defense interceptor & 3D WebGL physical security pipeline simulator',
      category: 'System Automation',
      summary: 'A client-side adversarial test harness and interactive 3D WebGL physical simulator exposing the critical flaw in AI coding agent guardrails (Claude Code, Cursor, Copilot, Aider): naive regex blocklists that miss over 70% of POSIX shell evasion vectors.',
      problem: 'Security engineers configure agent shell permissions with simple regexes (e.g. "git commit" or "rm -rf"), which catastrophically fail against flag interleaving, subshells, quotes, and process wrappers.',
      architectureDetails: [
        'Deterministic POSIX shell AST tokenizer (zero dependencies) correctly parsing quotes, subshell nesting $(...), compound pipelines (&&, ||, ;, |), and binary wrapper prefixes (env, sudo, time).',
        'Interactive 3D WebGL physical defense interceptor built with Three.js studio lighting: simulates command projectiles fired from Agent Terminal, striking quantum shields or breaching server cores.',
        '6 OWASP agent threat domain policies (Git Commits, Remote Scripts, Filesystem Wipes, Exfiltration, Reverse Shells, Sudo Escalation) mapped to 49 curated adversarial evasion vectors.',
        'Automated engine invariant self-test suite (test-engine.js) verifying 21/21 core engine invariants with 100% pass rate.',
        'One-click export generators producing production-ready configs for Claude Code, Cursor IDE (.cursorrules), AgentSH (agentsh.yaml), POSIX Bash hooks, and Docker/Seccomp.'
      ],
      keyOutcome: 'Replaces porous regex filters with a 100% deterministic AST parser, intercepting 100% of the 49 evasion vectors with zero external runtime dependencies.',
      techStack: ['JavaScript (ES6)', 'Three.js (WebGL)', 'POSIX AST Tokenizer', 'HTML5/CSS3', 'OWASP Agent Standards'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678/GUARDRAIL',
      featured: true,
      metrics: [
        { label: 'Engine Invariants', value: '21 / 21 Passing' },
        { label: 'Threat Vectors', value: '49 Curated Cases' },
        { label: 'Runtime Deps', value: 'Zero (Pure ES6)' }
      ],
      evidenceFlags: ['OBSERVED', 'EXTRACTED', 'VERIFIED'],
      screenshots: [
        {
          url: `${import.meta.env.BASE_URL}screenshots/guardrail_lab_3d_studio.png`,
          title: '3D Physical Security Air-Gap Interceptor',
          caption: 'Interactive 3D WebGL quantum shield intercepting agent command projectiles with real-time deflection sparks.'
        },
        {
          url: `${import.meta.env.BASE_URL}screenshots/app-flightdeck.png`,
          title: 'Security Flightdeck & AST Inspector',
          caption: 'Live command tokenizer, vector attack chips, and Naive Regex vs Hardened AST comparison.'
        },
        {
          url: `${import.meta.env.BASE_URL}screenshots/app-scoreboard.png`,
          title: 'Adversarial Threat Matrix & Scoreboard',
          caption: 'Full benchmark results across 6 OWASP security policies showing 100% intercept rates.'
        },
        {
          url: `${import.meta.env.BASE_URL}screenshots/guardrail_lab_attack_matrix.png`,
          title: 'Evasion Vector Analysis Matrix',
          caption: 'Detailed breakdown of evasion techniques: flag insertion, subshells, quotes, and compound pipelines.'
        }
      ],
      systemFlow: [
        { title: '1. Lexical Tokenization & AST Parsing', description: 'Deconstructs command strings preserving quotes, subshell nesting $(...), pipelines, and compound chains.' },
        { title: '2. Canonical Executable & Flag Normalization', description: 'Strips wrappers (env, sudo), extracts canonical binaries, decomposes flags (-rf -> -r, -f), and isolates subcommands.' },
        { title: '3. Dual Security Matcher Evaluation', description: 'Simultaneously evaluates input against industry Naive Regex and Hardened AST policies to expose evasion gaps.' },
        { title: '4. 3D Physical Deflection / Breach Simulation', description: 'Dispatches 3D WebGL projectile in real-time, showing emerald ricochet on interception or crimson alarm on breach.' }
      ]
    }
  ] as Project[],

  skillCategories: [
    {
      title: 'AI, LLMs & Retrieval Systems',
      description: 'Building intelligent production capabilities with modern foundation models, RAG, and vector indexes.',
      iconName: 'Cpu',
      skills: [
        { name: 'LangChain & Agent Orchestration', level: 'Expert', proof: 'Chatbot Agent RAG pipeline' },
        { name: 'LLM-as-a-Judge & Eval Harnesses', level: 'Expert', proof: 'Eval-Agent forensic benchmark suite' },
        { name: 'LLMs (GPT-4o-mini, Qwen2.5, LLaMA-3.1, Groq)', level: 'Expert', proof: 'Local & Cloud model orchestration' },
        { name: 'Speech AI (Whisper STT / TTS)', level: 'Advanced', proof: 'Voice interfaces in Chatbot Agent' },
        { name: 'Prompt Engineering & JSON Schemas', level: 'Expert', proof: 'Structured output validation pipelines' }
      ]
    },
    {
      title: 'Full-Stack & Backend Systems',
      description: 'Designing resilient API backends, automated scrapers, and microservices.',
      iconName: 'Server',
      skills: [
        { name: 'Python (FastAPI, Flask, PyTest)', level: 'Expert', proof: 'Chatbot Agent & AI Job Hunter backends' },
        { name: 'Automated Scraping & Playwright', level: 'Expert', proof: 'Multi-source job harvester & ATS auto-apply' },
        { name: 'JavaScript & Three.js (WebGL 3D)', level: 'Advanced', proof: 'Guardrail Lab & 3D Radar engines' },
        { name: 'MongoDB & In-Memory Caching', level: 'Expert', proof: 'Job scraping persistence & eval caches' },
        { name: 'REST API Design & SSE Telemetry', level: 'Expert', proof: 'EventSource streaming & Postman suites' }
      ]
    },
    {
      title: 'Frontend Engineering & UI Systems',
      description: 'Crafting responsive, high-performance web applications with modern styling and 3D WebGL.',
      iconName: 'Layout',
      skills: [
        { name: 'React & Next.js', level: 'Expert', proof: 'Dynamic frontends across personal & production apps' },
        { name: 'Tailwind CSS & Framer Motion', level: 'Expert', proof: 'Fluid micro-interactions & dark mode design' },
        { name: 'TypeScript & JavaScript (ES6+)', level: 'Advanced', proof: 'Strict typing and component state trees' },
        { name: 'Three.js & HTML5 Canvas', level: 'Advanced', proof: '3D defense air-gap and interactive radar' },
        { name: 'Responsive & Cross-Browser UI', level: 'Expert', proof: 'Tested across mobile, tablet, and desktop' }
      ]
    },
    {
      title: 'QA, Security & DevOps Practices',
      description: 'Ensuring production stability with deterministic guardrails, comprehensive test cases, and CI/CD.',
      iconName: 'ShieldCheck',
      skills: [
        { name: 'POSIX Shell AST Security & Guardrails', level: 'Expert', proof: 'Guardrail Lab 21/21 passing invariants' },
        { name: 'Manual & Functional Testing', level: 'Expert', proof: 'Banking app QA & agency release verification' },
        { name: 'Test Case Design & Requirements Matrix', level: 'Expert', proof: 'End-to-end user story verification' },
        { name: 'Jira Defect Lifecycle & Agile', level: 'Expert', proof: 'Logged & closed defects across engineering roles' },
        { name: 'Git & GitHub Version Control', level: 'Expert', proof: 'Branching, PRs, and collaborative releases' }
      ]
    }
  ] as SkillCategory[],

  experiences: [
    {
      role: 'AI Engineer',
      company: 'Creative & AI Product Agency',
      period: 'July 2026 — Present',
      location: 'Islamabad, Pakistan',
      type: 'AI Product Agency',
      summary: 'AI Engineer building enterprise AI systems, high-throughput automated scraping pipelines, and LLM-as-a-judge evaluation harnesses for robust production deployments.',
      achievements: [
        'Engineered high-throughput web scraping pipelines with bot-mitigation bypass (headless browsers, TLS fingerprinting, residential proxies) to harvest opportunities at scale.',
        'Built automated qualification and scoring engines — multi-source extraction, LLM fit evaluation, deduplication, and automated application dispatch.',
        'Developed deterministic guardrail and evaluation pipelines validating model outputs against strict ground-truth schemas and AST rules.',
        'Implemented vector search retrieval architectures and semantic indexing for high-speed document search.',
        'Wrote end-to-end test cases and verified production releases against stringent reliability benchmarks.'
      ],
      techUsed: ['FastAPI', 'Python', 'Three.js', 'Playwright', 'Groq AI', 'LangChain', 'MongoDB', 'Docker', 'Web Scraping']
    },
    {
      role: 'AI Intern',
      company: 'NOVOTECH Solutions',
      period: 'July 2025 — August 2025',
      location: 'Islamabad, Pakistan',
      type: 'Software Development & AI Services',
      summary: 'Developed an intelligent chatbot agent using FastAPI, React (Next.js), Tailwind CSS, and LangChain, delivering multi-turn conversational support.',
      achievements: [
        'Conducted functional and integration testing of core agent components, validating retrieval pipelines and external API handlers against user stories before deployment.',
        'Executed performance and usability testing on the chatbot UI/UX, analyzing response latency and confirming cross-browser compatibility.',
        'Implemented speech-to-text and intent parsing to handle real-time customer support inquiries.'
      ],
      techUsed: ['FastAPI', 'React', 'Next.js', 'LangChain', 'Tailwind CSS', 'REST APIs', 'Postman']
    },
    {
      role: 'Software Engineering Intern',
      company: 'National Telecommunication Corporation (NTC)',
      period: 'March 2024 — May 2024',
      location: 'Islamabad, Pakistan',
      type: 'National Telecom Infrastructure',
      summary: 'Built an enterprise internal workflow automation portal using Java, HTML, and CSS, replacing manual paper requisitions and digitizing inter-departmental approval workflows.',
      achievements: [
        'Replaced manual paper vouchers with an end-to-end digital approval system for employee departmental requisitions.',
        'Gained practical operational exposure in the Network Operations Center (NOC), monitoring live infrastructure.',
        'Collaborated with senior engineers to enforce enterprise data integrity and security standards.'
      ],
      techUsed: ['Java', 'HTML5', 'CSS3', 'SQL', 'Enterprise Workflows', 'NOC Operations']
    },
    {
      role: 'Quality Assurance Intern',
      company: 'Mobilink Microfinance Bank Ltd',
      period: 'June 2023 — August 2023',
      location: 'Islamabad, Pakistan',
      type: 'Banking & Financial Technology',
      summary: 'Performed manual testing and test case design on the Mobilink mobile banking app, verifying feature correctness and user experience across platforms.',
      achievements: [
        'Tracked defects end-to-end in Jira from creation to closure, linking test results back to requirements to confirm full test coverage.',
        'Executed regression and cross-device testing across iOS and Android builds, ensuring transaction flows remained flawless.',
        'Coordinated closely with engineering leads to improve QA-development synchronization and shorten release turnarounds.'
      ],
      techUsed: ['Manual Testing', 'Test Case Design', 'Jira', 'Mobile QA', 'Regression Testing', 'Agile']
    }
  ] as Experience[],

  education: [
    {
      degree: 'Bachelor of Science in Computer Science (BSCS)',
      institution: 'Capital University of Science and Technology (CUST)',
      period: '2022 — 2026',
      location: 'Islamabad, Pakistan',
      details: 'Core focus in Artificial Intelligence, Software Engineering, Algorithms, Database Systems, Web Architectures, and Quality Assurance methodologies.'
    }
  ] as EducationItem[],

  certifications: [
    {
      title: 'Google IT Support Professional Certificate',
      issuer: 'Google',
      platform: 'Coursera'
    },
    {
      title: 'AI For Everyone',
      issuer: 'DeepLearning.AI',
      platform: 'Coursera'
    },
    {
      title: 'Android App Components & Architecture',
      issuer: 'Coursera',
      platform: 'Coursera'
    },
    {
      title: 'iOS App Development Fundamentals',
      issuer: 'Coursera',
      platform: 'Coursera'
    }
  ] as CertificationItem[],

  volunteer: {
    role: 'Volunteer Teacher',
    organization: 'Education Health and Development Foundation',
    period: 'February 2025',
    description: 'Taught English, Mathematics, and General Knowledge to primary school students from underprivileged backgrounds and mentored them to build learning motivation.'
  }
};
