const axios=require('axios')

// Example for sending a POST request to login
    const newCourse={
        name: 'Biology',
        description: 'Tans',
        price: 400,
        author: 'potya'
    }

axios.post('http://localhost:5000/api/courses/courses', newCourse)
    .then(response=>{
        console.log(response.data)
    })
    .catch(error=>{
        console.error(error)
    })