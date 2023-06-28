import { Router } from "express";
import User from '../models/user.model.js'
import verifyToken from "../utils/jwt.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const authRouter = Router();
import { joiMiddleware } from "../middlewares/joi.middleware.js";
import { signUpSchema } from "../validations/auth.validation.js";

// signup
export const signUp = async (req, res) => {
    try {
        const { name, emailId, phoneNo, password } = req.body;
        const emailExist = await User.findOne({ emailId: emailId, phoneNo: phoneNo });
        if (emailExist) {
            return res.send({ statusCode: 400, message: "EmailId or PhoneNo Already Exist" });
        }

        const newUser = {
            name: name,
            emailId: emailId,
            phoneNo: phoneNo,
            userName: emailId.split('@')[0] + Math.floor(Math.random() * 1000),
            password: await bcrypt.hash(password, 10)
        }
        const addUser = await User.create(newUser);
        return res.send({ statusCode: 200, message: "User Created successfully", userDetail: addUser })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error" });
    }
}

// login
export const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const emailExist = await User.findOne({ emailId: emailId });

        if (!emailExist) {
            return res.send({ statusCode: 404, message: "User Not Found" });
        }

        const comparePassword = await bcrypt.compare(password, emailExist.password);
        if (!comparePassword) {
            return res.send({ statusCode: 401, message: "Invalid Email or password" });
        }

        const token = jwt.sign({
            emailId: emailId,
            id: emailExist._id,
            password: emailExist.password
        }, process.env.SECRET_KEY, { expiresIn: '24h' })
        return res.send({ statusCode: 200, message: "User logged in Successfully", token: token })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" })
    }
}

// change Password
export const changePassword = async (req, res) => {
    try {

        const password = req.body.password;
        console.log(req.user);
        const userExist = await User.findOne({ _id: req.user.id });
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!userExist) {
            return res.send({ statusCode: 404, message: "User not found" });
        }
        const changePassword = await User.updateOne({ _id: req.user.id },
            { password: hashedPassword }
        );
        return res.send({ statusCode: 200, message: "Password Changed Successfully", changedPassword: changePassword })
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error", error: error });
    }
}
