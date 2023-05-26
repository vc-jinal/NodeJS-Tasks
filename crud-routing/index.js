const express = require('express');
const app = express();

app.use(express.json());

const pizzaRouter = require('./pizza.router');
const burgerRouter = require('./burger.router');
const noodlesRouter = require('./noodles.router');

app.use("/pizza", pizzaRouter);
app.use("/burger", burgerRouter);
app.use("/noodles", noodlesRouter);

app.listen(3000, () => {
    console.log("App is running on port 3000");
})