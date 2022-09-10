import user from "../modals/userRegistration.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(401).json({ error: "please fill the data." });
    try {
        const userExist = await user.findOne({ email: email });
        if (!userExist) {
            return res.status(401).json({ error: "Invalid credentials." });
        }
        const match = await bcrypt.compare(password, userExist.password);
        if (match) {
            const token = await userExist.generateAuthToken();
            return res
                .cookie("session_token", token, { httpOnly: true })
                .status(201)
                .json({ message: "User Successfully Login." });
        } else {
            return res.status(401).json({ error: "Invalid credentials." });
        }
    } catch (err) {
        return res.send(err);
    }
};

export { login };
