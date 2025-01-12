import express from "express";
import categoryControllers from "../controllers/categoryControllers.js";

const categoryRouter = express.Router();

//add category
categoryRouter.post("/register/:id", categoryControllers.registerCategory);

//view category
categoryRouter.get("/view/:id", categoryControllers.viewCategory);

//remove category
categoryRouter.post("/remove/:categoryId", categoryControllers.removeCategory);

export default categoryRouter;
