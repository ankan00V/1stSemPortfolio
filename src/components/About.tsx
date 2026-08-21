import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I’m Ankan Ghosh, a Computer Science grad focused on building scalable
          AI and backend systems.
          <br />
          <br />
          My work spans recommendation systems, RAG pipelines, and real-time data
          platforms, with an emphasis on experimentation (A/B testing), ranking
          systems, and high-performance APIs.
          <br />
          <br />I build production-grade systems using Python, FastAPI,
          PostgreSQL, MongoDB, Redis, and modern ML frameworks.
        </p>
      </div>
    </div>
  );
};

export default About;
