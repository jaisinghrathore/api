import user from "../modals/userRegistration.js";

const getAllUsers = async (req, res) => {
    try {
        const data = await user.find().select({ password: 0 });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
};

const getSingleUser = async (req, res) => {
    try {
        const data = await user
            .findOne({ _id: req.params.id })
            .select({ password: 0 });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
};

const deleteAllUsers = async (req, res) => {
    try {
        const data = await user
            .findOne({ _id: req.user._id })
            .select({ password: 0 });
        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }
        try {
            const delet = await user.deleteMany();
            res.send(delet);
        } catch (err) {
            return res
                .status(404)
                .json({ error: "Can't be able to delete users." });
        }
    } catch (err) {
        res.send(err);
    }
};

const logout = async (req, res) => {
    try {
        const data = await user.findOne({ _id: req.params.id });
        data.tokens = data.tokens.filter((val) => {
            return val.token !== req.cookies.session_token;
        });
        await data.save();
        res.clearCookie("session_token").send("Token removed!");
    } catch (err) {
        res.send(err);
    }
};

const logoutAllDevices = async (req, res) => {
    try {
        const data = await user.findOne({ _id: req.params.id });
        data.tokens = [];
        await data.save();
        res.clearCookie("session_token").send("All Token removed!");
    } catch (err) {
        res.send(err);
    }
};

export { getAllUsers, getSingleUser, deleteAllUsers, logout, logoutAllDevices };
