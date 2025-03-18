import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ContactUs from "./contactus";
import "./index.css"; // Load index.css first
import "./styles/Placements.css"; // Load placement.css after, so it overrides index.css

// Ensure consistent styling with index.css for the hero banner
const bannerStyles = {
  placementHero: {
    minHeight: "350px",
    height: "auto",
    padding: "4rem 8rem"
  },
  statItem: {
    height: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
};

const companyLogos = [
  { name: "Google", src: "https://img.icons8.com/color/96/google-logo.png" },
  { name: "Microsoft", src: "https://img.icons8.com/fluency/96/microsoft.png" },
  { name: "Amazon", src: "https://img.icons8.com/color/96/amazon.png" },
  { name: "Meta", src: "https://img.icons8.com/color/96/facebook-new.png" },
];

const testimonials = [
  {
    name: "1",
    batch: "BTech 2024",
    company: "Google",
    image:
      "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg",
    quote:
      "The placement cell helped me refine my skills and connect with the right companies. The experience was invaluable!",
  },
  {
    name: "2",
    batch: "BTech 2024",
    company: "Amazon",
    image:
      "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg",
    quote:
      "The placement cell helped me refine my skills and connect with the right companies. The experience was invaluable!",
  },
  {
    name: "3",
    batch: "BTech 2024",
    company: "Microsoft",
    image:
      "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg",
    quote:
      "The placement cell helped me refine my skills and connect with the right companies. The experience was invaluable!",
  },
];

const Placements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 2;

  const nextTestimonials = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + testimonialsPerPage >= testimonials.length) {
        return 0; // Reset to the beginning when reaching the end
      }
      return prevIndex + testimonialsPerPage;
    });
  };
  
  return (
    <div>
    <div className="placements-container">
      <section className="placement-hero">
        <div className="placement-hero-content">
          <h1 className="hero-title">B.Tech Placement Highlights</h1>
          <p className="hero-description">
            Woxsen's B.Tech program stands out for its cutting-edge facilities,
            including the AI & Robotics studio, where students immerse
            themselves in hands-on projects. Workshops for skill development and
            mentorship opportunities at the Trade Tower further enhance their
            learning journey. With a steadfast dedication to industry relevance
            and practical learning, Woxsen ensures that B.Tech graduates are
            equipped to excel in today's dynamic tech sector, positioning them
            as top choices for leading recruiters.
          </p>
        </div>
        <div className="placement-stats">
          <div className="stat-item">
            <h2>100%</h2>
            <p>Placement Track</p>
          </div>
          <div className="stat-item" style={bannerStyles.statItem}>
            <h2>24.00</h2>
            <p>Highest CTC</p>
          </div>
          <div className="stat-item" style={bannerStyles.statItem}>
            <h2>11.5</h2>
            <p>Top 20% Avg. CTC</p>
          </div>
          <div className="stat-item" style={bannerStyles.statItem}>
            <h2>8.6</h2>
            <p>Overall Avg. CTC</p>
          </div>
          <div className="stat-item" style={bannerStyles.statItem}>
            <h2>40+</h2>
            <p>Corporates for Internships</p>
          </div>
        </div>
      </section>

      <section className="hiring-section">
        <h2 className="hiring-section-title">Top Hiring Companies</h2>
        <div className="hiring-companies">
          {companyLogos.map((company, index) => (
            <div key={index} className="company-card">
              <img
                src={company.src}
                alt={company.name}
                className="company-logo"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="testimonials-wrapper">
        <h2 className="testimonials-title">Placement Stories</h2>
        <div className="testimonials-container">
          {testimonials
            .slice(currentIndex, currentIndex + testimonialsPerPage)
            .map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-image"
                />
                <div className="testimonial-content">
                  <p className="testimonial-quote">“{testimonial.quote}”</p>
                  <h4 className="testimonial-name">
                    {testimonial.name} ({testimonial.batch})
                  </h4>
                  <p className="testimonial-company">
                    Placed at: <strong>{testimonial.company}</strong>
                  </p>{" "}
                </div>
              </div>
            ))}
        </div>
        <div className="next-arrow" onClick={nextTestimonials}>
          <FaArrowRight />
        </div>
      </div>
     

    </div>
    <ContactUs />

    </div>




  );
};

export default Placements;