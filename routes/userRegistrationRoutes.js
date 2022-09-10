import express from "express";
import { userAuth } from "../middleware/userAuth.js";

import {
    postRegistration,
    deleteRegistration,
    updateRegistration,
} from "../controller/userRegistration.js";

const routes = express.Router();

routes.post("/register", postRegistration);

routes.delete("/register/:id", userAuth, deleteRegistration);

routes.put("/register/:id", userAuth, updateRegistration);

export default routes;
