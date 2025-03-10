import React from "react";
import "./index.css"; // If needed for extra styling

const TopContributions = () => {
  return (
    <section className="contributions-section">
      <div className="research-content projects-content">
      <h3>Recent Achievements</h3><br/>
      <br/>
        <h3>Students</h3><br/>
        <div className="card-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="card" key={index}>
              <h4>Project Name {index + 1}</h4>
              <p className="contributor">By Student Name {index + 1} - Year {index + 1}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          ))}
        </div><br/>

        <h3>Faculty</h3><br/>
        <div className="card-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="card" key={index}>
              <h4>Project Name {index + 1}</h4>
              <p className="contributor">By Faculty Name {index + 1} - Assistant Professor</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          ))}
        </div>
      </div>

      <div className="research-content achievements-content">
        <h3>Best Projects</h3><br/>
        <h3>Students</h3><br/>
        <div className="card-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="card" key={index}>
              <h4>Name {index + 1}</h4>
              <p className="contributor">By Student Name {index + 1} - Year {index + 1}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          ))}
        </div><br/>

        <h3>Faculty</h3><br/>
        <div className="card-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="card" key={index}>
              <h4>Name {index + 1}</h4>
              <p className="contributor">By Faculty Name {index + 1} - Assistant Professor</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          ))}
        </div>
      </div>

      <div className="research-content research-topics-content">
        <h3>Top 5 Ongoing Research Topics</h3><br/>
        <h3>Students</h3><br/>
        <div className="card-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="card" key={index}>
              <h4>Research Topic {index + 1}</h4>
              <p className="contributor">By Student Name {index + 1} - Year {index + 1}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          ))}
        </div><br/>

        <h3>Faculty</h3><br/>
        <div className="card-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="card" key={index}>
              <h4>Research Topic {index + 1}</h4>
              <p className="contributor">By Faculty Name {index + 1} - Assistant Professor</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContributions;