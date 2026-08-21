import { type ReactNode, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { MdArrowOutward, MdClose } from "react-icons/md";
import "./styles/ResumeChooser.css";

type ResumeChooserProps = {
  trigger: ReactNode;
  triggerClassName: string;
};

const resumeOptions = [
  {
    title: "Data Science / Data Analyst Resume",
    href: "/resumes/ankan-ghosh-data-science-analyst-resume.pdf",
    alignment: "Data Analyst, Data Science Intern, BI, Product/Data Analyst",
    focus: "EDA, SQL, dashboards, Power BI, A/B testing, and business impact metrics.",
    signal: "Built for teams evaluating analytical depth, product judgment, and data-driven decision making.",
  },
  {
    title: "Machine Learning / AI Resume",
    href: "/resumes/ankan-ghosh-ml-ai-resume.pdf",
    alignment: "ML Engineer Intern, AI/GenAI, NLP/CV, research or applied AI roles",
    focus: "RAG, vector search, NLP, model evaluation, ranking metrics, and experimentation.",
    signal: "Positioned for applied AI teams that value model thinking, iteration, and measurable retrieval quality.",
  },
  {
    title: "Software Development / Backend Resume",
    href: "/resumes/ankan-ghosh-sde-backend-resume.pdf",
    alignment: "SDE Intern, Backend Developer, Full Stack, Systems or Platform roles",
    focus: "APIs, system design, microservices, Redis, Docker, scalability, and async processing.",
    signal: "Designed for engineering teams looking for backend ownership, clean execution, and scalable product systems.",
  },
];

const ResumeChooser = ({ trigger, triggerClassName }: ResumeChooserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverflowY = document.body.style.overflowY;
    const previousRootOverflowY = document.documentElement.style.overflowY;
    const restorePageScroll = () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overflowY = previousBodyOverflowY || "auto";
      document.documentElement.style.overflowY = previousRootOverflowY;
      window.dispatchEvent(new Event("resize"));
    };

    document.body.style.overflowY = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pageshow", restorePageScroll);

    return () => {
      restorePageScroll();
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pageshow", restorePageScroll);
    };
  }, [isOpen]);

  const chooser =
    isOpen &&
    createPortal(
      <div
        className="resume-chooser-backdrop"
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
      >
        <section
          className="resume-chooser"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="resume-chooser-header">
            <div>
              <p>Choose the best fit</p>
              <h3 id={titleId}>Download Ankan's resume</h3>
              <span className="resume-chooser-subtitle">
                Select the version that best matches the role you are hiring for.
              </span>
            </div>
            <button
              type="button"
              aria-label="Close resume chooser"
              data-cursor="disable"
              onClick={() => setIsOpen(false)}
            >
              <MdClose />
            </button>
          </div>
          <div className="resume-chooser-grid">
            {resumeOptions.map((option) => (
              <article className="resume-option" key={option.title}>
                <h4>{option.title}</h4>
                <p>
                  <strong>Role alignment:</strong> {option.alignment}
                </p>
                <p>
                  <strong>Core focus:</strong> {option.focus}
                </p>
                <p>
                  <strong>Professional signal:</strong> {option.signal}
                </p>
                <a
                  href={option.href}
                  target="_blank"
                  rel="noreferrer"
                  download
                  data-cursor="disable"
                  onClick={() => setIsOpen(false)}
                >
                  Download <MdArrowOutward />
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>,
      document.body,
    );

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        data-cursor="disable"
        onClick={() => setIsOpen(true)}
      >
        {trigger}
      </button>
      {chooser}
    </>
  );
};

export default ResumeChooser;
