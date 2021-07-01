const mongoose = require("mongoose")

const PostScema = mongoose.Schema({
    title: String,
    username: String,
    selectedFile: String,
    likeCount:{
        type:Number,
        default:0
    },
    comments:[{
        type:String
    }],
    createdAt:{
        type:Date,
        default: new Date()
    },

});

const PostMessage = mongoose.model('Posts',PostScema)
module.exports = PostMessage;