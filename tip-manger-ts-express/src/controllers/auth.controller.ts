import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../db/modules/user.module";
import dotenv from "dotenv";
dotenv.config();

// signUp
export const signUp = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, emailId, password, dob } = req.body;
        const emailExist = await User.findOne({ emailId: emailId });
        if (emailExist) {
            return res.send({ statusCode: 400, message: "EmailId already Exist" });
        }
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: await bcrypt.hash(password, 10),
            dob: dob,
        };
        const addNewUser = await User.create(newUser);
        return res.send({
            statusCode: 200,
            message: "User Created Successfully",
            adduser: addNewUser,
        });
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
};

// signIn
export const signIn = async (req: Request, res: Response) => {
    try {
        const { emailId, password } = req.body;

        const emailExist = await User.findOne({ emailId: emailId });

        if (!emailExist) {
            return res.send({ statusCode: 404, message: "User Not Found" });
        }

        const comparePassword = await bcrypt.compare(password, String(emailExist.password));
        if (!comparePassword) {
            return res.send({ statusCode: 401, message: "Invalid Credential" });
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

        return res.send({
            statusCode: 200,
            message: "User Logged In Successfully",
            token: token,
        });
    } catch (error) {
        return res.send({ statusCode: 500, emssage: "Internal Server Error" });
    }
};
