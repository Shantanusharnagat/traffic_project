const axios=require('axios')

axios.get('http://localhost:5000/api/courses/courses')
    .then(response=>{
        console.log(response.data)
    })
    .catch(error=>{
        console.error(error)
    })