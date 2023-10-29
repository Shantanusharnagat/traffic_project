import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate=useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(response.data); // Handle success (e.g., user registered)
      navigate('/');
    } catch (error) {
      console.error(error); // Handle registration failure
    }
  };

  return (
    <div className="registration-container">
      <div className="title">Register</div>
      <form onSubmit={handleFormSubmit}>
        <div className="input-container">
          <label className="input-label">Username</label>
          <input
            type="text"
            
            name="username"
            className="input-field"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>

        <div className="input-container">
          <label className="input-label">Email</label>
          <input
            type="email"
            
            name="email"
            className="input-field"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="input-container">
          <label className="input-label">Password</label>
          <input
            type="password"
            
            name="password"
            className="input-field"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="already-registered">Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default RegistrationForm;
