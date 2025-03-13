import React from "react";
import './index.css';
import ContactUs from "./contactus";

const ProjectsPage = () => {
  return (
    <div className="page-container">
        <div className="hero-section">
          <div className="hero-image-wrapper">
            <img 
              src={`${import.meta.env.BASE_URL}images/image2.jpg`} 
              alt="School of Technology Projects" 
              className="hero-image"
              loading="eager" 
            />
          </div>
        </div>
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
                  <tr>
                    <td>Smart Campus Navigation App</td>
                    <td>Emily Carter, Jason Wang, Ravi Patel</td>
                    <td>A mobile application that uses indoor positioning systems to help students navigate campus buildings, find classrooms, and locate resources efficiently.</td>
                  </tr>
                  <tr>
                    <td>EcoTrack Waste Management</td>
                    <td>Marcus Johnson, Zoe Garcia</td>
                    <td>An IoT-based waste management system that monitors fill levels in bins across campus and optimizes collection routes to reduce energy consumption.</td>
                  </tr>
                  <tr>
                    <td>Virtual Lab Simulator</td>
                    <td>Dr. Thomas Nguyen, Alicia Brown, Kevin Park</td>
                    <td>A VR-based laboratory simulation platform that allows students to conduct experiments in a safe, virtual environment before performing them in physical labs.</td>
                  </tr>
                  <tr>
                    <td>Automated Grading System</td>
                    <td>Prof. Laura Simmons, Derek Chen</td>
                    <td>An AI-powered system that assists instructors in grading programming assignments by analyzing code quality, correctness, and efficiency.</td>
                  </tr>
                  <tr>
                    <td>Renewable Energy Dashboard</td>
                    <td>Sophia Miller, Omar Hassan, Leila Wong</td>
                    <td>A real-time monitoring dashboard that tracks energy production from the solar panels and wind turbines installed on campus and visualizes energy consumption patterns.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <ContactUs />
        </div>
    </div>
  );
};

export default ProjectsPage; 