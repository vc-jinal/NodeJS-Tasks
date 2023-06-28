import { Router, response } from "express";
import Post from '../models/post.module.js';
import User from '../models/user.model.js';
import verifyToken from '../jwt.js';
import upload from "../utils/fileUpload.js";
import { Types } from "mongoose";
const postRouter = Router();

// get all post of that user
postRouter.get('/allPost', verifyToken, async (req, res) => {
    // try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const keyValue = req.body.keyValue;

    const userExist = await User.findOne({ _id: req.user.id });

    if (!userExist) {
        return res.send({ statusCode: 404, message: "User not found" })
    }

    const userPost = await Post.find({
        $and: [
            {
                $or: [
                    { description: { $regex: new RegExp(keyValue, 'i') } },
                    { 'commentData.comment': { $regex: new RegExp(keyValue, 'i') } }
                ]
            },
            {
                $or: [
                    { categories: 'public' },
                    { userId: req.user.id },
                    {
                        sharedUser:
                            { $in: req.user.id }
                    },
                    {
                        mentionUser:
                            { $in: req.user.id }
                    }
                ]
            }
        ]
    }).sort({ 'commentData.createdAt': -1 }).limit(limit).skip((page - 1) * limit);

    return res.send({ statusCode: 200, message: "User Post fetched Successfully", user: userPost })
    // }
    // catch (error) {
    //     return res.send({ statusCode: 500, message: "Internal Server Error", error });
    // }
})

// upload Post 
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
            mentionUser: mentionUser,
            createdAt: Date.now()
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
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const postId = req.params.postId;
        const userExist = await User.findOne({ _id: req.user.id });
        if (!userExist) {
            return res.send({ statusCode: 404, message: "User not Found" });
        }

        const postDetails = await Post.findOne({ _id: postId });
        if (!postDetails) {
            return res.send({ statusCode: 404, message: "Post not found" });
        }

        if (postDetails.categories === 'private') {
            let pagination;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + page;

            console.log("----------------------", startIndex, typeof startIndex);
            console.log("----------------------", endIndex, typeof endIndex);

            for (let i = 0; i < postDetails.sharedUser.length; i++) {
                let data = postDetails.sharedUser[i];
                let data1 = new Types.ObjectId(req.user.id);

                if (data.toString() === data1.toString()) {
                    // console.log("----------------------", postDetails.commentData);
                    // console.log("----------------------", startIndex, typeof startIndex);
                    // console.log("----------------------", endIndex, typeof endIndex);
                    pagination = postDetails.commentData.slice(startIndex, endIndex);
                    // console.log("==================", pagination);
                    continue;
                }
                console.log("1234567654321");
            }

            return res.send({
                statusCode: 200,
                message: "Comments on Post",
                countOfComment: postDetails.commentData.length,
                postDetails: pagination,
                total_pages: Math.ceil(pagination.length / page),
            });
        } else {
            return res.send({
                statusCode: 200,
                message: "public post comment",
                postCommentDetails: postDetails.commentData,
                countOfComment: postDetails.commentData.length
            });
        }
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error", error })
    }
})

export default postRouter;

