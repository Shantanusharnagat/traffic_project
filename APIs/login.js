const axios = require('axios');

// Example for sending a POST request to login
const loginData = {
  email: 'admin@gmail.com', // Use the email of the registered user
  password: 'admin' // Use the password of the registered user
};

axios.post('http://localhost:5000/api/auth/login', loginData)
  .then(response => {
    console.log(response.data);
    // Handle the response, which might include a JWT token for authentication.
  })
  .catch(error => {
    console.error(error);
    
  });
