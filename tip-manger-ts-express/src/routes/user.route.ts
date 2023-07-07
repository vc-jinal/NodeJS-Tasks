import { Router } from "express";
const userRouter = Router();
import { getUserById, updateUser, deleteUser, getAllUsers } from "../controllers/user.controller";
import { verifyToken } from "../utils/jwt";

// get user by id
userRouter.get("/", verifyToken, getUserById);

// update User
userRouter.put("/", verifyToken, updateUser);

// Delete User
userRouter.delete("/", verifyToken, deleteUser);

// get all users
userRouter.get("/allUsers", getAllUsers);

export default userRouter;
