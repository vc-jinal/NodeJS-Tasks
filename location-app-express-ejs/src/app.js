import express from "express";
import { fileURLToPath } from "url";
const app = express();
import { dirname } from "path";
import indexRouter from "./routes/index.route.js";
import methodOverride from "method-override";
import "./db/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "src/views");
app.set("view engine", "ejs");

app.use("/api", indexRouter);
app.use(methodOverride("_method"));

app.listen(3000, () => {
    console.log("App is running on 3000");
});
