import React, { useState } from 'react';
import './styles/contactpage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="con-page-wrapper">
      <div className="con-container">
        <div className="con-content">
          {/* Two-column layout with balanced proportions */}
          <div className="con-main-layout">
            {/* Left column with contact info and map */}
            <div className="con-left-column">
              <div className="con-info">
                <h2>Get in Touch</h2>
                
                <div className="con-info-item">
                  <div className="con-info-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="con-info-text">
                    <h3>Phone</h3>
                    <p>+91 123-4567</p>
                  </div>
                </div>
                
                <div className="con-info-item">
                  <div className="con-info-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="con-info-text">
                    <h3>Email</h3>
                    <p>sot@woxsen.edu.in</p>
                  </div>
                </div>
                
                <div className="con-info-item">
                  <div className="con-info-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="con-info-text">
                    <h3>Address</h3>
                    <p>Woxsen University, Hyderabad<br/>Telangana, India</p>
                  </div>
                </div>

                {/* Connect With Us section integrated better with contact info */}
                <div className="con-social-links">
                  <div className="con-social-heading">
                    <h3>Connect With Us</h3>
                  </div>
                  <div className="con-social-icons">
                    <a href="#" className="con-social-icon" aria-label="LinkedIn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a href="#" className="con-social-icon" aria-label="Twitter">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="con-social-icon" aria-label="Instagram">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="con-social-icon" aria-label="Facebook">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="con-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d121664.38115841545!2d77.71732374377837!3d17.649594880037117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bc9533c6aaaaaab%3A0x4f10ac8424d0d1dc!2sKamkole%2C%20Sadasivpet%2C%20Hyderabad%2C%20Telangana%20502345!3m2!1d17.649611999999998!2d77.7997255!5e0!3m2!1sen!2sin!4v1742305690156!5m2!1sen!2sin"
                  width="400"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="con-map-overlay">
                  <button 
                    className="con-view-map-btn" 
                    onClick={() => window.open('https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d121664.38115841545!2d77.71732374377837!3d17.649594880037117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bc9533c6aaaaaab%3A0x4f10ac8424d0d1dc!2sKamkole%2C%20Sadasivpet%2C%20Hyderabad%2C%20Telangana%20502345!3m2!1d17.649611999999998!2d77.7997255!5e0!3m2!1sen!2sin!4v1742305690156!5m2!1sen!2sin', '_blank')}
                  >
                    View Full Map
                  </button>
                </div>
              </div>
            </div>

            {/* Right column with form */}
            <div className="con-right-column">
              <div className="con-form-container">
                <form className="con-form" onSubmit={handleSubmit}>
                  <div className="con-form-group">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Your Name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="con-form-input"
                    />
                  </div>
                  <div className="con-form-group">
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Your Email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="con-form-input"
                    />
                  </div>
                  <div className="con-form-group">
                    <input 
                      type="text" 
                      name="subject" 
                      placeholder="Subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      required 
                      className="con-form-input"
                    />
                  </div>
                  <div className="con-form-group">
                    <textarea 
                      name="message" 
                      placeholder="Your Message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      className="con-form-textarea"
                      rows="8"
                    ></textarea>
                  </div>

                  <button className="con-submit-btn">
                    Send Message
                  </button>

                  {submitted && (
                    <div className="con-success-message">
                      Your message has been sent successfully!
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
      

    </div>
    
  );
};

export default ContactPage;
