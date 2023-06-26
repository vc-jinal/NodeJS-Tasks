import jwt, { verify } from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.send({ statusCode: 404, message: "Token required" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    if (decoded) {
        req.user = decoded;
        next();
    }
}

export default verifyToken;