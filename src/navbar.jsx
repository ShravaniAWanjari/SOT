import React, { useEffect, useState } from "react";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserData(user);
        } catch (e) {
          console.error("Failed to parse user data:", e);
        }
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUserData(null);
    setMenuOpen(false);
    navigate("/");
  };

  const getUserDisplayName = () => {
    if (!userData) return "User";
    return userData.name || userData.email || "User";
  };

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
        <Link to="/placements" onClick={() => setMenuOpen(false)}>Placements</Link>
        <Link to="/achivements" onClick={() => setMenuOpen(false)}>achivements</Link>

        {isLoggedIn ? (
          <>
            <Link to="/forms" onClick={() => setMenuOpen(false)}>Forms</Link>
            <div className="user-dropdown">
            <img 
              src={`${import.meta.env.BASE_URL}images/pfp.jpeg`} 
              alt="Profile" 
              className="profile-img"
            />
              <div className="dropdown-content">
                <span>Hello, {getUserDisplayName()}</span>
                <button onClick={handleLogout} className="logout-button">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <Link to="/signup" onClick={() => setMenuOpen(false)}>Register/Login</Link>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/research">Research</Link>
        <Link to="/placements">Placements</Link>
        <Link to="/achivements">Achivements</Link>
        

        
        {isLoggedIn && <Link to="/forms">Forms</Link>}

        {isLoggedIn ? (
          <div className="user-dropdown">
            <img 
              src={`${import.meta.env.BASE_URL}images/pfp.jpeg`} 
              alt="Profile" 
              className="profile-img"
            />

            <div className="dropdown-content">
              <span>Hello, {getUserDisplayName()}</span>
              <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/signup">Register/Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;