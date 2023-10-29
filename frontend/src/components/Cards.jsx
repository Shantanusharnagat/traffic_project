// CourseCard.js

import React from 'react';
import './Cards.css';

const CourseCard = ({ name, description, author, price }) => {
  return (
    <div className="course-card">
      <h2 className="course-name">{name}</h2>
      <p className="course-description">{description}</p>
      <p className="course-author">Author: {author}</p>
      <p className="course-price">Price: ${price}</p>
    </div>
  );
};

export default CourseCard;
