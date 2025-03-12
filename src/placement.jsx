import React from 'react';
import './Placements.css'; // Using the same style theme

const Placements = () => {
  return (
    <div className="page-container">
      <div className="content-container">
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="research-content">
            <h2>Placements at SOT</h2>
            <p>
              Our students are placed in top companies across the globe. With a strong industry network and
              dedicated placement cell, SOT ensures great career opportunities for its graduates.
            </p>
          </div>
        </section>

        <section className="research-section">
          <div className="research-content">
            <h2>Top Hiring Companies</h2>
            <div className="card-container">
              <div className="card">Google</div>
              <div className="card">Microsoft</div>
              <div className="card">Amazon</div>
              <div className="card">Tesla</div>
              <div className="card">Meta</div>
            </div>
          </div>
        </section>

        <section className="research-section">
          <div className="research-content">
            <h2>Placement Statistics</h2>
            <p>Highest Package: ₹40 LPA</p>
            <p>Average Package: ₹12 LPA</p>
            <p>Placement Rate: 95%</p>
          </div>
        </section>

        <section className="research-section">
          <div className="research-content">
            <h2>Alumni Testimonials</h2>
            <div className="card-container">
              <div className="card">
                <p>"SOT prepared me for the industry with hands-on projects and internships!"</p>
                <h4>- John Doe, Google</h4>
              </div>
              <div className="card">
                <p>"The placement support at SOT helped me land my dream job at Amazon!"</p>
                <h4>- Jane Smith, Amazon</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Placements;
