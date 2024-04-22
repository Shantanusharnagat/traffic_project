import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


const InfoWindow = ({ hospital }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [username, setUsername] = useState('karan');
  const [phoneNumber, setPhoneNumber] = useState('982');
  const [carno, setCarno] = useState('');
  const [destination, setDestination] = useState('');
  const [userId, setUserId]=useState('');

  const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      // Extract the user's name from the token
      setUsername(decodedToken.userName);
      setUserId(decodedToken.userId);
      
      
      
    }
  }, [token]);

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

     
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  const handleNotifyPoliceClick = async () => {
    try {
      if (!currentPosition) {
        console.error('Current position is not available.');
        return;
      }
  
      const { lat: originLat, lng: originLng } = currentPosition;
      const { lat: destinationLat, lng: destinationLng } = hospital;
  
      // Fetch list of police officers within a radius from your backend API
      const response = await fetch(`/api/hospitals/police?lat=${originLat}&lng=${originLng}&radius=1000000000000`);
      const data = await response.json();
      console.log('Police Officers:', data[0]._id);

      const polsid=data[0]._id;
      const hospitalname=hospital.name;


      const request=await fetch(`/api/hospitals/userinfo/${userId}/${polsid}/${hospitalname}`);
      const user=await request.json();
      console.log('user Officers:', user);
      setPhoneNumber(user.phoneNumber);
      console.log('phone number:', phoneNumber);
      setCarno(user.carno);
      console.log('car number:', carno);
      console.log(data[0].phoneNumber)



     
  
      window.alert('Police have been successfully notified.');
    } catch (error) {
      console.error('Error notifying police:', error);
    }
  };
  

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{hospital.name}</h3>
      <p style={styles.address}>{hospital.address}</p>
      {/* <button style={styles.button} onClick={handleDirectionsClick}>Get Directions</button> */}
      <button style={styles.button} onClick={handleNotifyPoliceClick}>Notify Police</button>
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
    marginRight: '8px', // Added margin for button spacing
  },
};

export default InfoWindow;
