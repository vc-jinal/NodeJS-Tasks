import { Router } from "express";
const authRouter = Router();
import { signIn, signUp } from "../controllers/auth.controller";

authRouter.post("/signUp", signUp);

authRouter.post("/signIn", signIn);

export default authRouter;
