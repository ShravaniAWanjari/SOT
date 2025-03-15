import React, { useState, useRef, useEffect } from "react";
import "./index.css"; // If needed for extra styling
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apiConfig from "./config/apiconfig";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
        const response = await fetch('http://127.0.0.1:8000/api/forms/');

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

  // Add CSS for empty states
  const emptyStateStyles = `
    .empty-message {
      padding: 20px;
      text-align: center;
      background-color: #f8f9fa;
      border-radius: 8px;
      color: #6c757d;
      font-style: italic;
      width: 100%;
    }
    
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      font-size: 1.2rem;
      color: #6c757d;
    }
    
    .error {
      padding: 20px;
      text-align: center;
      background-color: #f8d7da;
      border-radius: 8px;
      color: #721c24;
      margin: 20px 0;
    }
  `;

  if (loading) {
    return (
      <>
        <style>{emptyStateStyles}</style>
        <div className="loading">Loading top projects...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{emptyStateStyles}</style>
        <div className="error">Error loading data: {error}</div>
      </>
    );
  }

  // Each card section is now wrapped in a slider component with custom navigation
  return (
    <section className="contributions-section">
      <div className="research-content">
        <h2>Recent Achievements</h2><br />
        <br />
        <h3>Students</h3><br />
        <div className="carousel-container">
          <SliderArrow direction="prev" sliderRef={studentSliderRef1} />
          <Slider ref={studentSliderRef1} {...sliderSettings} className="card-slider">
            {studentAchievements.length > 0 ? (
              studentAchievements.map((achievement, index) => (
                <div key={index}>
                  <div className="card" onClick={() => handleAPIProjectClick(achievement)}>
                    <h4>{achievement.title}</h4>
                    <p className="contributor">
                      {achievement.user && achievement.user.name ? achievement.user.name :
                        (achievement.user_type === 'STUDENT' ? 'Student' : 'Faculty')}
                    </p>
                    <p>{achievement.description ? (achievement.description.length > 100 ? achievement.description.substring(0, 100) + '...' : achievement.description) : 'No description available'}</p>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-message">No top achievements available</div>
            )}
          </Slider>
          <SliderArrow direction="next" sliderRef={studentSliderRef1} />
        </div><br />

        <h3>Faculty</h3><br />
        <div className="carousel-container">
          <SliderArrow direction="prev" sliderRef={facultySliderRef1} />
          <Slider ref={facultySliderRef1} {...sliderSettings} className="card-slider">
            {facultyAchievements.length > 0 ? (
              facultyAchievements.map((achievement, index) => (
                <div key={index}>
                  <div
                    className="card"
                    onClick={() => handleAPIProjectClick(achievement)}
                  >
                    <h4>{achievement.title}</h4>
                    <p className="contributor">{achievement.user ? achievement.user.name : 'Faculty'}</p>
                    <p>{achievement.description ? (achievement.description.length > 100 ? achievement.description.substring(0, 100) + '...' : achievement.description) : 'No description available'}</p>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-message">No top achievements available</div>
            )}
          </Slider>
          <SliderArrow direction="next" sliderRef={facultySliderRef1} />
        </div>
      </div>

      <div className="research-content">
        <h2>Best Projects</h2><br />
        <h3>Students</h3><br />
        <div className="carousel-container">
          <SliderArrow direction="prev" sliderRef={studentSliderRef2} />
          <Slider ref={studentSliderRef2} {...sliderSettings} className="card-slider">
            {studentProjects.length > 0 ? (
              studentProjects.map((project, index) => (
                <div key={index}>
                  <div
                    className="card"
                    onClick={() => handleAPIProjectClick(project)}
                  >
                    <h4>{project.title}</h4>
                    <p className="contributor">{project.user ? project.user.name : 'Student'}</p>
                    <p>{project.description ? (project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description) : 'No description available'}</p>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-message">No top projects available</div>
            )}
          </Slider>
          <SliderArrow direction="next" sliderRef={studentSliderRef2} />
        </div><br />

        <h3>Faculty</h3><br />
        <div className="carousel-container">
          <SliderArrow direction="prev" sliderRef={facultySliderRef2} />
          <Slider ref={facultySliderRef2} {...sliderSettings} className="card-slider">
            {facultyProjects.length > 0 ? (
              facultyProjects.map((project, index) => (
                <div key={index}>
                  <div
                    className="card"
                    onClick={() => handleAPIProjectClick(project)}
                  >
                    <h4>{project.title}</h4>
                    <p className="contributor">{project.user ? project.user.name : 'Faculty'}</p>
                    <p>{project.description ? (project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description) : 'No description available'}</p>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-message">No top projects available</div>
            )}
          </Slider>
          <SliderArrow direction="next" sliderRef={facultySliderRef2} />
        </div>
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