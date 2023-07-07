import express from "express";
import indexRouter from "./routes/index.route";
import { connectDB } from "../src/db/connection";
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

const app = express();
connectDB();

app.use(express.json());
app.use("/api", indexRouter);

app.listen(port, () => {
    console.log("App is running on 3000");
});
