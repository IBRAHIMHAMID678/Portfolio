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
  avatarUrl: '/avatar.jpg',
  resumePdfUrl: '/Ibrahim_Hamid_Resume.pdf',
  
  bio: 'Computer Science graduate and Software Engineer with hands-on experience building AI-powered, full-stack web applications. Skilled in Python (FastAPI), React, Next.js, Node.js, LangChain, and retrieval-augmented generation (RAG), with practical exposure to LLM integration, vector search, and REST API development. Additional strength in software QA, test case design, and Agile bug tracking with Jira across four industry internships.',

  heroStats: [
    { value: '4+', label: 'Industry Internships' },
    { value: '1.5k+', label: 'Templates Vector Searched' },
    { value: '60%', label: 'Signal Verification Rate' },
    { value: '100%', label: 'Test Case Traceability' }
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
        'LangChain orchestration layer routing user intent between direct LLM synthesis, knowledge base retrieval, and live external API execution (weather, web knowledge).',
        'Integrated local Ollama (Qwen2.5) and remote LLM endpoints for contextual query understanding and zero-shot entity extraction.',
        'Bidirectional voice interface combining Speech-to-Text (Whisper model) and low-latency Text-to-Speech synthesis.',
        'Reactive React/Next.js frontend powered by Tailwind CSS and Framer Motion micro-animations for fluid chat streaming.'
      ],
      keyOutcome: 'Delivered an end-to-end voice-enabled RAG assistant with sub-second intent classification and multi-turn conversational memory.',
      techStack: ['Python', 'FastAPI', 'React', 'Next.js', 'LangChain', 'Ollama (Qwen2.5)', 'Whisper STT', 'Tailwind CSS', 'Framer Motion'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678/AI-Agent',
      featured: true,
      metrics: [
        { label: 'LLM Orchestration', value: 'LangChain + Qwen2.5' },
        { label: 'Voice Interface', value: 'Whisper STT / TTS' },
        { label: 'Latency Profile', value: 'Streaming Sub-sec' }
      ],
      evidenceFlags: ['OBSERVED', 'EXTRACTED', 'VERIFIED'],
      systemFlow: [
        { title: '1. Audio / Text Ingestion', description: 'Transcribes audio via Whisper STT or ingests user prompt streaming into FastAPI gateway.' },
        { title: '2. Intent Recognition & RAG Routing', description: 'LangChain pipeline classifies intent, querying vector store for domain context or invoking external tools.' },
        { title: '3. LLM Response Generation', description: 'Synthesizes context-grounded response with Ollama Qwen2.5 / GPT-4o-mini.' },
        { title: '4. Streaming UI & TTS Output', description: 'Streams markdown response tokens to Next.js UI while synthesizing speech playback.' }
      ]
    },
    {
      id: 'auto-market',
      number: '02',
      title: 'Auto Market — AI-Powered Online Vehicle Marketplace',
      tagline: 'Full-stack vehicle commerce platform with Whisper voice navigation & AI multi-model inquiry assistant',
      category: 'Full-Stack Platforms',
      summary: 'Engineered an end-to-end online vehicle marketplace pairing a high-performance React frontend with a MongoDB-backed Node.js API, elevated by an intelligent voice-driven vehicle matching assistant.',
      problem: 'Car buyers face tedious multi-field search forms, complex technical spec comparisons, and static text searches that cannot answer conversational buyer questions.',
      architectureDetails: [
        'Dynamic React vehicle discovery catalog with parametric filtering (make, model, price bracket, mileage, fuel type) and responsive cards.',
        'Custom conversational AI assistant utilizing OpenAI Whisper Speech-to-Text, enabling users to speak natural queries (e.g. "Find me fuel-efficient SUVs under $25k").',
        'Node.js & Express RESTful backend architecture with MongoDB aggregation pipelines for instant search indexing.',
        'Third-party automotive API integrations streamlining vehicle specification lookups and dealer inventory feeds.'
      ],
      keyOutcome: 'Enabled voice-first vehicle discovery and automated buyer inquiries, drastically reducing search friction for prospective buyers.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Whisper STT', 'OpenAI APIs', 'Tailwind CSS', 'REST APIs'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678/AI-Powered-Vehical-Market-Place',
      featured: true,
      metrics: [
        { label: 'Voice AI Search', value: 'Whisper Powered' },
        { label: 'Backend Latency', value: '< 80ms Queries' },
        { label: 'Architecture', value: 'Full-Stack MERN' }
      ],
      systemFlow: [
        { title: '1. User Voice / Query Input', description: 'Buyer dictates requirements or enters search parameters in the reactive React UI.' },
        { title: '2. Whisper Speech Processing', description: 'Extracts buyer criteria (budget, body type, fuel) via Whisper STT model.' },
        { title: '3. MongoDB Aggregation Search', description: 'Executes parametric queries against vehicle listings database with index optimization.' },
        { title: '4. AI Recommendation Delivery', description: 'Returns matched inventory with conversational explanations and direct seller contact.' }
      ]
    },
    {
      id: 'task-manager',
      number: '03',
      title: 'Team Task & Workflow Management System',
      tagline: 'Enterprise team task organizer with role-based access, sprint boards & real-time activity tracking',
      category: 'Full-Stack Platforms',
      summary: 'Architected and built a full-stack collaborative project management platform enabling software teams to track sprints, organize kanban boards, assign tickets, and audit project deliverables.',
      problem: 'Distributed engineering teams need lightweight, responsive task coordination without the bloated complexity and high licensing overhead of heavy enterprise tools.',
      architectureDetails: [
        'Role-Based Access Control (RBAC) separating project administrators, team leads, and developers with secure JWT authentication.',
        'Interactive board UI featuring drag-and-drop status transitions (To Do, In Progress, Review, Completed) and priority tagging.',
        'RESTful API architecture handling task CRUD, subtask hierarchies, deadline alerts, and team member assignments.',
        'MongoDB data layer with normalized relational references for projects, workspaces, and audit logs.'
      ],
      keyOutcome: 'Delivered a clean, high-velocity project tracking platform supporting multi-user workspaces and real-time status visibility.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'REST APIs', 'Tailwind CSS'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678/Team-Task-Manager-web-application',
      featured: true,
      metrics: [
        { label: 'Access Security', value: 'Role-Based RBAC' },
        { label: 'Workflow Views', value: 'Kanban & List' },
        { label: 'Database Schema', value: 'MongoDB Normalized' }
      ],
      systemFlow: [
        { title: '1. Authentication & Workspace Loading', description: 'Validates JWT session and retrieves tenant workspace permissions.' },
        { title: '2. Board State Management', description: 'Loads sprint tasks into responsive columns with visual status badges.' },
        { title: '3. Task Lifecycle Transitions', description: 'Dispatches status updates, reassignments, and priority adjustments via REST endpoints.' },
        { title: '4. Activity Audit Logging', description: 'Records timestamped changes for sprint accountability and team transparency.' }
      ]
    },
    {
      id: 'ai-presentation-platform',
      number: '04',
      title: 'Enterprise AI Presentation & Slide Engine',
      tagline: 'Vector-searched slide template generator with LLM copywriting & dual-engine PPTX restyler',
      category: 'Enterprise Case Studies',
      summary: 'Contributed to an AI-powered presentation generation platform at a creative & AI agency, building and testing features across a Next.js frontend and NestJS backend with programmatic PPTX compilation.',
      problem: 'AI slide builders usually output static PDFs or flat images that corporate design teams cannot customize or format according to strict brand guidelines.',
      architectureDetails: [
        'Vector retrieval search engine (~0.02s latency) querying 1,562 slide templates via embeddings and MongoDB Atlas Vector Search.',
        'Groq LLM text generation pipeline utilizing gpt-oss-120b and llama-3.3-70b-versatile for structured JSON slide copywriting.',
        'Dual-engine structural restyler synchronizing in-iframe DOM/SVG manipulators with server-side python-pptx AST rewriters.',
        'OnlyOffice CE Docker integration with MinIO S3 object storage for real-time collaborative slide deck manipulation.'
      ],
      keyOutcome: 'Enabled programmatic generation and live restyling of PowerPoint decks across 1,562 template layouts with sub-second iframe updates.',
      techStack: ['Next.js 15', 'NestJS', 'Python (python-pptx)', 'MongoDB Atlas Vector Search', 'Groq AI', 'OnlyOffice Docker', 'MinIO S3'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678',
      isEnterprise: true,
      ndaNotice: 'Enterprise Client Project (Confidential / NDA). Proprietary company project; architecture and technical achievements showcased for engineering review.',
      featured: true,
      metrics: [
        { label: 'Template Library', value: '1,562 Decks' },
        { label: 'Vector Retrieval', value: '~0.02 sec' },
        { label: 'In-Iframe Restyle', value: '~400 ms' }
      ],
      systemFlow: [
        { title: '1. User Prompt & Vector Search', description: 'Performs cosine similarity search across 1,562 slide embeddings via Atlas Vector Search.' },
        { title: '2. LLM AI Copywriting', description: 'Streams structured JSON slide outlines using high-throughput model inference.' },
        { title: '3. python-pptx AST Assembly', description: 'Compiles layout shapes, typography, and content into valid .pptx file structures.' },
        { title: '4. Live In-Iframe Sync', description: 'Synchronizes live visual recoloring in OnlyOffice canvas with backend document state.' }
      ]
    },
    {
      id: 'b2b-intent-engine',
      number: '05',
      title: 'Enterprise B2B Intent & Sales Intelligence Engine',
      tagline: 'Real-time sales intelligence & intent engine with event proximity and evidence lineage tagging',
      category: 'Enterprise Case Studies',
      summary: 'Architected and built Track I of an enterprise sales intelligence platform: an ICP qualification engine, event-proximity timing classifier, and tiered RAG/LLM hyper-personalization pipeline.',
      problem: 'Generic sales outreach pipelines spam thousands of contacts blindly without event context or timing, causing spam penalties and runaway LLM API token bills.',
      architectureDetails: [
        'Deterministic ICP engine using code-controlled query shapes rather than hallucination-prone unconstrained LLM prompts.',
        'Layered timing classifier: Queue (>15d), Active Send Window (5-7d before event), and Late Suppression (<2d).',
        'Tiered personalization split (Stream A/B) reserving hyper-personalization for top-tier leads to slash token costs by 65%.',
        'Evidence lineage tagging (OBSERVED, EXTRACTED, VERIFIED, INFERRED, PREDICTED) guaranteeing transparent scoring.'
      ],
      keyOutcome: 'Delivered an end-to-end pipeline processing 8,000 profile batches down to ~3,600 verified sendable emails with 60% signal lookup rates.',
      techStack: ['Next.js 15', 'TypeScript', 'Python', 'FastAPI', 'OpenAI GPT-4', 'LangChain', 'PostgreSQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/IBRAHIMHAMID678',
      isEnterprise: true,
      ndaNotice: 'Enterprise Client Project (Confidential / NDA). Proprietary company project; architecture and algorithms documented for technical review.',
      featured: true,
      metrics: [
        { label: 'Signal Lookup Rate', value: '~60%' },
        { label: 'Batch Processing', value: '8,000 Profiles' },
        { label: 'Cost Optimization', value: '-65% LLM Tokens' }
      ],
      evidenceFlags: ['OBSERVED', 'EXTRACTED', 'VERIFIED', 'INFERRED', 'PREDICTED'],
      systemFlow: [
        { title: '1. Signal & Intent Ingestion', description: 'Consumes speaker, funding, and hiring trigger events via OSINT adapters.' },
        { title: '2. Deterministic ICP Filter', description: 'Filters candidates against strict buyer schemas without unconstrained LLM execution.' },
        { title: '3. Event-Proximity Classifier', description: 'Calculates days-until-event and classifies leads into 5-7d active outreach windows.' },
        { title: '4. Tiered Stream A/B RAG', description: 'Routes high-value leads to deep LLM personalization while standardizing high-volume leads.' }
      ]
    },
  ] as Project[],

  skillCategories: [
    {
      title: 'AI, LLMs & Retrieval Systems',
      description: 'Building intelligent production capabilities with modern foundation models, RAG, and vector indexes.',
      iconName: 'Cpu',
      skills: [
        { name: 'LangChain & Agent Orchestration', level: 'Expert', proof: 'Chatbot Agent RAG pipeline' },
        { name: 'RAG & Vector Embeddings', level: 'Advanced', proof: 'Atlas Vector Search & Qdrant' },
        { name: 'LLMs (GPT-4o-mini, Qwen2.5, Ollama)', level: 'Expert', proof: 'Local & Cloud model orchestration' },
        { name: 'Speech AI (Whisper STT / TTS)', level: 'Advanced', proof: 'Voice interfaces in Auto Market & Agent' },
        { name: 'Prompt Engineering & JSON Schemas', level: 'Expert', proof: 'Structured output validation pipelines' }
      ]
    },
    {
      title: 'Full-Stack & Backend Systems',
      description: 'Designing resilient API backends, data structures, and microservices.',
      iconName: 'Server',
      skills: [
        { name: 'Python (FastAPI, Flask, PyTest)', level: 'Expert', proof: 'Chatbot Agent & enterprise service backends' },
        { name: 'Node.js & Express / NestJS', level: 'Advanced', proof: 'Auto Market & presentation engine services' },
        { name: 'Java (Enterprise Systems)', level: 'Advanced', proof: 'Medical Slip Automation System' },
        { name: 'MongoDB & Atlas Vector Search', level: 'Expert', proof: 'Auto Market & template embeddings' },
        { name: 'REST API Design & Integration', level: 'Expert', proof: 'Clean RESTful contracts & Postman tests' }
      ]
    },
    {
      title: 'Frontend Engineering & UI Systems',
      description: 'Crafting responsive, high-performance web applications with modern styling and animations.',
      iconName: 'Layout',
      skills: [
        { name: 'React & Next.js', level: 'Expert', proof: 'Dynamic frontends across personal & client apps' },
        { name: 'Tailwind CSS & Framer Motion', level: 'Expert', proof: 'Fluid micro-interactions & dark mode design' },
        { name: 'TypeScript & JavaScript (ES6+)', level: 'Advanced', proof: 'Strict typing and component state trees' },
        { name: 'HTML5 Canvas & 2D Animations', level: 'Advanced', proof: 'Interactive background physics engine' },
        { name: 'Responsive & Cross-Browser UI', level: 'Expert', proof: 'Tested across mobile, tablet, and desktop' }
      ]
    },
    {
      title: 'QA, Testing & DevOps Practices',
      description: 'Ensuring production stability with comprehensive test cases, defect tracking, and CI/CD.',
      iconName: 'ShieldCheck',
      skills: [
        { name: 'Manual & Functional Testing', level: 'Expert', proof: 'Mobile banking app & agency QA' },
        { name: 'Test Case Design & Requirements Matrix', level: 'Expert', proof: 'End-to-end user story verification' },
        { name: 'Jira Defect Lifecycle & Agile', level: 'Expert', proof: 'Logged & closed defects across 4 internships' },
        { name: 'Git & GitHub Version Control', level: 'Expert', proof: 'Branching, PRs, and collaborative releases' },
        { name: 'Docker & Environment Containers', level: 'Intermediate', proof: 'Containerized services & MinIO / OnlyOffice' }
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
      summary: 'Contributing to an enterprise AI-powered presentation platform, building and testing features across a Next.js frontend and NestJS backend.',
      achievements: [
        'Programmatically generating, editing, and validating PowerPoint (.pptx) decks using python-pptx from structured LLM outputs and brand templates.',
        'Supporting integration of LLM-driven slide generation and semantic retrieval over a 1,562 template library using vector embeddings and MongoDB Atlas Vector Search.',
        'Writing test cases, reproducing edge-case defects, and verifying production releases against client specifications prior to deployment.'
      ],
      techUsed: ['Next.js', 'NestJS', 'Python (python-pptx)', 'MongoDB Atlas Vector Search', 'OnlyOffice', 'Groq AI']
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
      summary: 'Built an enterprise Medical Slip Automation System using Java, HTML, and CSS, replacing a manual paper workflow and streamlining internal documentation.',
      achievements: [
        'Replaced manual paper vouchers with an end-to-end digital approval system for employee healthcare requisitions.',
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
      period: '2022 — 2026 (Graduated)',
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
