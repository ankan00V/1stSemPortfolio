import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import ResumeChooser from "./ResumeChooser";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://www.linkedin.com/in/ghoshankan"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — ghoshankan
              </a>
            </p>
            <p>
              <a
                href="mailto:ghoshankan005@gmail.com"
                data-cursor="disable"
              >
                ghoshankan005@gmail.com
              </a>
            </p>
            <p>Phagwara, Punjab, India</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <p className="contact-cta">
              Open to AI, Data, and Software Engineering roles.
            </p>
            <a
              href="https://github.com/ankan00V"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/ghoshankan"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="mailto:ghoshankan005@gmail.com"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
            <a
              href="https://medium.com/@ghoshankan005"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Medium <MdArrowOutward />
            </a>
            <ResumeChooser
              triggerClassName="contact-social resume-choice-trigger"
              trigger={
                <>
                  Resume <MdArrowOutward />
                </>
              }
            />
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Ankan Ghosh</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
