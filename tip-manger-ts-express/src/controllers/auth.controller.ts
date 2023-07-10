import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ResponseHandler } from "../common/types";
import { createUser, getUserDetails } from "../services/user.service";
dotenv.config();

// signUp
export const signUp = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, emailId, password, dob } = req.body;
        const emailExist = await getUserDetails({ emailId: emailId });
        if (emailExist) {
            return ResponseHandler(res, 400, "EmailId already Exist");
        }
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: await bcrypt.hash(password, 10),
            dob: dob,
        };
        const addNewUser = await createUser(newUser);
        return ResponseHandler(res, 200, "User Created Successfully", { addNewUser });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};

// signIn
export const signIn = async (req: Request, res: Response) => {
    try {
        const { emailId, password } = req.body;

        const emailExist = await getUserDetails({ emailId: emailId });
        if (!emailExist) {
            return ResponseHandler(res, 404, "User Not Found");
        }

        const comparePassword = await bcrypt.compare(password, emailExist.password as string);
        if (!comparePassword) {
            return ResponseHandler(res, 401, "Invalid Credential");
        }

        const payload = {
            emailId: emailId,
            id: emailExist._id,
        };

        const token = jwt.sign(
            {
                emailId: emailId,
                id: emailExist._id,
            },
            process.env.SECRET_KEY as jwt.Secret
        );
        return ResponseHandler(res, 200, "User Logged In Successfully", { token });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error");
    }
};
