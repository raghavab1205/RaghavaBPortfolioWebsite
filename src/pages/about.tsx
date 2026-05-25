// UI ONLY CHANGE
// CONTENT FILL
import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="section about-header">
        <div className="container">
          <div className="section-title">
            <h1>About Me</h1>
            <p className="handwritten">A page from my journal</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card note-cream">
              <h3>Build things that work</h3>
              <p>
                Not just models that score well on benchmarks, but pipelines that hold up in messy, real-world conditions. (Like handling low-quality inputs in an OCR pipeline.)
              </p>
            </div>
            <div className="mission-card note-sage">
              <h3>Learn by doing</h3>
              <p>
                Every project on this site came from curiosity first. I enjoy building things that sit at the intersection of ML and real-world application.
              </p>
            </div>
            <div className="mission-card note-blue">
              <h3>Keep it readable</h3>
              <p>
                Good code, good docs, and explainability matter. Whether it's adding SHAP to a forecasting model or writing clean React components, future-me will be thankful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section -> Journey Section */}
      <section className="section team-section">
        <div className="container">
          <div className="section-title">
            <h2>My Journey So Far</h2>
            <p>Milestones and experiments along the way</p>
          </div>

          <div className="team-details-grid">
            <div className="team-card">
              <div className="team-card-header">
                <h3>The Starting Line</h3>
                <p className="specialty handwritten">1st & 2nd Year — Finding my footing</p>
              </div>
              <ul className="expertise-list">
                <li>Learned Python just before starting engineering</li>
                <li>Got introduced to ML during my 2nd year</li>
                <li>Picked up full-stack skills: React, MERN, PyMongo</li>
                <li>This first taste of industry code accelerated my learning exponentially</li>
              </ul>
            </div>

            <div className="team-card">
              <div className="team-card-header">
                <h3>Picking Up Speed</h3>
                <p className="specialty handwritten">3rd Year — Software & Hardware</p>
              </div>
              <ul className="expertise-list">
                <li>Landed a Software Developer Internship (SoftServe Global)</li>
                <li>Began building way more projects post-internship</li>
                <li>Contributed to a live Demand Forecasting project</li>
                <li>Experimented with NLP by building a WhatUP bot, emotional health tracker and analyzer</li>
                <li>Shifted gears to design suspension hardware for a student formula car(SAE SUPRA 2025 competition)</li>
                <li>Learned how to build robust systems, both code and metal</li>
              </ul>
            </div>

            <div className="team-card">
              <div className="team-card-header">
                <h3>Tying It Together</h3>
                <p className="specialty handwritten">4th Year & Beyond — Deep dive into ML</p>
              </div>
              <ul className="expertise-list">
                <li>Built SMARTSAT, an AI Accessibility Reader, and my Chess AI</li>
                <li>Scaled up my ML focus with NLP and RL applications</li>
                <li>Wrapped up my final (8th) semester with an ML Internship at AceMicromatic MIT</li>
                <li>Got hands-on experience building Computer Vision (CV) pipelines</li>
                <li>Graduating B.E. CS (AI & ML) at JSS Academy in 2026</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us -> Things I Care About */}
      <section className="section why-section">
        <div className="container">
          <div className="section-title">
            <h2>Things I Care About</h2>
            <p>Beyond the code</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-number handwritten">1</div>
              <h4>Explainability in ML</h4>
              <p>Not just accuracy — understanding why a model makes a decision matters</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number handwritten">2</div>
              <h4>Full-stack ownership</h4>
              <p>From raw data to deployed UI. I like seeing the whole picture</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number handwritten">3</div>
              <h4>Clean, documented code</h4>
              <p>Writing code that's readable, maintainable, and kind to the next developer</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number handwritten">4</div>
              <h4>Building in public</h4>
              <p>Sharing my work and learning openly (<a href="https://github.com/raghavab1205" target="_blank" rel="noreferrer">GitHub</a>)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Navigation */}
      <section className="section experience-nav-section">
        <div className="container">
          <div className="experience-nav-content">
            <Link to="/experience" className="btn btn-experience">
              See My Experience →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
