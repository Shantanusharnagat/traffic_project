const axios=require('axios')

// Example for sending a POST request to login
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTNmNDk4MjQ1YmY1ZmUwNDBjMDlkYzkiLCJpYXQiOjE2OTg2NTAxNjQsImV4cCI6MTY5ODY1Mzc2NH0.4CkH1r8SbCQtA7qoNmAcvjAgu8QPZAJCSS1dlsMCJ60'
    const newCourse={
        name: 'Maisan',
        description: 'oioi',
        price: 344,
        author: 'potua',
        ytlink: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
    }

    const headers={
        Authorization: `Bearer ${token}`
    }

axios.post('http://localhost:5000/api/courses/courses', newCourse, {headers})
    .then(response=>{
        console.log(response.data)
    })
    .catch(error=>{
        console.error(error)
    })