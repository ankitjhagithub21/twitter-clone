const jwt = require('jsonwebtoken');

const verifyToken  = (req,res,next) =>{
    try{
        
        const token = req.cookies.jwt;
      
        if(!token){
            return res.json({
                success:false,
                message:"token missing."
            })
        }
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET)     
      
        req.id = decoded.userId;
    
        next();

    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = verifyToken