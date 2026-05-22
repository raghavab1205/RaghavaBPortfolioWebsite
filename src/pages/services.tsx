// UI ONLY CHANGE
import React from 'react';
import './services.css';

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'Smart Study Planner',
      icon: '📚',
      description: 'An AI-powered study schedule generator that adapts to your learning pace',
      features: [
        'Personalized study plans',
        'Adaptive difficulty scaling',
        'Progress tracking dashboard',
        'Spaced repetition system',
        'Calendar integration',
        'Study streak analytics',
      ],
      details:
        'Built with Python and React, this tool analyzes your learning patterns and creates optimized study schedules. It uses spaced repetition algorithms to help you retain more while studying less.',
    },
    {
      id: 2,
      title: 'Code Sketch Pad',
      icon: '🎨',
      description: 'A browser-based code playground with real-time preview',
      features: [
        'Live HTML/CSS/JS preview',
        'Syntax highlighting',
        'Shareable code snippets',
        'Template gallery',
        'Dark/light themes',
        'Export to CodePen',
      ],
      details:
        'A lightweight, zero-dependency code playground I built from scratch. Write HTML, CSS, and JavaScript in split panes and see your creation come to life instantly. Perfect for quick experiments and sharing ideas.',
    },
    {
      id: 3,
      title: 'Data Story Teller',
      icon: '📈',
      description: 'Interactive data visualization that turns CSV files into stories',
      features: [
        'Drag-and-drop CSV import',
        'Auto chart type detection',
        'Interactive filtering',
        'Export as PNG/SVG',
        'Responsive layouts',
        'Custom color palettes',
      ],
      details:
        'Upload any CSV file and watch it transform into beautiful, interactive visualizations. The app automatically detects data types and suggests the best chart formats. Built with D3.js and vanilla JavaScript.',
    },
  ];

  const projects = [
    {
      id: 1,
      title: 'Markdown Journal',
      description: 'A minimalist daily journaling app with markdown support and local storage',
      tech: ['React', 'LocalStorage', 'Markdown'],
    },
    {
      id: 2,
      title: 'CLI Task Manager',
      description: 'A command-line to-do app with priorities, tags, and natural language date parsing',
      tech: ['Python', 'Click', 'SQLite'],
    },
    {
      id: 3,
      title: 'Weather Mood Board',
      description: 'A creative weather app that generates color palettes and artwork based on current conditions',
      tech: ['JavaScript', 'Canvas API', 'OpenWeather'],
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

      {/* Main Services */}
      <section className="section services-main">
        <div className="container">
          <div className="services-list">
            {services.map((service) => (
              <div key={service.id} className="service-detailed">
                <div className="service-icon-large">{service.icon}</div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p className="service-description handwritten">{service.description}</p>
                  <p className="service-details">{service.details}</p>
                  <h5>What's Included:</h5>
                  <ul className="features-list">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Portfolio */}
      <section className="section portfolio-section">
        <div className="container">
          <div className="section-title">
            <h2>Experiments & Side Quests</h2>
            <p>Small things I made for fun</p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <div className="section-title">
            <h2>How I Work</h2>
            <p>My creative process, roughly</p>
          </div>

          <div className="process-steps">
            <div className="step">
              <div className="step-number handwritten">1</div>
              <h4>Curiosity</h4>
              <p>Start with a question or an itch to build something</p>
            </div>
            <div className="step">
              <div className="step-number handwritten">2</div>
              <h4>Sketch</h4>
              <p>Scribble ideas on paper, no screens yet</p>
            </div>
            <div className="step">
              <div className="step-number handwritten">3</div>
              <h4>Build</h4>
              <p>Code it up, break it, fix it, repeat</p>
            </div>
            <div className="step">
              <div className="step-number handwritten">4</div>
              <h4>Ship</h4>
              <p>Put it out there and see what happens</p>
            </div>
            <div className="step">
              <div className="step-number handwritten">5</div>
              <h4>Learn</h4>
              <p>Gather feedback and make it better</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Got an idea?</h2>
            <p className="handwritten">I love hearing about interesting problems to solve</p>
            <a href="/contact" className="cta-btn">
              Let's talk about it
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
