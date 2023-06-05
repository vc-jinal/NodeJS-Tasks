import express from "express";
import route from "./routes/index.route.js";
import connection from "./db/connection.js";


const app= express();
app.use(express.json());
app.use("/api", route);
app.listen(3000, ()=> console.log("Server is running on ", 3000));