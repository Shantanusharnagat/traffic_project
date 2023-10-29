const axios = require('axios');

// Example for sending a POST request with axios
const data = {
  username: 'preshit',
  email: 'pret@gmail.com',
  password: 'pres'
};

axios.post('http://localhost:5000/api/auth/register', data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
