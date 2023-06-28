import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.URL;

mongoose.connect(url)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("error in connecting database", error))