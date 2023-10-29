import React, { useState } from 'react';
import axios from 'axios';
function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:5000/api/auth/login', formData);
        console.log(response.data);
    } catch(error){
        console.log(error)
    }
    // Send a request to your backend to handle login with formData
    console.log('Login data:', formData);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
