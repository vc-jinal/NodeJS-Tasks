const burgerRouter = require('express').Router();
const fs = require('fs/promises');
require('dotenv').config();
const menuFile = process.env.MENU_FILE;

// get all burgers
burgerRouter.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(menuFile);
        res.send(data.burger);
    }
    catch (error) {
        res.send({ statuscode: 500, message: 'internal server error' })
    }
});

// get burger by id
burgerRouter.get('/:id', async (req, res) => {
    try {
        const menuFile = process.env.MENU_FILE;
        const data = await fs.readFile(menuFile);
        const burgerid = parseInt(req.params.id);
        const burger = data.burger.find(item => item.id === burgerid);
        if (burger) {
            res.send(burger);
        } else {
            res.send({ statuscode: 404, message: 'Burger not found' });
        }
    } catch (error) {
        res.send({ statuscode: 500, message: 'internal server error' })
    }
});

// POST a new burger
burgerRouter.post('/', async (req, res) => {
    try {
        const menuFile = process.env.MENU_FILE;
        const data = await fs.readFile(menuFile);
        const { id, name, price } = req.body;
        const newBugerId = data.counter.burger + 1;
        const newBuger = { id: newBugerId, name, price }
        data.burger.push(newBuger);
        data.counter.burger = newBugerId;
        await fs.writeFile(menuFile, JSON.stringify(data));
        res.send(newBuger);
    }
    catch (error) {
        res.send({ statuscode: 500, message: 'internal server error' })
    }
});

// PUT (update) a burger by ID
burgerRouter.put('/:id', async (req, res) => {
    try {
        const menuFile = process.env.MENU_FILE;
        const data = await fs.readFile(menuFile);
        const id = parseInt(req.params.id);
        const { name, price } = req.body;
        const burgerIndex = data.burger.findIndex((item) => item.id === id);
        if (burgerIndex !== -1) {
            item.burger[burgerIndex] = { id, name, price };
            await fs.writeFile(menuFile, JSON.stringify(data));
            res.send(data.burger[burgerIndex]);
        } else {
            res.send({ statuscode: 404, message: 'Burger not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, message: 'internal server error' })
    }
});

// DELETE burger by ID
burgerRouter.delete('/:id', async (req, res) => {
    try {
        const menuFile = process.env.MENU_FILE;
        const data = await fs.readFile(menuFile);
        const id = parseInt(req.params.id);
        const burgerIndex = data.burger.findIndex(item => item.id === id);
        if (burgerIndex !== -1) {
            data.burger.splice(burgerIndex, 1);
            await fs.writeFile(menuFile, JSON.stringify(data));
            res.send({ statuscode: 200, message: "Burger is deleted" });
        } else {
            res.send({ statuscode: 404, message: 'Burger not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, message: 'internal server error' })
    }
});

module.exports = burgerRouter;

