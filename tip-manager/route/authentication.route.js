const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../db/connection');
const db = client.db('tip-manager');
const user = db.collection('users');
require('dotenv').config();
const signature = process.env.SECRET_KEY;


// signup
router.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName, age, dob } = req.body;

    const emailExist = await user.findOne({ email: email });
    if (emailExist) {
        return res.send({ statusCode: 400, message: "user already exist" })
    }

    const newUser = {
        email: email,
        password: await bcrypt.hash(password, 10),
        firstName: firstName,
        lastName: lastName,
        age: age,
        dob: dob,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now())
    }

    const savedUser = await user.insertOne(newUser);
    res.send({ statusCode: 200, message: "User Created Successfully", user: savedUser })
})

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const emailExist = await user.findOne({ email: email });

    if (!emailExist) {
        return res.send({ statusCode: 404, message: "User not found" })
    }
    const comparePassword = await bcrypt.compare(password, emailExist.password)
    if (!comparePassword) {
        return res.send({ statusCode: 500, message: "Invalid Password" });
    }

    const token = jwt.sign({
        email: email,
        id: emailExist._id
    }, signature)

    return res.send({ statusCode: 200, message: "User Logged in successfully", token: token });
})

module.exports = router;
