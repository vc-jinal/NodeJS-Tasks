import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AuthenticationRequest } from "../utils/jwt";
import { ResponseHandler } from "../common/types";
import { deleteUserDetails, getAllUserDetails, getUserDetails, updateUserDetails } from "../services/user.service";

// all users
export const getAllUsers = async (req: AuthenticationRequest & Request, res: Response) => {
    const users = await getAllUserDetails();
    return ResponseHandler(res, 200, "All User fetched Successfully", { users });
};

//get user by id
export const getUserById = async (req: Request & AuthenticationRequest, res: Response) => {
    try {
        const getUser = await getUserDetails({ emailId: req.emailId });
        if (!getUser) {
            return ResponseHandler(res, 404, "User not found");
        }
        return ResponseHandler(res, 200, "All User fetched Successfully", { getUser });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};

// update user
export const updateUser = async (req: AuthenticationRequest & Request, res: Response) => {
    try {
        const { firstName, lastName, password, dob } = req.body;

        const getUser = await getUserDetails({ emailId: req.emailId });

        if (!getUser) {
            return ResponseHandler(res, 404, "User not found");
        }

        const updateUser = await updateUserDetails(
            { emailId: req.emailId },
            {
                firstName: firstName,
                lastName: lastName,
                password: await bcrypt.hash(password, 10),
                dob: dob,
            }
        );

        return ResponseHandler(res, 200, "Details updated successfully", { updateUser });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};

// Delete User
export const deleteUser = async (req: AuthenticationRequest & Request, res: Response) => {
    try {
        const deletedUser = await deleteUserDetails({ emailId: req.emailId });
        if (deletedUser.deletedCount === 0) {
            return ResponseHandler(res, 404, "User Not Found");
        }
        return ResponseHandler(res, 200, "User deleted Successfully");
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};
