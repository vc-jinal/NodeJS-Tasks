const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.model');
const tokenVerification = require('../jwt');
const upload = require('../utils/fileUpload');

// Users By Id
userRouter.get('/', tokenVerification, async (req, res) => {
    try {
        const getUser = await User.findOne({ emailId: req.user.emailId });
        if (!getUser) {
            return res.send({ statusCode: 404, message: "User not Found" })
        }
        return res.send({ statusCode: 200, message: "Fetched User SuccessFully", allUsers: getUser });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error" });
    }
})

// Update User by Id
userRouter.put('/', tokenVerification, async (req, res) => {
    try {
        const { firstName, lastName, password, dob, age } = req.body;
        const findUser = await User.findOne({ emailId: req.user.emailId });
        if (!findUser) {
            return res.send({ statusCode: 404, message: "User Not Found" });
        }
        const updateUser = await User.updateOne({ emailId: req.user.emailId },
            {
                firstName: firstName,
                lastName: lastName,
                password: password,
                dob: dob,
                age: age
            }
        )
        return res.send({ statusCode: 200, message: "User details Updated Successfully", UpdateUser: updateUser })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error" });
    }
})

// upload profile picture
userRouter.post('/profile', tokenVerification, upload.single('profilePicture'), async (req, res) => {
    try {
        const profile_picture = req.file;
        const emailExist = await User.findOne({ emailId: req.user.emailId })
        if (!emailExist) {
            return res.send({ statusCode: 404, message: "User not found" })
        }
        const addProfile = { profilePicture: profile_picture.path }
        const updateUser = await User.updateOne({ emailId: req.user.emailId }, addProfile, { upsert: true });
        return res.send({ statusCode: 200, message: "User Profile Uploaded Successfully", data: updateUser });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error" });
    }
})

// delete user by id
userRouter.delete('/', tokenVerification, async (req, res) => {
    try {
        const deleteUser = await User.deleteOne({ emailId: req.user.emailId });
        if (deleteUser.deletedCount === 0) {
            return res.send({ statusCode: 404, message: "User Not Found" })
        }
        return res.send({ statusCode: 200, message: "User Deleted SuccessFully", deleteUser: deleteUser });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error" });
    }
})

// All Users
userRouter.get('/', async (req, res) => {
    try {
        const getUsers = await User.find({});
        return res.send({ statusCode: 200, message: "All Users", allUsers: getUsers });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error" });
    }
})

module.exports = userRouter;