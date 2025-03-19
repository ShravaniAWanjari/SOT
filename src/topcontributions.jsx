import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import apiConfig from "./config/apiconfig";
import "./index.css"; // If needed for extra styling

const TopContributions = () => {
  // State to track which project's popup is currently shown
  const [selectedProject, setSelectedProject] = useState(null);

  // States for API-fetched data
  const [studentAchievements, setStudentAchievements] = useState([]);
  const [facultyAchievements, setFacultyAchievements] = useState([]);
  const [studentProjects, setStudentProjects] = useState([]);
  const [facultyProjects, setFacultyProjects] = useState([]);
  const [studentResearch, setStudentResearch] = useState([]);
  const [facultyResearch, setFacultyResearch] = useState([]);
  
  // States for ongoing projects
  const [studentOngoingResearch, setStudentOngoingResearch] = useState([]);
  const [facultyOngoingResearch, setFacultyOngoingResearch] = useState([]);
  
  const [fetchRetries, setFetchRetries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create refs for each slider to control them programmatically
  const studentSliderRef1 = useRef(null);
  const facultySliderRef1 = useRef(null);
  const studentSliderRef2 = useRef(null);
  const facultySliderRef2 = useRef(null);
  const studentSliderRef3 = useRef(null);
  const facultySliderRef3 = useRef(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching data from top_six endpoint...");
        
        // Use the optimized top_six endpoint that returns pre-categorized data
        const response = await fetch(apiConfig.getUrl('/api/forms/top_six/'));

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        // The response is already categorized by the backend
        const data = await response.json();
        console.log("Fetched pre-categorized data:", data);
        
        // Update state with pre-categorized data from the backend
        setStudentAchievements(data.studentAchievements || []);
        setFacultyAchievements(data.facultyAchievements || []);
        setStudentProjects(data.studentProjects || []);
        setFacultyProjects(data.facultyProjects || []);
        setStudentResearch(data.studentResearch || []);
        setFacultyResearch(data.facultyResearch || []);

        console.log("Fetching data from top_six_ongoing endpoint...");
        const ongoingResponse = await fetch(apiConfig.getUrl('/api/forms/top_six_ongoing/'));
        
        if (!ongoingResponse.ok) {
          throw new Error(`API error for ongoing projects: ${ongoingResponse.status}`);
        }
        
        const ongoingData = await ongoingResponse.json();
        console.log("Fetched ongoing projects data:", ongoingData);
        
        setStudentOngoingResearch(ongoingData.studentResearch || []);
        setFacultyOngoingResearch(ongoingData.facultyResearch || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchRetries]); // Re-fetch when fetchRetries changes

  // Function to handle clicking on a project card
  const handleAPIProjectClick = (project) => {
    console.log("Project clicked:", project);
    
    if (!project) {
      console.error("Attempted to show details for undefined project");
      return;
    }
    
    // Create a formatted project object for the popup
    const formattedProject = {
      title: project.title || "Untitled Project",
      author: project.user && project.user.name ? project.user.name :
        (project.user_type === 'STUDENT' ? 'Student' : 'Faculty'),
      description: project.description || "No description available",
      fullDescription: project.description || "No description available",
      // Handle both array and string formats for tech_stack
      technologies: Array.isArray(project.tech_stack) 
        ? project.tech_stack 
        : (project.tech_stack ? project.tech_stack.split(',').map(tech => tech.trim()) : []),
      // Handle both array and string formats for achievements
      achievements: Array.isArray(project.achivements) 
        ? project.achivements 
        : (project.achivements ? project.achivements.split(',').map(achievement => achievement.trim()) : [])
    };

    console.log("Setting selected project:", formattedProject);
    setSelectedProject({ type: 'api', data: formattedProject });
  };

  // Function to close the popup
  const closePopup = () => {
    setSelectedProject(null);
  };

  // Popup component to display project details
  const ProjectPopup = ({ project }) => {
    if (!project) return null;

    return (
      <div className="project-popup-overlay" onClick={closePopup}>
        <div className="project-popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-popup" onClick={closePopup}>×</button>
          <h3>{project.title}</h3>
          <p className="popup-author">{project.author}</p>
          <div className="popup-description">
            <p>{project.fullDescription}</p>
          </div>
          <div className="popup-details">
            <div className="popup-section">
              <h4>Technologies Used</h4>
              <ul>
                {project.technologies && project.technologies.length > 0 ? (
                  project.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))
                ) : (
                  <li>No technologies specified</li>
                )}
              </ul>
            </div>
            <div className="popup-section">
              <h4>Achievements</h4>
              <ul>
                {project.achievements && project.achievements.length > 0 ? (
                  project.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))
                ) : (
                  <li>No achievements specified</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Custom arrow components for the slider
  const SliderArrow = ({ direction, onClick, sliderRef }) => {
    return (
      <button
        className={`slider-arrow ${direction}-arrow`}
        onClick={onClick || (() => direction === 'prev' ? sliderRef.current.slickPrev() : sliderRef.current.slickNext())}
        aria-label={direction === 'prev' ? 'Previous' : 'Next'}
      >
        {direction === 'prev' ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </button>
    );
  };

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // We'll use custom arrows
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };


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
    background: rgba(0, 0, 0, 0.9);
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
  
  if (loading) {
    return (
      <>
        <style>{premiumLoaderStyles}</style>
        <FullscreenLoader />
      </>
    );
  }

  const ErrorMessage = ({ error, onRetry }) => (
    <div className="error-message">
      <p>⚠️ Something went wrong: {error}</p>
      <button onClick={onRetry} className="retry-button">Retry</button>
    </div>
  );
  
  const errorStyles = `
    .error-message {
      padding: 20px;
      text-align: center;
      background-color: black;
      color: #ff4c4c;
      border: 1px solid #ff4c4c;
      border-radius: 8px;
      margin: 20px auto;
      max-width: 400px;
    }
    
    .retry-button {
      margin-top: 10px;
      padding: 8px 16px;
      background-color: #ff4c4c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .retry-button:hover {
      background-color: #e03c3c;
    }
  `;
  
  if (error) {
    return (
      <>
        <style>{errorStyles}</style>
        <ErrorMessage error={error} onRetry={() => {
          setError(null);
          setLoading(true);
          setFetchRetries(prev => prev + 1);
        }} />
      </>
    );
  }

  // Each card section is now wrapped in a slider component with custom navigation
  return (
    <section className="contributions-section">
      <div className="research-content">
        <h2>Recent Achievements</h2>

        {/* Students Section */}
        <h3>Students</h3>
        {studentAchievements.length > 0 ? (
          <div className="carousel-container">
            <SliderArrow direction="prev" sliderRef={studentSliderRef1} />

            <Slider ref={studentSliderRef1} {...sliderSettings}>
              {studentAchievements.map((achievement, index) => (
                <div key={index}>
                  <div className="card" onClick={() => handleAPIProjectClick(achievement)}>
                    <h4>{achievement.title}</h4>
                    <p className="contributor">{achievement.user?.name || 'Student'}</p>
                    <p>{achievement.description || 'No description available'}</p>
                    <button className="view-details-btn" onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleAPIProjectClick(achievement);
                    }}>View Details</button>
                  </div>
                </div>
              ))}
            </Slider>

            <SliderArrow direction="next" sliderRef={studentSliderRef1} />
          </div>
        ) : (
          <p className="no-data-message">No top achievements available.</p>
        )}

        {/* Faculty Section */}
        <h3>Faculty</h3>
        {facultyAchievements.length > 0 ? (
          <div className="carousel-container">
            <SliderArrow direction="prev" sliderRef={facultySliderRef1} />

            <Slider ref={facultySliderRef1} {...sliderSettings}>
              {facultyAchievements.map((achievement, index) => (
                <div key={index}>
                  <div className="card" onClick={() => handleAPIProjectClick(achievement)}>
                    <h4>{achievement.title}</h4>
                    <p className="contributor">{achievement.user?.name || 'Faculty'}</p>
                    <p>{achievement.description || 'No description available'}</p>
                    <button className="view-details-btn" onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleAPIProjectClick(achievement);
                    }}>View Details</button>
                  </div>
                </div>
              ))}
            </Slider>

            <SliderArrow direction="next" sliderRef={facultySliderRef1} />
          </div>
        ) : (
          <p className="no-data-message">No top achievements available.</p>
        )}
      </div>

      {/* Best Projects Section */}
      <div className="research-content">
        <h2>Best Projects</h2>

        {/* Students Section */}
        <h3>Students</h3>
        {studentProjects.length > 0 ? (
          <div className="carousel-container">
            <SliderArrow direction="prev" sliderRef={studentSliderRef2} />

            <Slider ref={studentSliderRef2} {...sliderSettings}>
              {studentProjects.map((project, index) => (
                <div key={index}>
                  <div className="card" onClick={() => handleAPIProjectClick(project)}>
                    <h4>{project.title}</h4>
                    <p className="contributor">{project.user?.name || 'Student'}</p>
                    <p>{project.description || 'No description available'}</p>
                    <button className="view-details-btn" onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleAPIProjectClick(project);
                    }}>View Details</button>
                  </div>
                </div>
              ))}
            </Slider>

            <SliderArrow direction="next" sliderRef={studentSliderRef2} />
          </div>
        ) : (
          <p className="no-data-message">No top projects available.</p>
        )}

        {/* Faculty Section */}
        <h3>Faculty</h3>
        {facultyProjects.length > 0 ? (
          <div className="carousel-container">
            <SliderArrow direction="prev" sliderRef={facultySliderRef2} />

            <Slider ref={facultySliderRef2} {...sliderSettings}>
              {facultyProjects.map((project, index) => (
                <div key={index}>
                  <div className="card" onClick={() => handleAPIProjectClick(project)}>
                    <h4>{project.title}</h4>
                    <p className="contributor">{project.user?.name || 'Faculty'}</p>
                    <p>{project.description || 'No description available'}</p>
                    <button className="view-details-btn" onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleAPIProjectClick(project);
                    }}>View Details</button>
                  </div>
                </div>
              ))}
            </Slider>

            <SliderArrow direction="next" sliderRef={facultySliderRef2} />
          </div>
        ) : (
          <p className="no-data-message">No top projects available.</p>
        )}
      </div>

      <div className="research-content">
        <h2>Top 6 Ongoing Research Topics</h2><br />
        <h3>Students</h3><br />
        <div className="carousel-container">
          <SliderArrow direction="prev" sliderRef={studentSliderRef3} />
          <Slider ref={studentSliderRef3} {...sliderSettings} className="card-slider">
            {studentOngoingResearch.length > 0 ? (
              studentOngoingResearch.map((research, index) => (
                <div key={index}>
                  <div
                    className="card"
                    onClick={() => handleAPIProjectClick(research)}
                  >
                    <h4>{research.title}</h4>
                    <p className="contributor">{research.user?.name || 'Student'}</p>
                    <p>{research.description || 'No description available'}</p>
                    <button className="view-details-btn" onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleAPIProjectClick(research);
                    }}>View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="no-data-message">No ongoing research projects available.</p>
              </div>
            )}
          </Slider>
          <SliderArrow direction="next" sliderRef={studentSliderRef3} />
        </div><br />

        <h3>Faculty</h3><br />
        <div className="carousel-container">
          <SliderArrow direction="prev" sliderRef={facultySliderRef3} />
          <Slider ref={facultySliderRef3} {...sliderSettings} className="card-slider">
            {facultyOngoingResearch.length > 0 ? (
              facultyOngoingResearch.map((research, index) => (
                <div key={index}>
                  <div
                    className="card"
                    onClick={() => handleAPIProjectClick(research)}
                  >
                    <h4>{research.title}</h4>
                    <p className="contributor">{research.user?.name || 'Faculty'}</p>
                    <p>{research.description || 'No description available'}</p>
                    <button className="view-details-btn" onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleAPIProjectClick(research);
                    }}>View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="no-data-message">No ongoing research projects available.</p>
              </div>
            )}
          </Slider>
          <SliderArrow direction="next" sliderRef={facultySliderRef3} />
        </div>
      </div>

      {selectedProject && (
        <ProjectPopup
          project={selectedProject.data}
        />
      )}
    </section>
  );
};

export default TopContributions;