import { Router, response } from "express";
import Post from '../models/post.module.js';
import User from '../models/user.model.js';
import verifyToken from '../utils/jwt.js';
import upload from "../utils/fileUpload.js";
import { Types } from "mongoose";
const postRouter = Router();

// get all post of that user
export const getAllPostOfUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const keyValue = req.query.keyValue; //text search
        const searchUserById = req.query.searchUserById;
        const mentionUserId = req.user.id;
        const userExist = await User.findOne({ _id: req.user.id });

        if (!userExist) {
            return res.send({ statusCode: 404, message: "User not found" })
        }
        if (searchUserById) {
            const getSearchUserPost = await Post.aggregate([{
                $match: {
                    $and: [{
                        $or: [
                            { description: { $regex: new RegExp(keyValue, 'i') } },
                            { 'commentData.comment': { $regex: new RegExp(keyValue, 'i') } }
                        ],
                        $or: [
                            // { userId: new Types.ObjectId(searchUserById) },
                            { sharedUser: [{ $in: new Types.ObjectId(req.user.id) }] }
                        ],
                        $or: [
                            { userId: new Types.ObjectId(searchUserById) },
                            { sharedUser: { $in: [new Types.ObjectId(searchUserById)] } },
                            { mentionUser: { $in: [new Types.ObjectId(searchUserById)] } },
                            { 'commentData.mentionId': { $in: [new Types.ObjectId(searchUserById)] } }
                        ]
                    }]
                }
            }, {
                $project: {
                    postData: 1,
                    description: 1,
                    mentionUserId: 1,
                    categories: 1,
                    lastComment: { $arrayElemAt: ['$commentData.comment', -1] },
                    sharedUser: 1
                }
            }]).limit(limit).skip((page - 1) * limit);
            return res.send({ statusCode: 200, message: "Search User Post", searchedUser: getSearchUserPost })
        }
        if (mentionUserId) {
            const getMentionPost = await Post.aggregate([{
                $match: {
                    $and: [{
                        $or: [
                            { userId: new Types.ObjectId(req.user.id) },
                            { sharedUser: [{ $in: new Types.ObjectId(req.user.id) }] }
                        ],
                        $or: [
                            { sharedUser: { $in: [new Types.ObjectId(req.user.id)] } },
                            { mentionUser: { $in: [new Types.ObjectId(req.user.id)] } },
                            { 'commentData.mentionId': { $in: [new Types.ObjectId(req.user.id)] } }
                        ], $or: [
                            { description: { $regex: new RegExp(keyValue, 'i') } },
                            { 'commentData.comment': { $regex: new RegExp(keyValue, 'i') } }
                        ],
                    }]
                }
            }, {
                $project: {
                    postData: 1,
                    description: 1,
                    mentionUserId: 1,
                    categories: 1,
                    lastComment: { $arrayElemAt: ['$commentData.comment', -1] },
                    sharedUser: 1
                }
            }
            ]).limit(limit).skip((page - 1) * limit);
            console.log(getMentionPost);
            return res.send({ statusCode: 200, message: "Mention User Post", mentionPost: getMentionPost })
        }
        else {
            const getPublicPost = await Post.aggregate([
                {
                    $match: {
                        $or: [
                            { categories: 'public' }
                        ]
                    }
                }
            ]).sort({ 'commentData.createdAt': -1 }).limit(limit).skip((page - 1) * limit);
            return res.send({ statusCode: 200, message: "All Public Post", allPost: getPublicPost })
        }
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error", error })
    }
}

// upload Post 
export const postUpload = async (req, res) => {
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
}

// comment on post
export const commentOnPost = async (req, res) => {
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
}

// get comment on postId
export const getCommentOfPost = async (req, res) => {
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
            const endIndex = page * limit;

            if (startIndex >= postDetails.commentData.length) {
                return res.send({ statusCode: 200, message: "NO comments found" });
            }

            for (let i = 0; i < postDetails.sharedUser.length; i++) {
                let data = postDetails.sharedUser[i];
                let data1 = new Types.ObjectId(req.user.id);

                if (data.toString() === data1.toString()) {
                    pagination = postDetails.commentData.slice(startIndex, endIndex);
                    continue;
                }
            }

            return res.send({
                statusCode: 200,
                message: "Comments on Post",
                countOfComment: postDetails.commentData.length,
                postDetails: pagination,
                total_pages: Math.ceil(postDetails.commentData.length / limit)
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
}