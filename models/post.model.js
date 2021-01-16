const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    avatar:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    location:{
        type:String
    }
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;