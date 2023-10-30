import React from 'react';
import './Cards.css';

const CourseCard = ({ name, description, author, price, onDelete }) => {
  return (
    <div className="course-card">
      
      <h2 className="course-name">{name}</h2>
      <p className="course-description">{description}</p>
      <p className="course-author">Author: {author}</p>
      <p className="course-price">Price: ${price}</p>
      <button onClick={onDelete}>Delete</button> {/* Add this delete button */}
    </div>
  );
};

export default CourseCard;
