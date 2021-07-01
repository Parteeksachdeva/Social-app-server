const mongoose = require("mongoose")

const UserScema = mongoose.Schema({
    username: String,
    password: String,
    createdAt:{
        type:Date,
        default: new Date()
    },

});

const UserDetail = mongoose.model('User',UserScema)
module.exports = UserDetail;