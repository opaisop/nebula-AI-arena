/**
 * models-data.js
 * 
 * Nuanced, ecosystem-aware database containing technical specs, pricing,
 * strengths, limitations, trend indicators, benchmark references, and multidimensional
 * ratings for OpenAI, Anthropic, Google, DeepSeek, xAI, and Meta models.
 * 
 * Last updated: June 2026.
 */

const AI_MODELS_DATA = [
  // ==========================================
  // OPENAI MODELS
  // ==========================================
  {
    id: "gpt-55-standard",
    name: "GPT-5.5",
    provider: "OpenAI",
    tier: "Flagship",
    contextWindow: "1M tokens",
    lastUpdated: "June 2026",
    trend: "stable",
    ecosystem: {
      apiMaturity: "Elite",
      enterpriseAdoption: "Elite",
      openSourceFriendliness: "Low"
    },
    benchmarks: {
      chatbotArenaElo: 1352,
      mmluPro: "92.4%",
      sweBench: "48.6%"
    },
    pricing: {
      input: 5.00,
      output: 30.00,
      cachedInput: 0.50
    },
    releaseDate: "April 23, 2026",
    strengths: [
      "Broad industry integration and mature API tooling",
      "Native multimodal handling (integrated vision and audio processing)",
      "High reliability on long-context structures (1M window)"
    ],
    weaknesses: [
      "Input costs double for prompts exceeding 272K active tokens",
      "Slower response times than GPT-5.5 Instant",
      "Higher base price per million tokens than open weights competitors"
    ],
    bestUseCases: [
      "Sophisticated agentic software development workflows",
      "Enterprise document processing and translation",
      "High-complexity multimodal analysis and reasoning"
    ],
    ratings: {
      coding: { score: 9.6, confidence: "High", isSubjective: false, note: "Pinnacle of general-purpose coding; outpaced slightly by dedicated thinking modes." },
      reasoning: { score: 9.5, confidence: "High", isSubjective: false, note: "Top-tier logical planning on standard context sizes." },
      creative: { score: 9.7, confidence: "Medium", isSubjective: true, note: "Excellent style adaptation; highly preferred for copywriting." },
      speed: { score: 8.8, confidence: "High", isSubjective: false, note: "Fast response times given its parameter size." },
      multimodal: { score: 9.7, confidence: "High", isSubjective: false, note: "Next-generation spatial and layout visual understanding." }
    },
    badgeColor: "#10a37f"
  },
  {
    id: "gpt-55-instant",
    name: "GPT-5.5 Instant",
    provider: "OpenAI",
    tier: "Fast",
    contextWindow: "1M tokens",
    lastUpdated: "June 2026",
    trend: "rising",
    ecosystem: {
      apiMaturity: "Elite",
      enterpriseAdoption: "High",
      openSourceFriendliness: "Low"
    },
    benchmarks: {
      chatbotArenaElo: 1224,
      mmluPro: "81.2%",
      sweBench: "22.5%"
    },
    pricing: {
      input: 0.50,
      output: 2.00,
      cachedInput: 0.05
    },
    releaseDate: "May 5, 2026",
    strengths: [
      "Blazing fast generation speeds and ultra-low latency",
      "Highly competitive low-cost entry points",
      "Very low hallucination rate on standard search lookups"
    ],
    weaknesses: [
      "Fails on complex multi-step reasoning puzzles",
      "Coding is limited to simple functions and styling adjustments",
      "Lower precision on nested table and chart parsing"
    ],
    bestUseCases: [
      "Default conversational chatbots and customer routing",
      "High-volume summarizations and text cleaning",
      "Fast API payload conversions and JSON validation"
    ],
    ratings: {
      coding: { score: 8.2, confidence: "High", isSubjective: false, note: "Fast boilerplate generator; struggles with code optimization." },
      reasoning: { score: 8.0, confidence: "High", isSubjective: false, note: "Good everyday logic; lacks math depth." },
      creative: { score: 8.8, confidence: "Medium", isSubjective: true, note: "Highly conversational; friendly and straightforward default tone." },
      speed: { score: 9.7, confidence: "High", isSubjective: false, note: "Top-tier speed, optimized for instant user chat." },
      multimodal: { score: 9.0, confidence: "High", isSubjective: false, note: "Accurate OCR and simple visual structure tagging." }
    },
    badgeColor: "#10a37f"
  },
  {
    id: "gpt-55-thinking",
    name: "GPT-5.5 Thinking",
    provider: "OpenAI",
    tier: "Reasoning",
    contextWindow: "1M tokens",
    lastUpdated: "June 2026",
    trend: "rising",
    ecosystem: {
      apiMaturity: "High",
      enterpriseAdoption: "Medium",
      openSourceFriendliness: "Low"
    },
    benchmarks: {
      chatbotArenaElo: 1378,
      mmluPro: "94.6%",
      sweBench: "52.8%"
    },
    pricing: {
      input: 5.00,
      output: 30.00,
      cachedInput: 0.50
    },
    releaseDate: "April 2026",
    strengths: [
      "Advanced chain-of-thought logical reasoning",
      "Superb math, scientific data analysis, and complex coding logic",
      "High factual verification and low hallucination rates"
    ],
    weaknesses: [
      "Slower generation speed due to active thinking tokens",
      "Thinking process consumes output token budget",
      "Relatively expensive for simple conversations"
    ],
    bestUseCases: [
      "Scientific data processing and research logic",
      "Complex algorithm debugging and multi-file code reviews",
      "Dense logical structure verification (legal, financial)"
    ],
    ratings: {
      coding: { score: 9.8, confidence: "High", isSubjective: false, note: "State-of-the-art algorithmic programming reasoning." },
      reasoning: { score: 9.9, confidence: "High", isSubjective: false, note: "Chain-of-thought thinking enables extreme logical precision." },
      creative: { score: 7.6, confidence: "Low", isSubjective: true, note: "Dull, factual style; not suited for creative or conversational tasks." },
      speed: { score: 7.2, confidence: "High", isSubjective: false, note: "Latency is bound to reasoning effort depth settings." },
      multimodal: { score: 9.1, confidence: "Medium", isSubjective: false, note: "Capable image parsing; optimized primarily for text/logic reasoning." }
    },
    badgeColor: "#10a37f"
  },

  // ==========================================
  // ANTHROPIC MODELS
  // ==========================================
  {
    id: "claude-opus-48",
    name: "Claude Opus 4.8",
    provider: "Anthropic",
    tier: "Flagship",
    contextWindow: "1M tokens",
    lastUpdated: "June 2026",
    trend: "stable",
    ecosystem: {
      apiMaturity: "High",
      enterpriseAdoption: "High",
      openSourceFriendliness: "Low"
    },
    benchmarks: {
      chatbotArenaElo: 1368,
      mmluPro: "93.8%",
      sweBench: "51.8%"
    },
    pricing: {
      input: 5.00,
      output: 25.00,
      cachedInput: 0.50
    },
    releaseDate: "May 28, 2026",
    strengths: [
      "Effort Control setting for deep logic and reasoning tuning",
      "Dynamic Workflows support for parallel subagent orchestration",
      "4x less likely to allow unremarked code bugs than prior versions"
    ],
    weaknesses: [
      "Highest pricing tier on the market in 2026",
      "Noticeably slower generation speed than Sonnet/Flash (unless using Fast Mode)",
      "Fast Mode ($10/$50) is faster but remains highly expensive"
    ],
    bestUseCases: [
      "Drafting complex contracts and literary texts",
      "Enterprise workflow planning & multi-agent systems",
      "Deep qualitative research and code verification"
    ],
    ratings: {
      coding: { score: 9.8, confidence: "High", isSubjective: false, note: "Pinnacle of multi-file agentic coding and bug checking." },
      reasoning: { score: 9.9, confidence: "High", isSubjective: false, note: "Top-tier logical planning and contextual reading." },
      creative: { score: 9.9, confidence: "Medium", isSubjective: true, note: "Exceptional writing flow, tone control, and empathetic dialog." },
      speed: { score: 6.8, confidence: "High", isSubjective: false, note: "Heavy computation overhead leads to moderate output speeds (unless in Fast Mode)." },
      multimodal: { score: 9.4, confidence: "High", isSubjective: false, note: "Strong layout parser, specifically for PDFs, charts, and diagrams." }
    },
    badgeColor: "#d9775f"
  },
  {
    id: "claude-sonnet-46",
    name: "Claude Sonnet 4.6",
    provider: "Anthropic",
    tier: "Flagship",
    contextWindow: "200K tokens",
    lastUpdated: "June 2026",
    trend: "stable",
    ecosystem: {
      apiMaturity: "High",
      enterpriseAdoption: "Elite",
      openSourceFriendliness: "Low"
    },
    benchmarks: {
      chatbotArenaElo: 1344,
      mmluPro: "91.8%",
      sweBench: "49.5%"
    },
    pricing: {
      input: 3.00,
      output: 15.00,
      cachedInput: 0.30
    },
    releaseDate: "Late 2025",
    strengths: [
      "Outstanding coding, debugging, and systems architecture skills",
      "Exceptional visual analysis & UI design translation",
      "Generates clean, well-documented, modern code"
    ],
    weaknesses: [
      "Priced higher than OpenAI GPT-5.5 and xAI Grok 4.3",
      "Can get stubborn on safety guardrails compared to open weights models",
      "Strict context limits on API under heavy load spikes"
    ],
    bestUseCases: [
      "Full-stack software engineering and refactoring",
      "Translating designs (mockups) directly into HTML/CSS/JS",
      "Document ingestion and PDF data extraction"
    ],
    ratings: {
      coding: { score: 9.5, confidence: "High", isSubjective: false, note: "Fast, clean logic. Lacks some of the multi-step system design of Opus 4.7." },
      reasoning: { score: 9.4, confidence: "High", isSubjective: false, note: "Superb logical analysis; outpaced by Opus on subtle nuances." },
      creative: { score: 9.4, confidence: "Medium", isSubjective: true, note: "Very expressive; slightly more structural than Opus." },
      speed: { score: 8.8, confidence: "High", isSubjective: false, note: "Highly optimized execution loops." },
      multimodal: { score: 9.3, confidence: "High", isSubjective: false, note: "Best-in-class UI-to-code visual translations." }
    },
    badgeColor: "#d9775f"
  },
  {
    id: "claude-haiku-45",
    name: "Claude Haiku 4.5",
    provider: "Anthropic",
    tier: "Fast",
    contextWindow: "200K tokens",
    lastUpdated: "June 2026",
    trend: "stable",
    ecosystem: {
      apiMaturity: "High",
      enterpriseAdoption: "High",
      openSourceFriendliness: "Low"
    },
    benchmarks: {
      chatbotArenaElo: 1218,
      mmluPro: "79.8%",
      sweBench: "18.4%"
    },
    pricing: {
      input: 1.00,
      output: 5.00,
      cachedInput: 0.10
    },
    releaseDate: "Late 2025",
    strengths: [
      "Extremely responsive and lightweight",
      "Generous 200K context window for a fast model",
      "Highly accurate formatting and JSON output support"
    ],
    weaknesses: [
      "Significantly more expensive than GPT-5.5 Instant or DeepSeek-V4-Flash",
      "Lacks deep multi-step coding/math reasoning",
      "Lacks premium multimodal video capabilities"
    ],
    bestUseCases: [
      "Real-time customer interaction and chat",
      "Parsing moderately large text file lists",
      "API payload validation and structured response mapping"
    ],
    ratings: {
      coding: { score: 8.2, confidence: "High", isSubjective: false, note: "Excellent routing logic; limited to simple templates." },
      reasoning: { score: 8.0, confidence: "High", isSubjective: false, note: "Strong classification capabilities; struggles on nested math." },
      creative: { score: 8.4, confidence: "Medium", isSubjective: true, note: "Accurate formatting; casual conversational prose." },
      speed: { score: 9.4, confidence: "High", isSubjective: false, note: "Very fast token processing loop." },
      multimodal: { score: 8.0, confidence: "High", isSubjective: false, note: "Accurate text extraction from simple images." }
    },
    badgeColor: "#d9775f"
  },

  // ==========================================
  // GOOGLE MODELS
  // ==========================================
  {
    id: "gemini-35-flash",
    name: "Gemini 3.5 Flash",
    provider: "Google",
    tier: "Fast",
    contextWindow: "1M tokens",
    lastUpdated: "June 2026",
    trend: "rising",
    ecosystem: {
      apiMaturity: "High",
      enterpriseAdoption: "High",
      openSourceFriendliness: "Low"
    },
    benchmarks: {
      chatbotArenaElo: 1290,
      mmluPro: "86.5%",
      sweBench: "34.2%"
    },
    pricing: {
      input: 1.50,
      output: 9.00,
      cachedInput: 0.15
    },
    releaseDate: "May 19, 2026",
    strengths: [
      "Spacious 1 Million token context window for rapid parsing",
      "Blazing fast speeds with high efficiency",
      "Excellent video and audio processing capabilities"
    ],
    weaknesses: [
      "Higher base pricing than Gemini 3 Flash",
      "Output formatting can sometimes hallucinate structural details",
      "Occasionally truncated outputs under large context loads"
    ],
    bestUseCases: [
      "Analyzing entire codebases or long-running video transcripts",
      "High-speed multimodal content creation",
      "Large-scale search and query retrieval (RAG)"
    ],
    ratings: {
      coding: { score: 8.8, confidence: "High", isSubjective: false, note: "Outstanding scripting speeds. Context processing outpaces standard code models." },
      reasoning: { score: 8.9, confidence: "High", isSubjective: false, note: "Highly capable logic; excellent context integration." },
      creative: { score: 8.8, confidence: "Medium", isSubjective: true, note: "Fast prototyping of content drafts." },
      speed: { score: 9.6, confidence: "High", isSubjective: false, note: "Highly optimized low-latency token generation." },
      multimodal: { score: 9.8, confidence: "High", isSubjective: false, note: "Pinnacle of native video, audio, and text ingestion." }
    },
    badgeColor: "#1a73e8"
  },
  {
    id: "gemini-31-pro",
    name: "Gemini 3.1 Pro",
    provider: "Google",
    tier: "Flagship",
    contextWindow: "2M tokens",
    lastUpdated: "June 2026",
    trend: "stable",
    ecosystem: {
      apiMaturity: "High",
      enterpriseAdoption: "Elite",
      openSourceFriendliness: "Low"
    },
    benchmarks: {
      chatbotArenaElo: 1338,
      mmluPro: "90.2%",
      sweBench: "45.1%"
    },
    pricing: {
      input: 2.00,
      output: 12.00,
      cachedInput: 0.20
    },
    releaseDate: "Late 2025",
    strengths: [
      "Colossal 2M context window with high needle-in-a-haystack recall",
      "Deep scientific reasoning and coding logic",
      "Exceptional cross-modal reasoning (understanding audio, video, text simultaneously)"
    ],
    weaknesses: [
      "Pricing doubles for inputs/outputs if context exceeds 200K tokens",
      "Slower response time on long-context processing",
      "Restricted free tier access compared to earlier releases"
    ],
    bestUseCases: [
      "Analyzing hours of video or audio material",
      "Ingesting multiple dense books, textbooks, or research papers",
      "Enterprise systems migration with heavy legacy context"
    ],
    ratings: {
      coding: { score: 9.3, confidence: "High", isSubjective: false, note: "Excellent codebase understanding; slightly slower in local loops than Sonnet." },
      reasoning: { score: 9.5, confidence: "High", isSubjective: false, note: "Exceptional logic for long-context semantic retrievals." },
      creative: { score: 9.2, confidence: "Medium", isSubjective: true, note: "Adaptable style, highly sensitive to context window parameters." },
      speed: { score: 7.8, confidence: "High", isSubjective: false, note: "Generates slower to handle 2M active token parsing." },
      multimodal: { score: 9.9, confidence: "High", isSubjective: false, note: "State-of-the-art vision and native multi-frame video inputs." }
    },
    badgeColor: "#1a73e8"
  },
  {
    id: "gemini-31-flash-lite",
    name: "Gemini 3.1 Flash-Lite",
    provider: "Google",
    tier: "Fast",
    contextWindow: "1M tokens",
    lastUpdated: "June 2026",
    trend: "stable",
    ecosystem: {
      apiMaturity: "High",
      enterpriseAdoption: "High",
      openSourceFriendliness: "Low"
    },
    benchmarks: {
      chatbotArenaElo: 1198,
      mmluPro: "74.2%",
      sweBench: "12.8%"
    },
    pricing: {
      input: 0.25,
      output: 1.50,
      cachedInput: 0.025
    },
    releaseDate: "Late 2025",
    strengths: [
      "Ultra-low latency for instant interactions",
      "Spacious 1M context window for a lightweight model",
      "Very cheap base API rates"
    ],
    weaknesses: [
      "Struggles with sophisticated math reasoning",
      "Code generation is limited to standard, simple templates",
      "Visual OCR accuracy is weaker on handwriting/blurry inputs"
    ],
    bestUseCases: [
      "Sub-second latency chatbots",
      "Extracting text from massive feeds of simple PDFs",
      "Low-cost translation and transcription scripts"
    ],
    ratings: {
      coding: { score: 7.2, confidence: "High", isSubjective: false, note: "Good for basic helper scripts. Lacks multi-file capabilities." },
      reasoning: { score: 7.0, confidence: "High", isSubjective: false, note: "Basic router reasoning; struggles with nested logic structures." },
      creative: { score: 7.6, confidence: "Medium", isSubjective: true, note: "Capable but generates generic phrasing." },
      speed: { score: 9.8, confidence: "High", isSubjective: false, note: "Blazing fast throughput rates." },
      multimodal: { score: 8.5, confidence: "High", isSubjective: false, note: "Fast visual processing; lower precision on fine-print OCR." }
    },
    badgeColor: "#1a73e8"
  },

  // ==========================================
  // DEEPSEEK MODELS
  // ==========================================
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek-V4-Pro",
    provider: "DeepSeek",
    tier: "Reasoning",
    contextWindow: "1M tokens",
    lastUpdated: "June 2026",
    trend: "rising",
    ecosystem: {
      apiMaturity: "Medium",
      enterpriseAdoption: "Medium",
      openSourceFriendliness: "Elite"
    },
    benchmarks: {
      chatbotArenaElo: 1342,
      mmluPro: "92.8%",
      sweBench: "50.4%"
    },
    pricing: {
      input: 1.74,
      output: 3.48,
      cachedInput: 0.0174
    },
    releaseDate: "April 24, 2026",
    strengths: [
      "Incredible reasoning and coding at a fraction of competitors' costs",
      "Ultra-cheap input cache hit rates (99% discount)",
      "High quality math/logic capabilities matching OpenAI's o-series"
    ],
    weaknesses: [
      "Lack of native advanced audio/video processing",
      "API stability can suffer during high traffic periods",
      "Private API setup required for general production integration"
    ],
    bestUseCases: [
      "Complex coding pipelines and automated PR reviews",
      "Advanced mathematical reasoning & quantitative research",
      "Developer tools requiring high intelligence at minimum cost"
    ],
    ratings: {
      coding: { score: 9.5, confidence: "High", isSubjective: false, note: "Incredible cost-performance ratio. Coding is equivalent to OpenAI o-series." },
      reasoning: { score: 9.6, confidence: "High", isSubjective: false, note: "Top-tier logical reasoning using structured thinking steps." },
      creative: { score: 8.5, confidence: "Medium", isSubjective: true, note: "Competent, but logic focus can make responses dry." },
      speed: { score: 7.8, confidence: "High", isSubjective: false, note: "Slower output due to reasoning token overhead." },
      multimodal: { score: 6.5, confidence: "High", isSubjective: false, note: "Basic OCR vision only; lacks native video or audio input." }
    },
    badgeColor: "#0052cc"
  },
  {
    id: "deepseek-v4-flash",
    name: "DeepSeek-V4-Flash",
    provider: "DeepSeek",
    tier: "Fast",
    contextWindow: "1M tokens",
    lastUpdated: "June 2026",
    trend: "rising",
    ecosystem: {
      apiMaturity: "Medium",
      enterpriseAdoption: "Medium",
      openSourceFriendliness: "Elite"
    },
    benchmarks: {
      chatbotArenaElo: 1205,
      mmluPro: "78.5%",
      sweBench: "15.6%"
    },
    pricing: {
      input: 0.14,
      output: 0.28,
      cachedInput: 0.0028
    },
    releaseDate: "Late 2025",
    strengths: [
      "Cheapest fast-tier API model globally in May 2026",
      "Highly responsive generation speed",
      "Strong reasoning capability for its pricing level"
    ],
    weaknesses: [
      "Weak multi-modal output support",
      "Unsuitable for highly complicated code architectures",
      "Requires custom API endpoint or self-hosting for production scale"
    ],
    bestUseCases: [
      "Microservice logs parsing and indexing",
      "High-speed content classification at scale",
      "Cost-sensitive consumer chatbots"
    ],
    ratings: {
      coding: { score: 8.5, confidence: "High", isSubjective: false, note: "Excellent for quick boilerplate; outpaced by OpenAI mini on tools." },
      reasoning: { score: 8.4, confidence: "High", isSubjective: false, note: "Decent classifications, highly competitive for its low cost." },
      creative: { score: 8.2, confidence: "Medium", isSubjective: true, note: "Standard, functional writing." },
      speed: { score: 9.5, confidence: "High", isSubjective: false, note: "Extremely fast generation cycle." },
      multimodal: { score: 6.8, confidence: "High", isSubjective: false, note: "Vision processing is limited to simple image files." }
    },
    badgeColor: "#0052cc"
  },

  // ==========================================
  // XAI MODELS
  // ==========================================
  {
    id: "grok-43",
    name: "Grok 4.3",
    provider: "xAI",
    tier: "Flagship",
    contextWindow: "1M tokens",
    lastUpdated: "June 2026",
    trend: "stable",
    ecosystem: {
      apiMaturity: "Medium",
      enterpriseAdoption: "Medium",
      openSourceFriendliness: "Medium"
    },
    benchmarks: {
      chatbotArenaElo: 1320,
      mmluPro: "89.6%",
      sweBench: "42.5%"
    },
    pricing: {
      input: 1.25,
      output: 2.50,
      cachedInput: 0.20
    },
    releaseDate: "April 30, 2026",
    strengths: [
      "Real-time web search integration via the X platform",
      "Uncensored, expressive personality and customizable tones",
      "Large 1M context window with fast processing"
    ],
    weaknesses: [
      "Occasionally produces informal or conversational slang",
      "Higher rate of formatting variance for standard structured JSON",
      "Integration outside the X platform is highly API-centric"
    ],
    bestUseCases: [
      "Tracking breaking news and current events",
      "Generating punchy, modern marketing copy",
      "Real-time social media sentiment mapping"
    ],
    ratings: {
      coding: { score: 9.0, confidence: "High", isSubjective: false, note: "Capable programming help; strong integration with real-time news." },
      reasoning: { score: 9.2, confidence: "High", isSubjective: false, note: "Excellent logic; relies heavily on real-time query retrieval." },
      creative: { score: 8.9, confidence: "Medium", isSubjective: true, note: "Unique, witty writing style; highly subjective preference." },
      speed: { score: 8.6, confidence: "High", isSubjective: false, note: "Solid generation speed." },
      multimodal: { score: 8.8, confidence: "High", isSubjective: false, note: "Strong vision parsing; supports image generation outputs." }
    },
    badgeColor: "#000000"
  },
  {
    id: "grok-41-fast",
    name: "Grok 4.1 Fast",
    provider: "xAI",
    tier: "Fast",
    contextWindow: "2M tokens",
    lastUpdated: "June 2026",
    trend: "stable",
    ecosystem: {
      apiMaturity: "Medium",
      enterpriseAdoption: "Medium",
      openSourceFriendliness: "Medium"
    },
    benchmarks: {
      chatbotArenaElo: 1208,
      mmluPro: "76.4%",
      sweBench: "14.8%"
    },
    pricing: {
      input: 0.20,
      output: 0.50,
      cachedInput: 0.05
    },
    releaseDate: "Early 2026",
    strengths: [
      "Impressive 2M token context size on a fast model",
      "Excellent pricing-to-context ratio",
      "Fast response output"
    ],
    weaknesses: [
      "Lacks deep scientific reasoning of Grok 4.3",
      "Image processing is slower compared to competitor fast models",
      "Subject to regional availability limitations"
    ],
    bestUseCases: [
      "Long document search and summary pipelines",
      "Active chat bots with high transaction volume",
      "Real-time monitoring alerts parsing"
    ],
    ratings: {
      coding: { score: 8.0, confidence: "High", isSubjective: false, note: "Basic task assistance; struggles on multithreaded systems." },
      reasoning: { score: 8.1, confidence: "High", isSubjective: false, note: "Fast, standard logic structures." },
      creative: { score: 8.0, confidence: "Medium", isSubjective: true, note: "Casual tone defaults." },
      speed: { score: 9.3, confidence: "High", isSubjective: false, note: "Highly responsive processing." },
      multimodal: { score: 8.2, confidence: "High", isSubjective: false, note: "Simple visual tagging capabilities." }
    },
    badgeColor: "#000000"
  },

  // ==========================================
  // META MODELS (MUSE SPARK)
  // ==========================================
  {
    id: "muse-spark",
    name: "Muse Spark",
    provider: "Meta",
    tier: "Flagship",
    contextWindow: "260K tokens",
    lastUpdated: "June 2026",
    trend: "rising",
    ecosystem: {
      apiMaturity: "Medium",
      enterpriseAdoption: "High",
      openSourceFriendliness: "Medium"
    },
    benchmarks: {
      chatbotArenaElo: 1334,
      mmluPro: "90.5%",
      sweBench: "44.8%"
    },
    pricing: {
      input: 0.00,
      output: 0.00,
      cachedInput: 0.00
    },
    releaseDate: "April 8, 2026",
    strengths: [
      "Free integrated consumer tier across WhatsApp, Instagram, Messenger",
      "High-grade agentic workflow execution and tool use",
      "Incredible social-interaction tuning and friendly demeanor"
    ],
    weaknesses: [
      "Currently closed-source proprietary model strategy from Meta MSL",
      "Developer API in private preview only",
      "Commercial pricing and SLA structures not yet finalized"
    ],
    bestUseCases: [
      "Personal assistance and virtual companions",
      "Direct integration inside Meta-based customer workflows",
      "Agentic automation of scheduling and API queries"
    ],
    ratings: {
      coding: { score: 9.1, confidence: "Medium", isSubjective: true, note: "Excellent UI integrations; API capabilities are in private preview." },
      reasoning: { score: 9.3, confidence: "High", isSubjective: false, note: "Highly optimized for social dialogue and user intent matching." },
      creative: { score: 9.4, confidence: "Medium", isSubjective: true, note: "Extremely natural and friendly prose generation." },
      speed: { score: 9.0, confidence: "High", isSubjective: false, note: "Fast consumer-facing infrastructure." },
      multimodal: { score: 9.2, confidence: "High", isSubjective: false, note: "Native photo-realistic image parsing and outputs." }
    },
    badgeColor: "#0668e1"
  }
];

// Explicitly attach to window for browser global access
if (typeof window !== "undefined") {
  window.AI_MODELS_DATA = AI_MODELS_DATA;
}

// Export standard configuration for JS environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = AI_MODELS_DATA;
}
