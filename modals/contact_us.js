import mongoose from "mongoose";
import validator from "validator";

const contactUs = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            unique: true,
            validate: (value) => {
                if (!validator.isEmail(value)) {
                    throw new Error("Not a valid email");
                }
                return validator.isEmail(value);
            },
        },
        subject: { type: String, required: true },
        message: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const ContactUs = mongoose.model("ContactUs", contactUs);
export default ContactUs;
