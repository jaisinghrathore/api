import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { type: String },
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
    password: { type: String },
    phoneNumber: {
        type: String,
        unique: true,
        validate: (value) => {
            if (!validator.isMobilePhone(value, ["en-IN"])) {
                throw new Error("Not a valid number");
            }
            return validator.isMobilePhone(value, ["en-IN"]);
        },
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const user = mongoose.model("User", userSchema);
export default user;
