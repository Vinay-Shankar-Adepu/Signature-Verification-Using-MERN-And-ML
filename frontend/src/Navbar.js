import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react'; 
import { FaUser, FaSignOutAlt } from 'react-icons/fa'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import './Navbar.css'; 
import logo from './icon.png'; 

const navItems = [
  { label: 'Home', href: '/' },  // Always go to Home    kk
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check JWT token for session management
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Update authentication state based on token presence
  }, [location]);

  // Handle mobile menu toggle
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token from localStorage
    setIsAuthenticated(false); // Update authentication state
    onLogout?.(); // Notify parent component about logout
    navigate('/login'); // Redirect to the login page
  };

  // Handle click on the Logo
  const handleLogoClick = () => {
    // Always navigate to Home regardless of authentication status
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo Section */}
        <div onClick={handleLogoClick} className="logo" role="button" aria-label="Navigate to Home">
          <img src={logo} className="logo-icon" alt="Logo" />
          <span className="logo-text">Signature Verification</span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`} role="navigation" aria-label="Main Navigation">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'active' : ''}`} 
                onClick={() => setIsOpen(false)} // Close the menu when a link is clicked
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* User profile and Logout buttons */}
          {isAuthenticated ? (
            <li className="nav-item user-profile">
              <Link to="/account" className="nav-link" onClick={() => setIsOpen(false)}>
                <FaUser size="20" style={{ marginRight: '8px' }} />
                Account
              </Link>
              <button className="auth-btn logout-btn" onClick={handleLogout} aria-label="Logout">
                <FaSignOutAlt size="20" />
                Logout
              </button>
            </li>
          ) : (
            <>
              {/* Log In / Sign Up Links */}
              <li className="nav-item">
                <Link to="/login" className="auth-btn log-in" onClick={() => setIsOpen(false)} aria-label="Log in to your account">
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="auth-btn sign-up" onClick={() => setIsOpen(false)} aria-label="Sign up for a new account">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger Icon for mobile */}
        <div className="hamburger" onClick={handleToggle} aria-label="Toggle menu">
          <Menu size={32} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
