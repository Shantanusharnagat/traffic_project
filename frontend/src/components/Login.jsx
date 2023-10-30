import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';


function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      document.cookie = `token=${response.data.token}`;
      console.log(response.data)
      navigate('/');
    } catch (error) {
      console.log(error);
    }

    // Send a request to your backend to handle login with formData
    //console.log('Login data:', formData);
  };

  return (
    <div className="login-container">
      <div className="title">Login</div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="input-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
        <div className="input-container">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
      <p className="already-registered">
        Not registered yet? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
