import express from "express";
import {
    getMessages,
    postMessages,
} from "../controller/contactUsController.js";

const routes = express.Router();

routes.get("/contact", getMessages);
routes.post("/contact", postMessages);

export default routes;
