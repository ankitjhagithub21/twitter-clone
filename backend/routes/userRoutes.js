const express = require('express')
const { getUserProfile, getWhoToFollow } = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')
const userRouter = express.Router()

userRouter.get("/:username",getUserProfile)
userRouter.get("/whotofollow",verifyToken,getWhoToFollow)

module.exports = userRouter