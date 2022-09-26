import user from "../modals/userRegistration.js";
import existingUser from "./helper/userRegistrationhelperFindOneId.js";

const postRegistration = async (req, res) => {
    let { username, email, password, cpassword } = req.body;

    if (!username && !email && !password && !cpassword) {
        return res.status(422).json({ err: "please fill every field" });
    }

    if (password !== cpassword) {
        return res
            .status(422)
            .json({ err: "Password and confirm password must be equal." });
    }

    try {
        const existingUser = await user.findOne({ email: email });
        if (existingUser) {
            return res.status(422).json({
                error: "User Already Exist",
            });
        }
        const userInfo = new user({ username, email, password });
        await userInfo.save();
        const token = await userInfo.generateAuthToken();
        console.log(userInfo);
        return res.status(201).json({
            token,
            username: userInfo.username,
            email: userInfo.email,
            _id: userInfo._id,
        });
    } catch (error) {
        return res.send(error);
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
        req.body.username && (existingUserUpdate.username = req.body.username);
        req.body.email && (existingUserUpdate.email = req.body.email);
        req.body.password && (existingUserUpdate.password = req.body.password);
        req.body.phoneNumber &&
            (existingUserUpdate.phoneNumber = req.body.phoneNumber);

        // isAdmin logic

        if (req.user.isAdmin) {
            existingUserUpdate.isAdmin = req.body.isAdmin
                ? req.body.isAdmin
                : false;
        } else {
            return res
                .status(405)
                .json({ error: "Only admin can set user as admin" });
        }

        // If admin change himself admin power!
        if (userId == req.user._id) {
            existingUserUpdate.tokens = existingUserUpdate.tokens.filter(
                (val) => {
                    if (val.token !== req.cookies.session_token) {
                        return val;
                    }
                }
            );
            const token = await existingUserUpdate.generateAuthToken();
            return res
                .cookie("session_token", token, { httpOnly: true })
                .status(201)
                .json({ message: "User Successfully Updated." });
        } else {
            // updation other user token after changing of isAdmin???
            existingUserUpdate.tokens = [];
            await existingUserUpdate.save();
            res.status(201).json({ message: "user successfully updated." });
        }
    } catch (err) {
        res.send(err);
    }
};

export { postRegistration, deleteRegistration, updateRegistration };
