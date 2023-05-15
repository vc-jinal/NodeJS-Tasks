const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const fs = require('fs');
const pizzaRouter = require('./pizza.router');
const burgerRouter = require('./burger.router');
const noodlesRouter = require('./noodles.router');
// const file = "menu.json";
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


app.use("/pizza", pizzaRouter);
app.use("/burger", burgerRouter);
app.use("/noodles", noodlesRouter);

app.listen(3000, () => {
    console.log("App is running on port 3000");
})