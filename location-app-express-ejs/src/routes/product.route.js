import { Router } from "express";
const productRoute = Router();
import { addProduct } from "../controllers/product.controller.js";

// add product
productRoute.post("/:id", addProduct);

// // add Product button
// productRoute.get("/addProduct", addProductButton);

export default productRoute;
