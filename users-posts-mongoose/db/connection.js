const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.URL;

mongoose.connect(url)
    .then(() => console.log("Connection establish to database"))
    .catch((error) => console.error("error in connecting database: ", error));

