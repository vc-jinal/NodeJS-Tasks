import { Router, response } from "express";
import Post from '../models/post.module.js';
import User from '../models/user.model.js';
import verifyToken from '../utils/jwt.js';
import upload from "../utils/fileUpload.js";
import { getAllPostOfUser, postUpload, commentOnPost, getCommentOfPost } from '../controllers/post.controller.js'
import { joiMiddleware } from "../middlewares/joi.middleware.js";
import { createCommentOnPost, getAllPostOfUserSchema, uploadPostSchema } from '../validations/post.validation.js'
import { Types } from "mongoose";
const postRouter = Router();

// get all post of that user
postRouter.get('/', joiMiddleware(getAllPostOfUserSchema), verifyToken, getAllPostOfUser)

// upload Post 
postRouter.post('/', joiMiddleware(uploadPostSchema), verifyToken, upload.single('posts'), postUpload)

// comment on post
postRouter.post('/comment', joiMiddleware(createCommentOnPost), verifyToken, commentOnPost)

// get comment on postId
postRouter.get('/comments/:postId/', verifyToken, getCommentOfPost)

export default postRouter;

