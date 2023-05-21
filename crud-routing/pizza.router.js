const pizzaRouter = require('express').Router();
const fs = require('fs/promises');
require('dotenv').config();
const menuFile = process.env.MENU_FILE;

// GET all pizzas
pizzaRouter.get('/', async (req, res) => {
    try {
        const data = await fs.readFileSync(menuFile);
        const item = JSON.parse(data);
        res.send(item.pizza);
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
});

// GET a specific pizza by ID
pizzaRouter.get('/:id', async (req, res) => {
    try {
        const data = await fs.readFileSync(menuFile);
        const item = JSON.parse(data);
        const pizzaId = parseInt(req.params.id);
        const pizza = item.pizza.find((item) => item.id === pizzaId);
        if (pizza) {
            res.json(pizza);
        } else {
            res.send({ statuscode: 404, message: 'Pizza not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
});

// POST (create) a new pizza
pizzaRouter.post('/', async (req, res) => {
    try {
        const data = await fs.readFileSync(menuFile);
        const item = JSON.parse(data);
        const { id, name, price } = req.body;
        const newPizzaId = item.counter.pizza + 1;
        const newPizza = { id: newPizzaId, name, price }
        item.pizza.push(newPizza);
        item.counter.pizza = newPizzaId;
        await fs.writeFile(menuFile, JSON.stringify(item));
        res.send(newPizza);
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
});

// PUT (update) an existing pizza
pizzaRouter.put('/:id', async (req, res) => {
    try {
        const data = await fs.readFileSync(menuFile);
        const item = JSON.parse(data);
        const id = parseInt(req.params.id);
        const { name, price } = req.body;
        const pizzaIndex = data.pizza.findIndex((item) => item.id === id);
        if (pizzaIndex !== -1) {
            item.pizza[pizzaIndex] = { id, name, price };
            await fs.writeFile(menuFile, JSON.stringify(item));
            res.send(item.pizza[pizzaIndex]);
        } else {
            res.send({ statuscode: 404, error: 'Pizza not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
});

// DELETE a pizza
pizzaRouter.delete('/:id', async (req, res) => {
    try {
        const menuFile = process.env.MENU_FILE;
        const data = await fs.readFile(menuFile);
        const item = JSON.parse(data);
        const pizzaId = parseInt(req.params.id);
        const { name, price } = req.body;
        const pizzaIndex = item.pizza.findIndex((item) => item.id === pizzaId);
        if (pizzaIndex !== -1) {
            item.pizza.splice(pizzaIndex, 1) = { id, name, price };
            await fs.writeFile(menuFile, JSON.stringify(item));
            res.send({ statuscode: 200, message: "Pizza is deleted" });
        } else {
            res.status(404).json({ error: 'Pizza not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }

});

module.exports = pizzaRouter;
