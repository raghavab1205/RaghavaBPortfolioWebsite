// UI ONLY CHANGE
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import NotebookID from './NotebookID';
import './header.css';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebar = () => setIsSidebarOpen(false);

  const navLinks = [
    { path: '/', label: 'Home', color: 'tab-home' },
    { path: '/about', label: 'About', color: 'tab-about' },
    { path: '/experience', label: 'Experience', color: 'tab-experience' },
    { path: '/services', label: 'Projects', color: 'tab-projects' },
    { path: '/contact', label: 'Contact', color: 'tab-contact' },
  ];

  return (
    <>
      <ThemeToggle />
      <NotebookID />
      
      {/* Desktop — Notebook Tab Navigation (left side) */}
      <nav className="notebook-tabs" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`notebook-tab ${link.color} ${
              location.pathname === link.path ? 'active' : ''
            }`}
            onClick={closeSidebar}
          >
            <span className="tab-label">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile — Paper clip toggle + overlay menu */}
      <button
        className="mobile-clip-btn"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span className="clip-icon">{isSidebarOpen ? '✕' : '📎'}</span>
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div className="mobile-overlay" onClick={closeSidebar}>
          <aside
            className="mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <span className="mobile-title">Raghava's Notebook</span>
              <button
                className="mobile-close"
                onClick={closeSidebar}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <nav>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`mobile-link ${link.color} ${
                        location.pathname === link.path ? 'active' : ''
                      }`}
                      onClick={closeSidebar}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mobile-menu-footer">
              <p>~ flip to any page ~</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
