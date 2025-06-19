// src/pages/Contact.tsx
import React from 'react';
import './styles/Contact.css';

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have questions, feedback, or just want to say hi? Reach out to us!</p>

      <div className="contact-details">
        <p><strong>Address:</strong> 123 Steakz Street, Grill City, GC 45678</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Email:</strong> contact@steakz.com</p>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows={5} required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;