import express from "express";
import ahenteControllers from "../controllers/ahenteControllers.js";
const ahenteRouter = express.Router();

//register new ahente
ahenteRouter.post("/register/:id", ahenteControllers.registerAhente);

//edit ahente
ahenteRouter.post("/edit/:ahenteId", ahenteControllers.editAhente);
export default ahenteRouter;
