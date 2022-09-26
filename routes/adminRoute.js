import express from "express";
import {
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    addProduct,
} from "../controller/productsController.js";
import { uploadFile } from "../controller/uploadFileController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import multer from "multer";
import { getSummary } from "../controller/getSummaryController.js";
import { userAuth } from "../middleware/userAuth.js";

const routes = express.Router();

const upload = multer();

// All product thing
routes.get("/products", getAllProducts);
routes.get("/products/:id", getSingleProduct);
routes.post("/add_products", adminAuth, addProduct);
routes.use(upload.single("file")).post("/upload", adminAuth, uploadFile);
routes.delete("/delete_products/:id", adminAuth, deleteProduct);
routes.put("/update_products/:id", adminAuth, updateProduct);

// summary for all
routes.get("/summary", adminAuth, getSummary);

export default routes;
