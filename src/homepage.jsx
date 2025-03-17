import React, { useState, useEffect } from "react";
import ContactUs from "./contactus";
import './index.css';
import TopContributions from "./topcontributions";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Define slider images and content
  const sliderContent = [
    {
      image: `${import.meta.env.BASE_URL}images/image.png`,
      title: "Welcome to School of Technology",
      subtitle: "Fostering Innovation and Excellence"
    },
    {
      image: `${import.meta.env.BASE_URL}images/image.png`,  // Assuming you have more images
      title: "Leading Research and Development",
      subtitle: "Advancing Technology Through Collaborative Innovation"
    },
    {
      image: `${import.meta.env.BASE_URL}images/image.png`,  // Assuming you have more images
      title: "Student-Led Projects",
      subtitle: "Transforming Ideas into Real-World Solutions"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderContent.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [sliderContent.length]);

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderContent.length - 1 ? 0 : prev + 1));
  };

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderContent.length - 1 : prev - 1));
  };

  // Go to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider-container">
      <div className="slides">
        {sliderContent.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ transform: `translateX(${100 * (index - currentSlide)}%)` }}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="slide-image"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button className="slide-arrow prev-arrow" onClick={prevSlide}>
        &lt;
      </button>
      <button className="slide-arrow next-arrow" onClick={nextSlide}>
        &gt;
      </button>
      
      {/* Dots navigation */}
      <div className="slide-dots">
        {sliderContent.map((_, index) => (
          <button 
            key={index} 
            className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
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

        {/* Slider Styles */}
        <style jsx>{`
          .slider-container {
            position: relative;
            width: 100%;
            height: 600px;
            overflow: hidden;
            margin: 0 auto;
          }
          
          .slides {
            width: 100%;
            height: 100%;
            position: relative;
          }
          
          .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: transform 0.5s ease-in-out;
          }
          
          .slide-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .slide-content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 2rem 4rem;
            background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
            color: white;
            text-align: left;
          }
          
          .slide-content h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
          }
          
          .slide-content p {
            font-size: 1.2rem;
            margin: 0;
          }
          
          .slide-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.3s;
            z-index: 10;
          }
          
          .slide-arrow:hover {
            background: rgba(0, 0, 0, 0.8);
          }
          
          .prev-arrow {
            left: 20px;
          }
          
          .next-arrow {
            right: 20px;
          }
          
          .slide-dots {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 10;
          }
          
          .slide-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            border: none;
            cursor: pointer;
            transition: background 0.3s;
          }
          
          .slide-dot.active {
            background: white;
          }
          
          @media (max-width: 768px) {
            .slider-container {
              height: 400px;
            }
            
            .slide-content {
              padding: 1.5rem;
            }
            
            .slide-content h1 {
              font-size: 1.8rem;
            }
            
            .slide-content p {
              font-size: 1rem;
            }
            
            .slide-arrow {
              width: 40px;
              height: 40px;
            }
          }
          
          @media (max-width: 480px) {
            .slider-container {
              height: 300px;
            }
            
            .slide-content h1 {
              font-size: 1.5rem;
            }
            
            .slide-arrow {
              width: 30px;
              height: 30px;
              font-size: 1rem;
            }
          }
        `}</style>
    </div>
  );
};

export default HomePage;