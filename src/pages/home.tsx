// UI ONLY CHANGE
// CONTENT FILL
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero paper-ruled">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hey, I'm Raghava — I train models, break things, and occasionally ship them.
            </h1>
            <p className="hero-subtitle handwritten">
              Final-year AI/ML student building end-to-end ML pipelines and full-stack web apps. From OCR models to MERN stacks, welcome to my notebook.
            </p>
            <div className="hero-cta">
              <Link to="/services" className="btn btn-primary">
                See My Projects
              </Link>
              <Link to="/about" className="btn btn-secondary">
                About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Overview -> Featured Projects */}
      <section className="section services-overview">
        <div className="container">
          <div className="section-title">
            <h2>Things I've Built</h2>
            <p>A few projects I'm proud of</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <h3>Supply Chain Demand Forecasting</h3>
              <p>Built an AI-powered forecasting system designed to help businesses predict future product demand using historical sales patterns and market trends. The project focused on improving planning efficiency and reducing inventory uncertainty through intelligent forecasting.</p>
            </div>
            <div className="service-card">
              <h3>SMARTSAT Browser Extension</h3>
              <p>Developed an AI-assisted browser extension that helps users explore and understand satellite and space-related data more easily through natural language search and intelligent information retrieval.</p>
            </div>
            <div className="service-card">
              <h3>Chess AI Platform</h3>
              <p>Created an interactive chess platform where users can play against an AI agent trained to analyze moves, learn strategies, and make competitive decisions in real time.</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Want to collaborate?</h2>
            <p className="handwritten">I'm always up for interesting projects and conversations.</p>
            <Link to="/contact" className="cta-btn">
              Drop me a note
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
