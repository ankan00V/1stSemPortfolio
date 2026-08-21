export type ProjectDoc = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  stack: string[];
  context: string;
  action: string;
  result: string;
  impact: string[];
  gallery?: {
    src: string;
    title: string;
    caption: string;
  }[];
  github: string;
  live?: string;
};

export const projectDocs: ProjectDoc[] = [
  {
    slug: "vidyaverse",
    title: "VidyaVerse",
    category: "Ivy League Opportunity Intelligence Platform",
    summary:
      "Built an opportunity discovery platform for students with async ingestion pipelines and a RAG-based ML ranking system.",
    stack: ["FastAPI", "Next.js", "MongoDB", "Redis", "Playwright", "MLOps"],
    context:
      "Students search across fragmented internship and hackathon portals. The platform needed a scalable way to aggregate these records and rank them intelligently.",
    action:
      "Built an opportunity discovery platform for students — architected async ingestion pipeline aggregating 600+ records from 50+ sources with deduplication, achieving 85%+ cache hit rate and P50 latency of 30-103ms under 100 req/sec (Redis + MongoDB).",
    result:
      "Designed and shipped RAG-based ML ranking pipeline (embeddings, vector search, LightGBM); validated across 130+ model versions via A/B framework, producing +58% CTR lift and +153% apply-rate improvement across 3 active experiments.",
    impact: [
      "Architected async ingestion pipeline aggregating 600+ records from 50+ sources with deduplication.",
      "Designed and shipped RAG-based ML ranking pipeline validated across 130+ model versions.",
      "Produced +58% CTR lift and +153% apply-rate improvement across 3 active experiments.",
    ],
    gallery: [
      {
        src: "/images/vidyaverse-gallery/vidyaverse-01.jpg",
        title: "AI Opportunity Intelligence Landing",
        caption:
          "Public landing experience that positions VidyaVerse around AI-powered opportunity discovery and InCoScore-based ranking.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-02.jpg",
        title: "Demo Dashboard Preview",
        caption:
          "Unauthenticated dashboard preview with seeded recommendations, status messaging, and core navigation.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-03.jpg",
        title: "Candidate Account Creation",
        caption:
          "Candidate sign-up flow with role selection, Google continuation, and OTP-first account verification.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-04.jpg",
        title: "Employer Account Creation",
        caption:
          "Employer onboarding path with corporate email guidance and a dedicated role-specific sign-up state.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-05.jpg",
        title: "OTP Verification Entry",
        caption:
          "Secure OTP verification step with resend timing, editable details, and clear continuation controls.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-06.jpg",
        title: "Branded OTP Email",
        caption:
          "Transactional email template for verification codes, expiration context, support contact, and platform identity.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-07.jpg",
        title: "Live OTP Confirmation",
        caption:
          "User-facing OTP entry with live code formatting, countdown handling, and verification call to action.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-08.jpg",
        title: "Profile Setup Basics",
        caption:
          "Guided profile setup captures identity, mobile, user type, consent, and opportunity communication preferences.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-09.jpg",
        title: "Education and Resume Setup",
        caption:
          "Education workflow captures domain, course, passout year, institution, and resume upload state.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-10.jpg",
        title: "Opportunity Intent Setup",
        caption:
          "Final onboarding step captures job intent, career roles, location preferences, and remote-work openness.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-11.jpg",
        title: "Signed-In Student Dashboard",
        caption:
          "Personal dashboard surfaces InCoScore rank, active applications, profile strength, recommendations, and network activity.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-12.jpg",
        title: "Password Setup Modal",
        caption:
          "Post-account password setup prompt explains why the user needs a password and validates required strength rules.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-13.jpg",
        title: "Strong Password Validation",
        caption:
          "Password setup updates strength feedback as requirements are satisfied and blocks mismatched confirmation.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-14.jpg",
        title: "Personalized Dashboard State",
        caption:
          "Student dashboard after ranking is computed, with profile strength, rank context, and live recommendation cards.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-15.jpg",
        title: "Profile Editor Basics",
        caption:
          "Profile builder organizes required sections, completion status, identity fields, academic domain, and save controls.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-16.jpg",
        title: "Resume Management",
        caption:
          "Resume section supports uploaded file visibility, download, replacement, removal, and supported format constraints.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-17.jpg",
        title: "Skills and Interests",
        caption:
          "Skills editor converts structured profile inputs into readable tags for matching, ranking, and recommendations.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-18.jpg",
        title: "Personal Details and Address",
        caption:
          "Profile completion includes pronouns, gender, date of birth, current address, and permanent address details.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-19.jpg",
        title: "Profile Save Confirmation",
        caption:
          "Successful profile update state confirms persistence while keeping the user in the profile editing workflow.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-20.jpg",
        title: "Opportunities Discovery",
        caption:
          "Opportunity browser combines category filters with a grounded shortlist assistant for competition discovery.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-21.jpg",
        title: "Verified Competition Listings",
        caption:
          "Competition cards show source confidence, verified host signals, deadlines, locations, and join/save actions.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-22.jpg",
        title: "Internships and Jobs Discovery",
        caption:
          "Hiring-focused discovery area separates jobs and internships with domain filters and AI shortlist prompts.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-23.jpg",
        title: "Career Opportunity Cards",
        caption:
          "Job cards expose source confidence, domain, deadline, source labels, location signals, and apply/save actions.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-24.jpg",
        title: "Applications Hub",
        caption:
          "Applications table tracks live syncing, opportunity status, organization, automation mode, update date, and progress state.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-25.jpg",
        title: "Academic Social Network",
        caption:
          "Social network view supports research updates, achievement attachments, groups, hashtags, and peer collaboration.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-26.jpg",
        title: "InCoScore Leaderboard",
        caption:
          "Leaderboard ranks students by InCoScore and supports search by name or handle for public competency comparison.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-27.jpg",
        title: "Grounded Shortlist Result",
        caption:
          "AI retrieval output summarizes matches, request ID, recommended action, deadline signal, and top opportunity relevance.",
      },
      {
        src: "/images/vidyaverse-gallery/vidyaverse-28.jpg",
        title: "Feedback and Reasoning Timeline",
        caption:
          "Retriever workflow records helpfulness feedback and event timeline entries so shortlist quality can be reviewed.",
      },
    ],
    github: "https://github.com/ankan00V/Ivy-League-Portal",
  },
  {
    slug: "lpu-smart-campus",
    title: "LPU Smart Campus",
    category: "Campus Management and Attendance Intelligence",
    summary:
      "Built a campus-wide management platform with fault-tolerant systems, real-time events, and comprehensive API design.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Docker", "Celery", "GitHub Actions"],
    context:
      "Large campus operations involve complex workflows across attendance, access control, and reporting that require high reliability, low latency, and robust fault tolerance.",
    action:
      "Built a campus-wide management platform — designed and implemented 210 REST API endpoints across 14 modules (56K LOC, 219 Pydantic schemas), achieving sub-100ms P95 latency under 1,000 concurrent users via async ASGI, connection pooling, and O(1) Redis cache reads.",
    result:
      "Deployed fault-tolerant system with RBAC, AES-256 encryption, idempotent checkouts, Docker CI/CD, and Prometheus observability; 450+ tests (92.7% coverage, pytest + HTTPX), zero-downtime rollouts; real-time events via Redis pub/sub SSE to 800+ concurrent connections.",
    impact: [
      "Implemented 210 REST API endpoints across 14 modules achieving sub-100ms P95 latency.",
      "Deployed fault-tolerant system with RBAC, AES-256 encryption, and Prometheus observability.",
      "Achieved 92.7% test coverage with zero-downtime rollouts and real-time events via Redis pub/sub.",
    ],
    gallery: [
      {
        src: "/images/lpu-gallery/lpu-smart-campus-01.jpg",
        title: "Secure Smart Campus Login",
        caption:
          "Role-aware login flow with OTP verification for students, faculty, admins, and operations users.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-02.jpg",
        title: "Professional OTP Feedback",
        caption:
          "Clear delivery-state handling for authentication so users understand secure login progress.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-03.jpg",
        title: "Student Profile Setup",
        caption:
          "Structured onboarding for verified student identity, enrollment data, section mapping, and profile photo capture.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-04.jpg",
        title: "Guided Face Enrollment",
        caption:
          "One-time video enrollment workflow built for reliable camera capture before attendance access is enabled.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-05.jpg",
        title: "Live Face Verification",
        caption:
          "Realtime verification compares stored profile data with a live camera feed before marking attendance.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-06.jpg",
        title: "Student Success Dashboard",
        caption:
          "Unified dashboard for timetable, attendance, mentoring, food workflows, live modules, and campus actions.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-07.jpg",
        title: "Attendance Hub",
        caption:
          "Student-facing attendance management with upcoming-class context and live result tracking.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-08.jpg",
        title: "Attendance Ledger",
        caption:
          "Aggregated attendance records with subject-level drilldowns for students to understand academic risk quickly.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-09.jpg",
        title: "Class-Level Attendance Drilldown",
        caption:
          "Date-wise modal view that exposes individual present/absent records without leaving the main dashboard.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-10.jpg",
        title: "Saarthi AI Counsellor",
        caption:
          "Integrated student-support module for check-ins, attendance-linked mentoring, and guided intervention workflows.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-11.jpg",
        title: "Location Permission Prompt",
        caption:
          "The food hall flow requests realtime location access before enabling campus-only ordering and delivery validation.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-12.jpg",
        title: "GPS-Verified Food Pre-ordering",
        caption:
          "Students choose a pickup slot, verify their live campus location, and open a cart under a single-shop ordering rule.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-13.jpg",
        title: "Food Hall Marketplace",
        caption:
          "The outlet directory is organized by campus clusters with ratings, brand grouping, and visual discovery across kiosks and chains.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-14.jpg",
        title: "Orders Tracking with Chotu Assistant",
        caption:
          "Order history and recovery workflows sit alongside the Chotu food assistant for quick recommendations and support.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-15.jpg",
        title: "Demand Trends and Rush Forecasting",
        caption:
          "The food hall analytics layer visualizes demand by slot, utilization, predicted rush windows, and low-latency live sync status.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-16.jpg",
        title: "Cart and Live Order Status",
        caption:
          "The checkout modal enforces cart-review-pay progression with quantities, live verification, and single-shop ordering controls.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-17.jpg",
        title: "Razorpay Payment Flow",
        caption:
          "Payment handling extends into a full gateway flow with UPI, QR, cards, wallets, pay-later options, and price summary context.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-18.jpg",
        title: "Remedial Attendance Workflow",
        caption:
          "Section-targeted remedial attendance combines code validation, faculty messaging, and a dedicated attendance ledger.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-19.jpg",
        title: "Student Profile Settings",
        caption:
          "Student profile management supports enrollment metadata, section updates, secondary email handling, and profile photo records.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-20.jpg",
        title: "Faculty Account Creation",
        caption:
          "Faculty signup captures role, faculty identifier, department, credentials, and onboarding details before secure portal access.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-21.jpg",
        title: "OTP Delivery Confirmation",
        caption:
          "The authentication flow confirms OTP generation and delivery with clear waiting-state feedback before account access proceeds.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-22.jpg",
        title: "TOTP Setup Instructions",
        caption:
          "Privileged users get guided MFA instructions for authenticator setup, code retrieval, and secure activation steps.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-23.jpg",
        title: "MFA Enrollment QR",
        caption:
          "Admin and faculty security is backed by QR-based TOTP enrollment, secret rotation context, and backup recovery codes.",
      },
      {
        src: "/images/lpu-gallery/lpu-smart-campus-24.jpg",
        title: "Faculty Profile Setup",
        caption:
          "Faculty profile setup supports ID, section assignment, secondary email, photo upload, and ready-to-save onboarding state.",
      },
    ],
    github: "https://github.com/ankan00V/LPU-smart-campus",
  },
  {
    slug: "verdikt",
    title: "Verdikt",
    category: "AI Investment Research Agent",
    summary:
      "An AI-powered investment research platform that autonomously researches companies across real-time data sources and delivers structured INVEST/PASS verdicts.",
    stack: [
      "TypeScript",
      "Next.js",
      "LangGraph.js",
      "NVIDIA NIM",
      "Tavily API",
      "Yahoo Finance",
      "Llama 3.3",
      "Zod",
      "Upstash Redis",
      "Tailwind CSS",
    ],
    context:
      "Single-prompt LLM approaches to investment research lack visible reasoning and structure. A multi-node pipeline was needed to ensure each research stage is independently inspectable and structured.",
    action:
      "Engineered a multi-node LangGraph.js StateGraph that fetches real-time financial data (Yahoo Finance), live news and web research (Tavily API), and analyzes it using NVIDIA NIM (Llama 3.3 70B). Implemented production-grade resilience with Zod schema validation, exponential backoff retries, and Upstash Redis checkpointing to survive serverless timeouts.",
    result:
      "Delivered a real-time streaming UI using Server-Sent Events where users watch the research pipeline complete live. The agent provides fully traceable reasoning chains, caching node results in <100ms, and evaluating metrics like revenue growth, margins, moat, and sentiment to produce a final investment verdict.",
    impact: [
      "Implemented a real multi-node LangGraph.js pipeline with parallel fan-out/fan-in and real-time SSE streaming.",
      "Integrated NVIDIA NIM, Yahoo Finance, and Tavily APIs with Zod schema enforcement for structured LLM analysis.",
      "Engineered persistent checkpointing via Upstash Redis to bypass Vercel's 60-second timeout limits.",
    ],
    gallery: [
      {
        src: "/images/verdikt-gallery/verdikt-1.png",
        title: "Verdikt Landing Page",
        caption:
          "The hero section of the Verdikt platform, introducing the AI-powered investment research agent and its core value proposition.",
      },
      {
        src: "/images/verdikt-gallery/verdikt-2.png",
        title: "Platform Features",
        caption:
          "Showcasing Verdikt's core features, including real-time financial data integration and fully transparent AI reasoning.",
      },
      {
        src: "/images/verdikt-gallery/verdikt-3.png",
        title: "Example Investment Verdicts",
        caption:
          "Examples of Verdikt's output, displaying clear INVEST or PASS stamps alongside a short reasoning blurb for various companies.",
      },
      {
        src: "/images/verdikt-gallery/verdikt-4.png",
        title: "Call to Action",
        caption:
          "The final call to action on the landing page, encouraging users to start researching and trace verdicts back to the evidence.",
      },
      {
        src: "/images/verdikt-gallery/verdikt-5.png",
        title: "Research Console Input",
        caption:
          "The starting point in the Research Console where users enter a company name or website to initiate the multi-node AI research pipeline.",
      },
      {
        src: "/images/verdikt-gallery/verdikt-6.png",
        title: "Pipeline Initialization",
        caption:
          "The research process begins. The UI displays the active nodes in the LangGraph pipeline, starting with ticker resolution.",
      },
      {
        src: "/images/verdikt-gallery/verdikt-7.png",
        title: "Live Findings Stream",
        caption:
          "As the AI agent progresses, real-time findings are streamed to the console, logging fetched financials, news, and web research utilizing the Tavily AI and Yahoo Finance APIs.",
      },
      {
        src: "/images/verdikt-gallery/verdikt-8.png",
        title: "Final Verdict & Reasoning",
        caption:
          "The final synthesis stage presents a clear INVEST or PASS verdict, confidence score, and a structured breakdown of strengths and risks generated by NVIDIA NIM using the Llama 3.3 70B model.",
      },
    ],
    github: "https://github.com/ankan00V/Verdikt",
    live: "https://verdikt-ashy.vercel.app",
  },
  {
    slug: "public-policy-analytics",
    title: "Public Policy Analytics",
    category: "Government Welfare Data Analysis",
    summary:
      "A data analytics project that converts welfare records into policy insights, KPIs, visual dashboards, and decision-ready summaries.",
    stack: ["Python", "Pandas", "NumPy", "Excel", "Power BI", "Time Series"],
    context:
      "Public welfare datasets can reveal meaningful patterns about access, distribution, and social inclusion, but the raw data is often difficult to interpret. Without cleaning, KPI design, trend analysis, and clear visualization, important policy signals stay buried in spreadsheets and disconnected records.",
    action:
      "I analyzed 14K+ welfare records using Python, Pandas, NumPy, Excel, and Power BI. I cleaned and structured the data, designed KPIs, explored correlations, studied time-based trends, and built dashboards that translated complex welfare data into clear visual insights for both technical and non-technical audiences.",
    result:
      "The project demonstrates practical analytics judgment: moving from raw records to reliable metrics, visual dashboards, and policy-relevant explanations. It strengthens my fit for data analyst, data science, BI, and analytics roles because it shows both technical execution and the ability to communicate insights clearly.",
    impact: [
      "Converted public-sector records into decision-ready analytical narratives.",
      "Built metrics and dashboards that make access, distribution, and trend patterns easier to compare.",
      "Strong signal for analytics roles that require data cleaning, visualization, business communication, and stakeholder-ready insight.",
    ],
    github:
      "https://github.com/ankan00V/Samavesh-Visualizing-Social-Inclusion-in-India",
  },
];

export function getProjectDoc(slug: string) {
  return projectDocs.find((project) => project.slug === slug);
}
