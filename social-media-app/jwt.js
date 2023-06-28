import jwt, { verify } from 'jsonwebtoken';
import dotenv from 'dotenv'
import User from './models/user.model.js';
dotenv.config();

const verifyToken = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.send({ statusCode: 404, message: "Token required" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    if (decoded) {
        req.user = decoded;
        const userDetails = await User.findOne({ emailId: req.user.emailId });

        if (req.user.password !== userDetails.password) {
            return res.send({ statusCode: 404, message: "Please Re-login" })
        }

        next();
    }
}

export default verifyToken; 