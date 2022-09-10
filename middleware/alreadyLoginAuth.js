import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import user from "../modals/userRegistration.js";
dotenv.config();

const alreadyLoginUserAuth = (req, res, next) => {
    const token = req.cookies.session_token;
    if (!token) {
        return next();
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decod) => {
        if (err) {
            return next();
        } else {
            const alreadyLogin = user
                .findOne({ _id: decod._id, "tokens.token": token })
                .then((user) => {
                    if (user) {
                        return res
                            .status(404)
                            .send({ error: "User already login" });
                    }
                })
                .catch(() => {
                    return next();
                });
        }
    });
};

export { alreadyLoginUserAuth };
