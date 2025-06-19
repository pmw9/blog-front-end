// src/components/common/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar gradient-navbar">
      <div className="navbar-links-box">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;

/* Navbar.css
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  padding: 20px 0;
}
.navbar-links-box {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
}
.navbar a {
  text-decoration: none;
  color: #fff;
  padding: 10px 20px;
  font-size: 18px;
}
.navbar a:hover {
  opacity: 0.8;
}
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    padding: 10px 0;
  }
  .navbar-links-box {
    flex-direction: column;
    align-items: center;
  }
  .navbar a {
    padding: 10px;
    font-size: 16px;
  }
}
*/