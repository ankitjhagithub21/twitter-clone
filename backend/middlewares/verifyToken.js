const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const verifyToken  = async(req,res,next) =>{
    try{
        const token = req.cookies.jwt;
     
        if(!token){
            return res.json({
                success:false,
                message:"token missing."
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
       
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.json({
                success:false,
                message:"Token expired."
            })
        }
        req.user = user;

        next();

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = verifyToken