import express from "express";
import userController from "../controller/userController.js";

const userRoutes = express.Router();

//register
userRoutes.post("/register", userController.register);
//login
userRoutes.post("/login", userController.login);
//logout
userRoutes.post("/logout", userController.logout);
//me
userRoutes.get("/me/:_id", userController.user);

export default userRoutes;
