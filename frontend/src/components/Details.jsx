import React, { useState, useEffect } from 'react';
import './Details.css'; // Import CSS file for styling
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; // Import Axios for making HTTP requests

const Details = () => {
  // State variables to store user details and form submission status
  const [name, setName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [destination, setDestination] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      const userId = decodedToken.userId; // Assuming userId is available in the token
      const userIdentifier = `user_${userId}`; // Create a unique identifier for the user

      // Check if the form is already submitted for this user
      const isSubmittedForUser = localStorage.getItem(userIdentifier) === 'true';
      if (isSubmittedForUser) {
        setIsSubmitted(true);
        return; // Exit early if the form is already submitted for this user
      }

      try {
        // Make the API call to store the user details in the database
        await axios.put(`/api/users/submit/${userId}`, { carno: carNumber, phoneNumber: phoneNumber, destination });
        
        // Update form submission status and store it in localStorage
        setIsSubmitted(true);
        localStorage.setItem(userIdentifier, 'true');
        decodedToken.isFilled = true;
        console.log(decodedToken)
        console.log('Form submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error.message);
        // You can handle the error here, such as displaying a message to the user
      }
    }

    // Here you can perform any action with the user details, such as sending them to the server
    console.log('Submitted:', { name, carNumber, phoneNumber, destination });
  };

  useEffect(() => {
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      const userId = decodedToken.userId;
      const userIdentifier = `user_${userId}`;
      const isSubmittedForUser = localStorage.getItem(userIdentifier) === 'true';
      if (isSubmittedForUser) {
        setIsSubmitted(true);
      }
    }
  }, []);

  return (
    <div className="details-container">
      {isSubmitted ? (
        <h2>Already Submitted</h2>
      ) : (
        <>
          <h2>Enter Your Details</h2>
          <form onSubmit={handleSubmit} className="details-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Car Number:</label>
              <input
                type="text"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Destination:</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Details;
