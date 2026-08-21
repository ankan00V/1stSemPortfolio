import { useState } from "react";
import "./styles/Achievements.css";

const achievements = [
  {
    icon: "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/naukri-app-icon-hd.png",
    title: "All India Rank #122",
    description:
      "Naukri Campus Young Turks 2025. Top 500 / 500,000+ participants nationally (Coding, DS & AI track).",
    link: "/achievements/naukri-verification.pdf"
  },
  {
    icon: "/achievements/gemini-logo-v2.png",
    title: "Google Gemini Student Ambassador",
    description:
      "Selected as a campus ambassador for Google Gemini through a competitive national selection process. Organized hackathons, seminars, webinars, and workshops reaching 150–350 participants per event; earned program rewards for sustained performance over the 6-month tenure.",
    link: "/achievements/google-gemini-verification.pdf"
  },
  {
    icon: "https://media.licdn.com/dms/image/v2/C4E0BAQGORcTJeJN-Wg/company-logo_200_200/company-logo_200_200/0/1630615958916?e=2147483647&v=beta&t=PBpfT5hhSgcTv4RKhQzCva38NTOE_eoeADRvRtcxl-A",
    title: "AlgoUniversity Accelerator Graph Camp",
    description:
      "Selected Top 50 nationally from 40,000+ via competitive coding contest; ranked 2nd at LPU among all campus qualifiers.",
    link: "/achievements/algo-verification.pdf"
  },
  {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdA_d-eRFCRR-hyw70w83WfUSgbHrkBdblSA&s",
    title: "Dean's List",
    description:
      "Recipient at Lovely Professional University. Placed in the Top 10% of batch by academic performance.",
    link: "/achievements/lpu-deans-verification.png"
  },
  {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdmteb74ZG6J87N4xajIawz5Vy0-ZefG5B6w&s",
    title: "McKinsey Forward Program",
    description:
      "Selected for the highly competitive McKinsey Forward Program, focusing on leadership, business strategy, and problem-solving.",
    link: "/achievements/mckinsey-verification.png"
  },
];

const Achievements = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="achievements-section section-container" id="achievements">
      <div className="achievements-header">
        <h2>
          National <span>Ranks &</span><br />Honors
        </h2>
      </div>
      <div className="achievements-accordion">
        {achievements.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <article 
              className={`accordion-card ${isActive ? 'active' : ''}`} 
              key={index}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="accordion-watermark">0{index + 1}</div>
              
              <div className="accordion-content-wrapper">
                <div className="accordion-icon">
                  <img src={item.icon} alt={item.title} />
                </div>
                
                <div className={`accordion-text ${isActive ? 'visible' : ''}`}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="achievement-verification-link"
                  >
                    View here
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Achievements;
