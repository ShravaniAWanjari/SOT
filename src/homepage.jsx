import React from "react";
import './index.css';
import ContactUs from "./contactus"; // Adjust path if needed
import TopContributions from "./topcontributions";


const HomePage = () => {
  return (
    <div className="page-container">
        <navbar />
        <div className="hero-section">
          <div className="hero-image-wrapper">
            <img 
              src={`${import.meta.env.BASE_URL}images/image2.jpg`} 
              alt="School of Technology" 
              className="hero-image"
              loading="eager" 
            />
          </div>
        </div>
        <div className="content-container">
          <div className="research-section">
            <div className="research-content">
              <h2>Research, Projects & Achievements at SOT</h2>
              <p>At SOT, both students and faculty are actively involved in research, hands-on projects, and academic achievements across various fields. From AI and cybersecurity to renewable energy and biomedical engineering, research here focuses on practical solutions and real-world impact.</p>            
              <p>Faculty members contribute through publications, industry collaborations, and research initiatives, while students take on technical projects, competitions, and entrepreneurial ventures. Their combined efforts have led to patents, conference presentations, and awards, highlighting SOT's commitment to innovation and academic excellence.</p>
            </div>
          </div>
          <TopContributions />
          <ContactUs />
        </div>
    </div>
  );
};

export default HomePage;

