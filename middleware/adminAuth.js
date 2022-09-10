import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import user from "../modals/userRegistration.js";

dotenv.config();

const adminAuth = (req, res, next) => {
    const token = req.cookies.session_token;
    if (!token) {
        return res.send("Token is not Supplied?");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decod) => {
        if (err) {
            res.status(401).send({ message: "Token is not valid" });
        } else {
            const existingUser = user
                .findOne({ _id: decod._id, "tokens.token": token })
                .then((user) => {
                    if (!user) {
                        return res
                            .status(404)
                            .send({ error: "Admin not found." });
                    }
                    req.user = decod;
                    if (req.user.isAdmin) {
                        next();
                    } else {
                        return res.status(406).send({
                            error: "You are not loggin with this id.",
                        });
                    }
                })
                .catch((err) => {
                    return res.status(404).send({ error: "User not found." });
                });
        }
    });
};

export { adminAuth };
