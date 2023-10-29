const axios = require('axios');
const courseIdToDelete = '653ded7610abe79a4484276e'; // Replace with the actual course ID you want to delete

// Make a DELETE request to delete a course by ID
axios.delete(`http://localhost:5000/api/courses/courses/${courseIdToDelete}`)
    .then(response => {
        console.log('Course deleted:', response.data);
    })
    .catch(error => {
        console.error('Error deleting course:', error);
    })
