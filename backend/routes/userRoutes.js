const express = require('express')
const { getUserProfile, suggestedUsers, followUnfollowUser } = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')
const userRouter = express.Router()

userRouter.get("/profile/:username",getUserProfile)
userRouter.get("/suggested",verifyToken,suggestedUsers)
userRouter.post('/follow', verifyToken, followUnfollowUser);

module.exports = userRouter