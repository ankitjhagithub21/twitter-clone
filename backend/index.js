require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./db/connection')
const authRouter = require('./routes/authRoutes')
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


app.get("/",(req,res)=>{
    res.status(200).json({
        succss:true,
        message:"Api working."
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})