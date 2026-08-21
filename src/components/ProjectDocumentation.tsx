import {
  MdArrowBack,
  MdArrowForward,
  MdArrowOutward,
} from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";
import { getProjectDoc } from "../data/projectDocs";
import "./styles/ProjectDocumentation.css";

type ProjectDocumentationProps = {
  slug: string;
};

const ProjectDocumentation = ({ slug }: ProjectDocumentationProps) => {
  const project = getProjectDoc(slug);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryAutoplay, setGalleryAutoplay] = useState(true);
  const [loadedGallerySources, setLoadedGallerySources] = useState<
    Record<string, boolean>
  >({});
  const galleryPreloadRef = useRef<Record<string, Promise<void>>>({});

  useEffect(() => {
    document.body.style.overflowY = "auto";
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    setGalleryIndex(0);
    setGalleryAutoplay(true);
    setLoadedGallerySources({});
    galleryPreloadRef.current = {};
  }, [slug]);

  useEffect(() => {
    if (!project?.gallery?.length) return;

    project.gallery.forEach((item, index) => {
      const image = new Image();
      image.src = item.src;

      if (image.complete) {
        setLoadedGallerySources((current) =>
          current[item.src] ? current : { ...current, [item.src]: true }
        );
        return;
      }

      image.onload = () => {
        setLoadedGallerySources((current) =>
          current[item.src] ? current : { ...current, [item.src]: true }
        );
      };

      if (index === 0) {
        image.onerror = () => {
          setLoadedGallerySources((current) =>
            current[item.src] ? current : { ...current, [item.src]: true }
          );
        };
      }
    });
  }, [project]);

  const preloadGalleryImage = useCallback((src: string) => {
    if (loadedGallerySources[src]) return Promise.resolve();

    const existingPreload = galleryPreloadRef.current[src];
    if (existingPreload) return existingPreload;

    const preloadPromise = new Promise<void>((resolve) => {
      const image = new Image();
      image.src = src;

      const markComplete = () => {
        setLoadedGallerySources((current) =>
          current[src] ? current : { ...current, [src]: true }
        );
        resolve();
      };

      if (image.complete) {
        markComplete();
        return;
      }

      image.onload = markComplete;
      image.onerror = markComplete;
    }).finally(() => {
      delete galleryPreloadRef.current[src];
    });

    galleryPreloadRef.current[src] = preloadPromise;
    return preloadPromise;
  }, [loadedGallerySources]);

  const goToGallerySlide = useCallback((index: number, manual = false) => {
    const nextGalleryItem = project?.gallery?.[index];
    if (!nextGalleryItem) return;

    if (manual) setGalleryAutoplay(false);

    void preloadGalleryImage(nextGalleryItem.src).then(() => {
      setGalleryIndex(index);
    });
  }, [preloadGalleryImage, project]);

  useEffect(() => {
    if (!project?.gallery?.length || !galleryAutoplay) return;

    const intervalId = window.setInterval(() => {
      const nextIndex = (galleryIndex + 1) % project.gallery!.length;
      goToGallerySlide(nextIndex);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [galleryAutoplay, galleryIndex, goToGallerySlide, project]);

  const galleryLength = project?.gallery?.length ?? 0;
  const activeGalleryItem =
    galleryLength > 0 ? project?.gallery?.[galleryIndex] : undefined;

  const goToPrevGallerySlide = () => {
    if (!galleryLength) return;
    goToGallerySlide(
      galleryIndex === 0 ? galleryLength - 1 : galleryIndex - 1,
      true
    );
  };

  const goToNextGallerySlide = () => {
    if (!galleryLength) return;
    goToGallerySlide((galleryIndex + 1) % galleryLength, true);
  };

  if (!project) {
    return (
      <main className="project-doc-page">
        <section className="project-doc-shell project-doc-missing">
          <a href="/#work" className="project-doc-back">
            <MdArrowBack /> Back to portfolio
          </a>
          <h1>Project documentation not found</h1>
          <p>The selected project case study is not available.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="project-doc-page">
      <section className="project-doc-hero">
        <div className="project-doc-shell">
          <a href="/#work" className="project-doc-back" data-cursor="disable">
            <MdArrowBack /> Back to portfolio
          </a>
          <p className="project-doc-eyebrow">Project documentation</p>
          <h1>{project.title}</h1>
          <p className="project-doc-category">{project.category}</p>
          <p className="project-doc-summary">{project.summary}</p>
          <div className="project-doc-stack">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="project-doc-shell project-doc-car">
        <article>
          <span>C</span>
          <h2>Context</h2>
          <p>{project.context}</p>
        </article>
        <article>
          <span>A</span>
          <h2>Action</h2>
          <p>{project.action}</p>
        </article>
        <article>
          <span>R</span>
          <h2>Result</h2>
          <p>{project.result}</p>
        </article>
      </section>

      <section className="project-doc-shell project-doc-impact">
        <div>
          <p className="project-doc-eyebrow">Recruiter takeaway</p>
          <h2>Why this project matters</h2>
        </div>
        <div className="project-doc-impact-grid">
          {project.impact.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="project-doc-shell project-doc-gallery">
          <div className="project-doc-gallery-header">
            <div>
              <p className="project-doc-eyebrow">Product walkthrough</p>
              <h2>What the platform looks like in action</h2>
            </div>
            <p>
              Key screens from the product journey, including onboarding,
              dashboards, workflows, and operational detail views.
            </p>
          </div>

          <div className="project-doc-gallery-carousel">
            <button
              className="project-doc-gallery-arrow project-doc-gallery-arrow-left"
              onClick={goToPrevGallerySlide}
              aria-label="Previous gallery image"
              data-cursor="disable"
            >
              <MdArrowBack />
            </button>

            <button
              className="project-doc-gallery-arrow project-doc-gallery-arrow-right"
              onClick={goToNextGallerySlide}
              aria-label="Next gallery image"
              data-cursor="disable"
            >
              <MdArrowForward />
            </button>

            {activeGalleryItem && (
              <figure className="project-doc-gallery-card">
                <div className="project-doc-gallery-image-shell">
                  <img
                    src={activeGalleryItem.src}
                    alt={`${project.title} - ${activeGalleryItem.title}`}
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <div className="project-doc-gallery-meta">
                    <span>
                      {String(galleryIndex + 1).padStart(2, "0")} /{" "}
                      {String(galleryLength).padStart(2, "0")}
                    </span>
                    {galleryAutoplay && (
                      <span className="project-doc-gallery-badge">
                        Auto-playing
                      </span>
                    )}
                  </div>
                  <h3>{activeGalleryItem.title}</h3>
                  <p>{activeGalleryItem.caption}</p>
                </figcaption>
              </figure>
            )}
          </div>

          <div className="project-doc-gallery-dots">
            {project.gallery.map((item, index) => (
              <button
                key={item.src}
                className={`project-doc-gallery-dot ${
                  index === galleryIndex
                    ? "project-doc-gallery-dot-active"
                    : ""
                }`}
                onClick={() => goToGallerySlide(index, true)}
                aria-label={`Go to gallery image ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </section>
      )}

      <section className="project-doc-shell project-doc-actions">
        <a href={project.github} target="_blank" rel="noreferrer">
          <FaGithub /> GitHub
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer">
            <MdArrowOutward /> Live site
          </a>
        )}
      </section>
    </main>
  );
};

export default ProjectDocumentation;
