const noodlesRouter = require('express').Router();
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const menuFile = process.env.MENU_FILE;

noodlesRouter.use(bodyParser.json());

//get all noodles details
noodlesRouter.get("/", (req, res) => {
    const data = JSON.parse(fs.readFileSync(menuFile, 'utf-8'));
    res.json(data.noodles);
})

//get noodles details by id
noodlesRouter.get("/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(menuFile, 'utf8'));
    const noodlesId = parseInt(req.params.id);
    const noodles = data.noodles.find((item) => item.id === noodlesId)
    if (noodles) {
        res.json(noodles);
    }
    else {
        res.status(404).json({ error: 'Noodles not found' });

    }
})

//post (create) noodles details
noodlesRouter.post('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(menuFile));
    const { id, name, price } = req.body;
    let newNoodles;
    if (id) {
        newNoodles = { id, name, price };
    }
    else {
        const newNoodlesId = data.counter[0].burger++;
        newNoodles = { id: newNoodlesId, name, price }
    }
    data.noodles.push(newNoodles);
    fs.writeFileSync(menuFile, JSON.stringify(data));
    res.json(newNoodles);
})

//update noodle by id
noodlesRouter.put('/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(menuFile));
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const noodlesIndex = data.noodles.findIndex((item) => item.id === id);
    if (noodlesIndex !== -1) {
        data.noodles[noodlesIndex] = { id: parseInt(id), name, price }
        fs.writeFileSync(menuFile, JSON.stringify(data));
        res.json(data.noodles[noodlesIndex]);
    }
    else {
        res.status(404).json({ error: 'noodlees not found' })
    }
})
//delete noodles by id
noodlesRouter.delete("/:id", (req, res) => {
    const noodlesId = parseInt(req.params.id);
    const data = JSON.parse(fs.readFileSync(menuFile, 'utf8'));
    const noodlesIndex = data.pizza.findIndex((item) => item.id === noodlesId);
    if (index !== -1) {
        data.noodles.splice(noodlesIndex, 1)
        fs.writeFileSync(menuFile, JSON.stringify(data));
        res.json({ message: "Noodles is deleted" });
    } else {
        res.status(404).json({ error: 'Pizza not found' });
    }
})

module.exports = noodlesRouter;


