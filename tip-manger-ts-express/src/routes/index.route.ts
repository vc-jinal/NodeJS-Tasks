import { Router } from "express";
const indexRouter = Router();

import authRouter from "../routes/auth.route";
import userRouter from "./user.route";
import placeRouter from "./place.route";

indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/places", placeRouter);

export default indexRouter;
