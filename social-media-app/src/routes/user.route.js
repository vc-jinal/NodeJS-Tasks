import { Router } from "express";
const userRouter = Router();
import { editProfile, getUserDetail } from '../controllers/user.controller.js'
import verifyToken from "../utils/jwt.js";

// edit profile of user
userRouter.put('/', verifyToken, editProfile)

// get user details
userRouter.get('/', verifyToken, getUserDetail)

export default userRouter;