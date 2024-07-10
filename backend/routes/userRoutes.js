const express = require('express')
const { getUserProfile } = require('../controllers/userController')
const userRouter = express.Router()

userRouter.get("/:username",getUserProfile)

module.exports = userRouter