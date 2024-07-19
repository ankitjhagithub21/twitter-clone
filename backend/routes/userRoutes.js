const express = require('express')
const { getUserProfile, suggestedUsers, followUnfollowUser, updateProfile } = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')
const upload = require('../helpers/upload')
const userRouter = express.Router()

userRouter.get("/profile/:username",getUserProfile)
userRouter.get("/suggested",verifyToken,suggestedUsers)
userRouter.post('/follow', verifyToken, followUnfollowUser);
userRouter.put('/update', verifyToken,upload.single('image'), updateProfile);

module.exports = userRouter