import React, { useState } from "react";
import "./index.css"; // If needed for extra styling

const TopContributions = () => {
  // State to track which project's popup is currently shown
  const [selectedProject, setSelectedProject] = useState(null);

  // Additional project details that would be shown in the popup
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

  // Function to handle clicking on a project card
  const handleProjectClick = (type, index) => {
    setSelectedProject({ type, index });
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

  return (
    <section className="contributions-section">
      <div className="research-content">
      <h2>Recent Achievements</h2><br/>
      <br/>
        <h3>Students</h3><br/>
        <div className="card-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              className="card" 
              key={index} 
              onClick={() => handleProjectClick('student', index)}
            >
              <h4>{projectDetails.student[index].title}</h4>
              <p className="contributor">{projectDetails.student[index].author}</p>
              <p>{projectDetails.student[index].description}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          ))}
        </div><br/>

        <h3>Faculty</h3><br/>
        <div className="card-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              className="card" 
              key={index} 
              onClick={() => handleProjectClick('faculty', index)}
            >
              <h4>{projectDetails.faculty[index].title}</h4>
              <p className="contributor">{projectDetails.faculty[index].author}</p>
              <p>{projectDetails.faculty[index].description}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          ))}
        </div>
      </div>

      <div className="research-content">
        <h2>Best Projects</h2><br/>
        <h3>Students</h3><br/>
        <div className="card-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              className="card" 
              key={index} 
              onClick={() => handleProjectClick('student', index)}
            >
              <h4>{projectDetails.student[index].title}</h4>
              <p className="contributor">{projectDetails.student[index].author}</p>
              <p>{projectDetails.student[index].description}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          ))}
        </div><br/>

        <h3>Faculty</h3><br/>
        <div className="card-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              className="card" 
              key={index} 
              onClick={() => handleProjectClick('faculty', index)}
            >
              <h4>{projectDetails.faculty[index].title}</h4>
              <p className="contributor">{projectDetails.faculty[index].author}</p>
              <p>{projectDetails.faculty[index].description}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          ))}
        </div>
      </div>

      <div className="research-content">
        <h2>Top 6 Ongoing Research Topics</h2><br/>
        <h3>Students</h3><br/>
        <div className="card-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              className="card" 
              key={index} 
              onClick={() => handleProjectClick('student', index)}
            >
              <h4>{projectDetails.student[index].title}</h4>
              <p className="contributor">{projectDetails.student[index].author}</p>
              <p>{projectDetails.student[index].description}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          ))}
        </div><br/>

        <h3>Faculty</h3><br/>
        <div className="card-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              className="card" 
              key={index} 
              onClick={() => handleProjectClick('faculty', index)}
            >
              <h4>{projectDetails.faculty[index].title}</h4>
              <p className="contributor">{projectDetails.faculty[index].author}</p>
              <p>{projectDetails.faculty[index].description}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          ))}
        </div>
      </div>

      {/* Render the popup if a project is selected */}
      {selectedProject && (
        <ProjectPopup 
          project={projectDetails[selectedProject.type][selectedProject.index]} 
        />
      )}
    </section>
  );
};

export default TopContributions;