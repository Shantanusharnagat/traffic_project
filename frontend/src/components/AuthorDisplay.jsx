import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './AuthorCards';
import './Display.css';
import AddCourse from './Addcourse';

function Courses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = () => {
    axios.get('http://localhost:5000/api/courses/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = (newCourse) => {
    axios.post('http://localhost:5000/api/courses/courses', newCourse)
      .then(() => {
        fetchCourses(); // Refresh the course list
      })
      .catch((error) => {
        console.error('Error adding course:', error);
      });
  };

  const deleteCourse = (courseId) => {
    axios.delete(`http://localhost:5000/api/courses/courses/${courseId}`)
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
