const noodlesRouter = require('express').Router();
const fs = require('fs/promises');
require('dotenv').config();
const menuFile = process.env.MENU_FILE;

//get all noodles details
noodlesRouter.get("/", async (req, res) => {
    try {
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        res.send(item.noodles);
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
})

//get noodles details by id
noodlesRouter.get("/:id", async (req, res) => {
    try {
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        const noodlesId = parseInt(req.params.id);
        const noodles = item.noodles.find((item) => item.id === noodlesId)
        if (noodles) {
            res.json(noodles);
        }
        else {
            res.send({ statuscode: 404, error: 'Noodles not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
})

//post (create) noodles details
noodlesRouter.post('/', async (req, res) => {
    try {
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        const { id, name, price } = req.body;
        const newNoodlesId = item.counter.noodles + 1;
        const newNoodles = { id: newNoodlesId, name, price }
        item.noodles.push(newNoodles);
        item.counter.noodles = newNoodlesId;
        await fs.writeFile(menuFile, JSON.stringify(item));
        res.send(newNoodles);
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
})

//update noodle by id
noodlesRouter.put('/:id', async (req, res) => {
    try {
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        const id = parseInt(req.params.id);
        const { name, price } = req.body;
        const noodlesIndex = item.noodles.findIndex((item) => item.id === id);
        if (noodlesIndex !== -1) {
            item.noodles[noodlesIndex] = { id, name, price }
            await fs.writeFile(menuFile, JSON.stringify(item));
            res.send(item.noodles[noodlesIndex]);
        }
        else {
            res.send({ statuscode: 404, error: 'noodlees not found' })
        }
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'Internal Server Error' });
    }
})
//delete noodles by id
noodlesRouter.delete("/:id", async (req, res) => {
    try {
        const noodlesId = parseInt(req.params.id);
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        const noodlesIndex = item.pizza.findIndex((item) => item.id === noodlesId);
        if (index !== -1) {
            item.noodles.splice(noodlesIndex, 1)
            await fs.writeFile(menuFile, JSON.stringify(item));
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


