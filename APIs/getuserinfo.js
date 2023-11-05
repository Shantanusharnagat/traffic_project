const axios=require('axios')
user_id='654722e5f9ca091b34ab97ef'

axios.get(`http://localhost:5000/api/users/${user_id}/courses`)
    .then(response=>{
        console.log(response.data)
    })
    .catch(error=>{
        console.error(error)
    })
