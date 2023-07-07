import jwt from "jsonwebtoken";
import User from "../db/modules/user.module";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export interface AuthenticationRequest extends Request {
    emailId: String;
    id: String;
}

export const verifyToken: any = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.send({ statusCode: 404, message: "Token Required" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY as jwt.Secret);
    if (typeof decoded === "object") {
        const userExist = await User.findOne({ emailId: decoded.emailId });
        if (!userExist) {
            return res.send({ statusCode: 404, message: "User Not Found" });
        }
        req.emailId = decoded.emailId;
        req.id = decoded.id;
        next();
    }
};
