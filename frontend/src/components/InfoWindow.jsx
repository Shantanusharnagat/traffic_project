import React, { useState, useEffect } from 'react';

const InfoWindow = ({ hospital }) => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleDirectionsClick = async () => {
    try {
      if (!currentPosition) {
        console.error('Current position is not available.');
        return;
      }

      const { lat: originLat, lng: originLng } = currentPosition;
      const { lat: destinationLat, lng: destinationLng } = hospital;

      // Fetch directions from Google Maps Directions API
      const response = await fetch(`http://localhost:5000/api/hospitals/directions?originLat=${originLat}&originLng=${originLng}&destinationLat=${destinationLat}&destinationLng=${destinationLng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      console.log('Directions Response:', data);
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{hospital.name}</h3>
      <p style={styles.address}>{hospital.address}</p>
      <button style={styles.button} onClick={handleDirectionsClick}>Get Directions</button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    maxWidth: '300px',
  },
  title: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  address: {
    margin: '0',
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    outline: 'none',
  },
};

export default InfoWindow;
