const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
require('dotenv').config();
const userFile = process.env.MY_FILE;
const jwtSecretkey = process.env.JWT_SECRET_KEY;
app.use(bodyParser.json());

//register
app.post('/register', async (req, res) => {
    try {
        const data = await fs.readFile(userFile);
        const users = JSON.parse(data.toString());
        const { name, email, password } = req.body;
        const userExist = users.find((user) => user.email === email);
        if (userExist) {
            return res.status(400).send({ message: "user already exist." });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = { name, email, password: hashPassword }
        users.push(user);
        fs.writeFile(userFile, JSON.stringify(users, null, 2));
        return res.status(200).send({ message: "User registered successfully" })
    } catch (err) {
        return res.status(400).send({ message: "registration failed", err });
    }
})

//login
app.post('/login', async (req, res) => {
    const data = await fs.readFile(userFile);
    const users = JSON.parse(data.toString());
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.send({ statuscode: 400, message: "Invalid email" })
    }
    try {
        const passValid = await bcrypt.compare(password, user.password);
        if (!passValid) {
            return res.send({ statuscode: 400, message: "Invalid password" })
        }
        const token = jwt.sign({ email: user.email }, jwtSecretkey);
        return res.send({ statuscode: 200, message: "user logged in completed", token: token });
    }
    catch (error) {
        return res.send({ statuscode: 400, message: "Couldn't login " })
    }
})


//middleware for jwt verification
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.send({ statuscode: 400, message: "Token is required" })
    }
    const decoded = jwt.verify(token, jwtSecretkey)
    if (decoded) {
        req.user = decoded;
        next();
    }
    return res.send({ statuscode: 400, message: "Invalid token" });
}

//verification
app.get('/verification', verifyToken, (req, res) => {
    const user = req.user;
    res.send({ statuscode: 200, message: `welcome,${user.email}, verification is successfull` })
})

app.listen(3000, () => {
    console.log("app is running on port 3000");
})