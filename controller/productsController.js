import Products from "../modals/products.js";

export const getAllProducts = async (req, res) => {
    try {
        if (req.query.select) {
            try {
                const limitedData = await Products.find().select(
                    req.query.select
                );
                return res.status(201).json(limitedData);
            } catch {
                return res.send(err);
            }
        }
        if (req.query?.limit) {
            try {
                const limitedData = await Products.find().limit(
                    req.query.limit
                );
                return res.status(201).json(limitedData);
            } catch {
                return res.send(err);
            }
        }
        const data = await Products.find();
        return res.status(201).json(data);
    } catch (err) {
        return res.send(err);
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const data = await Products.findOne({ _id: req.params.id });
        return res.status(201).json(data);
    } catch (err) {
        return res.send(err);
    }
};

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        await Products.findByIdAndDelete({ _id: productId });
        return res.status(201).json({ message: "User successfully deleted." });
    } catch (err) {
        return res.send(err);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Products.findOne({ _id: req.params.id });
        if (product) {
            product.name = req.body.name;
            product.slug = req.body.slug;
            product.price = req.body.price;
            product.category = req.body.category;
            product.image = req.body.image;
            product.featuredImage = req.body.featuredImage;
            product.isFeatured = req.body.isFeatured;
            product.brand = req.body.brand;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            await product.save();
            return res.send({ message: "Product Updated Successfully" });
        } else {
            return res.status(404).send({ message: "Product Not Found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(err);
    }
};

export const addProduct = async (req, res) => {
    console.log(req.user);
    try {
        const newProduct = new Products({
            name: "sample_name",
            creator: req.user._id,
            image: "/dummy.jpg",
            price: 0,
            category: "sample_category",
            countInStock: 0,
            description: "sample_description",
            rating: 0,
            numReviews: 0,
        });
        const product = await newProduct.save();
        return res.status(201).json({ message: "Product Created", product });
    } catch (err) {
        res.send(err);
    }
};
