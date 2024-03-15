const express=require('express')

const dotenv= require('dotenv').config()
const cors=require('cors')
const connectDB=require('./db.js')
const cookieParser=require('cookie-parser')
const stripe=require("stripe")(`${process.env.STRIPE_KEY}`)


connectDB()

const port=process.env.PORT || 5000

const app=express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/courses', require('./routes/courses.js'))
app.use('/api/payment', require('./routes/payment.js'))
app.use('/api/users', require('./routes/users.js'))
app.use('/api/hospitals', require('./routes/hospitals.js'))

app.listen(port, ()=>{
    console.log(`server started on ${port}`)
})