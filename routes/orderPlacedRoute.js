import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { userAuth } from "../middleware/userAuth.js";
import {
    getAllOrders,
    postOrder,
    delivered,
    getOrderDetails,
    orderHistory,
} from "../controller/OrderController.js";

const routes = express.Router();

routes.get("/get_order/:id", userAuth, getOrderDetails);
routes.post("/send_order", userAuth, postOrder);
routes.get("/orders", adminAuth, getAllOrders);
routes.post("/orders/delivered", adminAuth, delivered);

// orderhistory
routes.get("/orders/history", userAuth, orderHistory);

export default routes;
