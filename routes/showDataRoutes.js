import express from "express";
import {
    getAllUsers,
    getSingleUser,
    deleteAllUsers,
    logout,
    logoutAllDevices,
} from "../controller/showUser.js";
import { userAuth } from "../middleware/userAuth.js";
import { adminAuth } from "../middleware/adminAuth.js";

const routes = express.Router();

routes.get("/user", adminAuth, getAllUsers);
routes.get("/user/:id", userAuth, getSingleUser);

routes.post("/user/logout/:id", userAuth, logout);
routes.post("/user/logoutAll/:id", userAuth, logoutAllDevices);

routes.delete("user/deleteAll", adminAuth, deleteAllUsers);

export default routes;
