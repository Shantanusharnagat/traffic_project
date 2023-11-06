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
    const {name, description, price, author, createdby, ytlink}=req.body;

    const newCourse=new Course({
        name,
        description,
        price,
        author,
        createdby,
        ytlink
        
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

router.get('/courses/:id/ytlink', async (req, res) => {
    const courseId = req.params.id;
    try {
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      res.json({ ytlink: course.ytlink });
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve course ytlink' });
    }
  });

  router.get('/courses/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve course details' });
    }
  });
  


module.exports=router