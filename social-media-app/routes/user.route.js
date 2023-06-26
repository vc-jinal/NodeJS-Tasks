import { Router } from "express";
import User from "../models/user.model.js";
const userRouter = Router();
import verifyToken from "../jwt.js";

// edit profile of user
userRouter.put('/', verifyToken, async (req, res) => {
    try {
        const { name, emailId, phoneNo } = req.body;
        const userExist = await User.findOne({ _id: req.user.id });
        if (!userExist) {
            return res.send({ statusCode: 404, message: "User not found" });
        }
        const updateUser = await User.updateOne({ _id: req.user.id },
            {
                name: name,
                emailId: emailId,
                phoneNo: phoneNo,
                userName: emailId.split('@')[0] + Math.floor(Math.random() * 1000)
            }
        )
        return res.send({ statusCode: 200, message: "User Details Updated Successfully", userDetail: updateUser })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
})

// get user details
userRouter.get('/', verifyToken, async (req, res) => {
    try {
        const userExist = await User.findOne({ emailId: req.user.emailId });
        if (!userExist) {
            return res.send({ statusCode: 404, message: "User not found" });
        }
        return res.send({ statusCode: 200, message: "User Details Fetched Successfully", user: userExist });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
})

export default userRouter;