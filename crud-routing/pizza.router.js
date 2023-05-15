const pizzaRouter = require('express').Router();
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const menuFile = process.env.MENU_FILE;
pizzaRouter.use(bodyParser.json());


// GET all pizzas
pizzaRouter.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(menuFile));
    res.json(data.pizza);
});


// GET a specific pizza by ID
pizzaRouter.get('/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(menuFile));
    const pizzaId = parseInt(req.params.id);
    const pizza = data.pizza.find((item) => item.id === pizzaId);
    if (pizza) {
        res.json(pizza);
    } else {
        res.status(404).json({ error: 'Pizza not found' });
    }
});

// POST (create) a new pizza
pizzaRouter.post('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(menuFile));
    const { id, name, price } = req.body;
    let newPizza;
    if (id) {
        newPizza = { id, name, price };
    } else {
        const newPizzaId = data.counter[0].pizza++;
        newPizza = { id: newPizzaId, name, price };
    }
    data.pizza.push(newPizza);
    fs.writeFileSync(menuFile, JSON.stringify(data));
    res.json(newPizza);
});

// PUT (update) an existing pizza
pizzaRouter.put('/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(menuFile));
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const pizzaIndex = data.pizza.findIndex((item) => item.id === id);

    if (pizzaIndex !== -1) {
        data.pizza[pizzaIndex] = { id: parseInt(id), name, price };
        fs.writeFileSync(menuFile, JSON.stringify(data));
        res.json(data.pizza[pizzaIndex]);
    } else {
        res.status(404).json({ error: 'Pizza not found' });
    }
});

// DELETE a pizza
pizzaRouter.delete('/:id', (req, res) => {
    const menuFile = process.env.MENU_FILE;
    const data = JSON.parse(fs.readFileSync(menuFile));
    const pizzaId = req.params;
    const pizzaIndex = data.pizza.findIndex((item) => item.id === pizzaId);
    if (pizzaIndex !== -1) {
        data.pizza.splice(pizzaIndex, 1);
        fs.writeFileSync(menuFile, JSON.stringify(data));
        res.sendStatus("Pizza is deleted");
    } else {
        res.status(404).json({ error: 'Pizza not found' });
    }
});

module.exports = pizzaRouter;
