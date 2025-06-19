import React from 'react';
import { Link } from 'react-router-dom';
import './styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>WELCOME TO STEAKZ!</h1>
      <div className="image-row">
        <div>
          <img src={process.env.PUBLIC_URL + '/images/steakplate.jpg'} alt="Steak plate" />
          <p>Steak plate</p>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/ribeye.jpg'} alt="Grilled ribeye" />
          <p>Grilled ribeye</p>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/steakfries.jpg'} alt="Steak and fries" />
          <p>Steak and fries</p>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/steakveggies.jpg'} alt="Steak with veggies" />
          <p>Steak with veggies</p>
        </div>
      </div>

      <section className="home-info">
        <h2>STEAKZ</h2>
        <p>Your go-to steakhouse for sizzling flavors and quality cuts.</p>
        <div className="quick-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/gallery">Gallery</Link>
        </div>
      </section>
    </div>
  );
}
