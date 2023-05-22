const pizzaRouter = require('express').Router();
const fs = require('fs/promises');
require('dotenv').config();
const menuFile = process.env.MENU_FILE;

// GET all pizzas
pizzaRouter.get('/', async (req, res) => {
    try {
        const data = await fs.readFileSync(menuFile);
        res.send(data.pizza);
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }
});

// GET a specific pizza by ID
pizzaRouter.get('/:id', async (req, res) => {
    try {
        const data = await fs.readFileSync(menuFile);
        const pizzaId = parseInt(req.params.id);
        const pizza = data.pizza.find((item) => item.id === pizzaId);
        if (pizza) {
            res.send(pizza);
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
        const { id, name, price } = req.body;
        const newPizzaId = data.counter.pizza + 1;
        const newPizza = { id: newPizzaId, name, price }
        data.pizza.push(newPizza);
        data.counter.pizza = newPizzaId;
        await fs.writeFile(menuFile, JSON.stringify(data));
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
        const id = parseInt(req.params.id);
        const { name, price } = req.body;
        const pizzaIndex = data.pizza.findIndex((item) => item.id === id);
        if (pizzaIndex !== -1) {
            data.pizza[pizzaIndex] = { id, name, price };
            await fs.writeFile(menuFile, JSON.stringify(data));
            res.send(data.pizza[pizzaIndex]);
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
        const pizzaId = parseInt(req.params.id);
        const pizzaIndex = data.pizza.findIndex((item) => item.id === pizzaId);
        if (pizzaIndex !== -1) {
            data.pizza.splice(pizzaIndex, 1);
            await fs.writeFile(menuFile, JSON.stringify(data));
            res.send({ statuscode: 200, message: "Pizza is deleted" });
        } else {
            res.send({ statuscode: 404, message: 'Pizza not found' });
        }
    }
    catch (error) {
        res.send({ statuscode: 500, error: 'internal server error' })
    }

});

module.exports = pizzaRouter;
