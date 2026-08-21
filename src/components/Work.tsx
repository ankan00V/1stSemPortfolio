import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import {
  MdArrowBack,
  MdArrowForward,
  MdArrowOutward,
  MdDescription,
} from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "VidyaVerse",
    category: "Ivy League Opportunity Intelligence Platform",
    tools: "FastAPI, Next.js, MongoDB, Redis, Playwright, NLP, Vector Search, RAG",
    image: "/images/vidyaverse-preview.png",
    github: "https://github.com/ankan00V/Ivy-League-Portal",
    docs: "/#/project-docs/vidyaverse",
  },
  {
    title: "LPU Smart Campus",
    category: "Campus Management and Attendance Intelligence",
    tools: "FastAPI, PostgreSQL, MongoDB, Redis, Docker, OpenCV, CI/CD",
    image: "/images/lpu-smart-campus-preview.png",
    github: "https://github.com/ankan00V/LPU-smart-campus",
    docs: "/#/project-docs/lpu-smart-campus",
  },
  {
    title: "Verdikt",
    category: "AI Investment Research Agent",
    tools: "TypeScript, Next.js, LangGraph.js, NVIDIA NIM (Llama 3.3), Upstash Redis",
    image: "/images/verdikt-preview.png",
    github: "https://github.com/ankan00V/Verdikt",
    live: "https://verdikt-ashy.vercel.app",
    docs: "/#/project-docs/verdikt",
  },
  {
    title: "Public Policy Analytics",
    category: "Government Welfare Data Analysis",
    tools: "Python, Pandas, NumPy, Excel, Power BI, Correlation and Time Series",
    image: "/images/policy-analytics-preview.png",
    github:
      "https://github.com/ankan00V/Samavesh-Visualizing-Social-Inclusion-in-India",
    docs: "/#/project-docs/public-policy-analytics",
  },
  {
    title: "Explore More Projects",
    category: "Additional systems, experiments, and engineering work",
    tools:
      "Visit my GitHub for more full-stack, AI/data, backend, and infrastructure projects.",
    image: "/images/github-profile-preview.png",
    github: "https://github.com/ankan00V",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <div className="project-actions">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="disable"
                          >
                            <FaGithub />
                            <span>GitHub</span>
                          </a>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="disable"
                            >
                              <MdArrowOutward />
                              <span>Live</span>
                            </a>
                          )}
                          {project.docs && (
                            <a href={project.docs} data-cursor="disable">
                              <MdDescription />
                              <span>Documentation</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.live ?? project.github}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
