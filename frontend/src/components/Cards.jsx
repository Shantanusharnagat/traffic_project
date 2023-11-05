import React from 'react';
import './Cards.css';

const CourseCard = ({ key, name, description, author, price, onCourseClick }) => {

  const handleClick = () => {
    onCourseClick({ key, name, description, author, price });
  };
  return (
    <div className="course-card" onClick={handleClick}>
      
      <h2 className="course-name">{name}</h2>
      <p className="course-description">{description}</p>
      <p className="course-author">Author: {author}</p>
      <p className="course-price">Price: ${price}</p>
      
    </div>
  );
};

export default CourseCard;
