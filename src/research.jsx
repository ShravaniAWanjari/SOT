import React, { useState } from "react";
import './index.css';
import ContactUs from "./contactus";

const ResearchPage = () => {
  // Sample research projects data - this will be replaced with dynamic data later
  const allProjects = [
    {
      name: "AI-Driven Weather Prediction",
      authors: "Dr. Sarah Chen, James Wilson, Priya Sharma",
      description: "Utilizing deep learning models to improve accuracy of short-term and long-term weather forecasting with a focus on extreme weather events."
    },
    {
      name: "Blockchain for Healthcare Data",
      authors: "Dr. Michael Rodriguez, Emma Johnson",
      description: "Developing secure blockchain protocols for managing and sharing sensitive healthcare data while maintaining patient privacy."
    },
    {
      name: "Sustainable IoT Networks",
      authors: "Prof. Robert Kim, David Chen, Lina Ahmed",
      description: "Designing energy-efficient IoT networks utilizing renewable energy sources for long-term environmental monitoring applications."
    },
    {
      name: "Quantum Computing Algorithms",
      authors: "Dr. Alan Zhao, Sophia Martinez",
      description: "Researching novel quantum algorithms for optimization problems that outperform classical computing approaches."
    },
    {
      name: "Cybersecurity Risk Assessment Framework",
      authors: "Prof. Diana Lee, Mark Thompson, Alex Rivera",
      description: "Creating a comprehensive framework for organizations to assess and mitigate cybersecurity risks in real-time."
    },
    {
      name: "Neural Interfaces for Accessibility",
      authors: "Dr. Maria Garcia, Kevin Lee, Sanjay Patel",
      description: "Developing brain-computer interfaces to assist individuals with mobility impairments in operating computers and smart devices."
    },
    {
      name: "Autonomous Vehicle Safety Systems",
      authors: "Prof. James Baker, Lisa Chen, Omar Hassan",
      description: "Researching advanced perception and decision-making algorithms to improve safety in autonomous vehicles under adverse conditions."
    },
    {
      name: "Natural Language Processing for Regional Dialects",
      authors: "Dr. Sofia Williams, Ahmed Khan",
      description: "Enhancing NLP models to better understand and process regional dialects and colloquialisms in multiple languages."
    },
    {
      name: "Sustainable Cloud Computing",
      authors: "Prof. Eric Johnson, Tara Singh, Miguel Rodriguez",
      description: "Investigating methods to optimize energy consumption in cloud data centers through efficient resource allocation and cooling systems."
    },
    {
      name: "Wearable Health Monitoring",
      authors: "Dr. Jessica Wu, Daniel Brown, Maya Patel",
      description: "Creating advanced wearable devices for continuous health monitoring with real-time analytics and early warning systems for medical conditions."
    },
    {
      name: "AR for Engineering Education",
      authors: "Prof. Thomas Wilson, Andrea Lopez, Wei Chen",
      description: "Developing augmented reality applications to enhance engineering education by visualizing complex concepts and providing interactive learning experiences."
    },
    {
      name: "Adaptive Learning Systems",
      authors: "Dr. Rachel Kim, Jason Patel, Carlos Mendez",
      description: "Creating intelligent tutoring systems that adapt to individual learning styles and pace to optimize educational outcomes."
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
              <h2>{allProjects.length}+</h2>
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
            <div className="stat-item">
              <h2>6</h2>
              <p>Patents Filed</p>
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

export default ResearchPage; 