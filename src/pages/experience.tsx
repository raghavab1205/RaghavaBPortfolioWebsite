// UI ONLY CHANGE
// CONTENT FILL
import React from 'react';
import { Link } from 'react-router-dom';
import './experience.css';

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      company: 'AceMicromatic Manufacturing Intelligence Technologies Pvt. Ltd.',
      position: 'ML Intern',
      duration: 'Feb 2026 – May 2026',
      type: 'Internship',
      icon: '🤖',
      bullets: [
        'Architected end-to-end AI pipelines to extract structured data from engineering drawings including handwritten notes and complex tabular data',
        'Built a robust OCR pipeline with dynamic routing logic to handle low-quality and small-text inputs',
        'Conducted comparative evaluation of CNN architectures for GD&T symbol classification, exported optimized models to ONNX',
        'Formulated a confidence scoring framework for VLM outputs using heuristic ensemble methods',
      ],
    },
    {
      id: 2,
      company: 'SoftServe Global',
      position: 'Software Developer Intern',
      duration: 'Feb 2025 – Apr 2025',
      type: 'Internship',
      icon: '💻',
      bullets: [
        'Developed features for internal enterprise platforms People XP and Timesheets using the MERN stack',
        'Engineered reusable React components and optimized Node.js / Express APIs integrated with MongoDB',
        'Resolved 30+ reported issues and delivered 10+ enhancements within Agile development sprints',
      ],
    },
  ];

  const skillCategories = [
    {
      category: 'ML',
      items: ['TensorFlow', 'PyTorch', 'Keras', 'scikit-learn', 'YOLO', 'OpenCV', 'ONNX'],
    },
    {
      category: 'Data',
      items: ['NumPy', 'Pandas', 'SHAP', 'Feature Engineering', 'Model Evaluation'],
    },
    {
      category: 'Web',
      items: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Flask', 'TypeScript'],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub', 'Jupyter', 'VS Code', 'Google Colab', 'PyCharm'],
    },
  ];

  return (
    <div className="experience-page">
      {/* Page Header */}
      <section className="section experience-header">
        <div className="container">
          <div className="section-title">
            <h1>Experience</h1>
            <p className="handwritten">Places I've worked, things I've learned, and the path so far.</p>
          </div>
        </div>
      </section>

      {/* Main Experience */}
      <section className="section experience-main">
        <div className="container">
          <div className="experience-list">
            {experiences.map((exp) => (
              <div key={exp.id} className="experience-detailed">
                <div className="experience-icon-large">{exp.icon}</div>
                <div className="experience-content">
                  <div className="experience-header-info">
                    <div>
                      <h3>{exp.position}</h3>
                      <p className="company-name">{exp.company}</p>
                      <p className="duration-text">{exp.duration}</p>
                    </div>
                    <span className="type-badge">{exp.type}</span>
                  </div>
                  <ul className="bullets-list">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
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
            <h2>Skills & Tools</h2>
            <p className="handwritten">What I work with</p>
          </div>

          <div className="skills-grid">
            {skillCategories.map((skillGroup, idx) => (
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
            <h2>Want to talk about working together?</h2>
            <p className="handwritten">I love hearing about interesting opportunities and challenges</p>
            <Link to="/contact" className="btn cta-btn">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
