import user from "../modals/userRegistration.js";
import existingUser from "./helper/userRegistrationhelperFindOneId.js";

const postRegistration = async (req, res) => {
    let { name, email, password, phoneNumber } = req.body;

    if (!name && !email && !password && !phoneNumber) {
        return res.status(422).json({ err: "please fill every field" });
    }
    try {
        const existingUser = await user.findOne({ email: email });
        if (existingUser) {
            return res.status(422).json({
                error: "User Already Exist",
            });
        }
        const userInfo = new user({ name, email, password, phoneNumber });

        await userInfo.save();
        res.status(201).json({ message: "user successfully created." });
    } catch (err) {
        res.send(err);
    }
};

const deleteRegistration = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!(await existingUser(userId))) {
            return res.status(422).json({
                error: "User doesn't Exist.",
            });
        }
        await user.findByIdAndDelete({ _id: userId });
        res.status(201).json({ message: "User successfully deleted." });
    } catch (err) {
        res.send(err);
    }
};

const updateRegistration = async (req, res) => {
    const userId = req.params.id;
    const existingUserUpdate = await existingUser(userId);
    try {
        if (!existingUserUpdate) {
            return res.status(422).json({
                error: "User doesn't Exist.",
            });
        }
        req.body.name && (existingUserUpdate.name = req.body.name);
        req.body.email && (existingUserUpdate.email = req.body.email);
        req.body.password && (existingUserUpdate.password = req.body.password);
        req.body.phoneNumber &&
            (existingUserUpdate.phoneNumber = req.body.phoneNumber);

        await existingUserUpdate.save();
        res.status(201).json({ message: "user successfully updated." });
    } catch (err) {
        res.send(err);
    }
};

export { postRegistration, deleteRegistration, updateRegistration };
