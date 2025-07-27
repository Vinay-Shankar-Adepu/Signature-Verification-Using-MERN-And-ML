import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Footer Links Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" className="social-icon" aria-label="Facebook"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" className="social-icon" aria-label="Twitter"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" className="social-icon insta" aria-label="Instagram"><FaInstagram size={24} /></a>
            <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn"><FaLinkedin size={24} /></a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-copyright">
          <p>&copy; 2024 Signature Verification. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
