// src/pages/Gallery.tsx
import React from 'react';
import './styles/Gallery.css';

const Gallery: React.FC = () => {
  return (
    <div className="gallery-container">
      <h1>Gallery</h1>
      <div className="image-grid">
        <div className="image-item">
          <img src="/images/steak1.jpg" alt="Juicy grilled steak" />
          <p>Signature T-bone steak</p>
        </div>
        <div className="image-item">
          <img src="/images/interior1.jpg" alt="Restaurant interior" />
          <p>Our cozy dining area</p>
        </div>
        <div className="image-item">
          <img src="/images/team.jpg" alt="Staff team" />
          <p>Meet our team</p>
        </div>
        <div className="image-item">
          <img src="/images/dessert.jpg" alt="Dessert" />
          <p>House-made desserts</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;