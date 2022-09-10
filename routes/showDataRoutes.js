import express from "express";
import {
    getAllUsers,
    getSingleUser,
    deleteAllUsers,
    logout,
} from "../controller/showUser.js";
import { userAuth } from "../middleware/userAuth.js";
import { adminAuth } from "../middleware/adminAuth.js";

const routes = express.Router();

routes.get("/user", adminAuth, getAllUsers);
routes.get("/user/:id", userAuth, getSingleUser);

routes.post("/user/logout", logout);
routes.delete("/deleteAll", adminAuth, deleteAllUsers);

export default routes;
