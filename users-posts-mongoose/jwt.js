const jwt = require('jsonwebtoken');
require('dotenv').config();
const signature = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.send({ statusCode: 404, message: "Token Required" })
    }

    const decoded = jwt.verify(token, signature);
    if (decoded) {
        req.user = decoded;
        next();
    }
}

module.exports = verifyToken;