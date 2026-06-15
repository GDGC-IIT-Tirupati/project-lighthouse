import React, { useState } from 'react';
import './issue_report.css';

function PublicIssues() {
  const [activeTab, setActiveTab] = useState('All Issues');
  const [filterType, setFilterType] = useState('TRENDING');

  // Mock data representing the community reported issues
  const [issues, setIssues] = useState([
    {
      id: 1,
      category: 'INFRASTRUCTURE',
      title: 'Large Pothole on Oak Drive near Elementary School',
      description: 'Deep pothole causing traffic delays and potential vehicle damage. Located right at the school crossing...',
      user: '@a',
      upvotes: 89,
    },
    {
      id: 2,
      category: 'SANITATION',
      title: 'Overflowing Bins at Central Park South',
      description: 'Sanitation bins haven\'t been emptied since the weekend festival. Attracting pests and creating...',
      user: '@b',
      upvotes: 156,
    },
    {
      id: 3,
      category: 'INFRASTRUCTURE',
      title: 'Broken Playground Equipment',
      description: 'The swing set at North Side Park is rusted and one chain has snapped. High risk for children playing.',
      user: '@c',
      upvotes: 114,
    },
    {
      id: 4,
      category: 'INFRASTRUCTURE',
      title: 'Faded Crosswalk Markings',
      description: 'The crosswalk at the 5th St junction is barely visible. Cars are not stopping for pedestrians.',
      user: '@d',
      upvotes: 52,
    },
    {
      id: 5,
      category: 'LIGHTING',
      title: 'Flickering Light in West Alley',
      description: 'The security light in West Alley has been flickering constantly. Very disruptive for nearby residents.',
      user: '@e',
      upvotes: 31,
    }
  ]);

  return (
    <div className="dashboard-wrapper">
      {/* Top Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-left">
          <div className="nav-logo-box">
            <span className="logo-text">Lighthouse</span>
          </div>
        </div>
        <div className="nav-center-links">
          <span>Dashboard</span>
          <span className="active-nav-link">Public Issues</span>
          <span>My Reports</span>
          <span>Team</span>
        </div>
        <div className="nav-right-actions">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search issues..." />
          </div>
          <span className="nav-icon">🔔</span>
          <span className="nav-icon">🌐</span>
          <div className="user-avatar-circle">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="User Avatar" />
          </div>
        </div>
      </nav>

      {/* Main Layout Workspace */}
      <div className="dashboard-layout">
        
        {/* Left Sidebar Menu */}
        <aside className="sidebar-panel">
          <div className="sidebar-brand">
            <h2>Campus Ops</h2>
            <p>ISSUE TRACKER</p>
          </div>
          
          <div className="sidebar-menu-items">
            <button className="sidebar-btn">
              <span className="btn-icon">🎛️</span> Dashboard
            </button>
            <button className="sidebar-btn active-sidebar-btn">
              <span className="btn-icon">🌐</span> Public Issues
            </button>
            <button className="sidebar-btn">
              <span className="btn-icon">📄</span> My Reports
            </button>
            <button className="sidebar-btn">
              <span className="btn-icon">👥</span> Team
            </button>
          </div>
        </aside>

        {/* Right Dynamic Feed View Container */}
        <main className="content-feed-panel">
          
          {/* Main Hero Featured Card Banner Component */}
          <section className="featured-hero-card">
            <div className="featured-tag-row">
              <span className="tag-outline">LIGHTING</span>
              <span className="tag-solid-critical">CRITICAL</span>
            </div>
            
            <span className="badge-featured">FEATURED ISSUE</span>
            
            <h1 className="featured-title">Main Street Lamp Outage</h1>
            
            <p className="featured-description">
              The primary lighting grid along Main St. and 4th Ave has been inactive for 48 hours. 
              Residents report feeling unsafe during evening hours. We are prioritizing this for immediate repair.
            </p>
            
            <div className="featured-actions-row">
              <button className="upvote-hero-btn">
                <span className="thumb-icon">👍</span> Upvote (412)
              </button>
              <button className="share-hero-btn">
                <span className="share-icon">🔗</span> Share Issue
              </button>
            </div>
          </section>

          {/* Issue Explorer Feed Filtering Controls */}
          <section className="explore-section-header">
            <h2>Explore Issues</h2>
            
            <div className="filter-controls-container">
              <div className="category-tabs">
                {['All Issues', 'Lighting', 'Sanitation', 'Infrastructure'].map((tab) => (
                  <button 
                    key={tab} 
                    className={`tab-btn ${activeTab === tab ? 'active-tab' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="sorting-toggle-group">
                <button 
                  className={`sort-btn ${filterType === 'TRENDING' ? 'active-sort' : ''}`}
                  onClick={() => setFilterType('TRENDING')}
                >
                  TRENDING
                </button>
                <button 
                  className={`sort-btn ${filterType === 'MOST VOTED' ? 'active-sort' : ''}`}
                  onClick={() => setFilterType('MOST VOTED')}
                >
                  MOST VOTED
                </button>
              </div>
            </div>
          </section>

          {/* Response Structural Matrix Grid for Feed Cards */}
          <section className="issues-grid-matrix">
            {issues.map((issue) => (
              <div className="issue-card-item" key={issue.id}>
                <div className="card-top-header">
                  <span className="reported-badge">Reported Recently</span>
                  <span className="category-label">{issue.category}</span>
                </div>
                
                <h3 className="card-issue-title">{issue.title}</h3>
                <p className="card-issue-desc">{issue.description}</p>
                
                <div className="card-footer-row">
                  <span className="card-username-author">
                    <span className="user-icon-mini">👤</span> {issue.user}
                  </span>
                  <button className="card-upvote-counter-btn">
                    <span className="upvote-arrow">👍</span> {issue.upvotes}
                  </button>
                </div>
              </div>
            ))}

            {/* Prompt Action Card CTA to Report Item */}
            <div className="report-cta-card-item">
              <div className="plus-icon-container">＋</div>
              <h3>Spotted a New Issue?</h3>
              <p>Help your community by reporting infrastructure, sanitation, or lighting problems.</p>
              <button className="cta-report-action-btn">Report Now</button>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default PublicIssues;