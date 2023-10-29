import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(response.data); // Handle success (e.g., user registered)
    } catch (error) {
      console.error(error); // Handle registration failure
    }
  };

  return (
    <div>
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
    <p>Already registered?</p>
    <Link to="/login">Login</Link>
     
    </div>
  );
}

export default RegistrationForm;
