import ContactUs from "../modals/contact_us.js";

export const getMessages = async (req, res) => {
    try {
        const data = await ContactUs.find();
        return res.status(201).json(data);
    } catch (err) {
        return res.send(err);
    }
};

export const postMessages = async (req, res) => {
    try {
        const data = new ContactUs({ ...req.body });
        await data.save();
        return res.status(201).json({ message: "message sended" });
    } catch (err) {
        return res.send(err);
    }
};
