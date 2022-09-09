import express from "express";
import RegistrationRoutes from "./routes/userRegistrationRoutes.js";
import LoginRoutes from "./routes/userLoginRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import connectToDB from "./database/conn.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// parse application/json
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/registration", RegistrationRoutes);
app.use("/login", LoginRoutes);

app.get("*", (req, res) => {
    res.send("This is error");
});

app.listen(8000, () => {
    connectToDB();
    console.log("server started");
});
