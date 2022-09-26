import Order from "../modals/Order.js";
import Product from "../modals/products.js";
import User from "../modals/userRegistration.js";

export const getSummary = async (req, res) => {
    try {
        const ordersCount = await Order.countDocuments();
        const productsCount = await Product.countDocuments();
        const usersCount = await User.countDocuments();
        const ordersPriceGroup = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    sales: { $sum: "$totalPrice" },
                },
            },
        ]);
        const ordersPrice =
            ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m", date: "$createdAt" },
                    },
                    totalSales: { $sum: "$totalPrice" },
                },
            },
        ]);
        res.send({
            ordersCount,
            productsCount,
            usersCount,
            ordersPrice,
            salesData,
        });
    } catch (err) {
        res.send(err);
    }
};
