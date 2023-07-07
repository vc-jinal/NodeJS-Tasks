import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../db/modules/user.module";
import { AuthenticationRequest } from "../utils/jwt";
import { getaAllusers } from "../common/types";

// all users
export const getAllUsers: any = async (req: AuthenticationRequest, res: Response) => {
    const users = await User.find();
    return res.send({ statusCode: 200, message: "All User fetched Successfully", users: users });
};

//get user by id
export const getUserById: any = async (req: AuthenticationRequest, res: Response) => {
    try {
        const getUser = await User.findOne({ emailId: req.emailId });
        if (!getUser) {
            return res.send({ statusCode: 404, message: "User not found" });
        }
        return res.send({ statusCode: 200, message: "All User fetched Successfully", users: getUser });
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
};

// update user
export const updateUser: any = async (req: AuthenticationRequest, res: Response) => {
    try {
        const { firstName, lastName, password, dob } = req.body;
        const getUser = await User.findOne({ emailId: req.emailId });

        if (!getUser) {
            return res.send({ statusCode: 404, message: "User not found" });
        }

        const updateUser = await User.updateOne(
            { emailId: req.emailId },
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    password: await bcrypt.hash(password, 10),
                    dob: dob,
                },
            }
        );
        return res.send({ statusCode: 200, message: "Details updated successfully", updated: updateUser });
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
};

// Delete User
export const deleteUser: any = async (req: AuthenticationRequest, res: Response) => {
    try {
        const deletedUser = await User.deleteOne({ emailId: req.emailId });
        if (deletedUser.deletedCount === 0) {
            return res.send({ statusCode: 404, message: "User Not Found" });
        }
        return res.send({ statusCode: 200, message: "User deleted Successfully" });
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
};
