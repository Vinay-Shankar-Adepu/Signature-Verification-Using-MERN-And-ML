import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-heading">About Us</h1>
        <p className="about-description">
          Signature Verification is a state-of-the-art solution that provides secure, reliable, and accurate verification
          of signatures for businesses and applications. We aim to ensure integrity and trust in digital signatures.
        </p>
        
        {/* Mission Section */}
        <div className="mission-section">
          <h2 className="mission-heading">Our Mission</h2>
          <p className="mission-description">
            At Signature Verification, our mission is to revolutionize the way businesses authenticate digital signatures.
            We strive to provide the most reliable and user-friendly verification tools, ensuring security and trust in
            every transaction. Our goal is to make digital signature verification accessible to all organizations,
            large and small, by leveraging cutting-edge technology and continuously improving our system to meet the
            evolving needs of the industry.
          </p>
        </div>

        {/* Video Section */}
        <div className="video-section">
          <h2 className="video-heading">Watch our Introduction</h2>
          <div className="video-wrapper">
            <video width="100%" height="auto" controls>
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
