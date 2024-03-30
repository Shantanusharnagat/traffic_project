import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode library
import Navbar from './Navbar';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      const userId = decodedToken.userId; // Extract userId from token
      // Fetch notifications for the specific user
      fetchNotifications(userId);
    }
  }, []);

  const fetchNotifications = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hospitals/notifications/${userId}`);
      setNotifications(response.data.notification);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1>Notifications</h1>
        {loading ? (
          <p>Loading...</p>
        ) : notifications ? (
          <p>{notifications}</p>
        ) : (
          <p>No notification received</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
