const Tweet = require('../models/tweetModel')
const User = require('../models/userModel')
const {uploadImage} = require("../helpers/cloudinary")

const createTweet = async(req,res) =>{

    try{
        const user =await User.findById(req.id).select("-password")
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized."
            })
        }
        
        
        const {content} = req.body;
        if(!content || content.length==0){
            return res.json({
                success:false,
                message:"Can not create empty tweet."
            })
        }
        
        const result = await uploadImage(req.file.path)
      

        const tweet = new Tweet({
            content,
            image:result,
            author:user._id
        })
        await tweet.save()
        res.json({
            success:true,
            message:"Tweet Created.",
            tweet
        })

        
        
        
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const deleteTweet = async(req,res) =>{

    try{

    }catch(error){

    }
}
module.exports = {
    createTweet,
    deleteTweet
}