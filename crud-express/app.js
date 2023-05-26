const express = require('express')
const app = express();
const fs = require('fs/promises');
const file = './db.json';
app.use(express.json());

const readFile = async () => {
    try {
        const fileData = await fs.readFile(file);
        return JSON.parse(fileData);
    } catch (err) {
        return [];
    }
}

const writeFile = async (data) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
}

//GET
app.get('/', async (req, res) => {
    try {
        const user = await readFile();
        res.send({ users: user });
    }
    catch (err) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
})

//GET user by emailId
app.get('/email/:emailId', async (req, res) => {
    try {
        const users = await readFile();
        const emailId = req.params.emailId;
        const user = users.find((u) => u.emailId === emailId);
        if (user) {
            res.send({ userDetails: user });
        }
        else {
            res.send({ statuscode: 404, message: 'User not found' });
        }
    } catch (err) {
        res.send({ statuscode: 500, message: 'internal server error' })
    }
});

//create
app.post('/', async (req, res) => {
    try {
        const users = await readFile();
        const newUser = req.body;
        const existEmail = users.find((u) => u.emailId === newUser.emailId);
        if (existEmail) {
            return res.send({ statuscode: 403, message: 'EmailId already exist' });
        }
        users.push(newUser);
        writeFile(users);
        res.send({ NewUser: newUser });
    } catch (error) {
        res.send({ statuscode: 500, message: 'internal server error' })
    }

})

//update
app.put('/email/:emailId', async (req, res) => {
    try {
        const users = await readFile();
        const emailId = req.params.emailId;
        const updatedUser = req.body;
        const userIndex = users.findIndex((u) => u.emailId === emailId);
        if (userIndex === -1) {
            return res.send({ statuscode: 404, message: 'User not found' });
        }
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        await writeFile(users);
        res.send({ updatedUser: users[userIndex] });
    } catch (error) {
        res.send({ statuscode: 500, error: 'Internal server error' })
    }

})

//delete
app.delete('/email/:emailId', async (req, res) => {
    try {
        const users = await readFile();
        const emailId = req.params.emailId;
        const userIndex = users.findIndex((u) => u.emailId === emailId)
        if (userIndex === -1) {
            return res.send({ statuscode: 404, message: 'user not found' });
        }
        const deleteUser = users.splice(userIndex, 1);
        await writeFile(users);
        res.send({ deletedUser: deleteUser[0] });
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'Internal server error' })
    }
})

app.listen(3000, () => {
    console.log('The server is running on 3000 port');
})
