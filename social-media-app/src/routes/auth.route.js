import { Router } from "express";
import verifyToken from "../utils/jwt.js";
import dotenv from 'dotenv';
dotenv.config();
const authRouter = Router();
import { changePassword, login, signUp } from '../controllers/auth.controller.js'
import { joiMiddleware } from "../middlewares/joi.middleware.js";
import { signUpSchema } from "../validations/auth.validation.js";

// signup
authRouter.post('/signUp', joiMiddleware(signUpSchema), signUp)

// login
authRouter.post('/login', login)

// change Password
authRouter.post('/changePassword', verifyToken, changePassword)

export default authRouter;