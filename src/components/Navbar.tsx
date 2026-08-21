import { type FormEvent, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

type BobMessage = {
  role: "bob" | "user";
  text: string;
  actions?: BobAction[];
};

type BobAction = {
  label: string;
  href: string;
};

const initialBobMessages: BobMessage[] = [
  {
    role: "bob",
    text: "Hi, I'm Bob. I can summarize Ankan's projects, skills, resume fit, or contact links in a few seconds.",
  },
];

const contactActions: BobAction[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ghoshankan" },
  { label: "GitHub", href: "https://github.com/ankan00V" },
];

function hasAnyTerm(query: string, terms: string[]) {
  return terms.some((term) => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|\\W)${escapedTerm}(\\W|$)`, "i").test(query);
  });
}

function isSimpleGreeting(message: string) {
  const normalized = message
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return false;

  const greetingPhrases = new Set([
    "hi",
    "hello",
    "hey",
    "hey there",
    "hello there",
    "hi there",
    "good morning",
    "good afternoon",
    "good evening",
    "gm",
  ]);

  if (greetingPhrases.has(normalized)) return true;

  const withoutAssistantName = normalized
    .replace(/\b(bob|ankan|sir|bro)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return greetingPhrases.has(withoutAssistantName);
}

function getGreetingReply(): BobMessage {
  return {
    role: "bob",
    text: "Hi, I'm Bob.\n- Ask about Ankan's projects, skills, resume, GitHub, or contact details.",
  };
}

function getRoleFromQuery(query: string) {
  if (hasAnyTerm(query, ["sde", "software engineer", "software developer", "swe"])) {
    return "sde";
  }

  if (hasAnyTerm(query, ["backend", "backend engineer", "api engineer"])) {
    return "backend";
  }

  if (hasAnyTerm(query, ["full stack", "fullstack", "frontend", "front end"])) {
    return "fullstack";
  }

  if (hasAnyTerm(query, ["ml", "machine learning", "ai", "rag", "nlp", "ml engineer", "ai engineer"])) {
    return "ml";
  }

  if (hasAnyTerm(query, ["data scientist", "data science", "ds"])) {
    return "data-science";
  }

  if (hasAnyTerm(query, ["data analyst", "analyst", "analytics", "bi"])) {
    return "analyst";
  }

  return "";
}

function isBroadHiringQuestion(query: string) {
  return (
    query.includes("why hire") ||
    query.includes("should we hire") ||
    query.includes("worth hiring") ||
    query.includes("hire him") ||
    query.includes("hiring him") ||
    query.includes("fit for our company")
  );
}

function wasAskedForRole(messages: BobMessage[]) {
  return messages.slice(-3).some((message) => {
    return (
      message.role === "bob" &&
      message.text.toLowerCase().includes("which role")
    );
  });
}

function getRoleClarificationReply(): BobMessage {
  return {
    role: "bob",
    text: "May I know which role you're hiring for?\n- SDE/backend\n- Full-stack\n- ML/AI\n- Data science or analyst\nI can map Ankan's strongest proof to that role.",
  };
}

function getRoleFitReply(role: string): BobMessage {
  const replies: Record<string, string> = {
    sde:
      "For an SDE role, Ankan is a strong fit.\n- SDE Intern at Aviva Infotech / NIIT IEB: Developed AI features and backend services using LLMs and modern frameworks\n- Open Source Contributor at GSSoC: Shipped Next.js/Node.js PRs, OAuth 2.0, and Redis performance optimization\n- Built LPU Smart Campus with 200+ REST APIs, RBAC, CI/CD, and 50+ test suites\n- Comfortable with Python, FastAPI, Django, React, Next.js, Docker, and system design\n\nHe would be a valuable asset to an engineering team that needs a quick learner, team player, and practical builder who can ship reliable systems.",
    backend:
      "For a backend role, Ankan's strongest proof is production-style systems work.\n- SDE Intern at Aviva Infotech / NIIT IEB: Integrated LLMs and built robust backend APIs\n- Open Source Contributor at GSSoC: Optimized leaderboard APIs (reduced latency by ~200ms via Redis and query optimization)\n- Backend developer of LPU Smart Campus (200+ endpoints, RBAC, caching, and rate limiting)\n- Experience with PostgreSQL, MongoDB, Redis, Docker, CI/CD, metrics, and logging\n\nHe is an adaptable backend developer who understands database performance, API design, and system scalability.",
    fullstack:
      "For a full-stack role, Ankan can contribute across product surfaces and backend depth.\n- Open Source Contributor at GSSoC: Shipped full-stack Next.js/Node.js integrations (Discord OAuth 2.0, session management)\n- SDE Intern at Aviva Infotech / NIIT IEB: Developed AI features and backend endpoints\n- VidyaVerse: Combines Next.js frontend with FastAPI backend, vector search, and RAG pipelines\n- Comfortable moving between frontend, APIs, databases, and deployment concerns\n\nHe is a versatile builder who connects modern user interfaces with scalable, high-performance backends.",
    ml:
      "For an ML/AI role, Ankan has applied ML proof rather than only coursework.\n- Built VidyaVerse with embeddings, NER, vector search, RAG, ranking metrics, A/B testing, and drift monitoring\n- Processed 15K+ interaction events, improving CTR by 58% and apply-rate by 153%\n- Built Verdikt, an autonomous AI investment research agent with multi-node LangGraph pipelines and structured outputs\n\nHe would be a valuable asset to an AI team that needs a quick learner who collaborates well and turns models into measurable product outcomes.",
    "data-science":
      "For a data science role, Ankan brings analytics plus experimentation strength.\n- Built recommendation evaluation using Precision@K, Recall, nDCG, and MRR\n- Worked with 15K+ interaction events and controlled A/B experiments\n- Analyzed 14K+ welfare records with Power BI/Excel dashboards and policy insights\n\nHe would be a valuable asset to a data team that needs an analytical, adaptable teammate who connects analysis, experimentation, and product impact.",
    analyst:
      "For an analyst role, Ankan has direct dashboarding and enterprise-data experience.\n- At Eastern Coalfields Limited, improved data accuracy by 15% and reporting efficiency by 20%\n- Built Power BI and Excel dashboards on SAP-based enterprise data\n- Public Policy Analytics covered 14K+ welfare records, KPIs, correlation, and time-series insights\n\nHe would be a valuable asset to an analytics team that needs clear communication, reliable data checks, and business-facing insight.",
  };

  return {
    role: "bob",
    text: replies[role] ?? replies.sde,
    actions: contactActions,
  };
}

function isCredibilityChallenge(query: string) {
  return (
    query.includes("doesn't know") ||
    query.includes("does not know") ||
    query.includes("knows nothing") ||
    query.includes("not good") ||
    query.includes("is he good") ||
    query.includes("why hire") ||
    query.includes("should we hire") ||
    query.includes("worth hiring") ||
    query.includes("defend") ||
    query.includes("credible")
  );
}

function getCredibilityReply(): BobMessage {
  return {
    role: "bob",
    text: "I would disagree with that. Ankan has concrete proof of skill:\n- SDE Intern at Aviva Infotech / NIIT IEB building backend services and AI pipelines\n- Open Source Contributor at GSSoC: Shipped Next.js/Node.js PRs and reduced API latency by 200ms using Redis\n- Built LPU Smart Campus with 200+ APIs, 14+ modules, RBAC, CI/CD, and 50+ test suites\n- Built VidyaVerse with RAG, vector search, 15K+ events, +58% CTR, and +153% apply-rate lift\n\nHe is a quick learner, team player, and analytical builder who turns technical work into measurable business impact.",
    actions: contactActions,
  };
}

function getBobReply(message: string, messages: BobMessage[] = []): BobMessage {
  const query = message.toLowerCase();
  const role = getRoleFromQuery(query);

  if (isSimpleGreeting(query)) {
    return getGreetingReply();
  }

  if ((wasAskedForRole(messages) && role) || (isBroadHiringQuestion(query) && role)) {
    return getRoleFitReply(role);
  }

  if (isBroadHiringQuestion(query)) {
    return getRoleClarificationReply();
  }

  if (isCredibilityChallenge(query)) {
    return getCredibilityReply();
  }

  if (hasAnyTerm(query, ["contact", "email", "hire"])) {
    return {
      role: "bob",
      text: "Best contact paths:\n- Email: ghoshankan005@gmail.com\n- LinkedIn: linkedin.com/in/ghoshankan\n- GitHub: github.com/ankan00V",
      actions: contactActions,
    };
  }

  if (hasAnyTerm(query, ["github", "repo", "repos", "repository", "code"])) {
    return {
      role: "bob",
      text: "Ankan's GitHub is github.com/ankan00V.\n- Ivy-League-Portal\n- LPU-smart-campus\n- Incident-Commander\n- Samavesh",
      actions: [{ label: "Open GitHub", href: "https://github.com/ankan00V" }],
    };
  }

  if (hasAnyTerm(query, ["skill", "skills", "stack", "tech", "technology"])) {
    return {
      role: "bob",
      text: "Core stack:\n- Backend: Python, FastAPI, Django, REST APIs\n- Data: PostgreSQL, MongoDB, Redis, SQL\n- AI/ML: NLP, RAG, vector search, Scikit-learn\n- Frontend: React, Next.js, TypeScript\n\nHe also comes across as a quick learner and team player who can adapt across backend, data, and AI work.",
    };
  }

  if (hasAnyTerm(query, ["experience", "internship", "work", "job", "worked"])) {
    return {
      role: "bob",
      text: "Ankan's professional experience:\n- **SDE Intern** at **Aviva Infotech / NIIT IEB** (Jun-Aug 2026): Designed AI-powered features, backend services, and integrated LLM capabilities.\n- **Open Source Contributor** at **GirlScript Summer of Code (GSSoC)** (May 2026 - Present): Shipped Next.js/Node.js PRs, implementing Discord OAuth 2.0 and session management; optimized leaderboard response times by ~200ms using Redis.\n- **IT Analyst Intern** at **Eastern Coalfields Limited** (Jul-Aug 2025): Improved enterprise data accuracy by 15% and reporting efficiency by 20% using Power BI, Excel, and SAP data.\n- **AI/Data Systems Builder** (Independent Projects): Built VidyaVerse and LPU Smart Campus with FastAPI, Next.js, Redis, Docker, and PostgreSQL.",
    };
  }

  if (hasAnyTerm(query, ["project", "projects", "built"])) {
    return {
      role: "bob",
      text: "Key projects:\n- VidyaVerse: RAG + opportunity intelligence\n- LPU Smart Campus: campus systems + attendance\n- Verdikt: AI investment research agent with LangGraph\n- Public Policy Analytics: welfare data insights\n\nThe pattern is strong: he learns quickly, builds end-to-end, and focuses on measurable outcomes.",
    };
  }

  if (hasAnyTerm(query, ["resume", "cv"])) {
    return {
      role: "bob",
      text: "Use the Resume link in the Contact section.\n- It summarizes SDE, AI/ML, and data work.\n- Ask me about projects, skills, or experience for a quick version.",
    };
  }

  return {
    role: "bob",
    text: "I do not have a precise saved answer for that.\nPlease contact Ankan there. He is a quick learner, team player, and adaptable builder, so he would be happy to discuss the right fit directly.",
    actions: contactActions,
  };
}

function formatBobMessage(text: string) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

const Navbar = () => {
  const [isBobOpen, setIsBobOpen] = useState(false);
  const [bobInput, setBobInput] = useState("");
  const [isBobThinking, setIsBobThinking] = useState(false);
  const [bobMessages, setBobMessages] =
    useState<BobMessage[]>(initialBobMessages);

  const handleBobSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedInput = bobInput.trim();

    if (!trimmedInput || isBobThinking) return;

    const nextMessages: BobMessage[] = [
      ...bobMessages,
      { role: "user", text: trimmedInput },
    ];

    setBobMessages(nextMessages);
    setBobInput("");



    setIsBobThinking(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 40000);

    try {
      const response = await fetch("/api/bob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          message: trimmedInput,
          messages: bobMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("Bob API is unavailable");
      }

      const data = (await response.json()) as {
        reply?: string;
        actions?: BobAction[];
      };
      const reply = data.reply?.trim();

      if (!reply) {
        throw new Error("Bob returned an empty reply");
      }

      setBobMessages((current) => [
        ...current,
        { role: "bob", text: reply, actions: data.actions },
      ]);
    } catch {
      setBobMessages((current) => [
        ...current,
        getBobReply(trimmedInput, bobMessages),
      ]);
    } finally {
      window.clearTimeout(timeout);
      setIsBobThinking(false);
    }
  };

  useEffect(() => {
    let viewportFrame = 0;

    const updateVisualViewportTop = () => {
      if (viewportFrame) return;

      viewportFrame = window.requestAnimationFrame(() => {
        const viewportTop = window.visualViewport?.offsetTop ?? 0;
        document.documentElement.style.setProperty(
          "--visual-viewport-top",
          `${Math.max(0, viewportTop)}px`
        );
        viewportFrame = 0;
      });
    };

    updateVisualViewportTop();
    window.visualViewport?.addEventListener("resize", updateVisualViewportTop, {
      passive: true,
    });
    window.visualViewport?.addEventListener("scroll", updateVisualViewportTop, {
      passive: true,
    });
    window.addEventListener("resize", updateVisualViewportTop, {
      passive: true,
    });

    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
    return () => {
      window.visualViewport?.removeEventListener(
        "resize",
        updateVisualViewportTop
      );
      window.visualViewport?.removeEventListener(
        "scroll",
        updateVisualViewportTop
      );
      window.removeEventListener("resize", updateVisualViewportTop);
      if (viewportFrame) window.cancelAnimationFrame(viewportFrame);
    };
  }, []);
  return (
    <>
      <div className="header">
        <a
          href="/#"
          className="navbar-title"
          data-profile-note="Hi, I'm Ankan. Thanks for exploring my work."
          data-cursor="disable"
        >
          <img src="/images/profile-nav.png" alt="Ankan Ghosh" />
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
        <div className="bob-assistant">
          {!isBobOpen && (
            <span className="bob-assistant-hint">Ask about Ankan</span>
          )}
          <button
            type="button"
            className="bob-assistant-button"
            aria-expanded={isBobOpen}
            aria-label="Open Bob personal assistant"
            data-cursor="disable"
            onClick={() => setIsBobOpen((current) => !current)}
          >
            <img
              className="bob-assistant-icon"
              src="/images/bob-icon.webp"
              alt=""
              aria-hidden="true"
            />
            <span>Bob</span>
          </button>
          {isBobOpen && (
            <div className="bob-assistant-card">
              <div className="bob-assistant-card-header">
                <strong>
                  <img src="/images/bob-icon.webp" alt="" aria-hidden="true" />
                  <span>Bob</span>
                </strong>
                <span>Personal assistant</span>
              </div>
              <div className="bob-chat-messages">
                {bobMessages.map((message, index) => (
                  <div
                    className={`bob-chat-message bob-chat-message-${message.role}`}
                    key={`${message.role}-${index}-${message.text}`}
                  >
                    <span>{formatBobMessage(message.text)}</span>
                    {message.actions && message.actions.length > 0 && (
                      <div className="bob-chat-actions">
                        {message.actions.map((action) => (
                          <a
                            href={action.href}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="disable"
                            key={`${action.label}-${action.href}`}
                          >
                            {action.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isBobThinking && (
                  <div
                    className="bob-chat-message bob-chat-message-bob bob-chat-loading"
                    aria-label="Loading"
                    role="status"
                  >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </div>
                )}
              </div>
              <form
                className="bob-chat-form"
                onSubmit={handleBobSubmit}
                data-cursor="disable"
              >
                <input
                  type="text"
                  value={bobInput}
                  onChange={(event) => setBobInput(event.target.value)}
                  placeholder="Ask Bob..."
                  aria-label="Ask Bob"
                />
                <button type="submit" disabled={isBobThinking}>
                  {isBobThinking ? "..." : "Send"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
