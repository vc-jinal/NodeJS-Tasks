import { Router } from "express";
const productRoute = Router();
import { addProduct } from "../controllers/product.controller.js";

// add product
productRoute.post("/:id", addProduct);

export default productRoute;
