const axios=require('axios')

// Example for sending a POST request to login
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTNmNDk4MjQ1YmY1ZmUwNDBjMDlkYzkiLCJpYXQiOjE2OTg2NTAxNjQsImV4cCI6MTY5ODY1Mzc2NH0.4CkH1r8SbCQtA7qoNmAcvjAgu8QPZAJCSS1dlsMCJ60'
    const newCourse={
        name: 'renkaa',
        description: 'Tans',
        price: 500,
        author: 'potua',
        role:'admin'
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