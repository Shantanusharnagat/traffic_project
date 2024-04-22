import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './AuthorCards';
import './Display.css';
import AddCourse from './Addcourse';
import { jwtDecode } from 'jwt-decode';

function Courses() {
  const [courses, setCourses] = useState([]); // Initialize with an empty array
  const [user_id, setUser_id] = useState('');

  const fetchCourses = () => {
    axios.get(`/api/courses/authorcourses?createdby=${user_id}`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      setUser_id(decodedToken.userId);
      fetchCourses(); // Fetch courses immediately after setting user_id
    }
  }, [fetchCourses]); // Empty dependency array to ensure it only runs once

  const addCourse = (newCourse) => {
    newCourse.createdby = user_id;
    axios.post('/api/courses/courses', newCourse)
      .then(() => {
        fetchCourses(); // Refresh the course list
      })
      .catch((error) => {
        console.error('Error adding course:', error);
      });
  };

  const deleteCourse = (courseId) => {
    axios.delete(`/api/courses/courses/${courseId}`)
      .then(() => {
        fetchCourses(); // Refresh the course list
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
      });
  };

  return (
    <div className="courses-container">
      <AddCourse onAddCourse={addCourse} />
      {courses.map(course => (
        <CourseCard
          key={course._id}
          name={course.name}
          description={course.description}
          author={course.author}
          price={course.price}
          
          onDelete={() => deleteCourse(course._id)}
        />
      ))}
    </div>
  );
}

export default Courses;
