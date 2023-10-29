const mongoose=require('mongoose')
const Schema=mongoose.Schema

const courseSchema=new Schema({
    name: String,
    description: String,
    price: Number,
    author: String
})  

const Course=mongoose.model('Course', courseSchema)

module.exports=Course