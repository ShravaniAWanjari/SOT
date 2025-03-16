import React, { useState, useEffect } from "react";
import './index.css';
import ContactUs from "./contactus";
import apiConfig from "./config/apiconfig";

const ProjectsPage = () => {
  // State for API projects
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Configuration for pagination
  const projectsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiConfig.getUrl('api/forms/'));
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Filter for projects only
        const allProjects = data.filter(item => item.category === 'project');
        
        setProjects(allProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
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
              <h2>All Projects</h2>
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

export default ProjectsPage;