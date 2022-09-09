import express from "express";
import {
    getAllUsers,
    postRegistration,
    deleteRegistration,
    updateRegistration,
} from "../controller/userRegistration.js";

const routes = express.Router();

routes.get("/alldata", getAllUsers);

routes.post("/register", postRegistration);

routes.delete("/register/:id", deleteRegistration);

routes.put("/register/:id", updateRegistration);

export default routes;
