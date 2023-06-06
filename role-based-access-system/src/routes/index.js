import { Router } from 'express';
const indexRouter = Router();
import permissionRoutes from "./permission.route.js";
import userRoutes from "./user.route.js";
import rolesRoutes from "./roles.route.js";

indexRouter.use("/permissions", permissionRoutes);
indexRouter.use("/roles", rolesRoutes);
indexRouter.use("/users", userRoutes)

export default indexRouter;