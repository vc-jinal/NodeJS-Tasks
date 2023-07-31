import { Router } from "express";
const indexRouter = Router();

import locationRouter from "../routes/location.route.js";
import productRouter from "../routes/product.route.js";

indexRouter.use("/location", locationRouter);
indexRouter.use("/product", productRouter);

export default indexRouter;
