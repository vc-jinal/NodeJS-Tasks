import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, default: "" },
        emailId: { type: String, required: true, unique: true },
        phoneNo: { type: String, default: "", unique: true },
        userName: { type: String, default: "", unique: true },
        password: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("Users", userSchema, "users");
export default User;
