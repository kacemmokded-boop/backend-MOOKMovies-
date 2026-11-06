const express = require('express')
const ConnectDB = require('./Config/ConnectDB')
const userRouter = require('./Routes/User')
const movieRouter = require('./Routes/Movie')
const commentRouter = require('./Routes/Comment')
const rateRouter = require('./Routes/Rate')
const cors =require('cors')

const app=express()
require('dotenv').config()

ConnectDB()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
app.use('/api/user',userRouter)
app.use('/api/movie',movieRouter)
app.use('/api/comment',commentRouter)
app.use('/api/rate',rateRouter)


app.listen(process.env.port,console.log(`the server is running on port ${process.env.port}`))