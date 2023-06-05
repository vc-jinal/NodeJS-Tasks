import express from "express";
import permission from "./routes/permission.route.js";
import roles from "./routes/roles.route.js";
const app = express();
app.use(express.json());

app.use("/api", permission);
app.use("/api", roles);

app.listen(3000, () => console.log("Server is running on ", 3000));
