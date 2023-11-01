import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Adjust this for your backend API
import CourseCard from './Cards';
import './Display.css';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses/courses')
      .then(response => {
        console.log(response.data);
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="courses-container">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          name={course.name}
          description={course.description}
          author={course.author}
          price={course.price}
          onCourseClick={course => console.log(course)}
        />
      ))}
    </div>
  );
}

export default Courses;
