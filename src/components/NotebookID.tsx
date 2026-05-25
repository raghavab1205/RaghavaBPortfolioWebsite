// UI ONLY CHANGE
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NotebookID.css';

const NotebookID: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const labelRef = useRef<HTMLDivElement>(null);

  // Handle click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (labelRef.current && !labelRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <>
      {/* Background Blur Overlay for Expanded State */}
      {isExpanded && (
        <div 
          className="notebook-id-overlay" 
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div
        ref={labelRef}
        className={`notebook-id ${isExpanded ? 'expanded' : 'collapsed'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Collapsed State */}
        <div className="notebook-id-collapsed">
        <span className="collapsed-text">Raghava B</span>
        <span className="expand-icon">→</span>
      </div>

      {/* Expanded State */}
      {isExpanded && (
        <div className="notebook-id-expanded" onClick={(e) => e.stopPropagation()}>
          {/* Photo Section */}
          <div className="id-photo-section">
            <div className="id-photo-wrapper">
              <img
                src="images\IMG-20250819-WA0003.jpg"
                alt="Raghava"
                className="id-photo"
                onError={handleImageError}
              />
              <div className="id-initials-fallback">RB</div>
            </div>
          </div>

          {/* Info Section */}
          <div className="id-info-section">
            <h3 className="id-name">Raghava B</h3>
            <p className="id-degree">B.E. CS — AI & ML</p>
            <p className="id-college">JSS Academy of Technical Education</p>
            <p className="id-email">
              <a href="mailto:raghavab1205@gmail.com">raghavab1205@gmail.com</a>
            </p>
          </div>

          {/* About Button */}
          <Link to="/about" className="btn id-about-btn btn-about">
            About Me →
          </Link>
        </div>
      )}
      </div>
    </>
  );
};

export default NotebookID;
