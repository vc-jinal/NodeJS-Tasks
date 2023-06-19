const express = require('express');
const postRouter = express.Router();
const Post = require('../models/post.model');
const User = require('../models/user.model');
const tokenVerification = require('../jwt');
const upload = require('../utils/fileUpload');

// get post by userId
postRouter.get('/', tokenVerification, async (req, res) => {
    try {
        const getUser = await Post.findOne({ userId: req.user._id });
        if (!getUser) {
            return res.send({ statusCode: 404, message: "User not Found" })
        }
        return res.send({ statusCode: 200, message: "Fetched User SuccessFully", getPost: getUser });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error" });
    }
})

// create post
postRouter.post('/', tokenVerification, upload.single('posts'), async (req, res) => {
    try {
        const description = req.body.description;
        const post_data = req.file;
        const userExist = await User.findOne({ _id: req.user.id });
        if (!userExist) {
            return res.send({ statusCode: 404, message: "User not Found" });
        }
        const addPost = {
            userId: req.user.id,
            description: description,
            postData: post_data.path,
        };
        const addNewPosts = await Post.create(addPost);
        return res.send({ statusCode: 200, message: "User Post added successfully", data: addNewPosts });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error", error: error });
    }
})

// update Post
postRouter.put('/', tokenVerification, upload.single('posts'), async (req, res) => {
    try {
        const description = req.body.description;
        const post_data = req.file;
        const findUser = await Post.findOne({ userId: req.user.id });
        if (!findUser) {
            return res.send({ statusCode: 404, message: "User Not Found" });
        }
        const addPost = await Post.updateOne({ userId: req.user.id },
            {
                description: description,
                postData: post_data.path
            }
        )
        return res.send({ statusCode: 200, message: "Post Details Updated Successfully", updatePost: addPost })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error", error: error });
    }
})

// delete post by id
postRouter.delete('/', tokenVerification, async (req, res) => {
    const deletePost = await Post.deleteOne({ userId: req.user.id });
    if (deletePost.deletedCount === 0) {
        return res.send({ statusCode: 404, message: "User Not Found" })
    }
    return res.send({ statusCode: 200, message: "User Deleted SuccessFully", deleteUser: deletePost });
})

// All posts
postRouter.get('/', async (req, res) => {
    try {
        const getPost = await Post.find({});
        return res.send({ statusCode: 200, message: "All posts", allPost: getPost });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error" });
    }
})

module.exports = postRouter;