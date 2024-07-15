const express = require('express')
const tweetRouter = express.Router()
const verifyToken = require("../middlewares/verifyToken")
const { createTweet, deleteTweet, getAllTweets, likeUnlikeTweet } = require('../controllers/tweetController')
const upload = require('../helpers/upload')


tweetRouter.post("/create",verifyToken,upload.single('image'),createTweet)
tweetRouter.delete("/:id",verifyToken,deleteTweet)
tweetRouter.get("/all",getAllTweets)
tweetRouter.put("/like/:id",verifyToken,likeUnlikeTweet)


module.exports = tweetRouter  