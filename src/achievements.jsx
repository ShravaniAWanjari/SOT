import React from "react";
import './index.css';
import ContactUs from "./contactus";

const AchievementsPage = () => {
  return (
    <div className="page-container">
        <div className="hero-section">
          <div className="hero-image-wrapper">
            <img 
              src={`${import.meta.env.BASE_URL}images/image2.jpg`} 
              alt="School of Technology Achievements" 
              className="hero-image"
              loading="eager" 
            />
          </div>
        </div>
        <div className="content-container">
          <div className="research-section">
            <div className="research-content">
              <h2>Achievements at SOT</h2>
              <p>The School of Technology has a proud history of achievements across various domains. Our students, faculty, and alumni have excelled in academic competitions, research endeavors, industry projects, and entrepreneurial ventures, bringing recognition to the institution.</p>
              <p>These achievements reflect our commitment to excellence, innovation, and holistic development. From winning hackathons and coding competitions to securing research grants and publishing in prestigious journals, the SOT community continues to reach new heights of success.</p>
            </div>
          </div>
          <div className="contributions-section">
            <div className="research-content">
              <h2>Notable Achievements</h2>
              <p>Here are some of the notable achievements of our students, faculty, and the institution as a whole. These achievements span various categories including academic excellence, innovation, research contributions, and industry recognition.</p>
            </div>
            {/* Achievement listings could be added here */}
          </div>
          <ContactUs />
        </div>
    </div>
  );
};

export default AchievementsPage; 