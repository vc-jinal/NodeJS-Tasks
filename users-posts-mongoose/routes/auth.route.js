const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();
const signature = process.env.SECRET_KEY;

// SignUp
authRouter.post('/signUp', async (req, res) => {
    try {
        const { firstName, lastName, emailId, password, dob, age } = req.body;
        const emailExist = await User.findOne({ emailId: emailId });
        if (emailExist) {
            return res.send({ statusCode: 400, message: "User Already Exist" });
        }
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: await bcrypt.hash(password, 10),
            dob: dob,
            age: age,
            profilePicture: ""
        }
        const addUser = await User.create(newUser);

        return res.send({ statusCode: 200, message: "User created successfully", data: addUser });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error" });
    }
})

// login
authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const emailExist = await User.findOne({ emailId: emailId });
        if (!emailExist) {
            return res.send({ statusCode: 404, message: "User not Found" });
        }
        const comparePassword = await bcrypt.compare(password, emailExist.password);
        if (!comparePassword) {
            return res.send({ statusCode: 500, message: "Invalid password" });
        }
        const token = jwt.sign({
            emailId: emailId,
            id: emailExist._id
        }, signature, { expiresIn: '1h' })
        return res.send({ statusCode: 200, message: "User Logged in Successfully", token: token });
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server error" });
    }
})


module.exports = authRouter;