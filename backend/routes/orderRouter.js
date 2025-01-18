import express from "express";
import orderControllers from "../controllers/orderControllers.js";

const orderRouter = express.Router();

//make order
orderRouter.post("/place/:id", orderControllers.placeOrder);

//order items
orderRouter.post("/items/:orderId", orderControllers.orderItems);

export default orderRouter;
