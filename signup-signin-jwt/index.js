const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bycrypt = require('bcrypt');
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

        const hashPassword = await bycrypt.hash(password, 10);
        const user = { name, email, password: hashPassword }
        users.push(user);
        fs.writeFile(userFile, JSON.stringify(users, null, 2));
        return res.status(200).send({ message: "User registered successfully" })

    } catch (err) {
        return res.status(400).send({ message: "registration failed" });
    }
})

//login
app.post('/login', async (req, res) => {
    const data = await fs.readFile(userFile);
    const users = JSON.parse(data.toString());
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(400).send({ message: "Invalid email" })
    }
    try {
        const passValid = await bycrypt.compare(password, user.password);
        if (!passValid) {
            return res.status(400).send({ message: "Invalid password" })
        }
        const token = jwt.sign({ email: user.email }, jwtSecretkey);
        return res.status(200).send({ message: "user logged in completed", token: token });
    }
    catch (error) {
        return res.status(400).send({ message: "Couldn't login " })
    }
})


//middleware for jwt verification
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ message: "Token required" })
    }
    const decoded = jwt.verify(token, jwtSecretkey)
    if (decoded) {
        req.user = decoded;
        next();
    }
    return res.json({ message: "Invalid token" });
}

//verification
app.get('/verification', verifyToken, (req, res) => {
    const user = req.user;
    res.json({ message: `welcome,${user.email}, verification is successfull` })
})

app.listen(3000, () => {
    console.log("app is runnig on port 3000");
})