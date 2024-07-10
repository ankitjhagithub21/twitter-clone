const generateToken = require("../helpers/generateToken");
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs")

const register = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;


        const existingUsername = await User.findOne({ username })
        if (existingUsername) {
            return res.json({
                success: false,
                message: "Username already registered."
            })
        }
        const existingEmail = await User.findOne({ email })

        if (existingEmail) {
            return res.json({
                success: false,
                message: "Email already registered."
            })
        }
        if (password.length < 6) {
            return res.json({
                success: false,
                message: "Password length is less than 6."
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword

        })

        await newUser.save()

        const token = generateToken(newUser._id)

        const user = await User.findById(newUser._id).select("-password")

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(Date.now() + 3600000) //1 hour
        }).json({
            success: true,
            message: "Account created.",
            user
        })

    } catch (error) {
      

        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "Wrong email or password."
            })
        }
        const comparePassword = await bcryptjs.compare(password, user.password)

        if (!comparePassword) {
            return res.json({
                success: false,
                message: "Wrong email or password."
            })
        }

        const token = generateToken(user._id)


        user = await User.findById(user._id).select("-password")
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(Date.now() + 3600000) //1 hour
        }).json({
            success: true,
            message: "Login successfull.",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}
const logout = async (req, res) => {
    try {
        res.cookie('jwt','',{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            expires:new Date(Date.now()) 
        }).json({
            success:true,
            message:"Logout successfull."
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password")

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

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser
}