import { Router } from 'express';
const indexRouter = Router();

import userRouter from '../routes/user.route.js'
import authRouter from '../routes/auth.route.js'
import postRouter from '../routes/post.route.js';

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/posts', postRouter);

export default indexRouter;