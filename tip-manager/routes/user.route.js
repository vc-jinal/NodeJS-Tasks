const express = require('express');
const client = require('../db/connection');
const verifyToken = require('../jwt.js')
const userRouter = express.Router();
const db = client.db('tip-manager');
const user = db.collection('users');
const bcrypt = require('bcrypt');

// get All users
userRouter.get('/', verifyToken, async (req, res) => {
    const users = await user.find().toArray()
    return res.send({ statusCode: 200, message: "All User Fetched Successfully", users: users })
})

// get user by emailId
userRouter.get('/userData', verifyToken, async (req, res) => {
    const getUser = await user.findOne({ email: req.user.email });
    if (!getUser) {
        return res.send({ statusCode: 404, message: "User not found" })
    }
    return res.send({ statusCode: 200, message: "User fetched successfully", user: getUser })
})

// update
userRouter.put('/', verifyToken, async (req, res) => {
    const { firstName, lastName, password, dob } = req.body;
    const getUser = await user.findOne({ email: req.user.email });
    if (!getUser) {
        return res.send({ statusCode: 404, message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = user.updateOne({ email: req.user.email },
        {
            $set: {
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                dob: dob,
                updated_at: new Date(Date.now())
            }
        }
    );
    return res.send({ statusCode: 200, message: "User details updated successfully", user: updateUser })
})

// delete
userRouter.delete('/', verifyToken, async (req, res) => {
    const deleteUser = await user.deleteOne({ email: req.user.email })
    if (deleteUser.deletedCount === 0) {
        return res.send({ statusCode: 404, message: "User not found" })
    }
    return res.send({ statusCode: 200, message: "User Deleted successfully", user: deleteUser })
})

module.exports = userRouter;