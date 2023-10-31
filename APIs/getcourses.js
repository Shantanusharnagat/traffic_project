const axios=require('axios')
user_id='653f498245bf5fe040c09dc9'

axios.get(`http://localhost:5000/api/courses/courses?createdby=${user_id}`)
    .then(response=>{
        console.log(response.data)
    })
    .catch(error=>{
        console.error(error)
    })