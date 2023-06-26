import { Router, response } from "express";
import Post from '../models/post.module.js';
import User from '../models/user.model.js';
import verifyToken from '../jwt.js';
import upload from "../utils/fileUpload.js";
import { Types } from "mongoose";
const postRouter = Router();

postRouter.post('/file', verifyToken, upload.single('posts'), async (req, res) => {
    try {
        const postData = req.file;
        const { description, mentionUser, categories, commentData, sharedUser } = req.body;

        const userExist = await User.findOne({ _id: req.user.id });
        if (!userExist) {
            return res.send({ statusCode: 404, message: "User not found" })
        }

        const newPostDetails = {
            userId: req.user.id,
            postData: postData.path,
            description: description,
            mentionUser: mentionUser,
            categories: categories,
            commentData: [],
            sharedUser: sharedUser
        }
        const addPostDetails = await Post.create(newPostDetails);
        return res.send({ statusCode: 200, message: "Post Added Successfully", postDetails: addPostDetails })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error", error });
    }
})

// comment on post
postRouter.post('/comment', verifyToken, async (req, res) => {
    try {
        const { postId, comment, mentionUser } = req.body;
        const userId = req.user.id;

        const userExist = await User.findOne({ _id: req.user.id });
        if (!userExist) {
            return res.send({ statusCode: 500, message: "User not Exist" });
        }

        const newComment = {
            userId: userId,
            comment: comment,
            mentionUser: mentionUser
        }

        const isPostPublic = await Post.findOne({ _id: postId });
        if (isPostPublic.categories === 'public') {
            const addComment = await Post.updateOne({ _id: postId }, { $push: { commentData: newComment } })
            return res.send({ statusCode: 200, message: "Commented on post ", commentedData: addComment });
        }
        else {
            const userInSharedList = await Post.findOne({ _id: postId, sharedUser: { $in: userId } }, { sharedUser: 1 });
            if (!userInSharedList) {
                return res.send({ statusCode: 400, message: "This post is private" })
            }
            const addComment = await Post.updateOne({ _id: postId }, { $push: { commentData: newComment } })
            return res.send({ statusCode: 200, message: "Commented on post ", commentedData: addComment });
        }
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error", error: error });
    }
})

// get comment on postId
postRouter.get('/:postId', verifyToken, async (req, res) => {
    // try {
    const postId = req.params.postId;
    const userExist = await User.findOne({ _id: req.user.id });
    if (!userExist) {
        return res.send({ statusCode: 404, message: "User not Found" });
    }

    const postDetails = await Post.findOne({ _id: postId });

    if (postDetails.categories === 'private') {
        let array = [];
        for (let i = 0; i < postDetails.sharedUser.length; i++) {
            console.log("------------", postDetails.sharedUser);
            console.log("------------0000000000000", new Types.ObjectId(req.user.id));
            if (postDetails.sharedUser[i] === req.user.id) {
                console.log("============");
                array.push(postDetails.commentData);
            } else {
                console.log("0000000000");
            }
        }
        console.log(array);
        return res.send({
            statusCode: 200,
            message: "Comments on Post",
            postDetails: array,
            countOfComment: postDetails.commentData.length
        });
    } else {
        return res.send({
            statusCode: 200,
            message: "public post comment",
            postCommentDetails: postDetails.commentData,
            countOfComment: postDetails.commentData.length
        });
    }
})

// get 



export default postRouter;