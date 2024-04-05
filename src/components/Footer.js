import React from 'react';
import './Footer.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF,faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
      
            <li><a href="/pets">Our Pets</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <ul className="social-icons">
            <li><a href="https://www.facebook.com/FurryFamilyFinds/"><FontAwesomeIcon icon={faFacebookF} /></a></li>
            <li><a href="http://instagram.com/FurryFamilyFinds/"><FontAwesomeIcon icon={faInstagram} /></a></li>
        
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Furry Family Finds. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
