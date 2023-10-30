const axios = require('axios');

// Example for sending a POST request with axios
const data = {
  username: 'shantanu',
  email: 'admin@gmail.com',
  password: 'admin',
  role: 'admin'
};

axios.post('http://localhost:5000/api/auth/register', data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
