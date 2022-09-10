import express from "express";
import { login } from "../controller/userLogin.js";
import { alreadyLoginUserAuth } from "../middleware/alreadyLoginAuth.js";

const routes = express.Router();

routes.post("/log_in", alreadyLoginUserAuth, login);

export default routes;
