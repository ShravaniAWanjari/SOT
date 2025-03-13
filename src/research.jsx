import React from "react";
import './index.css';
import ContactUs from "./contactus";

const ResearchPage = () => {
  return (
    <div className="page-container">
        <div className="hero-section">
          <div className="hero-image-wrapper">
            <img 
              src={`${import.meta.env.BASE_URL}images/image2.jpg`} 
              alt="School of Technology Research" 
              className="hero-image"
              loading="eager" 
            />
          </div>
        </div>
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
                  <tr>
                    <td>AI-Driven Weather Prediction</td>
                    <td>Dr. Sarah Chen, James Wilson, Priya Sharma</td>
                    <td>Utilizing deep learning models to improve accuracy of short-term and long-term weather forecasting with a focus on extreme weather events.</td>
                  </tr>
                  <tr>
                    <td>Blockchain for Healthcare Data</td>
                    <td>Dr. Michael Rodriguez, Emma Johnson</td>
                    <td>Developing secure blockchain protocols for managing and sharing sensitive healthcare data while maintaining patient privacy.</td>
                  </tr>
                  <tr>
                    <td>Sustainable IoT Networks</td>
                    <td>Prof. Robert Kim, David Chen, Lina Ahmed</td>
                    <td>Designing energy-efficient IoT networks utilizing renewable energy sources for long-term environmental monitoring applications.</td>
                  </tr>
                  <tr>
                    <td>Quantum Computing Algorithms</td>
                    <td>Dr. Alan Zhao, Sophia Martinez</td>
                    <td>Researching novel quantum algorithms for optimization problems that outperform classical computing approaches.</td>
                  </tr>
                  <tr>
                    <td>Cybersecurity Risk Assessment Framework</td>
                    <td>Prof. Diana Lee, Mark Thompson, Alex Rivera</td>
                    <td>Creating a comprehensive framework for organizations to assess and mitigate cybersecurity risks in real-time.</td>
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

export default ResearchPage; 