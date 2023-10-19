const mongoose = require('mongoose');


const PostsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    category: {
        type: String,
    }, 
    cover: {
        type: String, 
    },
    price: {
        type: Number,
    },
    rate: {
        type: Number, 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }, 
    content: {
        type: String, 
    }
}, {timestamps: true, strict: true } )

module.exports = mongoose.model('postModel', PostsSchema, 'posts')


