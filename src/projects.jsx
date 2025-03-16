import React, { useState, useEffect } from "react";
import './index.css';
import ContactUs from "./contactus";
import apiConfig from "./config/apiconfig";

// Cache key for local storage
const PROJECTS_CACHE_KEY = 'sot_projects_data';
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
const CACHE_VERSION_KEY = 'sot_data_version'; // Version tracking for cache invalidation

const ProjectsPage = () => {
  // State for API projects
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataVersion, setDataVersion] = useState(0);
  
  // Configuration for pagination
  const projectsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Function to check for data updates in the background
  const checkForUpdates = async () => {
    try {
      // Add a small random delay to prevent all clients from checking at the same time
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
      
      const response = await fetch(apiConfig.getUrl('api/forms/'), { 
        headers: { 'X-Check-Updates-Only': 'true' },
        cache: 'no-store'  // Bypass browser cache
      });
      
      if (!response.ok) return;
      
      const data = await response.json();
      const allProjects = data.filter(item => item.category === 'project');
      
      // Compare project count - simple heuristic for detecting changes
      const cachedData = localStorage.getItem(PROJECTS_CACHE_KEY);
      if (cachedData) {
        const { data: cachedProjects } = JSON.parse(cachedData);
        
        // Check if count has changed or if the latest project is different
        if (cachedProjects.length !== allProjects.length || 
            (allProjects[0]?.id !== cachedProjects[0]?.id)) {
          console.log('New data detected, invalidating cache');
          
          // Increment version to invalidate caches
          const newVersion = (parseInt(localStorage.getItem(CACHE_VERSION_KEY) || '0')) + 1;
          localStorage.setItem(CACHE_VERSION_KEY, newVersion.toString());
          
          // Update state with new data
          setProjects(allProjects);
          
          // Store updated cache
          localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify({
            data: allProjects,
            timestamp: Date.now(),
            version: newVersion
          }));
        }
      }
    } catch (error) {
      console.error("Background update check failed:", error);
      // Non-critical, so we don't set error state
    }
  };
  
  // Set up polling for updates (every 2 minutes)
  useEffect(() => {
    const pollInterval = setInterval(checkForUpdates, 2 * 60 * 1000);
    return () => clearInterval(pollInterval);
  }, []);
  
  // Effect to watch for version changes (from other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === CACHE_VERSION_KEY) {
        setDataVersion(parseInt(e.newValue || '0'));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Fetch projects from API with caching
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Get current cache version
        const currentVersion = parseInt(localStorage.getItem(CACHE_VERSION_KEY) || '0');
        
        // Check if we have cached data
        const cachedData = localStorage.getItem(PROJECTS_CACHE_KEY);
        
        if (cachedData) {
          const { data, timestamp, version } = JSON.parse(cachedData);
          
          // Check if cache is still valid (within expiry time and version matches)
          if (Date.now() - timestamp < CACHE_EXPIRY_TIME && version === currentVersion) {
            console.log('Using cached projects data');
            setProjects(data);
            setLoading(false);
            
            // Still check for updates in the background
            setTimeout(checkForUpdates, 1000);
            return;
          }
        }
        
        // If no valid cache, fetch from API
        console.log('Fetching fresh projects data');
        const response = await fetch(apiConfig.getUrl('api/forms/'));
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Filter for projects only
        const allProjects = data.filter(item => item.category === 'project');
        
        // Store in state
        setProjects(allProjects);
        
        // Cache the data with timestamp and version
        localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify({
          data: allProjects,
          timestamp: Date.now(),
          version: currentVersion
        }));
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [dataVersion]); // Re-fetch when dataVersion changes (cache invalidated)
  
  // Function to force refresh data
  const refreshData = async () => {
    // Increment version to invalidate caches
    const newVersion = (parseInt(localStorage.getItem(CACHE_VERSION_KEY) || '0')) + 1;
    localStorage.setItem(CACHE_VERSION_KEY, newVersion.toString());
    
    // This will trigger a re-fetch due to the dataVersion dependency
    setDataVersion(newVersion);
  };
  
  // Calculate pagination details
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Loading state
  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <p>Error loading projects: {error}</p>
          <button onClick={refreshData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container">
        <section className="placement-hero">
          <div className="placement-hero-content">
            <h1 className="hero-title">Projects at School of Technology</h1>
            <p className="hero-description">
              Our students engage in a wide range of innovative projects spanning software development, 
              hardware design, data analysis, and more. These projects provide practical experience 
              and help students apply theoretical knowledge to real-world problems, often in collaboration 
              with industry partners.
            </p>
          </div>
          <div className="placement-stats">
            <div className="stat-item">
              <h2>{projects.length}</h2>
              <p>Active Projects</p>
            </div>
            <div className="stat-item">
              <h2>25+</h2>
              <p>Industry Partners</p>
            </div>
            <div className="stat-item">
              <h2>12</h2>
              <p>Award-Winning Projects</p>
            </div>
            <div className="stat-item">
              <h2>8</h2>
              <p>Research Areas</p>
            </div>
          </div>
        </section>
        <div className="content-container">
          <div className="research-section">
            <div className="research-content">
              <h2>Projects at SOT</h2>
              <p>At the School of Technology, projects form an integral part of our curriculum. Students engage in a wide range of projects, from individual assignments to collaborative ventures, covering diverse areas such as software development, hardware design, data analysis, and more.</p>
              <p>These projects provide practical experience and help students apply theoretical knowledge to real-world problems. Many projects are developed in collaboration with industry partners, ensuring relevance and exposure to current industry practices and challenges.</p>
            </div>
          </div>
          <div className="contributions-section">
            <div className="research-content">
              <div className="header-with-refresh">
                <h2>All Projects</h2>
                <button onClick={refreshData} className="refresh-button" title="Refresh projects">
                  <span className="refresh-icon">↻</span>
                </button>
              </div>
              <p>Below are projects developed by our students and faculty. These projects showcase innovation, technical excellence, and creative problem-solving approaches.</p>
            </div>
            <div className="projects-table-container">
              {projects.length === 0 ? (
                <p>No projects available at this time.</p>
              ) : (
                <>
                  <table className="projects-table">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Authors/Developers</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProjects.map((project, index) => (
                        <tr key={project.id || index}>
                          <td>{project.title}</td>
                          <td>
                            {project.user?.name || 
                              (project.user_type === 'STUDENT' ? 'Student' : 
                               project.user_type === 'FACULTY' ? 'Faculty' : 'Admin')}
                            {project.team_members && `, ${project.team_members}`}
                          </td>
                          <td>{project.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="pagination-container">
                      <div className="pagination">
                        {pageNumbers.map(number => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`page-btn ${currentPage === number ? 'active' : ''}`}
                          >
                            {number}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <ContactUs />
        </div>
        
        {/* Add styles for loading, error, and refresh */}
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
          }
          
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-top-color: #007bff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-bottom: 20px;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          .error-message {
            text-align: center;
            padding: 30px;
            background: #f9f9f9;
            border-radius: 8px;
            color: #dc3545;
          }
          
          .retry-button {
            padding: 8px 16px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 4px;
            margin-top: 15px;
            cursor: pointer;
          }
          
          .header-with-refresh {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .refresh-button {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #007bff;
            transition: transform 0.3s ease;
          }
          
          .refresh-button:hover {
            transform: rotate(180deg);
          }
          
          .refresh-icon {
            font-size: 24px;
          }
        `}</style>
    </div>
  );
};

export default ProjectsPage;