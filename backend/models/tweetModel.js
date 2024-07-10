const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    image:{
        type:Object,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    bookmarks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    },
   
},{ versionKey: false })

const Tweet = mongoose.model('Tweet',tweetSchema)

module.exports = Tweet