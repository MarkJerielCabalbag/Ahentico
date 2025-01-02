import express from "express";
import ahenteControllers from "../controllers/ahenteControllers.js";

const ahenteRouter = express.Router();

//register new ahente
ahenteRouter.post("/register/:id", ahenteControllers.registerAhente);

//edit ahente
ahenteRouter.post("/edit/:ahenteId", ahenteControllers.editAhente);

//remove ahente
ahenteRouter.post("/del/:ahenteId", ahenteControllers.removeAhente);

//view list of ahentes
ahenteRouter.get("/list/:userId", ahenteControllers.viewAhentes);

//view ahente
ahenteRouter.get("/view/:ahenteId", ahenteControllers.viewAhente);
export default ahenteRouter;
