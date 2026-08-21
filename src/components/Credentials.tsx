import { motion } from "framer-motion";
import "./styles/Credentials.css";

const Credentials = () => {
  return (
    <section className="credentials-section section-container" id="credentials">
      <div className="credentials-container">
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>

        <div className="hybrid-layout">
          
          {/* LEFT SIDE - STORY / TEXT */}
          <motion.div 
            className="hybrid-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3>Computer Science<br/><span className="text-cyan">& Engineering</span></h3>
            <p>
              Pursuing my B.Tech at <span className="text-highlight">Lovely Professional University</span> with a deep focus on software development, bridging the gap between theoretical algorithms and scalable system architecture.
            </p>
            <p>
              Beyond the core curriculum, I dedicate my academic career to exploring modern backend systems, cloud infrastructure, and building production-grade applications that solve real-world problems.
            </p>
          </motion.div>

          {/* RIGHT SIDE - TERMINAL */}
          <motion.div 
            className="terminal-window"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {/* Mac-style Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="terminal-title">ankan@macbook: ~/education</div>
            </div>
            
            {/* Terminal Body with Code Syntax */}
            <div className="terminal-body">
              <pre>
                <code>
<span className="syntax-keyword">const</span> <span className="syntax-variable">education</span> <span className="syntax-operator">=</span> {"{\n"}
{"  "}<span className="syntax-key">university</span>: <span className="syntax-string">"LOVELY PROFESSIONAL UNIVERSITY"</span>,{"\n"}
{"  "}<span className="syntax-key">degree</span>: <span className="syntax-string">"B.Tech in Computer Science & Eng"</span>,{"\n"}
{"  "}<span className="syntax-key">period</span>: <span className="syntax-string">"2023 - 2027"</span>,{"\n"}
{"  "}<span className="syntax-key">gpa</span>: <span className="syntax-number">8.16</span> <span className="syntax-comment">/* out of 10.0 */</span>,{"\n"}
{"  "}<span className="syntax-key">coursework</span>: {"[\n"}
{"    "}<span className="syntax-string">"DSA"</span>, <span className="syntax-string">"OS"</span>, <span className="syntax-string">"DBMS"</span>,{"\n"}
{"    "}<span className="syntax-string">"Networks"</span>, <span className="syntax-string">"OOP"</span>{"\n"}
{"  ]"}{"\n"}
{"}"};<span className="terminal-cursor">_</span>
                </code>
              </pre>
            </div>
          </motion.div>
          
        </div>

      </div>
    </section>
  );
};

export default Credentials;
