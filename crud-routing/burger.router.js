const burgerRouter = require('express').Router();
const fs = require('fs/promises');
require('dotenv').config();
const menuFile = process.env.MENU_FILE;


// get all burgers
burgerRouter.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        res.send(item.burger);
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
});

// get burger by id
burgerRouter.get('/:id', async (req, res) => {
    try {
        const menuFile = process.env.MENU_FILE;
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        const burgerid = parseInt(req.params.id);
        const burger = item.burger.find(item => item.id === burgerid);
        if (burger) {
            res.json(burger);
        } else {
            res.send({ statuscode: 404, error: 'Burger not found' });
        }
    } catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
});

// POST a new burger
burgerRouter.post('/', async (req, res) => {
    try {
        const menuFile = process.env.MENU_FILE;
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        const { id, name, price } = req.body;
        const newBugerId = item.counter.burger + 1;
        const newBuger = { id: newBugerId, name, price }
        item.burger.push(newBuger);
        item.counter.burger = newBugerId;
        await fs.writeFile(menuFile, JSON.stringify(item));
        res.send(newBuger);
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
});

// PUT (update) a burger by ID
burgerRouter.put('/:id', async (req, res) => {
    try {
        const menuFile = process.env.MENU_FILE;
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        const id = parseInt(req.params.id);
        const { name, price } = req.body;
        const burgerIndex = item.burger.findIndex((item) => item.id === id);
        if (burgerIndex !== -1) {
            item.burger[burgerIndex] = { id, name, price };
            await fs.writeFile(menuFile, JSON.stringify(item));
            res.send(item.burger[burgerIndex]);
        } else {
            res.send({ statuscode: 404, error: 'Burger not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
});

// DELETE burger by ID
burgerRouter.delete('/:id', async (req, res) => {
    try {
        const menuFile = process.env.MENU_FILE;
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        const id = parseInt(req.params.id);
        const burgerIndex = item.burger.findIndex(item => item.id === id);
        if (burgerIndex !== -1) {
            item.burger.splice(burgerIndex, 1);
            await fs.writeFile(menuFile, JSON.stringify(item));
            res.send({ statuscode: 200, message: "Burger is deleted" });
        } else {
            res.status(404).json({ error: 'Burger not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
});

module.exports = burgerRouter;

