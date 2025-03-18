import React, { useEffect, useState } from "react";
import apiConfig from "./config/apiconfig";
import ContactUs from "./contactus";
import './index.css';

// Cache key for local storage
const RESEARCH_CACHE_KEY = 'sot_research_data';
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes
const CACHE_VERSION_KEY = 'sot_data_version'; // Version tracking for cache invalidation

const ResearchPage = () => {
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataVersion, setDataVersion] = useState(0);
  const projectsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Function to check for data updates in the background
  const checkForUpdates = async () => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

      const response = await fetch(apiConfig.getUrl('api/forms/'), {
        headers: { 'X-Check-Updates-Only': 'true' },
        cache: 'no-store'  // Bypass browser cache
      });

      if (!response.ok) return;

      const data = await response.json();
      const allResearches = data.filter(item => item.category === 'research');

      // Compare research count - simple heuristic for detecting changes
      const cachedData = localStorage.getItem(RESEARCH_CACHE_KEY);
      if (cachedData) {
        const { data: cachedResearches } = JSON.parse(cachedData);

        // Check if count has changed or if the latest research is different
        if (cachedResearches.length !== allResearches.length ||
          (allResearches[0]?.id !== cachedResearches[0]?.id)) {
          console.log('New research data detected, invalidating cache');

          // Increment version to invalidate caches
          const newVersion = (parseInt(localStorage.getItem(CACHE_VERSION_KEY) || '0')) + 1;
          localStorage.setItem(CACHE_VERSION_KEY, newVersion.toString());

          // Update state with new data
          setResearches(allResearches);

          // Store updated cache
          localStorage.setItem(RESEARCH_CACHE_KEY, JSON.stringify({
            data: allResearches,
            timestamp: Date.now(),
            version: newVersion
          }));
        }
      }
    } catch (error) {
      console.error("Background update check failed:", error);
      
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

  // Fetch research projects from API with caching
  useEffect(() => {
    const fetchResearches = async () => {
      try {
        setLoading(true);

        // Get current cache version
        const currentVersion = parseInt(localStorage.getItem(CACHE_VERSION_KEY) || '0');

        // Check if we have cached data
        const cachedData = localStorage.getItem(RESEARCH_CACHE_KEY);

        if (cachedData) {
          const { data, timestamp, version } = JSON.parse(cachedData);

          // Check if cache is still valid (within expiry time and version matches)
          if (Date.now() - timestamp < CACHE_EXPIRY_TIME && version === currentVersion) {
            console.log('Using cached research data');
            setResearches(data);
            setLoading(false);

            // Still check for updates in the background
            setTimeout(checkForUpdates, 1000);
            return;
          }
        }

        // If no valid cache, fetch from API
        console.log('Fetching fresh research data');
        const response = await fetch(apiConfig.getUrl('api/forms/'));

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Filter for research projects only
        const allResearches = data.filter(item => item.category === 'research');

        // Store in state
        setResearches(allResearches);

        // Cache the data with timestamp and version
        localStorage.setItem(RESEARCH_CACHE_KEY, JSON.stringify({
          data: allResearches,
          timestamp: Date.now(),
          version: currentVersion
        }));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching research projects:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchResearches();
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
  const totalPages = Math.ceil(researches.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = researches.slice(indexOfFirstProject, indexOfLastProject);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Loading state
  const PremiumLoader = () => {
    return (
      <div className="premium-loader-container">
        <div className="premium-loader">
          <div className="circle-container">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
          
        </div>
      </div>
    );
  };
  
  const FullscreenLoader = () => <PremiumLoader />;
  
  const premiumLoaderStyles = `
  .premium-loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 1);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .premium-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .circle-container {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(145deg, #e74c3c, #ff7675);
    box-shadow: 0 0 15px rgba(231, 76, 60, 0.7);
    animation: pulse 1.5s infinite ease-in-out;
  }
  
  .circle-1 {
    animation-delay: 0s;
  }
  
  .circle-2 {
    animation-delay: 0.2s;
  }
  
  .circle-3 {
    animation-delay: 0.4s;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(0.8);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
  
  .loading-text {
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 3px;
    margin-top: 10px;
    display: flex;
  }
  
  .loading-text span {
    animation: fadeInOut 2s infinite ease-in-out;
    opacity: 0.3;
    margin: 0 1px;
  }
  
  .loading-text span:nth-child(1) { animation-delay: 0.1s; }
  .loading-text span:nth-child(2) { animation-delay: 0.2s; }
  .loading-text span:nth-child(3) { animation-delay: 0.3s; }
  .loading-text span:nth-child(4) { animation-delay: 0.4s; }
  .loading-text span:nth-child(5) { animation-delay: 0.5s; }
  .loading-text span:nth-child(6) { animation-delay: 0.6s; }
  .loading-text span:nth-child(7) { animation-delay: 0.7s; }
  .loading-text span:nth-child(8) { animation-delay: 0.8s; }
  .loading-text span:nth-child(9) { animation-delay: 0.9s; }
  .loading-text span:nth-child(10) { animation-delay: 1.0s; }
  
  @keyframes fadeInOut {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
  
  /* Add a subtle logo effect (placeholder) */
  .premium-loader::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(231, 76, 60, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
    animation: pulse-bg 4s infinite ease-in-out;
    z-index: -1;
  }
  
  @keyframes pulse-bg {
    0%, 100% {
      transform: scale(0.8);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.5;
    }
  }
  `;
  
  // Loading state
  if (loading) {
    return (
      <>
      <style>{premiumLoaderStyles}</style>
      <FullscreenLoader />
      </>
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
          <h1 className="hero-title">Research at School of Technology</h1>
          <p className="hero-description">
            Our faculty and students engage in cutting-edge research across various domains including
            artificial intelligence, cybersecurity, IoT, cloud computing, and robotics. We address
            current technological challenges and contribute to academic knowledge through state-of-the-art
            laboratories and collaborations with industry partners.
          </p>
        </div>
        <div className="placement-stats">
          <div className="stat-item">
            <h2>{researches.length}</h2>
            <p>Active Research Projects</p>
          </div>
          <div className="stat-item">
            <h2>15+</h2>
            <p>Research Publications</p>
          </div>
          <div className="stat-item">
            <h2>8</h2>
            <p>Research Labs</p>
          </div>
          <div className="stat-item">
            <h2>30+</h2>
            <p>Research Partners</p>
          </div>
        </div>
      </section>
      <div className="content-container">
        <div className="research-section">
          <div className="research-content">
            <h2>Research at SOT</h2>
            <p>Research at the School of Technology spans various domains, including artificial intelligence, cybersecurity, IoT, cloud computing, robotics, and more. Our faculty and students are engaged in cutting-edge research that addresses current technological challenges and contributes to academic knowledge.</p>
            <p>Our research initiatives are supported by state-of-the-art laboratories, research grants, and collaborations with industry and academic partners. The emphasis on research enriches our academic environment and provides students with opportunities to engage in meaningful research projects.</p>
          </div>
        </div>
        <div className="contributions-section">
          <div className="research-content">
            <div className="header-with-refresh">
              <h2>Research Areas</h2>
              <button onClick={refreshData} className="refresh-button" title="Refresh research projects">
                <span className="refresh-icon">↻</span>
              </button>
            </div>
            <p>Our research is focused on but not limited to the following areas. Each area is led by faculty members with expertise in the respective domains, guiding students and research teams in their explorations.</p>
          </div>
          <div className="research-table-container">
            {researches.length === 0 ? (
              <p>No research projects available at this time.</p>
            ) : (
              <>
                <table className="research-table">
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

      <style jsx>{`
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
        color: #f64758;
        transition: transform 0.3s ease;
      }
      
      .refresh-button:hover {
        transform: rotate(180deg);
      }
      
      .refresh-icon {
        font-size: 35px;
      }
        `}</style>
    </div>
  );
};

export default ResearchPage;