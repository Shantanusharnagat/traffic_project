import React, { useState } from 'react';
import './AddCourse.css'; // Create a CSS file for styling

function AddCourse({ onAddCourse }) {
  const [course, setCourse] = useState({
    name: '',
    description: '',
    author: '',
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = () => {
    onAddCourse(course);
    setCourse({
      name: '',
      description: '',
      author: '',
      price: 0,
    });
  };

  return (
    <div className="add-course-container">
      <h2 className='add-course-title'>Add a New Course</h2>
      <div className="add-course-form">
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={course.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Course Description"
          value={course.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Course Author"
          value={course.author}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Course Price"
          value={course.price}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add Course</button>
      </div>
    </div>
  );
}

export default AddCourse;
