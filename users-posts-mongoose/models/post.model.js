const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    description: { type: String, default: "" },
    postData: { type: String, default: "" },
},
    {
        timestamps: true
    }
)

let Post = mongoose.model('Posts', postSchema, 'posts');
module.exports = Post;