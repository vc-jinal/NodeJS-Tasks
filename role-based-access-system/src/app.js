import express from "express";
import indexRouter from "./routes/index.js";
const app = express();

app.use(express.json());
app.use('/api', indexRouter)

app.listen(3000, () => console.log("Server is running on ", 3000));
