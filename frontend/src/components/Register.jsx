import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user', phoneNumber: '' });
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      document.cookie = `token=${response.data.token}`;
      console.log(response.data)
      navigate('/');
    } catch (error) {
      console.error(error); // Handle registration failure
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setFormData({
      ...formData,
      role: selectedRole,
      phoneNumber: selectedRole === 'admin' ? '' : formData.phoneNumber // Reset phoneNumber if role is not 'admin'
    });
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

        {formData.role === 'admin' && (
          <div className="input-container">
            <label className="input-label">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="input-field"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>
        )}

        <div className="input-container">
          <label className="input-label">Role</label>
          <select
            name="role"
            className="input-field"
            value={formData.role}
            onChange={handleRoleChange}
          >
            <option value="user">Citizen</option>
            <option value="admin">Police</option>
          </select>
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="already-registered">Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default RegistrationForm;
