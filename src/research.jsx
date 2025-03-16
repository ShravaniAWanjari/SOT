import React, { useState, useEffect } from "react";
import './index.css';
import ContactUs from "./contactus";
import apiConfig from "./config/apiconfig";

const ResearchPage = () => {
  // State for API projects
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Configuration for pagination
  const projectsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch research projects from API
  useEffect(() => {
    const fetchResearches = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiConfig.getUrl('api/forms/'));
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Filter for research projects only
        const allResearches = data.filter(item => item.category === 'research');
        
        setResearches(allResearches);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching research projects:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchResearches();
  }, []);
  
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
  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading research projects...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <p>Error loading research projects: {error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
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
              <h2>Research Areas</h2>
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
                        <tr key={index}>
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
        
        {/* Add styles for loading and error states */}
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
        `}</style>
    </div>
  );
};

export default ResearchPage;