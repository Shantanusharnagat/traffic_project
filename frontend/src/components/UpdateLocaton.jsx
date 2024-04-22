import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; 
import './Update.css';

const UpdateLocation = () => {
  const [userId, setUserId] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      setUserId(decodedToken.userId);
    }
  }, []);

  const handleUpdateLocation = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          await axios.put(`/api/users/updatelocation/${userId}`, { latitude, longitude });
          alert('Location updated successfully!');
          setIsLoading(false); // Reset loading state once update is complete
        });
      } else {
        setIsLoading(false);
        setErrorMessage("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Failed to update location');
      console.error('Error updating location:', error);
    }
  };

  return (
    <div className='big-cont'>
    <div className="update-location-container">
      <h2>Update Location</h2>
      <button onClick={handleUpdateLocation} disabled={isLoading} className={`update-button ${isLoading ? 'loading' : ''}`}>
        {isLoading ? 'Updating...' : 'Update Current Location'}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {latitude && longitude && (
        <div className="location-info">
          <p><strong>Latitude:</strong> {latitude}</p>
          <p><strong>Longitude:</strong> {longitude}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default UpdateLocation;
