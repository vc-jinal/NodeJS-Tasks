import { Router } from "express";
const authRouter = Router();
import { joiMiddleware } from "../middleware/joi.middleware";
import { signInSchema, signUpSchema } from "../validations/auth.validation";
import { signIn, signUp } from "../controllers/auth.controller";

// signUp
authRouter.post("/signUp", joiMiddleware(signUpSchema), signUp);

// signIn
authRouter.post("/signIn", joiMiddleware(signInSchema), signIn);

export default authRouter;
