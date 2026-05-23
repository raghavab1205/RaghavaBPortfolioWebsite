// UI ONLY CHANGE
// CONTENT FILL
import React from 'react';
import { Link } from 'react-router-dom';
import './services.css';

const Services: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Supply Chain Demand Forecasting',
      icon: '📈',
      description: 'A live project analyzing real-world sales data to predict product demand',
      details:
        'I worked on a real-world supply chain project where I collected and analyzed historical sales data, trained multiple forecasting models, and compared their performance. The goal was to help the company predict product demand accurately to optimize inventory management.',
      github: 'https://github.com/raghavab1205/Demand_Forecasting-For_SCM',
    },
    {
      id: 2,
      title: 'Smart SAT',
      icon: '🛰️',
      description: 'A chatbot that makes complex satellite data accessible through natural language',
      details:
        'Built a chatbot interface that helps students and researchers understand unformatted satellite data directly through conversation. You can ask questions in plain English and get insights from complex datasets, making data exploration intuitive and accessible.',
      github: 'https://github.com/raghavab1205/Smart-SAT/tree/master',
    },
    {
      id: 3,
      title: 'Chess AI Website',
      icon: '♟️',
      description: 'A chess platform with AI opponent and an interactive teaching system',
      details:
        'Created a website where you can play chess against a home-built AI trained in Magnus Carlsen style. The platform includes a teaching AI that suggests the top 3-5 moves with visual explanations, helping you understand the game strategy as you play.',
      github: 'https://github.com/raghavab1205/ChessAIWebsite',
    },
  ];

  const skills = [
    {
      category: 'Machine Learning & Data Science',
      items: ['Model Training', 'Data Analysis', 'Feature Engineering', 'Model Evaluation'],
    },
    {
      category: 'Programming Languages',
      items: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
    },
    {
      category: 'Web Development',
      items: ['React', 'Node.js', 'Frontend Design', 'Full-Stack Development'],
    },
    {
      category: 'Tools & Platforms',
      items: ['Git & GitHub', 'Jupyter Notebooks', 'Google Colab', 'VS Code'],
    },
    {
      category: 'Soft Skills',
      items: ['Problem Solving', 'Analytical Thinking', 'Technical Documentation', 'Team Collaboration'],
    },
  ];

  return (
    <div className="services-page">
      {/* Page Header */}
      <section className="section services-header">
        <div className="container">
          <div className="section-title">
            <h1>Projects</h1>
            <p className="handwritten">Things I've built, broken, and rebuilt</p>
          </div>
        </div>
      </section>

      {/* Main Projects */}
      <section className="section services-main">
        <div className="container">
          <div className="services-list">
            {projects.map((project) => (
              <div key={project.id} className="service-detailed">
                <div className="service-icon-large">{project.icon}</div>
                <div className="service-content">
                  <h3>{project.title}</h3>
                  <p className="service-description handwritten">{project.description}</p>
                  <p className="service-details">{project.details}</p>
                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-link"
                    >
                      View on GitHub →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section skills-section">
        <div className="container">
          <div className="section-title">
            <h2>Skills & Expertise</h2>
            <p className="handwritten">What I work with</p>
          </div>

          <div className="skills-grid">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="skill-card">
                <h4>{skillGroup.category}</h4>
                <ul className="skill-list">
                  {skillGroup.items.map((skill, sidx) => (
                    <li key={sidx}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Want to talk about a project or collab?</h2>
            <p className="handwritten">I love hearing about interesting problems to solve</p>
            <Link to="/contact" className="cta-btn">
              Go to Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
