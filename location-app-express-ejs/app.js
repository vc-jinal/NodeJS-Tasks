import express from "express";
const app = express();
import indexRouter from "./src/routes/index.route.js";
import "./src/db/connection.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "src/views");
app.set("view engine", "ejs");

app.use("/api", indexRouter);

app.listen(3000, () => {
    console.log("App is running on 3000");
});
