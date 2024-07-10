const User = require("../models/userModel");

const getUserProfile = async(req,res) =>{
    try{

        const {username} = req.params;
        const user = await User.findOne({username}).select('-password')
        if(!user){
            return res.json({
                success:false,
                message:"User not found."
            })
        }
        res.json({
            success:true,
            user
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

module.exports = {
    getUserProfile
}