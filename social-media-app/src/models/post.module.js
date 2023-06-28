import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    postData: { type: String, default: "" },
    description: { type: "String", default: "" },
    mentionUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    categories: {
        type: String,
        enum: {
            values: ['public', 'private'],
            default: 'public',
            message: '{values} is not supported'
        }
    },
    commentData: [{
        _id: false,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        comment: { type: 'String', default: "" },
        mentionId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        createdAt: Date
    }
    ],
    sharedUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
},
    {
        timestamps: true
    }
)

const Post = mongoose.model('Posts', postSchema, 'posts')
export default Post;