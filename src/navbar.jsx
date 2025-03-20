import React, { useEffect, useState } from "react";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./styles/homepage.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth status whenever the component mounts or location changes
  useEffect(() => {
    checkAuthStatus();
    
    // Check for token expiration
    const checkTokenExpiration = () => {
      const tokenExpiry = localStorage.getItem('token_expiry');
      if (tokenExpiry) {
        const expiryTime = parseInt(tokenExpiry, 10);
        const currentTime = new Date().getTime();
        
        if (currentTime > expiryTime) {
          // Token has expired, log the user out
          handleLogout();
          console.log('Token expired, user logged out automatically');
        }
      }
    };
    
    // Check token expiration immediately
    checkTokenExpiration();
    
    // Set interval to check expiration every minute
    const interval = setInterval(checkTokenExpiration, 60000);
    
    // Listen for storage events (login/logout in other tabs)
    window.addEventListener("storage", checkAuthStatus);
    
    // Custom event for login state changes
    window.addEventListener("auth_state_changed", checkAuthStatus);
    
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("auth_state_changed", checkAuthStatus);
      clearInterval(interval);
    };
  }, [location.pathname]); // Re-run when route changes

  const checkAuthStatus = () => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("token_expiry");
    
    // Check if token exists and hasn't expired
    if (token && tokenExpiry) {
      const expiryTime = parseInt(tokenExpiry, 10);
      const currentTime = new Date().getTime();
      
      if (currentTime <= expiryTime) {
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
        // Token expired
        handleLogout();
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
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUserData(null);
    setMenuOpen(false);
    
    // Dispatch auth state changed event
    window.dispatchEvent(new Event("auth_state_changed"));
    
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
        <Link to="/achievements" onClick={() => setMenuOpen(false)}>Achievements</Link>
        <Link to="/contactpage" onClick={() => setMenuOpen(false)}>Contact</Link>

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
        <Link to="/achievements">Achievements</Link>
        <Link to="/placements">Placements</Link>
        <Link to="/contactpage">Contact</Link>

        
        {isLoggedIn && <Link to="/forms">Forms</Link>}

        {isLoggedIn ? (
          <div className="user-dropdown">
            <img 
              src={`${import.meta.env.BASE_URL}images/pfp.jpeg`} 
              alt="Profile" 
              className="profile-img"
            />

            <div className="dropdown-content">
              <span>Hello, <br></br>{getUserDisplayName()}</span>
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