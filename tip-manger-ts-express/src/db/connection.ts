import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        const url: string = process.env.URL as string;
        await mongoose.connect(url, {});
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Error in connecting Database", error);
        process.exit(1);
    }
};
