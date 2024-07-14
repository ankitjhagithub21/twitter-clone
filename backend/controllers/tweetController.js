const Tweet = require('../models/tweetModel')
const User = require('../models/userModel')
const {uploadImage, deleteImage} = require("../helpers/cloudinary")

const createTweet = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized.",
            });
        }

        const { content } = req.body;

        if (!content && !req.file) {
            return res.json({
                success: false,
                message: "Cannot create an empty tweet.",
            });
        }

        let result = null;
        if (req.file) {
            result = await uploadImage(req.file.path);
        }

        const tweet = new Tweet({
            content,
            image: result,
            author: user._id,
        });
        await tweet.save();

       
        const populatedTweet = await Tweet.findById(tweet._id).populate('author', '-password');

        res.json({
            success: true,
            message: "Tweet Created.",
            tweet: populatedTweet,
        });
    } catch (error) {
       
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const deleteTweet = async (req, res) => {
    try {
       
        const tweetId = req.params.id;
      
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized.",
            });
        }

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({
                success: false,
                message: "Tweet not found.",
            });
        }

        if (tweet.author.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot delete this tweet.",
            });
        }

        // Check if tweet has an image and delete it if it does
        if (tweet.image && tweet.image.publicId) {
            await deleteImage(tweet.image.publicId);
        }

        // Delete the tweet
        await tweet.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Tweet deleted.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};


const getAllTweets = async (req, res) => {
    try {
        let tweets = await Tweet.find().populate('author', 'username fullName profileImg')

        if (!tweets) {
            return res.status(404).json({
                success: false,
                message: "No tweets found.",
            });
        }

        res.status(200).json({
            success: true,
            tweets:tweets.reverse(),
        });
    } catch (error) {
       
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const likeUnlikeTweet = async (req, res) => {
    try {
        const tweetId = req.params.id;
        const userId = req.id; 

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({
                success: false,
                message: "Tweet not found.",
            });
        }

       
        const userIndex = tweet.likes.indexOf(userId);
        if (userIndex > -1) {
            tweet.likes.splice(userIndex, 1);
        } else {
           
            tweet.likes.push(userId);
        }

        await tweet.save();

        res.status(200).json({
            success: true,
            message: userIndex > -1 ? "Tweet unliked." : "Tweet liked.",
            
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};



module.exports = {
    createTweet,
    deleteTweet,
    getAllTweets,
    likeUnlikeTweet
}