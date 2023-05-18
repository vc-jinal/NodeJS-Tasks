const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();
const userFile = process.env.MY_FILE;
const jwtSecretkey = process.env.JWT_SECRET_KEY;
app.use(bodyParser.json());


if (!fs.existsSync(userFile)) {
    fs.writeFileSync(userFile, []);
}

app.post('/register', async (req, res) => {
    const users = JSON.parse(fs.readFile(userFile));
    const { name, email, password } = req.body;
    const userExist = users.find((user) => user.email === email);
    if (userExist) {
        return res.status(409).json({ message: "user already exist.." });
    }
    try {
        const hashPassword = await bycrypt.hash(password, 10);
        const user = { name, email, password: hashPassword }
        users.push(user);
        fs.writeFileSync(userFile, JSON.stringify(users, null, 2));
        return res.status(200).json({ message: "User registered successfully" })
    } catch (err) {
        return res.status(400).json({ error: "registration failed" });
    }
})


app.post('/login', async (req, res) => {
    const users = JSON.parse(fs.readFileSync(userFile, 'utf-8'));
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(400).json({ message: "Invalid email" })
    }
    try {
        const passValid = await bycrypt.compare(password, user.password);
        if (!passValid) {
            return res.status(400).json({ error: "Invalid password" })
        }
        const token = jwt.sign({ email: user.email },
            jwtSecretkey);
        return res.status(202).json({ token });//acept for proessing but not completed
    }
    catch (error) {
        return res.json({ error: "Coudln't login " })
    }
})


//middleware for jwt verification

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ error: "Token is not given" })
    }
    jwt.verify(token, jwtSecretkey, (err, decoded) => {
        if (err) {
            return res.json({ error: "Invalid token" })
        }
        req.user = decoded;
        next();
    });
}

//
app.get('/verification', verifyToken, (req, res) => {
    const user = req.user;
    res.json({ message: `welcome,${user.email}, verification is successfully done` })
})


app.listen(3000, () => {
    console.log("app is runnig on port 3000");
})