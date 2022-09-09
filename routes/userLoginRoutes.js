import express from "express";
import { login } from "../controller/userLogin.js";
const routes = express.Router();

routes.post("/log_in", login);

export default routes;
