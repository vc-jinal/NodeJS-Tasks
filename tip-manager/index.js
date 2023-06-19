const express = require('express');
const app = express();
const indexRouter = require('./routes/index.route.js');

app.use(express.json());
app.use('/api', indexRouter);

app.listen(3000, () => console.log("App is running on 3000"));