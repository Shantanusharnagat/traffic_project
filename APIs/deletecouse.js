const axios = require('axios');
const courseIdToDelete = '653f87ec2bbb00a4c2cb0a25'; // Replace with the actual course ID you want to delete
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTNmNDk4MjQ1YmY1ZmUwNDBjMDlkYzkiLCJpYXQiOjE2OTg2NTA2MzgsImV4cCI6MTY5ODY1NDIzOH0.xZ5gVowfJqvz9S8gzy9u1-Y3xCA8p48hA4DECd2dXws'
const headers = {
    Authorization: `Bearer ${token}`
};
// Make a DELETE request to delete a course by ID
axios.delete(`http://localhost:5000/api/courses/courses/${courseIdToDelete}`, {headers})
    .then(response => {
        console.log('Course deleted:', response.data);
    })
    .catch(error => {
        console.error('Error deleting course:', error);
    })
