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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create refs for each slider to control them programmatically
  const studentSliderRef1 = useRef(null);
  const facultySliderRef1 = useRef(null);
  const studentSliderRef2 = useRef(null);
  const facultySliderRef2 = useRef(null);
  const studentSliderRef3 = useRef(null);
  const facultySliderRef3 = useRef(null);

  // Additional project details that would be shown in the popup - only for "Top 6 Ongoing Research Topics"
  const projectDetails = {
    student: [
      {
        title: "Project Name 1",
        author: "Student Name 1 - Year 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "This project focuses on innovative solutions for real-world problems. It includes extensive research, implementation, and testing phases. The results have been promising and demonstrate significant potential for practical applications in the field.",
        technologies: ["React", "Node.js", "MongoDB"],
        achievements: ["Won 1st prize at Annual Tech Exhibition", "Published in Student Journal of Technology"]
      },
      {
        title: "Project Name 2",
        author: "Student Name 2 - Year 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "An exploration of cutting-edge technologies and their applications in daily life. This project was developed over two semesters and involved collaboration with industry partners.",
        technologies: ["Python", "TensorFlow", "AWS"],
        achievements: ["Selected for National Innovation Challenge", "Patent filed"]
      },
      {
        title: "Project Name 3",
        author: "Student Name 3 - Year 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "A comprehensive study on sustainable development and its impact on urban infrastructure. The project proposes novel approaches to city planning and resource management.",
        technologies: ["GIS", "Data Analysis", "Sustainable Models"],
        achievements: ["Presented at Regional Conference", "Implemented in local community project"]
      },
      {
        title: "Project Name 4",
        author: "Student Name 4 - Year 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "This project focuses on cybersecurity and data protection in modern digital environments. It includes an in-depth analysis of current threats and proposes robust solutions.",
        technologies: ["Network Security", "Encryption", "Penetration Testing"],
        achievements: ["Recognized by Cybersecurity Association", "Implemented in campus network security"]
      },
      {
        title: "Project Name 5",
        author: "Student Name 5 - Year 5",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "An innovative approach to healthcare delivery using digital technologies. The project addresses critical gaps in current systems and offers scalable solutions for better patient care.",
        technologies: ["Health Informatics", "Mobile App Development", "Cloud Infrastructure"],
        achievements: ["Presented at Health Tech Symposium", "Pilot implementation in local clinic"]
      },
      {
        title: "Project Name 6",
        author: "Student Name 6 - Year 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "An innovative project exploring the intersection of artificial intelligence and sustainable development. This work demonstrates novel approaches to environmental monitoring and resource optimization.",
        technologies: ["AI", "IoT", "Environmental Science"],
        achievements: ["Environmental Innovation Award", "Featured in Sustainability Journal"]
      }
    ],
    faculty: [
      {
        title: "Project Name 1",
        author: "Faculty Name 1 - Assistant Professor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "A groundbreaking research initiative that explores new frontiers in the field. This multi-year project has resulted in several publications and has attracted significant grant funding.",
        technologies: ["Advanced Algorithms", "High-Performance Computing", "AI Models"],
        achievements: ["Published in top-tier journal", "Received major research grant"]
      },
      {
        title: "Project Name 2",
        author: "Faculty Name 2 - Assistant Professor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "This collaborative research project brings together experts from multiple disciplines to address complex societal challenges. The innovative methodologies developed have wide-ranging applications.",
        technologies: ["Cross-disciplinary Research", "Statistical Modeling", "Policy Analysis"],
        achievements: ["Inter-university collaboration established", "Featured in industry publication"]
      },
      {
        title: "Project Name 3",
        author: "Faculty Name 3 - Assistant Professor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "An in-depth study of emerging technologies and their impact on educational methodologies. The project has influenced curriculum development and teaching approaches.",
        technologies: ["EdTech", "Learning Analytics", "Instructional Design"],
        achievements: ["Adopted by multiple educational institutions", "Presented at International Education Conference"]
      },
      {
        title: "Project Name 4",
        author: "Faculty Name 4 - Assistant Professor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "A comprehensive investigation into sustainable energy solutions for developing regions. The project has led to practical implementations and policy recommendations.",
        technologies: ["Renewable Energy", "Sustainable Development", "Policy Framework"],
        achievements: ["Implemented in rural community projects", "Recognized by Environmental Agency"]
      },
      {
        title: "Project Name 5",
        author: "Faculty Name 5 - Assistant Professor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "This research focuses on advanced materials and their applications in various industries. The innovative approaches have resulted in patent applications and industry partnerships.",
        technologies: ["Materials Science", "Industrial Applications", "Testing Methodologies"],
        achievements: ["Two patents filed", "Industry partnership established"]
      },
      {
        title: "Project Name 6",
        author: "Faculty Name 6 - Professor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDescription: "A pioneering research program in quantum computing and its applications in cryptography and data security. This work has established new paradigms in the field and attracted international attention.",
        technologies: ["Quantum Computing", "Cryptography", "Advanced Mathematics"],
        achievements: ["International Research Excellence Award", "Multi-million dollar research grant"]
      }
    ]
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all forms from the API
        const response = await fetch(apiConfig.getUrl('api/forms/'));

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Filter for forms marked as top_6 only
        const topForms = data.filter(item => item.is_top_6 === true);

        // Process and categorize the data
        const studentAchievements = topForms.filter(item =>
          item.user_type === 'STUDENT' && item.category === 'achievement'
        ).slice(0, 6); // Ensure we have max 6 items

        const facultyAchievements = topForms.filter(item =>
          item.user_type === 'FACULTY' && item.category === 'achievement'
        ).slice(0, 6);

        const studentProjects = topForms.filter(item =>
          item.user_type === 'STUDENT' && item.category === 'project'
        ).slice(0, 6);

        const facultyProjects = topForms.filter(item =>
          item.user_type === 'FACULTY' && item.category === 'project'
        ).slice(0, 6);

        const studentResearch = topForms.filter(item =>
          item.user_type === 'STUDENT' && item.category === 'research'
        ).slice(0, 6);

        const facultyResearch = topForms.filter(item =>
          item.user_type === 'FACULTY' && item.category === 'research'
        ).slice(0, 6);

        // Update state with fetched data
        setStudentAchievements(studentAchievements);
        setFacultyAchievements(facultyAchievements);
        setStudentProjects(studentProjects);
        setFacultyProjects(facultyProjects);
        setStudentResearch(studentResearch);
        setFacultyResearch(facultyResearch);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle clicking on a project card
  const handleAPIProjectClick = (project) => {
    // Create a formatted project object for the popup
    const formattedProject = {
      title: project.title || "Untitled Project",
      author: project.user && project.user.name ? project.user.name :
        (project.user_type === 'STUDENT' ? 'Student' : 'Faculty'),
      description: project.description || "No description available",
      fullDescription: project.description || "No description available",
      technologies: project.tech_stack ? project.tech_stack.split(',').map(tech => tech.trim()) : [],
      achievements: project.achivements ? project.achivements.split(',').map(achievement => achievement.trim()) : []
    };

    setSelectedProject({ type: 'api', data: formattedProject });
  };

  // Function to handle clicking on a hardcoded project card (for ongoing research)
  const handleHardcodedProjectClick = (type, index) => {
    setSelectedProject({ type: 'hardcoded', data: projectDetails[type][index] });
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
                {project.technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            <div className="popup-section">
              <h4>Achievements</h4>
              <ul>
                {project.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
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
      color: red;
      border: 1px solid #ff4c4c;
      border-radius: 8px;
      margin: 20px auto;
      max-width: 400px;
    }
  `;
  
  // if (error) {
  //   return (
  //     <>
  //       <style>{errorStyles}</style>
  //       <ErrorMessage error={error} onRetry={() => window.location.reload()} />
  //     </>
  //   );
  // }
  

  // if (error) {
  //   return (
  //     <>
  //       <style>{emptyStateStyles}</style>
  //       <div className="error">Error loading data: {error}</div>
  //     </>
  //   );
  // }



  

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
            <div key={index} className="card" onClick={() => handleAPIProjectClick(achievement)}>
              <h4>{achievement.title}</h4>
              <p className="contributor">{achievement.user?.name || 'Student'}</p>
              <p>{achievement.description || 'No description available'}</p>
              <button className="view-details-btn">View Details</button>
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
            <div key={index} className="card" onClick={() => handleAPIProjectClick(achievement)}>
              <h4>{achievement.title}</h4>
              <p className="contributor">{achievement.user?.name || 'Faculty'}</p>
              <p>{achievement.description || 'No description available'}</p>
              <button className="view-details-btn">View Details</button>
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
            <div key={index} className="card" onClick={() => handleAPIProjectClick(project)}>
              <h4>{project.title}</h4>
              <p className="contributor">{project.user?.name || 'Student'}</p>
              <p>{project.description || 'No description available'}</p>
              <button className="view-details-btn">View Details</button>
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
            <div key={index} className="card" onClick={() => handleAPIProjectClick(project)}>
              <h4>{project.title}</h4>
              <p className="contributor">{project.user?.name || 'Faculty'}</p>
              <p>{project.description || 'No description available'}</p>
              <button className="view-details-btn">View Details</button>
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
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <div
                  className="card"
                  onClick={() => handleHardcodedProjectClick('student', index)}
                >
                  <h4>{projectDetails.student[index].title}</h4>
                  <p className="contributor">{projectDetails.student[index].author}</p>
                  <p>{projectDetails.student[index].description}</p>
                  <button className="view-details-btn">View Details</button>
                </div>
              </div>
            ))}
          </Slider>
          <SliderArrow direction="next" sliderRef={studentSliderRef3} />
        </div><br />

        <h3>Faculty</h3><br />
        <div className="carousel-container">
          <SliderArrow direction="prev" sliderRef={facultySliderRef3} />
          <Slider ref={facultySliderRef3} {...sliderSettings} className="card-slider">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <div
                  className="card"
                  onClick={() => handleHardcodedProjectClick('faculty', index)}
                >
                  <h4>{projectDetails.faculty[index].title}</h4>
                  <p className="contributor">{projectDetails.faculty[index].author}</p>
                  <p>{projectDetails.faculty[index].description}</p>
                  <button className="view-details-btn">View Details</button>
                </div>
              </div>
            ))}
          </Slider>
          <SliderArrow direction="next" sliderRef={facultySliderRef3} />
        </div>
      </div>

      {selectedProject && (
        <ProjectPopup
          project={selectedProject.type === 'hardcoded'
            ? selectedProject.data
            : selectedProject.data}
        />
      )}
    </section>
  );
};

export default TopContributions;