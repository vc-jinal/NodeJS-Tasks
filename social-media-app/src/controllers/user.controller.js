import { Router } from "express";
import User from "../models/user.model.js";
const userRouter = Router();
import verifyToken from "../utils/jwt.js";

// edit profile of user
export const editProfile = async (req, res) => {
    try {
        const { name, emailId, phoneNo, userName } = req.body;
        const userExist = await User.findOne({ _id: req.user.id, emailId: req.user.emailId });
        console.log(userExist);
        if (!userExist) {
            return res.send({ statusCode: 404, message: "User not found" });
        }

        const updateUser = await User.updateOne({ _id: req.user.id },
            {
                name: name,
                emailId: emailId,
                phoneNo: phoneNo,
                userName: userName
            }
        )
        // console.log("-=-=-=-=-", updateUser);
        // if (updateUser.code === 11000) {
        //     return res.send({ statusCode: 409, message: "EmailId is already Exist Enter different EmailId" })
        // }
        // console.log(updateUser);
        return res.send({ statusCode: 200, message: "User Details Updated Successfully", userDetail: updateUser })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error", error });
    }
}

// get user details
export const getUserDetail = async (req, res) => {
    try {
        const userExist = await User.findOne(
            { emailId: req.user.emailId }, {},
            {
                projection: {
                    userName: 1,
                    emailId: 1,
                }
            }
        );
        if (!userExist) {
            return res.send({ statusCode: 404, message: "User not found" });
        }
        return res.send({ statusCode: 200, message: "User Details Fetched Successfully", user: userExist });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error", error: error });
    }
}
