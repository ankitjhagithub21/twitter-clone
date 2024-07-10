require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./db/connection')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const tweetRouter = require('./routes/tweetRoutes')
const app = express()
const port = 3000
connectDb()


//middlewares
app.use(express.json())
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))

app.use(cookieParser())

//routes
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/tweet",tweetRouter)


app.get("/",(req,res)=>{
    res.status(200).json({
        succss:true,
        message:"Api working."
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})