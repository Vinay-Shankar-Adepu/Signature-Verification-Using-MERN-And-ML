import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios'; // Import axios for API calls
import './Signup.css';

const SignUp = () => {
  const [username, setUsername] = useState(''); // Retain username for frontend
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // To display any error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Send signup data to the backend
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);
      // Redirect the user to the dashboard
      navigate('/dashboard');
    } catch (error) {
      // Set the error message if signup fails
      setErrorMessage(error.response ? error.response.data.message : 'Error signing up');
    }

    // Clear input fields
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  // Handle opening and closing of Terms & Conditions modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="signup-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="heading">Sign Up</h2>

        {/* Username Input */}
        <div className="flex-column">
          <label>Username</label>
        </div>
        <div className="inputForm">
          <FaUser size="20" />
          <input
            placeholder="Enter your Username"
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <FaEnvelope size="20" />
          <input
            placeholder="Enter your Email"
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <FaLock size="20" />
          <input
            placeholder="Enter your Password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div className="flex-column">
          <label>Confirm Password</label>
        </div>
        <div className="inputForm">
          <FaLock size="20" />
          <input
            placeholder="Confirm your Password"
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Terms & Conditions Checkbox */}
        <div className="flex-row">
          <div>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label>
              I agree to the{' '}
              <span className="terms-link" onClick={toggleModal}>
                Terms & Conditions
              </span>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Sign Up Button */}
        <button className="button-submit" type="submit" disabled={!termsAccepted}>
          Sign Up
        </button>

        {/* Log In Link */}
        <p className="p">
          Already have an account?{' '}
          <Link to="/login" className="span">
            Log In
          </Link>
        </p>
      </form>

      {/* Terms & Conditions Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Terms & Conditions</h3>
            <p>
              These are the Terms and Conditions for using our website. By signing up, you agree to these terms.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices metus a quam pretium, a
              vulputate orci blandit. Mauris euismod nisi nec ante convallis scelerisque.
              <br />
              <br />
              Nulla vehicula tortor ut felis pharetra, id faucibus lorem fermentum. Curabitur faucibus urna felis, vel
              aliquet nulla vehicula sed.
            </p>
            <button className="modal-close-btn" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
