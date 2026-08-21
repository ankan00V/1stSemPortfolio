import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./styles/Certifications.css";
import { smoother } from "./Navbar";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const certifications = [
  {
    name: "Oracle Autonomous Database Cloud 2025 Certified Professional",
    issuer: "Oracle",
    image: "/images/certs/oracle-autonomous-db-cloud.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=5A143C56ED732A14792B0EB3FB5A46F153DED15BB66C76B9761606A45B210AB1"
  },
  {
    name: "OCI 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    image: "/images/certs/oracle-oci-genai-professional.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=59F1CF46A227CC88A89F81C0C41503122601EAC1AEC9D60C7968ACD554A615AE"
  },
  {
    name: "OCI 2025 Certified Data Science Professional",
    issuer: "Oracle",
    image: "/images/certs/oracle-oci-data-science.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=8A9407DE2F864DB914C5354E951F195AADCACA9C27739096E853AB55940D953D"
  },
  {
    name: "OCI 2025 Certified Foundations Associate",
    issuer: "Oracle",
    image: "/images/certs/oracle-oci-foundations-associate.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=735A5720FEC1F07312B97C3A8DC079EB115EF834B1E2B08855958DCA718CE057"
  },
  {
    name: "Oracle Data Platform 2025 Certified Foundations Associate",
    issuer: "Oracle",
    image: "/images/certs/oracle-data-platform-foundations.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=8A9407DE2F864DB914C5354E951F195A90848E3AA5CD547C76DD5FA86D53A03B"
  },
  {
    name: "Databricks Accredited Generative AI Fundamentals",
    issuer: "Databricks",
    image: "/images/certs/databricks-genai-fundamentals.png",
    link: "https://credentials.databricks.com/aa1da4cf-a36b-4ad7-9a10-2cbaa8400584#acc.acJIv4mw"
  },
  {
    name: "Oracle Certified Associate, Java SE 8 Programmer",
    issuer: "Oracle",
    image: "/images/certs/oracle-java-se8-associate.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=5B38610EC59B7E4DBC03ED8A5415455AACFE937666E73591DB490CB6DA72E76A"
  },
  {
    name: "Oracle AI Vector Search Certified Professional",
    issuer: "Oracle",
    image: "/images/certs/oracle-ai-vector-search.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=B72792E952C7309416233D2A2C683E55FC6800BBF1FB9FB03A782CFE0C008C7D"
  },
  {
    name: "Oracle Agentic AI Certified Foundations Associate",
    issuer: "Oracle",
    image: "/images/certs/oracle-agentic-ai-foundations.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=B83BC38249E1A4B81ECB306010CDD3D853688B681CD5B8795FCB895167FC35EE"
  }
];

interface SelectedCert {
  name: string;
  issuer: string;
  image: string;
  link: string;
}

const Certifications = () => {
  const [selected, setSelected] = useState<SelectedCert | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...certifications, ...certifications, ...certifications]; // Add a third set just to ensure enough length for scrolling

  // Auto scroll logic
  useEffect(() => {
    if (!isAutoScrolling) return;
    let animationId: number;
    let lastTime = performance.now();
    let isVisible = true;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    if (trackRef.current) observer.observe(trackRef.current);
    
    const scroll = (time: number) => {
      if (isVisible) {
        const delta = time - lastTime;
        if (delta > 16 && trackRef.current) {
          trackRef.current.scrollLeft += 1;
          // The track contains 3 sets of items.
          // If we scrolled past 1/3 of the scrollWidth (one full set), jump back to 0.
          if (trackRef.current.scrollLeft >= trackRef.current.scrollWidth / 3) {
            trackRef.current.scrollLeft = 0;
          }
          lastTime = time;
        }
      } else {
        lastTime = time;
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [isAutoScrolling]);

  const handleManualScroll = (direction: "left" | "right") => {
    setIsAutoScrolling(false);
    if (trackRef.current) {
      // scroll by roughly one card width (380px + 32px gap = 412px)
      trackRef.current.scrollBy({ 
        left: direction === "left" ? -412 : 412, 
        behavior: "smooth" 
      });
    }
  };

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selected) {
      if (smoother) smoother.paused(true);
    } else {
      if (smoother) smoother.paused(false);
    }
    return () => {
      if (smoother) smoother.paused(false);
    };
  }, [selected]);

  // Close on Escape key
  useEffect(() => {
    if (!selected) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  return (
    <section className="certifications-section section-container">
      <div className="certifications-header">
        <h2>Certifications</h2>
        <p className="certifications-subtitle">
          Industry-recognized credentials
        </p>
      </div>
      <div className="certifications-carousel-container">
        <button
          className="carousel-arrow cert-arrow-left"
          onClick={() => handleManualScroll("left")}
          aria-label="Previous certification"
          data-cursor="disable"
        >
          <MdArrowBack />
        </button>
        <button
          className="carousel-arrow cert-arrow-right"
          onClick={() => handleManualScroll("right")}
          aria-label="Next certification"
          data-cursor="disable"
        >
          <MdArrowForward />
        </button>

        <div className="certifications-fade certifications-fade--left" />
        
        <div className="certifications-track-wrapper" ref={trackRef}>
          <div className="certifications-track">
            {items.map((cert, i) => (
              <article
                className="cert-card"
                key={`${cert.name}-${i}`}
                onClick={() => setSelected(cert)}
              >
                <div className="cert-card-image">
                  <img src={cert.image} alt={cert.name} loading="lazy" />
                </div>
                <div className="cert-card-info">
                  <h3>{cert.name}</h3>
                  <span>{cert.issuer}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="certifications-fade certifications-fade--right" />
      </div>

      {/* Lightbox rendered via portal on document.body */}
      {selected &&
        createPortal(
          <div className="cert-lightbox" onClick={() => setSelected(null)}>
            <div
              className="cert-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cert-lightbox-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <img src={selected.image} alt={selected.name} />
              <div className="cert-lightbox-info">
                <h3>{selected.name}</h3>
                <span>{selected.issuer}</span>
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-verify-link"
                >
                  Verify here
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Certifications;
