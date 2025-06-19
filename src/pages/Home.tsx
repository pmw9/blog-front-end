// src/pages/Home.tsx
import React from 'react';
import { Link } from "react-router-dom";
import './styles/HomePage.css';

const menuItems = [
  { label: "Steak plate", src: "/assests/home/steak1.jpg.jpg" },
  { label: "Grilled ribeye", src: "/assests/home/steak2.jpg.jpg" },
  { label: "Steak and fries", src: "/assests/home/steak3.jpg.jpg" },
  { label: "Steak with veggies", src: "/assests/home/steak4.jpg.jpg" },
];

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="header">WELCOME TO STEAKZ!</h1>

      <div className="buttons-container">
        <Link to="/check-reservation">
          <button className="btn-reserve">1. Check Reservation</button>
        </Link>
        <Link to="/book-reservation">
          <button className="btn-reserve">2. Book Reservation</button>
        </Link>
      </div>

      <div className="image-grid">
        {menuItems.map((item) => (
          <div key={item.label} className="image-card">
            <img
              src={item.src}
              alt={item.label}
            />
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>We Are Hiring!</h4>
            <p>Join our team and be part of the STEAKZ family in Barcelona.</p>
            <a href="#" style={{fontWeight: 'bold', textDecoration: 'underline'}}>Apply Now</a>
          </div>
          <div className="footer-section">
            <h4>Find Us</h4>
            <iframe
              title="STEAKZ Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.1734%2C41.3851%2C2.1834%2C41.3951&amp;layer=mapnik"
              style={{width: '100%', height: '90px', border: 0, borderRadius: '8px'}}
              allowFullScreen
              loading="lazy"
            ></iframe>
            <p style={{fontSize: '0.95rem', marginTop: '0.3rem'}}>Carrer del Foc 123, Barcelona</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X"><i className="fab fa-x-twitter"></i></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            </div>
            <div style={{marginTop: '0.3rem', fontSize: '0.98rem', color: '#fff'}}>
              <i className="fas fa-map-marker-alt"></i> Carrer del Foc 123, Barcelona<br />
              <i className="fas fa-phone"></i> +34 612 345 678
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p style={{fontSize: '0.98rem', color: '#fff'}}>Email: contact@steakzbarcelona.com</p>
            <p style={{fontSize: '0.98rem', color: '#fff'}}>Phone: +34 612 345 678</p>
          </div>
        </div>
        <p style={{marginTop: '0.7rem', color: '#ccc', fontSize: '0.92rem', textAlign: 'center'}}>© 2025 STEAKZ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;