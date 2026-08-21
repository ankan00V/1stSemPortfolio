import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./styles/Career.css";

const jobs = [
  {
    role: "SDE Intern",
    company: "Aviva Infotech / NIIT IEB",
    date: "Jun 2026 - Present",
    desc: [
      "Delivered production REST API connectors and LLM backend pipelines (FastAPI) from requirement to deployment within 2-week sprints.",
      "Owned scope, implementation, and handoff of AI services, collaborating closely with data science and engineering teams.",
      "Reduced integration ambiguity across 3 teams by authoring API contracts, solution specs, and technical documentation."
    ]
  },
  {
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code (GSSoC)",
    date: "May 2026 - Present",
    desc: [
      "Merged 10+ pull requests across 3 production AI repositories (AegisAI, ZerithDB, MooVit) in active sprint cycles.",
      "Delivered FastAPI schema validation, Pydantic auth middleware, MongoDB query operators, and React/TypeScript UI components.",
      "Shipped session auth for an AI-GRC platform and inference pipeline fixes for a computer-vision safety assistant."
    ]
  },
  {
    role: "IT Analyst Intern",
    company: "Eastern Coalfields Limited",
    date: "Jul-Aug 2025",
    desc: [
      "Eliminated 3 hours of daily manual SAP reporting across 2 departments by engineering an automated Python ETL pipeline.",
      "Reduced data errors from 12% to under 2% (improving accuracy by 15%) by applying systematic dataset validation.",
      "Cut report delivery time from 24 hours to 1 hour per cycle via automated Power BI dashboards and REST APIs."
    ]
  },
  {
    role: "AI/Data Systems Builder",
    company: "Independent Projects",
    date: "PRESENT",
    desc: [
      "Architected VidyaVerse's RAG pipeline processing 15,700+ interactions, lifting CTR by 58% and apply-rate by 153%.",
      "Built LPU Smart Campus with 210 FastAPI endpoints, sub-100ms latency, and 92.7% test coverage across 450 tests.",
      "Engineered scalable backends using PostgreSQL, MongoDB, Redis pub/sub, Docker CI/CD, and LightGBM ranking models."
    ]
  }
];

const JobItem = ({ job }: { job: any }) => {
  const ref = useRef(null);
  
  // Track if the element has EVER entered the viewport to avoid animating from 0 multiple times
  const hasEntered = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });
  
  // Track if it's currently in the exact center of the screen.
  // Using a 2% band (-49% top, -49% bottom) ensures the trigger area is smaller than the 50px gap between cards,
  // guaranteeing that only ONE card can ever intersect it at a time.
  const isCentered = useInView(ref, { margin: "-49% 0px -49% 0px" });

  return (
    <motion.div 
      ref={ref}
      className={`career-info-box ${isCentered ? 'active-job' : 'inactive-job'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={
        hasEntered 
          ? { 
              opacity: isCentered ? 1 : 0.3, 
              scale: isCentered ? 1 : 0.95,
              filter: isCentered ? "blur(0px)" : "blur(1.5px)",
              y: 0 
            }
          : { opacity: 0, y: 50 }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="career-info-in">
        <div className="career-role">
          <h4>{job.role}</h4>
          <h5>{job.company}</h5>
        </div>
        <h3>{job.date}</h3>
      </div>
      <div className="career-desc">
        <ul>
          {job.desc.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Experience <span>&</span>
          <br /> impact
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          {jobs.map((job, idx) => (
            <JobItem key={idx} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
