import './styles/imageslider.css';

import React, { useEffect, useRef, useState } from "react";

import ContactUs from "./contactus";
import './index.css';
import TopContributions from "./topcontributions";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef(null);
  
  // Define slider images and content
  const sliderContent = [
    {
      image: `${import.meta.env.BASE_URL}images/image.png`,
      title: "SOT",
      subtitle: "Fostering Innovation and Excellence"
    },
    {
      image: `${import.meta.env.BASE_URL}images/sos.jpg`,  // Assuming you have more images
      title: "Leading Research and Development",
      subtitle: "Advancing Technology Through Collaborative Innovation"
    },
    {
      image: `${import.meta.env.BASE_URL}images/students.png`,  // Assuming you have more images
      title: "Student-Led Projects",
      subtitle: "Transforming Ideas into Real-World Solutions"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    startAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [currentSlide]);

  const startAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
  };

  const pauseAutoplay = () => {
    clearInterval(autoplayRef.current);
  };

  // Navigate to next slide
  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === sliderContent.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  // Navigate to previous slide
  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === 0 ? sliderContent.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  // Go to a specific slide
  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  return (
    <div 
      className="slider-container"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* Slides */}
      <div className="slides-wrapper">
        {sliderContent.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              transform: `translateX(${100 * (index - currentSlide)}%)`,
              zIndex: index === currentSlide ? 2 : 1
            }}
          >
            <div className="slide-overlay"></div>
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="slide-image"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="slide-content">
              <div className="slide-text-container">
                <h1 className="slide-title">{slide.title}</h1>
                <div className="title-underline"></div>
                <p className="slide-subtitle">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button 
        className="slide-arrow prev-arrow" 
        onClick={prevSlide} 
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button 
        className="slide-arrow next-arrow" 
        onClick={nextSlide} 
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Progress indicators */}
      <div className="progress-container">
        {sliderContent.map((_, index) => (
          <button 
            key={index} 
            className={`progress-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="progress-dot"></span>
            {index === currentSlide && (
              <span className="progress-fill" style={{animationDuration: '6s'}}></span>
            )}
          </button>
        ))}
      </div>
      
      {/* Slide counter */}
      <div className="slide-counter">
        <span className="current-slide">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="slide-divider">/</span>
        <span className="total-slides">{String(sliderContent.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="page-container">
        <div className="hero-section">
          <ImageSlider />
        </div>
        <div className="content-container">
        <section className="section-research">
  <div className="container-research">
    <h2 className="section-heading">Research, Projects & Achievements</h2>
    
    <div className="research-section-content">
      
      {/* Content Paragraphs */}
      <div className="research-paragraphs">
        <p className="research-paragraph">
          At SOT, both students and faculty are actively involved in research, hands-on projects, and academic achievements across various fields. From <strong>AI and cybersecurity</strong> to <strong>renewable energy</strong> and <strong>biomedical engineering</strong>, research here focuses on practical solutions and real-world impact.
        </p>
        
        <p className="research-paragraph">
          Faculty members contribute through publications, industry collaborations, and research initiatives, while students take on technical projects, competitions, and entrepreneurial ventures. Their combined efforts have led to patents, conference presentations, and awards, highlighting SOT's commitment to innovation and academic excellence.
        </p>
      </div>
    </div>
  </div>
</section>
          <TopContributions />
          <ContactUs />
        </div>
    </div>
  );
};

export default HomePage;