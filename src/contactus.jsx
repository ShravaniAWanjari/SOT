import React from "react";
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import './styles/contactus.css';

const ContactUs = () => {
  return (
    <footer className="contact-section">
      <div className="separator"></div> {/* Elegant Separator */}

      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Have any questions? Feel free to reach out to us.</p>
          <p>
            <FaEnvelope className="icon" />{" "}
            <a href="mailto:office.sot@woxsen.edu.in">
              office.sot@woxsen.edu.in
            </a>
          </p>
          <p>
            <FaPhoneAlt className="icon" /> 2909180302983
          </p>
          <p>
            <FaMapMarkerAlt className="icon" /> Woxsen University, India
          </p>
        </div>

        <div className="social-links">
          <h3>Follow Us</h3>
          <div className="icons">
            <a href="#" className="social-icon">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon">
              <FaLinkedin />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Woxsen University. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default ContactUs;
