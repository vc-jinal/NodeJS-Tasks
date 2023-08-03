import express from "express";
const app = express();
import indexRouter from "./routes/index.route.js";
import methodOverride from "method-override";
import "./db/connection.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "src/views");
app.set("view engine", "ejs");

app.use("/api", indexRouter);
app.use(methodOverride("_method"));

app.listen(3000, () => {
    console.log("App is running on 3000");
});
