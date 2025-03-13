import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  // Add the scroll effect functionality
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
      } else {
        document.querySelector('.navbar').classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={`${import.meta.env.BASE_URL}images/image1.svg`} alt="Logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/signup" className={location.pathname === "/signup" ? "active" : ""}>Register/Login</Link>
        <Link to="/forms" className={location.pathname === "/forms" ? "active" : ""}>Forms</Link>
      </div>
    </nav>
  );
};

export default Navbar;