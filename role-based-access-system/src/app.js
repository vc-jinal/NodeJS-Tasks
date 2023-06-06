import express from "express";
import permissionRoutes from "./routes/permission.route.js";
import userRoutes from "./routes/user.route.js";
import rolesRoutes from "./routes/roles.route.js";

const app = express();
app.use(express.json());

app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/users", userRoutes)

app.listen(3000, () => console.log("Server is running on ", 3000));
