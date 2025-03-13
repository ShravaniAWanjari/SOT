import React, { useState } from "react";
import './index.css';
import ContactUs from "./contactus";

const ProjectsPage = () => {
  // Sample projects data - this will be replaced with dynamic data later
  const allProjects = [
    {
      name: "Smart Campus Navigation App",
      authors: "Emily Carter, Jason Wang, Ravi Patel",
      description: "A mobile application that uses indoor positioning systems to help students navigate campus buildings, find classrooms, and locate resources efficiently."
    },
    {
      name: "EcoTrack Waste Management",
      authors: "Marcus Johnson, Zoe Garcia",
      description: "An IoT-based waste management system that monitors fill levels in bins across campus and optimizes collection routes to reduce energy consumption."
    },
    {
      name: "Virtual Lab Simulator",
      authors: "Dr. Thomas Nguyen, Alicia Brown, Kevin Park",
      description: "A VR-based laboratory simulation platform that allows students to conduct experiments in a safe, virtual environment before performing them in physical labs."
    },
    {
      name: "Automated Grading System",
      authors: "Prof. Laura Simmons, Derek Chen",
      description: "An AI-powered system that assists instructors in grading programming assignments by analyzing code quality, correctness, and efficiency."
    },
    {
      name: "Renewable Energy Dashboard",
      authors: "Sophia Miller, Omar Hassan, Leila Wong",
      description: "A real-time monitoring dashboard that tracks energy production from the solar panels and wind turbines installed on campus and visualizes energy consumption patterns."
    },
    {
      name: "Smart Study Group Matcher",
      authors: "Priya Sharma, Michael Johnson, David Lee",
      description: "An application that matches students for study groups based on course schedules, learning styles, and academic strengths to promote collaborative learning."
    },
    {
      name: "Campus Event Discovery Platform",
      authors: "Alex Rivera, Emma Chen, Jason Patel",
      description: "A mobile app that personalizes event recommendations for students based on their interests, academic program, and past attendance patterns."
    },
    {
      name: "AI Research Paper Assistant",
      authors: "Dr. Sarah Kim, Mark Thompson, Leila Ahmed",
      description: "A tool that helps researchers analyze scientific papers, extract key information, and identify potential research gaps or opportunities."
    },
    {
      name: "Peer-to-Peer Equipment Sharing",
      authors: "Carlos Rodriguez, Tara Wilson, Wei Chen",
      description: "A platform that enables students to share specialized equipment, tools, and resources through a secure booking and accountability system."
    },
    {
      name: "Sustainable Food Delivery Network",
      authors: "Maya Patel, Omar Hassan, Zoe Garcia",
      description: "An eco-friendly food delivery service that uses electric vehicles and optimized routing to reduce carbon footprint while serving campus dining needs."
    },
    {
      name: "AR Laboratory Guide",
      authors: "Prof. James Wilson, Andrea Lopez, Ravi Kumar",
      description: "An augmented reality application that overlays information and instructions on laboratory equipment to guide students through complex experiments."
    },
    {
      name: "Student Mental Health Companion",
      authors: "Dr. Jessica Wu, Daniel Brown, Sophia Martinez",
      description: "A mobile application providing resources, mood tracking, meditation guides, and anonymous peer support for student mental wellbeing."
    }
  ];
  
  // Configuration for pagination
  const projectsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination details
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject);
  
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
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
              <h2>{allProjects.length}</h2>
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
              <h2>Featured Projects</h2>
              <p>Below are some of the outstanding projects developed by our students and faculty. These projects showcase innovation, technical excellence, and creative problem-solving approaches.</p>
            </div>
            <div className="projects-table-container">
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
                      <td>{project.name}</td>
                      <td>{project.authors}</td>
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
            </div>
          </div>
          <ContactUs />
        </div>
    </div>
  );
};

export default ProjectsPage; 