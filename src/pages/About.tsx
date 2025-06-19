// src/pages/About.tsx
import React from 'react';
import './styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About STEAKZ</h1>
      <p>
        Founded in 2024 in Barcelona, Spain, STEAKZ is the vision of Praise Mwangi—a culinary
        enthusiast with a passion for grilling premium cuts. Our approach is deeply influenced by
        the vibrant flavors of Spain and Catalonia, blending local tradition with bold, modern
        grilling.
      </p>
      <p>
        At STEAKZ, every dish is a celebration of Barcelona’s rich food culture, from our signature
        marinades to our perfectly grilled prime cuts. We believe in sourcing the finest
        ingredients, grilling with passion, and always putting our guests first.
      </p>
      <p><strong>Motto:</strong> “Barcelona’s Boldest Bites. Passion on Every Plate.”</p>
    </div>
  );
};

export default About;
