import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import './CourseDetail.css'; // Import the CSS file

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [ytlink, setYtLink] = useState('');

  useEffect(() => {
    // Fetch course details
    axios.get(`/api/courses/courses/${id}`)
      .then(response => {
        setCourse(response.data);
        // After fetching the course details, fetch the ytlink
        return axios.get(`/api/courses/courses/${id}/ytlink`);
      })
      .then(response => {
        setYtLink(response.data.ytlink);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="course-detail-container">
      <Navbar />
      {course && (
        <div className="course-details">
          {ytlink && (
            <iframe
              title="Course Video"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${ytlink}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-frame"
            ></iframe>
          )}
          <h1>{course.name}</h1>
          <p className="description">Description: {course.description}</p>
          <p className="price">Price: ${course.price}</p>
          <p className="author">Author: {course.author}</p>
        
          
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
