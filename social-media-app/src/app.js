import express from 'express';
import indexRouter from './routes/index.route.js';
import './db/connection.js'
const app = express();

app.use(express.json());

app.use('/api', indexRouter);

app.listen(3000, () => console.log("App is running on port 3000"))