const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        minLength:5
    },
    username:{
        type:String,
        required:true,
        unique:true,
        minLength:5
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:5
    },
    password:{
        type:String,
        required:true,
       
    },
    profileImg:{
        type:String,
        default:"",
    },
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    tweets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    joined:{
        type:Date,
        default:Date.now()
    },
    bookmarks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tweet"
        }
    ]
},{ versionKey: false })

const User = mongoose.model('User',userSchema)

module.exports = User