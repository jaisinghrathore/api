import express from "express";
import RegistrationRoutes from "./routes/userRegistrationRoutes.js";
import LoginRoutes from "./routes/userLoginRoutes.js";
import ShowData from "./routes/showDataRoutes.js";
import AdminRoutes from "./routes/adminRoute.js";
import ContactUsRoutes from "./routes/contactUs.js";
import OrderRoutes from "./routes/orderPlacedRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import connectToDB from "./database/conn.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("This Home.");
});

app.use(ShowData);
app.use("/registration", RegistrationRoutes);
app.use("/login", LoginRoutes);
app.use("/admin", AdminRoutes);
app.use("/message", ContactUsRoutes);
app.use("/admin", OrderRoutes);
app.get("*", (req, res) => {
    res.send("This is error");
});

app.listen(8000, () => {
    connectToDB();
    console.log("server started");
});
