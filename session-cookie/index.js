const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bycrypt = require('bcrypt');
const fs = require('fs/promises');
require('dotenv').config();
const Secretkey = process.env.SECRET_KEY;
const fileStore = require('session-file-store')(session);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(
    session({
        secret: Secretkey,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60
        },
        resave: true,
        store: new fileStore({
            path: '../sessions'
        }),
    })
)

const readSessionData = async () => {
    const data = await fs.readFile('./session.json');
    return JSON.parse(data);
};

const writeSessionData = async (sessionData) => {
    await fs.writeFile('./session.json', JSON.stringify(sessionData, null, 2));
};

//signup if user logged in then redirect to dashboard
app.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/login.html');
    }
    else {
        res.sendFile(__dirname + '/signUp.html');
    }
})

//signup
app.post('/signup', async (req, res) => {
    const sessionData = await readSessionData();
    const { name, email, password, phone } = req.body;
    const userExist = sessionData.find((user) => user.email === email)
    if (userExist) {
        return res.send("user already exist")
    }
    const hashPassword = await bycrypt.hash(password, 10);
    const newUser = {
        id: sessionData.length + 1,
        name,
        email,
        password: hashPassword,
        phone,
    }
    sessionData.push(newUser);
    writeSessionData(sessionData);
    res.sendFile(__dirname + '/login.html')
})

//login
app.post('/login', async (req, res) => {
    const data = await readSessionData();
    const { email, password } = req.body;
    const user = data.find((user) => user.email === email)
    if (!user) {
        return res.send("Invalid Email");
    }
    const passValid = await bycrypt.compare(password, user.password);
    if (!passValid) {
        return res.send("Invalid Password");
    }
    if (user) {
        req.session.user = user;
        data[req.session.user] = user;
        res.sendFile(__dirname + '/dashboard.html');
    }
})

//dashboard
app.get('/dashboard', (req, res) => {
    const user = req.session.user;
    const userDetail = {
        name: user.name,
        email: user.email,
        phone: user.phone
    }
    res.json({ userDetail });

})

app.listen(3000, () => {
    console.log("app is running on 3000");
})



