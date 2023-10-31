const express=require('express')
const router=express.Router()
const Course=require('../models/course')
//const authorizationMiddleware = require('../middlewares/authorization');
router.get('/courses', async(req, res)=>{
    try{
        const courses=await Course.find();
        res.json(courses);
    } catch(error){
        res.status(500).json({error: 'Couldnt retrieve courses'})
    }
})

router.get('/authorcourses', async(req, res)=>{
    try{
        const courses=await Course.find({createdby: req.query.createdby});
        res.json(courses)
    } catch(error){
        res.status(500).json({error: 'Couldnt retrieve courses'})
    }

})

router.post('/courses', async(req, res)=>{
    const {name, description, price, author, createdby}=req.body;

    const newCourse=new Course({
        name,
        description,
        price,
        author,
        createdby,
    })

    try{
        const savedCourse=await newCourse.save();
        res.json(savedCourse)
    } catch(error){
        res.status(500).json({error: 'Couldnt save course'})
    }
})

router.delete('/courses/:id', async(req, res)=>{
    const courseid=req.params.id;
    try{
        await Course.findByIdAndDelete(courseid);
        res.json({message: 'Course deleted'})
    } catch(error){
        res.status(500).json({error: 'Couldnt delete course'})
    }
})

module.exports=router