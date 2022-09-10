import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema(
    {
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
        isAdmin: {
            type: Boolean,
            default: false,
        },
        tokens: [
            {
                token: { type: String, required: true },
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign(
            {
                _id: this._id,
                name: this.name,
                email: this.email,
                phoneNumber: this.phoneNumber,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

const user = mongoose.model("User", userSchema);
export default user;
