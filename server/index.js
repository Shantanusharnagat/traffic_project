const express=require('express')

const dotenv= require('dotenv').config()
const cors=require('cors')
const connectDB=require('./db.js')
const cookieParser=require('cookie-parser')
const stripe=require("stripe")("sk_test_51MgCSrSIGmj3KYA8Erks6FwbQJZmn6umqAgauiIYgRCm3j1JEpAsQt7NnvyhCN2YfkSYoR37lVCL8EExfkHNCyZi00LFCpAGgL")


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

app.listen(port, ()=>{
    console.log(`server started on ${port}`)
})