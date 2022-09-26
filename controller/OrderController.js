import Orders from "../modals/Order.js";

export const getAllOrders = async (req, res) => {
    try {
        const data = await Orders.find().populate("user", "name");
        return res.status(201).json(data);
    } catch (err) {
        return res.send(err);
    }
};

export const postOrder = async (req, res) => {
    const {
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        taxPrice,
        totalPrice,
        isPaid,
        isDelivered,
        paidAt,
        deliveredAt,
    } = req.body;

    try {
        const data = new Orders({ ...req.body });
        await data.save();
        return res
            .status(201)
            .json({ message: "Order Created!", id: data._id });
    } catch (err) {
        return res.send(err);
    }
};

export const getOrderDetails = async (req, res) => {
    try {
        const data = await Orders.findOne({ _id: req.params.id }).populate(
            "user",
            "name"
        );
        return res.status(201).json(data);
    } catch (err) {
        return res.send(err);
    }
};

export const delivered = async (req, res) => {
    const orders = await Orders.findOne({ _id: req.body.id }).populate(
        "user",
        "name"
    );
    if (orders.isDelivered) {
        return res.status(401).send({ message: "already delivered" });
    } else if (orders) {
        try {
            const upd = await Orders.updateOne(
                { _id: req.body.id },
                {
                    $set: {
                        isDelivered: true,
                        deliveredAt: Date.now(),
                    },
                }
            );
            return res.send(upd);
        } catch (err) {
            return res
                .status(401)
                .send({ message: "Error Occered in Updating" });
        }
    } else {
        return res.status(401).send({ message: "user doesn't exist" });
    }
};

export const orderHistory = async (req, res) => {
    const order = await Orders.find({ user: req.user });
    console.log(order);
    res.status(201).send(order);
};
