const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const employeeRouter = require('./employee.router');

app.use(bodyParser.json());

app.use("/emp", employeeRouter);

app.listen(3000, () => {
    console.log("App is running on port 3000");
})