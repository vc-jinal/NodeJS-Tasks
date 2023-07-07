import { Router } from "express";
const userRouter = Router();
import { getUserById, updateUser, deleteUser, getAllUsers } from "../controllers/user.controller";
import { verifyToken } from "../utils/jwt";
import { joiMiddleware } from "../middleware/joi.middleware";
import { updateUserSchema } from "../validations/user.validation";

// get user by id
userRouter.get("/", verifyToken, getUserById);

// update User
userRouter.put("/", joiMiddleware(updateUserSchema), verifyToken, updateUser);

// Delete User
userRouter.delete("/", verifyToken, deleteUser);

// get all users
userRouter.get("/allUsers", getAllUsers);

export default userRouter;
