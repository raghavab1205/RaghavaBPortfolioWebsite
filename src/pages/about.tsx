// UI ONLY CHANGE
import React from 'react';
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
              <h3>What drives me</h3>
              <p>
                I believe technology should feel human. I build things that solve real problems — not because they're trendy, but because they matter. Every project is a chance to learn something new.
              </p>
            </div>
            <div className="mission-card note-sage">
              <h3>How I work</h3>
              <p>
                I like to start with curiosity. Sketch ideas on paper, prototype fast, iterate often. I care deeply about clean code and thoughtful design — the kind that makes future-me thankful.
              </p>
            </div>
            <div className="mission-card note-blue">
              <h3>What I believe in</h3>
              <p>
                Honesty over polish. Progress over perfection. I'd rather ship something real and improve it than wait for something flawless. Collaboration makes everything better.
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
                <h3>The Beginning</h3>
                <p className="specialty handwritten">2020 — First lines of code</p>
              </div>
              <ul className="expertise-list">
                <li>Discovered programming through Python</li>
                <li>Built my first calculator app</li>
                <li>Fell in love with problem solving</li>
                <li>Started learning data structures</li>
                <li>Joined my first hackathon</li>
              </ul>
            </div>

            <div className="team-card">
              <div className="team-card-header">
                <h3>Growing Up</h3>
                <p className="specialty handwritten">2022 — Building real things</p>
              </div>
              <ul className="expertise-list">
                <li>Built full-stack web applications</li>
                <li>Explored machine learning and AI</li>
                <li>Contributed to open source projects</li>
                <li>Learned cloud deployment (AWS)</li>
                <li>Started freelancing on the side</li>
              </ul>
            </div>

            <div className="team-card">
              <div className="team-card-header">
                <h3>Right Now</h3>
                <p className="specialty handwritten">2024 — Present day</p>
              </div>
              <ul className="expertise-list">
                <li>Working on AI/ML projects</li>
                <li>Exploring creative coding</li>
                <li>Building this portfolio notebook</li>
                <li>Always learning, always shipping</li>
                <li>Looking for the next adventure</li>
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
              <h4>Clean Code</h4>
              <p>Writing code that's readable, maintainable, and kind to the next developer</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number handwritten">2</div>
              <h4>Good Design</h4>
              <p>Interfaces should feel intuitive and delightful, not just functional</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number handwritten">3</div>
              <h4>Open Source</h4>
              <p>Giving back to the community that taught me everything I know</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number handwritten">4</div>
              <h4>Lifelong Learning</h4>
              <p>Every day is a chance to learn something new and share it</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number handwritten">5</div>
              <h4>Thoughtful UX</h4>
              <p>Putting real people first in every design decision</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number handwritten">6</div>
              <h4>Having Fun</h4>
              <p>If you're not enjoying the process, what's the point?</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
