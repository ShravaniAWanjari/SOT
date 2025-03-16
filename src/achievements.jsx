import React, { useState, useEffect } from "react";
import './index.css';
import ContactUs from "./contactus";
import apiConfig from "./config/apiconfig";

// Cache key for local storage
const ACHIEVEMENTS_CACHE_KEY = 'sot_achievements_data';
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes
const CACHE_VERSION_KEY = 'sot_data_version'; // Version tracking for cache invalidation

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);
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
      const allAchievements = data.filter(item => item.category === 'achievement');

      // Compare achievements count - simple heuristic for detecting changes
      const cachedData = localStorage.getItem(ACHIEVEMENTS_CACHE_KEY);
      if (cachedData) {
        const { data: cachedAchievements } = JSON.parse(cachedData);

        // Check if count has changed or if the latest achievement is different
        if (cachedAchievements.length !== allAchievements.length ||
          (allAchievements[0]?.id !== cachedAchievements[0]?.id)) {
          console.log('New achievements data detected, invalidating cache');

          // Increment version to invalidate caches
          const newVersion = (parseInt(localStorage.getItem(CACHE_VERSION_KEY) || '0')) + 1;
          localStorage.setItem(CACHE_VERSION_KEY, newVersion.toString());

          // Update state with new data
          setAchievements(allAchievements);

          // Store updated cache
          localStorage.setItem(ACHIEVEMENTS_CACHE_KEY, JSON.stringify({
            data: allAchievements,
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

  // Fetch achievements from API with caching
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);

        // Get current cache version
        const currentVersion = parseInt(localStorage.getItem(CACHE_VERSION_KEY) || '0');

        // Check if we have cached data
        const cachedData = localStorage.getItem(ACHIEVEMENTS_CACHE_KEY);

        if (cachedData) {
          const { data, timestamp, version } = JSON.parse(cachedData);

          // Check if cache is still valid (within expiry time and version matches)
          if (Date.now() - timestamp < CACHE_EXPIRY_TIME && version === currentVersion) {
            console.log('Using cached achievements data');
            setAchievements(data);
            setLoading(false);

            // Still check for updates in the background
            setTimeout(checkForUpdates, 1000);
            return;
          }
        }

        // If no valid cache, fetch from API
        console.log('Fetching fresh achievements data');
        const response = await fetch(apiConfig.getUrl('api/forms/'));

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Filter for achievements only
        const allAchievements = data.filter(item => item.category === 'achievement');

        // Store in state
        setAchievements(allAchievements);

        // Cache the data with timestamp and version
        localStorage.setItem(ACHIEVEMENTS_CACHE_KEY, JSON.stringify({
          data: allAchievements,
          timestamp: Date.now(),
          version: currentVersion
        }));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAchievements();
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
  const totalPages = Math.ceil(achievements.length / projectsPerPage);
  const indexOfLastAchievement = currentPage * projectsPerPage;
  const indexOfFirstAchievement = indexOfLastAchievement - projectsPerPage;
  const currentAchievements = achievements.slice(indexOfFirstAchievement, indexOfLastAchievement);

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
          <p>Loading achievements...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <p>Error loading achievements: {error}</p>
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
          <h1 className="hero-title">Achievements at School of Technology</h1>
          <p className="hero-description">
            Our students and faculty have received numerous accolades and recognitions for their 
            outstanding work in various domains. These achievements reflect the quality of education, 
            research, and innovation at our institution and inspire others to pursue excellence.
          </p>
        </div>
        <div className="placement-stats">
          <div className="stat-item">
            <h2>{achievements.length}</h2>
            <p>Total Achievements</p>
          </div>
          <div className="stat-item">
            <h2>30+</h2>
            <p>Awards This Year</p>
          </div>
          <div className="stat-item">
            <h2>15</h2>
            <p>International Recognitions</p>
          </div>
          <div className="stat-item">
            <h2>25+</h2>
            <p>Industry Collaborations</p>
          </div>
        </div>
      </section>
      <div className="content-container">
        <div className="research-section">
          <div className="research-content">
            <h2>Achievements at SOT</h2>
            <p>The School of Technology takes pride in the achievements of its students, faculty, and alumni. These achievements span across various domains including academic excellence, research breakthroughs, innovation, entrepreneurship, and community service.</p>
            <p>Our community members regularly participate in and win competitions, secure research grants, publish in prestigious journals, receive awards, and contribute significantly to their fields. These accomplishments enhance the reputation of our institution and create opportunities for future generations.</p>
          </div>
        </div>
        <div className="contributions-section">
          <div className="research-content">
            <div className="header-with-refresh">
              <h2>Notable Achievements</h2>
              <button onClick={refreshData} className="refresh-button" title="Refresh achievements">
                <span className="refresh-icon">↻</span>
              </button>
            </div>
            <p>Below are some of the notable achievements by our students and faculty. These achievements demonstrate excellence, innovation, and dedication to advancing knowledge and solving real-world problems.</p>
          </div>
          <div className="research-table-container">
            {achievements.length === 0 ? (
              <p>No achievements available at this time.</p>
            ) : (
              <>
                <table className="research-table">
                  <thead>
                    <tr>
                      <th>Achievement Title</th>
                      <th>Achieved By</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAchievements.map((achievement, index) => (
                      <tr key={achievement.id || index}>
                        <td>{achievement.title}</td>
                        <td>
                          {achievement.user?.name ||
                            (achievement.user_type === 'STUDENT' ? 'Student' :
                              achievement.user_type === 'FACULTY' ? 'Faculty' : 'Admin')}
                          {achievement.team_members && `, ${achievement.team_members}`}
                        </td>
                        <td>{achievement.description}</td>
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

export default AchievementsPage;