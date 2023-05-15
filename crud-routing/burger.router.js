const burgerRouter = require('express').Router();
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const menuFile = process.env.MENU_FILE;

burgerRouter.use(bodyParser.json());

// get all burgers
burgerRouter.get('/', (req, res) => {
    const menuFile = process.env.MENU_FILE;
    const data = JSON.parse(fs.readFileSync(menuFile));
    res.json(data.burger);
});

// get burger by id
burgerRouter.get('/:id', (req, res) => {
    const menuFile = process.env.MENU_FILE;
    const data = JSON.parse(fs.readFileSync(menuFile, 'utf8'));
    const burgerid = parseInt(req.params.id);
    const burger = data.burger.find(item => item.id === burgerid);

    if (burger) {
        res.json(burger);
    } else {
        res.status(404).json({ error: 'Burger not found' });
    }
});

// POST a new burger
burgerRouter.post('/', (req, res) => {
    const menuFile = process.env.MENU_FILE;
    const data = JSON.parse(fs.readFileSync(menuFile, 'utf8'));
    const { id, name, price } = req.body;
    let newBurger;
    if (id) {
        newBurger = { id, name, price };
    } else {
        const newBurgerId = data.counter[0].burger++;
        newBurger = { id: newBurgerId, name, price }
    }
    data.burger.push(newBurger);
    fs.writeFileSync(menuFile, JSON.stringify(data));
    res.json(newBurger);
});

// PUT (update) a burger by ID
burgerRouter.put('/:id', (req, res) => {
    const menuFile = process.env.MENU_FILE;
    const data = JSON.parse(fs.readFileSync(menuFile, 'utf8'));
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const burgerIndex = data.burger.findIndex((item) => item.id === id);

    if (burgerIndex !== -1) {
        data.burger[burgerIndex] = { id: parseInt(id), name, price };
        fs.writeFileSync(menuFile, JSON.stringify(data));
        res.json(data.burger[burgerIndex]);
    } else {
        res.status(404).json({ error: 'Burger not found' });
    }
});

// DELETE burger by ID
burgerRouter.delete('/:id', (req, res) => {
    const menuFile = process.env.MENU_FILE;
    const data = JSON.parse(fs.readFileSync(menuFile, 'utf8'));
    const id = parseInt(req.params.id);
    const burgerIndex = data.burger.findIndex(item => item.id === id);

    if (burgerIndex !== -1) {
        data.burger.splice(burgerIndex, 1);
        fs.writeFileSync(menuFile, JSON.stringify(data));
        res.json({ message: "Burger is deleted" });
    } else {
        res.status(404).json({ error: 'Burger not found' });
    }
});

module.exports = burgerRouter;

