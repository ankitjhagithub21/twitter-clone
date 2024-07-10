const express = require('express')
const tweetRouter = express.Router()
const verifyToken = require("../middlewares/verifyToken")
const { createTweet, deleteTweet } = require('../controllers/tweetController')
const upload = require('../helpers/upload')


tweetRouter.post("/create",verifyToken,upload.single('image'),createTweet)
tweetRouter.delete("/delete/:id",verifyToken,deleteTweet)


module.exports = tweetRouter  