import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Blog from './Blog';
import Login from './Login';
import Account from './Account';
import Signup from './Signup';
import Footer from './Footer';
import Dashboard from './Dashboard'; // Assuming you have a Dashboard component

function App() {
  const user = localStorage.getItem('user'); // Check if the user is logged in

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect to Dashboard if the user is logged in, otherwise to Home */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />

        {/* Other routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        {/* Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
