import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.SECRET_KEY);
        console.log("connection done");
    } catch (e) {
        console.log(e);
    }
};

export default connectToDB;
