import React from 'react';
import './styles/Footer.css';

const Footer: React.FC = () => (
  <footer className="footer">
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
    </div>
    <div className="footer-section">
      <h4>Contact</h4>
      <p>Email: contact@steakzbarcelona.com</p>
      <p>Phone: +34 612 345 678</p>
    </div>
    <div className="footer-bottom">
      © 2025 STEAKZ. All rights reserved.
    </div>
  </footer>
);

export default Footer;

export {};