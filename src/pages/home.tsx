// UI ONLY CHANGE
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
              Hey, I'm Raghava — I build things with code & curiosity
            </h1>
            <p className="hero-subtitle handwritten">
              Developer, tinkerer, and lifelong learner. Welcome to my notebook — a collection of projects, experiments, and things I care about.
            </p>
            <div className="hero-cta">
              <Link to="/services" className="btn btn-primary">
                See My Projects
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Read My Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="section services-overview">
        <div className="container">
          <div className="section-title">
            <h2>Things I've Built</h2>
            <p>A few projects I'm proud of</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <h3>Smart Study Planner</h3>
              <p>An AI-powered study schedule generator that adapts to your learning style and available time.</p>
            </div>
            <div className="service-card">
              <h3>Code Sketch Pad</h3>
              <p>A browser-based code playground with real-time preview, built from scratch with vanilla JS.</p>
            </div>
            <div className="service-card">
              <h3>Data Story Teller</h3>
              <p>Interactive data visualization dashboard that turns raw CSV files into compelling visual narratives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-preview">
        <div className="container">
          <div className="section-title">
            <h2>Kind Words</h2>
            <p>Nice things people have said</p>
          </div>
          <div className="team-grid">
            <div className="team-member note-cream">
              <h4>"Raghava has an incredible eye for detail and a genuine passion for clean code."</h4>
              <p className="role handwritten">— A mentor</p>
            </div>
            <div className="team-member note-sage">
              <h4>"Working with Raghava was a breeze. Creative solutions, every time."</h4>
              <p className="role handwritten">— A teammate</p>
            </div>
            <div className="team-member note-blue">
              <h4>"One of the most curious and driven developers I know."</h4>
              <p className="role handwritten">— A friend</p>
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
