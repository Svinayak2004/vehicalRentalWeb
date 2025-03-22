import React from 'react';
import './Footer.css';
import whatsappIcon from '../Assets/whats1.png';
import instagramIcon from '../Assets/instagram-logo.png';
import facebookIcon from '../Assets/facebook.png';
import twitter from '../Assets/twitter.png';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h1 className="logo"><span>VARS</span> Vehicle Rentals</h1>
          <p>Experience hassle-free vehicle rentals with our reliable and affordable service. Whether you need a ride for business or leisure, we offer a wide range of vehicles to suit your needs. Book now and drive with confidence!</p>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer"><img src={whatsappIcon} alt="WhatsApp" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><img src={instagramIcon} alt="Instagram" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><img src={facebookIcon} alt="Facebook" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter" /></a>
          </div>
        </div>

        <div className="footer-center">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h2>Contact Us</h2>
          <ul>
            <li>📞 +91-222-456-7898</li>
            <li>✉ vars2025@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="copyright">&copy; 2025 car24.com - All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;