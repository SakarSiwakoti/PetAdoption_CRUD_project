import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './Login.css';
import Button from './Button';
import Cookies from 'js-cookie'; // Import the js-cookie library

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading state
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:8804/login', { username, password });
      console.log(response.data); // Log the response data
      if (response.data === 'Login successful') {
        // Set a cookie to indicate the user is logged in
        Cookies.set('loggedIn', 'true', { expires: 7 }); // Cookie expires in 7 days
        Cookies.set('username', username, { expires: 7 }); // Store username in cookie
        toast.success("Login successful!"); // Show success message using Toastify
        await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for 1.5 seconds
        navigate('/'); // Navigate to the dashboard route after successful login
      } else {
        setErrorMessage(response.data); // Set error message if login is unsuccessful
        setLoading(false); // Stop loading
      }
    } catch (error) {
      console.error(error);
      // Handle error
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-page">
      <ToastContainer /> {/* Toastify container */}
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome Back!</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" label="Login" className="login-form-btn" disabled={loading} />
        {loading && <div className="progress-bar" />} {/* Display progress bar if loading */}
        <Button label="< Back to home" link="/" className="back-to-home" />
        <Link to="/signup" className="link">Don't have an account? Sign up here</Link>
      </form>
    </div>
  );
};

export default Login;
