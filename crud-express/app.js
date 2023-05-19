const express = require('express')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

const file = './db.json';
app.use(bodyParser.json());

if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '[]');
}

const readFile = () => {
    const fileData = fs.readFileSync(file);
    return JSON.parse(fileData);
}

const writeFile = (data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

//GET
app.get('/', (req, res) => {
    const user = readFile();
    res.json(user);
})

//GET 
app.get('/email/:emailid', (req, res) => {
    const users = readFile();
    const emailid = req.params.emailid;
    const user = users.find((u) => u.emailid === emailid);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User is not found' });
    }
});


//cretae
app.post('/', (req, res) => {
    const users = readFile();
    const newUser = req.body;
    const existEmail = users.find((u) => u.emailid === newUser.emailid);
    if (existEmail) {
        return res.status(404).json({ error: 'Email id is already exist' });
    }
    users.push(newUser);
    writeFile(users);
    res.json(newUser);
})
//update
app.put('/email/:emailid', (req, res) => {
    const users = readFile();
    const emailid = req.params.emailid;
    const updatedUser = req.body;
    const userIndex = users.findIndex((u) => u.emailid === emailid);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    writeFile(users);
    res.json(users[userIndex]);
})

//delete
app.delete('/email/:emailid', (req, res) => {
    const users = readFile();
    const emailid = req.params.emailid;
    const userIndex = users.findIndex((u) => u.emailid === emailid)
    if (userIndex === -1) {
        return res.status(404).json({ error: 'user not found' });

    }
    const deleteUser = users.splice(userIndex, 1);
    writeFile(users);
    res.json(deleteUser[0]);
})

app.listen(3000, () => {
    console.log('The server is runnig on 3000 port');
})