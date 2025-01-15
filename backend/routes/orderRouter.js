import express from "express";
import orderControllers from "../controllers/orderControllers.js";

const orderRouter = express.Router();

//make order
orderRouter.post("/place/:id", orderControllers.placeOrder);

export default orderRouter;
