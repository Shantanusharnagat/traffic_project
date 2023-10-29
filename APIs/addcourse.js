const axios=require('axios')

// Example for sending a POST request to login
    const newCourse={
        name: 'Dom',
        description: 'React Dom',
        price: 500,
        author: 'shantanu'
    }

axios.post('http://localhost:5000/api/courses/courses', newCourse)
    .then(response=>{
        console.log(response.data)
    })
    .catch(error=>{
        console.error(error)
    })