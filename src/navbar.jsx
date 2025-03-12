import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="logo">
      <Link to="/">
      <img src={`${import.meta.env.BASE_URL}images/image1.svg`} alt="Logo" />
      </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/signup">Register/Login</Link>
        <Link to="/forms">Forms</Link>
      </div>
    </nav>
  );
};

export default Navbar;


