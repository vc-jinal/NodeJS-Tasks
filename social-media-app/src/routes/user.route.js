import { Router } from "express";
const userRouter = Router();
// import { editProfile, getUserDetail } from '../controllers/user.controller.js'
import verifyToken from "../utils/jwt.js";
import { joiMiddleware } from "../middlewares/joi.middleware.js";
import { editProfile, getUserDetail } from '../controllers/user.controller.js'
import { editProfileSchema } from '../validations/user.validation.js'

// edit profile of user
userRouter.put('/', joiMiddleware(editProfileSchema), verifyToken, editProfile)

// get user details
userRouter.get('/', verifyToken, getUserDetail)

export default userRouter;