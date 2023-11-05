import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; // Import Axios
import CourseCard from './Cards';

const MyCourses = () => {
  const [courses, setCourses] = useState([]); // Initialize with an empty array
  const [user_id, setUser_id] = useState('');

  useEffect(() => {
    // Fetch user's courses when the component mounts
    const token = document.cookie.split('; ').find((cookie) => cookie.startsWith('token='));

    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      setUser_id(decodedToken.userId);

      // Make an API request to get the user's courses using Axios
      axios
        .get(`http://localhost:5000/api/users/${decodedToken.userId}/courses`)
        .then((response) => {
          console.log(response.data);
          setCourses(response.data); // Update the courses state with the fetched data
        })
        .catch((error) => {
          console.error('Error fetching user courses:', error);
        });
    }
  }, []);

  return (
    <div>
      <Navbar />
      
      <div className="courses-container">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            name={course.name}
            description={course.description}
            author={course.author}
            price={course.price}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
