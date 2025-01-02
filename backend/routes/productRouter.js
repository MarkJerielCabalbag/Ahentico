import express from "express";
import productController from "../controllers/productController.js";

const productRouter = express.Router();

//register product
productRouter.post("/register/:ahenteId", productController.registerProduct);

//remove product
productRouter.post("/remove/:productId", productController.removeProduct);

//edit product
productRouter.post("/edit/:productId", productController.editProduct);

//view list of products
productRouter.get("/list/:ahenteId", productController.viewProducts);

//view product
productRouter.get("/view/:productId", productController.viewProduct);
export default productRouter;
