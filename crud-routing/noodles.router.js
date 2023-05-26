const noodlesRouter = require('express').Router();
const fs = require('fs/promises');
require('dotenv').config();
const menuFile = process.env.MENU_FILE;

//get all noodles details
noodlesRouter.get("/", async (req, res) => {
    try {
        const data = await fs.readFile(menuFile);
        res.send(data.noodles);
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
})

//get noodles details by id
noodlesRouter.get("/:id", async (req, res) => {
    try {
        const data = await fs.readFile(menuFile);
        const noodlesId = parseInt(req.params.id);
        const noodles = data.noodles.find((item) => item.id === noodlesId)
        if (noodles) {
            res.send(noodles);
        }
        else {
            res.send({ statuscode: 404, message: 'Noodles not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, message: 'internal server error' })
    }
})

//post (create) noodles details
noodlesRouter.post('/', async (req, res) => {
    try {
        const data = await fs.readFile(menuFile);
        const { id, name, price } = req.body;
        const newNoodlesId = data.counter.noodles + 1;
        const newNoodles = { id: newNoodlesId, name, price }
        data.noodles.push(newNoodles);
        data.counter.noodles = newNoodlesId;
        await fs.writeFile(menuFile, JSON.stringify(data));
        res.send(newNoodles);
    }
    catch (error) {
        res.send({ statuscode: 500, message: 'internal server error' })
    }
})

//update noodle by id
noodlesRouter.put('/:id', async (req, res) => {
    try {
        const data = await fs.readFile(menuFile);
        const id = parseInt(req.params.id);
        const { name, price } = req.body;
        const noodlesIndex = data.noodles.findIndex((item) => item.id === id);
        if (noodlesIndex !== -1) {
            data.noodles[noodlesIndex] = { id, name, price }
            await fs.writeFile(menuFile, JSON.stringify(data));
            res.send(data.noodles[noodlesIndex]);
        }
        else {
            res.send({ statuscode: 404, message: 'noodlees not found' })
        }
    }
    catch (error) {
        res.send({ statuscode: 500, message: 'Internal Server Error' });
    }
})
//delete noodles by id
noodlesRouter.delete("/:id", async (req, res) => {
    try {
        const noodlesId = parseInt(req.params.id);
        const data = await fs.readFile(menuFile);
        const noodlesIndex = data.pizza.findIndex((item) => item.id === noodlesId);
        if (index !== -1) {
            data.noodles.splice(noodlesIndex, 1)
            await fs.writeFile(menuFile, JSON.stringify(data));
            res.send({ statuscode: 200, message: "Noodles is deleted" });
        } else {
            res.send({ statuscode: 404, error: 'noodles not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'Internal Server Error' });
    }
})

module.exports = noodlesRouter;


