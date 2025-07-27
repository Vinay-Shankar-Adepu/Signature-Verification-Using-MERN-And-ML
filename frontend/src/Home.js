import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom'; 
import image from './bg.webp';  

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is present in localStorage kk
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // User is logged in if a token is found
    }
  }, []);

  const handleExploreClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');  // Redirect to dashboard if logged in
    } else {
      navigate('/login');  // Redirect to login if not logged in
    }
  };

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div className="home-text">
          <h1 className="title">Signature Verification</h1>
          <p className="description">
            Secure, reliable, and accurate signature verification solutions for your business and applications.
          </p>
          <button className="explore-btn" onClick={handleExploreClick}>
            {isLoggedIn ? 'Go to Dashboard' : 'Explore'}
          </button>
        </div>
        <div className="home-image">
          <img src={image} alt="Signature Verification" className="image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
