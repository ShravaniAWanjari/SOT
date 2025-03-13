import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={`${import.meta.env.BASE_URL}images/image1.svg`} alt="Logo" />
        </Link>
      </div>
      
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(true)}>
        <FaBars />
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="close-icon" onClick={() => setMenuOpen(false)}>
          <FaTimes />
        </div>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
        <Link to="/research" onClick={() => setMenuOpen(false)}>Research</Link>
        <Link to="/signup" onClick={() => setMenuOpen(false)}>Register/Login</Link>
        <Link to="/forms" onClick={() => setMenuOpen(false)}>Forms</Link>
        <Link to="/placements" onClick={() => setMenuOpen(false)}>Placements</Link> {/* Added Link */}
      </div>

      {/* Desktop Menu */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/research">Research</Link>
        <Link to="/signup">Register/Login</Link>
        <Link to="/forms">Forms</Link>
        <Link to="/placements">Placements</Link> {/* Added Link */}
      </div>
    </nav>
  );
};

export default Navbar;
