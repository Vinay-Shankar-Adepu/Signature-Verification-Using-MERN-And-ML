import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');    //kk
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Store JWT token and navigate
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      // Show backend error or generic error message
      setErrorMessage(error.response?.data?.message || 'Error logging in. Please try again.');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="heading">Log In</h2>
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="flex-row">
        <div>
          <input type="checkbox" />
          <label>Remember me</label>
        </div>
        <span className="span">Forgot password?</span>
      </div>
      <button className="button-submit" type="submit">
        Log In
      </button>
      <p className="p">
        Don't have an account? 
        <Link to="/signup" className="span">Sign Up</Link>
      </p>
    </form>
  );
};

export default Login;
